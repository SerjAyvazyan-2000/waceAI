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



const parallaxBlocks = document.querySelectorAll(".parallax-anim");

if (parallaxBlocks.length > 0) {
  window.addEventListener("scroll", () => {
    if (window.innerWidth < 576) {
      parallaxBlocks.forEach(block => {
        const img = block.querySelector("img");
        img.style.transform = "translate(0, 0)";
      });
      return; 
    }

    const scrollTop = window.scrollY;

    parallaxBlocks.forEach((block) => {
      const img = block.querySelector("img");
      const rect = block.getBoundingClientRect();

      if (rect.top < window.innerHeight && rect.bottom > 0) {
          const offsetY = rect.top * 0.03;
        const offsetX = rect.top * 0.015;
        img.style.transform = `translate(${offsetX}px, ${-offsetY}px)`;
      }
    });
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