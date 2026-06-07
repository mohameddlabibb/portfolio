import { useEffect } from "react";
import { initScene } from "../v11/scene";
import { initMotion } from "../v11/motion";

/**
 * Boots the v11 imperative layer (Three.js hero scene + GSAP/Lenis motion)
 * after the React tree has mounted, and tears everything down on unmount so it
 * survives React StrictMode's dev double-mount.
 */
export function useV11() {
  useEffect(() => {
    const canvas = document.getElementById("scene") as HTMLCanvasElement | null;
    const hero = document.querySelector<HTMLElement>(".hero");

    const cleanups: Array<() => void> = [];
    if (canvas && hero) cleanups.push(initScene(canvas, hero));
    cleanups.push(initMotion());

    return () => cleanups.forEach((fn) => fn());
  }, []);
}
