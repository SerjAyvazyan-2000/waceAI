const header = document.querySelector('header');
window.addEventListener('scroll', function () {
    const headerTop = document.querySelector('header')
    if (window.scrollY > 0) {
        headerTop.classList.add('moved');
    } else {
        headerTop.classList.remove('moved');

    }
});

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
} else {
  document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
}
function updateImages(theme) {
  const images = document.querySelectorAll("img[data-light][data-dark]");
  images.forEach(img => {
    const newSrc = theme === "dark" ? img.dataset.dark : img.dataset.light;
    img.src = newSrc;
  });
}
const initialTheme = document.documentElement.getAttribute("data-theme");
updateImages(initialTheme);



const blocks = document.querySelectorAll(".parallax-anim");

if (blocks.length) {
  const isMobile = () => window.innerWidth <= 768;
  let ticking = false;

  const applyParallax = () => {
    const vh = window.innerHeight;

    blocks.forEach(block => {
      const rect = block.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= vh) return;

      if (isMobile()) {
        block.style.transform = "translate3d(0, 0, 0)";
        return;
      }

      const offsetY = rect.top * 0.03;
      const offsetX = rect.top * 0.015;
      block.style.transform = `translate3d(${offsetX}px, ${-offsetY}px, 0)`;
    });

    ticking = false;
  };

  const queue = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(applyParallax);
    }
  };

  const init = () => applyParallax();

  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", queue, { passive: true });
  window.addEventListener("DOMContentLoaded", init);
  window.addEventListener("load", init);
  blocks.forEach(b => {
    const img = b.querySelector("img");
    if (img) img.addEventListener("load", init, { once: true });
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const animatedItems = document.querySelectorAll(
    ".fade-left, .fade-right, .fade-top, .fade-bottom"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
        
        }
      });
    },
    {
      threshold: 0.15, 
    }
  );

  animatedItems.forEach((item) => observer.observe(item));
});

const faqWrappers = document.querySelectorAll(".faq-item-wrapper");

faqWrappers.forEach(wrapper => {
  const item = wrapper.querySelector(".faq-item");
  const icon = wrapper.querySelector(".faq-item-icon");

  const toggle = () => {
    const isActive = item.classList.contains("active");

    faqWrappers.forEach(w => {
      w.querySelector(".faq-item").classList.remove("active");
      w.querySelector(".faq-item-icon").classList.remove("active");
    });

    if (!isActive) {
      item.classList.add("active");
      icon.classList.add("active");
    }
  };

  item.addEventListener("click", toggle);
  icon.addEventListener("click", toggle);
});




document.querySelectorAll('.menu-list-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});


