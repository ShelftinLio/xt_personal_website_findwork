/**
 * 小红书学习笔记知识库
 * 基于 SKILL 方法：Structured Knowledge Injection with Layered Lookup
 */

export interface NoteEntry {
  id: string;
  title: string;
  date: string;
  summary: string;
  fullContent: string;
  keywords: string[];
  category: string;
}

export const notesKnowledgeBase: Record<string, NoteEntry> = {
  // RAG 系列
  "day42": {
    id: "day42",
    title: "一文读懂RAG基础架构",
    date: "2025/10/11",
    summary: "Naive RAG的核心三阶段：索引(离线准备)、检索(在线匹配)、生成(智能输出)。解决企业问答机器人的三大痛点：实时性、私有化数据、幻觉问题。",
    fullContent: `# RAG (检索增强生成) 基础架构

## 核心概念
RAG（Retrieval-Augmented Generation）是一种结合了检索和生成的技术，能够从外部知识库中检索相关信息，并结合生成模型（如 LLM）生成更准确、更相关的回答。

## 为什么需要 RAG？
RAG解决了企业问答机器人的三大痛点：
1. **实时性**：LLM 数据在训练完成时截止，但 RAG 能实时拉取新信息，避免回答过时。
2. **私有化数据**：企业数据不在 LLM 训练集，但 RAG 可安全检索私有库，不用训模型。
3. **幻觉问题**：LLM 易编错信息，但 RAG 让回答基于真实检索结果，减少错误。

## RAG 的核心三阶段

### 1. 索引阶段（Index，离线准备）
原始数据（PDF/HTML 等多种数据）先被提取并清洗为纯文本，再分块适配模型上下文，接着用嵌入模型转向量，最终以"文本块-向量"键值对存为索引，支撑后续高效搜索。

**主要环节**：
- 知识收集与数据提取
- 文本切分（chunking）
- 向量化（embedding）
- 数据入库

### 2. 检索阶段（Retrieve，在线匹配）
用户 Query 用嵌入模型转为文本向量，与向量数据库中的向量计算相似度，取 Top-K 最相关文本块，作为生成回答的"参考文档"。

**主要环节**：
- 用户Query向量化
- 相似度计算
- 结果排序与筛选（Top-K）

### 3. 生成阶段（Generation，智能输出）
把用户 Query、检索到的Top-K 文本块整合成提示词，输入给大模型；模型可结合自身参数知识和基于检索到的文本知识，推理生成贴合需求的连贯回应。

**主要环节**：
- 提示词构造
- 大模型调用
- 结果输出与校验

## 实际应用案例（蔚来项目）
在蔚来汽车实习期间，我基于 Dify 与 NIO GPT 平台构建了细分业务场景的 RAG Pipeline：
- 收集高质量语料（产品手册、QA文档）
- 设计调优每个环节的 Prompt
- 构建检索评估、生成评估、端到端评估体系
- 收集 200+ 评估集问题
- 最终实现：覆盖 90% 常见咨询场景，替代人工回复率达 70%
`,
    keywords: ["RAG", "检索增强生成", "索引", "检索", "生成", "向量", "embedding", "知识库", "Dify", "幻觉"],
    category: "RAG"
  },

  // Agent 系列
  "day41": {
    id: "day41",
    title: "AI智能体的'内存管理'艺术：上下文工程",
    date: "2025/09/10",
    summary: "AI Agent上下文工程不是简单的写提示词，而是构建智能体的'操作系统'。将 LLM 想象成 CPU，上下文窗口就是 RAM，上下文工程就是'内存管理器'。",
    fullContent: `# AI智能体的上下文工程

## 核心概念
AI Agent 上下文工程（Context Engineering）不是简单的写提示词，而是构建智能体的"操作系统"。

我们可以将大模型（LLM）想象成 CPU，这时它的上下文窗口就是 RAM。而上下文工程，就是这个系统的"内存管理器"。它的任务不是把所有数据塞满 RAM，而是像精密的调度算法一样，精准地决定哪些信息该加载、哪些该换出、哪些该优先处理。

## 为什么重要？
当 AI 输出不符合预期时，问题根源往往不是模型本身不够聪明，而是它"没收到关键信息"。模型不会读心术，缺失上下文会导致它做出错误假设，甚至产生幻觉。

一个能动态组装恰当上下文的系统，其效果远胜于一个"更聪明"的模型。

## 上下文工程策略

### 1. 截断策略
- **保留开头**: 系统提示 + 最近对话
- **保留结尾**: 最新用户输入
- **中间压缩**: 总结中间对话内容

### 2. 总结策略
- 将长对话压缩为关键信息摘要
- 保留实体、意图、状态等核心要素
- 丢弃冗余寒暄和重复信息

### 3. 精准内存管理
- **动态加载**: 按需加载相关知识
- **分层缓存**: 热数据常驻，冷数据按需
- **优先级队列**: 重要信息优先保留

## 实际应用
在蔚来 AI 智能客服项目中，我设计了意图识别、槽位澄清与任务分发机制，通过精确的上下文工程提升回答准确率。
`,
    keywords: ["Agent", "智能体", "上下文", "context", "内存管理", "LLM", "CPU", "RAM"],
    category: "Agent"
  },

  // Prompt 系列
  "day39": {
    id: "day39",
    title: "十三种 Prompt 基本技巧",
    date: "2025/09/08",
    summary: "系统梳理提示词工程的核心方法论，从 Few-shot 到 CoT 的实战进化路径。",
    fullContent: `# 十三种 Prompt 基本技巧

## 核心方法论

### 1. Few-shot Learning（少样本学习）
给模型提供几个示例，让它学习模式。

**示例**：
```
用户：我想要...
助手：基于您的需求，我建议...
```

### 2. Chain of Thought (CoT)
让模型展示推理过程。

**示例**：
```
让我们一步步思考：
1. 首先...
2. 然后...
3. 最后...
```

### 3. Zero-shot Prompting
无需示例，直接给出清晰指令。

### 4. Role Prompting
为 AI 分配特定角色。

### 5. Task Decomposition
将复杂任务分解为子任务。

### 6. Self-Consistency
让模型多次思考，选择最一致的答案。

### 7. Generated Knowledge
先生成相关知识，再回答问题。

### 8. Tree of Thoughts (ToT)
探索多个推理路径，评估并选择最优。

### 其他技巧
- **Re-framing**: 重新表述问题
- **Elaboration**: 详细阐述要求
- **Constraint Specification**: 明确约束条件
- **Format Specification**: 指定输出格式
- **Think Step-by-Step**: 逐步思考
- **Reflexion**: 反思和改进

## 实战经验（蔚来项目）
在蔚来 RAG 项目中，我设计调优了每个环节的 Prompt：
- 检索 Prompt：优化查询理解和向量化
- 生成 Prompt：提高回答质量和相关性
- 评估 Prompt：构建检索评估、生成评估、端到端评估体系
`,
    keywords: ["Prompt", "提示词", "工程", "Few-shot", "CoT", "Chain of Thought", "技巧"],
    category: "Prompt"
  },

  // NLP 系列
  "day31": {
    id: "day31",
    title: "Transformer 架构流程拆解",
    date: "2025/08/31",
    summary: "深度拆解 Transformer 架构，剖析 Encoder-Decoder 机制与注意力机制的底层数学逻辑。",
    fullContent: `# Transformer 架构流程拆解

## 核心架构
Transformer 是基于自注意力机制（Self-Attention）的深度学习模型，彻底改变了 NLP 领域。

## Encoder-Decoder 机制

### Encoder（编码器）
- 输入序列 → 词嵌入 → 位置编码
- 多头自注意力层
- 前馈神经网络
- 输出：上下文表示

### Decoder（解码器）
- 输出序列（带掩码）
- Encoder-Decoder 注意力
- 前馈神经网络
- 输出：概率分布

## 注意力机制

### Self-Attention（自注意力）
计算序列内每个词与其他词的相关性：

\[
Attention(Q, K, V) = softmax(\frac{QK^T}{\sqrt{d_k}})V
\]

### Multi-Head Attention（多头注意力）
并行计算多组注意力，捕获不同特征。

## 底层逻辑
1. **输入表示**: 词嵌入 + 位置编码
2. **注意力计算**: Q、K、V 三元组
3. **残差连接**: Layer Norm + Add
4. **前馈网络**: 非线性变换
5. **输出**: Softmax 概率分布

## 应用场景
- 机器翻译
- 文本摘要
- 问答系统
- 文本生成
`,
    keywords: ["Transformer", "Encoder", "Decoder", "注意力", "Attention", "Self-Attention", "架构"],
    category: "NLP"
  },

  // 机器学习基础
  "day19": {
    id: "day19",
    title: "机器学习：决策树与随机森林",
    date: "2025/08/19",
    summary: "回归基础，理解机器学习中分类问题的核心模型——决策树与集成学习。",
    fullContent: `# 机器学习：决策树与随机森林

## 决策树（Decision Tree）

### 核心思想
通过一系列规则对数据进行分层判断，最终得出分类结果。

### 构建过程
1. **特征选择**: 选择最优划分特征（信息增益、Gini 系数）
2. **树构建**: 递归划分数据
3. **剪枝**: 防止过拟合（预剪枝、后剪枝）

### 优缺点
- ✅ 可解释性强
- ✅ 无需特征缩放
- ❌ 容易过拟合
- ❌ 对数据敏感

## 随机森林（Random Forest）

### 核心思想
构建多棵决策树，通过投票机制得出最终结果。

### Bagging 策略
- **Bootstrap采样**: 有放回随机抽样
- **特征随机**: 每个节点只考虑部分特征
- **模型聚合**: 多树投票/平均

### 优势
- ✅ 降低方差，防止过拟合
- ✅ 性能稳定
- ✅ 可并行化

## 实际应用
在数据分析中，我使用 Python (scikit-learn) 实现决策树和随机森林，用于分类和回归任务。
`,
    keywords: ["机器学习", "ML", "决策树", "随机森林", "Random Forest", "分类", "集成学习"],
    category: "ML"
  },

  // 产品经理通识
  "day2": {
    id: "day2",
    title: "产品与用户需求：洞察逻辑",
    date: "2025/08/02",
    summary: "回归产品原点，探讨如何从海量用户反馈中提炼真需求，拒绝伪命题。",
    fullContent: `# 产品与用户需求洞察

## 核心观点
从海量用户反馈中提炼真需求，拒绝伪命题。

## 需求洞察方法

### 1. 用户反馈收集
- 问卷调查
- 深度访谈
- 行为数据分析
- A/B 测试

### 2. 需求分层
- **显性需求**: 用户直接表达的需求
- **隐性需求**: 用户未明确表达但真实存在的需求
- **潜在需求**: 用户自己都没意识到的需求

### 3. 需求验证
- **数据支撑**: 用数据验证假设
- **MVP测试**: 小范围快速验证
- **用户访谈**: 深入了解真实痛点

## 拒绝伪命题
- **伪命题特征**: 看起来合理但无真实需求
- **验证方法**: 数据驱动 + 用户访谈
- **产品思维**: 不做"我觉得"，做"用户需要"

## 实战经验
在京东、蔚来等实习中，我通过埋点数据分析用户行为，识别真实需求，优化产品功能。
`,
    keywords: ["产品", "需求", "洞察", "用户反馈", "MVP", "A/B测试", "数据驱动"],
    category: "Product"
  },

  // Python 基础
  "day13": {
    id: "day13",
    title: "Python 编程基础：面向对象篇",
    date: "2025/08/13",
    summary: "Python 虚拟环境搭建与 OOP 编程范式，为 AI 开发构建坚实的工程底座。",
    fullContent: `# Python 面向对象编程

## OOP 核心概念

### 1. 类与对象
\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def introduce(self):
        return f"I'm {self.name}, {self.age} years old"
\`\`\`

### 2. 封装
隐藏实现细节，暴露必要接口。

### 3. 继承
\`\`\`python
class Student(Person):
    def __init__(self, name, age, student_id):
        super().__init__(name, age)
        self.student_id = student_id
\`\`\`

### 4. 多态
同一接口，不同实现。

## Python 虚拟环境
\`\`\`bash
# 创建虚拟环境
python -m venv myenv

# 激活虚拟环境
source myenv/bin/activate  # Linux/Mac
myenv\\Scripts\\activate     # Windows

# 安装依赖
pip install -r requirements.txt
\`\`\`

## AI 开发应用
在 AI 项目中，我使用 Python 进行：
- 数据处理（pandas, numpy）
- 模型训练（scikit-learn, PyTorch）
- API 开发（FastAPI）
- 自动化脚本
`,
    keywords: ["Python", "OOP", "面向对象", "类", "对象", "虚拟环境", "封装", "继承", "多态"],
    category: "Python"
  },

  // AI 应用与前沿
  "day10": {
    id: "day10",
    title: "AI 主要任务与应用场景",
    date: "2025/08/10",
    summary: "全景式扫描人工智能应用领域，定义 AI 产品经理的通识知识边界。",
    fullContent: `# AI 主要任务与应用场景

## AI 核心任务

### 1. 分类（Classification）
- 图像分类
- 情感分析
- 垃圾邮件检测

### 2. 回归（Regression）
- 房价预测
- 销量预测
- 趋势分析

### 3. 聚类（Clustering）
- 用户分群
- 异常检测
- 推荐系统

### 4. 生成（Generation）
- 文本生成（GPT）
- 图像生成（DALL-E）
- 代码生成（Copilot）

## AI 应用场景

### 企业级应用
- **智能客服**: RAG + LLM
- **知识管理**: 企业知识库
- **数据分析**: BI + AI
- **自动化**: RPA + AI

### 消费级应用
- **个人助手**: Siri、Alexa
- **内容创作**: AI 写作、AI 绘画
- **教育**: 智能辅导
- **娱乐**: AI 游戏

## AI 产品经理通识
- 理解 AI 技术边界
- 掌握基本 ML/DL 概念
- 熟悉主流 AI 工具
- 数据驱动思维

## 行业前沿
定期追踪：
- 大语言模型（LLM）
- 多模态 AI
- Agent 应用
- AI 伦理与安全
`,
    keywords: ["AI", "应用场景", "分类", "回归", "聚类", "生成", "产品经理", "通识"],
    category: "AI"
  }
};

