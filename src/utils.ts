// --- Utility functions for your plugin ---

export function showToast(message: string, type: "success" | "error" = "success") {
  // Simple toast implementation
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "40px";
  toast.style.right = "40px";
  toast.style.padding = "12px 20px";
  toast.style.background = type === "success" ? "#43b581" : "#f04747";
  toast.style.color = "#fff";
  toast.style.borderRadius = "6px";
  toast.style.boxShadow = "0 2px 8px rgba(0,0,0,0.35)";
  toast.style.zIndex = "9999";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

export function createSection(title: string, content: HTMLElement) {
  // Creates a section and adds it to the body (customize to fit your plugin host if needed)
  const section = document.createElement("section");
  section.style.margin = "32px auto";
  section.style.maxWidth = "520px";
  section.style.background = "#23272a";
  section.style.padding = "20px";
  section.style.borderRadius = "10px";
  section.style.boxShadow = "0 2px 12px rgba(0,0,0,0.18)";

  const heading = document.createElement("h2");
  heading.textContent = title;
  heading.style.color = "#fff";
  heading.style.marginBottom = "14px";
  section.appendChild(heading);

  section.appendChild(content);
  document.body.appendChild(section);
}
