module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      "nativewind/babel",
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
    ],
    plugins: [
      ["module-resolver", {
        root: "./app",
        alias: {
          "@assets/*": "./app/assets",
          "@features/*": "./app/features",
          "@components": "./app/components/_index.ts",
          "@databases/*": "./app/infra/databases",
          "@infra/*": "./app/infra",
          "@atoms": "./app/atoms/index.ts"
        },
      }]
    ]
  }
};
