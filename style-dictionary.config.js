// style-dictionary.config.js
const StyleDictionary = require('style-dictionary');

StyleDictionary.extend({
  source: ['tokens/*.json'],            // Figma-exported tokens
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables'
        }
      ]
    }
  }
}).buildAll();