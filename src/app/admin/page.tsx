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

const card = {
  background: "#161616", border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
};
const inputCls = {
  width: "100%", boxSizing: "border-box",
  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 12, padding: "11px 16px", color: "#fff", fontSize: 13,
  outline: "none", fontFamily: "'DM Sans', sans-serif",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#1C1C1C", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "8px 12px", fontSize: 11 }}>
      <p style={{ color: "#888", marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || "#A8FF3E", fontWeight: 700 }}>{p.value} {p.name}</p>
      ))}
    </div>
  );
};

function StatusBadge({ status }) {
  if (status === "live") return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 999, fontSize: 10, fontWeight: 800, letterSpacing: "0.05em", background: "rgba(168,255,62,0.1)", color: "#A8FF3E", border: "1px solid rgba(168,255,62,0.25)" }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#A8FF3E", animation: "pulse 2s infinite" }} />
      LIVE
    </span>
  );
  if (status === "ended") return (
    <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 999, fontSize: 10, fontWeight: 800, letterSpacing: "0.05em", background: "rgba(255,255,255,0.04)", color: "#555", border: "1px solid rgba(255,255,255,0.06)" }}>
      ENDED
    </span>
  );
  return (
    <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 999, fontSize: 10, fontWeight: 800, letterSpacing: "0.05em", background: "rgba(255,107,43,0.1)", color: "#FF6B2B", border: "1px solid rgba(255,107,43,0.2)" }}>
      UPCOMING
    </span>
  );
}

function getStatus(session) {
  const now = new Date("2026-04-26T10:45:00");
  const start = new Date(session.startTime);
  const end = new Date(session.endTime);
  if (now >= start && now <= end) return "live";
  if (now > end) return "ended";
  return "upcoming";
}

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} />
      <div style={{ ...card, position: "relative", width: "100%", maxWidth: 520, maxHeight: "88vh", overflowY: "auto", zIndex: 1 }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <h3 style={{ margin: 0, color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{title}</h3>
          <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: "none", cursor: "pointer", color: "#666", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <XIcon />
          </button>
        </div>
        <div style={{ padding: 20 }}>{children}</div>
      </div>
    </div>
  );
}

function DeleteModal({ isOpen, onClose, onConfirm, itemName }) {
  if (!isOpen) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }} />
      <div style={{ ...card, position: "relative", width: "100%", maxWidth: 360, padding: 28, textAlign: "center", zIndex: 1 }} onClick={e => e.stopPropagation()}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,107,43,0.1)", border: "1px solid rgba(255,107,43,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
          <TrashIcon />
        </div>
        <h3 style={{ margin: "0 0 8px", color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 17 }}>Supprimer {itemName} ?</h3>
        <p style={{ color: "#666", fontSize: 13, margin: "0 0 20px" }}>Cette action est irréversible.</p>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "none", color: "#888", fontSize: 13, cursor: "pointer" }}>Annuler</button>
          <button onClick={() => { onConfirm(); onClose(); }} style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "none", background: "#FF6B2B", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Supprimer</button>
        </div>
      </div>
    </div>
  );
}

const NAV = [
  { label: "Overview", icon: "overview", view: "overview" },
  { label: "Sessions", icon: "sessions", view: "sessions" },
  { label: "Speakers", icon: "speakers", view: "speakers" },
  { label: "Questions", icon: "questions", view: "questions" },
];

