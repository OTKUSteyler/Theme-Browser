// Plain JavaScript version of a theme browser like Plugins-List (no JSX/TSX)

import { createSection, showToast } from "@utils";

const ThemeBrowser = {
  name: "ThemeBrowser",
  description: "Browse and apply community themes",
  settings: {
    searchQuery: "",
    themes: [],
  },

  async loadThemes() {
    try {
      const response = await fetch("hold text");
      this.settings.themes = await response.json();
      this.render();
    } catch (err) {
      showToast("Failed to load themes", "error");
      console.error(err);
    }
  },

  render() {
    const container = document.createElement("div");
    container.style.padding = "10px";

    const input = document.createElement("input");
    input.placeholder = "Search";
    input.style.padding = "5px";
    input.style.marginBottom = "10px";
    input.style.width = "100%";
    input.style.color = "#fff";
    input.style.backgroundColor = "#2f3136";
    input.oninput = () => {
      this.settings.searchQuery = input.value.toLowerCase();
      this.renderList(container);
    };

    container.appendChild(input);

    const listContainer = document.createElement("div");
    listContainer.id = "theme-list";
    container.appendChild(listContainer);

    this.renderList(container);

    createSection("Theme Repo", container);
  },

  renderList(container) {
    const list = container.querySelector("#theme-list");
    if (!list) return;
    list.innerHTML = "";

    const filtered = this.settings.themes.filter((t) =>
      t.name.toLowerCase().includes(this.settings.searchQuery)
    );

    for (const theme of filtered) {
      const card = document.createElement("div");
      card.style.border = "1px solid #444";
      card.style.borderRadius = "8px";
      card.style.padding = "10px";
      card.style.marginBottom = "10px";
      card.style.backgroundColor = "#202225";

      const title = document.createElement("h3");
      title.textContent = theme.name + " by " + theme.author;
      title.style.color = "#fff";
      card.appendChild(title);

      if (theme.preview) {
        const img = document.createElement("img");
        img.src = theme.preview;
        img.alt = "Preview";
        img.style.width = "100%";
        img.style.borderRadius = "6px";
        img.style.marginTop = "5px";
        card.appendChild(img);
      }

      const applyBtn = document.createElement("button");
      applyBtn.textContent = "Apply";
      applyBtn.style.marginTop = "10px";
      applyBtn.onclick = () => this.applyTheme(theme);
      card.appendChild(applyBtn);

      list.appendChild(card);
    }
  },

  applyTheme(theme) {
    if (!theme.css) return showToast("No CSS to apply", "error");

    const style = document.getElementById("dynamic-theme-style") || document.createElement("style");
    style.id = "dynamic-theme-style";
    style.textContent = theme.css;
    document.head.appendChild(style);
    showToast(`Applied theme: ${theme.name}`, "success");
  },

  start() {
    this.loadThemes();
  },

  stop() {
    const style = document.getElementById("dynamic-theme-style");
    if (style) style.remove();
  },
};

export default ThemeBrowser;
