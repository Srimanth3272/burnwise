# VitaFit AI 🌿⚡
### Your Health. Your Fitness. Your Lifestyle.

VitaFit AI is a full-stack personal fitness, nutrition, and lifestyle intelligence platform designed specifically for Indian and global routines. It combines personalized nutrition planning, Mifflin-St Jeor metabolic equations, multimodal food recognition, home and gym workout regimens, hydration tracking, sleep hygiene analytics, and a bilingual AI fitness assistant (**VitaCoach**) supporting both **English and Telugu (తెలుగు)**.

---

## 🌟 Key Capabilities & Features

1. **AI Indian Diet Planner**: Supports South Indian, North Indian, Vegetarian, Eggetarian, Vegan, and Non-Vegetarian choices. Covers authentic regional items (Idli, Dosa, Pesarattu, Upma, Pongal, Rice, Sambar, Rasam, Curd Rice, Chapati, Dal, Paneer, Chicken, Fish) with scaled gram portions and complete macronutrient breakdowns.
2. **Scan My Food (Multimodal AI Vision)**: Upload or take a picture of your meal plate. Multimodal AI identifies dishes, estimates portion volume, calculates macros, and asks for user confirmation before saving.
3. **What's in My Kitchen? AI**: Enter leftover ingredients or pantry staples (e.g., *Rice, tomatoes, onions, spinach, eggs*). AI suggests regional recipes, highlights missing spices, and provides step-by-step instructions.
4. **Smart Budget Meal Planner**: Tailor daily nutrition within specified budgets (e.g., ₹150–₹350/day) using economical, high-protein staples. Includes automated budget adequacy warnings to ensure nutrition is never compromised.
5. **Multilingual Voice Fitness Assistant**: Real-time voice interaction with SpeechRecognition and Text-to-Speech (TTS) supporting English and Telugu. Transcribes commands such as *"I ate two idlis and one bowl of sambar"* or *"ఈరోజు నేను ఎంత నీళ్లు తాగాను?"* into structured entries.
6. **Validated Calorie & Nutrition Calculator**: Computes Mifflin-St Jeor BMR, Total Daily Energy Expenditure (TDEE), and Asian Indian BMI thresholds. Minor protection safeguards strictly prevent restrictive deficit recommendations for users under 18.
7. **Personalized Exercise Planner**: 9 categories (Walking, Jogging, Cycling, Yoga Surya Namaskar, Bodyweight Squats, Pushups, Dumbbell Strength, Mobility, Badminton Agility) with safety considerations, duration tracking, and rest day scheduling.
8. **Hydration & Sleep Trackers**: Custom fluid vessels (250ml glass, 500ml copper bottle, 1L jug) with configurable alerts; bedtime-to-wake sleep duration calculator with circadian hygiene rules.
9. **Progress Analytics & Achievement Badges**: Interactive Recharts graphs separating energy expenditure from caloric intake, exportable JSON health records, and celebration confetti.
10. **Administrator Dashboard**: Role-based access control, system metrics, AI token tracking, verified Indian food table, exercise library management, and user feedback triage while strictly preserving individual health data privacy.

---

## 🚀 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS with custom Emerald Green (`#10b981`) and Dark Navy (`#0a0f1d`) theme
- **Icons**: Lucide Icons
- **Data Visualization**: Recharts (Responsive Area, Bar, and Line charts)
- **AI Integrations**: Google Gemini Multimodal Vision API & LLM API with resilient bilingual fallback engine
- **Authentication & Database**: Firebase Auth, Cloud Firestore, and LocalStorage persistence layer

---

## 🛠️ Local Development & Quick Start

### 1. Prerequisites
- Node.js 18+ (tested on Node v20.18.0)
- npm or yarn

### 2. Installation
```bash
git clone https://github.com/your-username/vitafit-ai.git
cd vitafit-ai
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your API keys (optional for local demo testing, as VitaFit AI includes an intelligent offline/sandbox fallback engine):
```env
# Multimodal AI Service (Google AI Studio)
GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Web Client (Optional for live cloud sync)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=vitafit-ai.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=vitafit-ai
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=vitafit-ai.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Firebase Security Rules & Architecture

VitaFit AI organizes Firestore into 14 user-isolated collections:
- `users`, `user_profiles`, `meal_logs`, `workout_logs`, `hydration_logs`, `sleep_logs`, `grocery_lists`, `saved_recipes`, `progress_records`, `notifications` (Strict user ownership)
- `food_database`, `recipes`, `exercise_library` (Public read, Admin write)
- `user_feedback` (Public create, Admin triage)

Deploy rules using the Firebase CLI:
```bash
firebase deploy --only firestore:rules
```

---

## 🌐 Production Deployment

### Deploying to Vercel
1. Import repository on [Vercel](https://vercel.com).
2. Configure build settings: Framework **Next.js**, Root Directory `./`.
3. Add `GEMINI_API_KEY` and `NEXT_PUBLIC_FIREBASE_*` variables under Environment Variables.
4. Click **Deploy**.

### Deploying to Hostinger (VPS / Node.js)
1. Build static/server output:
   ```bash
   npm run build
   ```
2. Start server with PM2:
   ```bash
   pm2 start npm --name "vitafit-ai" -- start
   ```

---

## 🛡️ Medical & Safety Disclaimer

*VitaFit AI is an educational fitness and nutritional guide. It is not a licensed medical healthcare provider and does not provide clinical diagnosis or pharmaceutical prescriptions. Always seek advice from a qualified medical doctor before adopting strenuous exercise programs or dramatic dietary alterations.*
