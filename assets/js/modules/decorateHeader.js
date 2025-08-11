export function decorateHeader(container = document) {
  const searchContainer =
    container.querySelector(".doc-article") ||
    container.querySelector(".single-content") ||
    (container === document ? document.querySelector(".single-content") : null);

  if (!searchContainer) return;

  const h2s = searchContainer.querySelectorAll("h2");
  if (h2s.length <= 1) return;

  h2s.forEach((h2, index) => {
    if (index === 0) return;

    // Check if decoration already exists
    const prevElement = h2.previousElementSibling;
    if (prevElement && prevElement.classList.contains("h2-divider")) {
      return; // Skip if already decorated
    }

    const line = document.createElement("div");
    line.className = "h2-divider";
    line.innerHTML = "<span></span><span>§</span><span></span>";
    h2.parentNode.insertBefore(line, h2);
  });
}