/**
 * 按类别分组的笔记索引
 */
export const notesByCategory: Record<string, string[]> = {
  "RAG": ["day42"],
  "Agent": ["day41"],
  "Prompt": ["day39"],
  "NLP": ["day31"],
  "ML": ["day19"],
  "Product": ["day2"],
  "Python": ["day13"],
  "AI": ["day10"]
};

/**
 * 关键词到笔记 ID 的映射
 */
export const keywordToNoteId: Record<string, string> = {
  "rag": "day42",
  "检索增强": "day42",
  "检索": "day42",
  "向量": "day42",
  "知识库": "day42",

  "agent": "day41",
  "智能体": "day41",
  "上下文": "day41",
  "context": "day41",

  "prompt": "day39",
  "提示词": "day39",
  "cot": "day39",
  "chain of thought": "day39",
  "few-shot": "day39",

  "transformer": "day31",
  "注意力": "day31",
  "attention": "day31",
  "encoder": "day31",
  "decoder": "day31",

  "决策树": "day19",
  "随机森林": "day19",
  "机器学习": "day19",
  "ml": "day19",
  "分类": "day19",

  "产品": "day2",
  "需求": "day2",
  "洞察": "day2",
  "用户": "day2",

  "python": "day13",
  "面向对象": "day13",
  "oop": "day13",

  "ai": "day10",
  "应用场景": "day10",
  "人工智能": "day10"
};
