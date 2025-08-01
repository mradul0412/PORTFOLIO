// Navigation highlighting
// --- DYNAMIC PROJECTS & INTERNSHIPS DATA ---
const projectsData = [
    {
        title: 'Personal Portfolio Website',
        description: 'Modern responsive portfolio built with HTML5, CSS3, JavaScript, Bootstrap 5, EmailJS, and Intersection Observer API. Features include dynamic content loading, smooth scrolling navigation, mobile-responsive design, contact form with email integration, and social media links.',
        link: 'https://github.com/mradul0412/PORTFOLIO',
        code: 'https://github.com/mradul0412/PORTFOLIO'
    },
    {
        title: 'Weather App',
        description: 'A weather forecast app using OpenWeatherMap API and vanilla JS.',
        link: '#',
        code: '#'
    },
    {
        title: 'Task Manager',
        description: 'A simple task manager built with React and localStorage.',
        link: '#',
        code: '#'
    }
];

const internshipData = [
    {
        company: 'Tech Solutions Ltd.',
        role: 'Web Development Intern',
        period: 'June 2023 - August 2023',
        description: 'Worked on building responsive web pages and collaborating with the dev team.'
    },
    {
        company: 'Data Insights Inc.',
        role: 'Data Analyst Intern',
        period: 'Jan 2023 - May 2023',
        description: 'Analyzed large datasets and created interactive dashboards.'
    }
];

// --- DYNAMIC SKILLS DATA & BOOTSTRAP ACCORDION ---
const skills = [
  { name: 'HTML5', details: 'Semantic markup, accessibility, SEO best practices.' },
  { name: 'CSS3', details: 'Flexbox, Grid, animations, responsive design.' },
  { name: 'JavaScript', details: 'ES6+, DOM manipulation, fetch API, async/await.' },
  { name: 'React', details: 'Hooks, state management, component lifecycle.' },
  { name: 'Node.js', details: 'Express, REST APIs, middleware.' },
  { name: 'Python', details: 'Scripting, data analysis, automation.' },
  { name: 'Git', details: 'Branching, merging, GitHub workflows.' },
  { name: 'MongoDB', details: 'CRUD operations, schema design, aggregation.' }
];

document.addEventListener('DOMContentLoaded', () => {
    // --- DYNAMIC PROJECTS ---
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        projectsData.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div style="margin-top:12px;">
                    <a href="${project.link}" class="btn" target="_blank" style="margin-right:10px;color:#3a8dde;text-decoration:underline;">Live</a>
                    <a href="${project.code}" class="btn" target="_blank" style="color:#ff7e5f;text-decoration:underline;">Code</a>
                </div>
            `;
            projectsContainer.appendChild(card);
        });
    }

    // --- DYNAMIC INTERNSHIPS ---
    const internshipContainer = document.getElementById('internship-container');
    if (internshipContainer) {
        internshipData.forEach(intern => {
            const card = document.createElement('div');
            card.className = 'internship-card';
            card.innerHTML = `
                <h3>${intern.company}</h3>
                <p><strong>${intern.role}</strong></p>
                <p style="color:#888;font-size:0.95em;">${intern.period}</p>
                <p>${intern.description}</p>
            `;
            internshipContainer.appendChild(card);
        });
    }

    // Render Bootstrap accordion for skills
    const skillsAccordion = document.getElementById('skills-accordion');
    if (skillsAccordion) {
        skillsAccordion.innerHTML = skills.map((skill, idx) => `
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading${idx}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${idx}" aria-expanded="false" aria-controls="collapse${idx}">
                        ${skill.name}
                    </button>
                </h2>
                <div id="collapse${idx}" class="accordion-collapse collapse" aria-labelledby="heading${idx}" data-bs-parent="#skills-accordion">
                    <div class="accordion-body">
                        ${skill.details}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // --- NAVIGATION HIGHLIGHTING ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // --- SMOOTH SCROLLING ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- MOBILE MENU TOGGLE ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            if (window.innerWidth <= 768) {
                navMenu.style.display = 'none';
            }
        }
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.style.display = 'flex';
        } else {
            navMenu.style.display = 'none';
        }
    });

    // --- SECTION ANIMATION (Intersection Observer) ---
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });

    // --- CARD ANIMATION (Projects & Internships) ---
    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.project-card, .internship-card').forEach(card => {
        cardObserver.observe(card);
    });

    // --- CONTACT FORM (EmailJS Implementation) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // EmailJS initialization - Replace YOUR_USER_ID with your actual EmailJS User ID
        emailjs.init("6BaUtvhLdcslT6QJO");
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form data collect karo
            const formData = {
                name: this.name.value,
                email: this.email.value,
                message: this.message.value
            };
            
            // Email send karo - Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID with actual values
            emailjs.send('service_pvs9fmc', 'template_jko51u2', formData)
                .then(function(response) {
                    alert('Message sent successfully!');
                    contactForm.reset();
                }, function(error) {
                    alert('Failed to send message. Please try again.');
                });
        });
    }
}); 