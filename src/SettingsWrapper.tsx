import React, { useRef, useEffect } from "react";
import ThemeBrowser from "./index";

const ThemeBrowserSettingsWrapper: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = ""; // Clear previous
      ThemeBrowser.render(ref.current); // Render into the real DOM node
    }
    return () => {
      if (ref.current) ref.current.innerHTML = "";
    };
  }, []);

  return <div ref={ref} />;
};

export default ThemeBrowserSettingsWrapper;
