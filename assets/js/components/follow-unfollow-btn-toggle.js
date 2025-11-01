document.addEventListener("DOMContentLoaded", () => {
  // 1. Select all buttons using the common attribute
  const followButtons = document.querySelectorAll(
    "[data-follow-unfollow-following-btn-toggle-function]"
  );

  // If no buttons are found, just exit the function (no error)
  if (followButtons.length === 0) {
    console.log("No follow buttons found on the page. Script exiting.");
    return;
  }

  const GREY_CLASS = "btn-grey";

  // A helper function to change the text inside the button's span
  const setButtonText = (button, text) => {
    const span = button.querySelector("span");
    if (span) {
      span.textContent = text;
    }
  };

  /**
   * Handles the primary click-to-toggle logic.
   * @param {HTMLElement} button - The button element that was clicked.
   */
  const handleFollowClick = (button) => {
    // --- TYPE 1 & 3: User is currently 'Following' (or 'Following' and a 'Follower') ---
    // This is the UNFOLOW action for any grey button that says 'Following'.
    // This includes Type 2 (Following) and Type 3 (Follower & Following)
    if (button.classList.contains(GREY_CLASS)) {
      // Unfollow action
      button.classList.remove(GREY_CLASS);
      button.removeAttribute("data-user-my-following");

      // Now, check if the user is a follower (Type 1 or 3 after unfollow)
      if (button.hasAttribute("data-user-my-follower")) {
        setButtonText(button, "Follow Back");
      } else {
        // If not a follower, it becomes Type 4 (Not Following, Not Follower)
        setButtonText(button, "Follow");
      }
    }
    // --- TYPE 1 & 4: User is currently 'Follow Back' or 'Follow' ---
    else {
      // FOLLOW action (Follow Back -> Following, or Follow -> Following)
      button.classList.add(GREY_CLASS);
      button.setAttribute("data-user-my-following", "");
      setButtonText(button, "Following");
    }

    // **ACTIONABLE ADVICE / PUSHBACK**:
    // In a real app, this is where you'd make an AJAX/Fetch request to your server.
    // The server response should confirm the state change, not rely solely on front-end logic.
    // Your JS is purely for *visual* change; the server must handle the *data* change.
    // Don't 'bullshit' yourself by skipping the API call here!
    console.log(`Action triggered for button: ${button.textContent}`);
  };

  /**
   * Handles the hover (mouseenter) logic to show 'Unfollow' on a grey button.
   * @param {Event} event - The mouseenter event object.
   */
  const handleMouseEnter = (event) => {
    const button = event.currentTarget;
    // Only change text if the button is in the 'Following' state (is grey)
    if (
      button.classList.contains(GREY_CLASS) &&
      button.hasAttribute("data-user-my-following")
    ) {
      setButtonText(button, "Unfollow");
    }
  };

  /**
   * Handles the mouseleave logic to revert the text back to 'Following'.
   * @param {Event} event - The mouseleave event object.
   */
  const handleMouseLeave = (event) => {
    const button = event.currentTarget;
    // Only change text back if the button is in the 'Following' state (is grey)
    if (
      button.classList.contains(GREY_CLASS) &&
      button.hasAttribute("data-user-my-following")
    ) {
      setButtonText(button, "Following");
    }
  };

  // 2. Attach the listeners to every button
  followButtons.forEach((button) => {
    // Click listener for the main follow/unfollow toggle
    button.addEventListener("click", () => handleFollowClick(button));

    // Hover listeners for the 'Unfollow' visual effect
    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);
  });
});
