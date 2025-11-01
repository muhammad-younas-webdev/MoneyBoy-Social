// document.addEventListener("DOMContentLoaded", () => {
//   // Select all tab sections
//   const tabSections = document.querySelectorAll("[data-multiple-tabs-section]");

//   // If no tab sections exist, just stop
//   if (!tabSections.length) return;

//   tabSections.forEach((section) => {
//     const buttons = section.querySelectorAll("[data-multi-tabs-switch-btn]");
//     const tabs = section.querySelectorAll("[data-multi-tabs-content-tab]");

//     // Extra guard: skip if buttons or tabs are missing
//     if (!buttons.length || !tabs.length) return;

//     // Attach click listener to each button
//     buttons.forEach((btn, index) => {
//       btn.addEventListener("click", () => {
//         // Remove active state from all buttons + tabs in this section
//         buttons.forEach((b) => b.removeAttribute("data__active"));
//         tabs.forEach((t) => t.removeAttribute("data__active"));

//         // Set active state on clicked button + matching tab
//         btn.setAttribute("data__active", "");
//         tabs[index].setAttribute("data__active", "");
//       });
//     });
//   });
// });

// multiple-tabs.js

document.addEventListener("DOMContentLoaded", () => {
  // Select all main tab sections
  const tabSections = document.querySelectorAll("[data-multiple-tabs-section]");

  if (!tabSections.length) {
    console.log(
      "Tab initialization skipped: No [data-multiple-tabs-section] elements found."
    );
    return;
  }

  tabSections.forEach((section, sectionIndex) => {
    // 1. Get the identifier from the main section (will be null if optional/missing)
    const sectionId = section.getAttribute("data-identifier");

    let buttonsQuery;
    let tabsQuery;

    if (sectionId) {
      // MODE 1: Identifier is present (e.g., nesting is likely)
      // Query for buttons and tabs that have a matching data-identifier attribute.
      buttonsQuery = `[data-multi-tabs-switch-btn][data-identifier="${sectionId}"]`;
      tabsQuery = `[data-multi-tabs-content-tab][data-identifier="${sectionId}"]`;
      console.log(`Initializing Tab Section with ID: ${sectionId}`);
    } else {
      // MODE 2: No identifier is present (default/single-instance mode)
      // Query for ALL buttons and tabs within this section's descendants.
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
        // Remove active state from all buttons in this set
        buttons.forEach((b) => b.removeAttribute("data__active"));

        // Remove active state from all tabs in this set
        tabs.forEach((t) => t.removeAttribute("data__active"));

        // Set active state on clicked button + matching tab
        btn.setAttribute("data__active", "");
        tabs[index].setAttribute("data__active", "");
      });
    });
  });
});
