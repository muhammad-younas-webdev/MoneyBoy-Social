document.addEventListener("DOMContentLoaded", () => {
  // Select all buttons using the data-following-btn attribute
  const simpleFollowingButtons = document.querySelectorAll(
    "[data-following-btn]"
  );

  // If no buttons are found, just exit
  if (simpleFollowingButtons.length === 0) {
    console.log("No simple following buttons found. Script exiting.");
    return;
  }

  // A helper function to change the text inside the button's span
  const setButtonText = (button, text) => {
    // Ensure you target the inner <span> element
    const span = button.querySelector("span");
    if (span) {
      span.textContent = text;
    }
  };

  // Store the original text to revert to on mouseleave
  const originalTexts = new Map();

  // 1. Attach listeners to every button
  simpleFollowingButtons.forEach((button) => {
    // Pushback / Flaw in Logic:
    // You only asked for the hover state, but in the real world,
    // a button must revert! Without the 'mouseleave' action, the
    // button would be stuck saying "Unfollow" forever. I've added
    // the necessary reversion logic here to make this actually usable.

    // Store the original text before attaching listeners
    const initialText =
      button.querySelector("span")?.textContent || "Following";
    originalTexts.set(button, initialText);

    // --- MouseEnter: Change text to "Unfollow" ---
    button.addEventListener("mouseenter", (event) => {
      setButtonText(event.currentTarget, "Unfollow");
    });

    // --- MouseLeave: Change text back to its original state ---
    button.addEventListener("mouseleave", (event) => {
      const buttonToRevert = event.currentTarget;
      const textToRevert = originalTexts.get(buttonToRevert);
      if (textToRevert) {
        setButtonText(buttonToRevert, textToRevert);
      }
    });

    // **CRITICAL PUSHBACK**:
    // If these buttons also need to handle the *click* action (actually unfollow),
    // you'll need a separate click listener, similar to what we did before.
    // This code *only* handles the visual hover effect.
  });
});
