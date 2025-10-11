// cdns.js

/**
 * Dynamically loads the GSAP CDN, handles errors, and creates a global
 * `window.whenGsapReady()` method for other scripts to use.
 */
export function loadGsap() {
  const GSAP_CDN_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
  const gsapReadyQueue = [];
  let isGsapLoaded = false;

  // 1. Define the global readiness function for components to call
  window.whenGsapReady = (callback) => {
    if (isGsapLoaded) {
      callback();
    } else {
      gsapReadyQueue.push(callback);
    }
  };

  // Helper to resolve the queue when GSAP is ready
  const resolveGsapReadyQueue = () => {
    isGsapLoaded = true;
    while (gsapReadyQueue.length > 0) {
      const callback = gsapReadyQueue.shift();
      if (typeof callback === "function") {
        callback();
      }
    }
  };

  // 2. Check and Load GSAP
  if (typeof window.gsap !== "undefined") {
    // If already loaded (e.g., in a development scenario), resolve immediately
    resolveGsapReadyQueue();
    return;
  }

  const script = document.createElement("script");
  script.src = GSAP_CDN_URL;
  script.async = true;

  script.onload = () => {
    if (typeof window.gsap !== "undefined") {
      console.log("✅ GSAP CDN loaded successfully.");
      resolveGsapReadyQueue();
    } else {
      console.error(
        '❌ GSAP loaded, but the global "gsap" object was not found.'
      );
    }
  };

  script.onerror = () => {
    console.error("❌ FAILED TO LOAD GSAP CDN from:", GSAP_CDN_URL);
  };

  document.head.appendChild(script);
}

// Automatically execute the function when cdns.js is imported in main.js
loadGsap();
