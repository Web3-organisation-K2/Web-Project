import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, CartesianGrid
} from "recharts";

const C = {
  green: "#A8FF3E",
  orange: "#FF6B2B",
  bg0: "#0D0D0D",
  bg1: "#121212",
  bg2: "#161616",
  bg3: "#1C1C1C",
  border: "rgba(255,255,255,0.07)",
  text1: "#FFFFFF",
  text2: "#888888",
  text3: "#555555",
  text4: "#444444",
};

const ROOMS = [
  { id: "room-alpha", name: "Alpha", color: "#A8FF3E" },
  { id: "room-beta",  name: "Beta",  color: "#FF6B2B" },
  { id: "room-gamma", name: "Gamma", color: "#60A5FA" },
];

const SPEAKERS_DATA = [
  { id: "spk-1", name: "Amara Diallo",    photo: "https://i.pravatar.cc/80?img=47", title: "Staff Engineer",  company: "Vercel",    bio: "Expert en edge computing et Next.js.", twitter: "@amara_d", linkedin: "amara-diallo" },
  { id: "spk-2", name: "Lucas Petit",     photo: "https://i.pravatar.cc/80?img=12", title: "AI Researcher",   company: "Mistral AI", bio: "Chercheur spécialisé en LLMs open source.", twitter: "@lucas_p", linkedin: "lucas-petit" },
  { id: "spk-3", name: "Sofia Martinez",  photo: "https://i.pravatar.cc/80?img=32", title: "Security Lead",   company: "Cloudflare", bio: "Experte en sécurité web et zero-trust.", twitter: "@sofia_m", linkedin: "sofia-martinez" },
  { id: "spk-4", name: "James Chen",      photo: "https://i.pravatar.cc/80?img=53", title: "Platform Eng",    company: "Datadog",    bio: "Observabilité et performance à grande échelle.", twitter: "@james_c", linkedin: "james-chen" },
];

const SESSIONS_DATA = [
  { id: "sess-1", eventId: "evt-001", title: "LLMs in Production",           description: "Déploiement de modèles de langage en production.", startTime: "2026-04-26T10:00:00", endTime: "2026-04-26T11:00:00", room: ROOMS[0], track: "AI & ML",     capacity: 200, speakers: [SPEAKERS_DATA[1]], questions: [{id:"q1", content:"Comment gérer la latence ?", author:"Alice", upvotes:12, sessionId:"sess-1"},{id:"q2", content:"Quelle infra recommandez-vous ?", author:"Bob", upvotes:8, sessionId:"sess-1"}], tags: ["ai","llm","production"] },
  { id: "sess-2", eventId: "evt-001", title: "TypeScript 6 Deep Dive",       description: "Nouvelles fonctionnalités de TypeScript 6.", startTime: "2026-04-26T11:15:00", endTime: "2026-04-26T12:15:00", room: ROOMS[1], track: "Engineering", capacity: 150, speakers: [SPEAKERS_DATA[0]], questions: [{id:"q3", content:"Quand sort la version stable ?", author:"Carol", upvotes:20, sessionId:"sess-2"}], tags: ["typescript","javascript","web"] },
  { id: "sess-3", eventId: "evt-001", title: "Zero Trust Architecture",      description: "Sécurité périmétrique pour les équipes modernes.", startTime: "2026-04-26T14:00:00", endTime: "2026-04-26T15:00:00", room: ROOMS[2], track: "Security",   capacity: 100, speakers: [SPEAKERS_DATA[2]], questions: [], tags: ["security","networking","cloud"] },
  { id: "sess-4", eventId: "evt-001", title: "Observability at Scale",       description: "Métriques, logs et traces distribués.", startTime: "2026-04-26T09:30:00", endTime: "2026-04-26T10:30:00", room: ROOMS[0], track: "Platform",   capacity: 180, speakers: [SPEAKERS_DATA[3]], questions: [{id:"q4", content:"Quelle diff avec Prometheus ?", author:"Dave", upvotes:5, sessionId:"sess-4"}], tags: ["observability","devops","platform"] },
];

