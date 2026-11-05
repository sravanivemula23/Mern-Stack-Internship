// Mobile menu toggle
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
links.addEventListener("click", () => links.classList.remove("open"));

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form validation
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const { name, email, message } = form.elements;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  if (!name.value.trim() || !emailOk || message.value.trim().length < 10) {
    status.style.color = "#dc2626";
    status.textContent = "Please enter your name, a valid email and a message (10+ characters).";
    return;
  }
  status.style.color = "#16a34a";
  status.textContent = `Thanks ${name.value.trim()}! Your message has been recorded.`;
  form.reset();
});
