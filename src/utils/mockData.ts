import type { Article, Category } from '../types';

const categories: Category[] = [
  'technology',
  'business',
  'sports',
  'science',
  'health',
  'entertainment',
  'politics',
];

const images: Record<Category | 'all', string[]> = {
  all: [],
  technology: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
  ],
  business: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800',
  ],
  sports: [
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800',
    'https://images.unsplash.com/photo-1567600701772-9f3c42d3b551?w=800',
  ],
  science: [
    'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800',
    'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800',
    'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800',
  ],
  health: [
    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800',
  ],
  entertainment: [
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
    'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800',
  ],
  politics: [
    'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800',
    'https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=800',
    'https://images.unsplash.com/photo-1564121211835-e88c852648ab?w=800',
  ],
};

const headlines: Record<Category, string[]> = {
  all: [],
  technology: [
    'OpenAI Unveils Revolutionary New Language Model That Understands Context Like Humans',
    'Apple Announces Groundbreaking AR Headset with 8K Display Technology',
    'Google DeepMind Solves Decades-Old Protein Folding Mystery',
    'Tesla Full Self-Driving Beta Expands to 500,000 Vehicles Worldwide',
    'Quantum Computing Breakthrough Achieves 1000-Qubit Milestone',
    'Meta Launches Next-Generation Neural Interface for VR Interaction',
    'Microsoft Azure AI Infrastructure Hits Record 99.99% Uptime',
    'SpaceX Starlink Reaches 2 Million Active Subscribers Globally',
  ],
  business: [
    'S&P 500 Reaches All-Time High Amid Strong Earnings Season',
    'Amazon Acquires Leading Healthcare Startup for $3.9 Billion',
    'Federal Reserve Signals Possible Rate Cuts in Q3 2025',
    'Goldman Sachs Reports Best Quarter in Company History',
    'NVIDIA Market Cap Surpasses $2 Trillion Milestone',
    'Berkshire Hathaway Annual Meeting Draws Record 50,000 Investors',
    'Global Supply Chain Recovery Boosts Manufacturing Output',
    'Venture Capital Investment Rebounds After Two-Year Slowdown',
  ],
  sports: [
    'Manchester City Wins Historic Fifth Consecutive Premier League Title',
    'LeBron James Announces Retirement After 22 Legendary NBA Seasons',
    'Novak Djokovic Claims Record 25th Grand Slam Title at Wimbledon',
    'World Cup 2026 Host Cities Confirmed Across North America',
    'Formula 1 Introduces Electric-Hybrid Engine for 2026 Season',
    'NBA Draft Prospect Breaks All-Time College Scoring Record',
    'Olympics 2028 Los Angeles Venue Construction Ahead of Schedule',
    'Tiger Woods Returns to Golf After Successful Knee Surgery',
  ],
  science: [
    'NASA Artemis Mission Discovers Water Ice Deposits Near Lunar South Pole',
    'Scientists Reverse Aging Process in Mice Using Gene Therapy',
    'New Species of Deep-Sea Creature Found at Mariana Trench',
    'CERN Confirms Existence of New Subatomic Particle',
    'James Webb Telescope Captures Oldest Galaxy Ever Observed',
    'Breakthrough in Nuclear Fusion Achieves Net Energy Gain',
    'Antarctic Ice Sheet Study Reveals Accelerating Melt Rate',
    'Mars Perseverance Rover Finds Organic Molecules in Rock Samples',
  ],
  health: [
    'New mRNA Vaccine Shows 94% Efficacy Against Aggressive Cancer Types',
    'WHO Declares Breakthrough in Antimicrobial Resistance Treatment',
    'Study Links Mediterranean Diet to 30% Reduced Dementia Risk',
    'FDA Approves First Gene Therapy for Hereditary Blindness',
    'Global Life Expectancy Rises to 74 Years Despite Pandemic Setbacks',
    "AI Diagnostic Tool Detects Early Alzheimer's With 97% Accuracy",
    'New Antibiotic Effective Against Drug-Resistant Superbugs',
    'Mental Health App Reduces Anxiety Symptoms by 60% in Clinical Trial',
  ],
  entertainment: [
    "Christopher Nolan's New Epic Film Breaks Opening Weekend Box Office Record",
    'Spotify Reaches 700 Million Users After Aggressive Market Expansion',
    'Netflix Original Series Sweeps Emmy Awards With 12 Wins',
    "Taylor Swift's Eras Tour Becomes Highest-Grossing Concert Tour Ever",
    'Cannes Film Festival Announces Controversial Palestinian Filmmaker as Jury Head',
    'Disney+ and Hulu Merger Creates Largest Streaming Platform in History',
    'Video Game Industry Revenue Surpasses Hollywood for Third Year Running',
    'Broadway Returns to Record Attendance After Post-Pandemic Recovery',
  ],
  politics: [
    'G7 Leaders Reach Historic Climate Agreement at Summit in Tokyo',
    'United Nations Security Council Passes New Cybersecurity Treaty',
    'European Parliament Approves Landmark AI Regulation Framework',
    'NATO Expands Membership to Include Two New Eastern European Nations',
    'US Congress Passes Bipartisan Infrastructure Spending Package',
    'World Trade Organization Launches New Digital Commerce Rules',
    'International Court Ruling Sets Precedent for Climate Litigation',
    'ASEAN Nations Sign Historic Free Trade Agreement With EU',
  ],
};

