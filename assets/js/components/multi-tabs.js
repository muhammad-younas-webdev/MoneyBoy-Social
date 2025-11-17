// multiple-tabs.js (Updated with data-scroll-zero feature)

document.addEventListener("DOMContentLoaded", () => {
  const SCROLL_TARGET_CLASS = ".moneyboy-layout-container"; // Container to scroll
  const SCROLL_ZERO_ATTR = "data-scroll-zero"; // New attribute to check on the tab section

  // Select all main tab sections
  const tabSections = document.querySelectorAll("[data-multiple-tabs-section]");

  if (!tabSections.length) {
    console.log(
      "Tab initialization skipped: No [data-multiple-tabs-section] elements found."
    );
    return;
  }

  /**
   * Scrolls the main content container to the top smoothly.
   * This function is only executed if the tab section has data-scroll-zero.
   */
  const scrollToZero = () => {
    const mainContentParent = document.querySelector(SCROLL_TARGET_CLASS);
    if (mainContentParent) {
      mainContentParent.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      console.log("Scroll zero executed on tab change.");
    } else {
      console.warn(
        `Scroll zero failed: Could not find element ${SCROLL_TARGET_CLASS}`
      );
    }
  };

  tabSections.forEach((section, sectionIndex) => {
    // --- NEW LOGIC: Check for the scroll-zero attribute ---
    const shouldScrollToZero = section.hasAttribute(SCROLL_ZERO_ATTR);

    // 1. Get the identifier from the main section (will be null if optional/missing)
    const sectionId = section.getAttribute("data-identifier");

    let buttonsQuery;
    let tabsQuery;

    if (sectionId) {
      // MODE 1: Identifier is present (e.g., nesting is likely)
      buttonsQuery = `[data-multi-tabs-switch-btn][data-identifier="${sectionId}"]`;
      tabsQuery = `[data-multi-tabs-content-tab][data-identifier="${sectionId}"]`;
      console.log(`Initializing Tab Section with ID: ${sectionId}`);
    } else {
      // MODE 2: No identifier is present (default/single-instance mode)
      buttonsQuery = `[data-multi-tabs-switch-btn]`;
      tabsQuery = `[data-multi-tabs-content-tab]`;
      console.log(`Initializing Default Tab Section (Index ${sectionIndex})`);
    }

    // 2. Select the elements using the determined query
    const buttons = section.querySelectorAll(buttonsQuery);
    const tabs = section.querySelectorAll(tabsQuery);

    // Extra guard: skip if buttons or tabs are missing or counts mismatch
    if (!buttons.length || !tabs.length || buttons.length !== tabs.length) {
      console.warn(
        `Tab setup skipped for section ${
          sectionId || "default"
        }: Button/Tab issue or count mismatch.`
      );
      return;
    }

    // 3. Attach click listener to each button
    buttons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        // Check if the clicked tab is already active to prevent unnecessary action
        if (btn.hasAttribute("data__active")) {
          return;
        }

        // Remove active state from all buttons in this set
        buttons.forEach((b) => b.removeAttribute("data__active"));

        // Remove active state from all tabs in this set
        tabs.forEach((t) => t.removeAttribute("data__active"));

        // Set active state on clicked button + matching tab
        btn.setAttribute("data__active", "");
        tabs[index].setAttribute("data__active", "");

        // --- NEW LOGIC: Scroll to zero if attribute is present ---
        if (shouldScrollToZero) {
          scrollToZero();
        }
      });
    });
  });
});
