document.addEventListener("DOMContentLoaded", () => {
  // Select all tab sections
  const tabSections = document.querySelectorAll("[data-multiple-tabs-section]");

  // If no tab sections exist, just stop
  if (!tabSections.length) return;

  tabSections.forEach((section) => {
    const buttons = section.querySelectorAll("[data-multi-tabs-switch-btn]");
    const tabs = section.querySelectorAll("[data-multi-tabs-content-tab]");

    // Extra guard: skip if buttons or tabs are missing
    if (!buttons.length || !tabs.length) return;

    // Attach click listener to each button
    buttons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        // Remove active state from all buttons + tabs in this section
        buttons.forEach((b) => b.removeAttribute("data__active"));
        tabs.forEach((t) => t.removeAttribute("data__active"));

        // Set active state on clicked button + matching tab
        btn.setAttribute("data__active", "");
        tabs[index].setAttribute("data__active", "");
      });
    });
  });
});
