/* =========================================================
   VEDIKA DIGITAL
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   01. PAGE LOADER
   ========================================================= */

window.addEventListener("load", function () {

    const loader = document.getElementById("pageLoader");

    setTimeout(function () {

        if (loader) {
            loader.classList.add("loaded");
        }

    }, 700);

});



/* =========================================================
   02. HEADER ON SCROLL
   ========================================================= */

const siteHeader = document.getElementById("siteHeader");


function handleHeaderScroll() {

    if (!siteHeader) return;

    if (window.scrollY > 50) {

        siteHeader.classList.add("scrolled");

    } else {

        siteHeader.classList.remove("scrolled");

    }

}


window.addEventListener("scroll", handleHeaderScroll);

handleHeaderScroll();



/* =========================================================
   03. MOBILE NAVIGATION
   ========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");



if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", function () {

        menuToggle.classList.toggle("active");

        mainNav.classList.toggle("active");

        document.body.classList.toggle("menu-open");

    });


    /*
       Close mobile menu after clicking
       any navigation link
    */

    const navigationLinks =
        mainNav.querySelectorAll(".nav-link");


    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            menuToggle.classList.remove("active");

            mainNav.classList.remove("active");

            document.body.classList.remove("menu-open");

        });

    });

}



/* =========================================================
   04. SCROLL REVEAL ANIMATION
   ========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");



const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    /*
                       Once visible, we don't need to
                       observe the element anymore.
                    */

                    revealObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12,

            rootMargin: "0px 0px -50px 0px"
        }

    );



revealElements.forEach(function (element) {

    revealObserver.observe(element);

});



/* =========================================================
   05. ACTIVE NAVIGATION LINK
   ========================================================= */

const sections =
    document.querySelectorAll("main section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");



function updateActiveNavigation() {

    let currentSection = "";

    const scrollPosition =
        window.scrollY + 180;


    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;


        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");


        const linkTarget =
            link.getAttribute("href");


        if (
            linkTarget === "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

}



window.addEventListener(
    "scroll",
    updateActiveNavigation
);

updateActiveNavigation();



/* =========================================================
   06. SMOOTH SCROLL
   ========================================================= */

const smoothLinks =
    document.querySelectorAll('a[href^="#"]');



smoothLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId =
            link.getAttribute("href");


        if (
            !targetId ||
            targetId === "#"
        ) {

            return;

        }


        const target =
            document.querySelector(targetId);


        if (!target) {

            return;

        }


        event.preventDefault();


        const headerHeight =
            siteHeader
                ? siteHeader.offsetHeight
                : 0;


        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;


        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});



/* =========================================================
   07. BACK TO TOP
   ========================================================= */

const backTop =
    document.getElementById("backTop");



if (backTop) {

    backTop.addEventListener("click", function (event) {

        event.preventDefault();


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}



/* =========================================================
   08. STAT COUNTER ANIMATION
   ========================================================= */

const statNumbers =
    document.querySelectorAll(
        ".stat-number[data-target]"
    );



function animateCounter(element) {

    const target =
        parseInt(
            element.getAttribute("data-target")
        );


    if (isNaN(target)) {

        return;

    }


    let current = 0;

    const duration = 1000;

    const startTime =
        performance.now();


    function updateCounter(currentTime) {

        const elapsed =
            currentTime - startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        /*
           Ease-out effect
        */

        const easedProgress =
            1 - Math.pow(
                1 - progress,
                3
            );


        current =
            Math.floor(
                easedProgress * target
            );


        element.textContent =
            String(current).padStart(2, "0");


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            element.textContent =
                String(target).padStart(2, "0");

        }

    }


    requestAnimationFrame(updateCounter);

}



/* =========================================================
   09. COUNTER OBSERVER
   ========================================================= */

if (statNumbers.length > 0) {

    const counterObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        animateCounter(
                            entry.target
                        );


                        counterObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.7
            }

        );


    statNumbers.forEach(function (number) {

        counterObserver.observe(number);

    });

}



/* =========================================================
   10. PROJECT CARD INTERACTION
   ========================================================= */

const projectCards =
    document.querySelectorAll(".project-card");



