// Select all elements with the class "featured-profile-card"
const featuredCards = document.querySelectorAll(".featured-profile-card");

// Run the script only if at least one "featured-profile-card" exists
if (featuredCards.length > 0) {
  featuredCards.forEach((featuredCard) => {
    console.log(featuredCard); // Debug: log each featured card to the console

    // Find the "like" button inside the current featured card
    const likeBtn = featuredCard.querySelector(
      ".profile-card__icon .like-button"
    );

    // Add click functionality only if the "like" button exists
    if (likeBtn) {
      likeBtn.addEventListener("click", () => {
        // Toggle the "liked" class to visually show like/unlike state
        likeBtn.classList.toggle("liked");
      });
    }
  });
}
