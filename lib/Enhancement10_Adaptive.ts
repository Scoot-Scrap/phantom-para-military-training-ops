// lib/Enhancement10_Adaptive.ts
export class EpsilonGreedy {
  counts: number[];
  values: number[];
  epsilon: number;
  constructor(nArms: number, epsilon = 0.1) {
    this.counts = Array(nArms).fill(0);
    this.values = Array(nArms).fill(0);
    this.epsilon = epsilon;
  }
  selectArm() {
    if (Math.random() > this.epsilon) {
      return this.values.indexOf(Math.max(...this.values));
    } else {
      return Math.floor(Math.random() * this.values.length);
    }
  }
  update(chosen: number, reward: number) {
    this.counts[chosen]++;
    const n = this.counts[chosen];
    const value = this.values[chosen];
    this.values[chosen] = value + (1 / n) * (reward - value);
  }
}

// Usage:
const bandit = new EpsilonGreedy(3, 0.2);
const arm = bandit.selectArm();
// after user success/fail:
bandit.update(arm, success ? 1 : 0);