projectCards.forEach(function (card) {

    card.addEventListener(
        "mouseenter",
        function () {

            card.classList.add("project-hover");

        }
    );


    card.addEventListener(
        "mouseleave",
        function () {

            card.classList.remove("project-hover");

        }
    );

});



/* =========================================================
   11. SERVICE CARD TILT
   ========================================================= */

const serviceCards =
    document.querySelectorAll(".service-card");



serviceCards.forEach(function (card) {

    card.addEventListener(
        "mousemove",
        function (event) {

            /*
               Only use the effect on larger screens.
            */

            if (window.innerWidth < 900) {

                return;

            }


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX - rect.left;


            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) / centerY) * -2;


            const rotateY =
                ((x - centerX) / centerX) * 2;


            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        function () {

            card.style.transform = "";

        }
    );

});



/* =========================================================
   12. HERO VISUAL PARALLAX
   ========================================================= */

const heroVisual =
    document.querySelector(".hero-visual");



window.addEventListener("mousemove", function (event) {

    if (!heroVisual) return;


    if (window.innerWidth < 900) {

        return;

    }


    const x =
        (event.clientX / window.innerWidth - 0.5);

    const y =
        (event.clientY / window.innerHeight - 0.5);


    const mainCard =
        document.querySelector(
            ".main-visual-card"
        );


    const floatingOne =
        document.querySelector(
            ".floating-card-one"
        );


    const floatingTwo =
        document.querySelector(
            ".floating-card-two"
        );


    if (mainCard) {

        mainCard.style.transform =
            `rotate(2deg)
             translate(${x * 8}px, ${y * 8}px)`;

    }


    if (floatingOne) {

        floatingOne.style.transform =
            `translate(${x * -14}px, ${y * -14}px)`;

    }


    if (floatingTwo) {

        floatingTwo.style.transform =
            `translate(${x * 12}px, ${y * 12}px)`;

    }

});



/* =========================================================
   13. INSIGHT CARD HOVER
   ========================================================= */

const insightCards =
    document.querySelectorAll(".insight-card");



insightCards.forEach(function (card) {

    card.addEventListener(
        "mouseenter",
        function () {

            const number =
                card.querySelector(
                    ".insight-number"
                );


            if (number) {

                number.style.transform =
                    "translateX(8px)";

            }

        }
    );


    card.addEventListener(
        "mouseleave",
        function () {

            const number =
                card.querySelector(
                    ".insight-number"
                );


            if (number) {

                number.style.transform =
                    "translateX(0)";

            }

        }
    );

});



/* =========================================================
   14. PROCESS ITEM HOVER
   ========================================================= */

const processItems =
    document.querySelectorAll(".process-item");



processItems.forEach(function (item) {

    item.addEventListener(
        "mouseenter",
        function () {

            item.classList.add("process-active");

        }
    );


    item.addEventListener(
        "mouseleave",
        function () {

            item.classList.remove("process-active");

        }
    );

});



/* =========================================================
   15. ESC KEY CLOSES MOBILE MENU
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            if (menuToggle) {

                menuToggle.classList.remove(
                    "active"
                );

            }


            if (mainNav) {

                mainNav.classList.remove(
                    "active"
                );

            }


            document.body.classList.remove(
                "menu-open"
            );

        }

    }
);



/* =========================================================
   16. RESIZE HANDLER
   ========================================================= */

window.addEventListener(
    "resize",
    function () {

        /*
           If the screen becomes desktop size,
           reset mobile navigation.
        */

        if (
            window.innerWidth > 768
        ) {

            if (menuToggle) {

                menuToggle.classList.remove(
                    "active"
                );

            }


            if (mainNav) {

                mainNav.classList.remove(
                    "active"
                );

            }


            document.body.classList.remove(
                "menu-open"
            );

        }

    }
);



/* =========================================================
   17. PAGE VISIBILITY
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    function () {

        if (
            document.visibilityState === "visible"
        ) {

            document.title =
                "Vedika Digital — Digital Marketing That Moves Brands Forward";

        }

    }
);



/* =========================================================
   18. CONSOLE BRAND MESSAGE
   ========================================================= */

console.log(
    "%cVedika Digital",
    "font-size: 22px; font-weight: bold;"
);

console.log(
    "Digital marketing with strategy, creativity and purpose."
);
