export function initProjectHeroLines() {
  document.addEventListener("DOMContentLoaded", setupHeroLines);

  if (document.readyState !== "loading") {
    setupHeroLines();
  }

  window.addEventListener("resize", setupHeroLines);
}

function setupHeroLines() {
  const lineSpacing = 10;
  const lineContainer = document.getElementById("lineGrid");
  if (!lineContainer) return;

  const wrapper = lineContainer.closest(".project-hero-wrapper");
  if (!wrapper) return;

  // Clear existing lines
  lineContainer.innerHTML = "";

  const height = wrapper.offsetHeight;
  const count = Math.floor(height / lineSpacing);

  for (let i = 0; i < count; i++) {
    const lineWrapper = document.createElement("div");
    lineWrapper.className = "line-wrapper";

    const line = document.createElement("div");
    line.className = "line";

    lineWrapper.appendChild(line);
    lineContainer.appendChild(lineWrapper);
  }
}
