// public/paint-worklet.js

/**
 * A simple “stripes” paint worklet that reads theme colors
 * from CSS custom properties (--color-primary, --color-secondary)
 * and draws diagonal stripes.
 */
registerPaint('stripes', class {
  static get inputProperties() {
    return ['--color-primary', '--color-secondary'];
  }
  paint(ctx, size, props) {
    const primary   = props.get('--color-primary').toString();
    const secondary = props.get('--color-secondary').toString();
    const stripeW   = 20;
    ctx.fillStyle = secondary;
    ctx.fillRect(0, 0, size.width, size.height);
    ctx.strokeStyle = primary;
    ctx.lineWidth = stripeW / 2;
    for (let x = -size.height; x < size.width; x += stripeW) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + size.height, size.height);
      ctx.stroke();
    }
  }
});