// lib/kalman.ts
export class KalmanFilter {
  private q: number; // process noise covariance
  private r: number; // measurement noise covariance
  private x: number; // value
  private p: number; // estimation error covariance
  private k: number; // kalman gain

  constructor({ R = 1, Q = 1, A = 1, B = 0, C = 1 } = {}) {
    this.r = R;
    this.q = Q;
    this.x = 0;
    this.p = 1;
    this.k = 0;
  }

  filter(z: number): number {
    // prediction update
    this.p = this.p + this.q;
    // measurement update
    this.k = this.p / (this.p + this.r);
    this.x = this.x + this.k * (z - this.x);
    this.p = (1 - this.k) * this.p;
    return this.x;
  }
}
