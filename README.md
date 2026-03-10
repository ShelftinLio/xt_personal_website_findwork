# Xiaotian Liu (Lio) - Personal Website & AI Assistant

Welcome to my personal website repository. This project serves as an interactive resume and portfolio, featuring an **AI Digital Twin** designed to answer questions about my professional background, skills, and projects.

It is built with a modern tech stack, emphasizing **Ultimate Quality** in both design and engineering.

🔗 **Live Demo**: [https://xiaotianlio.cloud](https://xiaotianlio.cloud)

![Lio Portfolio Preview](public/Lio.png)

## 🌟 Key Features

### 1. **Interactive AI Assistant (Digital Twin)**
- Powered by the **SKILL Method** (Structured Knowledge Injection & Layered Lookup).
- A custom-built RAG (Retrieval-Augmented Generation) system that retrieves context from my personal knowledge base (Markdown notes).
- **Smart HR Guide**: Pre-configured prompts for interviewers to quickly assess core competencies.
- **Thinking State**: Real-time feedback ("Thinking deeply...") to enhance user experience during AI generation.

### 2. **Immersive UI/UX**
- **Terminal-Style Intro**: A developer-friendly "About Me" section simulating a Zsh terminal.
- **Dual-Track Roadmap**: An innovative horizontal scroll visualization for Education & Career paths (Up/Down interaction).
- **Glassmorphism Design**: High-end aesthetic using Tailwind CSS and Framer Motion for smooth animations.

### 3. **Content Integration**
- **Learning Insights**: Syncs with my "100 Days of AI Product Manager" series from Xiaohongshu.
- **Project Showcase**: Detailed breakdown of my internships at **NIO, Meizu, JD.com, and Budweiser**.

---

## 🛠 Tech Stack

- **Frontend**: [React 18](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend (Proxy)**: Node.js, Express (handles API requests to Zhipu AI and serves static files)
- **AI Model**: [Zhipu GLM-4-Flash](https://open.bigmodel.cn/) (via API)
- **Deployment**: Ubuntu Server, Nginx (Reverse Proxy), PM2 (Process Manager)

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18+)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/ShelftinLio/xt_personal_website_findwork.git
cd xt_personal_website_findwork
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add your Zhipu AI API Key:

```env
# Server Configuration
PORT=3000

# AI Model API Key (Required for Chat)
GLM_API_KEY=your_zhipu_api_key_here
```
> **Note**: The `.env` file is git-ignored for security. Do not commit your real keys.

### 4. Run Locally (Development)
To start the frontend development server (Note: API calls will fail without the backend proxy running):
```bash
npm run dev
```

To run the full stack (Frontend + Backend Proxy) locally, you need to build the frontend first and then run the server:
```bash
npm run build
node server/index.js
```
*Access the app at `http://localhost:3000`*

---

## 📦 Deployment Guide

### 1. Build for Production
```bash
npm run build
```
This generates the `dist/` folder containing the optimized static assets.

### 2. Start the Node.js Server
We use `pm2` to manage the Node.js process in production.

```bash
# Install PM2 globally if not installed
npm install -g pm2

# Start the server
pm2 start server/index.js --name personal-website

# Save the process list for auto-restart
pm2 save
pm2 startup
```

### 3. Nginx Reverse Proxy (Optional but Recommended)
If you are deploying on a server with Nginx, use the following configuration to proxy traffic from port 80 to 3000:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 📂 Project Structure

```
├── public/              # Static assets (Images, Favicon)
├── server/              # Node.js Backend
│   └── index.js         # Express server (API Proxy + Static File Serving)
├── src/
│   ├── components/      # React Components (MarkdownRenderer, etc.)
│   ├── data/            # Knowledge Base Data (notesKnowledgeBase.ts)
│   ├── services/        # AI & Data Services (glmService, xiaotianSkillService)
│   ├── App.tsx          # Main Application Entry
│   └── index.css        # Global Styles (Tailwind directives)
├── index.html           # HTML Entry Point
├── package.json         # Dependencies & Scripts
├── tsconfig.json        # TypeScript Configuration
├── vite.config.ts       # Vite Configuration
└── README.md            # Project Documentation
```

---

## 🤝 Contact

- **Email**: 173967285@qq.com
- **Role**: Product Manager Intern (AI, Hardware & Mobility)
- **Location**: Chengdu / Macau

---

*Designed & Developed by Xiaotian Liu (Lio) © 2025*
