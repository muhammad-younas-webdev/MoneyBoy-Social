const sidebar = document.getElementById("leftSidebar");

function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

function checkSidebarScroll() {
  if (!sidebar) return;
  if (isTouchDevice()) return;

  const hasVerticalScroll = sidebar.scrollHeight > sidebar.clientHeight;
  const hasHorizontalScroll = sidebar.scrollWidth > sidebar.clientWidth;

  if (hasVerticalScroll || hasHorizontalScroll) {
    sidebar.classList.add("has-scroll");
  } else {
    sidebar.classList.remove("has-scroll");
  }
}

// Run once on load
checkSidebarScroll();

// Run again whenever window is resized
window.addEventListener("resize", checkSidebarScroll);
