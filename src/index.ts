import { createSection, showToast } from "./utils";

// The type for a Theme
interface Theme {
  name: string;
  author: string;
  css: string;
  preview?: string;
  demo?: string;
}

const ThemeBrowser = {
  name: "ThemeBrowser",
  description: "Browse and apply community themes",
  settings: {
    searchQuery: "",
    themes: [] as Theme[],
  },

  async loadThemes() {
    try {
      const response = await fetch("https://raw.githubusercontent.com/nexpid/Themelings/data/themes.json");
      this.settings.themes = await response.json();
      // After loading, trigger initial render (if used outside React wrapper)
      this.render();
    } catch (err) {
      showToast("Failed to load themes", "error");
      console.error(err);
    }
  },

  // NOW: Accepts optional container for React wrapper
  render(container?: HTMLElement) {
    if (!container) {
      container = document.createElement("div");
      createSection("Theme Repo", container);
    }
    container.innerHTML = "";

    // Search box
    const input = document.createElement("input");
    input.placeholder = "Search";
    input.style.padding = "5px";
    input.style.marginBottom = "10px";
    input.style.width = "100%";
    input.style.color = "#fff";
    input.style.backgroundColor = "#2f3136";
    input.oninput = () => {
      this.settings.searchQuery = input.value.toLowerCase();
      this.renderList(container!);
    };
    container.appendChild(input);

    // List output
    const listContainer = document.createElement("div");
    listContainer.id = "theme-list";
    container.appendChild(listContainer);

    // Populate list
    this.renderList(container);
  },

  renderList(container: HTMLElement) {
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
      title.textContent = `${theme.name} by ${theme.author}`;
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

      if (theme.demo) {
        const demoLink = document.createElement("a");
        demoLink.href = theme.demo;
        demoLink.target = "_blank";
        demoLink.style.display = "inline-block";
        demoLink.style.marginTop = "8px";
        demoLink.style.color = "#00bfff";
        demoLink.textContent = "View demo website";
        card.appendChild(demoLink);
      }

      const applyBtn = document.createElement("button");
      applyBtn.textContent = "Apply";
      applyBtn.style.marginTop = "10px";
      applyBtn.onclick = () => this.applyTheme(theme);
      card.appendChild(applyBtn);

      list.appendChild(card);
    }
  },

  applyTheme(theme: Theme) {
    if (!theme.css) return showToast("No CSS to apply", "error");

    let style = document.getElementById("dynamic-theme-style") as HTMLStyleElement | null;
    if (!style) {
      style = document.createElement("style");
      style.id = "dynamic-theme-style";
      document.head.appendChild(style);
    }
    style.textContent = theme.css;
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
