
const body = document.body;
const header = document.getElementById("header");
const progressBar = document.getElementById("progressBar");
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const typingText = document.getElementById("typingText");
const year = document.getElementById("year");
const copyProfile = document.getElementById("copyProfile");
const toast = document.getElementById("toast");

// Mostrar el año actual automáticamente
year.textContent = new Date().getFullYear();

// Textos que aparecerán en la animación
const roles = [
  "Estudiante de SMR",
  "Sistemas y redes",
  "Aprendiz de Python",
  "Entusiasta de la tecnología"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

// Efecto de escritura automática
function typeRole() {
  const current = roles[roleIndex];

  if (!deleting) {
    typingText.textContent = current.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeRole, 1600);
      return;
    }
  } else {
    typingText.textContent = current.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeRole, deleting ? 45 : 85);
}

typeRole();

// Barra de progreso y cabecera
function updateScroll() {
  const scrollTop = window.scrollY;
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  progressBar.style.width =
    `${docHeight > 0 ? (scrollTop / docHeight) * 100 : 0}%`;

  if (scrollTop > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateScroll);
updateScroll();

// Cambiar entre modo oscuro y claro
themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");

  themeToggle.textContent =
    body.classList.contains("light") ? "☀" : "☾";

  localStorage.setItem(
    "portfolioTheme",
    body.classList.contains("light") ? "light" : "dark"
  );
});

// Recuperar el tema elegido anteriormente
if (localStorage.getItem("portfolioTheme") === "light") {
  body.classList.add("light");
  themeToggle.textContent = "☀";
}

// Abrir y cerrar el menú móvil
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", isOpen);
});

// Cerrar el menú al pulsar un enlace
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Filtrar los proyectos por categoría
const filters = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(btn => btn.classList.remove("active"));
    filter.classList.add("active");

    const category = filter.dataset.filter;

    projectCards.forEach(card => {
      const shouldHide =
        category !== "all" &&
        card.dataset.category !== category;

      card.classList.toggle("hidden", shouldHide);
    });
  });
});

// Animaciones al aparecer los elementos en pantalla
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

document.querySelectorAll(".reveal").forEach(element => {
  observer.observe(element);
});

// Botón para copiar el nombre
copyProfile.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("Allan Daniel");
    toast.textContent = "Nombre copiado";
  } catch (error) {
    toast.textContent = "Allan Daniel";
  }

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
});
