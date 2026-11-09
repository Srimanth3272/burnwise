import { NextRequest, NextResponse } from 'next/server';
import { VoiceCommandResult } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { transcript, language = 'en' } = await req.json();

    const isTelugu = language === 'te' || /[\u0C00-\u0C7F]/.test(transcript || '');
    const cleanText = (transcript || '').trim();
    const lower = cleanText.toLowerCase();

    const result: VoiceCommandResult = {
      action: 'unknown',
      confidence: 0.9,
      transcription: cleanText,
      detectedLanguage: isTelugu ? 'te' : 'en',
      parsedData: {},
      assistantReply: '',
      assistantReplyTelugu: '',
    };

    // 1. Water query or logging
    if (
      lower.includes('నీళ్లు') ||
      lower.includes('water') ||
      lower.includes('water intake') ||
      lower.includes('ఎంత నీళ్లు')
    ) {
      if (lower.includes('drank') || lower.includes('తాగాను') || lower.includes('add') || lower.includes('log') || lower.includes('కలుపు')) {
        // extract amount
        let amount = 300;
        const numMatch = lower.match(/(\d+)\s*(ml|glasses|గ్లాసులు)?/);
        if (numMatch) {
          const val = parseInt(numMatch[1]);
          if (lower.includes('glass') || lower.includes('గ్లాసు')) {
            amount = val * 250;
          } else if (val > 20) {
            amount = val;
          }
        }
        result.action = 'log_water';
        result.parsedData.waterAmountMl = amount;
        result.assistantReply = `I found a log for ${amount}ml of water. Would you like to confirm and record this into your hydration log?`;
        result.assistantReplyTelugu = `నేను ${amount}ml నీటి రికార్డును గుర్తించాను. మీ హైడ్రేషన్ లాగ్‌లో దీనిని నమోదు చేయాలా?`;
      } else {
        result.action = 'show_activity';
        result.assistantReply = 'Checking your hydration progress: you are tracking well toward your daily water goal!';
        result.assistantReplyTelugu = 'మీ నీటి రికార్డును తనిఖీ చేస్తున్నాను: మీ రోజువారీ లక్ష్యాన్ని చేరుకోవడానికి మీరు సరైన క్రమంలో ఉన్నారు!';
      }
    }
    // 2. Meal logging ("I ate two idlis and one bowl of sambar")
    else if (
      lower.includes('ate') ||
      lower.includes('తిన్నాను') ||
      lower.includes('eaten') ||
      lower.includes('had') ||
      lower.includes('breakfast') ||
      lower.includes('lunch') ||
      lower.includes('dinner') ||
      lower.includes('idli') ||
      lower.includes('dosa') ||
      lower.includes('రైస్') ||
      lower.includes('ఇడ్లీ')
    ) {
      result.action = 'log_meal';

      let mealType: 'breakfast' | 'lunch' | 'snack' | 'dinner' = 'breakfast';
      if (lower.includes('lunch') || lower.includes('భోజనం')) mealType = 'lunch';
      else if (lower.includes('dinner') || lower.includes('రాత్రి భోజనం')) mealType = 'dinner';
      else if (lower.includes('snack') || lower.includes('స్నాక్')) mealType = 'snack';

      const items: { name: string; quantity: string; calories: number }[] = [];

      if (lower.includes('idli') || lower.includes('ఇడ్లీ')) {
        items.push({ name: 'Steamed Idli', quantity: '2 pieces', calories: 140 });
      }
      if (lower.includes('sambar') || lower.includes('సాంబార్')) {
        items.push({ name: 'Vegetable Toor Dal Sambar', quantity: '1 bowl (150ml)', calories: 95 });
      }
      if (lower.includes('dosa') || lower.includes('దోశ')) {
        items.push({ name: 'Crispy Plain Dosa', quantity: '1 medium', calories: 175 });
      }
      if (lower.includes('rice') || lower.includes('అన్నం')) {
        items.push({ name: 'Steamed Rice', quantity: '1 cup', calories: 180 });
      }
      if (lower.includes('curd') || lower.includes('పెరుగు')) {
        items.push({ name: 'Fresh Home Curd', quantity: '1 cup', calories: 100 });
      }

      if (items.length === 0) {
        items.push({ name: cleanText, quantity: '1 standard serving', calories: 250 });
      }

      result.parsedData.mealType = mealType;
      result.parsedData.foodItems = items;
      const totalCal = items.reduce((acc, i) => acc + i.calories, 0);

      result.assistantReply = `Understood! You had ${items.map((i) => i.name).join(' & ')} (~${totalCal} kcal). Shall I add this to your ${mealType} log?`;
      result.assistantReplyTelugu = `అర్థమైంది! మీరు ${items.map((i) => i.name).join(' మరియు ')} (~${totalCal} కేలరీలు) తీసుకున్నారు. మీ ${mealType} డైరీలో నమోదు చేయమంటారా?`;
    }
    // 3. Suggestions
    else if (
      lower.includes('suggest') ||
      lower.includes('సూచించు') ||
      lower.includes('సలహా') ||
      lower.includes('recommend') ||
      lower.includes('what should i eat')
    ) {
      result.action = 'suggest_meal';
      result.assistantReply = 'I recommend high-protein Pesarattu (green moong dosa) with ginger chutney or steamed idlis with sambar for steady morning vitality!';
      result.assistantReplyTelugu = 'ఉదయపు శక్తి కోసం అల్లం చట్నీతో కూడిన పెసరట్టు లేదా సాంబార్‌తో ఆవిరి ఇడ్లీని నేను సిఫార్సు చేస్తున్నాను!';
    }
    // 4. Activity
    else if (
      lower.includes('activity') ||
      lower.includes('summary') ||
      lower.includes('weekly') ||
      lower.includes('వారం') ||
      lower.includes('కార్యకలాపాలు')
    ) {
      result.action = 'show_activity';
      result.assistantReply = 'Displaying your weekly fitness analytics: You logged 120+ active minutes and maintain an 85% nutrition balance rate this week.';
      result.assistantReplyTelugu = 'మీ వారపు ఫిట్‌నెస్ నివేదిక: మీరు ఈ వారం 120 కంటే ఎక్కువ నిమిషాల వ్యాయామం పూర్తి చేశారు మరియు 85% పోషకాహార సమతుల్యతను కొనసాగించారు.';
    } else {
      result.action = 'unknown';
      result.assistantReply = `I heard: "${cleanText}". Try asking: "I ate two idlis and sambar" or "How much water did I drink today?"`;
      result.assistantReplyTelugu = `నేను విన్నది: "${cleanText}". "నేను రెండు ఇడ్లీలు మరియు సాంబార్ తిన్నాను" లేదా "ఈరోజు నేను ఎంత నీళ్లు తాగాను?" అని అడగండి.`;
    }

    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Voice parsing failed' },
      { status: 500 }
    );
  }
}
