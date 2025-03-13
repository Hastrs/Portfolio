const expirationDate = new Date();
expirationDate.setMonth(expirationDate.getMonth() + 1);
localStorage.setItem("tempData", "Hello, World!");
localStorage.setItem("expiration", expirationDate.getTime());

const storedData = localStorage.getItem("tempData");
const storedExpiration = localStorage.getItem("expiration");

if (storedData && storedExpiration) {
    if (new Date().getTime() > storedExpiration) {
        localStorage.removeItem("tempData");
        localStorage.removeItem("expiration");
        console.log("Data expired and removed.");
    } else {
        console.log("Stored data:", storedData);
    }
} else {
    console.log("No stored data found.");
}


/*==================== MENU SHOW/HIDE ====================*/
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuIcon.classList.toggle('fa-times');

    if (navbar.classList.contains('active')) {
        navbar.style.transform = 'translateX(0)';
    } else {
        navbar.style.transform = 'translateX(-100%)';
    }
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

/*==================== STICKY HEADER ====================*/
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);
    
    // Close mobile menu when scrolling
    navbar.classList.remove('active');
    menuIcon.classList.remove('fa-times');
});

/*==================== SKILL BAR ANIMATION ====================*/
const skillBars = document.querySelectorAll('.skill-percent');
const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.style.width = percent;
    });
};
const checkVisibility = () => {
    const skillSection = document.querySelector('.skills');
    const sectionPos = skillSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    if (sectionPos < screenPosition) {
        animateSkillBars();
    }
};
window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

// Initialize EmailJS
emailjs.init("8PDRbR8B7rrPWChpN");

/*==================== FORM SUBMISSION HANDLING WITH EMAILJS ====================*/
const form = document.querySelector('form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    

    const currentTime = new Date().toLocaleString();

    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        time: currentTime 
    };

    form.querySelector('button').innerText = "Sending...";

    emailjs.send("mail_hastr", "template_2qx2lqx", data)
        .then(() => {
            alert('Your message has been sent successfully!');
            form.reset();
            form.querySelector('button').innerText = "Message Sent ✅";
            setTimeout(() => {
                form.querySelector('button').innerText = "Send Message";
            }, 3000);
        })
        .catch((error) => {
            console.error("EmailJS error:", error);
            alert('Failed to send your message. Please try again later.');
            form.querySelector('button').innerText = "Send Message";
        });
});


/*==================== INITIALIZE AOS ANIMATIONS ====================*/
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        offset: 200,
        duration: 1000,
        easing: 'ease-in-out',
        once: true
    });
});

/*==================== SCROLL REVEAL ANIMATION ====================*/
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.about-content, .skill-box, .services-box, .portfolio-box, .testimonial-box, .contact form');
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('show');
        }
    });
});

/*==================== SMOOTH SCROLLING FOR INTERNAL LINKS ====================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
