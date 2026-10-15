import { MovieScene } from '../types';

export const MOVIES_LIBRARY: MovieScene[] = [
  {
    id: 'movie-dead-poets',
    title: 'Carpe Diem — Seize the Day',
    mediaType: 'movie',
    mediaTitle: 'Dead Poets Society',
    releaseYear: 1989,
    level: 'B2',
    genre: 'Drama / Inspirational',
    youtubeId: 'veYR3ZvvUcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80',
    description: 'English teacher John Keating (Robin Williams) inspires his students by having them examine historic photographs and whisper the Latin phrase "Carpe Diem" to remind them of life’s fleeting beauty.',
    keyIdioms: [
      {
        phrase: 'Carpe diem',
        englishMeaning: 'Seize the day; make the most of the present moment with urgency.',
        arabicMeaning: 'اغتنم اليوم / استغل اللحظة الحاضرة',
        exampleInContext: '"Carpe diem. Seize the day, boys. Make your lives extraordinary."'
      },
      {
        phrase: 'Food for worms',
        englishMeaning: 'Dead and buried; a reminder of human mortality.',
        arabicMeaning: 'طعام للديدان (كناية عن الفناء والموت)',
        exampleInContext: '"Because believe it or not, each and every one of us in this room is one day going to stop breathing, turn cold and die."'
      }
    ],
    dialogue: [
      {
        character: 'John Keating',
        line: 'They’re not that different from you, are they? Same haircuts. Full of hormones, just like you.',
        arabic: 'إنهم لا يختلفون كثيراً عنكم، أليس كذلك؟ نفس قصات الشعر. مفعمون بالحيوية، مثلكم تماماً.',
        timestamp: '0:20'
      },
      {
        character: 'John Keating',
        line: 'Invincible, just like you feel. The world is their oyster. They believe they’re destined for great things, just like many of you.',
        arabic: 'يشعرون بأنهم لا يُقهرون، كما تشعرون أنتم. العالم ملك أيديهم. يؤمنون بأنهم خُلقوا لأشياء عظيمة، مثل الكثيرين منكم.',
        timestamp: '0:35'
      },
      {
        character: 'John Keating',
        line: 'Their eyes are full of hope, just like you. Did they wait until it was too late to make from their lives even one iota of what they were capable?',
        arabic: 'عيونهم مفعمة بالأمل، مثلكم. هل انتظروا حتى فات الأوان ليحققوا من حياتهم ولو ذرة مما كانوا قادرين عليه؟',
        timestamp: '0:50'
      },
      {
        character: 'John Keating',
        line: 'Because you see, gentleman, these boys are now fertilizing daffodils. But if you listen real close, you can hear them whisper their legacy to you.',
        arabic: 'لأنكم كما ترون يا سادة، هؤلاء الفتيان يغذون أزهار النرجس الآن تحت التراب. ولكن إذا أنصتم جيداً، فستسمعونهم يهمسون بوصيتهم إليكم.',
        timestamp: '1:10'
      },
      {
        character: 'John Keating',
        line: 'Go on, lean in. Listen, you hear it? ... Carpe... Carpe diem. Seize the day, boys. Make your lives extraordinary.',
        arabic: 'هيا، اقتربوا واستمعوا. هل تسمعونه؟ ... كاربي... كاربي ديم. اغتنموا اليوم يا أولاد. اجعلوا حياتكم غير عادية ومبهرة.',
        timestamp: '1:30'
      }
    ],
    exercises: [
      {
        id: 'ex-dps-1',
        question: 'What does the idiom "The world is their oyster" mean in Keating’s speech?',
        options: [
          'They enjoy eating seafood together',
          'They have infinite opportunities ahead of them to achieve anything',
          'They are confined inside a hard shell',
          'They feel isolated from modern society'
        ],
        correctIndex: 1,
        explanation: '"The world is your oyster" is a famous English idiom meaning you are in a position where you can take advantage of any opportunities the world offers.'
      },
      {
        id: 'ex-dps-2',
        question: 'What is the core pedagogical message Keating communicates to the boys?',
        options: [
          'To focus solely on passing examinations',
          'To value their limited time on Earth and live purposefully and passionately',
          'To avoid taking risks in life',
          'To study Greek military history'
        ],
        correctIndex: 1,
        explanation: 'Keating encourages students to seize the day ("Carpe Diem") and pursue their true talents before life slips away.'
      }
    ]
  },
  {
    id: 'cartoon-lion-king',
    title: 'The Past Can Hurt',
    mediaType: 'cartoon',
    mediaTitle: 'The Lion King (Disney)',
    releaseYear: 1994,
    level: 'A2',
    genre: 'Animation / Family',
    youtubeId: 'dZfGTL2PY3E',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=600&q=80',
    description: 'Rafiki teaches adult Simba an invaluable life lesson about confronting painful memories: you can either run from the past, or learn from it.',
    keyIdioms: [
      {
        phrase: 'Run from (something)',
        englishMeaning: 'To avoid facing an unpleasant truth, responsibility, or memory.',
        arabicMeaning: 'يهرب من المواجهة',
        exampleInContext: '"Oh yes, the past can hurt. But the way I see it, you can either run from it or learn from it."'
      },
      {
        phrase: 'Water under the bridge',
        englishMeaning: 'Past events that cannot be changed and should be forgiven or forgotten.',
        arabicMeaning: 'أمر فات وانقضى ولا فائدة من البكاء عليه',
        exampleInContext: '"It doesn’t matter! It’s in the past!"'
      }
    ],
    dialogue: [
      {
        character: 'Simba',
        line: 'I know what I have to do. But going back means I have to face my past. I’ve been running from it for so long.',
        arabic: 'أعلم ما عليّ فعله. لكن العودة تعني أنه يجب أن أواجه ماضيّ. لقد كنت أهرب منه لفترة طويلة جداً.',
        timestamp: '0:10'
      },
      {
        character: 'Rafiki',
        line: '[Whacks Simba with his staff] Ouch!',
        arabic: '[يضرب سيمبا بعصاه الخشبية] آخ!',
        timestamp: '0:22'
      },
      {
        character: 'Simba',
        line: 'Ouch! Jeez, what was that for?',
        arabic: 'آخ! يا إلهي، لماذا فعلت ذلك؟',
        timestamp: '0:26'
      },
      {
        character: 'Rafiki',
        line: 'It doesn’t matter! It’s in the past! Ha ha!',
        arabic: 'لا يهم! لقد صار في الماضي! هاه!',
        timestamp: '0:30'
      },
      {
        character: 'Simba',
        line: 'Yeah, but it still hurts!',
        arabic: 'نعم، ولكنه ما يزال يؤلمني!',
        timestamp: '0:34'
      },
      {
        character: 'Rafiki',
        line: 'Oh yes, the past can hurt. But the way I see it, you can either run from it, or learn from it.',
        arabic: 'أوه نعم، الماضي قد يؤلم. ولكن كما أراه، يمكنك إما أن تهرب منه، أو أن تتعلم منه.',
        timestamp: '0:40'
      },
      {
        character: 'Rafiki',
        line: '[Swings staff again, Simba ducks] Ah! You see? So what are you going to do now?',
        arabic: '[يلوح بالعصا مجدداً، فينحني سيمبا متفادياً إياها] أه! أرأيت؟ إذاً، ماذا أنت فاعل الآن؟',
        timestamp: '0:48'
      },
      {
        character: 'Simba',
        line: 'First, I’m gonna take your stick! And then I’m going back!',
        arabic: 'أولاً، سآخذ عصاك هذه! ثم سأعود إلى الديار!',
        timestamp: '0:55'
      }
    ],
    exercises: [
      {
        id: 'ex-lk-1',
        question: 'Why does Rafiki suddenly strike Simba on the head with his stick?',
        options: [
          'Because he was angry with Simba',
          'To create a physical demonstration that painful past events cannot hurt you once they pass, unless you fail to learn',
          'To test his reflexes',
          'By accidental mistake'
        ],
        correctIndex: 1,
        explanation: 'Rafiki uses the pain of the hit to illustrate that while the past hurts, you can learn to dodge future mistakes and move forward.'
      }
    ]
  },
  {
    id: 'tv-ted-lasso-darts',
    title: 'Be Curious, Not Judgmental',
    mediaType: 'tv_series',
    mediaTitle: 'Ted Lasso',
    releaseYear: 2020,
    level: 'B2',
    genre: 'Comedy / Drama',
    youtubeId: '3kJ5yq3_L2k',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=600&q=80',
    description: 'During a high-stakes pub game of darts, coach Ted Lasso shares an insightful quote attributed to Walt Whitman about asking questions instead of jumping to arrogant assumptions.',
    keyIdioms: [
      {
        phrase: 'Underestimate (someone)',
        englishMeaning: 'To estimate someone’s strength, skill, or intelligence as smaller than it really is.',
        arabicMeaning: 'يستهين بقدرات شخص ما',
        exampleInContext: '"Guys have underestimated me my entire life."'
      },
      {
        phrase: 'Jump to conclusions',
        englishMeaning: 'To form an opinion or make a decision before having all the facts.',
        arabicMeaning: 'يتسرع في إصدار الأحكام والنتائج',
        exampleInContext: '"If they were curious, they would’ve asked questions."'
      }
    ],
    dialogue: [
      {
        character: 'Ted Lasso',
        line: 'You know, Rupert, guys have underestimated me my entire life. And for years, I never understood why. It used to really bother me.',
        arabic: 'أتعلم يا روبرت، لقد استهان بي الناس طوال حياتي. ولسنوات عديدة، لم أكن أفهم السبب. كان ذلك يزعجني حقاً.',
        timestamp: '0:15'
      },
      {
        character: 'Ted Lasso',
        line: 'Then one day I was driving my little boy to school, and I saw this quote by Walt Whitman painted on the wall. It said: "Be curious, not judgmental."',
        arabic: 'ثم في أحد الأيام، وأنا أوصل ابني الصغير إلى المدرسة، رأيت هذه المقولة لوالت ويتمان مكتوبة على جدار. كانت تقول: "كن فضولياً، ولا تكن متسرعاً في إطلاق الأحكام."',
        timestamp: '0:35'
      },
      {
        character: 'Ted Lasso',
        line: 'I liked that. And back then, none of them were curious. They thought they had everything all figured out, so they judged everything, and they judged everyone.',
        arabic: 'أعجبتني تلك العبارة. وفي ذلك الوقت، لم يكن أحد منهم فضولياً. ظنوا أنهم يعلمون كل شيء، لذا أصدروا أحكاماً على كل شيء وعلى كل شخص.',
        timestamp: '0:55'
      },
      {
        character: 'Ted Lasso',
        line: 'Because if they were curious, they would’ve asked questions. Questions like: "Have you played a lot of darts, Ted?"',
        arabic: 'لأنهم لو كانوا فضوليين حقاً، لطرحوا أسئلة. أسئلة مثل: "هل لعبت السهام كثيراً يا تيد في حياتك؟"',
        timestamp: '1:15'
      },
      {
        character: 'Ted Lasso',
        line: 'To which I would’ve answered: "Yes, sir. Every Sunday afternoon with my father from age ten to sixteen." Bullseye.',
        arabic: 'وحينها كنت سأجيبهم: "نعم يا سيدي. كل ظهر أحد مع والدي من سن العاشرة وحتى السادسة عشرة." في منتصف الهدف تماماً!',
        timestamp: '1:35'
      }
    ],
    exercises: [
      {
        id: 'ex-tl-1',
        question: 'What is the core distinction Ted makes between being "judgmental" and being "curious"?',
        options: [
          'Judgmental people play darts, curious people watch',
          'Judgmental people assume they already know everything; curious people ask questions to understand',
          'Curious people are quiet, judgmental people shout',
          'There is no difference in his speech'
        ],
        correctIndex: 1,
        explanation: 'Ted highlights that curious people ask humble questions rather than forming premature, arrogant conclusions.'
      }
    ]
  },
  {
    id: 'movie-the-matrix',
    title: 'The Red Pill or The Blue Pill',
    mediaType: 'movie',
    mediaTitle: 'The Matrix',
    releaseYear: 1999,
    level: 'B2',
    genre: 'Sci-Fi / Action',
    youtubeId: 'zE7PKRjrid4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    description: 'Morpheus offers Neo the ultimate philosophical dilemma: swallow the blue pill and wake up in comfort, or take the red pill to see the genuine, harsh truth.',
    keyIdioms: [
      {
        phrase: 'Point of no return',
        englishMeaning: 'A stage in a process beyond which it is impossible to reverse actions.',
        arabicMeaning: 'نقطة اللاعودة',
        exampleInContext: '"After this, there is no turning back."'
      },
      {
        phrase: 'Down the rabbit hole',
        englishMeaning: 'Entering into a bizarre, surreal, or increasingly complex journey or reality.',
        arabicMeaning: 'في أعماق عالم غريب وغير مألوف',
        exampleInContext: '"You take the red pill, you stay in Wonderland, and I show you how deep the rabbit hole goes."'
      }
    ],
    dialogue: [
      {
        character: 'Morpheus',
        line: 'Let me tell you why you’re here. You’re here because you know something. What you know you can’t explain, but you feel it.',
        arabic: 'دعني أخبرك لماذا أنت هنا. أنت هنا لأنك تعرف شيئاً ما. شيء لا تستطيع تفسيره، لكنك تشعر به في أعماقك.',
        timestamp: '0:15'
      },
      {
        character: 'Morpheus',
        line: 'You’ve felt it your entire life: that there’s something wrong with the world. You don’t know what it is, but it’s there, like a splinter in your mind.',
        arabic: 'لقد شعرت به طوال حياتك: أن هناك خطباً ما في هذا العالم. لا تدري كنهه، لكنه يقبع هناك، مثل شوكة عالقة في ذهنك تؤرقك.',
        timestamp: '0:35'
      },
      {
        character: 'Morpheus',
        line: 'This is your last chance. After this, there is no turning back.',
        arabic: 'هذه فرصتك الأخيرة. بعد هذه اللحظة، لا سبيل للرجوع إلى الوراء.',
        timestamp: '0:55'
      },
      {
        character: 'Morpheus',
        line: 'You take the blue pill—the story ends, you wake up in your bed and believe whatever you want to believe.',
        arabic: 'تأخذ الحبة الزرقاء—تنتهي القصة، تستيقظ في سريرك وتصدق ما يحلو لك تصديقه.',
        timestamp: '1:10'
      },
      {
        character: 'Morpheus',
        line: 'You take the red pill—you stay in Wonderland, and I show you how deep the rabbit hole goes. Remember: all I’m offering is the truth. Nothing more.',
        arabic: 'تأخذ الحبة الحمراء—تبقى في بلاد العجائب، وسأريك إلى أي عمق يصل هذا الجحر الغريب. تذكّر: كل ما أعرضه عليك هو الحقيقة المجردة. لا شيء أكثر.',
        timestamp: '1:25'
      }
    ],
    exercises: [
      {
        id: 'ex-matrix-1',
        question: 'What does the metaphor "a splinter in your mind" represent?',
        options: [
          'A severe physical headache',
          'A persistent, nagging feeling of unease or doubt that won’t go away',
          'A computer malfunction',
          'A splinter of wood'
        ],
        correctIndex: 1,
        explanation: 'A splinter in the mind represents a persistent irritating intuition that something is fundamentally wrong.'
      }
    ]
  }
];
