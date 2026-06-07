import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { ICONS, SVGS, type IconCfg } from "./icons";

const MODEL_DIR = "/models/";

/**
 * Live 3D floating stack icons behind the hero. Each brand logo is extruded to
 * real 3D (ExtrudeGeometry) from its inlined SVG and brand-colored. Returns a
 * cleanup() that stops the loop and frees GPU resources.
 */
export function initScene(canvas: HTMLCanvasElement, heroEl: HTMLElement): () => void {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  cam.position.z = 12;
  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const key = new THREE.DirectionalLight(0xffffff, 1.1);
  key.position.set(5, 8, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xff52c8, 0.5);
  rim.position.set(-6, -3, 4);
  scene.add(rim);

  const gltf = new GLTFLoader();
  const svgLoader = new SVGLoader();
  const items: THREE.Object3D[] = [];

  // On narrow/portrait viewports the visible world-width shrinks but the icons
  // don't — so they balloon and bury the headline. Scale both the icons and
  // their float reach down on phones so they read as a calm backdrop instead.
  let kScale = 1;
  const respK = () => (window.innerWidth <= 780 ? Math.max(0.5, window.innerWidth / 1100) : 1);

  /* a floating icon = the brand logo extruded to real 3D */
  function buildLogo(cfg: IconCfg): THREE.Group {
    const g = new THREE.Group();
    try {
      const txt = SVGS[cfg.svg];
      if (!txt) throw new Error("no inlined svg for " + cfg.svg);
      const data = svgLoader.parse(txt);
      const shapes: THREE.Shape[] = [];
      data.paths.forEach((p) => SVGLoader.createShapes(p).forEach((s) => shapes.push(s)));
      if (!shapes.length) throw new Error("no shapes");
      const geo = new THREE.ExtrudeGeometry(shapes, {
        depth: 2,
        bevelEnabled: true,
        bevelThickness: 0.5,
        bevelSize: 0.45,
        bevelSegments: 2,
      });
      geo.computeBoundingBox();
      const bb = geo.boundingBox!;
      const sz = new THREE.Vector3();
      bb.getSize(sz);
      geo.translate(-(bb.max.x + bb.min.x) / 2, -(bb.max.y + bb.min.y) / 2, -(bb.max.z + bb.min.z) / 2);
      const s = 1.85 / Math.max(sz.x, sz.y);
      const mesh = new THREE.Mesh(
        geo,
        new THREE.MeshStandardMaterial({ color: cfg.color, roughness: 0.35, metalness: 0.35, side: THREE.DoubleSide })
      );
      mesh.scale.set(s, -s, s); // flip Y (SVG is y-down)
      g.add(mesh);
    } catch (e) {
      console.warn("icon build failed:", cfg.svg, (e as Error).message);
    }
    return g;
  }

  // visible world half-extents at the icon plane (z = 0). The camera maps the
  // FULL hero height onto the canvas, but the hero is taller than the viewport —
  // so we also compute the slice that is actually on screen (cy/vhh) and lay the
  // icons out inside THAT, so none of them end up below the fold.
  function viewBounds() {
    const hh = Math.tan(((cam.fov * Math.PI) / 180) / 2) * cam.position.z;
    const clientH = heroEl.clientHeight || 1;
    const f = Math.min(1, window.innerHeight / clientH); // on-screen fraction
    return {
      hw: hh * cam.aspect,
      hh,
      cy: hh * (1 - f), // world-y center of the on-screen region
      vhh: hh * f, // on-screen half-height in world units
    };
  }

  // Static 3-row grid, centred in the on-screen region. 13 icons split across
  // 3 rows with the leftover handed to the middle row -> [4, 5, 4].
  const ROWS = 3;
  const ROW_COUNTS = (() => {
    const n = ICONS.length;
    const c = Array.from({ length: ROWS }, () => Math.floor(n / ROWS));
    const order = [1, 0, 2]; // give extras to the middle row first
    for (let k = 0; k < n % ROWS; k++) c[order[k]]++;
    return c;
  })();
  const ROW_START = ROW_COUNTS.map((_, r) => ROW_COUNTS.slice(0, r).reduce((a, b) => a + b, 0));

  function gridPos(i: number, b: { hw: number; cy: number; vhh: number }) {
    let row = 0;
    while (row < ROWS - 1 && i >= ROW_START[row] + ROW_COUNTS[row]) row++;
    const col = i - ROW_START[row];
    const n = ROW_COUNTS[row];
    // Per-row horizontal offset so columns don't line up (no "column" look):
    // top row right, middle centred, bottom row left. The middle row is also a
    // touch narrower so its end icons (Next's black circle, Figma) stay in view.
    const isMid = row === 1;
    const stepX = b.hw * (isMid ? 0.4 : 0.46);
    const stagger = [0.28, 0, -0.2][row] * stepX;
    const x = (col - (n - 1) / 2) * stepX + stagger;
    const y = b.cy + ((ROWS - 1) / 2 - row) * b.vhh * 0.5;
    return new THREE.Vector3(x, y, 0);
  }

  function layout() {
    const b = viewBounds();
    items.forEach((o) => {
      const p = gridPos(o.userData.idx, b);
      o.userData.base.copy(p); // anchor: the loop floats each icon around this grid spot
      o.position.x = p.x;
    });
  }

  function spawn(cfg: IconCfg, i: number) {
    const make = (obj: THREE.Object3D) => {
      obj.userData = {
        idx: i,
        sp: 0.3 + Math.random() * 0.4,
        ph: Math.random() * 6.28,
        amp: 0.5, // up/down reach
        spX: 0.25 + Math.random() * 0.35,
        phX: Math.random() * 6.28,
        ampX: 0.5, // left/right reach
        base: gridPos(i, viewBounds()),
        rot: 0.15 + Math.random() * 0.25,
        baseScale: obj.scale.x, // 1 for extruded logos, 1.4 for GLTF models
      };
      obj.position.copy(obj.userData.base);
      obj.scale.setScalar(obj.userData.baseScale * kScale);
      scene.add(obj);
      items.push(obj);
    };
    if (cfg.model) {
      gltf.load(
        MODEL_DIR + cfg.model,
        (g) => {
          g.scene.scale.setScalar(1.4);
          make(g.scene);
        },
        undefined,
        () => make(buildLogo(cfg))
      );
    } else {
      make(buildLogo(cfg));
    }
  }
  ICONS.forEach(spawn);

  function resize() {
    const w = heroEl.clientWidth;
    const ht = heroEl.clientHeight;
    renderer.setSize(w, ht); // updateStyle=true: pin CSS size so retina (dpr>1) doesn't display the canvas at 2× and shove the scene off-centre
    cam.aspect = w / ht;
    cam.updateProjectionMatrix();
    kScale = respK();
    items.forEach((o) => o.scale.setScalar(o.userData.baseScale * kScale));
    layout();
  }
  // Re-fit whenever the hero actually changes size. Crucial because the Anton
  // web font loads late: the hero is shorter before it lands, taller after — a
  // one-shot layout would bake icon positions against the short height and let
  // the bottom of the ring fall below the fold once the font grows the headline.
  const ro = new ResizeObserver(resize);
  ro.observe(heroEl);
  if (document.fonts?.ready) document.fonts.ready.then(resize);
  resize();

  // Each icon floats + spins around its grid anchor; loop pauses off-screen.
  const clock = new THREE.Clock();
  let heroVisible = true;
  const io = new IntersectionObserver((es) => es.forEach((e) => (heroVisible = e.isIntersecting)));
  io.observe(heroEl);

  let raf = 0;
  function loop() {
    raf = requestAnimationFrame(loop);
    if (!heroVisible) return;
    const t = clock.getElapsedTime();
    items.forEach((o) => {
      const u = o.userData;
      o.position.y = u.base.y + Math.sin(t * u.sp + u.ph) * u.amp * kScale;
      o.position.x = u.base.x + Math.cos(t * u.spX + u.phX) * u.ampX * kScale;
      o.rotation.y = Math.sin(t * u.rot + u.ph) * 0.6;
      o.rotation.x = Math.cos(t * u.rot * 0.8 + u.ph) * 0.3;
    });
    renderer.render(scene, cam);
  }
  loop();

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    ro.disconnect();
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.geometry) m.geometry.dispose();
      const mat = m.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
      else if (mat) mat.dispose();
    });
    renderer.dispose();
  };
}
