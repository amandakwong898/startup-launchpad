import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const SIGNUPS_FILE = path.join(DATA_DIR, 'signups.json');

interface Signup {
  email: string;
  source: string;
  timestamp: string;
}

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(SIGNUPS_FILE)) {
    fs.writeFileSync(SIGNUPS_FILE, JSON.stringify([]));
  }
}

// Read signups
function readSignups(): Signup[] {
  ensureDataDir();
  const data = fs.readFileSync(SIGNUPS_FILE, 'utf-8');
  return JSON.parse(data);
}

// Write signups
function writeSignups(signups: Signup[]) {
  ensureDataDir();
  fs.writeFileSync(SIGNUPS_FILE, JSON.stringify(signups, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const { email, source } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const signups = readSignups();

    // Check for duplicate
    const exists = signups.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Add new signup
    const newSignup: Signup = {
      email,
      source: source || 'direct',
      timestamp: new Date().toISOString(),
    };

    signups.push(newSignup);
    writeSignups(signups);

    return NextResponse.json({ 
      success: true,
      message: 'Successfully signed up!' 
    });
  } catch (error) {
    console.error('Error processing signup:', error);
    return NextResponse.json(
      { error: 'Failed to process signup' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const signups = readSignups();
    return NextResponse.json({ signups });
  } catch (error) {
    console.error('Error reading signups:', error);
    return NextResponse.json(
      { error: 'Failed to read signups' },
      { status: 500 }
    );
  }
}
