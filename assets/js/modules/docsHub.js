import { initializeContent } from "../main.js";

let docsHubInitialized = false;

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function docsHub() {
  if (docsHubInitialized) return;

  const scrollContainer = document.querySelector(".docs-progress-wrapper");
  const mainContent = document.getElementById("docs-main");
  const nav = document.querySelector(".docs-progress");
  const tocContainer = document.getElementById("docs-toc");

  if (!scrollContainer || !mainContent || !nav || !tocContainer) return;

  docsHubInitialized = true;

  function setSectionState(section, shouldBeExpanded) {
    if (!section) return;
    const button = section.querySelector(":scope > .nav-section-toggle");
    const content = section.querySelector(":scope > .nav-section-content");
    if (!button || !content) return;
    section.classList.toggle("expanded", shouldBeExpanded);
    content.classList.toggle("collapsed", !shouldBeExpanded);
    button.setAttribute("aria-expanded", String(shouldBeExpanded));
  }

  function updateNavActiveState(currentPath) {
    const normalizedPath = currentPath.endsWith("/")
      ? currentPath
      : `${currentPath}/`;
    let elementToExpose = null;
    nav
      .querySelectorAll(".active")
      .forEach((el) => el.classList.remove("active"));
    const activeLink = nav.querySelector(
      `.progress-link[href="${normalizedPath}"]`,
    );
    if (activeLink) {
      activeLink.classList.add("active");
      elementToExpose = activeLink;
    } else {
      const activeToggle = nav.querySelector(
        `.nav-section-toggle[data-path="${normalizedPath}"]`,
      );
      if (activeToggle) {
        activeToggle.classList.add("active");
        elementToExpose = activeToggle;
      }
    }
    if (elementToExpose) {
      let parentSection = elementToExpose.closest(".nav-section");
      while (parentSection) {
        setSectionState(parentSection, true);
        parentSection = parentSection.parentElement.closest(".nav-section");
      }
    }
  }

  function buildAndObserveTOC(article) {
    if (window.tocCleanup) window.tocCleanup();

    tocContainer.innerHTML = "";
    const headings = Array.from(article.querySelectorAll("h2[id], h3[id]"));
    if (headings.length < 1) return;

    const tocList = document.createElement("ul");
    tocList.className = "toc-list";
    headings.forEach((h) => {
      const li = document.createElement("li");
      li.className = `toc-item toc-${h.tagName.toLowerCase()}`;
      li.innerHTML = `<a href="#${h.id}" data-heading-id="${h.id}">${h.textContent}</a>`;
      tocList.appendChild(li);
    });
    tocContainer.appendChild(tocList);

    const tocLinks = Array.from(tocContainer.querySelectorAll("a"));
    const offset = 150;

    const updateActiveTOC = () => {
      const scrollY = scrollContainer.scrollTop;
      let activeHeading = null;

      for (let i = headings.length - 1; i >= 0; i--) {
        if (headings[i].offsetTop <= scrollY + offset) {
          activeHeading = headings[i];
          break;
        }
      }

      if (!activeHeading && headings.length > 0) {
        activeHeading = headings[0];
      }

      let activeTocItem = null;
      tocLinks.forEach((link) => {
        const isActive =
          activeHeading && link.dataset.headingId === activeHeading.id;
        link.classList.toggle("active", isActive);
        if (isActive) {
          activeTocItem = link.closest(".toc-item");
        }
      });

      if (activeTocItem) {
        const containerRect = tocContainer.getBoundingClientRect();
        const itemRect = activeTocItem.getBoundingClientRect();
        if (
          itemRect.top < containerRect.top ||
          itemRect.bottom > containerRect.bottom
        ) {
          tocContainer.scrollTo({
            top:
              activeTocItem.offsetTop -
              containerRect.height / 2 +
              itemRect.height / 2,
            behavior: "smooth",
          });
        }
      }
    };

    const tocClickHandler = (e) => {
      const link = e.target.closest("a[data-heading-id]");
      if (link) {
        e.preventDefault();
        const targetHeading = document.getElementById(link.dataset.headingId);
        if (targetHeading) {
          const targetY = targetHeading.offsetTop - (offset - 50);
          scrollContainer.scrollTo({ top: targetY, behavior: "smooth" });
          history.pushState(null, "", `#${link.dataset.headingId}`);
        }
      }
    };

    const throttledUpdate = throttle(updateActiveTOC, 50);
    scrollContainer.addEventListener("scroll", throttledUpdate);
    tocContainer.addEventListener("click", tocClickHandler);

    window.tocCleanup = () => {
      scrollContainer.removeEventListener("scroll", throttledUpdate);
      tocContainer.removeEventListener("click", tocClickHandler);
    };

    updateActiveTOC();
  }

  async function loadArticle(href, pushState = true) {
    mainContent.classList.add("loading");
    if (window.tocCleanup) window.tocCleanup();
    try {
      const response = await fetch(href);
      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
      const text = await response.text();
      const newDoc = new DOMParser().parseFromString(text, "text/html");
      const newArticle = newDoc.querySelector("#docs-main .doc-article");
      const newTitle = newDoc.title;
      if (!newArticle) throw new Error("Could not find article content.");
      if (pushState) history.pushState({ path: href }, newTitle, href);
      document.title = newTitle;
      mainContent.querySelector(".doc-article").replaceWith(newArticle);
      initializeContent(mainContent);
      updateNavActiveState(href);
      buildAndObserveTOC(newArticle);
    } catch (err) {
      console.error("Failed to load article:", err);
    } finally {
      mainContent.classList.remove("loading");
    }
  }

  nav.addEventListener("click", function (event) {
    const toggleButton = event.target.closest(".nav-section-toggle");
    if (toggleButton) {
      event.preventDefault();
      const section = toggleButton.closest(".nav-section");
      if (section)
        setSectionState(section, !section.classList.contains("expanded"));
      return;
    }
    const link = event.target.closest(".progress-link");
    if (link) {
      event.preventDefault();
      loadArticle(link.getAttribute("href"));
      return;
    }
  });

  window.addEventListener("popstate", (event) => {
    const path = event.state?.path || "/docs/";
    loadArticle(path, false);
  });

  const initialArticle = mainContent.querySelector(".doc-article");
  if (initialArticle) buildAndObserveTOC(initialArticle);
  updateNavActiveState(window.location.pathname);
}
