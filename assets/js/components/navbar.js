/**
 * =========================================================
 * FLEXEN NAVBAR CONTROLLER
 *
 * Handles:
 * 1. Mobile open / close
 * 2. Services / Markets dropdowns
 * 3. Outside-click closing
 * 4. Escape closing
 * 5. Close mobile menu after navigation
 * 6. Body scroll lock
 * 7. Active-page detection
 * 8. Sticky / compact scroll behavior
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const header =
        document.querySelector("#site-header");

    const mobileToggle =
        document.querySelector(".mobile-menu-toggle");

    const mobileNavigation =
        document.querySelector("#mobile-navigation");

    const mobileClose =
        document.querySelector(".mobile-navigation__close");


    /* =====================================================
       SAFETY CHECK
       ===================================================== */

    if (!header) return;


    /* =====================================================
       STATE
       ===================================================== */

    let mobileMenuOpen = false;

    let lastScrollPosition = window.scrollY;


    /* =====================================================
       UTILITY: GET ALL DROPDOWNS
       ===================================================== */

    const desktopDropdowns =
        Array.from(
            document.querySelectorAll(".nav-dropdown")
        );

    const mobileDropdowns =
        Array.from(
            document.querySelectorAll(".mobile-dropdown")
        );


    /* =====================================================
       1. MOBILE MENU — OPEN
       ===================================================== */

    const openMobileMenu = () => {

        if (!mobileNavigation) return;

        mobileMenuOpen = true;

        mobileNavigation.hidden = false;

        mobileNavigation.classList.add("is-open");

        mobileToggle?.setAttribute(
            "aria-expanded",
            "true"
        );

        mobileToggle?.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        document.body.classList.add("menu-open");

        /*
         * Prevent background scrolling.
         */
        document.documentElement.classList.add(
            "menu-open"
        );


        /*
         * Close any open desktop dropdowns.
         */
        closeAllDesktopDropdowns();
    };


    /* =====================================================
       1. MOBILE MENU — CLOSE
       ===================================================== */

    const closeMobileMenu = () => {

        if (!mobileNavigation) return;

        mobileMenuOpen = false;

        mobileNavigation.classList.remove("is-open");

        mobileNavigation.hidden = true;

        mobileToggle?.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileToggle?.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        document.body.classList.remove("menu-open");

        document.documentElement.classList.remove(
            "menu-open"
        );

        /*
         * Close mobile dropdowns too.
         */
        closeAllMobileDropdowns();
    };


    /* =====================================================
       MOBILE TOGGLE
       ===================================================== */

    mobileToggle?.addEventListener("click", () => {

        if (mobileMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }

    });


    /* =====================================================
       MOBILE CLOSE BUTTON
       ===================================================== */

    mobileClose?.addEventListener(
        "click",
        closeMobileMenu
    );


    /* =====================================================
       2. DESKTOP DROPDOWNS
       ===================================================== */

    const openDesktopDropdown = (dropdown) => {

        const trigger =
            dropdown.querySelector(
                ".nav-dropdown__trigger"
            );

        const menu =
            dropdown.querySelector(
                ".nav-dropdown__menu"
            );

        if (!trigger || !menu) return;


        /*
         * Close all other desktop dropdowns.
         */
        closeAllDesktopDropdowns(dropdown);


        trigger.setAttribute(
            "aria-expanded",
            "true"
        );

        menu.hidden = false;

        dropdown.classList.add("is-open");
    };


    const closeDesktopDropdown = (dropdown) => {

        const trigger =
            dropdown.querySelector(
                ".nav-dropdown__trigger"
            );

        const menu =
            dropdown.querySelector(
                ".nav-dropdown__menu"
            );

        if (!trigger || !menu) return;


        trigger.setAttribute(
            "aria-expanded",
            "false"
        );

        menu.hidden = true;

        dropdown.classList.remove("is-open");
    };


    const closeAllDesktopDropdowns = (
        except = null
    ) => {

        desktopDropdowns.forEach(dropdown => {

            if (dropdown === except) return;

            closeDesktopDropdown(dropdown);

        });
    };


    /*
     * Attach desktop dropdown click handlers.
     */
    desktopDropdowns.forEach(dropdown => {

        const trigger =
            dropdown.querySelector(
                ".nav-dropdown__trigger"
            );

        if (!trigger) return;


        trigger.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const isOpen =
                    trigger.getAttribute(
                        "aria-expanded"
                    ) === "true";


                if (isOpen) {

                    closeDesktopDropdown(
                        dropdown
                    );

                } else {

                    openDesktopDropdown(
                        dropdown
                    );

                }

            }
        );

    });


    /* =====================================================
       2. MOBILE DROPDOWNS
       ===================================================== */

    const openMobileDropdown = (dropdown) => {

        const trigger =
            dropdown.querySelector(
                ".mobile-dropdown__trigger"
            );

        const menu =
            dropdown.querySelector(
                ".mobile-dropdown_menu"
            );

        if (!trigger || !menu) return;


        /*
         * Only one mobile dropdown open at a time.
         */
        closeAllMobileDropdowns(dropdown);


        trigger.setAttribute(
            "aria-expanded",
            "true"
        );

        menu.hidden = false;

        dropdown.classList.add("is-open");
    };


    const closeMobileDropdown = (dropdown) => {

        const trigger =
            dropdown.querySelector(
                ".mobile-dropdown__trigger"
            );

        const menu =
            dropdown.querySelector(
                ".mobile-dropdown_menu"
            );

        if (!trigger || !menu) return;


        trigger.setAttribute(
            "aria-expanded",
            "false"
        );

        menu.hidden = true;

        dropdown.classList.remove("is-open");
    };


    const closeAllMobileDropdowns = (
        except = null
    ) => {

        mobileDropdowns.forEach(dropdown => {

            if (dropdown === except) return;

            closeMobileDropdown(dropdown);

        });
    };


    /*
     * Attach mobile dropdown handlers.
     */
    mobileDropdowns.forEach(dropdown => {

        const trigger =
            dropdown.querySelector(
                ".mobile-dropdown__trigger"
            );

        if (!trigger) return;


        trigger.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const isOpen =
                    trigger.getAttribute(
                        "aria-expanded"
                    ) === "true";


                if (isOpen) {

                    closeMobileDropdown(
                        dropdown
                    );

                } else {

                    openMobileDropdown(
                        dropdown
                    );

                }

            }
        );

    });


    /* =====================================================
       3. OUTSIDE CLICK
       ===================================================== */

    document.addEventListener(
        "click",
        event => {

            /*
             * Close desktop dropdowns when
             * clicking outside the navbar.
             */
            if (
                !header.contains(event.target)
            ) {

                closeAllDesktopDropdowns();

            }


            /*
             * If mobile navigation uses a full-screen
             * overlay, clicking the overlay itself closes it.
             */
            if (
                mobileMenuOpen &&
                mobileNavigation &&
                event.target === mobileNavigation
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       4. ESCAPE KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }


            /*
             * Close desktop dropdowns.
             */
            closeAllDesktopDropdowns();


            /*
             * Close mobile dropdowns.
             */
            closeAllMobileDropdowns();


            /*
             * Close mobile menu.
             */
            if (mobileMenuOpen) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       5. CLOSE MOBILE MENU AFTER NAVIGATION
       ===================================================== */

    if (mobileNavigation) {

        const mobileLinks =
            mobileNavigation.querySelectorAll(
                "a"
            );


        mobileLinks.forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    /*
                     * Don't interfere with
                     * dropdown triggers.
                     */
                    closeMobileMenu();

                }
            );

        });

    }


    /* =====================================================
       6. BODY SCROLL LOCK
       ===================================================== */

    /*
     * CSS:
     *
     * body.menu-open {
     *     overflow: hidden;
     * }
     *
     * html.menu-open {
     *     overflow: hidden;
     * }
     *
     * We add/remove these classes in the
     * open/close functions above.
     */


    /* =====================================================
       7. ACTIVE PAGE DETECTION
       ===================================================== */

    const normalizePath = path => {

        if (!path) return "/";

        /*
         * Remove query strings.
         */
        path = path.split("?")[0];

        /*
         * Remove hash.
         */
        path = path.split("#")[0];

        /*
         * Convert index.html to directory root.
         */
        path = path.replace(
            /\/index\.html$/,
            "/"
        );

        /*
         * Ensure trailing slash.
         */
        if (
            !path.endsWith("/")
        ) {

            path += "/";

        }

        /*
         * Prevent empty path.
         */
        if (path === "") {
            path = "/";
        }

        return path;
    };


    const currentPath =
        normalizePath(
            window.location.pathname
        );


    const isSamePath = (
        linkPath,
        currentPath
    ) => {

        return normalizePath(
            linkPath
        ) === currentPath;

    };


    /*
     * Find navigation links.
     */
    const allNavigationLinks =
        document.querySelectorAll(
            ".navbar_menu a, .mobile-navigation a"
        );


    allNavigationLinks.forEach(link => {

        /*
         * Ignore links without href.
         */
        const href =
            link.getAttribute("href");

        if (!href) return;


        /*
         * Ignore:
         * - #
         * - mailto
         * - tel
         * - javascript
         * - external URLs
         */
        if (
            href === "#" ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:") ||
            href.startsWith("javascript:")
        ) {
            return;
        }


        let linkURL;

        try {

            linkURL =
                new URL(
                    href,
                    window.location.href
                );

        } catch {
            return;
        }


        /*
         * Only process same-origin links.
         */
        if (
            linkURL.origin !==
            window.location.origin
        ) {
            return;
        }


        const linkPath =
            normalizePath(
                linkURL.pathname
            );


        if (
            isSamePath(
                linkPath,
                currentPath
            )
        ) {

            link.setAttribute(
                "aria-current",
                "page"
            );

        } else {

            /*
             * Don't remove manually supplied
             * aria-current if you intentionally
             * set one.
             */
            if (
                link.getAttribute(
                    "aria-current"
                ) === "page"
            ) {

                link.removeAttribute(
                    "aria-current"
                );

            }

        }

    });


    /* =====================================================
       ACTIVE PARENT DROPDOWN
       ===================================================== */

    desktopDropdowns.forEach(dropdown => {

        const links =
            dropdown.querySelectorAll(
                ".nav-dropdown__menu a"
            );

        const trigger =
            dropdown.querySelector(
                ".nav-dropdown__trigger"
            );


        const childIsActive =
            Array.from(links).some(link =>
                link.getAttribute(
                    "aria-current"
                ) === "page"
            );


        if (
            childIsActive &&
            trigger
        ) {

            dropdown.classList.add(
                "has-active-child"
            );

        }

    });


    /* =====================================================
       8. STICKY / COMPACT SCROLL BEHAVIOR
       ===================================================== */

    const SCROLL_THRESHOLD = 30;


    const updateScrollState = () => {

        const currentScroll =
            window.scrollY;


        /*
         * Compact state.
         */
        header.classList.toggle(
            "is-scrolled",
            currentScroll > SCROLL_THRESHOLD
        );


        /*
         * Optional scroll direction classes.
         *
         * These are useful later if you want
         * hide-on-scroll behavior.
         */

        if (
            currentScroll > lastScrollPosition &&
            currentScroll > 100
        ) {

            header.classList.add(
                "scrolling-down"
            );

            header.classList.remove(
                "scrolling-up"
            );

        } else if (
            currentScroll < lastScrollPosition
        ) {

            header.classList.add(
                "scrolling-up"
            );

            header.classList.remove(
                "scrolling-down"
            );

        }


        lastScrollPosition =
            Math.max(
                currentScroll,
                0
            );

    };


    /*
     * Initial state.
     */
    updateScrollState();


    /*
     * Listen for scrolling.
     */
    window.addEventListener(
        "scroll",
        updateScrollState,
        {
            passive: true
        }
    );


    /* =====================================================
       RESPONSIVE CLEANUP
       ===================================================== */

    /*
     * If a user opens mobile navigation and then
     * resizes to desktop, clean everything up.
     */

    const desktopBreakpoint =
        window.matchMedia(
            "(min-width: 961px)"
        );


    const handleBreakpointChange = event => {

        if (event.matches) {

            closeMobileMenu();

            closeAllMobileDropdowns();

        }

    };


    desktopBreakpoint.addEventListener(
        "change",
        handleBreakpointChange
    );

});

