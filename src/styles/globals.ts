const G = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#fff;color:#0a0a0a;font-family:'Inter',system-ui,sans-serif;overflow-x:hidden}
@keyframes t1{0%,100%{transform:perspective(520px) rotateY(-34deg) rotateX(13deg)}50%{transform:perspective(520px) rotateY(34deg) rotateX(-10deg)}}
@keyframes t2{0%,100%{transform:perspective(520px) rotateY(28deg) rotateX(-15deg)}50%{transform:perspective(520px) rotateY(-28deg) rotateX(13deg)}}
@keyframes t3{0%,100%{transform:perspective(520px) rotateX(-26deg) rotateY(18deg)}50%{transform:perspective(520px) rotateX(26deg) rotateY(-14deg)}}
@keyframes t4{0%,100%{transform:perspective(520px) rotateY(22deg) rotateZ(6deg)}50%{transform:perspective(520px) rotateY(-22deg) rotateZ(-6deg)}}
@keyframes t5{0%,100%{transform:perspective(520px) rotateX(19deg) rotateY(-30deg)}50%{transform:perspective(520px) rotateX(-19deg) rotateY(30deg)}}
@keyframes t6{0%,100%{transform:perspective(520px) rotateY(31deg) rotateX(9deg) rotateZ(-5deg)}50%{transform:perspective(520px) rotateY(-31deg) rotateX(-7deg) rotateZ(5deg)}}
@keyframes f1{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
@keyframes f2{0%,100%{transform:translateY(-12px)}50%{transform:translateY(16px)}}
@keyframes f3{0%,100%{transform:translateY(0)}33%{transform:translateY(-18px)}66%{transform:translateY(9px)}}
@keyframes f4{0%,100%{transform:translateY(-8px)}50%{transform:translateY(20px)}}
@keyframes f5{0%,100%{transform:translateY(0)}25%{transform:translateY(-22px)}75%{transform:translateY(8px)}}
@keyframes f6{0%,100%{transform:translateY(5px)}50%{transform:translateY(-16px)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
@keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(2.4);opacity:.1}}
@keyframes mq{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes cf{0%{transform:translateY(0) rotate(0) scale(1);opacity:1}100%{transform:translateY(-150px) rotate(580deg) scale(.2);opacity:0}}
@keyframes popIn{0%{transform:scale(.85);opacity:0}60%{transform:scale(1.06)}100%{transform:scale(1);opacity:1}}
.tc{display:inline-block;width:3px;height:.82em;background:#ff3500;vertical-align:text-bottom;margin-left:4px;animation:blink 1s step-end infinite}
.mtrack{display:flex;animation:mq 22s linear infinite;white-space:nowrap}
.rv{opacity:0;transform:translateY(24px);transition:opacity .6s,transform .6s}
.rv.in{opacity:1;transform:translateY(0)}
nav{position:fixed;top:0;left:0;right:0;z-index:500;padding:18px 56px;display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,.88);backdrop-filter:blur(16px);border-bottom:1px solid rgba(0,0,0,.06)}
.nl{position:relative;color:#bbb;font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;transition:color .25s;border:none;background:none;font-family:inherit;padding:0}
.nl::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:2px;background:#ff3500;transition:width .3s}
.nl:hover{color:#0a0a0a}.nl:hover::after{width:100%}
.pc3d{background:#fff;border-radius:18px;border:1.5px solid rgba(0,0,0,.07);transform-style:preserve-3d;overflow:hidden;will-change:transform;transition:box-shadow .3s}
.pc3d:hover{box-shadow:0 30px 70px rgba(0,0,0,.13)}
.tpill{display:flex;align-items:center;gap:8px;padding:7px 14px;border-radius:9px;background:rgba(255,255,255,.95);border:1px solid rgba(0,0,0,.08);transition:all .22s;cursor:default;box-shadow:0 2px 8px rgba(0,0,0,.05)}
.tpill:hover{transform:translateY(-3px);box-shadow:0 8px 22px rgba(0,0,0,.1)}
.svc{border-radius:16px;padding:22px;cursor:pointer;transition:all .25s;border:2px solid transparent;user-select:none}
.fi{width:100%;padding:13px 18px;border:1.5px solid rgba(0,0,0,.1);border-radius:10px;font-size:.95rem;font-family:inherit;background:#fff;color:#0a0a0a;transition:border .25s;outline:none}
.fi:focus{border-color:#ff3500;box-shadow:0 0 0 4px rgba(255,53,0,.08)}
.fi.err{border-color:#f43f5e}
textarea.fi{resize:vertical;min-height:120px}
.sbtn{display:inline-flex;align-items:center;gap:10px;padding:15px 38px;border:none;border-radius:12px;font-size:.92rem;font-weight:700;letter-spacing:.06em;cursor:pointer;transition:all .35s;font-family:inherit;background:#0a0a0a;color:#fff;position:relative;overflow:hidden}
.sbtn::before{content:'';position:absolute;inset:0;background:#ff3500;transform:scaleX(0);transform-origin:left;transition:transform .4s}
.sbtn:hover:not(:disabled)::before{transform:scaleX(1)}
.sbtn span{position:relative;z-index:1}
.sbtn:disabled{opacity:.55;cursor:not-allowed}
section{padding:100px 56px}
.nav-links{display:flex;gap:32px}
.gh-link{}
.ham{display:none;flex-direction:column;gap:5px;cursor:pointer;border:none;background:none;padding:4px}
.ham span{display:block;width:22px;height:2px;background:#0a0a0a;transition:all .3s;border-radius:2px}
.mob-menu{display:none;position:fixed;top:57px;left:0;right:0;z-index:499;background:rgba(255,255,255,.97);backdrop-filter:blur(16px);border-bottom:1px solid rgba(0,0,0,.06);padding:20px 24px;flex-direction:column}
.mob-menu.open{display:flex}
.mob-menu .nl{padding:14px 0;border-bottom:1px solid rgba(0,0,0,.04);font-size:.85rem;text-align:left}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:32px;border-top:1px solid #1a1a1a;padding-top:44px;margin-bottom:44px}
.svc-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
.form-2col{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.pc-body{padding:40px 44px}
@media(max-width:768px){
  .stats-grid{grid-template-columns:repeat(2,1fr);gap:20px;padding-top:32px;margin-bottom:32px}
  .pc-body{padding:28px 26px}
}
@media(max-width:640px){
  section{padding:64px 20px}
  nav{padding:14px 20px}
  .nav-links{display:none}
  .gh-link{display:none!important}
  .ham{display:flex}
  .stats-grid{grid-template-columns:repeat(2,1fr);gap:14px;padding-top:24px;margin-bottom:24px}
  .svc-grid{grid-template-columns:1fr}
  .form-2col{grid-template-columns:1fr}
  .mob-icon{zoom:.58;opacity:.45}
  .hero-badge svg{width:88px!important;height:88px!important}
  .pc-body{padding:22px 18px}
}
`;

export default G;
