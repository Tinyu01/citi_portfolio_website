// Navigation Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.getElementById('navLinks');
    const openMenu = document.getElementById('openMenu');
    const closeMenu = document.getElementById('closeMenu');

    // Open mobile menu
    openMenu.addEventListener('click', function() {
        navLinks.classList.add('active');
    });

    // Close mobile menu
    closeMenu.addEventListener('click', function() {
        navLinks.classList.remove('active');
    });

    // Close menu when clicking on a link (mobile)
    const menuLinks = document.querySelectorAll('.nav-links ul li a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Skills animation on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    const animateSkills = () => {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (barPosition < screenPosition) {
                bar.style.width = bar.style.width;
                bar.classList.add('animated');
            }
        });
    };

    // Add animation class on scroll
    window.addEventListener('scroll', () => {
        animateSkills();
    });
    
    // Trigger once on load
    animateSkills();

    // Certificate modal functionality
    const modal = document.getElementById('certModal');
    const certDetails = document.getElementById('certDetails');
    const closeModal = document.querySelector('.close-modal');
    const viewButtons = document.querySelectorAll('.view-details-btn');

    // Certificate details data
    const certificationData = {
        'Cloud Application Developer': {
            title: 'Cloud Application Developer',
            issuer: 'IBM',
            issued: 'August 2023',
            description: 'This certification validates skills in building, deploying, and managing applications on cloud platforms using microservices, containers, and serverless architectures.',
            skills: ['Cloud Architecture', 'Microservices', 'Kubernetes', 'Docker', 'CI/CD Pipelines']
        },
        'IoT Cloud Developer': {
            title: 'IoT Cloud Developer',
            issuer: 'IBM',
            issued: 'September 2023',
            description: 'This certification demonstrates expertise in developing IoT solutions that connect devices to cloud platforms and analyze data for intelligent decision-making.',
            skills: ['IoT Protocols', 'Edge Computing', 'Data Analytics', 'Cloud Integration', 'Device Management']
        },
        'Threat Intelligence and Hunting': {
            title: 'Getting Started with Threat Intelligence and Hunting',
            issuer: 'Cisco',
            issued: 'May 2023',
            description: 'This certification covers essential skills in identifying and responding to cyber threats through proactive threat hunting and intelligence analysis.',
            skills: ['Threat Detection', 'Security Analysis', 'OSINT', 'Incident Response', 'Threat Modeling']
        },
        'Introduction to Cybersecurity': {
            title: 'Introduction to Cybersecurity',
            issuer: 'Cisco',
            issued: 'March 2023',
            description: 'This certification establishes foundational knowledge in cybersecurity concepts, including network security, cryptography, and secure software development.',
            skills: ['Network Security', 'Cryptography', 'Security Policies', 'Risk Assessment', 'Compliance']
        },
        'ALX Software Engineering': {
            title: 'ALX Software Engineering',
            issuer: 'ALX Africa',
            issued: 'December 2022',
            description: 'This comprehensive program covers full-stack software engineering skills with a focus on real-world projects and collaborative development practices.',
            skills: ['Full-stack Development', 'Algorithms', 'System Design', 'DevOps', 'Agile Methodologies']
        }
    };

    // Open certificate modal
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const certName = this.parentElement.getAttribute('data-cert');
            const certData = certificationData[certName];
            
            if (certData) {
                let modalContent = `
                    <h2>${certData.title}</h2>
                    <div class="cert-detail-item">
                        <h4>Issuer:</h4>
                        <p>${certData.issuer}</p>
                    </div>
                    <div class="cert-detail-item">
                        <h4>Date Issued:</h4>
                        <p>${certData.issued}</p>
                    </div>
                    <div class="cert-detail-item">
                        <h4>Description:</h4>
                        <p>${certData.description}</p>
                    </div>
                    <div class="cert-detail-item">
                        <h4>Skills:</h4>
                        <div class="cert-skills">
                            ${certData.skills.map(skill => `<span>${skill}</span>`).join('')}
                        </div>
                    </div>
                `;
                
                certDetails.innerHTML = modalContent;
                modal.style.display = 'block';
                
                // Add styles for the certificate skills
                const skillElements = document.querySelectorAll('.cert-skills span');
                skillElements.forEach(el => {
                    el.style.display = 'inline-block';
                    el.style.backgroundColor = '#3b82f6';
                    el.style.color = 'white';
                    el.style.padding = '5px 10px';
                    el.style.borderRadius = '20px';
                    el.style.margin = '5px';
                    el.style.fontSize = '0.8rem';
                });
                
                // Style for cert detail items
                const detailItems = document.querySelectorAll('.cert-detail-item');
                detailItems.forEach(item => {
                    item.style.marginBottom = '20px';
                });
            }
        });
    });

    // Close modal when clicking the X
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && subject && message) {
                // In a real application, you would send this data to a server
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields');
            }
        });
    }

    // Add animation to timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    const animateTimeline = () => {
        timelineItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (itemPosition < screenPosition) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize timeline item styles
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease';
    });

    // Add scroll event for timeline animation
    window.addEventListener('scroll', () => {
        animateTimeline();
    });
    
    // Trigger once on load
    animateTimeline();
});