import { useState } from "react";
import { SVCS } from "../data/constants";
import Confetti from "../components/Confetti";

const EMAIL = "mohameddlabibb@gmail.com";

export default function Contact() {
  const [selSvc, setSelSvc] = useState<string[]>([]);
  const [form, setForm]     = useState({ name: "", email: "", msg: "" });
  const [errs, setErrs]     = useState<Record<string, string>>({});
  const [done, setDone]     = useState(false);
  const [loading, setLoading] = useState(false);

  const tog = (id: string) =>
    setSelSvc(p => p.includes(id) ? p.filter(s => s !== id) : [...p, id]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())          e.name  = "Required";
    if (!form.email.includes("@"))  e.email = "Valid email required";
    if (!form.msg.trim())           e.msg   = "Required";
    if (!selSvc.length)             e.svc   = "Pick at least one";
    setErrs(e);
    return !Object.keys(e).length;
  };

  const submit = async () => {
    if (!validate()) return;
    setLoading(true);
    const svcs = selSvc.map(id => SVCS.find(s => s.id === id)!.l).join(", ");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/3edc07b42ba51a34ccba5553c5d92438`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, services: svcs, message: form.msg, _subject: `Inquiry from ${form.name}`, _captcha: "false" }),
      });
      const d = await res.json();
      setLoading(false);
      if (d.success === "true" || d.success === true) setDone(true);
      else throw new Error();
    } catch {
      setLoading(false);
      window.open(`mailto:${EMAIL}?subject=${encodeURIComponent("Portfolio Inquiry")}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nServices: ${svcs}\n\nMessage:\n${form.msg}`)}`);
      setDone(true);
    }
  };

  const reset = () => {
    setDone(false);
    setForm({ name: "", email: "", msg: "" });
    setSelSvc([]);
    setErrs({});
  };

  return (
    <section id="contact" style={{ background: "#0a0a0a" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        <div className="rv">
          <p style={{ fontSize: ".75rem", letterSpacing: ".22em", color: "#ff3500", fontFamily: "monospace", marginBottom: 10 }}>Contact</p>
          <h2 style={{ fontSize: "clamp(32px,5vw,58px)", fontWeight: 900, letterSpacing: "-.02em", color: "#fff", marginBottom: 10 }}>Let's Build Together</h2>
        </div>

        <div className="rv" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40, transitionDelay: ".05s" }}>
          <a href={`mailto:${EMAIL}`} style={{ fontSize: ".9rem", color: "#ff3500", textDecoration: "none", fontFamily: "monospace", transition: "opacity .2s" }}
            onMouseEnter={e => e.currentTarget.style.opacity = ".7"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
            {EMAIL}
          </a>
          <span style={{ color: "#dbdbdb", fontSize: ".8rem" }}>· Available for work</span>
        </div>

        {!done ? (
          <>
            {/* service picker */}
            <div className="rv" style={{ marginBottom: 30, transitionDelay: ".08s" }}>
              <p style={{ fontSize: ".78rem", color: "#dbdbdb", marginBottom: 16 }}>What do you need? <span style={{ color: "#ff3500" }}>*</span></p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
                {SVCS.map(s => {
                  const on = selSvc.includes(s.id);
                  return (
                    <div key={s.id} className="svc" onClick={() => tog(s.id)}
                      style={{ background: on ? "#161616" : "#111", borderColor: on ? s.c : "transparent", boxShadow: on ? `0 8px 26px ${s.c}28` : "0 2px 8px rgba(0,0,0,.4)", transform: on ? "translateY(-4px)" : "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.c }} />
                        </div>
                        <span style={{ fontWeight: 700, color: on ? s.c : "#fff", fontSize: ".9rem" }}>{s.l}</span>
                        {on && <span style={{ marginLeft: "auto", fontSize: ".66rem", background: s.c, color: "#fff", padding: "2px 8px", borderRadius: 100, fontWeight: 700 }}>✓</span>}
                      </div>
                      <p style={{ fontSize: ".78rem", color: "#444", lineHeight: 1.55, paddingLeft: 42 }}>{s.d}</p>
                    </div>
                  );
                })}
              </div>
              {errs.svc && <p style={{ fontSize: ".78rem", color: "#f43f5e", marginTop: 8 }}>{errs.svc}</p>}
            </div>

            {/* fields */}
            <div className="rv" style={{ display: "flex", flexDirection: "column", gap: 14, transitionDelay: ".12s" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {(["name", "email"] as const).map(k => (
                  <div key={k}>
                    <label style={{ fontSize: ".72rem", color: "#444", letterSpacing: ".1em", display: "block", marginBottom: 8, textTransform: "uppercase" }}>
                      {k === "name" ? "Name" : "Email"}
                    </label>
                    <input
                      className={`fi${errs[k] ? " err" : ""}`}
                      type={k === "email" ? "email" : "text"}
                      placeholder={k === "name" ? "Your name" : "you@example.com"}
                      style={{ background: "#111", border: "1.5px solid #222", color: "#fff" }}
                      value={form[k]}
                      onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
                      onFocus={e => e.target.style.borderColor = "#ff3500"}
                      onBlur={e => e.target.style.borderColor = errs[k] ? "#f43f5e" : "#222"}
                    />
                    {errs[k] && <p style={{ fontSize: ".74rem", color: "#f43f5e", marginTop: 4 }}>{errs[k]}</p>}
                  </div>
                ))}
              </div>

              <div>
                <label style={{ fontSize: ".72rem", color: "#444", letterSpacing: ".1em", display: "block", marginBottom: 8, textTransform: "uppercase" }}>Message</label>
                <textarea
                  className={`fi${errs.msg ? " err" : ""}`}
                  placeholder="Tell me about your project..."
                  style={{ background: "#111", border: "1.5px solid #222", color: "#fff" }}
                  value={form.msg}
                  onChange={e => setForm(f => ({ ...f, msg: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = "#ff3500"}
                  onBlur={e => e.target.style.borderColor = errs.msg ? "#f43f5e" : "#222"}
                />
                {errs.msg && <p style={{ fontSize: ".74rem", color: "#f43f5e", marginTop: 4 }}>{errs.msg}</p>}
              </div>

              <button className="sbtn" onClick={submit} disabled={loading}>
                <span>{loading ? "Sending…" : "Send Message →"}</span>
              </button>
            </div>
          </>
        ) : (
          <div style={{ background: "#111", borderRadius: 22, padding: "58px 40px", textAlign: "center", position: "relative", overflow: "hidden", animation: "popIn .5s ease both" }}>
            <Confetti />
            <div style={{ fontSize: 50, marginBottom: 16, position: "relative", zIndex: 1 }}>🎉</div>
            <h3 style={{ fontSize: "1.9rem", fontWeight: 900, marginBottom: 10, color: "#fff", position: "relative", zIndex: 1 }}>Message sent!</h3>
            <p style={{ color: "#555", lineHeight: 1.8, position: "relative", zIndex: 1 }}>
              I'll get back to you at <span style={{ color: "#ff3500" }}>{EMAIL}</span>
            </p>
            <button onClick={reset}
              style={{ marginTop: 22, padding: "10px 24px", background: "transparent", border: "1.5px solid #1e1e1e", borderRadius: 8, cursor: "pointer", fontSize: ".84rem", color: "#444", fontFamily: "inherit", transition: "all .25s", position: "relative", zIndex: 1 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#fff"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e1e"; e.currentTarget.style.color = "#444"; }}>
              Send another →
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
