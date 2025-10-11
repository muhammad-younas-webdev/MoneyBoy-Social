// floating-menu.js

/**
 * Initializes the GSAP animation and event listeners for the floating menu.
 */
function initializeFloatingMenu() {
  // Select the main elements using your data attributes
  const menuTrigger = document.querySelector("[data-floating-menu-triger]");
  const menuContainer = document.querySelector("[data-floating-menu-main]");
  const menuContentWrapper = menuContainer
    ? menuContainer.querySelector(".menu-content-wrapper")
    : null;
  const menuCloseBtn = menuContainer
    ? menuContainer.querySelector("[data-floating-menu-close-btn]")
    : null;

  // Graceful exit if required elements are missing
  if (!menuTrigger || !menuContainer || !menuContentWrapper || !menuCloseBtn) {
    console.warn(
      "Floating Menu initialization aborted: Missing trigger, container, or close button."
    );
    return;
  }

  // --- 1. GSAP Timeline Setup ---

  // Create the master timeline, paused by default (closed state)
  const menuTimeline = gsap.timeline({
    paused: true,
    reversed: true, // Start in the reversed (closed) state
    defaults: {
      duration: 0.45, // Smooth duration for the slide
      ease: "power3.inOut",
    },
    // Action to take when the timeline starts playing forward (opening)
    onStart: () => {
      // Make the container visible *before* the animation starts
      menuContainer.style.display = "block";
    },
    // Action to take when the timeline completes its reverse (closing)
    onReverseComplete: () => {
      // Hide the container completely after the animation finishes
      menuContainer.style.display = "none";
    },
  });

  // --- 2. Define Animation Steps ---

  // Step 1: Fade in the semi-transparent overlay (the main container)
  // We target the main container's opacity. Since CSS has display: none,
  // we use a separate GSAP set/to sequence.
  menuTimeline.fromTo(
    menuContainer,
    { opacity: 0 },
    { opacity: 1, duration: 0.35, ease: "linear" },
    0 // Start this step immediately
  );

  // Step 2: Slide the content wrapper from the right
  // The wrapper has fixed positioning, so we use x translation.
  // The width is 333px, so start it fully off-screen.
  menuTimeline.fromTo(
    menuContentWrapper,
    { x: "100%" },
    { x: "0%", duration: 0.45, ease: "power3.out" },
    0.05 // Start slightly after the overlay begins to fade for visual layering
  );

  // --- 3. Event Listeners ---

  /**
   * Toggles the menu open or closed by playing/reversing the timeline.
   * @param {boolean} forceOpen - Forces the menu state (true for open, false for close).
   */
  const toggleMenu = (forceOpen) => {
    const isCurrentlyOpen = !menuTimeline.reversed();

    if (forceOpen === true && !isCurrentlyOpen) {
      menuTimeline.play();
    } else if (forceOpen === false && isCurrentlyOpen) {
      menuTimeline.reverse();
    } else if (forceOpen === undefined) {
      menuTimeline.reversed() ? menuTimeline.play() : menuTimeline.reverse();
    }
  };

  // Open Menu on Trigger Click
  menuTrigger.addEventListener("click", () => {
    toggleMenu(true);
  });

  // Close Menu on Close Button Click
  menuCloseBtn.addEventListener("click", () => {
    toggleMenu(false);
  });

  // Close Menu on Overlay Click (Click outside the content wrapper)
  menuContainer.addEventListener("click", (e) => {
    // Only close if the click target is the container itself, not any of its children
    if (e.target === menuContainer) {
      toggleMenu(false);
    }
  });

  console.log("Floating Menu Initialized.");
}

// ----------------------------------------------------
// Initialization Logic (Ensures DOM and GSAP are ready)
// ----------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  // Use the global function defined in your cdns.js file to wait for GSAP
  if (window.whenGsapReady) {
    window.whenGsapReady(initializeFloatingMenu);
  } else {
    console.error(
      "The 'whenGsapReady' function is missing. Floating Menu initialization aborted."
    );
  }
});
