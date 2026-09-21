/* =====================================================
   G-TEC FSWD — INTERACTIVE JAVASCRIPT
   ===================================================== */


/* =====================================================
   DOM READY
   ===================================================== */

   document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       FAQ ACCORDION
       ================================================= */

    const faqQuestions =
        document.querySelectorAll(".faq-question");

    faqQuestions.forEach((question) => {

        question.addEventListener("click", () => {

            const item =
                question.closest(".faq-item");

            if (!item) return;

            const isOpen =
                item.classList.contains("open");

            /* Close all FAQ items */
            document
                .querySelectorAll(".faq-item.open")
                .forEach((openItem) => {

                    openItem.classList.remove("open");

                });

            /* Open clicked item */
            if (!isOpen) {
                item.classList.add("open");
            }

        });

    });


    /* =================================================
       SCROLL REVEAL
       ================================================= */

    const revealElements =
        document.querySelectorAll(
            ".section-heading, " +
            ".feature, " +
            ".tech-card, " +
            ".career-step, " +
            ".highlight, " +
            ".outcomes-content, " +
            ".outcome-visual"
        );

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("reveal");

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );

    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* =================================================
       TECHNOLOGY CARD CLICK
       ================================================= */

    const techCards =
        document.querySelectorAll(".tech-card");

    techCards.forEach((card) => {

        card.addEventListener("click", () => {

            techCards.forEach((item) => {

                item.classList.remove("active");

            });

            card.classList.add("active");

        });

    });


    /* =================================================
       ENQUIRY / MESSAGE
       ================================================= */

    window.showMessage = function () {

        alert(
            "Thank you for your interest in G-TEC Full Stack Web Development!"
        );

    };


    /* =================================================
       NAVBAR BACKGROUND ON SCROLL
       ================================================= */

    const navbar =
        document.querySelector(".navbar");

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 40) {

            navbar.style.background =
                "rgba(7, 17, 31, 0.94)";

            navbar.style.boxShadow =
                "0 10px 35px rgba(0, 0, 0, 0.18)";

        } else {

            navbar.style.background =
                "rgba(7, 17, 31, 0.78)";

            navbar.style.boxShadow =
                "none";

        }

    }

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();


    /* =================================================
       ACTIVE NAVIGATION LINK
       ================================================= */

    const navLinks =
        document.querySelectorAll(
            ".navbar nav a"
        );

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 160;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });

        navLinks.forEach((link) => {

            const href =
                link.getAttribute("href");

            link.classList.remove("active");

            if (
                href ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );

    updateActiveNav();


    /* =================================================
       TECH CARD CURSOR / RADIAL EFFECT
       ================================================= */

    techCards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                card.style.background =
                    `
                    radial-gradient(
                        circle at ${x}px ${y}px,
                        rgba(47, 128, 255, 0.16),
                        rgba(255, 255, 255, 0.035) 45%
                    )
                    `;

            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.background =
                    "";

            }
        );

    });


    /* =================================================
       TERMINAL CURSOR
       ================================================= */

    const terminalCursor =
        document.querySelector(".cursor");

    if (terminalCursor) {

        setInterval(() => {

            terminalCursor.style.opacity =
                terminalCursor.style.opacity === "0"
                    ? "1"
                    : "0";

        }, 600);

    }


    /* =================================================
       PAGE LOADED
       ================================================= */

    window.addEventListener(
        "load",
        () => {

            document.body.classList.add(
                "loaded"
            );

        }
    );


    /* =================================================
       G-TEC CINEMATIC SCROLL EXPERIENCE
       ================================================= */

    const cinematicSection =
        document.querySelector(
            ".cinematic-story"
        );

    if (!cinematicSection) {
        return;
    }


    const cinematicSlides =
        Array.from(
            cinematicSection.querySelectorAll(
                ".cinematic-slide"
            )
        );


    const cinematicProgressBar =
        cinematicSection.querySelector(
            ".cinematic-progress-line span"
        );


    const cinematicCurrentNumber =
        cinematicSection.querySelector(
            ".cinematic-current"
        );


    if (!cinematicSlides.length) {
        return;
    }


    let currentSlide = 0;

    let cinematicTicking = false;


    /* -----------------------------------------------
       INITIAL SLIDE
       ----------------------------------------------- */

    cinematicSlides.forEach(
        (slide, index) => {

            slide.classList.toggle(
                "active",
                index === 0
            );

        }
    );


    /* -----------------------------------------------
       CINEMATIC UPDATE
       ----------------------------------------------- */

    function updateCinematic() {

        const rect =
            cinematicSection.getBoundingClientRect();


        const sectionHeight =
            cinematicSection.offsetHeight;


        const viewportHeight =
            window.innerHeight;


        const scrollable =
            sectionHeight -
            viewportHeight;


        if (scrollable <= 0) {
            return;
        }


        /* -------------------------------------------
           Overall progress
           ------------------------------------------- */

        let progress =
            -rect.top / scrollable;


        progress =
            Math.max(
                0,
                Math.min(
                    1,
                    progress
                )
            );


        /* -------------------------------------------
           Determine active slide
           ------------------------------------------- */

        const slideCount =
            cinematicSlides.length;


        let slideIndex =
            Math.floor(
                progress * slideCount
            );


        if (
            slideIndex >= slideCount
        ) {

            slideIndex =
                slideCount - 1;

        }


        /* -------------------------------------------
           Activate slide
           ------------------------------------------- */

        if (
            slideIndex !==
            currentSlide
        ) {

            cinematicSlides.forEach(
                (slide, index) => {

                    slide.classList.toggle(
                        "active",
                        index === slideIndex
                    );

                }
            );

            currentSlide =
                slideIndex;

        }


        /* -------------------------------------------
           Local slide progress
           ------------------------------------------- */

        const slideStart =
            slideIndex /
            slideCount;


        const slideEnd =
            (slideIndex + 1) /
            slideCount;


        let localProgress =
            (
                progress -
                slideStart
            ) /
            (
                slideEnd -
                slideStart
            );


        localProgress =
            Math.max(
                0,
                Math.min(
                    1,
                    localProgress
                )
            );


        /* -------------------------------------------
           IMAGE ZOOM + PARALLAX
           ------------------------------------------- */

        cinematicSlides.forEach(
            (slide, index) => {

                const image =
                    slide.querySelector("img");

                if (!image) {
                    return;
                }


                if (
                    index === slideIndex
                ) {

                    /*
                     * Very small zoom.
                     * This gives the image
                     * a cinematic camera feel.
                     */

                    const scale =
                        1 +
                        localProgress * 0.055;


                    const x =
                        localProgress * -16;


                    const y =
                        localProgress * -6;


                    image.style.transform =
                        `
                        translate3d(
                            ${x}px,
                            ${y}px,
                            0
                        )
                        scale(${scale})
                        `;

                } else {

                    image.style.transform =
                        `
                        translate3d(
                            0,
                            0,
                            0
                        )
                        scale(1)
                        `;

                }

            }
        );


        /* -------------------------------------------
           PROGRESS BAR
           ------------------------------------------- */

        if (cinematicProgressBar) {

            cinematicProgressBar.style.width =
                `${progress * 100}%`;

        }


        /* -------------------------------------------
           SLIDE NUMBER
           ------------------------------------------- */

        if (cinematicCurrentNumber) {

            cinematicCurrentNumber.textContent =
                String(
                    slideIndex + 1
                ).padStart(
                    2,
                    "0"
                );

        }

    }


    /* =================================================
       REQUEST ANIMATION FRAME
       ================================================= */

    function requestCinematicUpdate() {

        if (cinematicTicking) {
            return;
        }

        cinematicTicking = true;


        requestAnimationFrame(
            () => {

                updateCinematic();

                cinematicTicking =
                    false;

            }
        );

    }


    /* =================================================
       CINEMATIC SCROLL EVENT
       ================================================= */

    window.addEventListener(
        "scroll",
        requestCinematicUpdate,
        {
            passive: true
        }
    );


    /* =================================================
       CINEMATIC RESIZE EVENT
       ================================================= */

    window.addEventListener(
        "resize",
        requestCinematicUpdate
    );


    /* =================================================
       INITIAL CINEMATIC UPDATE
       ================================================= */

    updateCinematic();


});