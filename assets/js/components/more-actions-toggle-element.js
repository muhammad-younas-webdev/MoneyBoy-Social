// popup-toggle.js

// -------------------------------------------------------------------
// 1. CONFIGURATION & CONSTANTS
// -------------------------------------------------------------------
const MOBILE_BREAKPOINT = 620; // in pixels

const POPUP_WRAPPER_ATTR = "[data-more-actions-toggle-element]";
const POPUP_TRIGGER_CLASS = ".rel-user-more-opts-trigger-icon";
const POPUP_ELEMENT_CLASS = ".rel-users-more-opts-popup-wrapper";
const CLOSING_ACTION_TAG = "LI";
const OVERLAY_CLASS_NAME = "mobile-popup-overlay";

const popupTimelines = new Map(); // Key: wrapper element, Value: { tl: gsap.Timeline, isMobileState: boolean }

// -------------------------------------------------------------------
// 2. UTILITY FUNCTIONS
// -------------------------------------------------------------------

const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

function createOverlay() {
  const existingOverlay = document.querySelector(`.${OVERLAY_CLASS_NAME}`);
  if (existingOverlay) return;

  const overlay = document.createElement("div");
  overlay.className = OVERLAY_CLASS_NAME;

  // INLINE CSS STYLES FOR OVERLAY
  gsap.set(overlay, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 999,
    opacity: 0,
    pointerEvents: "none",
  });

  document.body.appendChild(overlay);

  gsap.to(overlay, {
    duration: 0.25,
    opacity: 1,
    pointerEvents: "auto",
  });
}

function destroyOverlay() {
  const overlay = document.querySelector(`.${OVERLAY_CLASS_NAME}`);
  if (overlay) {
    gsap.to(overlay, {
      duration: 0.25,
      opacity: 0,
      pointerEvents: "none",
      onComplete: () => overlay.remove(),
    });
  }
}

// -------------------------------------------------------------------
// 3. ANIMATION DEFINITION
// -------------------------------------------------------------------

const createTimeline = (popupEl) => {
  if (isMobile()) {
    // --- MOBILE FADE-UP EFFECT ---

    // Setup the initial state with FIXED positioning
    gsap.set(popupEl, {
      y: "100%",
      opacity: 0,
      display: "none",

      position: "fixed", // CRITICAL: Fixed for mobile
      left: "0%",
      bottom: "25px",
      width: "100%",
      transform: "none",
      zIndex: 1000,
    });

    const tl = gsap.timeline({
      paused: true,
      reversed: true,
      defaults: { duration: 0.35, ease: "power3.out" },
      onStart: () => {
        gsap.set(popupEl, { display: "block" });
        popupEl.closest(POPUP_WRAPPER_ATTR).setAttribute("data-active", "");
      },
      onReverseComplete: () => {
        // Cleanup: Clear all relevant inline styles to prevent state bleed
        gsap.set(popupEl, {
          display: "none",
          // Use clearProps to wipe all GSAP-applied inline styles when closed
          clearProps:
            "position, left, bottom, width, transform, zIndex, opacity, y, display, height, overflow",
        });

        popupEl.closest(POPUP_WRAPPER_ATTR).removeAttribute("data-active");
      },
    });

    tl.to(popupEl, { y: 0, opacity: 1 }, 0);

    return tl;
  } else {
    // --- DESKTOP SLIDE-DOWN EFFECT ---

    // Setup initial state for desktop (ABSOLUTE positioning)
    gsap.set(popupEl, {
      height: 0,
      y: -10,
      opacity: 0,
      display: "none",
      overflow: "hidden",

      // Restore default desktop/dropdown styles
      position: "absolute", // CRITICAL: Absolute for desktop
      left: "auto",
      bottom: "auto",
      width: "auto",
      transform: "none",
      // zIndex: 'auto',
      // Ensure no mobile styles linger before running desktop setup
      clearProps:
        "position, left, bottom, width, transform, zIndex, opacity, y, display, height, overflow",
    });

    const tl = gsap.timeline({
      paused: true,
      reversed: true,
      defaults: { duration: 0.25, ease: "power2.out" },
      onStart: () => {
        gsap.set(popupEl, { display: "flex" });
        popupEl.closest(POPUP_WRAPPER_ATTR).setAttribute("data-active", "");
      },
      onReverseComplete: () => {
        gsap.set(popupEl, { display: "none" });
        popupEl.closest(POPUP_WRAPPER_ATTR).removeAttribute("data-active");
      },
    });

    tl.to(popupEl, { height: "auto", opacity: 1, y: 0 }, 0);
    tl.set(popupEl, { overflow: "visible" });

    return tl;
  }
};

// -------------------------------------------------------------------
// 4. CORE LOGIC FUNCTIONS
// -------------------------------------------------------------------

const closePopup = (wrapper) => {
  const item = popupTimelines.get(wrapper);
  if (!item || !item.tl) return;

  if (item.tl.progress() > 0) {
    item.tl.reverse();

    // FIX: Destroy the overlay when a single popup is closed (e.g., via option click)
    if (isMobile()) {
      destroyOverlay();
    }
  }
};

