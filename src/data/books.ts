import { Book } from '../types';

export const BOOKS_LIBRARY: Book[] = [
  {
    id: 'pride-and-prejudice',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    year: 1813,
    level: 'B2',
    genre: 'Romance',
    coverGradient: 'from-amber-700 via-rose-800 to-amber-950',
    summary: 'A witty comedy of manners exploring society, marriage, and misunderstandings between Elizabeth Bennet and Mr. Darcy.',
    description: 'Jane Austen’s masterpiece follows the turbulent relationship between Elizabeth Bennet, the daughter of a country gentleman, and Fitzwilliam Darcy, a rich and proud aristocratic landowner.',
    wordCount: 122000,
    tags: ['Regency', 'Satire', 'Classic Romance', 'Character Study'],
    chapters: [
      {
        id: 'pnp-ch1',
        chapterNum: 1,
        title: 'Chapter 1: A Truth Universally Acknowledged',
        content: `It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.

However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.

"My dear Mr. Bennet," said his lady to him one day, "have you heard that Netherfield Park is let at last?"

Mr. Bennet replied that he had not.

"But it is," returned she; "for Mrs. Long has just been here, and she told me all about it."

Mr. Bennet made no answer.

"Do you not want to know who has taken it?" cried his wife impatiently.

"You want to tell me, and I have no objection to hearing it."

This was invitation enough.

"Why, my dear, you must know, Mrs. Long says that Netherfield is taken by a young man of large fortune from the north of England; that he came down on Monday in a chaise and four to see the place, and was so much delighted with it, that he agreed with Mr. Morris immediately; that he is to take possession before Michaelmas, and some of his servants are to be in the house by the end of next week."

"What is his name?"

"Bingley."

"Is he married or single?"

"Oh! Single, my dear, to be sure! A single man of large fortune; four or five thousand a year. What a fine thing for our girls!"

"How so? How can it affect them?"

"My dear Mr. Bennet," replied his wife, "how can you be so tiresome! You must know that I am thinking of his marrying one of them."`
      },
      {
        id: 'pnp-ch2',
        chapterNum: 2,
        title: 'Chapter 2: The Mysterious Visit',
        content: `Mr. Bennet was among the earliest of those who waited on Mr. Bingley. He had always intended to visit him, though to the last always assuring his wife that he should not go; and till the evening after the visit was paid she had no knowledge of it.

It was then disclosed in the following manner. Observing his second daughter employed in trimming a hat, he suddenly addressed her with:

"I hope Mr. Bingley will like it, Lizzy."

"We are not in a way to know what Mr. Bingley likes," said her mother resentfully, "since we are not to visit."

"But you forget, mamma," said Elizabeth, "that we shall meet him at the assemblies, and that Mrs. Long has promised to introduce him."

"I do not believe Mrs. Long will do any such thing. She has two nieces of her own. She is a selfish, hypocritical woman, and I have no opinion of her."

"No more have I," said Mr. Bennet; "and I am glad to find that you do not depend on her serving you."

Mrs. Bennet deigned not to make any reply, but, unable to contain herself, began scolding one of her daughters.

"Don't keep coughing so, Kitty, for heaven's sake! Have a little compassion on my nerves. You tear them to pieces."

"Kitty has no discretion in her coughs," said her father; "she times them ill."

"I do not cough for my own amusement," replied Kitty fretfully. "When is your next ball to be, Lizzy?"`
      }
    ]
  },
  {
    id: 'the-great-gatsby',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    year: 1925,
    level: 'B2',
    genre: 'Classic',
    coverGradient: 'from-emerald-800 via-teal-900 to-slate-950',
    summary: 'The dazzling, tragic portrait of the Jazz Age, wealth, unattainable love, and the elusive green light of hope.',
    description: 'Narrated by Nick Carraway, this story chronicles the mysterious millionaire Jay Gatsby and his obsessive love for the beautiful Daisy Buchanan in 1920s Long Island.',
    wordCount: 47000,
    tags: ['Jazz Age', 'Tragedy', 'American Dream', 'Prose Poetics'],
    chapters: [
      {
        id: 'gatsby-ch1',
        chapterNum: 1,
        title: 'Chapter 1: The Advice and The Green Light',
        content: `In my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mind ever since.

"Whenever you feel like criticizing any one," he told me, "just remember that all the people in this world haven’t had the advantages that you’ve had."

He didn’t say any more, but we’ve always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I’m inclined to reserve all judgements, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores.

Reserving judgements is a matter of infinite hope. I am still a little afraid of missing something if I forget that, as my father snobbishly suggested, and I snobbishly repeat, a sense of the fundamental decencies is parcelled out unequally at birth.

When I came back from the East last autumn I felt that I wanted the world to be in uniform and at a sort of moral attention forever; I wanted no more riotous excursions with privileged glimpses into the human heart. Only Gatsby, the man who gives his name to this book, was exempt from my reaction—Gatsby, who represented everything for which I have an unaffected scorn.

If personality is an unbroken series of successful gestures, then there was something gorgeous about him, some heightened sensitivity to the promises of life, as if he were related to one of those intricate machines that register earthquakes ten thousand miles away. This responsiveness had nothing to do with that flabby impressionability which is dignified under the name of the "creative temperament"—it was an extraordinary gift for hope, a romantic readiness such as I have never found in any other person and which it is not likely I shall ever find again.`
      }
    ]
  },
  {
    id: 'alice-in-wonderland',
    title: 'Alice’s Adventures in Wonderland',
    author: 'Lewis Carroll',
    year: 1865,
    level: 'A2',
    genre: 'Fantasy',
    coverGradient: 'from-cyan-700 via-blue-800 to-indigo-950',
    summary: 'A young girl falls down a rabbit hole into a fantastical, whimsical underground world of talking creatures.',
    description: 'One of the most famous literary nonsense works, rich in wordplay, riddles, logic, and imaginative dialogue ideal for English learners.',
    wordCount: 26000,
    tags: ['Whimsical', 'Fantasy', 'Family Classic', 'Playful English'],
    chapters: [
      {
        id: 'alice-ch1',
        chapterNum: 1,
        title: 'Chapter 1: Down the Rabbit-Hole',
        content: `Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, "and what is the use of a book," thought Alice "without pictures or conversations?"

So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.

There was nothing so very remarkable in that; nor did Alice think it so very much out of the way to hear the Rabbit say to itself, "Oh dear! Oh dear! I shall be late!" (when she thought it over afterwards, it occurred to her that she ought to have wondered at this, but at the time it all seemed quite natural); but when the Rabbit actually took a watch out of its waistcoat-pocket, and looked at it, and then hurried on, Alice started to her feet, for it flashed across her mind that she had never before seen a rabbit with either a waistcoat-pocket, or a watch to take out of it, and burning with curiosity, she ran across the field after it, and fortunately was just in time to see it pop down a large rabbit-hole under the hedge.

In another moment down went Alice after it, never once considering in the world how on earth she was to get out again.`
      }
    ]
  },
  {
    id: 'sherlock-holmes',
    title: 'The Adventures of Sherlock Holmes',
    author: 'Arthur Conan Doyle',
    year: 1892,
    level: 'B1',
    genre: 'Mystery',
    coverGradient: 'from-slate-700 via-stone-800 to-zinc-950',
    summary: 'The iconic Baker Street consulting detective and Dr. Watson unravel bewildering mysteries through sharp deductive logic.',
    description: 'Featuring "A Scandal in Bohemia," introducing the brilliant Irene Adler, the one adversary who continually outwitted the legendary detective.',
    wordCount: 104000,
    tags: ['Detective', 'Victorian', 'Logic & Deduction', 'London'],
    chapters: [
      {
        id: 'holmes-scandal-1',
        chapterNum: 1,
        title: 'A Scandal in Bohemia: The Woman',
        content: `To Sherlock Holmes she is always the woman. I have seldom heard him mention her under any other name. In his eyes she eclipses and predominates the whole of her sex. It was not that he felt any emotion akin to love for Irene Adler. All emotions, and that one particularly, were abhorrent to his cold, precise but admirably balanced mind.

He was, I take it, the most perfect reasoning and observing machine that the world has seen, but as a lover he would have placed himself in a false position. He never spoke of the softer passions, save with a gibe and a sneer. They were admirable things for the observer—excellent for drawing the veil from men’s motives and actions. But for the trained reasoner to admit such intrusions into his own delicate and finely adjusted temperament was to introduce a distracting factor which might throw a doubt upon all his mental results.

Grit in a sensitive instrument, or a crack in one of his own high-power lenses, would not be more disturbing than a strong emotion in a nature such as his. And yet there was but one woman to him, and that woman was the late Irene Adler, of dubious and questionable memory.

I had seen little of Holmes lately. My marriage had drifted us away from each other. My own complete happiness, and the home-centred interests which rise up around the man who first finds himself master of his own establishment, were sufficient to absorb all my attention.`
      }
    ]
  },
  {
    id: 'gift-of-the-magi',
    title: 'The Gift of the Magi',
    author: 'O. Henry',
    year: 1905,
    level: 'B1',
    genre: 'Short Story',
    coverGradient: 'from-rose-800 via-red-900 to-amber-950',
    summary: 'A tender story of a young husband and wife who sacrifice their most treasured possessions to buy each other Christmas gifts.',
    description: 'Renowned for its surprise ending, wit, and deep emotional resonance, showcasing sacrificial love in modest circumstances.',
    wordCount: 2200,
    tags: ['O. Henry', 'Heartwarming', 'Irony', 'Classic Short Story'],
    chapters: [
      {
        id: 'magi-complete',
        chapterNum: 1,
        title: 'Complete Story: One Dollar and Eighty-Seven Cents',
        content: `One dollar and eighty-seven cents. That was all. And sixty cents of it was in pennies. Pennies saved one and two at a time by bulldozing the grocer and the vegetable man and the butcher until one’s cheeks burned with the silent imputation of parsimony that such close dealing implied. Three times Della counted it. One dollar and eighty-seven cents. And the next day would be Christmas.

There was clearly nothing to do but flop down on the shabby little couch and howl. So Della did it. Which instigates the moral reflection that life is made up of sobs, sniffles, and smiles, with sniffles predominating.

While the mistress of the home is gradually subsiding from the first stage to the second, take a look at the home. A furnished flat at $8 per week. It did not exactly beggar description, but it certainly had that word on the lookout for the mendicancy squad.

In the vestibule below was a letter-box into which no letter would go, and an electric button from which no mortal finger could coax a ring. Also appertaining thereunto was a card bearing the name "Mr. James Dillingham Young."

Now, there were two possessions of the James Dillingham Youngs in which they both took a mighty pride. One was Jim’s gold watch that had been his father’s and his grandfather’s. The other was Della’s hair. Had the queen of Sheba lived in the flat across the airshaft, Della would have let her hair hang out the window some day to dry just to depreciate Her Majesty’s jewels and gifts.`
      }
    ]
  },
  {
    id: 'aesops-fables',
    title: 'Aesop’s Fables',
    author: 'Aesop',
    year: -600,
    level: 'A1',
    genre: 'Adventure',
    coverGradient: 'from-amber-600 via-orange-700 to-stone-900',
    summary: 'Simple, moral animal tales with clear vocabulary and timeless wisdom for language learners of all ages.',
    description: 'Perfect for beginners and intermediate readers, presenting clear sentences, essential verbs, and memorable moral lessons.',
    wordCount: 15000,
    tags: ['Beginner Friendly', 'Morals', 'Allegory', 'Ancient Wisdom'],
    chapters: [
      {
        id: 'aesop-ch1',
        chapterNum: 1,
        title: 'The Tortoise and The Hare',
        content: `A Hare was one day making fun of the short feet and slow pace of the Tortoise, who replied, laughing:

"Though you be swift as the wind, I will beat you in a race."

The Hare, believing her assertion to be simply impossible, assented to the proposal; and they agreed that the Fox should choose the course and fix the goal.

On the day appointed for the race the two started together. The Tortoise never for a moment stopped, but went on with a slow but steady pace straight to the end of the course.

The Hare, lying down by the wayside, fell fast asleep.

At last waking up, and moving as fast as he could, he saw the Tortoise had reached the goal, and was comfortably dozing after her fatigue.

Slow and steady wins the race.`
      },
      {
        id: 'aesop-ch2',
        chapterNum: 2,
        title: 'The Ant and The Grasshopper',
        content: `One bright day in late autumn a family of Ants were bustling about in the warm sunshine, drying out the grain they had stored up during the summer.

When a starving Grasshopper, his fiddle under his arm, came up and humbly begged for a bite to eat.

"What!" cried the Ants in surprise, "haven't you stored anything away for the winter? What in the world were you doing all last summer?"

"I didn't have time to store up any food," whined the Grasshopper; "I was so busy making music that before I knew it the summer was gone."

The Ants shook their heads in disgust.

"Making music, were you?" they cried. "Very well; now dance!" And they turned their backs on the Grasshopper and went on with their work.

There is a time for work and a time for play.`
      }
    ]
  },
  {
    id: 'dorian-gray',
    title: 'The Picture of Dorian Gray',
    author: 'Oscar Wilde',
    year: 1890,
    level: 'C1',
    genre: 'Philosophy',
    coverGradient: 'from-purple-900 via-violet-950 to-neutral-950',
    summary: 'A dark philosophical story about youth, aestheticism, moral decay, and a portrait that bears the sins of its subject.',
    description: 'Oscar Wilde’s only novel, celebrated for its brilliant epigrams, rich vocabulary, poetic cadence, and philosophical dialogue.',
    wordCount: 78000,
    tags: ['Aestheticism', 'Gothic', 'Philosophy', 'Oscar Wilde'],
    chapters: [
      {
        id: 'dorian-ch1',
        chapterNum: 1,
        title: 'Chapter 1: The Studio and The Portrait',
        content: `The studio was filled with the rich odour of roses, and when the light summer wind stirred amidst the trees of the garden, there came through the open door the heavy scent of the lilac, or the more delicate perfume of the pink-flowering thorn.

From the corner of the divan of Persian saddle-bags on which he was lying, smoking, as was his custom, innumerable cigarettes, Lord Henry Wotton could just catch the gleam of the honey-sweet and honey-coloured blossoms of a laburnum, whose tremulous branches seemed hardly able to bear the burden of a beauty so flame-like as theirs.

In the centre of the room, clamped to an upright easel, stood the full-length portrait of a young man of extraordinary personal beauty, and in front of it, some little distance away, was sitting the artist himself, Basil Hallward, whose sudden disappearance some years ago caused, at the time, such public excitement and gave rise to so many strange conjectures.

As the painter looked at the gracious and comely form he had so skilfully mirrored in his art, a smile of pleasure passed across his face, and seemed about to linger there. But he suddenly started up, and closing his eyes, placed his fingers upon the lids, as though he sought to imprison within his brain some curious dream from which he feared he might awake.`
      }
    ]
  }
];