function NavIcon({ type, active }) {
  const color = active ? "#0D0D0D" : "#555";
  if (type === "overview") return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
  if (type === "sessions") return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
  if (type === "speakers") return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
}

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState("overview");
  const [sessions, setSessions] = useState(SESSIONS_DATA);
  const [speakers, setSpeakers] = useState(SPEAKERS_DATA);
  const [allQuestions, setAllQuestions] = useState(QUESTIONS_DATA);
  const [questionSearch, setQuestionSearch] = useState("");
  const [sessionModalOpen, setSessionModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [sessionForm, setSessionForm] = useState({ title: "", description: "", track: "", capacity: 100, tags: "", startTime: "", endTime: "", roomId: "room-main" });
  const [deleteSessionConfirm, setDeleteSessionConfirm] = useState(null);
  const [speakerModalOpen, setSpeakerModalOpen] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState(null);
  const [speakerForm, setSpeakerForm] = useState({ name: "", photo: "", bio: "", title: "", company: "", twitter: "", linkedin: "" });
  const [deleteSpeakerConfirm, setDeleteSpeakerConfirm] = useState(null);
  const [deleteQuestionConfirm, setDeleteQuestionConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const questionsBySession = useMemo(() => {
    const map = new Map();
    allQuestions.forEach(q => map.set(q.sessionId, (map.get(q.sessionId) || 0) + 1));
    return map;
  }, [allQuestions]);

  const filteredQuestions = useMemo(() => {
    if (!questionSearch.trim()) return allQuestions;
    const s = questionSearch.toLowerCase();
    return allQuestions.filter(q => {
      const sess = sessions.find(ss => ss.id === q.sessionId);
      return (sess?.title || "").toLowerCase().includes(s) || q.content.toLowerCase().includes(s) || (q.author || "").toLowerCase().includes(s);
    });
  }, [allQuestions, questionSearch, sessions]);

  const sf = (k, v) => setSessionForm(f => ({ ...f, [k]: v }));
  const spf = (k, v) => setSpeakerForm(f => ({ ...f, [k]: v }));

  function openAddSession() {
    setEditingSession(null);
    setSessionForm({ title: "", description: "", track: "", capacity: 100, tags: "", startTime: "", endTime: "", roomId: "room-main" });
    setSessionModalOpen(true);
  }

  function openEditSession(s) {
    setEditingSession(s);
    setSessionForm({ title: s.title, description: s.description, track: s.track, capacity: s.capacity, tags: s.tags.join(", "), startTime: s.startTime.slice(0, 16), endTime: s.endTime.slice(0, 16), roomId: s.room.id });
    setSessionModalOpen(true);
  }

  function saveSession() {
    const room = ROOMS.find(r => r.id === sessionForm.roomId) || ROOMS[0];
    const tags = sessionForm.tags.split(",").map(t => t.trim()).filter(Boolean);
    if (editingSession) {
      setSessions(prev => prev.map(s => s.id === editingSession.id ? { ...s, ...sessionForm, room, tags, startTime: sessionForm.startTime + ":00", endTime: sessionForm.endTime + ":00" } : s));
      showToast("Session mise à jour ✓");
    } else {
      setSessions(prev => [...prev, { id: `sess-${Date.now()}`, eventId: "evt-001", speakers: [], questions: [], ...sessionForm, room, tags, startTime: sessionForm.startTime + ":00", endTime: sessionForm.endTime + ":00" }]);
      showToast("Session ajoutée ✓");
    }
    setSessionModalOpen(false);
  }

  function deleteSession(s) { setSessions(p => p.filter(x => x.id !== s.id)); setAllQuestions(p => p.filter(q => q.sessionId !== s.id)); showToast("Session supprimée"); }

  function openAddSpeaker() {
    setEditingSpeaker(null);
    setSpeakerForm({ name: "", photo: "", bio: "", title: "", company: "", twitter: "", linkedin: "" });
    setSpeakerModalOpen(true);
  }

  function openEditSpeaker(sp) {
    setEditingSpeaker(sp);
    setSpeakerForm({ name: sp.name, photo: sp.photo, bio: sp.bio, title: sp.title, company: sp.company, twitter: sp.twitter || "", linkedin: sp.linkedin || "" });
    setSpeakerModalOpen(true);
  }

  function saveSpeaker() {
    if (editingSpeaker) {
      setSpeakers(prev => prev.map(s => s.id === editingSpeaker.id ? { ...s, ...speakerForm } : s));
      showToast("Speaker mis à jour ✓");
    } else {
      setSpeakers(prev => [...prev, { id: `spk-${Date.now()}`, sessions: [], tags: [], ...speakerForm }]);
      showToast("Speaker ajouté ✓");
    }
    setSpeakerModalOpen(false);
  }

  function deleteSpeaker(sp) { setSpeakers(p => p.filter(x => x.id !== sp.id)); showToast("Speaker supprimé"); }
  function deleteQuestion(q) { setAllQuestions(p => p.filter(x => x.id !== q.id)); showToast("Question supprimée"); }

  const STAT_CARDS = [
    { label: "Total Attendees", value: "1,247", change: "+12%", up: true, Icon: UsersIcon, color: "#A8FF3E" },
    { label: "Sessions actives", value: sessions.filter(s => getStatus(s) === "live").length.toString(), change: "Live now", up: true, Icon: ZapIcon, color: "#FF6B2B" },
    { label: "Questions / Commentaires", value: allQuestions.length.toString(), change: "+8 today", up: true, Icon: MsgIcon, color: "#A8FF3E" },
    { label: "Satisfaction moy.", value: "4.8/5", change: "+0.3", up: true, Icon: StarIcon, color: "#FF6B2B" },
  ];

  const labelStyle = { display: "block", fontSize: 11, fontWeight: 600, color: "#666", marginBottom: 6 };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0D0D0D", fontFamily: "'DM Sans', sans-serif", color: "#e8e8e8" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.5} }
        ::-webkit-scrollbar{width:4px;height:4px} ::-webkit-scrollbar-track{background:#111} ::-webkit-scrollbar-thumb{background:#333;border-radius:2px}
        input,select,textarea{color:#fff !important}
        input[type=datetime-local]::-webkit-calendar-picker-indicator{filter:invert(1) opacity(0.5)}
      `}</style>

      <aside style={{ width: 220, minHeight: "100vh", background: "#111", borderRight: "1px solid rgba(255,255,255,0.06)", padding: "24px 12px", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 8px", marginBottom: 32 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#A8FF3E,#7ACC2A)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 16px rgba(168,255,62,0.3)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#0D0D0D"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 16, letterSpacing: "-0.3px" }}>
            <span style={{ color: "#A8FF3E" }}>Event</span><span style={{ color: "#fff" }}>Sync</span>
          </span>
        </div>

        <div style={{ fontSize: 10, fontWeight: 700, color: "#333", letterSpacing: "0.08em", padding: "0 8px", marginBottom: 8 }}>NAVIGATION</div>

        {NAV.map(n => {
          const active = activeView === n.view;
          return (
            <button key={n.view} onClick={() => setActiveView(n.view)} style={{
              display: "flex", alignItems: "center", gap: 10, width: "100%",
              padding: "10px 12px", borderRadius: 10, border: "none", marginBottom: 2,
              background: active ? "#A8FF3E" : "none", cursor: "pointer",
              color: active ? "#0D0D0D" : "#555",
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: active ? 700 : 500,
              transition: "all 0.15s",
            }}>
              <NavIcon type={n.icon} active={active} />
              {n.label}
            </button>
          );
        })}

        <div style={{ marginTop: "auto", padding: "16px 8px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(255,107,43,0.15)", border: "1px solid rgba(255,107,43,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6B2B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: "#FF6B2B" }}>Admin</p>
              <p style={{ margin: 0, fontSize: 10, color: "#444" }}>admin@eventsync.io</p>
            </div>
          </div>
        </div>
      </aside>

      <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px", maxWidth: "100%" }}>

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ padding: "3px 10px", borderRadius: 999, background: "rgba(255,107,43,0.12)", color: "#FF6B2B", fontSize: 10, fontWeight: 800, letterSpacing: "0.06em", border: "1px solid rgba(255,107,43,0.25)" }}>ADMIN</span>
              <span style={{ color: "#444", fontSize: 12 }}>Dashboard</span>
            </div>
            <h1 style={{ margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 26, color: "#fff", letterSpacing: "-0.5px" }}>
              {activeView === "overview" ? "Vue d'ensemble" : activeView === "sessions" ? "Gestion des Sessions" : activeView === "speakers" ? "Gestion des Speakers" : "Questions & Commentaires"}
            </h1>
            <p style={{ margin: "4px 0 0", color: "#555", fontSize: 13 }}>DevConf Paris 2026 — Live Overview</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "none", color: "#888", fontSize: 12, cursor: "pointer" }}>
              <SettingsIcon /> Paramètres
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 10, background: "rgba(168,255,62,0.08)", border: "1px solid rgba(168,255,62,0.2)" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#A8FF3E", animation: "pulse 2s infinite" }} />
              <span style={{ color: "#A8FF3E", fontSize: 11, fontWeight: 700 }}>Événement Live</span>
            </div>
          </div>
        </div>

        {activeView === "overview" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
              {STAT_CARDS.map(stat => (
                <div key={stat.label} style={{ ...card, padding: 20 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `${stat.color}15`, border: `1px solid ${stat.color}22` }}>
                      <span style={{ color: stat.color }}><stat.Icon /></span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color: stat.up ? "#A8FF3E" : "#FF6B2B" }}>
                      {stat.up ? <UpIcon /> : <DownIcon />}
                      {stat.change}
                    </div>
                  </div>
                  <p style={{ margin: "0 0 3px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 24, color: "#fff" }}>{stat.value}</p>
                  <p style={{ margin: 0, color: "#555", fontSize: 12 }}>{stat.label}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14, marginBottom: 14 }}>
              <div style={{ ...card, padding: 20 }}>
                <h3 style={{ margin: "0 0 4px", color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Fréquentation en temps réel</h3>
                <p style={{ margin: "0 0 16px", color: "#555", fontSize: 11 }}>Nombre de participants par heure</p>
                <ResponsiveContainer width="100%" height={170}>
                  <LineChart data={ATTENDANCE_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="time" tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="attendees" stroke="#A8FF3E" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: "#A8FF3E" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div style={{ ...card, padding: 20 }}>
                <h3 style={{ margin: "0 0 4px", color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Engagement</h3>
                <p style={{ margin: "0 0 10px", color: "#555", fontSize: 11 }}>Répartition des interactions</p>
                <ResponsiveContainer width="100%" height={120}>
                  <PieChart>
                    <Pie data={ENGAGEMENT_DATA} cx="50%" cy="50%" innerRadius={34} outerRadius={55} paddingAngle={3} dataKey="value">
                      {ENGAGEMENT_DATA.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 8 }}>
                  {ENGAGEMENT_DATA.map(item => (
                    <div key={item.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 11 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: item.color }} />
                        <span style={{ color: "#888" }}>{item.name}</span>
                      </div>
                      <span style={{ color: "#fff", fontWeight: 700 }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
              <div style={{ ...card, padding: 20 }}>
                <h3 style={{ margin: "0 0 16px", color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Sessions par Track</h3>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={TRACK_DATA} barSize={16}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="track" tick={{ fill: "#555", fontSize: 9 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="attendees" fill="#A8FF3E" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="sessions" fill="#FF6B2B" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ ...card, padding: 20 }}>
                <h3 style={{ margin: "0 0 14px", color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Activité récente</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {RECENT_ACTIVITY.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", marginTop: 5, flexShrink: 0, background: item.type === "warning" || item.type === "alert" ? "#FF6B2B" : "#A8FF3E" }} />
                      <div>
                        <p style={{ margin: 0, color: "#888", fontSize: 11, lineHeight: 1.5 }}>{item.text}</p>
                        <p style={{ margin: "2px 0 0", color: "#444", fontSize: 10 }}>{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeView === "sessions" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <p style={{ margin: 0, color: "#555", fontSize: 13 }}>{sessions.length} sessions au total</p>
              <button onClick={openAddSession} style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 10, border: "none", background: "#A8FF3E", color: "#0D0D0D", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                <PlusIcon /> Ajouter une session
              </button>
            </div>
            <div style={{ ...card, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    {["Titre", "Speaker(s)", "Salle", "Horaire", "Track", "Statut", ""].map(h => (
                      <th key={h} style={{ textAlign: h === "" ? "right" : "left", padding: "12px 18px", color: "#444", fontSize: 11, fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sessions.map(s => (
                    <tr key={s.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <td style={{ padding: "14px 18px" }}>
                        <p style={{ margin: 0, color: "#fff", fontWeight: 600, fontSize: 13 }}>{s.title}</p>
                        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                          {s.tags.slice(0, 3).map(t => <span key={t} style={{ padding: "1px 7px", borderRadius: 4, background: "rgba(255,255,255,0.04)", color: "#555", fontSize: 9, border: "1px solid rgba(255,255,255,0.06)" }}>{t}</span>)}
                        </div>
                      </td>
                      <td style={{ padding: "14px 18px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          {s.speakers.map(sp => <img key={sp.id} src={sp.photo} alt={sp.name} style={{ width: 26, height: 26, borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(255,255,255,0.1)" }} />)}
                          <span style={{ color: "#888", fontSize: 12 }}>{s.speakers.map(sp => sp.name).join(", ") || "—"}</span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 18px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ width: 7, height: 7, borderRadius: "50%", background: s.room.color }} />
                          <span style={{ color: "#888", fontSize: 12 }}>{s.room.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 18px", color: "#888", fontSize: 12, whiteSpace: "nowrap" }}>
                        {new Date(s.startTime).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })} – {new Date(s.endTime).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td style={{ padding: "14px 18px", color: "#888", fontSize: 12 }}>{s.track}</td>
                      <td style={{ padding: "14px 18px" }}><StatusBadge status={getStatus(s)} /></td>
                      <td style={{ padding: "14px 18px" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4 }}>
                          <button onClick={() => openEditSession(s)} style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: "none", cursor: "pointer", color: "#555", display: "flex", alignItems: "center", justifyContent: "center" }}><PencilIcon /></button>
                          <button onClick={() => setDeleteSessionConfirm(s)} style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: "none", cursor: "pointer", color: "#555", display: "flex", alignItems: "center", justifyContent: "center" }}><TrashIcon /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Modal isOpen={sessionModalOpen} onClose={() => setSessionModalOpen(false)} title={editingSession ? "Modifier la session" : "Ajouter une session"}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div><label style={labelStyle}>Titre</label><input style={inputCls} value={sessionForm.title} onChange={e => sf("title", e.target.value)} placeholder="Titre de la session" /></div>
                <div><label style={labelStyle}>Description</label><textarea style={{ ...inputCls, resize: "none" }} rows={2} value={sessionForm.description} onChange={e => sf("description", e.target.value)} placeholder="Description" /></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div><label style={labelStyle}>Début</label><input type="datetime-local" style={inputCls} value={sessionForm.startTime} onChange={e => sf("startTime", e.target.value)} /></div>
                  <div><label style={labelStyle}>Fin</label><input type="datetime-local" style={inputCls} value={sessionForm.endTime} onChange={e => sf("endTime", e.target.value)} /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div><label style={labelStyle}>Salle</label>
                    <select style={inputCls} value={sessionForm.roomId} onChange={e => sf("roomId", e.target.value)}>
                      {ROOMS.map(r => <option key={r.id} value={r.id} style={{ background: "#161616" }}>{r.name}</option>)}
                    </select>
                  </div>
                  <div><label style={labelStyle}>Track</label><input style={inputCls} value={sessionForm.track} onChange={e => sf("track", e.target.value)} placeholder="ex: Engineering" /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div><label style={labelStyle}>Capacité</label><input type="number" style={inputCls} value={sessionForm.capacity} onChange={e => sf("capacity", Number(e.target.value))} /></div>
                  <div><label style={labelStyle}>Tags (virgule)</label><input style={inputCls} value={sessionForm.tags} onChange={e => sf("tags", e.target.value)} placeholder="ex: ai, ml, web" /></div>
                </div>
                <div style={{ display: "flex", gap: 10, paddingTop: 4 }}>
                  <button onClick={() => setSessionModalOpen(false)} style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "none", color: "#888", fontSize: 13, cursor: "pointer" }}>Annuler</button>
                  <button onClick={saveSession} style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "none", background: "#A8FF3E", color: "#0D0D0D", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{editingSession ? "Mettre à jour" : "Ajouter"}</button>
                </div>
              </div>
            </Modal>

            <DeleteModal isOpen={!!deleteSessionConfirm} onClose={() => setDeleteSessionConfirm(null)} onConfirm={() => deleteSession(deleteSessionConfirm)} itemName="la session" />
          </div>
        )}

        {activeView === "speakers" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <p style={{ margin: 0, color: "#555", fontSize: 13 }}>{speakers.length} speakers au total</p>
              <button onClick={openAddSpeaker} style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 10, border: "none", background: "#A8FF3E", color: "#0D0D0D", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                <PlusIcon /> Ajouter un speaker
              </button>
            </div>
            <div style={{ ...card, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    {["Photo", "Nom", "Titre", "Entreprise", "Sessions", ""].map(h => (
                      <th key={h} style={{ textAlign: h === "" ? "right" : "left", padding: "12px 18px", color: "#444", fontSize: 11, fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {speakers.map(sp => {
                    const count = sessions.filter(s => s.speakers.some(x => x.id === sp.id)).length;
                    return (
                      <tr key={sp.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <td style={{ padding: "14px 18px" }}>
                          <img src={sp.photo} alt={sp.name} style={{ width: 38, height: 38, borderRadius: 10, objectFit: "cover" }} />
                        </td>
                        <td style={{ padding: "14px 18px", color: "#fff", fontWeight: 600 }}>{sp.name}</td>
                        <td style={{ padding: "14px 18px", color: "#888", fontSize: 12 }}>{sp.title}</td>
                        <td style={{ padding: "14px 18px" }}>
                          <span style={{ color: "#A8FF3E", fontSize: 12, fontWeight: 600 }}>{sp.company}</span>
                        </td>
                        <td style={{ padding: "14px 18px", color: "#888", fontSize: 12 }}>{count}</td>
                        <td style={{ padding: "14px 18px" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4 }}>
                            <button onClick={() => openEditSpeaker(sp)} style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: "none", cursor: "pointer", color: "#555", display: "flex", alignItems: "center", justifyContent: "center" }}><PencilIcon /></button>
                            <button onClick={() => setDeleteSpeakerConfirm(sp)} style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: "none", cursor: "pointer", color: "#555", display: "flex", alignItems: "center", justifyContent: "center" }}><TrashIcon /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <Modal isOpen={speakerModalOpen} onClose={() => setSpeakerModalOpen(false)} title={editingSpeaker ? "Modifier le speaker" : "Ajouter un speaker"}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div><label style={labelStyle}>Nom</label><input style={inputCls} value={speakerForm.name} onChange={e => spf("name", e.target.value)} placeholder="Nom complet" /></div>
                  <div><label style={labelStyle}>Photo URL</label><input style={inputCls} value={speakerForm.photo} onChange={e => spf("photo", e.target.value)} placeholder="https://..." /></div>
                </div>
                <div><label style={labelStyle}>Bio</label><textarea style={{ ...inputCls, resize: "none" }} rows={2} value={speakerForm.bio} onChange={e => spf("bio", e.target.value)} placeholder="Biographie" /></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div><label style={labelStyle}>Titre</label><input style={inputCls} value={speakerForm.title} onChange={e => spf("title", e.target.value)} placeholder="ex: Staff Engineer" /></div>
                  <div><label style={labelStyle}>Entreprise</label><input style={inputCls} value={speakerForm.company} onChange={e => spf("company", e.target.value)} placeholder="ex: Vercel" /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div><label style={labelStyle}>Twitter</label><input style={inputCls} value={speakerForm.twitter} onChange={e => spf("twitter", e.target.value)} placeholder="@handle" /></div>
                  <div><label style={labelStyle}>LinkedIn</label><input style={inputCls} value={speakerForm.linkedin} onChange={e => spf("linkedin", e.target.value)} placeholder="username" /></div>
                </div>
                <div style={{ display: "flex", gap: 10, paddingTop: 4 }}>
                  <button onClick={() => setSpeakerModalOpen(false)} style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "none", color: "#888", fontSize: 13, cursor: "pointer" }}>Annuler</button>
                  <button onClick={saveSpeaker} style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "none", background: "#A8FF3E", color: "#0D0D0D", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{editingSpeaker ? "Mettre à jour" : "Ajouter"}</button>
                </div>
              </div>
            </Modal>

            <DeleteModal isOpen={!!deleteSpeakerConfirm} onClose={() => setDeleteSpeakerConfirm(null)} onConfirm={() => deleteSpeaker(deleteSpeakerConfirm)} itemName="le speaker" />
          </div>
        )}
        {activeView === "questions" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, gap: 16 }}>
              <p style={{ margin: 0, color: "#555", fontSize: 13 }}>{allQuestions.length} questions · {questionsBySession.size} sessions</p>
              <div style={{ position: "relative", width: 300 }}>
                <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#444" }}><SearchIcon /></div>
                <input style={{ ...inputCls, paddingLeft: 36, paddingRight: questionSearch ? 36 : 16 }} value={questionSearch} onChange={e => setQuestionSearch(e.target.value)} placeholder="Rechercher par session, question, auteur..." />
                {questionSearch && (
                  <button onClick={() => setQuestionSearch("")} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", border: "none", background: "none", cursor: "pointer", color: "#555" }}><XIcon /></button>
                )}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 20 }}>
              {sessions.filter(s => questionsBySession.has(s.id)).map(s => (
                <div key={s.id} style={{ ...card, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#A8FF3E" }}><MsgCircleIcon /></span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, color: "#fff", fontSize: 11, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.title}</p>
                    <p style={{ margin: "2px 0 0", color: "#444", fontSize: 10 }}>{questionsBySession.get(s.id)} question(s)</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ ...card, overflow: "hidden" }}>
              {filteredQuestions.length === 0 ? (
                <div style={{ padding: 48, textAlign: "center", color: "#444" }}>
                  <p style={{ fontSize: 14 }}>Aucune question trouvée</p>
                </div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                      {["Session", "Question", "Auteur", "Upvotes", "Date", ""].map(h => (
                        <th key={h} style={{ textAlign: h === "" ? "right" : "left", padding: "12px 18px", color: "#444", fontSize: 11, fontWeight: 600 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQuestions.map(q => {
                      const sess = sessions.find(s => s.id === q.sessionId);
                      return (
                        <tr key={q.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                          <td style={{ padding: "14px 18px" }}>
                            <p style={{ margin: 0, color: "#fff", fontSize: 12, fontWeight: 600, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sess?.title || "Unknown"}</p>
                          </td>
                          <td style={{ padding: "14px 18px", maxWidth: 280 }}>
                            <p style={{ margin: 0, color: "#888", fontSize: 12, lineHeight: 1.5, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{q.content}</p>
                          </td>
                          <td style={{ padding: "14px 18px", color: q.author ? "#888" : "#444", fontSize: 12, fontStyle: q.author ? "normal" : "italic" }}>{q.author || "Anonyme"}</td>
                          <td style={{ padding: "14px 18px" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", minWidth: 30, padding: "3px 10px", borderRadius: 999, background: "rgba(168,255,62,0.1)", color: "#A8FF3E", fontSize: 11, fontWeight: 800 }}>{q.upvotes}</span>
                          </td>
                          <td style={{ padding: "14px 18px", color: "#555", fontSize: 11, whiteSpace: "nowrap" }}>
                            {new Date(q.createdAt).toLocaleString("fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                          </td>
                          <td style={{ padding: "14px 18px" }}>
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                              <button onClick={() => setDeleteQuestionConfirm(q)} style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: "none", cursor: "pointer", color: "#555", display: "flex", alignItems: "center", justifyContent: "center" }}><TrashIcon /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            <DeleteModal isOpen={!!deleteQuestionConfirm} onClose={() => setDeleteQuestionConfirm(null)} onConfirm={() => deleteQuestion(deleteQuestionConfirm)} itemName="la question" />
          </div>
        )}
      </main>

      {toast && (
        <div style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 100,
          background: "#1C1C1C", border: "1px solid rgba(168,255,62,0.3)", borderRadius: 12,
          padding: "12px 18px", color: "#A8FF3E", fontSize: 13, fontWeight: 600,
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(168,255,62,0.1)",
          display: "flex", alignItems: "center", gap: 8,
          animation: "fadeIn 0.2s ease"
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A8FF3E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>
          {toast}
        </div>
      )}

      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}
