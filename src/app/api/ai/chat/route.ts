import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { message, history, userProfile, language } = await req.json();

    const isTelugu = language === 'te' || /[\u0C00-\u0C7F]/.test(message || '');
    const apiKey = process.env.GEMINI_API_KEY;

    // If Gemini API Key is available, invoke Gemini 1.5 / 2.0 Flash
    if (apiKey && apiKey !== 'your_gemini_api_key_here') {
      try {
        const systemPrompt = `You are VitaCoach, an expert AI health, nutrition, and fitness assistant on the VitaFit AI platform.
User profile:
- Name: ${userProfile?.displayName || 'User'}
- Goal: ${userProfile?.primaryGoal || 'general health'}
- Diet: ${userProfile?.dietPreference || 'vegetarian'}
- Allergies: ${(userProfile?.allergies || []).join(', ') || 'None'}
- Location/Cuisine preference: South & North Indian
- Language: ${isTelugu ? 'Telugu (తెలుగు)' : 'English'}

Instructions:
1. Provide personalized, practical nutrition, Indian meal alternatives, workout forms, and lifestyle advice.
2. If language is Telugu or user asked in Telugu, respond primarily in warm, natural Telugu script with clear nutritional terms.
3. Keep answers concise, actionable, and encouraging.
4. MEDICAL DISCLAIMER: Always remember that you are an AI wellness guide, not a medical doctor. Do not prescribe medicines or diagnose diseases.`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                { role: 'user', parts: [{ text: systemPrompt }] },
                ...((history || []).map((h: any) => ({
                  role: h.role === 'assistant' ? 'model' : 'user',
                  parts: [{ text: h.content }],
                }))),
                { role: 'user', parts: [{ text: message }] },
              ],
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const replyText =
            geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return NextResponse.json({ reply: replyText });
          }
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to local intelligence:', geminiError);
      }
    }

    // Intelligent Fallback Knowledge Engine (English & Telugu)
    const lower = (message || '').toLowerCase();
    let reply = '';

    if (isTelugu) {
      if (lower.includes('నీళ్లు') || lower.includes('water') || lower.includes('దాహం')) {
        reply = `రోజుకు మీ శరీర బరువుకు సుమారు 35ml నీరు అవసరం. మీ లక్ష్యం రోజుకు దాదాపు 2.5 నుండి 3 లీటర్లు. భోజనానికి 30 నిమిషాల ముందు లేదా తర్వాత గోరువెచ్చని నీరు తాగడం జీర్ణక్రియకు ఎంతో మంచిది!`;
      } else if (lower.includes('టిఫిన్') || lower.includes('breakfast') || lower.includes('అల్పాహారం') || lower.includes('ఇడ్లీ') || lower.includes('దోశ')) {
        reply = `ఆరోగ్యకరమైన ఉదయపు అల్పాహారానికి:
1. పెసరట్టు (అధిక ప్రోటీన్ మరియు ఫైబర్) అల్లం పచ్చడితో.
2. ఆవిరి ఇడ్లీ సాంబార్‌తో (నూనె లేకుండా ప్రోబయోటిక్ పోషకాలు).
3. వెజిటబుల్ ఉప్మా లేదా ఓట్స్ కిచిడీ.
మీరు ఏది ఎంచుకోవాలనుకుంటున్నారు?`;
      } else if (lower.includes('వ్యాయామం') || lower.includes('workout') || lower.includes('exercise') || lower.includes('బరువు')) {
        reply = `రోజువారీ ఫిట్‌నెస్ కోసం:
- 10-12 రౌండ్ల సూర్య నమస్కారాలు మొత్తం శరీర కండరాలను ఉత్తేజపరుస్తాయి.
- 30 నిమిషాల చురుకైన నడక గుండె ఆరోగ్యానికి ఉత్తమం.
- వారానికి 3 సార్లు తేలికపాటి బరువులు లేదా బాడీవెయిట్ స్క్వాట్స్ చేయడం ఎముకల బలానికి మేలు చేస్తుంది.`;
      } else {
        reply = `నమస్కారం! నేను మీ వీటాకోచ్ (VitaCoach) AI అసిస్టెంట్‌ని. మీకు సమతుల్య భారతీయ ఆహారం, పోషకాహార విలువలు, సులభమైన వ్యాయామాలు మరియు ఆరోగ్యకరమైన జీవనశైలి అలవాట్లపై సలహాలు ఇవ్వగలను. మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?`;
      }
    } else {
      if (lower.includes('protein') || lower.includes('paneer') || lower.includes('egg') || lower.includes('muscle')) {
        reply = `For optimal muscle synthesis on an Indian diet, aim for 1.2g to 1.6g of protein per kg of bodyweight:
• **Plant-based:** Sprouted Green Moong (24g/100g raw), Sattu drink, Roasted Chana, Edamame, and Tofu.
• **Dairy & Eggs:** Low-fat fresh Paneer (18g/100g), Greek hung curd (10g/100g), Boiled whole eggs (6g per egg).
• **Lean Meats:** Tandoori grilled chicken breast (31g/100g) or steamed Rohu/Seer fish.
Pair your protein source with complex carbs and colorful vegetables for complete nutrient absorption!`;
      } else if (lower.includes('water') || lower.includes('hydration')) {
        reply = `Staying hydrated maintains cognitive focus, cellular hydration, and supports kidney filtration.
• Target: ~35ml per kg body weight (~2.5L to 3.0L daily).
• Pro-tip: Keep a copper or stainless steel bottle nearby, and consider natural electrolyte drinks like Spiced Buttermilk (Majjiga) or Coconut Water after warm workouts.`;
      } else if (lower.includes('breakfast') || lower.includes('idli') || lower.includes('dosa')) {
        reply = `Traditional South Indian breakfasts are nutrient dense when balanced properly:
• **Pesarattu (Green Gram Dosa):** Loaded with 13-14g protein and prebiotic fiber.
• **Steamed Idlis with Toor Dal Sambar:** High digestibility and zero trans fats.
• **Vegetable Upma:** Add extra green peas, carrots, and roasted peanuts to lower the overall glycemic impact.`;
      } else if (lower.includes('weight loss') || lower.includes('deficit') || lower.includes('fat loss')) {
        reply = `VitaFit AI recommends gentle, sustainable fat loss through a modest 300-350 kcal deficit:
1. Prioritize home-cooked whole foods with high satiety (dal, vegetables, roti/brown rice).
2. Maintain daily physical activity (7,000 - 10,000 steps).
3. Prioritize 7-8 hours of sound sleep—poor sleep increases ghrelin (hunger hormone).
We avoid crash diets to safeguard your thyroid and resting metabolic rate!`;
      } else {
        reply = `Hello! I'm VitaCoach, your personal AI health and fitness guide on VitaFit AI.
I can help you with:
• Customizing traditional Indian meals to fit your macros.
• Workout forms for home or gym exercises.
• Safe, non-restrictive nutrition guidance.
• What to cook using ingredients currently in your kitchen.

How can I assist your health journey today?`;
      }
    }

    return NextResponse.json({ reply });
  } catch (err: any) {
    return NextResponse.json(
      { reply: 'VitaCoach is temporarily resting. Please try asking again in a moment.' },
      { status: 500 }
    );
  }
}
