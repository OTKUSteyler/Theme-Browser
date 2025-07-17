// manifest.json should reference this as your main entry point

import { registerSettings } from "@vendetta/settings"; import { storage } from "@vendetta/plugin"; import { React } from "@vendetta/metro/common"; import { showToast } from "@vendetta/ui/toasts";

const { ScrollView, View, Text, Image } = React;

interface ThemeInfo { name: string; author: string; preview: string; source: string; }

async function fetchThemes(): Promise<ThemeInfo[]> { const res = await fetch("https://discord.com/channels/1205207689832038522/1205876424188104715"); if (!res.ok) throw new Error("Failed to fetch themes"); return await res.json(); }

function ThemeBrowser(): React.ReactElement { const [themes, setThemes] = React.useState<ThemeInfo[]>([]);

React.useEffect(() => { fetchThemes() .then(setThemes) .catch((e) => { console.error("[ThemeBrowser] Failed to load themes:", e); showToast("❌ Failed to load themes."); }); }, []);

const installTheme = async (theme: ThemeInfo) => { try { const res = await fetch(theme.source); const css = await res.text(); storage.themes = storage.themes || {}; storage.themes[theme.name] = css; showToast(✅ Installed ${theme.name}); } catch { showToast("❌ Failed to install theme."); } };

return ( <ScrollView> {themes.map((theme) => ( <View key={theme.name} style={{ padding: 10 }}> <Image source={{ uri: theme.preview }} style={{ height: 150, borderRadius: 8 }} /> <Text style={{ fontWeight: "bold", fontSize: 18 }}>{theme.name}</Text> <Text style={{ color: "#aaa" }}>By {theme.author}</Text> <Text style={{ color: "#00B0F4", marginTop: 5 }} onPress={() => installTheme(theme)} > ➕ Install Theme </Text> </View> ))} </ScrollView> ); }

export const onLoad = () => { registerSettings("Themelings Browser", () => <ThemeBrowser />); };

export const onUnload = () => {};