const TRACK_DATA = [
  { track: "Engineering", sessions: 4, attendees: 820 },
  { track: "AI & ML",     sessions: 2, attendees: 560 },
  { track: "Design",      sessions: 2, attendees: 340 },
  { track: "Data",        sessions: 2, attendees: 480 },
  { track: "Security",    sessions: 1, attendees: 220 },
  { track: "Platform",    sessions: 1, attendees: 310 },
];

const ATTENDANCE_DATA = [
  { time: "09:00", attendees: 320 }, { time: "10:00", attendees: 780 },
  { time: "10:30", attendees: 1050 },{ time: "11:00", attendees: 1180 },
  { time: "11:30", attendees: 980 }, { time: "12:00", attendees: 620 },
  { time: "13:00", attendees: 890 }, { time: "14:00", attendees: 1100 },
  { time: "15:00", attendees: 760 }, { time: "16:00", attendees: 430 },
];

const ENGAGEMENT_DATA = [
  { name: "Questions", value: 47,  color: C.green },
  { name: "Upvotes",   value: 165, color: C.orange },
  { name: "Favoris",   value: 89,  color: "#60A5FA" },
];

const STAT_CARDS = [
  { label: "Total Participants", value: "1 247", change: "+12%",    up: true,  icon: "👥", color: C.green },
  { label: "Sessions actives",   value: "4",     change: "Live now",up: true,  icon: "⚡", color: C.orange },
  { label: "Questions / Chats",  value: "15",    change: "+8 auj.", up: true,  icon: "💬", color: C.green },
  { label: "Satisfaction moy.",  value: "4.8/5", change: "+0.3",    up: true,  icon: "⭐", color: C.orange },
];

const RECENT_ACTIVITY = [
  { text: "Nouvelle question dans \"LLMs in Production\"",     time: "il y a 2m",  type: "question" },
  { text: "\"TypeScript 6 Deep Dive\" commence dans 15 min",  time: "il y a 5m",  type: "alert" },
  { text: "23 nouveaux participants enregistrés",              time: "il y a 12m", type: "checkin" },
  { text: "Amara Diallo a confirmé sa présence",               time: "il y a 25m", type: "speaker" },
  { text: "Salle Beta à 95% de capacité",                      time: "il y a 31m", type: "warning" },
];

const s = {
  glassCard: {
    background: C.bg2,
    border: `1px solid ${C.border}`,
    borderRadius: 16,
  },
  input: {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 12,
    padding: "10px 14px",
    fontSize: 13,
    color: "#fff",
    outline: "none",
    boxSizing: "border-box",
  },
  label: { display: "block", fontSize: 11, fontWeight: 500, color: C.text2, marginBottom: 6 },
  btnPrimary: {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "10px 18px", borderRadius: 12,
    background: C.green, color: C.bg0, border: "none",
    fontSize: 13, fontWeight: 700, cursor: "pointer",
  },
  btnGhost: {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "8px 14px", borderRadius: 10,
    background: "transparent", color: C.text2,
    border: "1px solid rgba(255,255,255,0.1)",
    fontSize: 12, cursor: "pointer",
  },
  btnDanger: {
    flex: 1, padding: "10px 16px", borderRadius: 12,
    background: C.orange, color: "#fff", border: "none",
    fontSize: 13, fontWeight: 700, cursor: "pointer",
  },
  btnCancel: {
    flex: 1, padding: "10px 16px", borderRadius: 12,
    background: "transparent", color: C.text2,
    border: "1px solid rgba(255,255,255,0.1)",
    fontSize: 13, cursor: "pointer",
  },
};

function useToast() {
  const [toasts, setToasts] = useState([]);
  const show = (msg) => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3000);
  };
  return { toasts, show };
}

