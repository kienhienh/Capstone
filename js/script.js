// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Close mobile menu when clicking on a link
const mobileLinks = mobileMenu?.querySelectorAll('a');
mobileLinks?.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// Smooth scroll for anchor links
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

// Add scroll effect to header
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header?.classList.add('shadow-md');
  } else {
    header?.classList.remove('shadow-md');
  }
  
  lastScroll = currentScroll;
});

// Testimonial data
const testimonials = [
  {
    name: "Mike Johnson",
    title: "CTO at CloudNine",
    image: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=100&h=100&fit=crop",
    text: "Astroship has revolutionized the way we handle customer support. The ticketing system and knowledge base have significantly reduced response times, leading to happier customers. Thanks to this incredible tool."
  },
  {
    name: "Emily Brown",
    title: "HR Manager at ConnectCo",
    image: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=100&h=100&fit=crop",
    text: "Astroship has simplified our employee management processes. From onboarding to performance evaluations, everything is now seamlessly organized in one place. It's made my job much more manageable and enjoyable!"
  },
  {
    name: "David Lee",
    title: "Sales Director at Linkify",
    image: "https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?w=100&h=100&fit=crop",
    text: "Our sales team swears by Astroship's CRM capabilities. The lead tracking and pipeline management tools have resulted in a significant boost in sales. It's a versatile platform that has truly optimized our sales processes."
  },
  {
    name: "Sarah Martinez",
    title: "Finance Controller at MoneyMakers",
    image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop",
    text: "Astroship has been a lifesaver for our finance department. Its robust accounting features and automated invoicing have saved us countless hours of manual work. It's the perfect financial companion for any business!"
  },
  {
    name: "John Doe",
    title: "CEO at TechCorp",
    image: "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?w=100&h=100&fit=crop",
    text: "Astroship has transformed the way we manage our projects. Its well-designed interface and powerful features make it a must-have tool for any startup. We've seen a great increase in our productivity and collaboration."
  },
  {
    name: "Jane Smith",
    title: "Marketing Manager at InnovateTech",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&h=100&fit=crop",
    text: "As a marketing professional, I love using Astroship to streamline our marketing campaigns. The automation features and data analytics help us make data-driven decisions and optimize our business strategies."
  }
];

// Create testimonial card HTML
function createTestimonialCard(testimonial) {
  return `
    <div class="testimonial-card rounded-2xl relative p-8 bg-white/80 backdrop-blur-sm ring-1 ring-gray-200/50 shadow-md hover:shadow-xl w-[400px] max-w-[400px] flex flex-col justify-between shrink-0 snap-start">
      <blockquote class="text-lg text-balance text-slate-700 leading-relaxed">
        "${testimonial.text}"
      </blockquote>
      <div class="flex items-center gap-4 mt-8">
        <div class="shrink-0">
          <img src="${testimonial.image}" 
               alt="${testimonial.name}" 
               class="rounded-full w-12 h-12 object-cover bg-slate-100 ring-2 ring-white shadow-md"
               loading="lazy">
        </div>
        <div>
          <h3 class="font-semibold text-slate-800">${testimonial.name}</h3>
          <p class="text-sm text-slate-600">${testimonial.title}</p>
        </div>
      </div>
    </div>
  `;
}

// Initialize testimonials
function initTestimonials() {
  const marqueeContent = document.getElementById('marqueeContent');
  const mobileScroll = document.getElementById('mobileScroll');

  // Create cards for desktop (duplicated for seamless loop)
  const desktopCards = testimonials.map(createTestimonialCard).join('');
  marqueeContent.innerHTML = desktopCards + desktopCards; // Duplicate for smooth loop

  // Create cards for mobile
  mobileScroll.innerHTML = testimonials.map(createTestimonialCard).join('');

  // Add navigation dots for mobile
  addMobileNavigation();
}

// Add mobile navigation dots
function addMobileNavigation() {
  const mobileScroll = document.getElementById('mobileScroll');
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'mobile-dots';
  
  testimonials.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = index === 0 ? 'active' : '';
    dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
    dot.addEventListener('click', () => scrollToCard(index));
    dotsContainer.appendChild(dot);
  });

  mobileScroll.parentElement.appendChild(dotsContainer);

  // Update dots on scroll
  mobileScroll.addEventListener('scroll', () => {
    const scrollLeft = mobileScroll.scrollLeft;
    const card = mobileScroll.querySelector('.testimonial-card');
    if (!card) return;
    
    const cardWidth = card.offsetWidth + 24; // gap
    const activeIndex = Math.round(scrollLeft / cardWidth);
    
    const dots = dotsContainer.querySelectorAll('button');
    dots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  });
}

// Scroll to specific card on mobile
function scrollToCard(index) {
  const mobileScroll = document.getElementById('mobileScroll');
  const card = mobileScroll.querySelector('.testimonial-card');
  if (!card) return;
  
  const cardWidth = card.offsetWidth + 24;
  mobileScroll.scrollTo({
    left: cardWidth * index,
    behavior: 'smooth'
  });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  initTestimonials();
});