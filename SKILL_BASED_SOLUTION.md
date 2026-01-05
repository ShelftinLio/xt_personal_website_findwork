# 基于 SKILL 的小红书知识检索方案

## 📊 问题分析

### 当前数据量
- **文件大小**: 124KB
- **总字符数**: ~42,000 字符
- **笔记数量**: 42 篇
- **每篇平均**: ~1000 字

### 上下文限制
- **GLM-4-Flash**: 128K tokens ≈ 96,000 汉字
- **当前 System Prompt**: ~3,000 字（个人信息 + 笔记索引）
- **剩余空间**: ~93,000 字 ✅ 足够！

## 🎯 SKILL 方法论

### 什么是 SKILL？

SKILL = **Structured Knowledge Injection with Layered Lookup**

核心思想：
1. **索引层**: 轻量级知识索引（当前实现）
2. **检索层**: 按需加载详细知识
3. **注入层**: 动态组装上下文

### 三层架构

```
┌─────────────────────────────────────────┐
│  Layer 1: 索引层（System Prompt）      │
│  - 42 篇笔记的主题+标题+一句话摘要      │
│  - ~3,000 字，常驻上下文               │
└──────────────┬──────────────────────────┘
               │ 用户提问
               ▼
┌─────────────────────────────────────────┐
│  Layer 2: 检索层（关键词匹配）         │
│  - 分析用户问题，提取关键词            │
│  - 匹配相关笔记 ID（如 Day42）         │
│  - 加载完整笔记内容                    │
└──────────────┬──────────────────────────┘
               │ 动态注入
               ▼
┌─────────────────────────────────────────┐
│  Layer 3: 注入层（扩展上下文）         │
│  - 将相关笔记完整内容添加到 messages   │
│  - 保持 System Prompt 简洁             │
│  - AI 基于完整知识回答                 │
└─────────────────────────────────────────┘
```

## 💡 实施方案

### 方案对比

| 方案 | 优点 | 缺点 | 推荐度 |
|------|------|------|--------|
| **全量注入** | 实现简单 | 42,000 字太长 | ❌ |
| **向量 RAG** | 可扩展 | 需要数据库，复杂 | ❌ |
| **SKILL 检索** | 平衡简单与智能 | 需要匹配逻辑 | ✅✅✅ |

### SKILL 方案实施

#### 步骤 1: 创建笔记知识库（JSON）

```typescript
// notes-knowledge-base.ts
export const notesKnowledgeBase = {
  "rag": {
    "day42": {
      title: "一文读懂RAG基础架构",
      summary: "Naive RAG的核心三阶段：索引-检索-生成",
      fullContent: "完整 1000 字内容...",
      keywords: ["RAG", "检索", "生成", "索引", "向量"]
    }
  },
  "prompt": {
    "day39": {
      title: "十三种 Prompt 基本技巧",
      summary: "系统梳理提示词工程的核心方法论",
      fullContent: "完整 1000 字内容...",
      keywords: ["Prompt", "提示词", "工程", "Few-shot", "CoT"]
    }
  }
  // ... 其他 40 篇
}
```

#### 步骤 2: 实现关键词检索

```typescript
function findRelevantNotes(userQuestion: string): string[] {
  const relevantNotes: string[] = [];

  // 关键词匹配
  if (userQuestion.includes("RAG") || userQuestion.includes("检索")) {
    relevantNotes.push(notesKnowledgeBase.rag.day42.fullContent);
  }
  if (userQuestion.includes("Prompt") || userQuestion.includes("提示词")) {
    relevantNotes.push(notesKnowledgeBase.prompt.day39.fullContent);
  }
  // ... 其他匹配规则

  return relevantNotes;
}
```

#### 步骤 3: 动态组装消息

```typescript
async chat(userMessage: string): Promise<string> {
  // 检索相关笔记
  const relevantNotes = this.findRelevantNotes(userMessage);

  // 动态构建上下文
  let context = this.systemPrompt;

  if (relevantNotes.length > 0) {
    context += `\n\n## 相关笔记详细内容\n\n${relevantNotes.join('\n\n')}`;
  }

  const messages: Message[] = [
    { role: 'system', content: context },
    { role: 'user', content: userMessage }
  ];

  return await glmService.chat(messages);
}
```

## 🎨 优化策略

### 策略 1: 智能摘要

```typescript
// 在索引中使用 100 字摘要
const summary = "RAG解决企业问答三大痛点：实时性、私有化、幻觉。核心三阶段：索引(数据向量化)、检索(Top-K匹配)、生成(LLM输出)";

// 需要时才加载完整内容
const fullContent = "1000 字详细内容...";
```

### 策略 2: 分层注入

```typescript
// Layer 1: 索引（常驻）
systemPrompt = `
## 知识索引
- RAG (Day42): Naive RAG基础架构
- Prompt (Day39): 13种基本技巧
...
`;

// Layer 2: 详情（按需）
if (needDetail) {
  systemPrompt += fullContent;
}
```

### 策略 3: 优先级队列

```typescript
// 优先加载最相关的笔记
const priority = {
  exactMatch: 3,      // 精确匹配关键词（如 "RAG"）
  partialMatch: 2,    // 部分匹配（如 "检索增强"）
  semanticMatch: 1    // 语义相关（如 "AI 知识库"）
};
```

## 📋 实施检查清单

- [ ] 创建 `notes-knowledge-base.ts`（结构化知识库）
- [ ] 实现 `NoteRetrievalService`（检索服务）
- [ ] 更新 `xiaotianSkillService`（集成检索）
- [ ] 测试各类问题（RAG、Prompt、通用）
- [ ] 优化匹配规则（提高准确率）

## 🎯 预期效果

### 优势
1. **上下文可控**: 默认 ~3,000 字，按需增加
2. **回答精准**: 加载完整笔记内容，不是摘要
3. **灵活扩展**: 新增笔记只需添加到知识库
4. **成本优化**: 只加载相关知识，节省 tokens

### 性能指标
- **默认 System Prompt**: 3,000 字（~2,000 tokens）
- **单篇笔记加载**: +1,000 字（~667 tokens）
- **最大上下文**: 3 篇笔记 = 6,000 字（~4,000 tokens）✅
- **剩余空间**: ~92,000 字（~61,000 tokens）

## 🚀 下一步

开始实施 SKILL 方案！
