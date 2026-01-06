import { notesKnowledgeBase, keywordToNoteId, NoteEntry } from '../data/notesKnowledgeBase';

/**
 * 笔记检索服务
 * 基于 SKILL 方法：Structured Knowledge Injection with Layered Lookup
 */
export class NoteRetrievalService {
  /**
   * 根据用户问题检索相关笔记
   */
  findRelevantNotes(userQuestion: string): NoteEntry[] {
    const relevantNotes: NoteEntry[] = [];
    const questionLower = userQuestion.toLowerCase();

    // 1. 精确关键词匹配
    for (const [keyword, noteId] of Object.entries(keywordToNoteId)) {
      if (questionLower.includes(keyword.toLowerCase())) {
        const note = notesKnowledgeBase[noteId];
        if (note && !relevantNotes.find(n => n.id === note.id)) {
          relevantNotes.push(note);
        }
      }
    }

    // 2. 语义相关匹配（基于类别）
    if (questionLower.includes('大模型') || questionLower.includes('llm')) {
      const day31 = notesKnowledgeBase['day31']; // Transformer
      if (day31 && !relevantNotes.find(n => n.id === 'day31')) {
        relevantNotes.push(day31);
      }
    }

    if (questionLower.includes('学习') || questionLower.includes('笔记')) {
      // 返回所有笔记的摘要
      Object.values(notesKnowledgeBase).forEach(note => {
        if (!relevantNotes.find(n => n.id === note.id)) {
          relevantNotes.push(note);
        }
      });
    }

    // 限制返回数量，避免上下文过长（最多3篇）
    return relevantNotes.slice(0, 3);
  }

  /**
   * 生成笔记的简要索引（用于 System Prompt）
   */
  generateNotesIndex(): string {
    let index = `## 知识笔记索引

以下是我的核心知识储备，包括 AI 技术笔记和个人 AI 助手的实现原理：

`;

    // 按类别分组
    const categories: Record<string, NoteEntry[]> = {};
    Object.values(notesKnowledgeBase).forEach(note => {
      if (!categories[note.category]) {
        categories[note.category] = [];
      }
      categories[note.category].push(note);
    });

    // 生成索引（AI 类别放最前面，方便 HR 了解技术原理）
    const categoryOrder = ['AI', 'RAG', 'Prompt', 'Agent', 'NLP', 'ML', 'Product', 'Python'];

    categoryOrder.forEach(category => {
      if (categories[category]) {
        index += `### ${category}\n\n`;
        categories[category].forEach(note => {
          index += `**${note.title}**\n`;
          index += `- 日期: ${note.date}\n`;
          index += `- 摘要: ${note.summary}\n`;
          if (note.id !== 'ai-assistant') {
            index += `- ID: ${note.id.toUpperCase()}\n`;
          }
          index += `\n`;
        });
      }
    });

    index += `**使用说明**: 当用户问及相关问题时，我会自动加载对应笔记的详细内容进行回答。如果想了解 AI 助手的技术实现，可以问"你的 AI 助手是怎么工作的？"。`;

    return index;
  }

  /**
   * 获取笔记的完整内容（带格式）
   */
  getFormattedNotes(notes: NoteEntry[]): string {
    if (notes.length === 0) return '';

    let content = `\n\n## 📚 相关笔记详细内容\n\n`;

    notes.forEach((note, index) => {
      content += `### ${index + 1}. ${note.title} (Day${note.id.replace('day', '')})\n\n`;
      content += `${note.fullContent}\n\n`;
      content += `---\n\n`;
    });

    return content;
  }
}

export const noteRetrievalService = new NoteRetrievalService();
