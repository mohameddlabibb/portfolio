import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * Ports the v11 motion layer: Lenis smooth scroll synced to ScrollTrigger,
 * preloader counter → hero unmask, masked/fade reveals, chip stagger, stat
 * count-ups, skewing marquees, image clip reveals, pinned horizontal work,
 * blend-mode cursor, magnetic button, and Lenis-driven anchor links.
 * Returns cleanup().
 */
export function initMotion(): () => void {
  const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  const ticker = (t: number) => lenis.raf(t * 1000);
  gsap.ticker.add(ticker);
  gsap.ticker.lagSmoothing(0);

  const ctx = gsap.context(() => {
    /* preloader counter → reveal hero */
    const pre = document.getElementById("pre");
    const cnt = document.getElementById("cnt");
    const intro = gsap.timeline();
    intro
      .to(
        { v: 0 },
        {
          v: 100,
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate() {
            if (cnt) cnt.textContent = String(Math.round((this.targets()[0] as { v: number }).v));
          },
        }
      )
      .add(() => pre?.classList.add("done"))
      .fromTo(
        ".hero .line .inner",
        { yPercent: 140 },
        { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.12 },
        "-=.2"
      )
      .to("#heroMeta", { opacity: 1, duration: 0.6 }, "-=.4");
    if (reduce) {
      pre?.classList.add("done");
      intro.progress(1);
    }

    /* line + element reveals */
    document.querySelectorAll<HTMLElement>(".rl").forEach((el) => {
      gsap.fromTo(
        el.children,
        { yPercent: 140 },
        { yPercent: 0, duration: 0.9, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 85%" } }
      );
    });
    document.querySelectorAll<HTMLElement>(".rv").forEach((el) => {
      gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
    });
    gsap.utils.toArray<HTMLElement>(".scat").forEach((s) => {
      gsap.to(s.querySelectorAll(".chip"), {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: { trigger: s, start: "top 80%" },
      });
    });

    /* count-up stats */
    document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
      const end = +(el.dataset.count || 0);
      const suf = el.dataset.suffix || "";
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter() {
          gsap.to(
            { v: 0 },
            {
              v: end,
              duration: 1.4,
              ease: "power2.out",
              onUpdate() {
                el.textContent = Math.round((this.targets()[0] as { v: number }).v) + suf;
              },
            }
          );
        },
      });
    });

    /* marquee — seamless loop (xPercent) + scroll-velocity skew */
    document.querySelectorAll<HTMLElement>("[data-marquee]").forEach((m, i) => {
      const dir = i % 2 ? 1 : -1;
      gsap.fromTo(
        m,
        { xPercent: dir < 0 ? 0 : -50 },
        { xPercent: dir < 0 ? -50 : 0, duration: 24, ease: "none", repeat: -1 }
      );
    });
    const skewers = [...document.querySelectorAll<HTMLElement>("[data-marquee]")].map((m) =>
      gsap.quickTo(m, "skewX", { duration: 0.4, ease: "power3" })
    );
    let skStop: ReturnType<typeof setTimeout>;
    ScrollTrigger.create({
      onUpdate(self) {
        const sk = gsap.utils.clamp(-12, 12, self.getVelocity() / -220);
        skewers.forEach((q) => q(sk));
        clearTimeout(skStop);
        skStop = setTimeout(() => skewers.forEach((q) => q(0)), 140);
      },
    });

    /* image clip reveal on work cards */
    gsap.utils.toArray<HTMLElement>("[data-img]").forEach((img) => {
      gsap.to(img, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: img, start: "top 90%" },
      });
    });

    /* pinned horizontal work scroll */
    if (window.innerWidth > 780 && !reduce) {
      const track = document.getElementById("htrack");
      if (track) {
        const dist = () => track.scrollWidth - window.innerWidth + 52;
        gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: "#work",
            start: "top top",
            end: () => "+=" + dist(),
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      }
    }
  });

  /* custom cursor + magnetic + hover-grow (outside gsap.context — listeners) */
  const cur = document.getElementById("cursor");
  const onMove = (e: PointerEvent) => {
    if (cur) gsap.to(cur, { x: e.clientX, y: e.clientY, duration: 0.25, ease: "power2.out" });
  };
  addEventListener("pointermove", onMove);
  const growEls = [...document.querySelectorAll<HTMLElement>("a,.svc,.pcard,.stat")];
  const enter = () => cur?.classList.add("big");
  const leave = () => cur?.classList.remove("big");
  growEls.forEach((el) => {
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
  });

  const mag = document.getElementById("magnet");
  const magMove = (e: PointerEvent) => {
    if (!mag) return;
    const r = mag.getBoundingClientRect();
    gsap.to(mag, { x: (e.clientX - r.left - r.width / 2) * 0.4, y: (e.clientY - r.top - r.height / 2) * 0.4, duration: 0.3 });
  };
  const magLeave = () => mag && gsap.to(mag, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,.4)" });
  mag?.addEventListener("pointermove", magMove as EventListener);
  mag?.addEventListener("pointerleave", magLeave);

  /* anchor links via lenis */
  const links = [...document.querySelectorAll<HTMLAnchorElement>("[data-link]")];
  const linkHandlers = links.map((a) => {
    const h = (e: Event) => {
      e.preventDefault();
      const href = a.getAttribute("href");
      if (href) lenis.scrollTo(href);
    };
    a.addEventListener("click", h);
    return { a, h };
  });

  ScrollTrigger.refresh();

  return () => {
    gsap.ticker.remove(ticker);
    lenis.destroy();
    ctx.revert();
    ScrollTrigger.getAll().forEach((t) => t.kill());
    removeEventListener("pointermove", onMove);
    growEls.forEach((el) => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
    });
    mag?.removeEventListener("pointermove", magMove as EventListener);
    mag?.removeEventListener("pointerleave", magLeave);
    linkHandlers.forEach(({ a, h }) => a.removeEventListener("click", h));
  };
}
