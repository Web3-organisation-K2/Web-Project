export type SessionStatus = 'upcoming' | 'live' | 'ended';

export interface Speaker {
  id: string;
  name: string;
  photo: string;
  bio: string;
  title: string;
  company: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
  github?: string;
  sessions?: string[];
  tags?: string[];
}

export interface Question {
  id: string;
  content: string;
  author: string | null;
  upvotes: number;
  sessionId: string;
  createdAt: string;
}

export interface Room {
  id: string;
  name: string;
  color: string;
}

export interface Session {
  id: string;
  eventId: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  room: Room;
  capacity: number;
  speakers: Speaker[];
  questions: Question[];
  tags: string[];
  track: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  venue: string;
  city: string;
  coverImage: string;
  coverImageAlt: string;
  sessions: Session[];
  category?: string;
  attendees?: number;
  price?: string;
  tags?: string[];
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'live';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const ROOMS: Room[] = [
{ id: 'room-main', name: 'Main Stage', color: '#A8FF3E' },
{ id: 'room-alpha', name: 'Room Alpha', color: '#FF6B2B' },
{ id: 'room-beta', name: 'Room Beta', color: '#A8FF3E' },
{ id: 'room-gamma', name: 'Room Gamma', color: '#FF6B2B' },
{ id: 'room-workshop', name: 'Workshop Hub', color: '#A8FF3E' }];


export const SPEAKERS: Speaker[] = [
{
  id: 'spk-001',
  name: 'Léa Fontaine',
  photo: 'https://i.pravatar.cc/150?img=47',
  bio: 'Engineering Director at Vercel. Passionate about developer experience, edge computing, and building tools that help millions of developers ship faster. Previously at Cloudflare and Netlify.',
  title: 'Engineering Director',
  company: 'Vercel',
  twitter: 'leafontaine',
  linkedin: 'leafontaine',
  website: 'https://leafontaine.dev',
  tags: ['Edge Computing', 'Web Dev', 'DX'],
  sessions: ['sess-001', 'sess-007']
},
{
  id: 'spk-002',
  name: 'Marcus Chen',
  photo: 'https://i.pravatar.cc/150?img=12',
  bio: 'Staff Engineer at Stripe. Specializes in distributed systems, payment infrastructure, and building resilient APIs at scale. Author of "Payments at Scale" blog series.',
  title: 'Staff Engineer',
  company: 'Stripe',
  twitter: 'marcuschen',
  linkedin: 'marcuschen',
  tags: ['APIs', 'Distributed Systems', 'Payments'],
  sessions: ['sess-002', 'sess-008']
},
{
  id: 'spk-003',
  name: 'Amara Diallo',
  photo: 'https://i.pravatar.cc/150?img=32',
  bio: 'AI Research Lead at Hugging Face. Former ML engineer at Google Brain. Focused on making LLMs more accessible and efficient for production use. PhD from MIT.',
  title: 'AI Research Lead',
  company: 'Hugging Face',
  twitter: 'amaradiallo',
  website: 'https://amaradiallo.ai',
  tags: ['AI/ML', 'LLMs', 'Research'],
  sessions: ['sess-003', 'sess-007']
},
{
  id: 'spk-004',
  name: 'Thomas Ruelle',
  photo: 'https://i.pravatar.cc/150?img=53',
  bio: 'Principal Designer at Figma. Advocate for design systems and accessible interfaces. Speaker at Config, Design Systems Week. Creator of the Figma Design Tokens plugin.',
  title: 'Principal Designer',
  company: 'Figma',
  linkedin: 'thomasruelle',
  website: 'https://thomasruelle.design',
  tags: ['Design Systems', 'UX', 'Accessibility'],
  sessions: ['sess-004']
},
{
  id: 'spk-005',
  name: 'Yuki Nakamura',
  photo: 'https://i.pravatar.cc/150?img=25',
  bio: 'Open-source maintainer of TurboRepo and contributor to the Node.js core team. Building the future of monorepo tooling. Previously at Meta and Shopify.',
  title: 'OSS Maintainer',
  company: 'Independent',
  twitter: 'yukinakamura',
  github: 'yukinakamura',
  tags: ['Open Source', 'Tooling', 'Node.js'],
  sessions: ['sess-005', 'sess-007']
},
{
  id: 'spk-006',
  name: 'Sofia Marchetti',
  photo: 'https://i.pravatar.cc/150?img=41',
  bio: 'CTO of DataLayer. Former Principal at AWS. Expert in data warehousing, streaming architectures, and real-time analytics pipelines. Speaker at re:Invent and DataEng Summit.',
  title: 'CTO',
  company: 'DataLayer',
  twitter: 'sofiamarchetti',
  linkedin: 'sofiamarchetti',
  tags: ['Data Engineering', 'Kafka', 'Analytics'],
  sessions: ['sess-006']
},
{
  id: 'spk-007',
  name: 'Ravi Patel',
  photo: 'https://i.pravatar.cc/150?img=60',
  bio: 'Security Engineer at GitHub. Specializes in supply chain security, SAST tooling, and developer-first security practices. Creator of the popular OSS tool "SecureCI".',
  title: 'Security Engineer',
  company: 'GitHub',
  twitter: 'ravipatel_sec',
  linkedin: 'ravipatel',
  tags: ['Security', 'DevSecOps', 'Supply Chain'],
  sessions: ['sess-009']
},
{
  id: 'spk-008',
  name: 'Claire Dubois',
  photo: 'https://i.pravatar.cc/150?img=44',
  bio: 'Product Lead at Linear. Former PM at Notion and Figma. Passionate about developer tools, productivity, and building products that engineers love to use every day.',
  title: 'Product Lead',
  company: 'Linear',
  linkedin: 'clairedubois',
  website: 'https://clairedubois.io',
  tags: ['Product', 'Dev Tools', 'Productivity'],
  sessions: ['sess-010']
},
{
  id: 'spk-009',
  name: 'James Okafor',
  photo: 'https://i.pravatar.cc/150?img=15',
  bio: 'Platform Engineer at Shopify. Expert in Kubernetes, platform engineering, and internal developer platforms. Contributor to CNCF projects and author of "Platform Engineering Handbook".',
  title: 'Platform Engineer',
  company: 'Shopify',
  twitter: 'jamesokafor',
  github: 'jamesokafor',
  tags: ['Platform Engineering', 'Kubernetes', 'DevOps'],
  sessions: ['sess-011']
},
{
  id: 'spk-010',
  name: 'Nadia Kowalski',
  photo: 'https://i.pravatar.cc/150?img=36',
  bio: 'WebAssembly engineer at Fastly. Pushing the boundaries of what\'s possible at the edge with WASM. Core contributor to the Wasmtime runtime and WASI standards.',
  title: 'WASM Engineer',
  company: 'Fastly',
  twitter: 'nadiakowalski',
  github: 'nadiakowalski',
  tags: ['WebAssembly', 'Edge', 'Performance'],
  sessions: ['sess-012']
}];


export const MOCK_NOW = new Date('2026-04-26T10:45:00');

export const SESSIONS: Session[] = [
{
  id: 'sess-001',
  eventId: 'evt-001',
  title: 'Keynote: The Edge-First Future of Web Development',
  description: 'An in-depth look at how edge computing is reshaping how we build and deploy web applications. We will explore real-world case studies from Vercel customers, discuss the tradeoffs of edge vs. serverless, and preview upcoming platform capabilities that will change how you think about latency and user experience.',
  startTime: '2026-04-26T09:00:00',
  endTime: '2026-04-26T10:00:00',
  room: ROOMS[0],
  capacity: 800,
  speakers: [SPEAKERS[0]],
  questions: [],
  tags: ['keynote', 'edge', 'web'],
  track: 'Keynote'
},
{
  id: 'sess-002',
  eventId: 'evt-001',
  title: 'Building Resilient Payment APIs at Scale',
  description: 'How Stripe engineers design for failure, handle idempotency, and maintain 99.999% uptime across distributed payment systems. A deep-dive into patterns that prevent double charges, handle network partitions, and recover gracefully from third-party outages.',
  startTime: '2026-04-26T10:30:00',
  endTime: '2026-04-26T11:15:00',
  room: ROOMS[1],
  capacity: 200,
  speakers: [SPEAKERS[1]],
  questions: [
  { id: 'q-001', content: 'How do you handle idempotency keys when a client retries after a timeout?', author: 'Alexis B.', upvotes: 24, sessionId: 'sess-002', createdAt: '2026-04-26T10:38:00' },
  { id: 'q-002', content: 'What monitoring tools does Stripe use to detect payment anomalies in real time?', author: null, upvotes: 18, sessionId: 'sess-002', createdAt: '2026-04-26T10:41:00' },
  { id: 'q-003', content: 'Can you share how you test failure scenarios in staging without impacting production data?', author: 'Dev K.', upvotes: 15, sessionId: 'sess-002', createdAt: '2026-04-26T10:43:00' },
  { id: 'q-004', content: 'What is your approach to handling currency conversion edge cases in multi-currency transactions?', author: null, upvotes: 9, sessionId: 'sess-002', createdAt: '2026-04-26T10:44:00' },
  { id: 'q-005', content: 'How does the Stripe team manage database migrations on live systems with millions of transactions per day?', author: 'Priya S.', upvotes: 7, sessionId: 'sess-002', createdAt: '2026-04-26T10:45:00' }],

  tags: ['api', 'payments', 'distributed-systems'],
  track: 'Engineering'
},
{
  id: 'sess-003',
  eventId: 'evt-001',
  title: 'LLMs in Production: Lessons from 18 Months at Scale',
  description: 'Amara shares hard-won lessons from deploying large language models in production environments used by hundreds of thousands of users. Topics include prompt engineering at scale, cost optimization strategies, latency reduction techniques, and how to build evaluation pipelines that catch regressions before they reach users.',
  startTime: '2026-04-26T10:30:00',
  endTime: '2026-04-26T11:15:00',
  room: ROOMS[2],
  capacity: 180,
  speakers: [SPEAKERS[2]],
  questions: [
  { id: 'q-006', content: 'What evaluation metrics do you use beyond BLEU and ROUGE for production LLMs?', author: 'Nadia F.', upvotes: 31, sessionId: 'sess-003', createdAt: '2026-04-26T10:35:00' },
  { id: 'q-007', content: 'How do you handle prompt injection attacks in user-facing applications?', author: null, upvotes: 22, sessionId: 'sess-003', createdAt: '2026-04-26T10:39:00' },
  { id: 'q-008', content: 'What is your recommended approach for fine-tuning vs. RAG for domain-specific tasks?', author: 'Kai W.', upvotes: 19, sessionId: 'sess-003', createdAt: '2026-04-26T10:42:00' }],

  tags: ['ai', 'llm', 'production'],
  track: 'AI & ML'
},
{
  id: 'sess-004',
  eventId: 'evt-001',
  title: 'Design Systems at Scale: Figma to Code Without the Gap',
  description: 'Thomas walks through Figma\'s internal design system journey — from a fragmented collection of components to a unified system used by 300+ designers and engineers. Learn about token architecture, automated code generation, and the cultural changes needed to make design systems actually work.',
  startTime: '2026-04-26T10:30:00',
  endTime: '2026-04-26T11:15:00',
  room: ROOMS[3],
  capacity: 150,
  speakers: [SPEAKERS[3]],
  questions: [
  { id: 'q-009', content: 'How do you version design tokens when breaking changes are needed?', author: 'Emma L.', upvotes: 12, sessionId: 'sess-004', createdAt: '2026-04-26T10:37:00' },
  { id: 'q-010', content: 'What tools do you use to automatically generate React components from Figma frames?', author: null, upvotes: 8, sessionId: 'sess-004', createdAt: '2026-04-26T10:40:00' }],

  tags: ['design', 'design-systems', 'figma'],
  track: 'Design'
},
{
  id: 'sess-005',
  eventId: 'evt-001',
  title: 'Monorepo Mastery: TurboRepo in 2026',
  description: 'A hands-on workshop exploring the latest TurboRepo features: remote caching strategies, custom pipeline configurations, and integrating with CI/CD systems like GitHub Actions and CircleCI. Bring your laptop — we will set up a real monorepo from scratch.',
  startTime: '2026-04-26T10:30:00',
  endTime: '2026-04-26T12:00:00',
  room: ROOMS[4],
  capacity: 60,
  speakers: [SPEAKERS[4]],
  questions: [],
  tags: ['tooling', 'monorepo', 'workshop'],
  track: 'Workshop'
},
{
  id: 'sess-006',
  eventId: 'evt-001',
  title: 'Real-Time Analytics: From Kafka to Dashboard in Under 500ms',
  description: 'Sofia demonstrates how DataLayer built a streaming analytics pipeline that ingests 50M events per day and surfaces insights to end users in under half a second. Deep dive into the architecture: Kafka, ClickHouse, WebSockets, and a React dashboard that updates live.',
  startTime: '2026-04-26T11:30:00',
  endTime: '2026-04-26T12:15:00',
  room: ROOMS[1],
  capacity: 200,
  speakers: [SPEAKERS[5]],
  questions: [],
  tags: ['data', 'kafka', 'analytics'],
  track: 'Data Engineering'
},
{
  id: 'sess-007',
  eventId: 'evt-001',
  title: 'Closing Panel: Open Source Sustainability in 2026',
  description: 'A roundtable discussion with maintainers and company representatives about the state of open-source funding, governance models, and what it means to build a sustainable open-source project in today\'s ecosystem.',
  startTime: '2026-04-26T14:00:00',
  endTime: '2026-04-26T15:00:00',
  room: ROOMS[0],
  capacity: 800,
  speakers: [SPEAKERS[0], SPEAKERS[4], SPEAKERS[2]],
  questions: [],
  tags: ['open-source', 'panel', 'community'],
  track: 'Community'
},
{
  id: 'sess-008',
  eventId: 'evt-001',
  title: 'TypeScript 6 Deep Dive: New Type System Features',
  description: 'A technical walkthrough of the most impactful TypeScript 6 additions — variance annotations, const type parameters, and improved inference for generic functions. With live coding examples and real-world use cases.',
  startTime: '2026-04-26T13:00:00',
  endTime: '2026-04-26T13:45:00',
  room: ROOMS[1],
  capacity: 200,
  speakers: [SPEAKERS[1]],
  questions: [],
  tags: ['typescript', 'javascript', 'language'],
  track: 'Engineering'
},
{
  id: 'sess-009',
  eventId: 'evt-001',
  title: 'Supply Chain Security: Protecting Your npm Dependencies',
  description: 'Ravi walks through the most common supply chain attack vectors targeting JavaScript ecosystems, and demonstrates practical defenses: lockfile integrity checks, provenance attestations, and automated vulnerability scanning in CI.',
  startTime: '2026-04-26T13:00:00',
  endTime: '2026-04-26T13:45:00',
  room: ROOMS[2],
  capacity: 180,
  speakers: [SPEAKERS[6]],
  questions: [],
  tags: ['security', 'npm', 'devops'],
  track: 'Security'
},
{
  id: 'sess-010',
  eventId: 'evt-001',
  title: 'Building Products Developers Actually Love',
  description: 'Claire shares the product philosophy behind Linear\'s meteoric rise — from 0 to 50k teams in 3 years. Learn how to identify what developers truly value, how to ship fast without sacrificing quality, and why opinionated products win.',
  startTime: '2026-04-26T13:00:00',
  endTime: '2026-04-26T13:45:00',
  room: ROOMS[3],
  capacity: 150,
  speakers: [SPEAKERS[7]],
  questions: [],
  tags: ['product', 'developer-tools', 'growth'],
  track: 'Product'
},
{
  id: 'sess-011',
  eventId: 'evt-001',
  title: 'Internal Developer Platforms: From Zero to Production',
  description: 'James shares Shopify\'s journey building an IDP that serves 2,000+ engineers. Topics: golden paths, self-service infrastructure, platform team structure, and how to measure developer productivity without destroying morale.',
  startTime: '2026-04-26T15:30:00',
  endTime: '2026-04-26T16:15:00',
  room: ROOMS[1],
  capacity: 200,
  speakers: [SPEAKERS[8]],
  questions: [],
  tags: ['platform-engineering', 'kubernetes', 'devops'],
  track: 'Platform'
},
{
  id: 'sess-012',
  eventId: 'evt-001',
  title: 'WebAssembly at the Edge: Beyond the Browser',
  description: 'Nadia demonstrates how WASM is transforming edge computing — running untrusted code safely, near-instant cold starts, and polyglot runtimes. Live demo: deploying a Rust function to 200+ edge locations in under 30 seconds.',
  startTime: '2026-04-26T15:30:00',
  endTime: '2026-04-26T16:15:00',
  room: ROOMS[2],
  capacity: 180,
  speakers: [SPEAKERS[9]],
  questions: [],
  tags: ['wasm', 'edge', 'performance'],
  track: 'Engineering'
}];


export const EVENT: Event = {
  id: 'evt-001',
  title: 'DevConf Paris 2026',
  description: 'The premier web development conference in Europe. Two days of talks, workshops, and networking with 1,200+ developers, designers, and engineering leaders from across the continent. Explore the cutting edge of web technologies, AI integration, design systems, and developer tooling.',
  startDate: '2026-04-26',
  endDate: '2026-04-27',
  venue: 'Palais des Congrès',
  city: 'Paris, France',
  coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_15321ff4b-1773181437962.png",
  coverImageAlt: 'Large conference hall with stage lighting and audience at DevConf Paris 2026',
  sessions: SESSIONS,
  category: 'Technology',
  attendees: 1200,
  price: 'Free',
  tags: ['Web Dev', 'AI', 'Design', 'DevOps']
};

export const UPCOMING_EVENTS: Event[] = [
{
  id: 'evt-001',
  title: 'DevConf Paris 2026',
  description: 'The premier web development conference in Europe with 1,200+ developers.',
  startDate: '2026-04-26',
  endDate: '2026-04-27',
  venue: 'Palais des Congrès',
  city: 'Paris, France',
  coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_15321ff4b-1773181437962.png",
  coverImageAlt: 'Large conference hall with stage lighting and audience at DevConf Paris 2026',
  sessions: SESSIONS,
  category: 'Technology',
  attendees: 1200,
  price: 'Free',
  tags: ['Web Dev', 'AI', 'Design']
},
{
  id: 'evt-002',
  title: 'AI Summit Berlin 2026',
  description: 'Europe\'s largest gathering of AI researchers, engineers, and product leaders. Three days of cutting-edge talks on LLMs, autonomous agents, and responsible AI.',
  startDate: '2026-05-14',
  endDate: '2026-05-16',
  venue: 'Berlin Congress Center',
  city: 'Berlin, Germany',
  coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1b29dccf5-1772593978671.png",
  coverImageAlt: 'Futuristic AI visualization with neural network patterns on dark background',
  sessions: [],
  category: 'AI & ML',
  attendees: 3500,
  price: '€299',
  tags: ['AI', 'LLMs', 'Research']
},
{
  id: 'evt-003',
  title: 'UX Design Week Amsterdam',
  description: 'A week-long celebration of design craft. Workshops, talks, and portfolio reviews from the world\'s top product designers and UX researchers.',
  startDate: '2026-05-20',
  endDate: '2026-05-24',
  venue: 'Westergasfabriek',
  city: 'Amsterdam, Netherlands',
  coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1e82939f4-1772501084703.png",
  coverImageAlt: 'Designer working on wireframes and prototypes at a modern design studio',
  sessions: [],
  category: 'Design',
  attendees: 800,
  price: '€149',
  tags: ['UX', 'Design Systems', 'Research']
},
{
  id: 'evt-004',
  title: 'CloudNative Con Europe 2026',
  description: 'The definitive conference for cloud-native technologies. Kubernetes, service mesh, observability, and platform engineering at enterprise scale.',
  startDate: '2026-06-03',
  endDate: '2026-06-05',
  venue: 'ExCeL London',
  city: 'London, UK',
  coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1cfdae944-1767030190306.png",
  coverImageAlt: 'Server infrastructure and cloud computing visualization with blue light trails',
  sessions: [],
  category: 'DevOps',
  attendees: 5000,
  price: '€399',
  tags: ['Kubernetes', 'Cloud', 'DevOps']
},
{
  id: 'evt-005',
  title: 'React Summit 2026',
  description: 'The world\'s biggest React conference. Two days of deep dives into React 19, Server Components, concurrent features, and the future of the React ecosystem.',
  startDate: '2026-06-12',
  endDate: '2026-06-13',
  venue: 'Beurs van Berlage',
  city: 'Amsterdam, Netherlands',
  coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1714b6415-1772925233552.png",
  coverImageAlt: 'React logo glowing on dark background with code snippets surrounding it',
  sessions: [],
  category: 'Technology',
  attendees: 2000,
  price: '€199',
  tags: ['React', 'JavaScript', 'Frontend']
},
{
  id: 'evt-006',
  title: 'Data Engineering Summit 2026',
  description: 'Where data engineers meet. Streaming pipelines, data mesh, lakehouse architectures, and the tools powering the modern data stack.',
  startDate: '2026-06-18',
  endDate: '2026-06-19',
  venue: 'Cité des Sciences',
  city: 'Paris, France',
  coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_19fe428b0-1766754349995.png",
  coverImageAlt: 'Data visualization dashboard with charts and graphs on dark screens',
  sessions: [],
  category: 'Data',
  attendees: 1500,
  price: '€249',
  tags: ['Data', 'Kafka', 'Analytics']
},
{
  id: 'evt-007',
  title: 'Security BSides Madrid 2026',
  description: 'Community-driven security conference. Red team vs blue team, CTF competitions, and talks on the latest vulnerabilities and defense strategies.',
  startDate: '2026-07-04',
  endDate: '2026-07-05',
  venue: 'Espacio Fundación Telefónica',
  city: 'Madrid, Spain',
  coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_120db5d9c-1777194016277.png",
  coverImageAlt: 'Cybersecurity concept with lock icon and digital code on dark background',
  sessions: [],
  category: 'Security',
  attendees: 600,
  price: 'Free',
  tags: ['Security', 'CTF', 'Hacking']
},
{
  id: 'evt-008',
  title: 'Product Hunt Global Meetup 2026',
  description: 'Makers, founders, and product enthusiasts come together to demo their latest creations, share learnings, and connect with the global maker community.',
  startDate: '2026-07-11',
  endDate: '2026-07-11',
  venue: 'Station F',
  city: 'Paris, France',
  coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1f4b8f386-1764788280256.png",
  coverImageAlt: 'Startup founders networking and presenting products at a modern co-working space',
  sessions: [],
  category: 'Startup',
  attendees: 400,
  price: 'Free',
  tags: ['Product', 'Startup', 'Networking']
},
{
  id: 'evt-009',
  title: 'Open Source Festival Lagos 2026',
  description: 'Africa\'s premier open-source conference celebrating contributors, maintainers, and the communities building the future of software together.',
  startDate: '2026-07-25',
  endDate: '2026-07-26',
  venue: 'Landmark Event Centre',
  city: 'Lagos, Nigeria',
  coverImage: "https://images.unsplash.com/photo-1671084891697-ecb5b630fced",
  coverImageAlt: 'Diverse group of developers collaborating at a tech conference in Africa',
  sessions: [],
  category: 'Open Source',
  attendees: 900,
  price: 'Free',
  tags: ['Open Source', 'Community', 'Africa']
},
{
  id: 'evt-010',
  title: 'WebAssembly Summit 2026',
  description: 'The only conference dedicated entirely to WebAssembly. WASI, component model, edge runtimes, and the polyglot future of the web platform.',
  startDate: '2026-08-08',
  endDate: '2026-08-09',
  venue: 'Computer History Museum',
  city: 'Mountain View, USA',
  coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_16582f06b-1772378101319.png",
  coverImageAlt: 'Circuit board close-up with glowing components representing WebAssembly technology',
  sessions: [],
  category: 'Technology',
  attendees: 700,
  price: '$149',
  tags: ['WASM', 'Edge', 'Performance']
},
{
  id: 'evt-011',
  title: 'GraphQL Conf 2026',
  description: 'The official GraphQL Foundation conference. Schema design, federation, subscriptions, and the next generation of API development.',
  startDate: '2026-08-20',
  endDate: '2026-08-21',
  venue: 'Moscone Center',
  city: 'San Francisco, USA',
  coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1f14a6ce2-1777194016135.png",
  coverImageAlt: 'API network diagram with connected nodes representing GraphQL federation architecture',
  sessions: [],
  category: 'Technology',
  attendees: 1100,
  price: '$199',
  tags: ['GraphQL', 'API', 'Backend']
},
{
  id: 'evt-012',
  title: 'Rust Nation UK 2026',
  description: 'The UK\'s dedicated Rust conference. Systems programming, embedded Rust, async runtimes, and the growing Rust ecosystem in production.',
  startDate: '2026-09-10',
  endDate: '2026-09-11',
  venue: 'The Brewery',
  city: 'London, UK',
  coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1b69c5d97-1772787501444.png",
  coverImageAlt: 'Code editor showing Rust programming language syntax with dark theme',
  sessions: [],
  category: 'Technology',
  attendees: 500,
  price: '£99',
  tags: ['Rust', 'Systems', 'Performance']
}];


export const NOTIFICATIONS: Notification[] = [
{
  id: 'notif-001',
  type: 'live',
  title: 'Session is now LIVE',
  message: '"Building Resilient Payment APIs at Scale" with Marcus Chen has just started in Room Alpha.',
  time: '2 min ago',
  read: false
},
{
  id: 'notif-002',
  type: 'live',
  title: 'Session is now LIVE',
  message: '"LLMs in Production" with Amara Diallo is live in Room Beta. Don\'t miss it!',
  time: '3 min ago',
  read: false
},
{
  id: 'notif-003',
  type: 'info',
  title: 'New question upvoted',
  message: 'Your question in "Design Systems at Scale" received 5 new upvotes.',
  time: '12 min ago',
  read: false
},
{
  id: 'notif-004',
  type: 'success',
  title: 'Session added to favorites',
  message: '"Monorepo Mastery: TurboRepo in 2026" has been saved to your schedule.',
  time: '25 min ago',
  read: true
},
{
  id: 'notif-005',
  type: 'warning',
  title: 'Session starting soon',
  message: '"Real-Time Analytics: From Kafka to Dashboard" starts in 45 minutes in Room Alpha.',
  time: '30 min ago',
  read: true
},
{
  id: 'notif-006',
  type: 'info',
  title: 'Schedule update',
  message: 'The "Closing Panel: Open Source Sustainability" has moved to Main Stage at 14:00.',
  time: '1 hour ago',
  read: true
},
{
  id: 'notif-007',
  type: 'success',
  title: 'Welcome to DevConf Paris 2026!',
  message: 'Your registration is confirmed. Check the planning grid for today\'s full schedule.',
  time: '2 hours ago',
  read: true
},
{
  id: 'notif-008',
  type: 'info',
  title: 'New speaker announced',
  message: 'Nadia Kowalski from Fastly joins the lineup for "WebAssembly at the Edge".',
  time: '1 day ago',
  read: true
}];


export function getSessionStatus(session: Session, now: Date = MOCK_NOW): SessionStatus {
  const start = new Date(session.startTime);
  const end = new Date(session.endTime);
  if (now >= start && now <= end) return 'live';
  if (now > end) return 'ended';
  return 'upcoming';
}

export function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
}

export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatShortDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}