/* ============================================
   G-TEC CINEMATIC EXPERIENCE
   ============================================ */

   document.addEventListener("DOMContentLoaded", () => {

    const loader = document.querySelector(".loader");

    setTimeout(() => {
        loader.classList.add("hide");
    }, 1200);


    /* ============================================
       SCENES
       ============================================ */

    const scenes = document.querySelectorAll(".scene");
    const dots = document.querySelectorAll(".scene-dot");
    const currentScene = document.getElementById("currentScene");

    let current = 0;
    let isChanging = false;


    function goToScene(index) {

        if (index < 0) {
            index = scenes.length - 1;
        }

        if (index >= scenes.length) {
            index = 0;
        }

        if (index === current || isChanging) {
            return;
        }

        isChanging = true;

        scenes[current].classList.remove("active");
        dots[current].classList.remove("active");

        current = index;

        scenes[current].classList.add("active");
        dots[current].classList.add("active");

        currentScene.textContent =
            String(current + 1).padStart(2, "0");

        setTimeout(() => {
            isChanging = false;
        }, 1100);
    }


    /* ============================================
       NAVIGATION DOTS
       ============================================ */

    dots.forEach((dot) => {

        dot.addEventListener("click", () => {

            const sceneIndex =
                parseInt(dot.dataset.scene);

            goToScene(sceneIndex);

        });

    });


    /* ============================================
       MOUSE WHEEL
       ============================================ */

    let wheelLocked = false;

    window.addEventListener(
        "wheel",
        (event) => {

            if (wheelLocked) {
                return;
            }

            wheelLocked = true;

            if (event.deltaY > 0) {
                goToScene(current + 1);
            } else {
                goToScene(current - 1);
            }

            setTimeout(() => {
                wheelLocked = false;
            }, 1200);

        },
        { passive: true }
    );


    /* ============================================
       KEYBOARD
       ============================================ */

    document.addEventListener("keydown", (event) => {

        if (event.key === "ArrowDown" ||
            event.key === "PageDown") {

            goToScene(current + 1);

        }

        if (event.key === "ArrowUp" ||
            event.key === "PageUp") {

            goToScene(current - 1);

        }

        if (event.key === "Home") {

            goToScene(0);

        }

        if (event.key === "End") {

            goToScene(scenes.length - 1);

        }

    });


    /* ============================================
       TOUCH SWIPE
       ============================================ */

    let touchStartY = 0;

    window.addEventListener("touchstart", (event) => {

        touchStartY = event.touches[0].clientY;

    }, { passive: true });


    window.addEventListener("touchend", (event) => {

        const touchEndY =
            event.changedTouches[0].clientY;

        const difference =
            touchStartY - touchEndY;

        if (Math.abs(difference) < 50) {
            return;
        }

        if (difference > 0) {
            goToScene(current + 1);
        } else {
            goToScene(current - 1);
        }

    }, { passive: true });


    /* ============================================
       MOUSE PARALLAX
       ============================================ */

    const experience =
        document.querySelector(".experience");

    window.addEventListener("mousemove", (event) => {

        const x =
            (event.clientX / window.innerWidth - 0.5);

        const y =
            (event.clientY / window.innerHeight - 0.5);


        const activeScene =
            scenes[current];


        const floatingElements =
            activeScene.querySelectorAll(
                ".floating-object, " +
                ".tech-object, " +
                ".react-object, " +
                ".backend-object, " +
                ".database-object, " +
                ".git-object"
            );


        floatingElements.forEach((element, index) => {

            const intensity =
                15 + (index * 5);

            element.style.transform =
                `translate(${x * intensity}px, ${y * intensity}px)`;

        });


        const background =
            activeScene.querySelector(".scene-bg");

        if (background) {

            background.style.transform =
                `scale(1.03) translate(${x * -10}px, ${y * -10}px)`;

        }

    });


    /* ============================================
       MENU
       ============================================ */

    const menuBtn =
        document.getElementById("menuBtn");

    const menuClose =
        document.getElementById("menuClose");

    const menuOverlay =
        document.getElementById("menuOverlay");


    menuBtn.addEventListener("click", () => {

        menuOverlay.classList.add("open");

    });


    menuClose.addEventListener("click", () => {

        menuOverlay.classList.remove("open");

    });


    /* ============================================
       MENU LINKS
       ============================================ */

    const menuLinks =
        document.querySelectorAll("[data-menu]");


        menuLinks.forEach((link) => {

            link.addEventListener("click", (event) => {
        
                event.preventDefault();
        
                const index = parseInt(link.dataset.menu);
        
                // Close menu
                menuOverlay.classList.remove("open");
        
                // Go to selected scene
                setTimeout(() => {
                    goToScene(index);
                }, 300);
        
            });
        
        });


    /* ============================================
       ESCAPE CLOSE MENU
       ============================================ */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            menuOverlay.classList.remove("open");

        }

    });


    /* ============================================
       ENQUIRE BUTTON
       ============================================ */

    const enquireBtn =
        document.getElementById("enquireBtn");


    if (enquireBtn) {

        enquireBtn.addEventListener("click", () => {

            alert(
                "Thank you for your interest in G-TEC Full Stack Web Development!"
            );

        });

    }


    /* ============================================
       PREVENT CONTEXT MENU ON EXPERIENCE
       ============================================ */

    experience.addEventListener(
        "contextmenu",
        (event) => {
            event.preventDefault();
        }
    );


    /* ============================================
       IMAGE PRELOAD
       ============================================ */

    const images = [

        "images/gtec-logo.png",
        "images/hero.jpg",
        "images/html-3d.png",
        "images/javascript-3d.png",
        "images/react-3d.png",
        "images/backend-3d.png",
        "images/database-3d.png",
        "images/git-3d.png"

    ];


    images.forEach((src) => {

        const image = new Image();

        image.src = src;

    });


    /* ============================================
       INITIAL STATE
       ============================================ */

    currentScene.textContent = "01";

});