function ToastContainer({ toasts }) {
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 999, display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none" }}>
      {toasts.map(t => (
        <div key={t.id} style={{ background: C.green, color: C.bg0, padding: "10px 16px", borderRadius: 12, fontSize: 13, fontWeight: 600, boxShadow: "0 4px 20px rgba(168,255,62,0.25)" }}>
          ✓ {t.msg}
        </div>
      ))}
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: C.bg3, border: `1px solid rgba(255,255,255,0.1)`, borderRadius: 10, padding: "8px 12px", fontSize: 12 }}>
      <p style={{ color: C.text2, marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || C.green, fontWeight: 600, margin: 0 }}>
          {p.value} {p.name}
        </p>
      ))}
    </div>
  );
}

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} />
      <div style={{ position: "relative", width: "100%", maxWidth: 520, maxHeight: "85vh", overflowY: "auto", ...s.glassCard }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", borderBottom: `1px solid ${C.border}` }}>
          <h3 style={{ margin: 0, color: "#fff", fontSize: 16, fontWeight: 700 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.text2, cursor: "pointer", fontSize: 20, lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: 20 }}>{children}</div>
      </div>
    </div>
  );
}

function DeleteModal({ isOpen, onClose, onConfirm, itemName }) {
  if (!isOpen) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} />
      <div style={{ position: "relative", width: "100%", maxWidth: 360, ...s.glassCard, padding: 24, textAlign: "center" }} onClick={e => e.stopPropagation()}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,107,43,0.1)", border: `1px solid rgba(255,107,43,0.2)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 22 }}>🗑</div>
        <h3 style={{ color: "#fff", margin: "0 0 8px", fontSize: 16 }}>Supprimer {itemName} ?</h3>
        <p style={{ color: C.text2, fontSize: 13, margin: "0 0 24px" }}>Cette action est irréversible.</p>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={onClose} style={s.btnCancel}>Annuler</button>
          <button onClick={() => { onConfirm(); onClose(); }} style={s.btnDanger}>Supprimer</button>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = {
    live:     { bg: "rgba(168,255,62,0.1)",  border: "rgba(168,255,62,0.2)",  color: C.green,  label: "● Live" },
    ended:    { bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.06)", color: C.text3, label: "Terminée" },
    upcoming: { bg: "rgba(255,107,43,0.1)",  border: "rgba(255,107,43,0.2)",  color: C.orange, label: "À venir" },
  }[status] || {};
  return (
    <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 999, fontSize: 10, fontWeight: 700, background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color, textTransform: "uppercase", letterSpacing: "0.05em" }}>
      {cfg.label}
    </span>
  );
}

function getStatus(session) {
  const now = new Date("2026-04-26T10:45:00");
  const start = new Date(session.startTime);
  const end   = new Date(session.endTime);
  if (now >= start && now <= end) return "live";
  if (now > end) return "ended";
  return "upcoming";
}

function Field({ label, children }) {
  return <div style={{ marginBottom: 14 }}><label style={s.label}>{label}</label>{children}</div>;
}

