// craco.config.js
// Supprime le warning "Failed to parse source map" de pdfmake (source map cassée dans leur package npm).

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Ignorer les warnings de source-map-loader provenant de node_modules
      webpackConfig.ignoreWarnings = [
        ...(webpackConfig.ignoreWarnings || []),
        /Failed to parse source map/,
      ];

      // Exclure node_modules du source-map-loader (double protection)
      webpackConfig.module.rules = webpackConfig.module.rules.map((rule) => {
        if (rule.oneOf) {
          rule.oneOf = rule.oneOf.map((oneOfRule) => {
            if (
              oneOfRule.loader &&
              typeof oneOfRule.loader === 'string' &&
              oneOfRule.loader.includes('source-map-loader')
            ) {
              return { ...oneOfRule, exclude: /node_modules/ };
            }
            return oneOfRule;
          });
        }
        return rule;
      });

      return webpackConfig;
    },
  },
};

