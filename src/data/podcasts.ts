import { PodcastEpisode } from '../types';

export const PODCASTS_LIBRARY: PodcastEpisode[] = [
  {
    id: 'pod-bbc-silence',
    title: 'The Power of Silence in a Noisy World',
    show: 'BBC 6 Minute English',
    host: 'Neil & Georgina',
    level: 'B1',
    durationMinutes: 6,
    category: 'Culture',
    youtubeId: '0z_V4N_mR4w',
    spotifyUrl: 'https://open.spotify.com/show/7pvdS04kGsdw1f8Q5F5d4f',
    description: 'In modern cities, silence has become a rare luxury. Neil and Georgina explore how moments of quiet help cognitive focus, mental well-being, and creativity.',
    vocabulary: [
      { word: 'tranquility', definition: 'A state of peace and calm, free from agitation or noise.', arabic: 'سكينة / هدوء تام' },
      { word: 'sensory overload', definition: 'A condition where one or more of the body senses experiences over-stimulation.', arabic: 'إجهاد حسي / فرط التحفيز' },
      { word: 'recharge', definition: 'To regain energy, focus, or strength after feeling tired.', arabic: 'يستعيد نشاطه / يشحن طاقته' }
    ],
    transcript: [
      {
        time: '0:15',
        speaker: 'Neil',
        text: 'Hello and welcome to 6 Minute English! I’m Neil, and joining me today is Georgina.',
        arabic: 'مرحباً وأهلاً بكم في برنامج 6 دقائق لغة إنجليزية! أنا نيل، وتشاركني اليوم جورجينا.'
      },
      {
        time: '0:22',
        speaker: 'Georgina',
        text: 'Hello Neil. You know, walking into the recording studio today, I noticed how loud the city streets really are: honking horns, construction drills, and traffic sirens.',
        arabic: 'أهلاً نيل. كما تعلم، وأنا أسير إلى استوديو التسجيل اليوم، لاحظت كم هي صاخبة شوارع المدينة حقاً: أبواق السيارات، ومعدات البناء، وصفارات المرور.'
      },
      {
        time: '0:35',
        speaker: 'Neil',
        text: 'Indeed. Which brings us to our topic today: silence. In a 24-hour world filled with constant digital notifications, silence has become almost an endangered species.',
        arabic: 'بالتأكيد. وهذا ما يقودنا إلى موضوعنا اليوم: الصمت. في عالم يعمل على مدار الساعة ومليء بالإشعارات الرقمية المستمرة، أصبح الصمت أشبه بنوع مهدد بالانقراض.'
      },
      {
        time: '0:48',
        speaker: 'Georgina',
        text: 'Neuroscientists have discovered that quiet environments actually stimulate the hippocampus—the part of the brain linked to memory formation and learning.',
        arabic: 'اكتشف علماء الأعصاب أن البيئات الهادئة تحفز في الواقع قرن آمون (الحُصَين)—وهو الجزء من الدماغ المرتبط بتكوين الذاكرة والتعلم.'
      },
      {
        time: '1:05',
        speaker: 'Neil',
        text: 'So taking ten minutes of absolute quiet each afternoon isn’t laziness; it’s an efficient way to recharge your cognitive battery!',
        arabic: 'إذاً، أخذ عشر دقائق من الهدوء المطلق كل ظهيرة ليس كسلاً؛ بل هو طريقة فعالة لإعادة شحن طاقتك الذهنية!'
      }
    ],
    comprehensionQuiz: [
      {
        question: 'According to neuroscientists in the episode, which part of the brain is stimulated by quiet environments?',
        options: ['The amygdala', 'The hippocampus', 'The cerebellum', 'The optical nerve'],
        answerIndex: 1,
        explanation: 'Georgina mentions that quiet environments stimulate the hippocampus, which is linked to memory and learning.'
      },
      {
        question: 'What metaphor does Neil use to describe silence in modern cities?',
        options: ['A precious jewel', 'An endangered species', 'A lost key', 'A frozen ocean'],
        answerIndex: 1,
        explanation: 'Neil states that in our hyper-connected world, silence has become "almost an endangered species".'
      }
    ]
  },
  {
    id: 'pod-ted-habits',
    title: 'Atomic Habits & The Compound Effect',
    show: 'TED Talks Daily',
    host: 'James Clear',
    level: 'B2',
    durationMinutes: 12,
    category: 'Science & Tech',
    youtubeId: 'U_nzqnXWvSo',
    spotifyUrl: 'https://open.spotify.com/show/1VXcH52En50a6v9S3aYV2z',
    description: 'Why small, 1% improvements every single day accumulate into radical transformation over time. Learn the scientific framework of cue, craving, response, and reward.',
    vocabulary: [
      { word: 'compound effect', definition: 'The strategy of reaping huge rewards from small, seemingly insignificant daily actions.', arabic: 'الأثر التراكمي' },
      { word: 'friction', definition: 'Resistance or difficulty that slows down or prevents an action.', arabic: 'عائق / مقاومة' },
      { word: 'identity', definition: 'The beliefs you hold about the kind of person you are.', arabic: 'الهوية الشخصية' }
    ],
    transcript: [
      {
        time: '0:10',
        speaker: 'James',
        text: 'If you can get just 1 percent better each day for one year, you’ll end up thirty-seven times better by the time you’re done.',
        arabic: 'إذا استطعت أن تتحسن بنسبة 1% فقط كل يوم لمدة عام، ستصبح أفضل بسبعة وثلاثين ضعفاً بحلول نهاية العام.'
      },
      {
        time: '0:25',
        speaker: 'James',
        text: 'Most people think that monumental success requires monumental action. But real habits work like compound interest for self-improvement.',
        arabic: 'يعتقد معظم الناس أن النجاح الهائل يتطلب إجراءات خارقة. لكن العادات الحقيقية تعمل كالفائدة المركبة لتطوير الذات.'
      },
      {
        time: '0:42',
        speaker: 'James',
        text: 'The true secret isn’t willpower; it is designing your environment to reduce friction for the positive actions you want to take.',
        arabic: 'السر الحقيقي لا يكمن في قوة الإرادة؛ بل في تصميم بيئتك لتقليل المقاومة أمام الأفعال الإيجابية التي ترغب في القيام بها.'
      }
    ],
    comprehensionQuiz: [
      {
        question: 'How much better does a 1% daily improvement make someone over a full year?',
        options: ['Two times better', 'Ten times better', 'Thirty-seven times better', 'One hundred times better'],
        answerIndex: 2,
        explanation: 'James points out mathematically that (1.01)^365 equals approximately 37.78 times better.'
      }
    ]
  },
  {
    id: 'pod-lukes-idioms',
    title: 'Natural British Conversation & Slang',
    show: 'Luke’s English Podcast',
    host: 'Luke Thompson',
    level: 'B2',
    durationMinutes: 15,
    category: 'Idioms & Slang',
    youtubeId: 'W3q8Od5qJio',
    spotifyUrl: 'https://open.spotify.com/show/0t75G3b5T06gE',
    description: 'Stand-up comedian and certified teacher Luke Thompson deconstructs casual colloquialisms used across England in cafes, pubs, and workplaces.',
    vocabulary: [
      { word: 'gutted', definition: 'Informal British slang meaning extremely disappointed or devastated.', arabic: 'محبط للغاية / مكسور الخاطر' },
      { word: 'chuffed', definition: 'British informal adjective meaning very pleased and proud.', arabic: 'مبتهج / مسرور جداً' },
      { word: 'knackered', definition: 'Informal British term meaning exhausted or worn out.', arabic: 'منهك تماماً' }
    ],
    transcript: [
      {
        time: '0:12',
        speaker: 'Luke',
        text: 'Welcome back to the podcast everyone. Today we are looking at real, living conversational English as it’s actually spoken on the streets of London.',
        arabic: 'مرحباً بكم مجدداً في البودكاست. اليوم نتناول الإنجليزية المحكية الحية كما تُنطق فعلياً في شوارع لندن.'
      },
      {
        time: '0:30',
        speaker: 'Luke',
        text: 'If someone tells you: "I’m absolutely chuffed to bits with my new job," that means they are over the moon—genuinely delighted!',
        arabic: 'إذا قال لك شخص: "أنا مبتهج للغاية بعملي الجديد"، فهذا يعني أنه في غاية السعادة والفرح الصادق!'
      }
    ],
    comprehensionQuiz: [
      {
        question: 'What does the British slang word "chuffed" mean?',
        options: ['Angry', 'Exhausted', 'Very pleased and delighted', 'Confused'],
        answerIndex: 2,
        explanation: '"Chuffed" is widely used in colloquial British English to describe feeling pleased or proud.'
      }
    ]
  }
];
