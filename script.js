const counters = document.querySelectorAll('.counter');
const animatedSections = document.querySelectorAll('.fade-in, .stats');

const animateCounter = (counter) => {
  const target = +counter.getAttribute('data-target');
  let count = 0;
  const speed = target / 100;

  const updateCount = () => {
    count += speed;
    if (count < target) {
      counter.innerText = Math.ceil(count);
      requestAnimationFrame(updateCount);
    } else {
      counter.innerText = target;
    }
  };

  updateCount();
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {

    if (entry.isIntersecting) {

      // 1. Add show animation class
      entry.target.classList.add('show');

      // 2. If it's stats section → animate counters
      if (entry.target.classList.contains('stats')) {
        counters.forEach(counter => animateCounter(counter));
      }

    }
  });
}, {
  threshold: 0.2
});

// Observe all animated sections
animatedSections.forEach(el => observer.observe(el));