/* =========================================================
   ACCESSIBILITY
   DESKTOP DROPDOWN KEYBOARD NAVIGATION
   ========================================================= */

desktopDropdowns.forEach(dropdown => {

    const trigger =
        dropdown.querySelector(
            ".nav-dropdown__trigger"
        );

    const menu =
        dropdown.querySelector(
            ".nav-dropdown__menu"
        );

    if (!trigger || !menu) return;


    trigger.addEventListener(
        "keydown",
        event => {

            const links =
                Array.from(
                    menu.querySelectorAll("a")
                );

            if (!links.length) return;


            /* ---------------------------------------------
               ARROW DOWN
               --------------------------------------------- */

            if (
                event.key === "ArrowDown"
            ) {

                event.preventDefault();

                openDesktopDropdown(
                    dropdown
                );

                links[0].focus();

            }


            /* ---------------------------------------------
               ARROW UP
               --------------------------------------------- */

            else if (
                event.key === "ArrowUp"
            ) {

                event.preventDefault();

                openDesktopDropdown(
                    dropdown
                );

                links[
                    links.length - 1
                ].focus();

            }


            /* ---------------------------------------------
               ENTER / SPACE
               --------------------------------------------- */

            else if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                const isOpen =
                    trigger.getAttribute(
                        "aria-expanded"
                    ) === "true";


                if (isOpen) {

                    closeDesktopDropdown(
                        dropdown
                    );

                } else {

                    openDesktopDropdown(
                        dropdown
                    );

                }

            }

        }
    );


    /* =====================================================
       KEYBOARD NAVIGATION INSIDE MENU
       ===================================================== */

    menu.addEventListener(
        "keydown",
        event => {

            const links =
                Array.from(
                    menu.querySelectorAll("a")
                );

            const currentIndex =
                links.indexOf(
                    document.activeElement
                );


            if (
                currentIndex === -1
            ) {
                return;
            }


            /* ---------------------------------------------
               ARROW DOWN
               --------------------------------------------- */

            if (
                event.key === "ArrowDown"
            ) {

                event.preventDefault();

                const nextIndex =
                    currentIndex <
                    links.length - 1
                        ? currentIndex + 1
                        : 0;

                links[nextIndex].focus();

            }


            /* ---------------------------------------------
               ARROW UP
               --------------------------------------------- */

            else if (
                event.key === "ArrowUp"
            ) {

                event.preventDefault();

                const previousIndex =
                    currentIndex > 0
                        ? currentIndex - 1
                        : links.length - 1;

                links[previousIndex].focus();

            }


            /* ---------------------------------------------
               HOME
               --------------------------------------------- */

            else if (
                event.key === "Home"
            ) {

                event.preventDefault();

                links[0].focus();

            }


            /* ---------------------------------------------
               END
               --------------------------------------------- */

            else if (
                event.key === "End"
            ) {

                event.preventDefault();

                links[
                    links.length - 1
                ].focus();

            }


            /* ---------------------------------------------
               ESCAPE
               --------------------------------------------- */

            else if (
                event.key === "Escape"
            ) {

                event.preventDefault();

                closeDesktopDropdown(
                    dropdown
                );

                trigger.focus();

            }


            /* ---------------------------------------------
               LEFT / RIGHT
               --------------------------------------------- */

            else if (
                event.key === "ArrowRight" ||
                event.key === "ArrowLeft"
            ) {

                closeDesktopDropdown(
                    dropdown
                );

                trigger.focus();

            }

        }
    );

});

