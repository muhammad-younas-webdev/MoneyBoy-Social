// // grid-toggle.js

// /**
//  * Initializes the grid layout toggle functionality.
//  */
// function initializeGridLayoutToggle() {
//   // 1. Select the main container that holds both the buttons and the grid
//   const mainContainer = document.querySelector("[data-multi-dem-cards-layout]");

//   // Graceful exit if the container isn't found
//   if (!mainContainer) {
//     console.log(
//       "Grid Toggle Initialization skipped: Main container [data-multi-dem-cards-layout] not found."
//     );
//     return;
//   }

//   // 2. Select the button wrapper and the grid wrapper
//   const buttonWrapper = mainContainer.querySelector(
//     "[data-multi-dem-cards-layout-btns]"
//   );
//   const gridWrapper = mainContainer.querySelector(
//     ".multi-dem-cards-wrapper-layout"
//   );

//   // Graceful exit if essential elements are missing
//   if (!buttonWrapper || !gridWrapper) {
//     console.warn(
//       "Grid Toggle Initialization aborted: Missing button wrapper or grid wrapper."
//     );
//     return;
//   }

//   // 3. Select all toggle buttons
//   const toggleButtons = buttonWrapper.querySelectorAll(
//     ".creator-content-grid-layout-btn"
//   );

//   if (toggleButtons.length < 2) {
//     console.warn(
//       "Grid Toggle Initialization aborted: Less than two toggle buttons found."
//     );
//     return;
//   }

//   /**
//    * Handles the click event on a layout button to toggle the grid columns.
//    * @param {HTMLElement} clickedButton - The button element that was clicked.
//    */
//   function handleLayoutToggle(clickedButton) {
//     // Determine which layout the clicked button represents.
//     // The first button toggles TO the default (4 cols, no attribute).
//     // The second button toggles TO the toggled state (2 cols, with attribute).
//     const isDefaultLayoutButton = clickedButton === toggleButtons[0];
//     const isToggledLayoutButton = clickedButton === toggleButtons[1];

//     // --- 4. Handle Grid Wrapper Attribute ---
//     const layoutAttribute = "data-layout-toggle-rows";

//     if (isToggledLayoutButton) {
//       // Apply the attribute to switch to 2 columns
//       gridWrapper.setAttribute(layoutAttribute, "");
//     } else if (isDefaultLayoutButton) {
//       // Remove the attribute to switch back to 4 columns
//       gridWrapper.removeAttribute(layoutAttribute);
//     }

//     // --- 5. Handle Button Active State ---

//     // Remove the active attribute from ALL buttons
//     toggleButtons.forEach((btn) => {
//       btn.removeAttribute("data__active");
//     });

//     // Add the active attribute to the clicked button
//     clickedButton.setAttribute("data__active", "");
//   }

//   // 6. Attach click listeners to all buttons
//   toggleButtons.forEach((button) => {
//     button.addEventListener("click", () => {
//       handleLayoutToggle(button);
//     });
//   });

//   console.log("Grid Layout Toggle Initialized.");
// }

// // ----------------------------------------------------
// // Initialization Logic (Ensure DOM is ready)
// // ----------------------------------------------------

// document.addEventListener("DOMContentLoaded", () => {
//   // Since this logic doesn't depend on GSAP, we can call it directly on DOMContentLoaded.
//   // However, if you want to use the same system as your other files:
//   if (window.whenGsapReady) {
//     window.whenGsapReady(initializeGridLayoutToggle);
//   } else {
//     // Simple DOM check fallback if your cdns.js isn't used here
//     initializeGridLayoutToggle();
//   }
// });

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
