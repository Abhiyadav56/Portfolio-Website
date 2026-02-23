'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const logo = document.querySelector('.logo');
    const connectBtn = document.getElementById('connect-btn');
    const quoteBtn = document.getElementById('quote-btn');
    const quoteEmail = document.getElementById('quote-email');
    const quoteMessage = document.getElementById('quote-message');
    const projectButtons = document.querySelectorAll('.project-btn');

    const scrollToSection = (targetId) => {
        const section = document.getElementById(targetId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const updateQuoteMessage = (text, type) => {
        if (!quoteMessage) {
            return;
        }

        quoteMessage.textContent = text;
        quoteMessage.classList.remove('error', 'success');
        if (type) {
            quoteMessage.classList.add(type);
        }
    };

    navItems.forEach((item) => {
        const targetId = item.getAttribute('data-target');
        item.addEventListener('click', () => scrollToSection(targetId));
        item.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                scrollToSection(targetId);
            }
        });
    });

    if (logo) {
        logo.addEventListener('click', () => scrollToSection('home'));
    }

    if (connectBtn) {
        connectBtn.addEventListener('click', () => scrollToSection('contact'));
    }

    if (quoteBtn && quoteEmail) {
        quoteBtn.addEventListener('click', () => {
            const email = quoteEmail.value.trim();
            const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            if (!isValidEmail) {
                updateQuoteMessage('Please enter a valid email address.', 'error');
                quoteEmail.focus();
                return;
            }

            updateQuoteMessage('Opening your email app...', 'success');
            const subject = encodeURIComponent('Project Inquiry - Portfolio Website');
            const body = encodeURIComponent(`Hi Abhishek,%0D%0A%0D%0AI am interested in discussing a project.%0D%0AYou can reach me at: ${email}`);
            window.location.href = `mailto:singhyadavabhishek5674@gmail.com?subject=${subject}&body=${body}`;
        });
    }

    projectButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const projectName = button.getAttribute('data-project') || 'Project';
            const projectUrl = button.getAttribute('data-url');
            const status = button.getAttribute('data-status');

            if (status === 'ongoing') {
                window.alert(`${projectName} is currently ongoing. Demo link will be added soon.`);
                return;
            }

            if (projectUrl) {
                window.open(projectUrl, '_blank');
            } else {
                window.alert(`Project link not added for ${projectName} yet.`);
            }
        });
    });
});
