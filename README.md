# AiCruiter - AI Voice Assistant For Interviews

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/AI-Powered-blue?style=for-the-badge" alt="AI Powered" />
  <img src="https://img.shields.io/badge/Voice-Assistant-green?style=for-the-badge" alt="Voice Assistant" />
</div>

## 🎯 Overview

AiCruiter is an intelligent AI-powered voice assistant designed to revolutionize the interview process. This cutting-edge application leverages advanced AI technology to conduct automated interviews, providing a seamless and efficient screening experience for both recruiters and candidates.

![image](https://github.com/user-attachments/assets/eb7fa415-e7f5-4da1-9f1e-0281c72dd7b8) <br/> <br/> <br/> <br/>
![image](https://github.com/user-attachments/assets/ec6d1edd-b239-425b-ba47-8f3e6a96087d) <br/> <br/> <br/> <br/>
![image](https://github.com/user-attachments/assets/373efda8-6219-4f5f-a3c3-e009bf097b04) <br/> <br/> <br/> <br/>
![image](https://github.com/user-attachments/assets/b28e598c-46cd-4bbd-86ac-2b3f455680b9) <br/> <br/> <br/> <br/>
![image](https://github.com/user-attachments/assets/2cfc3bd7-3ace-4a6c-8d93-72bb52791c64) <br/> <br/> <br/> <br/>
![image](https://github.com/user-attachments/assets/cd10140e-e247-4112-a4cc-367c0fb4b28d) <br/> <br/> <br/> <br/>
![image](https://github.com/user-attachments/assets/7c5cebe9-370f-4fe5-9edc-a29a13605ee6) <br/> <br/> <br/> <br/>








## ✨ Features

- **🎤 Voice-Powered Interviews**: Conduct natural, conversational interviews using advanced speech recognition and synthesis
- **🤖 AI-Driven Screening**: Intelligent candidate evaluation and scoring based on responses
- **📊 Real-time Analytics**: Get instant feedback and detailed candidate assessments
- **📝 Automated Reporting**: Generate comprehensive interview reports and candidate rankings
- **🎯 Customizable Questions**: Tailor interview questions based on job requirements and roles
- **⚡ Real-time Processing**: Instant analysis and response generation during interviews
- **📱 Responsive Design**: Works seamlessly across desktop and mobile devices
- **🔊 Natural Speech**: High-quality text-to-speech and speech-to-text capabilities

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Modern web browser with microphone access

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HarshTanwar143/AiCruiter---AI-Voice-Assistant-For-Interviews.git
   cd AiCruiter---AI-Voice-Assistant-For-Interviews
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your API keys and configuration:
   ```env
   NEXT_PUBLIC_AI_API_KEY=your_ai_api_key
   NEXT_PUBLIC_SPEECH_API_KEY=your_speech_api_key
   # Add other required environment variables
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Frontend**: React 18+, TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI API / Custom AI Models
- **Speech Processing**: Web Speech API / Third-party Speech Services
- **Database**: Supabase
- **Deployment**: Vercel

## 📁 Project Structure

```
AiCruiter/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── components/        # React components
│   ├── interview/         # Interview pages
│   └── page.js           # Home page
├── components/            # Shared components
│   ├── ui/               # UI components
│   ├── InterviewBot/     # AI interview components
│   └── Analytics/        # Analytics components
├── lib/                  # Utility functions
├── public/              # Static assets
├── styles/              # Global styles
└── types/               # TypeScript definitions
```

## 🎮 How to Use

1. **Start an Interview Session**
   - Click "Start Interview" on the homepage
   - Allow microphone permissions when prompted
   - Select interview type and position

2. **Conduct the Interview**
   - The AI will ask questions automatically
   - Speak your responses naturally
   - The system will analyze responses in real-time

3. **Review Results**
   - Get instant feedback after each response
   - View comprehensive candidate scoring
   - Export detailed interview reports

### AI Model Configuration
- Fine-tune response evaluation criteria
- Set scoring weights for different competencies
- Customize feedback generation
