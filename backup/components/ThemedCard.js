// components/ThemedCard.js

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      background: var(--component-bg, var(--color-bg));
      color: var(--component-text, var(--color-text));
      padding: var(--component-padding, 1rem);
      border-radius: var(--component-radius, 8px);
      box-shadow: var(--component-shadow, var(--elevation-medium));
    }
  </style>
  <slot></slot>
`;

class ThemedCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('themed-card', ThemedCard);