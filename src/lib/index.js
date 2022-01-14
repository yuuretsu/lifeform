/**
 *
 * @param {number} w
 * @param {number} h
 */

export function layer(w, h) {
  const canvas = document.createElement("canvas");
  const width = (canvas.width = w);
  const height = (canvas.height = h);
  const ctx = canvas.getContext("2d");
  return {
    canvas,
    ctx,
    width,
    height,
    size: Object.freeze([width, height]),
    clear() {
      ctx.save();
      ctx.clearRect(0, 0, width, height);
      ctx.restore();
    }
  };
}

export function distance(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2);
}

export function lineEnd(x, y, angle, length) {
  return [Math.cos(angle) * length + x, Math.sin(angle) * length + y];
}

export function angle(cx, cy, ex, ey) {
  return Math.atan2(ey - cy, ex - cx);
}

/**
 * Random float between `min` and `max`.
 * @param {() => number} generator function, returns random value between 0 and 1
 * @param {number} min
 * @param {number} max
 */
export function randFloat(generator, min, max) {
  return generator() * (max - min) + min;
}

/**
 * Random integer between `min` and `max`.
 * @param {() => number} generator function, returns random value between 0 and 1
 * @param {number} min
 * @param {number} max
 */
export function randInt(generator, min, max) {
  return Math.floor(randFloat(generator, min, max));
}

export function randChoice(generator, arr) {
  return arr[Math.floor(generator() * arr.length)];
}

export function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}