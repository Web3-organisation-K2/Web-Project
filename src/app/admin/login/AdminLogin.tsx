import { useState } from "react";

const C = {
  green:  "#A8FF3E",
  orange: "#FF6B2B",
  bg0:    "#0D0D0D",
  bg1:    "#121212",
  bg2:    "#161616",
  bg3:    "#1C1C1C",
  border: "rgba(255,255,255,0.08)",
  text1:  "#FFFFFF",
  text2:  "#888888",
  text3:  "#555555",
};

// remplace l'appel API en mode standalone
const DEMO_CREDENTIALS = { email: "admin@eventsync.io", password: "admin123" };

export default function AdminLogin({ onSuccess }) {
  const [showPwd, setShowPwd]     = useState(false);
  const [loading, setLoading]     = useState(false);
  const [success, setSuccess]     = useState(false);
  const [error, setError]         = useState("");
  const [form, setForm]           = useState({ email: "", password: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);

    await new Promise(r => setTimeout(r, 1200)); // simulation latence réseau

    if (form.email === DEMO_CREDENTIALS.email && form.password === DEMO_CREDENTIALS.password) {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => onSuccess?.(), 1500);
    } else {
      setLoading(false);
      setError("Identifiants incorrects. Essayez admin@eventsync.io / admin123");
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: C.bg0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
      fontFamily: "system-ui, -apple-system, sans-serif",
      color: "#fff",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Glow backgrounds (remplace les div blur Tailwind) */}
      <div style={{ position: "absolute", top: -120, right: -120, width: 320, height: 320, borderRadius: "50%", background: "rgba(168,255,62,0.04)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -120, left: -120, width: 320, height: 320, borderRadius: "50%", background: "rgba(255,107,43,0.04)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 440, position: "relative", zIndex: 1 }}>

        {/* Logo + titre */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 20, textDecoration: "none" }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: `linear-gradient(135deg, ${C.green}22, ${C.green}44)`,
              border: `1px solid ${C.green}33`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 26,
            }}>⚡</div>
            <span style={{ fontSize: 24, fontWeight: 800 }}>
              <span style={{ color: C.green }}>Event</span>
              <span style={{ color: "#fff" }}>Sync</span>
            </span>
          </a>

          {/* Badge admin */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "rgba(255,107,43,0.10)", border: "1px solid rgba(255,107,43,0.30)", color: C.orange, fontSize: 12, fontWeight: 700, marginBottom: 16 }}>
            🛡 Espace Administrateur
          </div>

          <h1 style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 800 }}>Connexion admin</h1>
          <p style={{ margin: 0, color: C.text2, fontSize: 14 }}>Connectez-vous pour gérer la plateforme.</p>
        </div>

        {/* Card formulaire */}
        <div style={{
          background: "rgba(22,22,22,0.85)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${C.border}`,
          borderRadius: 20,
          padding: 32,
        }}>

          {/* Message d'erreur */}
          {error && (
            <div style={{ marginBottom: 20, padding: "12px 16px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, color: "#f87171", fontSize: 13 }}>
              {error}
            </div>
          )}

          {/* Succès */}
          {success && (
            <div style={{ marginBottom: 20, padding: "12px 16px", background: "rgba(168,255,62,0.1)", border: "1px solid rgba(168,255,62,0.2)", borderRadius: 12, color: C.green, fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>✓</span> Connexion réussie ! Redirection…
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#ccc", marginBottom: 8 }}>
                Adresse email admin
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 18, color: C.text3 }}>✉</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="admin@eventsync.io"
                  disabled={success}
                  style={{
                    width: "100%", boxSizing: "border-box",
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${C.border}`,
                    borderRadius: 12,
                    paddingLeft: 44, paddingRight: 16, paddingTop: 12, paddingBottom: 12,
                    color: "#fff", fontSize: 14, outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.target.style.borderColor = `${C.green}80`}
                  onBlur={e  => e.target.style.borderColor = C.border}
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#ccc", marginBottom: 8 }}>
                Mot de passe
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 18, color: C.text3 }}>🔒</span>
                <input
                  type={showPwd ? "text" : "password"}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  disabled={success}
                  style={{
                    width: "100%", boxSizing: "border-box",
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${C.border}`,
                    borderRadius: 12,
                    paddingLeft: 44, paddingRight: 48, paddingTop: 12, paddingBottom: 12,
                    color: "#fff", fontSize: 14, outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.target.style.borderColor = `${C.green}80`}
                  onBlur={e  => e.target.style.borderColor = C.border}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: C.text3, cursor: "pointer", fontSize: 18, padding: 0, lineHeight: 1 }}
                >
                  {showPwd ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {/* Bouton submit */}
            <button
              type="submit"
              disabled={loading || success}
              style={{
                width: "100%",
                padding: "13px 20px",
                borderRadius: 12,
                border: "none",
                background: success ? C.green : loading ? "rgba(168,255,62,0.4)" : C.bg3,
                color: success ? C.bg0 : "#fff",
                fontSize: 15,
                fontWeight: 700,
                cursor: loading || success ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "all 0.2s",
                boxShadow: success ? `0 4px 24px ${C.green}33` : loading ? `0 4px 24px ${C.green}20` : "none",
              }}
            >
              {success ? (
                <><span style={{ fontSize: 18 }}>✓</span> Connecté</>
              ) : loading ? (
                <><LoadingSpinner /> Connexion en cours…</>
              ) : (
                <> Se connecter en admin <span style={{ fontSize: 18 }}>→</span></>
              )}
            </button>
          </form>

          {/* Lien retour */}
          <p style={{ marginTop: 24, textAlign: "center", color: C.text3, fontSize: 13 }}>
            Pas admin ?{" "}
            <a href="/auth/login" style={{ color: C.green, textDecoration: "none", fontWeight: 500 }}>
              Retour à la connexion utilisateur
            </a>
          </p>

          {/* Hint démo */}
          <div style={{ marginTop: 16, padding: "10px 14px", borderRadius: 10, background: "rgba(168,255,62,0.05)", border: "1px solid rgba(168,255,62,0.12)", fontSize: 12, color: C.text3, textAlign: "center" }}>
            Démo : <span style={{ color: C.green, fontFamily: "monospace" }}>admin@eventsync.io</span> / <span style={{ color: C.green, fontFamily: "monospace" }}>admin123</span>
          </div>
        </div>
      </div>

      <style>{`
        input::placeholder { color: rgba(255,255,255,0.2); }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0px 1000px #1C1C1C inset !important; -webkit-text-fill-color: #fff !important; }
      `}</style>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ animation: "spin 0.8s linear infinite" }}>
      <circle cx="8" cy="8" r="6" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      <path d="M8 2a6 6 0 0 1 6 6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}
