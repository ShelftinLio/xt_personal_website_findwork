import axios from 'axios';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const GLM_API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '1mb' }));

app.post('/api/chat', async (req, res) => {
  const apiKey = process.env.GLM_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: { message: 'GLM_API_KEY is not set' } });
    return;
  }

  const body = req.body ?? {};
  const { messages, model, temperature, top_p, max_tokens } = body;
  if (!Array.isArray(messages)) {
    res.status(400).json({ error: { message: 'messages must be an array' } });
    return;
  }

  try {
    const response = await axios.post(
      GLM_API_URL,
      {
        model: model ?? 'glm-4-flash',
        messages,
        temperature: temperature ?? 0.7,
        top_p: top_p ?? 0.9,
        max_tokens: max_tokens ?? 2000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        timeout: 60_000,
      }
    );

    res.status(response.status).json(response.data);
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      res.status(err.response.status).json(err.response.data);
      return;
    }
    console.error(err);
    res.status(502).json({ error: { message: 'Upstream request failed' } });
  }
});

const distDir = path.resolve(__dirname, '..', 'dist');
app.use(express.static(distDir));
app.get(/(.*)/, (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

const port = Number(process.env.PORT ?? 3000);
app.listen(port, '0.0.0.0', () => {
  console.log(`personal-website listening on http://0.0.0.0:${port}`);
});
