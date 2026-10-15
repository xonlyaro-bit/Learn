import { OXFORD_WORDS } from '../data/oxfordWords';
import { OxfordWord } from '../types';

export interface WordLookupResult {
  word: string;
  phonetic?: string;
  pos?: string;
  definition: string;
  arabic: string;
  example?: string;
  synonyms?: string[];
  level?: string;
  isSaved?: boolean;
}

// Built-in high-frequency lexicon with Arabic translations
const COMMON_DICTIONARY: Record<string, { definition: string; arabic: string; pos: string; phonetic?: string; example?: string }> = {
  // Common verbs & essentials
  love: { definition: 'An intense feeling of deep affection or passion.', arabic: 'حب / يعشق', pos: 'verb/noun', phonetic: '/lʌv/', example: 'They fell in love in Paris.' },
  hope: { definition: 'A feeling of expectation and desire for a certain thing to happen.', arabic: 'أمل / يأمل', pos: 'noun/verb', phonetic: '/həʊp/', example: 'Never lose hope in difficult times.' },
  dream: { definition: 'A cherished ambition or series of thoughts during sleep.', arabic: 'حلم / يحلم', pos: 'noun/verb', phonetic: '/driːm/', example: 'Hold fast to dreams, for if dreams die, life is a broken-winged bird.' },
  freedom: { definition: 'The power or right to act, speak, or think without hindrance.', arabic: 'حرية', pos: 'noun', phonetic: '/ˈfriːdəm/', example: 'Freedom of thought is a sacred human right.' },
  courage: { definition: 'The ability to do something that frightens one.', arabic: 'شجاعة', pos: 'noun', phonetic: '/ˈkʌrɪdʒ/', example: 'Courage is grace under pressure.' },
  wisdom: { definition: 'The quality of having experience, knowledge, and good judgment.', arabic: 'حكمة', pos: 'noun', phonetic: '/ˈwɪzdəm/', example: 'Wisdom comes with open-minded experience.' },
  silence: { definition: 'Complete absence of sound or speech.', arabic: 'صمت / هدوء', pos: 'noun', phonetic: '/ˈsaɪləns/', example: 'Silence often speaks louder than hurried words.' },
  beauty: { definition: 'A combination of qualities that pleases the aesthetic senses.', arabic: 'جمال', pos: 'noun', phonetic: '/ˈbjuːti/', example: 'Beauty is in the eye of the beholder.' },
  journey: { definition: 'An act of traveling from one place to another; a life passage.', arabic: 'رحلة', pos: 'noun', phonetic: '/ˈdʒɜːni/', example: 'A journey of a thousand miles begins with a single step.' },
  truth: { definition: 'The quality or state of being in accordance with fact or reality.', arabic: 'حقيقة / صدق', pos: 'noun', phonetic: '/truːθ/', example: 'The truth will set you free.' },
  shadow: { definition: 'A dark area or shape produced by a body coming between rays of light and a surface.', arabic: 'ظل', pos: 'noun', phonetic: '/ˈʃædəʊ/', example: 'Cast away your lingering shadows.' },
  light: { definition: 'The natural agent that stimulates sight and makes things visible.', arabic: 'ضوء / نور', pos: 'noun', phonetic: '/laɪt/', example: 'In the middle of darkness, light shines brightest.' },
  memory: { definition: 'The faculty by which the mind stores and remembers information.', arabic: 'ذاكرة / ذكرى', pos: 'noun', phonetic: '/ˈmeməri/', example: 'Sweet memories linger forever.' },
  destiny: { definition: 'The events that will necessarily happen to a particular person in the future.', arabic: 'مصير / قدر', pos: 'noun', phonetic: '/ˈdestɪni/', example: 'We shape our own destiny with deliberate actions.' },
  strength: { definition: 'The quality or state of being physically or mentally strong.', arabic: 'قوة', pos: 'noun', phonetic: '/streŋθ/', example: 'Adversity reveals true inner strength.' },
  peace: { definition: 'Freedom from disturbance; tranquility and harmony.', arabic: 'سلام / سكينة', pos: 'noun', phonetic: '/piːs/', example: 'Peace comes from within.' },
  future: { definition: 'The time or a period of time following the moment of speaking or writing.', arabic: 'مستقبل', pos: 'noun', phonetic: '/ˈfjuːtʃər/', example: 'The future belongs to those who believe in their aspirations.' },
  knowledge: { definition: 'Facts, information, and skills acquired through experience or education.', arabic: 'معرفة / علم', pos: 'noun', phonetic: '/ˈnɒlɪdʒ/', example: 'Knowledge is power.' },
  heart: { definition: 'The muscle that pumps blood; metaphorically the center of emotion.', arabic: 'قلب / وجدان', pos: 'noun', phonetic: '/hɑːt/', example: 'Follow your heart with wisdom.' },
  friend: { definition: 'A person whom one knows and with whom one has a bond of mutual affection.', arabic: 'صديق', pos: 'noun', phonetic: '/frend/', example: 'A true friend walks in when the rest of the world walks out.' },
  world: { definition: 'The earth, together with all of its countries and peoples.', arabic: 'عالم / دنيا', pos: 'noun', phonetic: '/wɜːld/', example: 'Travel opens your eyes to the wider world.' },
  voice: { definition: 'The sound produced in a person’s larynx and uttered through the mouth.', arabic: 'صوت', pos: 'noun', phonetic: '/vɔɪs/', example: 'Her calm voice comforted everyone.' },
  time: { definition: 'The indefinite continued progress of existence and events.', arabic: 'وقت / زمن', pos: 'noun', phonetic: '/taɪm/', example: 'Time is the most valuable currency.' },
  life: { definition: 'The condition that distinguishes animals and plants from inorganic matter.', arabic: 'حياة', pos: 'noun', phonetic: '/laɪf/', example: 'Life is what happens while you are busy making plans.' },
  soul: { definition: 'The spiritual or immaterial part of a human being.', arabic: 'روح / نفس', pos: 'noun', phonetic: '/səʊl/', example: 'Music touches the human soul directly.' },
  mind: { definition: 'The element of a person that enables them to be aware of the world and their experiences.', arabic: 'عقل / ذهن', pos: 'noun', phonetic: '/maɪnd/', example: 'A disciplined mind achieves great clarity.' },
  storm: { definition: 'A violent disturbance of the atmosphere with strong winds and rain.', arabic: 'عاصفة', pos: 'noun', phonetic: '/stɔːm/', example: 'After every storm comes the calm sunshine.' },
  stars: { definition: 'Luminous astronomical objects seen as points of light in the night sky.', arabic: 'نجوم', pos: 'noun', phonetic: '/stɑːz/', example: 'Keep your eyes on the stars, and your feet on the ground.' },
  secret: { definition: 'Not known or seen or not meant to be known or seen by others.', arabic: 'سر / خفي', pos: 'noun/adj', phonetic: '/ˈsiːkrət/', example: 'The secret of progress is getting started.' },
  magic: { definition: 'The power of apparently influencing the course of events by using mysterious forces.', arabic: 'سحر', pos: 'noun', phonetic: '/ˈmædʒɪk/', example: 'Books are a uniquely portable magic.' },
};

