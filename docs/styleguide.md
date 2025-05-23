# Style Guide

## Color Palette

| Token                  | Value       | Usage             |
|------------------------|-------------|-------------------|
| `--color-primary`      | `#1E40AF`   | Buttons, links    |
| `--color-secondary`    | `#9333EA`   | Highlights        |
| `--color-danger`       | `#DC2626`   | Error states      |

## Typography Scale

- `--font-size-xs`: Extra small text  
- `--font-size-sm`: Small text  
- `--font-size-md`: Body text  
- `--font-size-lg`: Headings  
- `--font-size-xl`: Hero text  

## Spacing Scale

| Token      | Value  |
|------------|--------|
| `--space-1`| `4px`  |
| `--space-2`| `8px`  |
| `--space-3`| `16px` |
| `--space-4`| `24px` |

## Theming

- Use `<ThemeToggle />` in your header to switch modes  
- Persisted in `localStorage` under key `theme`  
- Defaults to OS preference via `prefers-color-scheme`  

_For more details, see `styles/tokens.css`, `styles/typography.css`, and Storybook’s theming toolbar in `.storybook/preview.js`._