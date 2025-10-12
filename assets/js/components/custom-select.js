// custom-select.js

/**
 * Global array to store references to all active custom select elements for management.
 * @type {Array<Object>}
 */
const activeSelects = [];

// -------------------------------------------------------------------
// GSAP and Utility Functions
// -------------------------------------------------------------------

/**
 * Sets up the GSAP animation timeline for a single custom select dropdown.
 * @param {HTMLElement} dropdown - The dropdown element ([data-custom-select-dropdown]).
 * @param {HTMLElement} chevron - The SVG element for the chevron icon.
 * @returns {object} The configured GSAP Timeline object.
 */
function createDropdownTimeline(dropdown, chevron) {
  // 1. Set initial state (This mimics the "display: none" from CSS)
  gsap.set(dropdown, {
    height: 0,
    y: -10,
    opacity: 0,
    display: "none",
    overflow: "hidden",
  });

  // 2. Create the timeline, paused and reversed by default (closed state)
  const tl = gsap.timeline({
    paused: true,
    reversed: true,
    defaults: {
      duration: 0.25,
      ease: "power2.out",
    },
    onStart: () => {
      gsap.set(dropdown, { display: "block" });
    },
    onReverseComplete: () => {
      gsap.set(dropdown, { display: "none" });
    },
  });

  // 3. Define the animation steps for OPENING (playing forward)
  tl.to(
    dropdown,
    {
      height: "auto",
      opacity: 1,
      y: 0,
    },
    0
  );

  // Chevron rotation
  tl.to(
    chevron,
    {
      rotation: 180,
      ease: "power2.out",
    },
    0
  );

  tl.set(dropdown, { overflow: "visible" });

  return tl;
}

/**
 * Closes a specific select element and updates its state.
 * @param {HTMLElement} selectElement - The root element to close.
 * @param {object} timeline - The GSAP timeline associated with the element.
 * @param {HTMLElement|null} searchInput - The search input element, or null if not present.
 * @param {function|null} filterOptions - The function to reset filters, or null if not present.
 */
function closeSelectElement(
  selectElement,
  timeline,
  searchInput,
  filterOptions
) {
  if (selectElement.classList.contains("is-open")) {
    selectElement.classList.remove("is-open");
    timeline.reverse();

    // Check if the search input exists before trying to clear it
    if (searchInput && searchInput.value !== "") {
      searchInput.value = "";
      // Check if the filter function exists before calling it
      if (filterOptions) {
        filterOptions();
      }
    }
  }
}

/**
 * Handles the logic to close all other open custom selects.
 * @param {HTMLElement} currentElement - The select element that is currently being toggled/opened.
 */
function closeOtherOpenSelects(currentElement) {
  activeSelects.forEach((item) => {
    if (item.element !== currentElement) {
      closeSelectElement(
        item.element,
        item.timeline,
        item.searchInput,
        item.filterOptions
      );
    }
  });
}

// -------------------------------------------------------------------
// Setup Logic
// -------------------------------------------------------------------

/**
 * Sets up event listeners and logic for a single custom select element.
 * @param {HTMLElement} selectElement - The root element with data-custom-select-element.
 */
function setupCustomSelect(selectElement) {
  const trigger = selectElement.querySelector("[data-custom-select-triger]");
  const labelTextSpan = selectElement.querySelector(".custom-select-label-txt");
  const dropdown = selectElement.querySelector("[data-custom-select-dropdown]");
  const chevronSvg = selectElement.querySelector(".custom-select-chevron svg");
  const options = selectElement.querySelectorAll(".custom-select-option");

  // --- NEW: Value Target is now the main selectElement ---
  const valueTarget = selectElement;

  // Conditional Search Query
  const searchContainer = selectElement.querySelector(
    "[data-custom-select-options-search]"
  );
  const searchInput = searchContainer
    ? selectElement.querySelector('input[type="text"]')
    : null;
  let filterOptions = null;

  const dropdownTimeline = createDropdownTimeline(dropdown, chevronSvg);

  // --- Search / Filter Logic (Only runs if searchInput exists) ---
  if (searchInput) {
    filterOptions = () => {
      const query = searchInput.value.toLowerCase().trim();
      options.forEach((option) => {
        const text = option.textContent.toLowerCase();
        if (text.includes(query)) {
          option.style.display = "";
        } else {
          option.style.display = "none";
        }
      });
    };

    searchInput.addEventListener("input", filterOptions);
  }

  // Store necessary references globally
  activeSelects.push({
    element: selectElement,
    timeline: dropdownTimeline,
    searchInput: searchInput,
    filterOptions: filterOptions,
  });

  // --- Toggle Logic ---
  function toggleDropdown(forceOpen) {
    const isOpen = selectElement.classList.contains("is-open");
    let shouldOpen = forceOpen !== undefined ? forceOpen : !isOpen;

    if (shouldOpen && !isOpen) {
      // OPEN
      closeOtherOpenSelects(selectElement);
      selectElement.classList.add("is-open");
      dropdownTimeline.play();

      // Only focus if the search input exists
      if (searchInput) {
        searchInput.focus();
      }
    } else if (!shouldOpen && isOpen) {
      // CLOSE
      closeSelectElement(
        selectElement,
        dropdownTimeline,
        searchInput,
        filterOptions
      );
    }
  }

  // --- Option Selection Logic ---
  function handleOptionClick(clickedOption) {
    const newText = clickedOption.textContent.trim();

    selectElement
      .querySelector(".custom-select-option[data__option__active]")
      ?.removeAttribute("data__option__active");

    clickedOption.setAttribute("data__option__active", "");

    labelTextSpan.textContent = newText;

    // --- Set the value on the main selectElement ---
    valueTarget.setAttribute("data-custom-select-value", newText);

    toggleDropdown(false);
  }

  options.forEach((option) => {
    option.addEventListener("click", () => {
      handleOptionClick(option);
    });
  });

  // ----------------------------------------------------
  // Event Listener for Toggling on Trigger Click
  // ----------------------------------------------------
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  // ----------------------------------------------------
  // Click Outside Logic (Closure)
  // ----------------------------------------------------
  document.addEventListener("click", (e) => {
    if (!selectElement.contains(e.target)) {
      toggleDropdown(false); // Force close
    }
  });

  // console.log("Custom Select Initialized:", selectElement);
}

// -------------------------------------------------------------------
// Initialization
// -------------------------------------------------------------------

/**
 * Initializes all custom select elements on the page.
 */
function initializeCustomSelects() {
  const customSelects = document.querySelectorAll(
    "[data-custom-select-element]"
  );

  if (customSelects.length === 0) {
    console.log(
      "No custom select elements found on this page. Initialization skipped."
    );
    return;
  }

  console.log(
    `Found ${customSelects.length} custom select element(s). Initializing...`
  );

  customSelects.forEach((selectElement) => {
    setupCustomSelect(selectElement);
  });
}

// Wait until the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  if (window.whenGsapReady) {
    window.whenGsapReady(initializeCustomSelects);
  } else {
    console.error(
      "The 'whenGsapReady' function is missing. Custom select initialization aborted."
    );
  }
});
