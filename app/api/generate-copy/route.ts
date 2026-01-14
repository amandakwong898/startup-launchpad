import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    const { companyName, field } = await request.json();

    if (!companyName) {
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Initialize OpenAI client at runtime
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompts = {
      headline: `Generate a compelling, concise headline (max 10 words) for a startup called "${companyName}". The headline should be exciting, clear, and action-oriented. Only return the headline text, nothing else.`,
      description: `Generate a compelling description (2-3 sentences, max 150 characters) for a startup called "${companyName}". Focus on the value proposition and what makes it unique. Only return the description text, nothing else.`,
    };

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates compelling marketing copy for startups. Be concise, clear, and exciting.',
        },
        {
          role: 'user',
          content: prompts[field as keyof typeof prompts],
        },
      ],
      max_tokens: 100,
      temperature: 0.8,
    });

    const text = completion.choices[0]?.message?.content?.trim() || '';

    return NextResponse.json({ text });
  } catch (error) {
    console.error('Error generating copy:', error);
    return NextResponse.json(
      { error: 'Failed to generate copy' },
      { status: 500 }
    );
  }
}
