document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    loadFooter();
    loadSavedTheme();
});


function loadNavbar() {
    fetch('../components/navbar.html')
        .then(res => res.text())
        .then(data => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                navbar.innerHTML = data;
                initNavbar();
            }
        })
        .catch(err => console.error('Navbar error:', err));
}


function loadFooter() {
    fetch('../components/footer.html')
        .then(res => res.text())
        .then(data => {
            const footer = document.getElementById('footer');
            if (footer) {
                footer.innerHTML = data;
            }
        })
        .catch(err => console.error('Footer error:', err));
}

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    loadSavedTheme();
    loadSavedDirection();
});


function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

function loadSavedDirection() {
    const savedDir = localStorage.getItem('direction') || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);
}


function initNavbar() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const themeToggle = document.getElementById('theme-toggle');
    const rtlToggle = document.getElementById('rtl-toggle');
    const body = document.body;
    const html = document.documentElement;


    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

  
    document.querySelectorAll('.nav-item').forEach(item => {
        const link = item.querySelector('.nav-link');
        const dropdown = item.querySelector('.dropdown-menu');

        if (link && dropdown) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 1023) {
                    e.preventDefault();
                    item.classList.toggle('open');

                    document.querySelectorAll('.nav-item').forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('open');
                        }
                    });
                }
            });
        }
    });

 
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            const isDark = body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }


    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const currentDir = html.getAttribute('dir');
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            html.setAttribute('dir', newDir);
            localStorage.setItem('direction', newDir);
        });
    }

    document.addEventListener('click', (e) => {
        if (
            navMenu &&
            hamburger &&
            navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

   
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1023) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');

            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('open');
            });
        }
    });
}