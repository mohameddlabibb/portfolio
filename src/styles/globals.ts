const G = `
:root{--ink:#0a0a0a;--paper:#f7f4ee;--accent:#ff3500;--lime:#d8ff3e;--blue:#2b4cff;--pink:#ff52c8;--mut:#9a948c}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{background:var(--paper);color:var(--ink);font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden}

/* ── full-width shell: spans the whole viewport at every size. container-type
   keeps cqw-based fluid type/spacing working — it now references the full
   container width, so the layout scales smoothly across desktop sizes. ── */
.app{container-type:inline-size;position:relative}
.anton{font-family:'Anton',sans-serif;font-weight:400;text-transform:uppercase;letter-spacing:.01em}
.mono{font-family:'JetBrains Mono',monospace}
a{color:inherit;text-decoration:none}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}

/* ── custom cursor ── */
.cursor{position:fixed;top:0;left:0;width:18px;height:18px;border-radius:50%;background:var(--accent);pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width .25s,height .25s,background .25s}
.cursor.big{width:70px;height:70px;background:var(--accent)}
@media(hover:none){.cursor{display:none}}

/* ── preloader ── */
.pre{position:fixed;inset:0;z-index:9000;background:var(--ink);color:var(--paper);display:flex;align-items:flex-end;justify-content:space-between;padding:40px 26px}
.pre .cnt{font-family:'Anton';font-size:clamp(80px,26vw,360px);line-height:.8}
.pre .lbl{font-family:'JetBrains Mono';font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;padding-bottom:14px}
.pre.done{transform:translateY(-100%);transition:transform 1s cubic-bezier(.76,0,.24,1)}

/* ── 3D hero canvas ── */
.scene{position:absolute;inset:0;z-index:1;pointer-events:none}
nav{position:fixed;top:0;left:0;right:0;z-index:60;display:flex;justify-content:space-between;align-items:center;padding:16px 26px;mix-blend-mode:difference;color:#fff}
nav .b{font-family:'Anton';font-size:1.5rem}
nav .l{display:flex;gap:22px;font-size:.74rem;letter-spacing:.14em;text-transform:uppercase}

/* ── hero ── */
.hero{position:relative;min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:90px 0 40px;overflow:hidden}
.hero .pad{position:relative;z-index:2}
.pad{padding-left:26px;padding-right:26px}
.line{font-family:'Anton';font-size:clamp(54px,15cqw,210px);line-height:.86;text-transform:uppercase;overflow:hidden;overflow:clip;overflow-clip-margin:.35em}
.line .inner{display:block}
.line.o .inner{color:transparent;-webkit-text-stroke:2px var(--ink)}
.line.fill .inner{background:linear-gradient(90deg,var(--accent),var(--pink),var(--blue),var(--accent));background-size:300% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:flow 8s linear infinite}
@keyframes flow{to{background-position:300% 0}}
.hero .meta{position:relative;z-index:4;display:flex;justify-content:space-between;align-items:end;gap:20px;flex-wrap:wrap;padding:30px 26px 0;border-top:2px solid var(--ink);margin-top:24px;opacity:0}
.hero .role{font-size:clamp(14px,2cqw,22px);font-weight:700;max-width:520px}
.avail{display:inline-flex;align-items:center;gap:9px;font-family:'JetBrains Mono';font-size:.72rem;letter-spacing:.12em;text-transform:uppercase}
.dot{width:11px;height:11px;border-radius:50%;background:#00c853;animation:b 1s steps(1) infinite}@keyframes b{50%{opacity:.2}}

/* ── marquee ── */
.band{padding:18px 0;border-top:3px solid var(--ink);border-bottom:3px solid var(--ink);font-family:'Anton';font-size:clamp(34px,7cqw,90px);text-transform:uppercase;overflow:hidden;white-space:nowrap}
.band.dark{background:var(--ink);color:var(--paper)}
.band.acc{background:var(--accent);color:var(--paper)}
.band.lime{background:var(--lime)}
.band .run{display:inline-block;will-change:transform}
.band .run span{padding:0 .35em}
.band .run span::after{content:'✸';padding:0 .3em;color:var(--accent)}
.band.acc .run span::after,.band.dark .run span::after{color:var(--lime)}

section{padding:120px 0;position:relative}
h2.big{font-family:'Anton';font-size:clamp(44px,11cqw,150px);line-height:.86;margin:6px 0 30px}

/* reveal util */
.rv{opacity:0;transform:translateY(40px)}
.rl{overflow:hidden;overflow:clip;overflow-clip-margin:.35em}.rl>*{display:block}

.about-row{display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:end}
.about-row p{font-size:clamp(18px,2.4cqw,30px);font-weight:500;line-height:1.45}
.about-row p .h{background:var(--lime);padding:0 .1em}.about-row p .h2{background:var(--accent);color:#fff;padding:0 .1em}
.stats{display:grid;grid-template-columns:repeat(4,1fr)}
.stat{padding:30px 14px;text-align:center;border:2px solid var(--ink);margin:-1px}
.stat .v{font-family:'Anton';font-size:clamp(36px,6cqw,84px);line-height:1}
.stat .l{font-family:'JetBrains Mono';font-size:.66rem;letter-spacing:.12em;text-transform:uppercase;margin-top:8px}
.svcs{display:grid;grid-template-columns:repeat(4,1fr);border-top:2px solid var(--ink);margin-top:40px}
.svc{padding:24px 16px;border-bottom:2px solid var(--ink);position:relative;overflow:hidden;cursor:default}
.svc:not(:last-child){border-right:2px solid var(--ink)}
.svc .n{font-family:'JetBrains Mono';font-size:.8rem;color:var(--accent)}
.svc h3{font-family:'Anton';font-size:clamp(18px,2cqw,30px);margin-top:10px}
.svc p{font-family:'JetBrains Mono';font-size:clamp(11px,.9cqw,13px);line-height:1.4;margin-top:10px;opacity:.7}
.svc::after{content:'';position:absolute;inset:0;background:var(--accent);transform:translateY(101%);transition:transform .35s cubic-bezier(.7,0,.3,1);z-index:-1}
.svc:hover::after{transform:translateY(0)}.svc:hover{color:#fff}.svc:hover .n{color:#fff}

.scat{display:grid;grid-template-columns:auto 1fr;gap:24px;align-items:center;padding:26px 0;border-bottom:2px solid var(--ink)}
.scat:first-child{border-top:2px solid var(--ink)}
.scat .n{font-family:'Anton';font-size:clamp(40px,7cqw,96px);line-height:.8;color:var(--accent)}
.scat .nm{font-family:'Anton';font-size:clamp(22px,3cqw,44px)}
.scat .chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
.chip{border:2px solid var(--ink);padding:5px 12px;font-weight:700;font-size:.78rem;font-family:'JetBrains Mono';opacity:0;transform:translateY(14px)}

/* pinned horizontal work */
.work-pin{height:100vh;overflow:hidden;position:relative;display:flex;align-items:center}
.htrack{display:flex;gap:30px;padding:0 26px;will-change:transform}
.pcard{flex:0 0 min(78cqw,640px);border:3px solid var(--ink);background:#fff;overflow:hidden}
.pcard .media{height:280px;position:relative;overflow:hidden;background:var(--ink)}
.pcard .media .img{position:absolute;inset:0;background-size:cover;background-position:center;clip-path:inset(0 100% 0 0);transition:filter .4s;filter:grayscale(1)}
.pcard:hover .media .img{filter:grayscale(0)}
.pcard .media .pn{position:absolute;left:18px;bottom:10px;z-index:2;font-family:'Anton';font-size:5rem;color:var(--paper);line-height:.8;mix-blend-mode:difference}
.pcard .body{padding:24px 26px}
.pcard .k{font-family:'JetBrains Mono';font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}
.pcard h3{font-family:'Anton';font-size:clamp(28px,4cqw,52px);line-height:.9;margin:6px 0 12px}
.pcard p{line-height:1.6;font-weight:500;margin-bottom:14px;color:#333}
.pcard .row{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
.pcard .tags{font-family:'JetBrains Mono';font-size:.74rem;color:var(--mut)}
.pcard .links{display:flex;gap:16px;align-items:center}
.pcard .gh{font-family:'JetBrains Mono';font-size:.74rem;letter-spacing:.08em;text-transform:uppercase;border-bottom:2px solid var(--ink);padding-bottom:2px}

/* contact */
.contact{background:var(--ink);color:var(--paper);text-align:center;padding:0}
.contact .inner{padding:110px 26px}
.contact h2{font-family:'Anton';font-size:clamp(50px,14cqw,190px);line-height:.84}
.contact h2 .fill{background:linear-gradient(90deg,var(--accent),var(--pink),var(--lime),var(--accent));background-size:300%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:flow 6s linear infinite}
.mbtn{display:inline-block;margin-top:26px;border:2px solid var(--paper);padding:18px 40px;font-family:'JetBrains Mono';font-size:1rem;letter-spacing:.04em;will-change:transform}
.mbtn:hover{background:var(--accent);border-color:var(--accent)}

@media(max-width:780px){.about-row{grid-template-columns:1fr}.svcs{grid-template-columns:1fr 1fr}.svc:nth-child(2n){border-right:none}.stats{grid-template-columns:1fr 1fr}nav .l{display:none}.work-pin{height:auto;display:block;padding:60px 0}.htrack{flex-direction:column;transform:none!important}.pcard{flex:none;width:100%}
/* hero: keep the 3D icons as a calm backdrop so the headline stays legible */
.scene{opacity:.5}
/* loosen the tight .86 stack so the outlined "DEVELOPER" line isn't crowded */
.hero .line{line-height:1.05}
.hero{padding:84px 0 32px}
.hero .meta{flex-direction:column;align-items:start;gap:14px;padding-top:22px;margin-top:18px}
section{padding:90px 0}}
@media(max-width:480px){.scene{opacity:.42}.pcard .media{height:200px}.pcard .body{padding:20px 20px}.pcard .pn{font-size:3.6rem}.stat{padding:22px 10px}}
`;

export default G;