/* =========================================================
   MOBILE DROPDOWN KEYBOARD ACCESSIBILITY
   ========================================================= */

mobileDropdowns.forEach(dropdown => {

    const trigger =
        dropdown.querySelector(
            ".mobile-dropdown__trigger"
        );

    const menu =
        dropdown.querySelector(
            ".mobile-dropdown_menu"
        );

    if (!trigger || !menu) return;


    trigger.addEventListener(
        "keydown",
        event => {

            const links =
                Array.from(
                    menu.querySelectorAll("a")
                );

            if (!links.length) return;


            if (
                event.key === "ArrowDown"
            ) {

                event.preventDefault();

                openMobileDropdown(
                    dropdown
                );

                links[0].focus();

            }


            else if (
                event.key === "ArrowUp"
            ) {

                event.preventDefault();

                openMobileDropdown(
                    dropdown
                );

                links[
                    links.length - 1
                ].focus();

            }

        }
    );


    menu.addEventListener(
        "keydown",
        event => {

            const links =
                Array.from(
                    menu.querySelectorAll("a")
                );

            const currentIndex =
                links.indexOf(
                    document.activeElement
                );

            if (
                currentIndex === -1
            ) {
                return;
            }


            if (
                event.key === "ArrowDown"
            ) {

                event.preventDefault();

                links[
                    (currentIndex + 1) %
                    links.length
                ].focus();

            }


            else if (
                event.key === "ArrowUp"
            ) {

                event.preventDefault();

                links[
                    (currentIndex - 1 +
                        links.length) %
                    links.length
                ].focus();

            }


            else if (
                event.key === "Home"
            ) {

                event.preventDefault();

                links[0].focus();

            }


            else if (
                event.key === "End"
            ) {

                event.preventDefault();

                links[
                    links.length - 1
                ].focus();

            }


            else if (
                event.key === "Escape"
            ) {

                event.preventDefault();

                closeMobileDropdown(
                    dropdown
                );

                trigger.focus();

            }

        }
    );

});

const closeMobileMenu = () => {

    if (!mobileNavigation) return;


    mobileMenuOpen = false;


    mobileNavigation.classList.remove(
        "is-open"
    );

    mobileNavigation.hidden = true;


    mobileToggle?.setAttribute(
        "aria-expanded",
        "false"
    );

    mobileToggle?.setAttribute(
        "aria-label",
        "Open navigation menu"
    );


    document.body.classList.remove(
        "menu-open"
    );

    document.documentElement.classList.remove(
        "menu-open"
    );


    closeAllMobileDropdowns();


    /*
     * Restore focus to the element that opened
     * the navigation.
     */

    if (
        lastFocusedElement &&
        typeof lastFocusedElement.focus ===
            "function"
    ) {

        requestAnimationFrame(() => {

            lastFocusedElement.focus();

        });

    }

};

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

document.addEventListener(
    "keydown",
    trapMobileFocus
);