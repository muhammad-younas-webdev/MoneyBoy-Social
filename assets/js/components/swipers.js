// swiper-handler-combined.js (Stabilized with Layout Fixes)

(function() {
    const SWIPER_WRAPPER_SELECTOR = '[data-moneyboy-swiper]';
    const SWIPER_SLIDES_SELECTOR = '[data-swiper-slides]';
    
    // --- CDN Links (Swiper 11.0.5) ---
    const SWIPER_CSS_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.css';
    const SWIPER_JS_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.js';
    
    const swiperContainers = document.querySelectorAll(SWIPER_WRAPPER_SELECTOR);

    // 1. Conditional Loading Check
    if (swiperContainers.length > 0) {
        console.log(`Found ${swiperContainers.length} Swiper container(s). Loading Swiper CDN.`);
        
        const head = document.head;

        // Load CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = SWIPER_CSS_CDN;
        head.appendChild(link);

        // Load JS
        const script = document.createElement('script');
        script.src = SWIPER_JS_CDN;
        script.defer = true;
        head.appendChild(script);

        // Wait for JS to load and then initialize the Swipers
        script.onload = () => {
            console.log("Swiper.js CDN loaded successfully. Initializing Swipers.");
            initializeSwipers(swiperContainers);
        };
        
        script.onerror = () => {
             console.error("Failed to load Swiper.js CDN. Swiper functionality may be broken.");
        };
    } else {
        console.log("No Swiper container found. Skipping Swiper CDN load.");
    }


    /**
     * Initializes all Swiper instances found on the page.
     * @param {NodeListOf<Element>} containers - The list of elements with [data-moneyboy-swiper].
     */
    function initializeSwipers(containers) {
        if (typeof Swiper === 'undefined') {
            return;
        }

        containers.forEach(wrapper => {
            // Find the core Swiper element *inside* the wrapper
            const swiperElement = wrapper.querySelector(SWIPER_SLIDES_SELECTOR);
            
            // Find navigation buttons *inside* the wrapper
            const prevButton = wrapper.querySelector('.moneyboy-swiper-control-btn.prev-btn');
            const nextButton = wrapper.querySelector('.moneyboy-swiper-control-btn.next-btn');

            // Safety check
            if (!swiperElement || !prevButton || !nextButton) {
                console.warn("Skipping Swiper: Missing core elements (swiper, prev, or next button) inside wrapper.", wrapper);
                return;
            }

            // 2. Define Swiper configuration
            const swiperOptions = {
                // Core Settings
                loop: false,
                spaceBetween: 16,
                
                // Essential Layout Fixes
                observer: true,       
                observeParents: true, 
                watchOverflow: true, // New: Tries to detect when there aren't enough slides
                
                // Stabilization setting (Experimental, may not be needed, but can help early layout issues)
                // breakpointsBase: 'container', 
                
                // Responsive Breakpoints (1 slide on mobile, 2 slides on desktop)
                breakpoints: {
                    // Mobile (0px up)
                    0: {
                        slidesPerView: 1, 
                        slidesPerGroup: 1,
                    },
                    // Desktop/Tablet (768px and up)
                    620: {
                        slidesPerView: 2, 
                        slidesPerGroup: 1,
                    }
                },
                
                // Navigation: Referencing the local buttons
                navigation: {
                    prevEl: prevButton, 
                    nextEl: nextButton,
                },
            };

            // 3. Initialize the Swiper instance
            try {
                // Store the instance if you need to call methods like .update() later
                const swiperInstance = new Swiper(swiperElement, swiperOptions); 
                console.log("Initialized Swiper successfully for element:", swiperElement);

                // FINAL HAIL MARY: Force update after initialization for any lingering layout issues
                // swiperInstance.update(); 

            } catch (e) {
                console.error("Error initializing Swiper instance:", e);
            }
        });
    }
})();