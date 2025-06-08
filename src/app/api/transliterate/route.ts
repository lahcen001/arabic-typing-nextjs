import { NextRequest, NextResponse } from 'next/server';

interface TransliterateRequest {
  text?: string;
  word?: string;
}

interface YamliResponse {
  r: string;
}

class Transliterator {
  private word: string;
  public candidates: string[];

  constructor(word: string) {
    this.word = word;
    this.candidates = [];
  }

  async transliterate(word: string): Promise<string[]> {
    try {
      const path = `https://api.yamli.com/transliterate.ashx?word=${encodeURIComponent(word)}&tool=api&account_id=000006&prot=https&hostname=AliMZaini&path=yamli-api&build=5515`;
      
      console.log('Calling Yamli API:', path);
      
      const response = await fetch(path, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });
      
      console.log('Yamli API response status:', response.status);
      
      if (!response.ok) {
        console.error('Yamli API error:', response.status, response.statusText);
        return [];
      }
      
      const responseText = await response.text();
      console.log('Yamli API raw response:', responseText);
      
      const data: YamliResponse = JSON.parse(responseText);
      console.log('Yamli API parsed data:', data);
      
      if (!data.r) {
        console.error('No results in Yamli response');
        return [];
      }
      
      const candidates = data.r.split('|').map(candidate => candidate.slice(0, -2));
      console.log('Processed candidates:', candidates);
      
      return candidates;
    } catch (error) {
      console.error('Transliteration error:', error);
      return [];
    }
  }
}

class Yamli {
  async transliterate(word: string): Promise<string[]> {
    const transliterator = new Transliterator(word);
    const result = await transliterator.transliterate(word);
    
    // If Yamli API fails, provide some basic fallback translations
    if (result.length === 0) {
      console.log('Yamli API failed, using fallback translations');
      return this.getFallbackTranslations(word);
    }
    
    return result;
  }
  
  private getFallbackTranslations(word: string): string[] {
    const fallbacks: { [key: string]: string[] } = {
      'salam': ['سلام', 'سلم'],
      'ahlan': ['أهلا', 'أهلاً'],
      'sahlan': ['سهلا', 'سهلاً'],
      'shukran': ['شكرا', 'شكراً'],
      'mabrook': ['مبروك'],
      'habibi': ['حبيبي'],
      '7abibi': ['حبيبي'],
      'wa7da': ['واحدة'],
      'tneyn': ['اثنين'],
      'hello': ['مرحبا', 'أهلا'],
      'bye': ['مع السلامة', 'وداعا'],
      'yes': ['نعم', 'أيوة'],
      'no': ['لا', 'كلا'],
      'good': ['جيد', 'حسن'],
      'bad': ['سيء', 'مش كويس'],
      'love': ['حب', 'حبيب'],
      'friend': ['صديق', 'صاحب'],
      'family': ['عائلة', 'أهل'],
      'house': ['بيت', 'منزل'],
      'car': ['سيارة', 'عربية'],
      'food': ['طعام', 'أكل'],
      'water': ['ماء', 'مية'],
      'book': ['كتاب'],
      'school': ['مدرسة'],
      'work': ['شغل', 'عمل'],
      'time': ['وقت', 'زمن'],
      'day': ['يوم'],
      'night': ['ليل', 'ليلة'],
      'morning': ['صباح'],
      'evening': ['مساء'],
    };
    
    const lowerWord = word.toLowerCase();
    return fallbacks[lowerWord] || [`${word} (no translation)`];
  }
}

const yamli = new Yamli();

export async function POST(request: NextRequest) {
  try {
    console.log('API called - transliterate');
    const data: TransliterateRequest = await request.json();
    const text = data.text || data.word || '';
    
    console.log('Input text:', text);
    
    if (!text) {
      console.log('No text provided');
      return NextResponse.json(
        { error: 'No text provided', success: false },
        { status: 400 }
      );
    }

    // Get transliteration suggestions
    console.log('Calling yamli.transliterate...');
    const suggestions = await yamli.transliterate(text);
    console.log('Suggestions received:', suggestions);
    
    const response = {
      success: true,
      candidates: suggestions,
      best_match: suggestions[0] || text,
      original: text
    };
    
    console.log('Sending response:', response);
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: String(error), success: false },
      { status: 500 }
    );
  }
} 