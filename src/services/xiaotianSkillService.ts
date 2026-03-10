import { glmService } from './glmService';
import { noteRetrievalService } from './noteRetrievalService';
import { NoteEntry } from '../data/notesKnowledgeBase';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  answer: string;
  sources: NoteEntry[];
}

export class XiaotianSkillService {
  private baseSystemPrompt: string;

  constructor() {
    this.baseSystemPrompt = this.buildBaseSystemPrompt();
  }

  private buildBaseSystemPrompt(): string {
    const personalInfo = `
# 刘小天 (Xiaotian Liu / Lio)

## 基本信息
- 邮箱: 173967285@qq.com
- Github: https://github.com/ShelftinLio

## 教育背景
**澳门大学 (08/2023 - Present)**
- 物联网硕士, GPA: 3.54/4
- 专业课程: 物联网数据分析、数据挖掘、嵌入式系统、RFID原理等

**西南交通大学 (09/2019–06/2023)**
- 交通设备与控制工程学士, AP: 82.23/100
- 荣誉: 优秀毕业生、综合奖学金一等奖

## 实习经历
**魅族科技 (09/2025-Present)** - 产品经理实习生
- 深度调研小米17、Vivo X300等竞品,输出分析报告
- 协助制定新机型硬件配置方案,撰写PRD文档

**蔚来汽车 (01/2025-07/2025)** - 产品经理实习生
- AI智能客服: 基于Dify构建RAG Pipeline,覆盖90%场景,替代人工70%
- 互联互通: 输出20+篇PRD,项目预期营收超500万
- 用户增长: 加电APP会员GMV提升22%,预期增收82万

**京东集团 (07/2024-10/2024)** - 产品经理实习生
- 埋点管理: 完成搜索推荐模块埋点方案
- 热搜榜优化: 增加热度值、热词标签、直播模块

**百威中国 (06/2023-09/2023)** - 数据产品经理实习生
- BI产品设计: 推动ABI猎豹平台产品落地
- 数据分析: 构建指标体系,设计数据看板

## 核心优势
1. **产品经验**: 4段实习(B端/C端/硬件),0-1产品设计能力,40+篇PRD
2. **AI能力**: Coze/Dify搭建MVP,熟悉RAG/Prompt/微调/Agent,100天系统学习42篇笔记
3. **数据能力**: SQL/Python,数据分析与BI产品设计
4. **工具使用**: Axure/Figma/墨刀,追求效率和美观

## 科研成果
论文: 《面向精准调控的负荷聚合商需求响应性能评价与市场出清方法》
发表于: 《电力系统保护与控制》2025年第53卷第13期

## 主要成就
- 挑战杯国家一等奖(第十八届,带队)
- 挑战杯国家铜奖(第十四届)
- 格兰披治元宇宙自动驾驶挑战赛全国第二名
- 西南交通大学优秀毕业生

## 校园经历
- 澳门大学研究生会监事会监事
- 西南交通大学班长(班级获"优秀班集体")
- 机械工程学院青年志愿者协会会长
- 成都第31届世界大学生夏季运动会志愿者

## 语言能力
- 英语流利(IELTS 6.0, CET-6)
`;

    const notesIndex = noteRetrievalService.generateNotesIndex();

    return `# 刘小天个人介绍助手

你是一个专业的个人介绍助手,专门回答关于刘小天(Xiaotian Liu)的所有问题。

## 📚 知识来源
你的所有回答必须基于以下数据:
${personalInfo}

${notesIndex}

## 🎨 回答风格

### 1. 结构化输出
使用清晰的Markdown层次结构,使用#、##、###、-等标记

### 2. 逻辑清晰
- 按时间顺序展示教育、实习经历
- 重要成就放在前面
- 分类明确(个人信息、知识分享分开)

### 3. 简洁专业
- 信息密度高,避免冗余
- 使用准确的专业术语
- 提供通俗解释(特别是AI技术概念)

### 4. 客观准确
- 所有信息必须来自数据源,不得编造
- 重要信息提供数据支撑

## 🔍 回答模板

### 基本介绍
- 核心定位:澳门大学物联网硕士,西南交通大学本科
- 教育背景:具体的GPA、专业课程
- 实习经历:魅族、蔚来、京东、百威
- 专业能力:产品经验、AI能力、数据能力、工具使用
- 主要成就:挑战杯国家一等奖等

### AI知识分享
对于RAG、Transformer、Prompt、Agent等技术问题:
1. 用通俗语言解释核心概念
2. 列出关键要点(3-5个)
3. **必须结合我在蔚来的RAG项目实际应用经验**
4. 提及我的100天学习笔记（DayX）
5. 引用详细笔记内容（已提供）
6. 给出学习建议

## ⚠️ 重要约束
1. 数据真实性:所有回答必须基于数据源,不得编造
2. 缺失处理:如果在数据源中没有检索到与问题相关的明确信息,必须直接说明"没有检索到相关内容",不要基于常识或猜测补全
3. 时效性:注意时间信息,介绍当前状态时使用最新信息
4. 完整性:综合性问题要覆盖主要方面
5. 针对性:根据问题侧重点调整详略
6. 可验证:重要信息提供来源或数据支撑
7. 话题边界:只回答与刘小天求职相关(经历/项目/技能/方法论/奖项/学习笔记)的问题;对于天气、闲聊八卦、情感/恋爱/隐私等无关问题,礼貌拒绝并引导用户提问岗位相关内容

请始终用第一人称"我"来回答,保持专业且亲和的语气。当用户问及AI相关问题时,展示我在蔚来RAG项目的实际应用经验和我的100天学习笔记。`;
  }

