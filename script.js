// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(15, 15, 30, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 15, 30, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Typing Animation
const typingText = document.querySelector('.typing-text');
const texts = ['AI Solutions', 'Intelligent Agents', 'RAG Systems', 'Vector Databases', 'ML Innovation'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    if (!typingText) return;

    const currentText = texts[textIndex];

    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeText, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeText, 500);
    } else {
        setTimeout(typeText, isDeleting ? 50 : 100);
    }
}

typeText();

// Particle Animation
const canvas = document.getElementById('particles');
const ctx = canvas?.getContext('2d');

if (canvas && ctx) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animate particles
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        particles.forEach((particle, index) => {
            for (let j = index + 1; j < particles.length; j++) {
                const dx = particles[j].x - particle.x;
                const dy = particles[j].y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Resize canvas
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };

    // Create mailto link with form data
    const subject = `New Project Inquiry from ${formData.name}`;
    const body = `Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company || 'Not specified'}
Service Interested In: ${formData.service}

Message:
${formData.message}`;

    const mailtoLink = `mailto:contact@aiwebtech.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
    submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

    // Reset form
    setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = originalContent;
        submitBtn.style.background = '';
    }, 3000);
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.service-card, .portfolio-item, .stat-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add active nav link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.style.color = 'var(--text-secondary)';
            });
            if (navLink) {
                navLink.style.color = 'var(--primary-color)';
            }
        }
    });
});

// Add hover effect to portfolio items
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth reveal for service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const gradientBg = document.querySelector('.gradient-bg');

    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - scrolled / 700;
    }

    if (gradientBg) {
        gradientBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Initialize AOS-like animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.section-header, .about-text, .contact-info');

    const animateOnScroll = () => {
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;

            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('animate-visible');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
}

initScrollAnimations();

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-visible {
        animation: fadeInUp 1s ease forwards;
    }
`;
document.head.appendChild(style);

// Project Details Data
const projectDetails = {
    'customer-support': {
        title: 'Intelligent Customer Support Agent',
        image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&h=600&fit=crop',
        description: 'A comprehensive AI-powered customer support solution that revolutionizes how businesses interact with their customers. This intelligent agent uses advanced RAG (Retrieval-Augmented Generation) technology to provide accurate, contextual responses 24/7.',
        longDescription: 'Our cutting-edge customer support agent leverages the power of GPT-4 and custom-trained models to understand customer queries in natural language, access relevant information from vast knowledge bases, and provide personalized solutions. The system continuously learns from interactions, improving its accuracy and response quality over time.',
        features: [
            'Natural language understanding in 15+ languages',
            'Integration with existing CRM and ticketing systems',
            'Sentiment analysis for priority routing',
            'Automated ticket classification and tagging',
            'Real-time escalation to human agents when needed',
            'Custom knowledge base training',
            'Analytics dashboard with actionable insights'
        ],
        techStack: ['Python', 'LangChain', 'GPT-4', 'Pinecone', 'FastAPI', 'React', 'PostgreSQL', 'Redis'],
        metrics: {
            'Response Time': '< 2 seconds',
            'Accuracy Rate': '95.8%',
            'User Satisfaction': '4.8/5',
            'Cost Reduction': '67%',
            'Tickets Resolved': '85% automated'
        }
    },
    'document-intelligence': {
        title: 'Document Intelligence Platform',
        image: 'https://images.unsplash.com/photo-1618044619888-009e412ff12a?w=1200&h=600&fit=crop',
        description: 'Advanced document processing platform that transforms unstructured documents into actionable insights using state-of-the-art AI technology.',
        longDescription: 'This enterprise-grade platform processes legal contracts, invoices, reports, and other business documents with unprecedented accuracy. Using RAG technology and custom NLP models, it extracts key information, identifies risks, ensures compliance, and provides intelligent summaries.',
        features: [
            'Multi-format document processing (PDF, Word, Images)',
            'Contract analysis and risk assessment',
            'Compliance checking against regulations',
            'Key clause extraction and summarization',
            'Multi-document cross-referencing',
            'Version comparison and change tracking',
            'API integration for workflow automation'
        ],
        techStack: ['Python', 'Transformers', 'ChromaDB', 'OCR', 'spaCy', 'Django', 'Elasticsearch', 'Docker'],
        metrics: {
            'Processing Speed': '500 pages/min',
            'Extraction Accuracy': '99.2%',
            'Languages Supported': '12',
            'Documents Processed': '1M+ monthly',
            'Time Saved': '80% reduction'
        }
    },
    'semantic-search': {
        title: 'Enterprise Semantic Search Engine',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop',
        description: 'Next-generation search platform that understands context and intent, delivering highly relevant results using vector similarity matching.',
        longDescription: 'Our semantic search engine goes beyond keyword matching to understand the true meaning and context of queries. It uses advanced embedding models and vector databases to find conceptually similar content, even when exact keywords don\'t match.',
        features: [
            'Contextual understanding of queries',
            'Multi-modal search (text, images, code)',
            'Real-time index updates',
            'Faceted search and filtering',
            'Search analytics and insights',
            'Custom embedding model training',
            'RESTful API for easy integration'
        ],
        techStack: ['Python', 'Pinecone', 'BERT', 'Sentence-Transformers', 'FastAPI', 'React', 'Kubernetes', 'MinIO'],
        metrics: {
            'Query Latency': '< 100ms',
            'Index Size': '10M+ vectors',
            'Relevance Score': '92%',
            'Daily Queries': '500K+',
            'Uptime': '99.99%'
        }
    },
    'predictive-analytics': {
        title: 'Predictive Analytics Dashboard',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
        description: 'ML-powered forecasting platform that provides real-time insights and predictions for supply chain optimization.',
        longDescription: 'This comprehensive analytics solution uses advanced time series analysis, deep learning models, and real-time data processing to forecast demand, optimize inventory, and predict supply chain disruptions before they occur.',
        features: [
            'Demand forecasting with 94% accuracy',
            'Inventory optimization algorithms',
            'Supply chain risk assessment',
            'Real-time anomaly detection',
            'Custom KPI dashboards',
            'Automated reporting and alerts',
            'What-if scenario analysis'
        ],
        techStack: ['Python', 'TensorFlow', 'Prophet', 'Apache Spark', 'Kafka', 'React', 'D3.js', 'ClickHouse'],
        metrics: {
            'Forecast Accuracy': '94%',
            'Data Processing': '1TB+ daily',
            'Prediction Horizon': '12 months',
            'Cost Savings': '$2.5M annually',
            'Dashboard Load Time': '< 2s'
        }
    },
    'multi-agent': {
        title: 'Multi-Agent Collaboration System',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop',
        description: 'Autonomous agent network that coordinates multiple AI agents to solve complex, multi-step problems.',
        longDescription: 'This innovative system orchestrates multiple specialized AI agents that work together to tackle complex tasks. Each agent has specific expertise and can communicate, delegate tasks, and collaborate to achieve optimal outcomes.',
        features: [
            'Dynamic agent spawning and management',
            'Inter-agent communication protocol',
            'Task decomposition and delegation',
            'Consensus mechanisms for decision-making',
            'Resource optimization and load balancing',
            'Failure recovery and redundancy',
            'Performance monitoring and optimization'
        ],
        techStack: ['Python', 'AutoGPT', 'LangChain', 'RabbitMQ', 'Redis', 'Kubernetes', 'Prometheus', 'GraphQL'],
        metrics: {
            'Active Agents': '12-50 (auto-scaling)',
            'Task Completion': '98% success rate',
            'Response Time': '< 5 minutes',
            'Parallel Tasks': '100+ concurrent',
            'Cost Efficiency': '3x cheaper than manual'
        }
    },
    'nlp-pipeline': {
        title: 'Multilingual NLP Pipeline',
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&h=600&fit=crop',
        description: 'Comprehensive NLP solution for cross-language sentiment analysis, translation, and market intelligence.',
        longDescription: 'Our multilingual NLP pipeline processes text in 25+ languages, providing sentiment analysis, entity recognition, translation, and market insights. It\'s designed for global businesses needing to understand customer feedback and market trends across different regions.',
        features: [
            'Support for 25+ languages',
            'Real-time sentiment analysis',
            'Named entity recognition',
            'Topic modeling and clustering',
            'Neural machine translation',
            'Social media monitoring',
            'Custom model fine-tuning'
        ],
        techStack: ['Python', 'Transformers', 'BERT', 'mBERT', 'FastAPI', 'Apache Kafka', 'MongoDB', 'Grafana'],
        metrics: {
            'Languages': '25+',
            'Throughput': '1000 req/s',
            'Sentiment Accuracy': '91%',
            'Translation Quality': 'BLEU 0.85',
            'API Uptime': '99.95%'
        }
    }
};

// Modal Functions
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const project = projectDetails[projectId];

    if (!project) return;

    modalBody.innerHTML = `
        <div style="padding: 3rem;">
            <div style="text-align: center; margin-bottom: 2rem;">
                <h2 style="font-size: 2.5rem; margin-bottom: 1rem; background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${project.title}</h2>
            </div>
            <div style="width: 100%; height: 400px; border-radius: 15px; overflow: hidden; margin-bottom: 2rem;">
                <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 3rem;">
                <div>
                    <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">Overview</h3>
                    <p style="color: #a0a0a0; line-height: 1.8; margin-bottom: 1.5rem;">${project.description}</p>
                    <p style="color: #a0a0a0; line-height: 1.8; margin-bottom: 1.5rem;">${project.longDescription}</p>

                    <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">Key Features</h3>
                    <ul style="list-style: none; padding: 0;">
                        ${project.features.map(feature => `<li style="padding: 0.75rem 0; padding-left: 2rem; position: relative; color: #a0a0a0;"><span style="position: absolute; left: 0; color: #10b981; font-weight: bold;">✓</span>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div>
                    <div style="background: rgba(99, 102, 241, 0.1); padding: 2rem; border-radius: 15px; border: 1px solid rgba(99, 102, 241, 0.2);">
                        <h3 style="font-size: 1.3rem; margin-bottom: 1.5rem;">Tech Stack</h3>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 2rem;">
                            ${project.techStack.map(tech => `<span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 0.5rem 1rem; border-radius: 25px; font-size: 0.9rem; font-weight: 500;">${tech}</span>`).join('')}
                        </div>

                        <h3 style="font-size: 1.3rem; margin-bottom: 1.5rem;">Performance Metrics</h3>
                        <div style="display: grid; gap: 1rem;">
                            ${Object.entries(project.metrics).map(([key, value]) => `
                                <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: rgba(0, 0, 0, 0.3); border-radius: 10px;">
                                    <span style="color: #a0a0a0;">${key}</span>
                                    <span style="color: #6366f1; font-weight: 600;">${value}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal on outside click
document.getElementById('projectModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeProjectModal();
    }
});

// Close modal on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

console.log('AI WebTech website initialized successfully!');