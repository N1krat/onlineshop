import { ref, onMounted } from "vue";

export function useDarkMode() {
  const isDark = ref(false);

  const toggleDark = () => {
    isDark.value = !isDark.value;
    const theme = isDark.value ? "dark" : "light";
    document.documentElement.classList.toggle("dark", isDark.value);
    localStorage.setItem("theme", theme);
  };

  onMounted(() => {
    const savedTheme = localStorage.getItem("theme");
    isDark.value =
      savedTheme === "dark" ||
      (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark.value);
  });

  return { isDark, toggleDark };
}
