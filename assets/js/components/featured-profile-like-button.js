// // Select all elements with the class "featured-profile-card"
// const featuredCards = document.querySelectorAll(".featured-profile-card");

// // Run the script only if at least one "featured-profile-card" exists
// if (featuredCards.length > 0) {
//   featuredCards.forEach((featuredCard) => {
//     console.log(featuredCard); // Debug: log each featured card to the console

//     // Find the "like" button inside the current featured card
//     const likeBtn = featuredCard.querySelector(".like-button");

//     // Add click functionality only if the "like" button exists
//     if (likeBtn) {
//       likeBtn.addEventListener("click", () => {
//         // Toggle the "liked" class to visually show like/unlike state
//         likeBtn.classList.toggle("liked");
//       });
//     }
//   });
// }

// Target ALL elements with the data-like-button attribute directly on the page.
const likeButtons = document.querySelectorAll("[data-like-button]");

// Run the script only if at least one like button exists
if (likeButtons.length > 0) {
  likeButtons.forEach((likeBtn) => {
    // Toggle the "liked" class on click
    likeBtn.addEventListener("click", () => {
      likeBtn.classList.toggle("liked");
    });
  });
}
