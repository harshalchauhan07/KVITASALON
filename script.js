// Kvita Beauty Salon demo settings
// Replace this with the salon's WhatsApp number including country code, digits only.
// Example India: 919876543210
const SALON_WHATSAPP_NUMBER = "910000000000";

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}));
document.getElementById("year").textContent = new Date().getFullYear();

const dateInput = document.getElementById("date");
const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
dateInput.min = localDate;

document.getElementById("bookingForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const cleanNumber = SALON_WHATSAPP_NUMBER.replace(/\D/g, "");
  const status = document.getElementById("formStatus");
  if (!cleanNumber || cleanNumber === "910000000000") {
    status.textContent = "Demo setup: please add Kvita Beauty Salon's real WhatsApp number in script.js to enable sending enquiries.";
    status.scrollIntoView({behavior:"smooth", block:"nearest"});
    return;
  }
  const lines = [
    "Hello Kvita Beauty Salon! I'd like to enquire about an appointment.",
    "",
    "Name: " + (data.get("name") || ""),
    "Phone: " + (data.get("phone") || ""),
    "Service: " + (data.get("service") || ""),
    "Preferred date: " + (data.get("date") || "Flexible"),
    "Occasion: " + (data.get("occasion") || "Not specified"),
    "Message: " + (data.get("message") || "No additional details")
  ];
  const url = "https://wa.me/" + cleanNumber + "?text=" + encodeURIComponent(lines.join("\n"));
  window.open(url, "_blank", "noopener,noreferrer");
  status.textContent = "Your WhatsApp enquiry is ready. Please press Send in WhatsApp to complete it.";
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(event) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({behavior:"smooth", block:"start"});
  });
});
