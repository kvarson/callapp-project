module.exports = {
  root: "./client",
  server: {
    port: 3000,
  },
  build: {
    outDir: "../dist",
    assetsDir: ".",
    rollupOptions: {
      input: {
        main: "./src/index.tsx",
      },
    },
  },
};

export default {
  optimizeDeps: {
    exclude: ["react/jsx-dev-runtime"],
  },
};
