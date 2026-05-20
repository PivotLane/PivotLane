/* ============================================
   PivotLane - Main JavaScript
   ============================================ */

(function () {
    'use strict';

    // -- Mobile Navigation Toggle --
    var hamburger = document.getElementById('hamburger');
    var navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    // Close menu when a nav link is clicked
    navMenu.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });

    // -- Sticky Navbar on Scroll --
    var navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // -- Scroll Reveal Animations --
    var revealElements = document.querySelectorAll('.reveal');

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
        observer.observe(el);
    });

    // -- Active Nav Link Highlighting --
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function () {
        var scrollY = window.scrollY + 100;

        sections.forEach(function (section) {
            var top = section.offsetTop - 100;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // -- Service Card Pre-select Dropdown --
    document.querySelectorAll('[data-service]').forEach(function (el) {
        el.addEventListener('click', function () {
            var service = this.getAttribute('data-service');
            var dropdown = document.getElementById('service');
            if (dropdown) {
                dropdown.value = service;
            }
        });
    });

    // -- Form Validation --
    var form = document.getElementById('contactForm');

    form.addEventListener('submit', function (e) {
        var valid = true;

        // Clear previous errors
        form.querySelectorAll('.form-error').forEach(function (el) {
            el.remove();
        });
        form.querySelectorAll('.error').forEach(function (el) {
            el.classList.remove('error');
        });

        var name = document.getElementById('name');
        var email = document.getElementById('email');
        var message = document.getElementById('message');

        if (!name.value.trim()) {
            showError(name, 'Please enter your name');
            valid = false;
        }

        if (!email.value.trim()) {
            showError(email, 'Please enter your email');
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            showError(email, 'Please enter a valid email address');
            valid = false;
        }

        if (!message.value.trim()) {
            showError(message, 'Please enter a message');
            valid = false;
        }

        if (!valid) {
            e.preventDefault();
        }
    });

    function showError(input, msg) {
        input.classList.add('error');
        var errorEl = document.createElement('div');
        errorEl.className = 'form-error';
        errorEl.textContent = msg;
        input.parentElement.appendChild(errorEl);
    }
})();
