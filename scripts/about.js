document.addEventListener('DOMContentLoaded', () => {
    // Skill Bar Animation
    const progressBars = document.querySelectorAll('.progress-bar .progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });

    // Show Subskills on Click
    const skillBars = document.querySelectorAll('.progress-bar');
    skillBars.forEach(bar => {
        bar.addEventListener('click', () => {
            const subskills = bar.getAttribute('data-skill').split(',').join(', ');
            const skillName = bar.parentElement.querySelector('h3').textContent;
            showSubskills(skillName, subskills);
        });
    });

    // Certification Details Modal
    const certifications = document.querySelectorAll('.certification');
    const modal = createModal();

    certifications.forEach(cert => {
        cert.addEventListener('click', () => {
            const details = cert.getAttribute('data-details');
            const title = cert.querySelector('h3').textContent;
            openModal(modal, title, details);
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

function createModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2 id="modal-title"></h2>
            <p id="modal-details"></p>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.close-button').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    return modal;
}

function openModal(modal, title, details) {
    modal.querySelector('#modal-title').textContent = title;
    modal.querySelector('#modal-details').textContent = details;
    modal.style.display = 'block';
}

function showSubskills(skillName, subskills) {
    const modal = createModal();
    openModal(modal, skillName, subskills);
}

// Add additional CSS for modal in your CSS file
// Append this to your styles.css
const modalCSS = `
.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px;
    border-radius: 10px;
    position: relative;
}

.close-button {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close-button:hover {
    color: black;
}
`;

const styleElement = document.createElement('style');
styleElement.textContent = modalCSS;
document.head.appendChild(styleElement);