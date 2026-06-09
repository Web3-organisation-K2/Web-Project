const I = ({ d, s = 16, ...p }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    {Array.isArray(d) ? d.map((dd, i) => <path key={i} d={dd} />) : <path d={d} />}
  </svg>
);
const UsersIcon = () => <I s={16} d={["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2","M23 21v-2a4 4 0 0 0-3-3.87","M16 3.13a4 4 0 0 1 0 7.75"]} />;
const ZapIcon = () => <I s={16} d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />;
const MsgIcon = () => <I s={16} d={["M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"]} />;
const StarIcon = () => <I s={16} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />;
const PlusIcon = () => <I s={15} d={["M12 5v14","M5 12h14"]} />;
const PencilIcon = () => <I s={14} d={["M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7","M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"]} />;
const TrashIcon = () => <I s={14} d={["M3 6h18","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"]} />;
const SearchIcon = () => <I s={15} d={["M11 17.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13z","M21 21l-4.35-4.35"]} />;
const XIcon = () => <I s={14} d={["M18 6 6 18","M6 6l12 12"]} />;
const SettingsIcon = () => <I s={14} d={["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z","M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"]} />;
const UpIcon = () => <I s={12} d={["M7 17l9.2-9.2","M17 17V7H7"]} />;
const DownIcon = () => <I s={12} d={["M17 7l-9.2 9.2","M7 7v10h10"]} />;
const MsgCircleIcon = () => <I s={14} d={["M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"]} />;
const HeartIcon = () => <I s={10} d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />;
const CalIcon = () => <I s={14} d={["M8 2v3","M16 2v3","M3 7h18","M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"]} />;

const ROOMS = [
  { id: "room-main", name: "Main Stage", color: "#A8FF3E" },
  { id: "room-alpha", name: "Room Alpha", color: "#FF6B2B" },
  { id: "room-beta", name: "Room Beta", color: "#A8FF3E" },
  { id: "room-gamma", name: "Room Gamma", color: "#FF6B2B" },
  { id: "room-workshop", name: "Workshop Hub", color: "#60A5FA" },
];

const SPEAKERS_DATA = [
  { id: "spk-001", name: "Léa Fontaine", photo: "https://i.pravatar.cc/150?img=47", title: "Engineering Director", company: "Vercel" },
  { id: "spk-002", name: "Marcus Chen", photo: "https://i.pravatar.cc/150?img=12", title: "Staff Engineer", company: "Stripe" },
  { id: "spk-003", name: "Amara Diallo", photo: "https://i.pravatar.cc/150?img=25", title: "Principal Architect", company: "Cloudflare" },
  { id: "spk-004", name: "Sofia Martinez", photo: "https://i.pravatar.cc/150?img=44", title: "AI Research Lead", company: "Hugging Face" },
  { id: "spk-005", name: "James Wright", photo: "https://i.pravatar.cc/150?img=8", title: "Security Engineer", company: "GitHub" },
];

const SESSIONS_DATA = [
  { id: "sess-001", title: "The Future of Edge Computing", description: "Exploring next-gen edge deployments.", startTime: "2026-04-26T09:00:00", endTime: "2026-04-26T09:50:00", room: ROOMS[0], track: "Engineering", capacity: 500, speakers: [SPEAKERS_DATA[0]], tags: ["edge", "cloud", "infra"] },
  { id: "sess-002", title: "LLMs in Production", description: "Scaling language models at production scale.", startTime: "2026-04-26T10:00:00", endTime: "2026-04-26T10:50:00", room: ROOMS[1], track: "AI & ML", capacity: 280, speakers: [SPEAKERS_DATA[3]], tags: ["llm", "ai", "ml"] },
  { id: "sess-003", title: "TypeScript 6 Deep Dive", description: "New features and migration paths.", startTime: "2026-04-26T10:30:00", endTime: "2026-04-26T11:15:00", room: ROOMS[2], track: "Engineering", capacity: 200, speakers: [SPEAKERS_DATA[1]], tags: ["typescript", "javascript", "web"] },
  { id: "sess-004", title: "Zero-Trust Security Patterns", description: "Modern approaches to network security.", startTime: "2026-04-26T11:00:00", endTime: "2026-04-26T11:45:00", room: ROOMS[3], track: "Security", capacity: 150, speakers: [SPEAKERS_DATA[4]], tags: ["security", "zero-trust", "networking"] },
  { id: "sess-005", title: "Design Systems at Scale", description: "Building component libraries that scale.", startTime: "2026-04-26T13:00:00", endTime: "2026-04-26T13:50:00", room: ROOMS[1], track: "Design", capacity: 200, speakers: [SPEAKERS_DATA[2]], tags: ["design", "components", "ux"] },
];

const QUESTIONS_DATA = [
  { id: "q1", sessionId: "sess-002", content: "How do you handle context window limitations in production LLMs?", author: "Pierre D.", upvotes: 14, createdAt: "2026-04-26T10:12:00" },
  { id: "q2", sessionId: "sess-002", content: "What's your approach to prompt injection attacks?", author: null, upvotes: 9, createdAt: "2026-04-26T10:18:00" },
  { id: "q3", sessionId: "sess-001", content: "How does edge computing affect GDPR compliance?", author: "Sophie T.", upvotes: 7, createdAt: "2026-04-26T09:22:00" },
  { id: "q4", sessionId: "sess-003", content: "Is TypeScript 6 backwards compatible with existing projects?", author: "Alex R.", upvotes: 12, createdAt: "2026-04-26T10:40:00" },
  { id: "q5", sessionId: "sess-004", content: "What are the performance implications of zero-trust architectures?", author: null, upvotes: 5, createdAt: "2026-04-26T11:10:00" },
  { id: "q6", sessionId: "sess-001", content: "What latency improvements can we expect at the edge vs traditional cloud?", author: "Martin F.", upvotes: 18, createdAt: "2026-04-26T09:35:00" },
];

const TRACK_DATA = [
  { track: "Engineering", sessions: 4, attendees: 820 },
  { track: "AI & ML", sessions: 2, attendees: 560 },
  { track: "Design", sessions: 2, attendees: 340 },
  { track: "Data", sessions: 2, attendees: 480 },
  { track: "Security", sessions: 1, attendees: 220 },
];

const ATTENDANCE_DATA = [
  { time: "09:00", attendees: 320 }, { time: "10:00", attendees: 780 },
  { time: "10:30", attendees: 1050 }, { time: "11:00", attendees: 1180 },
  { time: "11:30", attendees: 980 }, { time: "12:00", attendees: 620 },
  { time: "13:00", attendees: 890 }, { time: "14:00", attendees: 1100 },
  { time: "15:00", attendees: 760 }, { time: "16:00", attendees: 430 },
];

const ENGAGEMENT_DATA = [
  { name: "Questions", value: 47, color: "#A8FF3E" },
  { name: "Upvotes", value: 165, color: "#FF6B2B" },
  { name: "Favorites", value: 89, color: "#60A5FA" },
];

const RECENT_ACTIVITY = [
  { text: 'New question in "LLMs in Production"', time: "2m ago", type: "question" },
  { text: 'Session "TypeScript 6 Deep Dive" starts in 15min', time: "5m ago", type: "alert" },
  { text: "23 new attendees checked in", time: "12m ago", type: "checkin" },
  { text: "Speaker Amara Diallo confirmed attendance", time: "25m ago", type: "speaker" },
  { text: "Room Beta at 95% capacity", time: "31m ago", type: "warning" },
];