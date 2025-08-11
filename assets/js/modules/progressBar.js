import { throttle } from "../utils.js";

let cleanup;
export function progressScroll() {
  const bar = document.querySelector(".scroll-indicator-bar");
  const border = document.querySelector(".glass-border");
  const scroller = document.querySelector(".docs-progress-wrapper");

  if (!bar || !border || !scroller) return; // lists will bail out

  if (cleanup) cleanup();

  const THROTTLE_MS = 20,
    EASE = 0.2,
    SHIFT = 2.5;
  let cur = 0;
  const lerp = (a, b, t) => a + (b - a) * t;

  const update = () => {
    const max = scroller.scrollHeight - scroller.clientHeight;
    const ratio = max > 0 ? scroller.scrollTop / max : 0;
    const target = Math.min(Math.max(ratio, 0), 1) * 100;
    cur = lerp(cur, target, EASE);
    bar.style.width = `${cur}%`;
    border.style.backgroundPosition = `${cur * SHIFT}% 50%`;
  };

  const onScroll = throttle(update, THROTTLE_MS);
  scroller.addEventListener("scroll", onScroll);
  cleanup = () => scroller.removeEventListener("scroll", onScroll);
  update();
}
