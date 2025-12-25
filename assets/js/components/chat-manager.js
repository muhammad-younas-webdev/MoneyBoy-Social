/**
 * Chat Logic: Index-Based Matching with Responsive Reset
 */
(function () {
  const WRAPPER_ATTR = "[msg-page-wrapper]";
  const CONTACT_ATTR = "[msg-chat-contact]";
  const ROOM_ATTR = "[msg-chat-room]";
  const ACTIVE_ATTR = "data-active";
  const DESKTOP_BREAKPOINT = 993;

  let wasDesktop = window.innerWidth > DESKTOP_BREAKPOINT;

  const initChatLogic = () => {
    const pageWrapper = document.querySelector(WRAPPER_ATTR);

    if (!pageWrapper) return;

    const contacts = pageWrapper.querySelectorAll(CONTACT_ATTR);
    const rooms = pageWrapper.querySelectorAll(ROOM_ATTR);

    /**
     * Clears all active attributes from contacts and rooms
     */
    const clearAllActive = () => {
      contacts.forEach((c) => c.removeAttribute(ACTIVE_ATTR));
      rooms.forEach((r) => r.removeAttribute(ACTIVE_ATTR));
    };

    /**
     * Toggles the data-active attribute based on index
     */
    const switchChat = (index) => {
      if (index < 0 || !contacts[index] || !rooms[index]) return;
      clearAllActive();
      contacts[index].setAttribute(ACTIVE_ATTR, "");
      rooms[index].setAttribute(ACTIVE_ATTR, "");
    };

    // 1. Handle Contact Clicks
    contacts.forEach((contact, index) => {
      contact.addEventListener("click", () => {
        switchChat(index);
      });
    });

    // 2. Responsive Manager
    const handleResponsiveChange = () => {
      const isDesktop = window.innerWidth > DESKTOP_BREAKPOINT;
      const anyActive = pageWrapper.querySelector(
        `${CONTACT_ATTR}[${ACTIVE_ATTR}]`
      );

      // CASE A: Moving from Mobile -> Desktop
      if (isDesktop && !wasDesktop) {
        if (!anyActive && contacts.length > 0) {
          switchChat(0); // Auto-open first chat on desktop
        }
      }

      // CASE B: Moving from Desktop -> Mobile
      // We explicitly clear the chat so the user sees the contact list
      if (!isDesktop && wasDesktop) {
        console.log("Responsive switch: Closing active chat for mobile view.");
        clearAllActive();
      }

      // Update the state tracker for the next resize event
      wasDesktop = isDesktop;
    };

    // Initial check on load
    if (wasDesktop && contacts.length > 0) {
      switchChat(0);
    }

    // 3. Resize Listener
    window.addEventListener("resize", () => {
      handleResponsiveChange();
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChatLogic);
  } else {
    initChatLogic();
  }
})();
