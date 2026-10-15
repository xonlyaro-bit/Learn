import { Song } from '../types';

export const SONGS_LIBRARY: Song[] = [
  {
    id: 'song-viva-la-vida',
    title: 'Viva La Vida',
    artist: 'Coldplay',
    year: 2008,
    genre: 'Pop',
    level: 'B1',
    youtubeId: 'dvgZkm1xWPE',
    spotifyUri: 'spotify:track:1mea3bSkSGXuIRvnydlB5b',
    summary: 'A powerful reflection on power, fate, and revolution with grand orchestral strings and rich literary imagery.',
    lyrics: [
      {
        id: 'viva-1',
        timeSeconds: 15,
        text: 'I used to rule the world',
        arabic: 'كنت أحكم العالم في يوم من الأيام',
        blankWords: ['rule', 'world']
      },
      {
        id: 'viva-2',
        timeSeconds: 19,
        text: 'Seas would rise when I gave the word',
        arabic: 'كانت البحار ترتفع عندما أصدر أمري',
        blankWords: ['rise', 'word']
      },
      {
        id: 'viva-3',
        timeSeconds: 23,
        text: 'Now in the morning I sleep alone',
        arabic: 'الآن في الصباح أنام وحيداً',
        blankWords: ['morning', 'alone']
      },
      {
        id: 'viva-4',
        timeSeconds: 27,
        text: 'Sweep the streets I used to own',
        arabic: 'أكنس الشوارع التي كنت أملكها في الماضي',
        blankWords: ['streets', 'own']
      },
      {
        id: 'viva-5',
        timeSeconds: 32,
        text: 'I used to roll the dice',
        arabic: 'كنت أرمي النرد وأخاطر',
        blankWords: ['dice']
      },
      {
        id: 'viva-6',
        timeSeconds: 36,
        text: 'Feel the fear in my enemy’s eyes',
        arabic: 'أشعر بالخوف في عيون أعدائي',
        blankWords: ['fear', 'enemy']
      },
      {
        id: 'viva-7',
        timeSeconds: 40,
        text: 'Listen as the crowd would sing',
        arabic: 'أستمع بينما كانت الحشود تهتف وتغني',
        blankWords: ['crowd', 'sing']
      },
      {
        id: 'viva-8',
        timeSeconds: 44,
        text: 'Now the old king is dead, long live the king',
        arabic: 'الآن مات الملك العجوز، عاش الملك الجديد',
        blankWords: ['king', 'dead']
      },
      {
        id: 'viva-9',
        timeSeconds: 49,
        text: 'One minute I held the key',
        arabic: 'في دقيقة واحدة كنت أمسك المفتاح',
        blankWords: ['held', 'key']
      },
      {
        id: 'viva-10',
        timeSeconds: 53,
        text: 'Next the walls were closed on me',
        arabic: 'ثم أغلقت الجدران حولي',
        blankWords: ['walls', 'closed']
      },
      {
        id: 'viva-11',
        timeSeconds: 57,
        text: 'And I discovered that my castles stand',
        arabic: 'واكتشفت أن قلاعي شُيدت',
        blankWords: ['discovered', 'castles']
      },
      {
        id: 'viva-12',
        timeSeconds: 61,
        text: 'Upon pillars of salt and pillars of sand',
        arabic: 'على أعمدة من الملح وأعمدة من الرمال',
        blankWords: ['pillars', 'sand']
      }
    ],
    exercises: [
      {
        id: 'ex-viva-1',
        type: 'cloze',
        prompt: 'Complete the lyric: "I used to ______ the world, seas would ______ when I gave the word."',
        options: ['rule / rise', 'love / fall', 'break / turn', 'watch / run'],
        correctAnswer: 'rule / rise',
        explanation: 'In the opening chorus, Chris Martin sings "I used to rule the world, seas would rise when I gave the word."'
      },
      {
        id: 'ex-viva-2',
        type: 'mcq',
        prompt: 'What does the metaphor "pillars of salt and pillars of sand" signify?',
        options: [
          'A strong and permanent empire',
          'A fragile and unstable foundation easily washed away',
          'A wealthy seaside palace',
          'A harsh desert punishment'
        ],
        correctAnswer: 'A fragile and unstable foundation easily washed away',
        explanation: 'Castles built on salt and sand represent fragile creations doomed to collapse when tested by the tides of time.'
      }
    ]
  },
  {
    id: 'song-someone-like-you',
    title: 'Someone Like You',
    artist: 'Adele',
    year: 2011,
    genre: 'R&B / Soul',
    level: 'A2',
    youtubeId: 'hLQl3WQQoQ0',
    spotifyUri: 'spotify:track:4kflIGfjdZJW4ot2ioixTB',
    summary: 'A soulful piano ballad about moving on from heartbreak, wishing peace to an ex-partner.',
    lyrics: [
      {
        id: 'sly-1',
        timeSeconds: 14,
        text: 'I heard that you’re settled down',
        arabic: 'سمعت أنك استقررت في حياتك',
        blankWords: ['settled']
      },
      {
        id: 'sly-2',
        timeSeconds: 20,
        text: 'That you found a girl and you’re married now',
        arabic: 'وأنك وجدت فتاة وتزوجت الآن',
        blankWords: ['found', 'married']
      },
      {
        id: 'sly-3',
        timeSeconds: 27,
        text: 'I heard that your dreams came true',
        arabic: 'سمعت أن أحلامك قد تحققت',
        blankWords: ['dreams', 'true']
      },
      {
        id: 'sly-4',
        timeSeconds: 33,
        text: 'Guess she gave you things I didn’t give to you',
        arabic: 'أظن أنها منحتك أشياء لم أستطع منحها إياك',
        blankWords: ['give', 'things']
      },
      {
        id: 'sly-5',
        timeSeconds: 40,
        text: 'Old friend, why are you so shy?',
        arabic: 'يا صديقي القديم، لماذا أنت خجول هكذا؟',
        blankWords: ['shy', 'friend']
      },
      {
        id: 'sly-6',
        timeSeconds: 46,
        text: 'Ain’t like you to hold back or hide from the light',
        arabic: 'ليس من طبعك أن تتردد أو تختبئ عن الضوء',
        blankWords: ['hold', 'hide']
      },
      {
        id: 'sly-7',
        timeSeconds: 70,
        text: 'Never mind, I’ll find someone like you',
        arabic: 'لا بأس، سأجد شخصاً مثلك',
        blankWords: ['someone', 'find']
      },
      {
        id: 'sly-8',
        timeSeconds: 79,
        text: 'I wish nothing but the best for you, too',
        arabic: 'لا أتمنى سوى الأفضل لك أيضاً',
        blankWords: ['wish', 'best']
      }
    ],
    exercises: [
      {
        id: 'ex-sly-1',
        type: 'mcq',
        prompt: 'What does "settled down" mean in conversational English?',
        options: [
          'To sit on a chair comfortably',
          'To adopt a steady, stable lifestyle, often getting married and having a home',
          'To calm down after an argument',
          'To move to a lower floor'
        ],
        correctAnswer: 'To adopt a steady, stable lifestyle, often getting married and having a home',
        explanation: '"To settle down" refers to establishing a stable, permanent life with a home or marriage.'
      }
    ]
  },
  {
    id: 'song-stand-by-me',
    title: 'Stand by Me',
    artist: 'Ben E. King',
    year: 1961,
    genre: 'Classic Rock',
    level: 'A1',
    youtubeId: 'hwZNL7QVJjE',
    spotifyUri: 'spotify:track:3SdTKo2uVsxFblQjpScoHy',
    summary: 'A timeless soul classic celebrating loyalty, unconditional support, and friendship through dark times.',
    lyrics: [
      {
        id: 'sbm-1',
        timeSeconds: 20,
        text: 'When the night has come, and the land is dark',
        arabic: 'حينما يحل الليل، وتظلم الأرض',
        blankWords: ['night', 'dark']
      },
      {
        id: 'sbm-2',
        timeSeconds: 27,
        text: 'And the moon is the only light we’ll see',
        arabic: 'ويكون القمر هو النور الوحيد الذي نراه',
        blankWords: ['moon', 'light']
      },
      {
        id: 'sbm-3',
        timeSeconds: 34,
        text: 'No, I won’t be afraid, no, I won’t be afraid',
        arabic: 'كلا، لن أخاف، كلا، لن أخاف',
        blankWords: ['afraid']
      },
      {
        id: 'sbm-4',
        timeSeconds: 42,
        text: 'Just as long as you stand, stand by me',
        arabic: 'طالما أنك تقف بجانبي وتساندني',
        blankWords: ['stand', 'long']
      },
      {
        id: 'sbm-5',
        timeSeconds: 50,
        text: 'So darling, darling, stand by me, oh stand by me',
        arabic: 'لذا يا عزيزي، قف بجواري وكن عوني',
        blankWords: ['darling', 'stand']
      }
    ],
    exercises: [
      {
        id: 'ex-sbm-1',
        type: 'mcq',
        prompt: 'What does the phrasal verb "stand by (someone)" mean?',
        options: [
          'To remain physically upright near them',
          'To support and remain loyal to someone during difficult times',
          'To ignore someone',
          'To wait for instructions'
        ],
        correctAnswer: 'To support and remain loyal to someone during difficult times',
        explanation: '"Stand by someone" is a common English idiom meaning to give steadfast loyalty and support.'
      }
    ]
  },
  {
    id: 'song-counting-stars',
    title: 'Counting Stars',
    artist: 'OneRepublic',
    year: 2013,
    genre: 'Indie / Folk',
    level: 'B1',
    youtubeId: 'hT_nvWreIhg',
    spotifyUri: 'spotify:track:2tpWsVSb9UEmDRxAl1zhX1',
    summary: 'An energetic indie-pop track about pursuing meaningful life dreams instead of materialistic obsessions.',
    lyrics: [
      {
        id: 'cs-1',
        timeSeconds: 10,
        text: 'Lately, I’ve been, I’ve been losing sleep',
        arabic: 'مؤخراً، بدأت أفقد القدرة على النوم',
        blankWords: ['losing', 'sleep']
      },
      {
        id: 'cs-2',
        timeSeconds: 15,
        text: 'Dreaming about the things that we could be',
        arabic: 'أحلم بالأشياء التي يمكننا أن نكونها',
        blankWords: ['dreaming', 'things']
      },
      {
        id: 'cs-3',
        timeSeconds: 20,
        text: 'But baby, I’ve been, I’ve been praying hard',
        arabic: 'ولكن يا عزيزتي، كنت أدعو بإلحاح',
        blankWords: ['praying', 'hard']
      },
      {
        id: 'cs-4',
        timeSeconds: 25,
        text: 'Said, no more counting dollars, we’ll be counting stars',
        arabic: 'قلت: لا مزيد من عد الدولارات، سنعد النجوم بدلاً من ذلك',
        blankWords: ['dollars', 'stars']
      },
      {
        id: 'cs-5',
        timeSeconds: 40,
        text: 'I see this life like a swinging vine',
        arabic: 'أرى هذه الحياة كغصن متأرجح',
        blankWords: ['life', 'vine']
      },
      {
        id: 'cs-6',
        timeSeconds: 44,
        text: 'Swing my heart across the line',
        arabic: 'أرجح قلبي عبر خط النهاية',
        blankWords: ['swing', 'heart']
      }
    ],
    exercises: [
      {
        id: 'ex-cs-1',
        type: 'mcq',
        prompt: 'In the lyric "we’ll be counting stars", what do stars represent in contrast to dollars?',
        options: [
          'Wealth and gold',
          'Nighttime navigation',
          'Freedom, wonder, dreams, and spiritual fulfillment',
          'Space exploration'
        ],
        correctAnswer: 'Freedom, wonder, dreams, and spiritual fulfillment',
        explanation: 'Counting stars symbolizes prioritizing dreams, purpose, and wonder over mere financial accumulation.'
      }
    ]
  }
];
