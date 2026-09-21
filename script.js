/* =====================================================
   G-TEC FSWD — INTERACTIVE JAVASCRIPT
   ===================================================== */


/* -----------------------------------------------------
   1. FAQ ACCORDION
----------------------------------------------------- */

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {

    question.addEventListener("click", () => {

        const currentItem = question.parentElement;

        document.querySelectorAll(".faq-item").forEach((item) => {

            if (item !== currentItem) {
                item.classList.remove("open");
            }

        });

        currentItem.classList.toggle("open");

    });

});


/* -----------------------------------------------------
   2. SCROLL REVEAL ANIMATION
----------------------------------------------------- */

const revealElements = document.querySelectorAll(
    ".section-heading, .feature, .tech-card, .career-step, .highlight, .outcomes-content, .outcome-visual"
);

const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("reveal");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* -----------------------------------------------------
   3. TECHNOLOGY CARD INTERACTION
----------------------------------------------------- */

const techCards = document.querySelectorAll(".tech-card");

techCards.forEach((card) => {

    card.addEventListener("click", () => {

        techCards.forEach((item) => {
            item.classList.remove("active");
        });

        card.classList.add("active");

    });

});


/* -----------------------------------------------------
   4. ENQUIRE BUTTON
----------------------------------------------------- */

function showMessage() {

    alert(
        "Thank you for your interest in the Full Stack Web Development program!\n\n" +
        "Please contact G-TEC Education for course counselling and admission details."
    );

}


/* -----------------------------------------------------
   5. NAVBAR BACKGROUND ON SCROLL
----------------------------------------------------- */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.background = "rgba(5, 13, 24, 0.94)";

    } else {

        navbar.style.background = "rgba(7, 17, 31, 0.78)";

    }

});


/* -----------------------------------------------------
   6. ACTIVE NAVIGATION LINK
----------------------------------------------------- */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar nav a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.style.color = "";

        if (link.getAttribute("href") === "#" + currentSection) {

            link.style.color = "#55a5ff";

        }

    });

});


/* -----------------------------------------------------
   7. CURSOR EFFECT FOR TECHNOLOGY CARDS
----------------------------------------------------- */

techCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        card.style.background =
            `radial-gradient(
                circle at ${x}px ${y}px,
                rgba(47, 128, 255, 0.18),
                rgba(255, 255, 255, 0.035) 45%
            )`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.background = "";

    });

});


/* -----------------------------------------------------
   8. HERO CODE TYPING EFFECT
----------------------------------------------------- */

const terminalCursor = document.querySelector(".cursor");

if (terminalCursor) {

    setInterval(() => {

        terminalCursor.style.opacity =
            terminalCursor.style.opacity === "0" ? "1" : "0";

    }, 500);

}


/* -----------------------------------------------------
   9. PAGE LOADED
----------------------------------------------------- */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});