const excerpts = [
  'In a development that has sent shockwaves through the industry, experts are calling this one of the most significant advances in recent memory.',
  'Analysts say the move could reshape the competitive landscape for years to come, with far-reaching implications for consumers and businesses alike.',
  'The announcement came after months of speculation and represents a major shift in strategy from what observers had previously anticipated.',
  'Research teams spent over three years developing the breakthrough, which has already attracted significant attention from leading institutions worldwide.',
  'Officials confirmed the news at a press conference, outlining plans that are expected to take effect within the next fiscal quarter.',
  'The development marks a turning point in an ongoing saga that has captivated observers for the better part of the past decade.',
  'Early results have been promising, though experts caution that more data will be needed before drawing definitive conclusions.',
];

const authors = [
  'Sarah Mitchell',
  'James Thornton',
  'Priya Sharma',
  'Carlos Rivera',
  'Emma Watson',
  'David Chen',
  'Olivia Park',
  'Marcus Johnson',
];
const sources = [
  'Reuters',
  'AP News',
  'BBC World',
  'The Guardian',
  'Bloomberg',
  'TechCrunch',
  'The Verge',
  'Wired',
];
const tagPool = [
  'breaking',
  'analysis',
  'exclusive',
  'trending',
  'opinion',
  'report',
  'investigation',
  'interview',
];

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T>(arr: T[]) => arr[rand(0, arr.length - 1)];

const generateContent = (title: string): string =>
  `
${title}

${excerpts[rand(0, excerpts.length - 1)]} ${excerpts[rand(0, excerpts.length - 1)]}

**Background**

${excerpts[rand(0, excerpts.length - 1)]} The situation has been developing over the past several months, with key stakeholders closely monitoring each new development.

Experts from leading institutions have weighed in on the implications, noting that the ramifications could be felt across multiple sectors. "This is a watershed moment," said one senior analyst who asked not to be named due to the sensitivity of ongoing negotiations.

**What This Means**

${excerpts[rand(0, excerpts.length - 1)]} Industry observers point to several key factors that have contributed to this outcome, including changing market conditions, regulatory shifts, and evolving consumer preferences.

The broader ecosystem is expected to adapt accordingly, with major players already announcing plans to respond to the new reality. Some have welcomed the change as long overdue, while others have expressed reservations about the pace and scope of the transformation.

**Looking Ahead**

As events continue to unfold, stakeholders will be watching closely for signals about the next steps. ${excerpts[rand(0, excerpts.length - 1)]}

The coming weeks are expected to bring additional clarity, with several key decisions pending that could further shape the trajectory of this story.
`.trim();

export const generateMockArticles = (): Article[] => {
  const articles: Article[] = [];
  let id = 1;

  categories.forEach((cat) => {
    const catHeadlines = headlines[cat];
    const catImages = images[cat];

    catHeadlines.forEach((title, idx) => {
      const daysAgo = rand(0, 14);
      const hoursAgo = rand(0, 23);
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      date.setHours(date.getHours() - hoursAgo);

      articles.push({
        id: String(id++),
        title,
        excerpt: excerpts[idx % excerpts.length],
        content: generateContent(title),
        author: pick(authors),
        source: pick(sources),
        category: cat,
        imageUrl: catImages[idx % catImages.length],
        publishedAt: date.toISOString(),
        readTime: rand(3, 12),
        tags: [cat, pick(tagPool), pick(tagPool)]
          .filter((v, i, a) => a.indexOf(v) === i)
          .slice(0, 3),
        views: rand(1000, 50000),
        isFeatured: idx === 0,
      });
    });
  });

  return articles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
};
