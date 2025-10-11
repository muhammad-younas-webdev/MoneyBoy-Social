// advanced-filters.js

/**
 * Main function to initialize the advanced filter toggle logic.
 */
function initializeAdvancedFilters() {
  const filterWrappers = document.querySelectorAll(
    "[data-content-advanced-filters-container]"
  );

  if (filterWrappers.length === 0) {
    console.log("No advanced filter containers found on this page.");
    return;
  }

  filterWrappers.forEach((wrapper) => {
    const toggleButton = wrapper.querySelector(
      "[data-content-advanced-filters-toggle-button]"
    );
    const filterContainer = wrapper.querySelector(
      "[data-content-advanced-filters]"
    );

    // --- NEW: Target the SVG element inside the button ---
    const toggleSvg = toggleButton ? toggleButton.querySelector("svg") : null;

    if (toggleButton && filterContainer && toggleSvg) {
      // Check that the SVG exists

      // 3. Initial Setup: Set the container to be hidden
      gsap.set(filterContainer, { height: 0, opacity: 0, display: "none" });

      // 4. Define the unique toggle function for this pair
      const toggleFilters = () => {
        const isOpen = filterContainer.classList.contains("is-open");

        if (isOpen) {
          // CLOSE the container
          gsap.to(filterContainer, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
            onComplete: () => {
              filterContainer.style.display = "none";
            },
          });

          // --- SVG Rotation: CLOSE (Rotate back to 0 degrees) ---
          gsap.to(toggleSvg, {
            rotation: 0,
            duration: 0.3,
            ease: "power2.inOut",
          });

          // Remove the 'is-open' class from both elements
          filterContainer.classList.remove("is-open");
          toggleButton.classList.remove("is-open");
        } else {
          // OPEN the container

          // --- SVG Rotation: OPEN (Rotate 45 degrees to make the 'X' look like a '-') ---
          gsap.to(toggleSvg, {
            rotation: 45, // Rotate 45 degrees
            duration: 0.3,
            ease: "power2.inOut",
          });

          // a. Set display to 'block' *before* calculating height
          filterContainer.style.display = "block";
          // b. Get the calculated natural height of the content
          const autoHeight = filterContainer.scrollHeight;

          gsap.fromTo(
            filterContainer,
            { height: 0, opacity: 0 }, // Start state
            {
              height: autoHeight, // Animate to its natural height
              opacity: 1,
              duration: 0.3,
              ease: "power2.inOut",
              onComplete: () => {
                // c. Set height back to 'auto' for natural responsiveness
                filterContainer.style.height = "auto";
              },
            }
          );

          // Add the 'is-open' class to both elements
          filterContainer.classList.add("is-open");
          toggleButton.classList.add("is-open");
        }
      };

      // 5. Attach the click listener to the specific button
      toggleButton.addEventListener("click", toggleFilters);
    } else {
      console.warn(
        "A wrapper element was found, but it is missing the button, content container, or SVG:",
        wrapper
      );
    }
  });
}

// ----------------------------------------------------
// Initialization Logic (Ensures DOM and GSAP are ready)
// ----------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  if (window.whenGsapReady) {
    window.whenGsapReady(initializeAdvancedFilters);
  } else {
    console.error(
      "The 'whenGsapReady' function is missing. Advanced filter initialization aborted."
    );
  }
});
