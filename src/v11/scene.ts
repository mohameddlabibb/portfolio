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
        depth: 14,
        bevelEnabled: true,
        bevelThickness: 2,
        bevelSize: 1.1,
        bevelSegments: 2,
      });
      geo.computeBoundingBox();
      const bb = geo.boundingBox!;
      const sz = new THREE.Vector3();
      bb.getSize(sz);
      geo.translate(-(bb.max.x + bb.min.x) / 2, -(bb.max.y + bb.min.y) / 2, -(bb.max.z + bb.min.z) / 2);
      const s = 1.15 / Math.max(sz.x, sz.y);
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

  // visible world half-extents at the icon plane (z = 0); depends on aspect
  function viewBounds() {
    const hh = Math.tan(((cam.fov * Math.PI) / 180) / 2) * cam.position.z;
    return { hw: hh * cam.aspect, hh };
  }

  // every icon gets its own slot on an ellipse hugging the hero edges, so each
  // one sits in the negative space around the headline instead of behind the
  // opaque text — guarantees all of them stay visible. The slight tilt keeps an
  // icon off the dead-center top/bottom (where the solid headline lines live).
  function slot(i: number, b: { hw: number; hh: number }) {
    const n = ICONS.length;
    const ang = -Math.PI / 2 + 0.18 + ((i + 0.5) / n) * Math.PI * 2;
    return new THREE.Vector3(Math.cos(ang) * b.hw * 0.9, Math.sin(ang) * b.hh * 0.82, 0);
  }

  function layout() {
    const b = viewBounds();
    items.forEach((o) => {
      const p = slot(o.userData.idx, b);
      o.userData.base.copy(p);
      o.position.x = p.x;
    });
  }

  function spawn(cfg: IconCfg, i: number) {
    const make = (obj: THREE.Object3D) => {
      obj.userData = {
        idx: i,
        sp: 0.3 + Math.random() * 0.4,
        ph: Math.random() * 6.28,
        amp: 0.28,
        base: slot(i, viewBounds()),
        rot: 0.15 + Math.random() * 0.25,
      };
      obj.position.copy(obj.userData.base);
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
    renderer.setSize(w, ht, false);
    cam.aspect = w / ht;
    cam.updateProjectionMatrix();
    layout();
  }
  window.addEventListener("resize", resize);
  resize();

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
      o.position.y = u.base.y + Math.sin(t * u.sp + u.ph) * u.amp;
      o.rotation.y = Math.sin(t * u.rot + u.ph) * 0.6;
      o.rotation.x = Math.cos(t * u.rot * 0.8 + u.ph) * 0.3;
    });
    renderer.render(scene, cam);
  }
  loop();

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    io.disconnect();
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
