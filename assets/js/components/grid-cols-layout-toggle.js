// grid-toggle.js

/**
 * Sets up the grid layout toggle functionality for a single container.
 * @param {HTMLElement} mainContainer - The root element with data-multi-dem-cards-layout.
 */
function setupGridLayoutToggle(mainContainer) {
  const buttonWrapper = mainContainer.querySelector(
    "[data-multi-dem-cards-layout-btns]"
  );
  const gridWrapper = mainContainer.querySelector(
    ".multi-dem-cards-wrapper-layout"
  );

  // Check 1: Ensure both essential elements (button container and grid) exist within the main wrapper
  if (!buttonWrapper || !gridWrapper) {
    console.warn(
      "Grid Toggle Setup aborted for container:",
      mainContainer,
      "Missing button wrapper or grid wrapper."
    );
    return;
  }

  const toggleButtons = buttonWrapper.querySelectorAll(
    ".creator-content-grid-layout-btn"
  );

  // Check 2: Ensure there are exactly two buttons to handle the toggle state
  if (toggleButtons.length !== 2) {
    console.warn(
      "Grid Toggle Setup aborted for container:",
      mainContainer,
      "Expected 2 toggle buttons, found:",
      toggleButtons.length
    );
    return;
  }

  const defaultLayoutButton = toggleButtons[0];
  const toggledLayoutButton = toggleButtons[1];

  /**
   * Handles the click event on a layout button to toggle the grid columns.
   * @param {HTMLElement} clickedButton - The button element that was clicked.
   */
  function handleLayoutToggle(clickedButton) {
    const layoutAttribute = "data-layout-toggle-rows";

    // --- Handle Grid Wrapper Attribute ---
    if (clickedButton === toggledLayoutButton) {
      // Switch to the 2-column layout
      gridWrapper.setAttribute(layoutAttribute, "");
    } else if (clickedButton === defaultLayoutButton) {
      // Switch back to the 4-column layout
      gridWrapper.removeAttribute(layoutAttribute);
    }

    // --- Handle Button Active State ---

    // Remove the active attribute from ALL buttons
    toggleButtons.forEach((btn) => {
      btn.removeAttribute("data__active");
    });

    // Add the active attribute to the clicked button
    clickedButton.setAttribute("data__active", "");
  }

  // Attach click listeners to all buttons
  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      handleLayoutToggle(button);
    });
  });

  console.log("Grid Layout Toggle Initialized for container:", mainContainer);
}

/**
 * Initializes all grid layout toggle containers found on the page.
 */
function initializeGridLayoutToggle() {
  // Select ALL grid containers on the page
  const allContainers = document.querySelectorAll(
    "[data-multi-dem-cards-layout]"
  );

  // Error Handling: If no containers are found, log a message and exit gracefully.
  if (allContainers.length === 0) {
    console.log(
      "Grid Toggle Initialization skipped: No main containers found on the page."
    );
    return;
  }

  // Loop through every container and set up the toggle logic
  allContainers.forEach((container) => {
    setupGridLayoutToggle(container);
  });
}

// ----------------------------------------------------
// Initialization Logic (Ensure DOM is ready)
// ----------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  // Use the GSAP readiness check for consistency, or fall back to direct call
  if (window.whenGsapReady) {
    window.whenGsapReady(initializeGridLayoutToggle);
  } else {
    initializeGridLayoutToggle();
  }
});