export default function AdminDashboard() {
  const { toasts, show: toast } = useToast();
  const [activeView, setActiveView] = useState("overview");

  const [sessions, setSessions] = useState(SESSIONS_DATA);
  const [sessionModal, setSessionModal] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [sessionForm, setSessionForm] = useState({ title: "", description: "", startTime: "", endTime: "", roomId: ROOMS[0].id, track: "", capacity: 100, tags: "" });
  const [deleteSession, setDeleteSession] = useState(null);

  const [speakers, setSpeakers] = useState(SPEAKERS_DATA);
  const [speakerModal, setSpeakerModal] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState(null);
  const [speakerForm, setSpeakerForm] = useState({ name: "", photo: "", bio: "", title: "", company: "", twitter: "", linkedin: "" });
  const [deleteSpeaker, setDeleteSpeaker] = useState(null);

  const [allQuestions, setAllQuestions] = useState(() =>
    SESSIONS_DATA.flatMap(s => s.questions.map(q => ({ ...q, sessionId: s.id })))
  );
  const [qSearch, setQSearch] = useState("");
  const [deleteQuestion, setDeleteQuestion] = useState(null);

  const filteredQuestions = useMemo(() => {
    if (!qSearch.trim()) return allQuestions;
    const q = qSearch.toLowerCase();
    return allQuestions.filter(item => {
      const sess = sessions.find(s => s.id === item.sessionId);
      return (sess?.title || "").toLowerCase().includes(q) ||
             item.content.toLowerCase().includes(q) ||
             (item.author || "").toLowerCase().includes(q);
    });
  }, [allQuestions, qSearch, sessions]);

  function openAddSession() {
    setEditingSession(null);
    setSessionForm({ title: "", description: "", startTime: "", endTime: "", roomId: ROOMS[0].id, track: "", capacity: 100, tags: "" });
    setSessionModal(true);
  }
  function openEditSession(sess) {
    setEditingSession(sess);
    setSessionForm({ title: sess.title, description: sess.description, startTime: sess.startTime.slice(0,16), endTime: sess.endTime.slice(0,16), roomId: sess.room.id, track: sess.track, capacity: sess.capacity, tags: sess.tags.join(", ") });
    setSessionModal(true);
  }
  function saveSession() {
    const room = ROOMS.find(r => r.id === sessionForm.roomId) || ROOMS[0];
    const tags = sessionForm.tags.split(",").map(t => t.trim()).filter(Boolean);
    if (editingSession) {
      setSessions(p => p.map(s => s.id === editingSession.id ? { ...s, ...sessionForm, room, tags, startTime: sessionForm.startTime+":00", endTime: sessionForm.endTime+":00" } : s));
      toast("Session mise à jour");
    } else {
      setSessions(p => [...p, { id: `sess-${Date.now()}`, eventId:"evt-001", ...sessionForm, room, tags, speakers:[], questions:[], startTime: sessionForm.startTime+":00", endTime: sessionForm.endTime+":00" }]);
      toast("Session ajoutée");
    }
    setSessionModal(false);
  }
  function confirmDeleteSession(sess) {
    setSessions(p => p.filter(s => s.id !== sess.id));
    setAllQuestions(p => p.filter(q => q.sessionId !== sess.id));
    toast("Session supprimée");
  }

  function openAddSpeaker() {
    setEditingSpeaker(null);
    setSpeakerForm({ name:"",photo:"",bio:"",title:"",company:"",twitter:"",linkedin:"" });
    setSpeakerModal(true);
  }
  function openEditSpeaker(spk) {
    setEditingSpeaker(spk);
    setSpeakerForm({ name:spk.name, photo:spk.photo, bio:spk.bio, title:spk.title, company:spk.company, twitter:spk.twitter||"", linkedin:spk.linkedin||"" });
    setSpeakerModal(true);
  }
  function saveSpeaker() {
    if (editingSpeaker) {
      setSpeakers(p => p.map(s => s.id === editingSpeaker.id ? { ...s, ...speakerForm } : s));
      toast("Intervenant mis à jour");
    } else {
      setSpeakers(p => [...p, { id:`spk-${Date.now()}`, ...speakerForm, sessions:[], tags:[] }]);
      toast("Intervenant ajouté");
    }
    setSpeakerModal(false);
  }
  function confirmDeleteSpeaker(spk) {
    setSpeakers(p => p.filter(s => s.id !== spk.id));
    toast("Intervenant supprimé");
  }

  function confirmDeleteQuestion(q) {
    setAllQuestions(p => p.filter(item => item.id !== q.id));
    toast("Question supprimée");
  }

  const TABS = ["overview", "sessions", "speakers", "questions"];

  return (
    <div style={{ minHeight: "100vh", background: C.bg0, color: "#fff", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <ToastContainer toasts={toasts} />

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: C.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚡</div>
            <span style={{ fontWeight: 800, fontSize: 18 }}><span style={{ color: C.green }}>Event</span>Sync</span>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            <span style={{ padding: "3px 10px", borderRadius: 999, background: "rgba(255,107,43,0.15)", border: "1px solid rgba(255,107,43,0.25)", color: C.orange, fontSize: 11, fontWeight: 700 }}>ADMIN</span>
            <span style={{ color: C.text3, fontSize: 12, alignSelf: "center" }}>Dashboard</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 10, background: "rgba(168,255,62,0.08)", border: "1px solid rgba(168,255,62,0.15)" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, animation: "pulse 2s infinite" }} />
            <span style={{ color: C.green, fontSize: 12, fontWeight: 600 }}>Événement en direct</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "32px 32px 64px" }}>
        {/* Titre */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>Admin Dashboard</h1>
          <p style={{ margin: "4px 0 0", color: C.text3, fontSize: 14 }}>DevConf Paris 2026 — Vue en direct</p>
        </div>

        {/* Onglets */}
        <div style={{ display: "flex", gap: 4, padding: 4, borderRadius: 14, background: C.bg2, border: `1px solid ${C.border}`, width: "fit-content", marginBottom: 32, overflowX: "auto" }}>
          {TABS.map(v => (
            <button key={v} onClick={() => setActiveView(v)}
              style={{ padding: "8px 18px", borderRadius: 10, border: "none", fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap",
                background: activeView === v ? C.green : "transparent",
                color: activeView === v ? C.bg0 : C.text3,
              }}>
              {v === "questions" ? "💬 Questions / Chats" : v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeView === "overview" && (
          <div>
            {/* Stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
              {STAT_CARDS.map(stat => (
                <div key={stat.label} style={{ ...s.glassCard, padding: 20 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, background: `${stat.color}15`, border: `1px solid ${stat.color}25` }}>
                      {stat.icon}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: stat.up ? C.green : C.orange }}>
                      {stat.up ? "↑" : "↓"} {stat.change}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#fff" }}>{stat.value}</p>
                  <p style={{ margin: "2px 0 0", fontSize: 12, color: C.text3 }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 16 }}>
              <div style={{ ...s.glassCard, padding: 20 }}>
                <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: 14 }}>Présence en temps réel</p>
                <p style={{ margin: "0 0 20px", color: C.text3, fontSize: 12 }}>Participants par heure</p>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={ATTENDANCE_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="time" tick={{ fill: C.text3, fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: C.text3, fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="attendees" stroke={C.green} strokeWidth={2} dot={false} activeDot={{ r:4, fill:C.green }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div style={{ ...s.glassCard, padding: 20 }}>
                <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: 14 }}>Engagement</p>
                <p style={{ margin: "0 0 16px", color: C.text3, fontSize: 12 }}>Interactions par type</p>
                <ResponsiveContainer width="100%" height={140}>
                  <PieChart>
                    <Pie data={ENGAGEMENT_DATA} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                      {ENGAGEMENT_DATA.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                  {ENGAGEMENT_DATA.map(item => (
                    <div key={item.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color }} />
                        <span style={{ color: C.text2 }}>{item.name}</span>
                      </div>
                      <span style={{ fontWeight: 600 }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
              <div style={{ ...s.glassCard, padding: 20 }}>
                <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: 14 }}>Sessions par thématique</p>
                <p style={{ margin: "0 0 20px", color: C.text3, fontSize: 12 }}>Participants par track</p>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={TRACK_DATA} barSize={18}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="track" tick={{ fill: C.text3, fontSize: 9 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: C.text3, fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="attendees" fill={C.green}  radius={[4,4,0,0]} />
                    <Bar dataKey="sessions"  fill={C.orange} radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div style={{ ...s.glassCard, padding: 20 }}>
                <p style={{ margin: "0 0 20px", fontWeight: 600, fontSize: 14 }}>Activité récente</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {RECENT_ACTIVITY.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", marginTop: 5, flexShrink: 0, background: item.type === "warning" || item.type === "alert" ? C.orange : C.green }} />
                      <div>
                        <p style={{ margin: 0, color: C.text2, fontSize: 12, lineHeight: 1.5 }}>{item.text}</p>
                        <p style={{ margin: "2px 0 0", color: C.text4, fontSize: 10 }}>{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SESSIONS */}
        {activeView === "sessions" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Gestion des sessions</h2>
                <p style={{ margin: "2px 0 0", color: C.text3, fontSize: 13 }}>{sessions.length} sessions au total</p>
              </div>
              <button style={s.btnPrimary} onClick={openAddSession}>+ Ajouter session</button>
            </div>

            <div style={{ ...s.glassCard, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    {["Titre","Intervenants","Salle","Horaire","Track","Statut","Actions"].map(h => (
                      <th key={h} style={{ textAlign: h==="Actions"?"right":"left", padding:"10px 16px", color:C.text3, fontSize:11, fontWeight:500 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sessions.map(sess => (
                    <tr key={sess.id} style={{ borderBottom: `1px solid rgba(255,255,255,0.03)` }}>
                      <td style={{ padding: "12px 16px" }}>
                        <p style={{ margin: 0, fontWeight: 500, color: "#fff", maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sess.title}</p>
                        <div style={{ display: "flex", gap: 4, marginTop: 4, flexWrap: "wrap" }}>
                          {sess.tags.slice(0,3).map(tag => <span key={tag} style={{ padding: "1px 6px", borderRadius: 4, fontSize: 10, background: "rgba(255,255,255,0.05)", color: C.text3, border: "1px solid rgba(255,255,255,0.07)" }}>{tag}</span>)}
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          {sess.speakers.map(sp => <img key={sp.id} src={sp.photo} alt={sp.name} style={{ width: 24, height: 24, borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(255,255,255,0.1)" }} />)}
                          <span style={{ color: C.text2, fontSize: 12 }}>{sess.speakers.map(s=>s.name).join(", ") || "—"}</span>
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ width: 8, height: 8, borderRadius: "50%", background: sess.room.color }} />
                          <span style={{ color: C.text2, fontSize: 12 }}>{sess.room.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px", color: C.text2, fontSize: 12, whiteSpace: "nowrap" }}>
                        {new Date(sess.startTime).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})}
                        {" – "}
                        {new Date(sess.endTime).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})}
                      </td>
                      <td style={{ padding: "12px 16px", color: C.text2, fontSize: 12 }}>{sess.track}</td>
                      <td style={{ padding: "12px 16px" }}><StatusBadge status={getStatus(sess)} /></td>
                      <td style={{ padding: "12px 16px", textAlign: "right" }}>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: 4 }}>
                          <button onClick={() => openEditSession(sess)} style={{ width: 32, height: 32, borderRadius: 8, border: "none", background: "transparent", color: C.text3, cursor: "pointer", fontSize: 16 }} title="Modifier">✏️</button>
                          <button onClick={() => setDeleteSession(sess)} style={{ width: 32, height: 32, borderRadius: 8, border: "none", background: "transparent", color: C.text3, cursor: "pointer", fontSize: 16 }} title="Supprimer">🗑</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Modal isOpen={sessionModal} onClose={() => setSessionModal(false)} title={editingSession ? "Modifier la session" : "Ajouter une session"}>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Field label="Titre"><input style={s.input} value={sessionForm.title} onChange={e=>setSessionForm(f=>({...f,title:e.target.value}))} placeholder="Titre de la session" /></Field>
                <Field label="Description"><textarea style={{...s.input,resize:"none"}} rows={3} value={sessionForm.description} onChange={e=>setSessionForm(f=>({...f,description:e.target.value}))} placeholder="Description…" /></Field>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Field label="Début"><input type="datetime-local" style={s.input} value={sessionForm.startTime} onChange={e=>setSessionForm(f=>({...f,startTime:e.target.value}))} /></Field>
                  <Field label="Fin"><input type="datetime-local" style={s.input} value={sessionForm.endTime} onChange={e=>setSessionForm(f=>({...f,endTime:e.target.value}))} /></Field>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Field label="Salle">
                    <select style={{...s.input,cursor:"pointer"}} value={sessionForm.roomId} onChange={e=>setSessionForm(f=>({...f,roomId:e.target.value}))}>
                      {ROOMS.map(r => <option key={r.id} value={r.id} style={{background:C.bg2}}>{r.name}</option>)}
                    </select>
                  </Field>
                  <Field label="Track"><input style={s.input} value={sessionForm.track} onChange={e=>setSessionForm(f=>({...f,track:e.target.value}))} placeholder="ex. Engineering" /></Field>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Field label="Capacité"><input type="number" style={s.input} value={sessionForm.capacity} onChange={e=>setSessionForm(f=>({...f,capacity:Number(e.target.value)}))} min={1} /></Field>
                  <Field label="Tags (virgule)"><input style={s.input} value={sessionForm.tags} onChange={e=>setSessionForm(f=>({...f,tags:e.target.value}))} placeholder="ai, llm, web" /></Field>
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                  <button onClick={() => setSessionModal(false)} style={s.btnCancel}>Annuler</button>
                  <button onClick={saveSession} style={s.btnPrimary}>{editingSession ? "Mettre à jour" : "Ajouter"}</button>
                </div>
              </div>
            </Modal>

            <DeleteModal isOpen={!!deleteSession} onClose={() => setDeleteSession(null)} onConfirm={() => confirmDeleteSession(deleteSession)} itemName="la session" />
          </div>
        )}

        {/* SPEAKERS */}
        {activeView === "speakers" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Gestion des intervenants</h2>
                <p style={{ margin: "2px 0 0", color: C.text3, fontSize: 13 }}>{speakers.length} intervenants au total</p>
              </div>
              <button style={s.btnPrimary} onClick={openAddSpeaker}>+ Ajouter intervenant</button>
            </div>

            <div style={{ ...s.glassCard, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    {["Photo","Nom","Titre","Entreprise","Sessions","Actions"].map(h => (
                      <th key={h} style={{ textAlign: h==="Actions"?"right":"left", padding:"10px 16px", color:C.text3, fontSize:11, fontWeight:500 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {speakers.map(spk => {
                    const count = sessions.filter(s => s.speakers.some(sp => sp.id === spk.id)).length;
                    return (
                      <tr key={spk.id} style={{ borderBottom: `1px solid rgba(255,255,255,0.03)` }}>
                        <td style={{ padding: "12px 16px" }}>
                          <img src={spk.photo} alt={spk.name} style={{ width: 40, height: 40, borderRadius: 10, objectFit: "cover" }} />
                        </td>
                        <td style={{ padding: "12px 16px", fontWeight: 500, color: "#fff" }}>{spk.name}</td>
                        <td style={{ padding: "12px 16px", color: C.text2, fontSize: 12 }}>{spk.title}</td>
                        <td style={{ padding: "12px 16px" }}><span style={{ color: C.green, fontSize: 12, fontWeight: 500 }}>{spk.company}</span></td>
                        <td style={{ padding: "12px 16px", color: C.text2, fontSize: 12 }}>{count}</td>
                        <td style={{ padding: "12px 16px", textAlign: "right" }}>
                          <div style={{ display: "flex", justifyContent: "flex-end", gap: 4 }}>
                            <button onClick={() => openEditSpeaker(spk)} style={{ width:32,height:32,borderRadius:8,border:"none",background:"transparent",color:C.text3,cursor:"pointer",fontSize:16 }}>✏️</button>
                            <button onClick={() => setDeleteSpeaker(spk)} style={{ width:32,height:32,borderRadius:8,border:"none",background:"transparent",color:C.text3,cursor:"pointer",fontSize:16 }}>🗑</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <Modal isOpen={speakerModal} onClose={() => setSpeakerModal(false)} title={editingSpeaker ? "Modifier l'intervenant" : "Ajouter un intervenant"}>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Field label="Nom complet"><input style={s.input} value={speakerForm.name} onChange={e=>setSpeakerForm(f=>({...f,name:e.target.value}))} placeholder="Prénom Nom" /></Field>
                  <Field label="URL Photo"><input style={s.input} value={speakerForm.photo} onChange={e=>setSpeakerForm(f=>({...f,photo:e.target.value}))} placeholder="https://..." /></Field>
                </div>
                <Field label="Biographie"><textarea style={{...s.input,resize:"none"}} rows={3} value={speakerForm.bio} onChange={e=>setSpeakerForm(f=>({...f,bio:e.target.value}))} placeholder="Biographie courte…" /></Field>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Field label="Titre professionnel"><input style={s.input} value={speakerForm.title} onChange={e=>setSpeakerForm(f=>({...f,title:e.target.value}))} placeholder="ex. Staff Engineer" /></Field>
                  <Field label="Entreprise"><input style={s.input} value={speakerForm.company} onChange={e=>setSpeakerForm(f=>({...f,company:e.target.value}))} placeholder="ex. Vercel" /></Field>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Field label="Twitter"><input style={s.input} value={speakerForm.twitter} onChange={e=>setSpeakerForm(f=>({...f,twitter:e.target.value}))} placeholder="@handle" /></Field>
                  <Field label="LinkedIn"><input style={s.input} value={speakerForm.linkedin} onChange={e=>setSpeakerForm(f=>({...f,linkedin:e.target.value}))} placeholder="username" /></Field>
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                  <button onClick={() => setSpeakerModal(false)} style={s.btnCancel}>Annuler</button>
                  <button onClick={saveSpeaker} style={s.btnPrimary}>{editingSpeaker ? "Mettre à jour" : "Ajouter"}</button>
                </div>
              </div>
            </Modal>

            <DeleteModal isOpen={!!deleteSpeaker} onClose={() => setDeleteSpeaker(null)} onConfirm={() => confirmDeleteSpeaker(deleteSpeaker)} itemName="l'intervenant" />
          </div>
        )}

        {/* QUESTIONS */}
        {activeView === "questions" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Questions & Commentaires</h2>
                <p style={{ margin: "2px 0 0", color: C.text3, fontSize: 13 }}>{allQuestions.length} questions au total</p>
              </div>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.text3, fontSize: 16 }}>🔍</span>
                <input style={{ ...s.input, width: 240, paddingLeft: 36 }} placeholder="Rechercher…" value={qSearch} onChange={e => setQSearch(e.target.value)} />
              </div>
            </div>

            <div style={{ ...s.glassCard, overflow: "hidden" }}>
              {filteredQuestions.length === 0 ? (
                <div style={{ padding: 48, textAlign: "center", color: C.text3 }}>
                  <p style={{ fontSize: 32, margin: "0 0 8px" }}>💬</p>
                  <p style={{ margin: 0, fontSize: 14 }}>Aucune question trouvée</p>
                </div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                      {["Session","Question","Auteur","Upvotes","Action"].map(h => (
                        <th key={h} style={{ textAlign: h==="Action"?"right":"left", padding:"10px 16px", color:C.text3, fontSize:11, fontWeight:500 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQuestions.map(q => {
                      const sess = sessions.find(s => s.id === q.sessionId);
                      return (
                        <tr key={q.id} style={{ borderBottom: `1px solid rgba(255,255,255,0.03)` }}>
                          <td style={{ padding: "12px 16px", color: C.green, fontSize: 12, maxWidth: 180 }}>
                            <span style={{ overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"block" }}>{sess?.title || "—"}</span>
                          </td>
                          <td style={{ padding: "12px 16px", color: "#fff", maxWidth: 280 }}>
                            <span style={{ overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"block" }}>{q.content}</span>
                          </td>
                          <td style={{ padding: "12px 16px", color: C.text2, fontSize: 12 }}>{q.author || "Anonyme"}</td>
                          <td style={{ padding: "12px 16px" }}>
                            <span style={{ color: C.orange, fontWeight: 600, fontSize: 13 }}>▲ {q.upvotes}</span>
                          </td>
                          <td style={{ padding: "12px 16px", textAlign: "right" }}>
                            <button onClick={() => setDeleteQuestion(q)} style={{ width:32,height:32,borderRadius:8,border:"none",background:"transparent",color:C.text3,cursor:"pointer",fontSize:16 }}>🗑</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            <DeleteModal isOpen={!!deleteQuestion} onClose={() => setDeleteQuestion(null)} onConfirm={() => confirmDeleteQuestion(deleteQuestion)} itemName="la question" />
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        input[type=datetime-local]::-webkit-calendar-picker-indicator { filter: invert(1) opacity(0.3); cursor: pointer; }
        select option { background: #161616; color: #fff; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
      `}</style>
    </div>
  );
}