// In-memory cache for API translations to avoid redundant network calls
const TRANSLATION_CACHE = new Map<string, string>();

/**
 * Clean a raw token (remove punctuation like quotes, commas, periods)
 */
export function cleanWord(raw: string): string {
  return raw.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '').trim().toLowerCase();
}

/**
 * Look up word in Oxford 6000 and local high-frequency lexicon
 */
export function lookupWordLocal(word: string): WordLookupResult | null {
  const normalized = cleanWord(word);
  if (!normalized) return null;

  // 1. Check Oxford curated vocabulary
  const ox = OXFORD_WORDS.find(w => w.word.toLowerCase() === normalized);
  if (ox) {
    return {
      word: ox.word,
      phonetic: ox.phonetic,
      pos: ox.pos,
      definition: ox.definition,
      arabic: ox.arabic,
      example: ox.example,
      synonyms: ox.synonyms,
      level: ox.level,
    };
  }

  // 2. Check Common Dictionary
  const common = COMMON_DICTIONARY[normalized];
  if (common) {
    return {
      word: normalized,
      phonetic: common.phonetic,
      pos: common.pos,
      definition: common.definition,
      arabic: common.arabic,
      example: common.example,
      level: 'A2',
    };
  }

  return null;
}

/**
 * Full lookup: Try local first, then fetch Free Dictionary API + Free MyMemory Translation API
 */
export async function lookupWordFull(rawWord: string): Promise<WordLookupResult> {
  const normalized = cleanWord(rawWord);
  const localMatch = lookupWordLocal(normalized);
  if (localMatch) {
    return localMatch;
  }

  // Fallback to online Free Dictionary API
  let definition = `Meaning of "${rawWord}".`;
  let phonetic = '';
  let pos = 'word';
  let example = '';

  try {
    const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(normalized)}`);
    if (dictRes.ok) {
      const data = await dictRes.json();
      if (Array.isArray(data) && data.length > 0) {
        const entry = data[0];
        phonetic = entry.phonetic || (entry.phonetics && entry.phonetics[0]?.text) || '';
        if (entry.meanings && entry.meanings.length > 0) {
          const meaning = entry.meanings[0];
          pos = meaning.partOfSpeech || 'noun';
          if (meaning.definitions && meaning.definitions.length > 0) {
            definition = meaning.definitions[0].definition;
            example = meaning.definitions[0].example || '';
          }
        }
      }
    }
  } catch {
    // offline or blocked, fallback gracefully
  }

  // Fetch Arabic translation for the word
  const arabic = await translateText(rawWord);

  return {
    word: normalized || rawWord,
    phonetic,
    pos,
    definition,
    arabic,
    example: example || `Study the word "${rawWord}" in its literary context.`,
    level: 'B1',
  };
}

/**
 * Free Arabic translation of any sentence or word using MyMemory API with caching
 */
export async function translateText(text: string): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) return '';

  if (TRANSLATION_CACHE.has(trimmed.toLowerCase())) {
    return TRANSLATION_CACHE.get(trimmed.toLowerCase())!;
  }

  // Check if it's a known single word
  const localWord = lookupWordLocal(trimmed);
  if (localWord) {
    TRANSLATION_CACHE.set(trimmed.toLowerCase(), localWord.arabic);
    return localWord.arabic;
  }

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=en|ar`;
    const res = await fetch(url);
    if (res.ok) {
      const json = await res.json();
      if (json && json.responseData && json.responseData.translatedText) {
        const translation = json.responseData.translatedText;
        TRANSLATION_CACHE.set(trimmed.toLowerCase(), translation);
        return translation;
      }
    }
  } catch {
    // Offline or rate-limited fallback
  }

  return 'ترجمة فورية (متاحة عند توفر الاتصال بالشبكة)';
}

/**
 * Natural Text-to-Speech using the browser's native Web Speech Synthesis API
 */
export function speakEnglish(text: string, rate: number = 0.9): void {
  if (!('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel(); // Stop any pending speech
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  utterance.pitch = 1.0;
  utterance.lang = 'en-US';

  // Prefer natural English voices if available
  const voices = window.speechSynthesis.getVoices();
  const naturalVoice = voices.find(v => (v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Daniel'))));
  if (naturalVoice) {
    utterance.voice = naturalVoice;
  }

  window.speechSynthesis.speak(utterance);
}
