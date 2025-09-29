// Select elements
const postsTabsBtnCard = document.querySelector("#posts-tabs-btn-card");
const headerMain = document.querySelector("header.header-main");
const mainLayout = document.querySelector(".moneyboy-layout-container");

if (postsTabsBtnCard && headerMain && mainLayout) {
  // Helper: measure header height (safer than offsetHeight in some layouts)
  const getHeaderHeight = () => headerMain.getBoundingClientRect().height;

  // Current header height (will be updated on resize / header changes)
  let headerHeight = getHeaderHeight();

  // Decide whether the layout element is the scroll container or the page is scrolling
  // If mainLayout actually scrolls (content taller than visible area) use it; otherwise use window
  const elementIsScroller = mainLayout.scrollHeight > mainLayout.clientHeight;
  const scroller = elementIsScroller ? mainLayout : window;

  // Function that checks scroll position and toggles the class
  const checkSticky = () => {
    // Use scrollTop for element scroller, window.scrollY for page scroller
    const scrollPosition =
      scroller === window ? window.scrollY : mainLayout.scrollTop;

    if (scrollPosition >= headerHeight) {
      postsTabsBtnCard.classList.add("is-sticky");
    } else {
      postsTabsBtnCard.classList.remove("is-sticky");
    }
  };

  // Run once on load to set the correct initial state
  checkSticky();

  // Throttle scroll handling with requestAnimationFrame to improve performance
  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        checkSticky();
        ticking = false;
      });
      ticking = true;
    }
  };

  // Attach scroll listener to chosen scroller
  scroller.addEventListener("scroll", onScroll, { passive: true });

  // Recalculate header height on window resize and re-check
  window.addEventListener("resize", () => {
    headerHeight = getHeaderHeight();
    checkSticky();
  });

  // If the header can change size dynamically (fonts, layout changes), observe it and update height
  if (typeof ResizeObserver !== "undefined") {
    const ro = new ResizeObserver(() => {
      headerHeight = getHeaderHeight();
      checkSticky();
    });
    ro.observe(headerMain);
  }
}
