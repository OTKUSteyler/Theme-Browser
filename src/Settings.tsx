// src/Settings.tsx

import React, { useEffect, useState } from "react";

interface Theme {
  name: string;
  author: string;
  css: string;
  preview?: string;
  demo?: string;
}

const THEME_URL = "https://raw.githubusercontent.com/nexpid/Themelings/data/themes.json";

const Settings: React.FC = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(THEME_URL)
      .then(r => r.json())
      .then(setThemes)
      .catch(() => alert("Failed to load themes"))
      .finally(() => setLoading(false));
  }, []);

  const applyTheme = (theme: Theme) => {
    if (!theme.css) {
      alert("No CSS to apply");
      return;
    }
    let style = document.getElementById("dynamic-theme-style") as HTMLStyleElement | null;
    if(style);
    }
    style.textContent = theme.css;
    alert(`Applied theme: ${theme.name}`);
  };

  const filtered = themes.filter(
    t => t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 10 }}>
      <input
        placeholder="Search"
        style={{
          padding: 5,
          marginBottom: 10,
          width: "100%",
          color: "#fff",
          backgroundColor: "#2f3136",
        }}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {loading && <div style={{ color: "#bbb" }}>Loading themes...</div>}
      <div>
        {filtered.map(theme => (
          <div
            key={theme.name}
            style={{
              border: "1px solid #444",
              borderRadius: 8,
              padding: 10,
              marginBottom: 10,
              backgroundColor: "#202225",
            }}
          >
            <h3 style={{ color: "#fff" }}>
              {theme.name} by {theme.author}
            </h3>
            {theme.preview && (
              <img
                src={theme.preview}
                alt="Preview"
                style={{
                  width: "100%",
                  borderRadius: 6,
                  marginTop: 5,
                }}
              />
            )}
            {theme.demo && (
              <a
                href={theme.demo}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: 8,
                  color: "#00bfff",
                }}
              >
                View demo website
              </a>
            )}
            <button
              style={{ marginTop: 10 }}
              onClick={() => applyTheme(theme)}
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