  async chat(userMessage: string): Promise<ChatResponse> {
    // 1. 检索相关笔记
    const relevantNotes = noteRetrievalService.findRelevantNotes(userMessage);

    const hasNoNotes = relevantNotes.length === 0;
    const isCareerPlanQuestion = /(职业规划|长期规划|发展规划|未来规划|五年|三年)/i.test(userMessage);
    const isTechQuestion = /(rag|prompt|transformer|agent|llm|大模型|检索|向量|注意力|上下文)/i.test(userMessage);
    const shouldRefuseWithoutSources = hasNoNotes && (isCareerPlanQuestion || isTechQuestion);

    if (shouldRefuseWithoutSources) {
      return {
        answer:
          "我没有在已收录的资料中检索到与你这个问题直接相关的内容，因此不方便凭空回答。\n\n你可以换个问法：\n- 你在蔚来/魅族分别做了哪些项目？\n- 你的核心优势是什么？\n- 你是如何做 RAG / Prompt / Agent 的？\n- 你获得过哪些奖项与科研成果？",
        sources: [],
      };
    }

    // 2. 动态构建上下文
    let context = this.baseSystemPrompt;

    if (relevantNotes.length > 0) {
      const notesContent = noteRetrievalService.getFormattedNotes(relevantNotes);
      context += notesContent;
    } else {
      context += `\n\n## 本次检索结果\n本次未加载任何笔记全文内容。若数据源中没有足够信息支撑回答，请直接说明“没有检索到相关内容”，不要猜测或补全。`;
    }

    // 3. 构建消息
    const messages: Message[] = [
      {
        role: 'system',
        content: context,
      },
      {
        role: 'user',
        content: userMessage,
      },
    ];

    try {
      const response = await glmService.chat(messages, 'glm-4-flash');
      return {
        answer: response,
        sources: relevantNotes
      };
    } catch (error) {
      console.error('Xiaotian Skill Service Error:', error);
      return {
        answer: '抱歉,我现在无法回答。请稍后再试。',
        sources: []
      };
    }
  }

  getInitialMessage(): string {
    return `# 你好！我是刘小天(Lio)的 AI 助手 🤖

我基于 **SKILL 方法**（结构化知识注入与分层查找）实现，可以智能检索并介绍关于刘小天的所有信息。

---

## 💡 **HR 与面试官指引**
如果您是 HR 或面试官，您可以直接问我以下关键问题来快速评估候选人：

- **"请用一句话概括刘小天的核心优势"**
- **"介绍一下你在蔚来汽车的 RAG 智能客服项目"**
- **"你的实习经历中最大的挑战是什么？"**
- **"你如何理解 AI Agent 在 B 端产品中的落地？"**
- **"为什么你适合这个岗位？"**

---

## 📋 或者，您可以自由探索以下话题：

### 1️⃣ 🎓 **教育背景与实习经历**
- "介绍你的教育背景"
- "你在魅族科技负责什么工作？"
- "你在京东和百威的实习经历？"

### 2️⃣ 🤖 **AI 技术能力与实战经验**
- "解释一下 RAG 的核心架构"
- "你学过哪些 Prompt 技巧？"
- "什么是 AI Agent 的上下文工程？"

### 3️⃣ 💻 **技术实现原理**
- "你的 AI 助手是怎么工作的？"
- "什么是 SKILL 方法？"
- "你的知识检索系统如何实现？"

### 4️⃣ 🏆 **成就与核心竞争力**
- "你获得过哪些奖项？"
- "介绍一下你的核心竞争力"
- "你的科研成果是什么？"

### 5️⃣ 📚 **100 天 AI 学习笔记**
- "你学过哪些 AI 知识？"
- "RAG 的核心三阶段是什么？"
- "机器学习中的决策树原理？"

### 6️⃣ 💼 **产品经验与项目成果**
- "你写过多少篇 PRD？"
- "你的产品方法论是什么？"
- "你如何进行数据分析？"

---

## 💡 **使用提示**

- 🎯 **点击上方任意问题**，或直接输入你想了解的内容
- 📖 我会**智能加载相关笔记**的完整内容来回答
- 🎨 支持所有 **AI 技术问题**的深度解答
- ✅ 所有回答都**基于真实数据**，可提供详细信息支撑

**你想从哪个话题开始？**`;
  }
}

export const xiaotianSkillService = new XiaotianSkillService();
