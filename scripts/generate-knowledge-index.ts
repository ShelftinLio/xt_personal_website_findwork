import { createReadStream } from 'fs';
import { createInterface } from 'readline';

interface Note {
  topic: string;
  title: string;
  date: string;
  content: string;
  tags: string;
}

async function parseCSV(filePath: string): Promise<Note[]> {
  const notes: Note[] = [];
  const fileStream = createReadStream(filePath);
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let headers: string[] = [];
  let isFirstLine = true;

  for await (const line of rl) {
    if (isFirstLine) {
      headers = line.split(',');
      isFirstLine = false;
      continue;
    }

    // 简单的 CSV 解析（实际应用中应使用专门的 CSV 库）
    const values = line.split('","');
    if (values.length >= 6) {
      const note: Note = {
        topic: values[0].replace(/^"/, ''),
        title: values[1],
        date: values[2],
        content: values[4].slice(0, 200) + '...', // 取前200字符作为摘要
        tags: values[8] || ''
      };
      notes.push(note);
    }
  }

  return notes;
}

function generateMarkdownIndex(notes: Note[]): string {
  let markdown = `## 小红书学习笔记（100天 AI 产品经理）

以下是我系统学习 AI 产品经理的知识笔记，涵盖 RAG、Prompt、Agent、ML/DL 等核心内容。

`;

  // 按主题分组
  const groupedNotes = notes.reduce((acc, note) => {
    const topic = note.topic || '其他';
    if (!acc[topic]) acc[topic] = [];
    acc[topic].push(note);
    return acc;
  }, {} as Record<string, Note[]>);

  // 生成每个主题的索引
  Object.entries(groupedNotes).forEach(([topic, topicNotes]) => {
    markdown += `### ${topic}\n\n`;

    topicNotes.forEach(note => {
      const dayMatch = note.title.match(/Day(\d+)/);
      const day = dayMatch ? dayMatch[1] : '';
      const title = note.title.replace(/ Day\d+\/\d+/, '');

      markdown += `**${title}** (Day${day})\n`;
      markdown += `- 日期: ${note.date}\n`;
      markdown += `- 摘要: ${note.content}\n`;
      if (note.tags) {
        markdown += `- 标签: ${note.tags}\n`;
      }
      markdown += `\n`;
    });
  });

  return markdown;
}

// 主函数
async function main() {
  const csvPath = './xiaotian-ai-skill/data/小红书文章资料归档_数据表.csv';
  const notes = await parseCSV(csvPath);
  const index = generateMarkdownIndex(notes);

  console.log(index);
}

main().catch(console.error);
