import { React, ReactNative as RN } from "vendetta/metro/common";
import { storage } from "vendetta/plugin";
import { useEffect, useState } from "react";
import { ScrollView, View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { showToast } from "@vendetta/ui/toasts";

interface Theme {
  name: string;
  author: string;
  preview: string;
  source: string;
}

const fetchThemes = async (): Promise<Theme[]> => {
  try {
    const res = await fetch("Website here");
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch themes:", err);
    return [];
  }
};

const installTheme = async (theme: Theme) => {
  try {
    const res = await fetch(theme.source);
    const css = await res.text();
    storage.themes = storage.themes || {};
    storage.themes[theme.name] = css;
    showToast(`✅ Installed ${theme.name}`);
  } catch (e) {
    showToast(`❌ Failed to install theme.`);
    console.error("Install failed", e);
  }
};

export default () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchThemes().then(setThemes);
  }, []);

  const filteredThemes = themes.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <ScrollView style={{ padding: 10 }}>
      <TextInput
        placeholder="Search"
        placeholderTextColor="#888"
        style={{
          backgroundColor: "#1e1e1e",
          color: "white",
          borderRadius: 10,
          padding: 10,
          marginBottom: 10,
        }}
        value={search}
        onChangeText={setSearch}
      />
      {filteredThemes.map((theme) => (
        <View
          key={theme.name}
          style={{
            backgroundColor: "#2c2c2e",
            marginBottom: 10,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>{theme.name} <Text style={{ color: "#aaa" }}>by {theme.author}</Text></Text>
          <Image
            source={{ uri: theme.preview }}
            style={{ width: "100%", height: 150, borderRadius: 8, marginVertical: 10 }}
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={() => installTheme(theme)}
            style={{
              backgroundColor: "#3a3a3c",
              padding: 10,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              ⭳ Install Theme
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};
