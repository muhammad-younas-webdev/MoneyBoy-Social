// Select all elements with the class "moneyboy-post__container"
const postCards = document.querySelectorAll(".moneyboy-post__container");

// Run the script only if at least one post card exists
if (postCards.length > 0) {
  postCards.forEach((postCard) => {
    console.log(postCard); // Debug: log each post card to the console

    // Find the "like" button inside the current post card
    const likeBtn = postCard.querySelector(
      ".moneyboy-post__actions .post-like-btn"
    );

    // Add click functionality only if the "like" button exists
    if (likeBtn) {
      likeBtn.addEventListener("click", () => {
        // Toggle the "liked" class to visually show like/unlike state
        // (Uncomment the line below to enable the feature)
        // likeBtn.classList.toggle("liked");
      });
    }
  });
}
