import { NextRequest, NextResponse } from 'next/server';
import { TranslationBackupService } from '../../../services/translationBackup';

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
  async transliterate(word: string): Promise<{ suggestions: string[], source: 'api' | 'backup' | 'fallback' }> {
    const transliterator = new Transliterator(word);
    let result = await transliterator.transliterate(word);
    
    // If Yamli API succeeds, save to backup and return
    if (result.length > 0) {
      console.log('Yamli API succeeded, saving to backup');
      // Save to backup database (async, don't wait)
      TranslationBackupService.saveTranslation(word, result, result[0]).catch(err => 
        console.error('Failed to save to backup:', err)
      );
      return { suggestions: result, source: 'api' };
    }
    
    // If Yamli API fails, try backup database
    console.log('Yamli API failed, trying backup database');
    try {
      const backupTranslation = await TranslationBackupService.getTranslation(word);
      if (backupTranslation) {
        console.log('Found translation in backup database');
        return { 
          suggestions: backupTranslation.arabicSuggestions, 
          source: 'backup' 
        };
      }
    } catch (error) {
      console.error('Backup database error:', error);
    }
    
    // If both API and backup fail, use fallback translations
    console.log('Both API and backup failed, using fallback translations');
    const fallbackSuggestions = this.getFallbackTranslations(word);
    return { suggestions: fallbackSuggestions, source: 'fallback' };
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
      'ana': ['أنا'],
      'anta': ['أنت'],
      'anti': ['أنتِ'],
      'huwa': ['هو'],
      'hiya': ['هي'],
      'nahnu': ['نحن'],
      'antum': ['أنتم'],
      'hum': ['هم'],
      'hunna': ['هن'],
      'min': ['من'],
      'ila': ['إلى'],
      'fi': ['في'],
      'ala': ['على'],
      'ma3a': ['مع'],
      'bila': ['بلا'],
      'bayn': ['بين'],
      'taht': ['تحت'],
      'fawq': ['فوق'],
      'qadim': ['قديم'],
      'jadid': ['جديد'],
      'kabir': ['كبير'],
      'saghir': ['صغير'],
      'jamil': ['جميل'],
      'qabih': ['قبيح'],
      'sa3id': ['سعيد'],
      'hazin': ['حزين'],
      'a': ['اى', 'ا'],
      'an': ['أن', 'عن'],
      'la': ['لا'],
      'wa': ['و', 'وا'],
      'aw': ['أو'],
      'laken': ['لكن'],
      'aydan': ['أيضا'],
      'faqat': ['فقط'],
      'kull': ['كل'],
      'ba3d': ['بعد'],
      'qabl': ['قبل'],
      'al7in': ['الآن'],
      'ghadan': ['غدا'],
      'ams': ['أمس']
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

    // Get transliteration suggestions with source information
    console.log('Calling yamli.transliterate...');
    const { suggestions, source } = await yamli.transliterate(text);
    console.log('Suggestions received:', suggestions);
    console.log('Source:', source);
    
    const response = {
      success: true,
      candidates: suggestions,
      best_match: suggestions[0] || text,
      original: text,
      source: source, // 'api', 'backup', or 'fallback'
      backup_available: source !== 'fallback'
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