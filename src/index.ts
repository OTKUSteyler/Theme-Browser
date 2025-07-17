import { useEffect, useState } from "react";
import { ScrollView, View, Text, Image } from "react-native";

type ThemeInfo = {
  name: string;
  preview: string;
  url: string;
};

const fetchThemes = async (): Promise<ThemeInfo[]> => {
  const res = await fetch("https://raw.githubusercontent.com/nexpid/Themelings/data/themes.json");
  return res.json();
};

const installTheme = async (theme: ThemeInfo) => {
  try {
    const res = await fetch(theme.url);
    const css = await res.text();
    const storage = BdApi.loadData("ThemeBrowser", "themes") || {};
    storage[theme.name] = css;
    BdApi.saveData("ThemeBrowser", "themes", storage);
    BdApi.showToast(`[✓] Installed ${theme.name}`, { type: "success" });
  } catch (e) {
    BdApi.showToast("[✗] Failed to install theme.", { type: "error" });
    console.error("Failed to install theme:", e);
  }
};

export default function ThemeBrowser() {
  const [themes, setThemes] = useState<ThemeInfo[]>([]);

  useEffect(() => {
    fetchThemes()
      .then(setThemes)
      .catch((e) => {
        console.error("ThemeBrowser failed to load themes:", e);
        BdApi.showToast("[✗] Failed to load themes.", { type: "error" });
      });
  }, []);

  return (
    <ScrollView>
      {themes.map((theme) => (
        <View key={theme.name} style={{ padding: 10 }}>
          <Image source={{ uri: theme.preview }} style={{ height: 150, borderRadius: 10 }} />
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>{theme.name}</Text>
          <Text style={{ color: "#aaa" }}>{theme.author || "Unknown Author"}</Text>
          <Text
            style={{ color: "#00B0F4", marginTop: 8 }}
            onPress={() => installTheme(theme)}
          >
            → Install Theme
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
