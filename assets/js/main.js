// import { initSiteSearch } from "./modules/search.js";
import { initHeaderScroll } from "./modules/headerScroll.js";
import { initCallouts } from "./modules/callouts.js";
import { initCodeDecor } from "./modules/codeDecor.js";
import { initHeaderAnchors } from "./modules/headerAnchors.js";
import { initSmoothScroll } from "./modules/smoothScroll.js";
import { initCodeLineHover } from "./modules/codeLineHover.js";
import { enableDatablockSort } from "./modules/datablockSort.js";
import { enableLanguageStackTooltips } from "./modules/languageStack.js";
import { progressScroll } from "./modules/progressBar.js";
import { initTimelineLines } from "./modules/verticalTimelines.js";
import { initHexagonPillars } from "./modules/pillarsHexagon.js";
import { hamburgerMenu } from "./modules/hamburgerMenu.js";
import { autonumberHeadings } from "./modules/autonumberHeadings.js";
import { enableTableOverflowFade } from "./modules/enableTableOverflowFade.js";
import { enableTocFadeEffect } from "./modules/enableTocFadeEffect.js";
import { tocTotree } from "./modules/tocToTree.js";
import { decorateHeader } from "./modules/decorateHeader.js";
import { docsHub } from "./modules/docsHub.js";
import { initProjectHeroLines } from "./modules/initProjectHeroLines.js";

export function initializeContent(container = document) {
  // Content-specific modules that need to run on new content
  initCallouts(container);
  initCodeDecor(container);
  initCodeLineHover(container);
  autonumberHeadings(container);
  initHeaderAnchors(container);
  enableTableOverflowFade(container);
  enableDatablockSort(container);
  initTimelineLines(container);
  // decorateHeader(container);
}

// Global initialization (runs once for the entire page)
function initializeGlobal() {
  // Header and navigation
  initHeaderScroll();
  hamburgerMenu();

  // Global UI features
  initSmoothScroll();
  progressScroll();

  // Global components
  enableLanguageStackTooltips();
  initHexagonPillars();
  enableTocFadeEffect();
  tocTotree();
  initProjectHeroLines();

  // Docs system
  docsHub();
}

function boot() {
  initializeGlobal();
  initializeContent();
}

document.addEventListener("DOMContentLoaded", boot);
