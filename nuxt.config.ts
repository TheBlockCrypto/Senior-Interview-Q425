import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./assets/css/main.css"],
  pages: true,
  nitro: {
    experimental: {
      websocket: true,
    },
    storage: {
      cache: {
        driver: "fs",
        base: "./cache",
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
    define: {
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development",
      ),
    },
  },
});
