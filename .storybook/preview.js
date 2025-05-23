// .storybook/preview.js
import '../styles/tokens.css';
import '../styles/typography.css';
import '../styles/accessibility.css';
import '../styles/motion.css';

// Provide globals for toggling themes in Storybook UI
export const globalTypes = {
  theme: {
    name: 'Theme',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark']
    }
  }
};

export const decorators = [
  (Story, context) => {
    document.documentElement.setAttribute('data-theme', context.globals.theme);
    return <Story />;
  }
];