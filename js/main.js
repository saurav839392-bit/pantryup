/* SavoryPantryUp - Main Interactive JavaScript */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });
  }

  // Sticky Navbar shadow on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Animated metric counters
  const counters = document.querySelectorAll('.metric-number');
  if (counters.length > 0) {
    const observerOptions = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = +entry.target.getAttribute('data-target');
          let count = 0;
          const speed = target / 50;
          const updateCount = () => {
            count += speed;
            if (count < target) {
              entry.target.innerText = Math.ceil(count);
              setTimeout(updateCount, 25);
            } else {
              entry.target.innerText = target;
            }
          };
          updateCount();
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
  }

  // Interactive Pantry Ingredient & Flavor Pairing Explorer
  const pantryButtons = document.querySelectorAll('.pantry-btn');
  const pantryDisplay = document.getElementById('pantry-detail');

  if (pantryButtons.length > 0 && pantryDisplay) {
    pantryButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        pantryButtons.forEach(b => b.classList.remove('active-pantry'));
        this.classList.add('active-pantry');
        const pantryName = this.getAttribute('data-pantry');
        const description = this.getAttribute('data-desc');
        const score = this.getAttribute('data-score');

        pantryDisplay.innerHTML = `
          <div class="pantry-card" style="border-left: 4px solid var(--accent-olive); margin-top: 1.5rem;">
            <h3 style="color: var(--accent-olive); font-size: 1.5rem; margin-bottom: 0.5rem;">${pantryName} Ingredient Specification</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">${description}</p>
            <strong style="color: var(--accent-terracotta); font-size: 0.95rem;">Empirical Gastronomy Benchmark: ${score}</strong>
          </div>
        `;
      });
    });
  }

  // Pantry Organization Matcher & Flavor Diagnostic Quiz
  const pantryQuizButtons = document.querySelectorAll('.pantry-quiz-btn');
  const pantryQuizResult = document.getElementById('pantry-quiz-result');

  if (pantryQuizButtons.length > 0 && pantryQuizResult) {
    pantryQuizButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        pantryQuizButtons.forEach(b => b.style.opacity = '0.7');
        this.style.opacity = '1';
        const recommendation = this.getAttribute('data-rec');
        pantryQuizResult.innerHTML = `
          <div class="pantry-card" style="background: var(--bg-secondary); margin-top: 1rem; border-color: var(--accent-olive);">
            <h4 style="color: var(--accent-olive); margin-bottom: 0.5rem;">Your Curated Gourmet Pantry Recommendation</h4>
            <p style="color: var(--text-primary); font-weight: 600;">${recommendation}</p>
          </div>
        `;
      });
    });
  }
});