const closeAllPopups = (exceptWrapper = null) => {
  let shouldDestroyOverlay = true;

  popupTimelines.forEach((item, wrapper) => {
    if (wrapper !== exceptWrapper) {
      if (item.tl.progress() > 0) {
        item.tl.reverse();
      }
    } else if (item.tl.progress() > 0) {
      shouldDestroyOverlay = false;
    }
  });

  // This handles the 'click outside' scenario
  if (isMobile() && shouldDestroyOverlay) {
    destroyOverlay();
  }

  // Ensure data-active is removed from *all* if we close globally (e.g., via resize)
  if (exceptWrapper === null) {
    document
      .querySelectorAll(`${POPUP_WRAPPER_ATTR}[data-active]`)
      .forEach((el) => {
        el.removeAttribute("data-active");
      });
  }
};

const handleToggle = (e) => {
  e.preventDefault();
  e.stopPropagation();

  const wrapper = e.currentTarget.closest(POPUP_WRAPPER_ATTR);
  const popupEl = wrapper.querySelector(POPUP_ELEMENT_CLASS);
  if (!popupEl) return;

  const currentMobileState = isMobile();
  let item = popupTimelines.get(wrapper);
  let tl;

  // Check if the timeline is missing or the screen state has changed
  if (!item || item.isMobileState !== currentMobileState) {
    // Re-create the timeline with correct state
    tl = createTimeline(popupEl);
    item = { tl: tl, isMobileState: currentMobileState };
    popupTimelines.set(wrapper, item);
  }

  tl = item.tl;
  const isCurrentlyOpen = tl.progress() > 0;

  if (isCurrentlyOpen) {
    closePopup(wrapper);
  } else {
    closeAllPopups(wrapper);
    if (currentMobileState) {
      createOverlay();
    }
    tl.play();
  }
};

// -------------------------------------------------------------------
// 5. MAIN INITIALIZATION LOGIC & EVENT LISTENERS
// -------------------------------------------------------------------

function setupListeners(wrapper) {
  const triggerBtn = wrapper.querySelector(POPUP_TRIGGER_CLASS);
  const popupEl = wrapper.querySelector(POPUP_ELEMENT_CLASS);
  if (!triggerBtn || !popupEl) return;

  // 1. Create the initial timeline
  const tl = createTimeline(popupEl);
  popupTimelines.set(wrapper, { tl: tl, isMobileState: isMobile() });

  // 2. Add the main toggle listener
  triggerBtn.removeEventListener("click", handleToggle);
  triggerBtn.addEventListener("click", handleToggle);

  // 3. Add listener to close when an action (LI) inside is clicked
  popupEl.addEventListener("click", (e) => {
    if (e.target.closest(CLOSING_ACTION_TAG)) {
      e.stopPropagation();
      // This calls closePopup, which now correctly destroys the overlay
      closePopup(wrapper);
    }
  });
}

function initializePopups() {
  const popupWrappers = document.querySelectorAll(POPUP_WRAPPER_ATTR);

  popupTimelines.clear();
  destroyOverlay();

  // CRITICAL FIX: Manually clear the position property on all popups
  // before re-initialization to prevent state bleed from the previous view.
  popupWrappers.forEach((wrapper) => {
    const popupEl = wrapper.querySelector(POPUP_ELEMENT_CLASS);
    if (popupEl) {
      popupEl.style.position = ""; // Remove inline position style
    }
  });

  // Ensure all data-active attributes are cleared on initialization
  document
    .querySelectorAll(`${POPUP_WRAPPER_ATTR}[data-active]`)
    .forEach((el) => el.removeAttribute("data-active"));

  popupWrappers.forEach(setupListeners);

  // Add the global click-outside-to-close listener
  document.removeEventListener("click", closeAllPopupsListener);
  document.addEventListener("click", closeAllPopupsListener);

  // Handle window resize
  window.removeEventListener("resize", resizeHandler);
  window.addEventListener("resize", resizeHandler);

  console.log(
    `Initialized ${popupWrappers.length} popup toggle component(s) with responsive logic.`
  );
}

const closeAllPopupsListener = (e) => {
  if (
    !e.target.closest(POPUP_WRAPPER_ATTR) ||
    e.target.closest(`.${OVERLAY_CLASS_NAME}`)
  ) {
    closeAllPopups(null);
  }
};

let resizeTimeout;
const resizeHandler = () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // CRITICAL FIX: Close all popups immediately when resizing starts
    closeAllPopups(null);
    // Then re-run initialization to swap animation types/styles
    initializePopups();
  }, 150);
};

// -------------------------------------------------------------------
// 6. ROBUST GSAP WAITING LOGIC
// -------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const maxAttempts = 20;
  let attempts = 0;

  function tryInitialize() {
    if (typeof gsap !== "undefined") {
      initializePopups();
    } else if (attempts < maxAttempts) {
      attempts++;
      setTimeout(tryInitialize, 100);
    } else {
      console.error(
        "GSAP failed to load within the timeout period. Initialization aborted."
      );
    }
  }

  tryInitialize();
});
