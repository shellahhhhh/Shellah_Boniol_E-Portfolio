document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Typed Text ---
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        new Typed('.typing-text', {
            strings: ['Frontend Developer', 'Web Developer', 'UI/UX Designer'],
            typeSpeed: 70,
            backSpeed: 70,
            backDelay: 1000,
            loop: true,
        });
    }

    // --- 2. Progress Bars Observer ---
    const progressBars = document.querySelectorAll('.progress-done');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percentage = entry.target.getAttribute('data-done');
                entry.target.style.width = percentage + '%';
                entry.target.innerText = percentage + '%';
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => progressObserver.observe(bar));

    // --- 3. About Section Observer ---
    const aboutSection = document.querySelector(".about");
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in");
                }
            });
        }, { threshold: 0.5 });
        aboutObserver.observe(aboutSection);
    }

    // --- 4. Custom Cursor ---
    const cursorInner = document.querySelector('.cursor-inner');
    const cursorOuter = document.querySelector('.cursor-outer');

    // Skip custom cursor on touch/coarse devices (mobile, tablet), use native touch interactions
    const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (isTouchDevice) {
        if (cursorInner) cursorInner.style.display = 'none';
        if (cursorOuter) cursorOuter.style.display = 'none';
        document.documentElement.style.cursor = 'auto';
        return;
    }

    if (cursorInner && cursorOuter) {
        const moveCursor = (x, y) => {
            cursorInner.style.left = `${x}px`;
            cursorInner.style.top = `${y}px`;
            cursorOuter.style.left = `${x}px`;
            cursorOuter.style.top = `${y}px`;
        };

        document.addEventListener('pointermove', (e) => {
            const x = e.clientX;
            const y = e.clientY;

            cursorInner.style.visibility = 'visible';
            cursorOuter.style.visibility = 'visible';

            moveCursor(x, y);
        }, { passive: true });

        document.addEventListener('mousedown', () => {
            cursorInner.classList.add('cursor-click');
            cursorOuter.classList.add('cursor-click');
        });

        document.addEventListener('mouseup', () => {
            cursorInner.classList.remove('cursor-click');
            cursorOuter.classList.remove('cursor-click');
        });

        document.querySelectorAll('a, button').forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursorInner.classList.add('cursor-hover');
                cursorOuter.classList.add('cursor-hover');
            });
            link.addEventListener('mouseleave', () => {
                cursorInner.classList.remove('cursor-hover');
                cursorOuter.classList.remove('cursor-hover');
            });
        });
    }
});

// --- 5. Scroll Progress & Back to Top ---
// This can stay outside DOMContentLoaded as it triggers on scroll
window.addEventListener("scroll", () => {
    const backToTop = document.getElementById("backToTop");
    const scrollLine = document.getElementById("scrollLine");

    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    if (scrollLine) {
        scrollLine.style.height = scrolled + "%";
    }

    if (backToTop) {
        if (winScroll > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    }
});

// --- 6. Hamburger Menu Toggle ---
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('nav-list');

if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
        const isOpen = navList.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        
        // Optional: Change icon to an 'X' when open
        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });

    // Close menu when clicking a link
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);

if (themeToggle) {
    if (currentTheme === 'light') {
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }

    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        if (theme === 'dark') {
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    });
}