import axios from 'axios';

const GLM_API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class GLMService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async chat(messages: Message[], model: string = 'glm-4-flash'): Promise<string> {
    try {
      const response = await axios.post<ChatResponse>(
        GLM_API_URL,
        {
          model,
          messages,
          temperature: 0.7,
          top_p: 0.9,
          max_tokens: 2000,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
          },
        }
      );

      return response.data.choices[0]?.message?.content || '抱歉,我无法生成回复。';
    } catch (error) {
      console.error('GLM API Error:', error);
      throw error;
    }
  }
}

export const glmService = new GLMService(import.meta.env.VITE_GLM_API_KEY || '');
