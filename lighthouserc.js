module.exports = {
  ci: {
    collect: {
      url: ["https://your-custom-domain.com/dashboard"],
      startServerCommand: "npm run dev",
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "metrics:largest-contentful-paint": ["error", { maxNumericValue: 2500 }],
        "metrics:interactive": ["error", { maxNumericValue: 3000 }]
      }
    },
    upload: {
      target: "temporary-public-storage"
    }
  }
};