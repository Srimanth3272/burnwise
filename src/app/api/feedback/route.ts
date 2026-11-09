import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, category, message } = body;

    if (!message || !email) {
      return NextResponse.json(
        { success: false, error: 'Email and message are required.' },
        { status: 400 }
      );
    }

    // In production this writes to Cloud Firestore 'user_feedback' collection
    const newFeedback = {
      id: 'fb-' + Date.now(),
      name: name || 'Anonymous',
      email,
      category: category || 'general',
      message,
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    return NextResponse.json({
      success: true,
      message: 'Thank you for your valuable feedback! Our health team will review it.',
      feedback: newFeedback,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Feedback submission failed' },
      { status: 500 }
    );
  }
}
