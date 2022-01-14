import { angle, distance, layer, lerp, lineEnd, randChoice, randFloat } from "./lib";
import Simplex from "simplex-noise";

const features = {};

const PLANTS_HUE = (fxrand()) ** 2 * 360;

function nsin(val) {
  return (Math.sin(val) + 1) * 0.5;
}

const LOL = fxrand() * 100;
const GET_NOISE_VALUE = {
  noisy: (x, y) => nsin(noise(...[x, y].map(x => x / WIDTH)) * 20) * nsin(noise2(...[x, y].map(x => x / WIDTH * 2)) * 20) * 300 + 3,
  // waves: (x, y) => (nsin(distance(...CENTER, x - WIDTH * 0.4, y + LOL) * 0.01) + nsin(distance(...CENTER, x + WIDTH * 0.4, y) * 0.01)) ** 3 * 40 + 3,
};

// function getNoiseValue(x, y) {
//   return nsin(noise(...[x, y].map(x => x / WIDTH)) * 20) * nsin(noise2(...[x, y].map(x => x / WIDTH * 2)) * 20) * 300 + 3;
// }

// features["cells structure"] = randChoice(() => fxrand() ** 2, Object.keys(GET_NOISE_VALUE));

// const getNoiseValue = GET_NOISE_VALUE[features["cells structure"]];

const getNoiseValue = GET_NOISE_VALUE['noisy'];

// function getNoiseValue(x, y) {
//   return (nsin(distance(...CENTER, x - WIDTH * 0.4, y) * 0.01) + nsin(distance(...CENTER, x + WIDTH * 0.4, y) * 0.01)) ** 3 * 40 + 3;
// }

const PI_2 = Math.PI * 2;
const noise = (() => {
  const simplex = new Simplex(fxrand());
  return (x, y, z = 0) => (simplex.noise2D(x, y, z) + 1) * 0.5;
})();

const noise2 = (() => {
  const simplex = new Simplex(fxrand());
  return (x, y, z = 0) => (simplex.noise2D(x, y, z) + 1) * 0.5;
})();

features["background colors"] = fxrand() < 0.8
  ? (fxrand() > 0.35 ? "colorful gradients" : 'more contrast')
    : fxrand() < 0.6
      ? "grayscale"
      : "dark";

// features["background colors"] = "dark";

const TENTACLE_COLORS = features["background colors"] === "dark"
  ? [`hsl(${PLANTS_HUE + 180}, 75%, 60%)`, `hsl(${PLANTS_HUE + 180}, 75%, 65%)`]
  : [`hsl(${PLANTS_HUE + 180}, 75%, 30%)`, `hsl(${PLANTS_HUE + 180}, 75%, 35%)`];

const BGHA = fxrand() * 360;
const BG_COLORS = {
  "colorful gradients": [
    `hsl(${BGHA}, 100%, ${90}%)`,
    `hsl(${BGHA + fxrand() * 90 + 90}, 25%, ${85}%)`
  ],
  'more contrast': [
    `hsl(${BGHA}, 10%, ${85}%)`,
    `hsl(${BGHA + fxrand() * 90 + 90}, 25%, ${50}%)`
  ],
  "grayscale": [
    "rgb(240 240 240)",
    "rgb(210 210 210)"
  ],
  "dark": [
    "rgb(35 35 100)",
    "rgb(10 0 0)"
  ],
};



const [bgca, bgcb] = BG_COLORS[features["background colors"]];


const BGDRAWS = [
  (() => {

    return (ctx) => {
      const grad = ctx.createLinearGradient(0, 0, 0, HEIGHT);
      grad.addColorStop(0, bgca);
      grad.addColorStop(1, bgcb);

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);


      const grad2 = ctx.createLinearGradient(0, HEIGHT, 0, 0);
      grad2.addColorStop(0, bgca);
      grad2.addColorStop(1, bgcb);
      ctx.fillStyle = grad2;

      ctx.beginPath();
      ctx.moveTo(BORDER / 2, HEIGHT / 2);
      ctx.lineTo(WIDTH / 2, BORDER / 2);
      ctx.lineTo(WIDTH - BORDER / 2, HEIGHT / 2);
      ctx.lineTo(WIDTH / 2, HEIGHT - BORDER / 2);
      ctx.closePath();

      ctx.fill();
    };
  })(),
  (() => {

    return (ctx) => {
      const grad = ctx.createLinearGradient(0, 0, 0, HEIGHT);
      grad.addColorStop(0, bgca);
      grad.addColorStop(1, bgcb);

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);


      const grad2 = ctx.createLinearGradient(0, HEIGHT, 0, 0);
      grad2.addColorStop(0, bgca);
      grad2.addColorStop(1, bgcb);
      ctx.fillStyle = grad2;

      ctx.fillRect(BORDER, BORDER, WIDTH - BORDER * 2, HEIGHT - BORDER * 2);
    };
  })(),
  (() => {

    return (ctx) => {
      const grad = ctx.createLinearGradient(0, 0, 0, HEIGHT);
      grad.addColorStop(0, bgca);
      grad.addColorStop(1, bgcb);

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);


      const grad2 = ctx.createLinearGradient(0, HEIGHT, 0, 0);
      grad2.addColorStop(0, bgca);
      grad2.addColorStop(1, bgcb);
      ctx.fillStyle = grad2;

      ctx.beginPath();
      ctx.arc(...CENTER, WIDTH / 2 - BORDER, 0, Math.PI * 2);
      ctx.fill();
    };
  })(),
  (() => {

    const angl = fxrand() * Math.PI * 2;

    return (ctx) => {
      const grad = ctx.createLinearGradient(0, 0, 0, HEIGHT);
      grad.addColorStop(0, bgca);
      grad.addColorStop(1, bgcb);

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);


      const grad2 = ctx.createLinearGradient(0, HEIGHT, 0, 0);
      grad2.addColorStop(0, bgca);
      grad2.addColorStop(1, bgcb);
      ctx.fillStyle = grad2;

      ctx.beginPath();
      ctx.arc(...CENTER, WIDTH / 2 - BORDER, angl + 0.2, angl + Math.PI);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(...CENTER, WIDTH / 2 - BORDER, angl + Math.PI + 0.2, angl + Math.PI + Math.PI);
      ctx.fill();
    };
  })(),
];

const BGPARTICLES = [
  (ctx, x, y, r) => {
    ctx.beginPath();
    ctx.arc(x, y, r * 0.9, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
  },
  (() => {
    const amount = 3;
    return (ctx, x, y, r) => {
      ctx.beginPath();
      ctx.arc(x, y, r * 0.3, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();

      const delay = fxrand() * Math.PI * 2;
      for (let i = 0; i < amount; i++) {
        ctx.beginPath();
        ctx.arc(...lineEnd(x, y, Math.PI * 2 / amount * i + delay, r * 0.6), r * 0.2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }
  })(),
  (ctx, x, y, r) => {
    const delay = fxrand() * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(...lineEnd(x, y, delay, r));
    ctx.lineTo(...lineEnd(x, y, delay, -r));
    ctx.stroke();
  },
  (ctx, x, y, r) => {
    const delay = fxrand() * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(...lineEnd(x, y, delay, r));
    ctx.lineTo(...lineEnd(x, y, delay, -r));

    ctx.moveTo(...lineEnd(x, y, delay + Math.PI / 2, r));
    ctx.lineTo(...lineEnd(x, y, delay + Math.PI / 2, -r));
    ctx.stroke();
  },
];


// features["plant form"] = randChoice(fxrand, ["round", "circle", "crossing"]);

features["plant form"] = fxrand() < 0.6
  ? "round"
  : fxrand() < 0.6
    ? "circle"
    : "crossing";

const getPlantL = features["background colors"] === "dark"
  ? i => 35 + i % 15
  : i => 20 + i % 10;

const getCellColor = features["background colors"] === "grayscale"
  ? i => `hsl(0, 0%, ${i % 50 + 25}%)`
  : features["background colors"] === "more contrast"
    ? i => `hsl(${PLANTS_HUE + i / 10}, 80% , ${getPlantL(i) + 20}%)`
    : i => `hsl(${PLANTS_HUE + i / 10}, 100% , ${getPlantL(i)}%)`;

const PLANT_CELL_DRAWS = {
  "circle": (() => {
    const mult = fxrand() * 0.3 + 0.5;
    return (ctx, x, y, r, i) => {
      const lw = r * mult;
      ctx.beginPath();
      ctx.arc(x, y, r - lw / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.strokeStyle = getCellColor(i);
      ctx.lineWidth = lw;
      ctx.stroke();
    }
  })(),
  "round": (ctx, x, y, r, i, t) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = getCellColor(i);
    ctx.fill();
  },
  "crossing": (ctx, x, y, r, i, t) => {
    ctx.lineCap = "round";
    ctx.lineWidth = r * 1;
    ctx.strokeStyle = getCellColor(i);
    ctx.beginPath();
    const a = i + t * 0.01 * (i % 2 === 0 ? 1 : -1);
    ctx.moveTo(...lineEnd(x, y, a, r));
    ctx.lineTo(...lineEnd(x, y, a, -r));
    ctx.moveTo(...lineEnd(x, y, a + Math.PI / 2, r));
    ctx.lineTo(...lineEnd(x, y, a + Math.PI / 2, -r));
    ctx.stroke();
  },
};

features["creature center"] = fxrand() < 0.97
  ? randChoice(fxrand, ["gradient", "crossing"])
  : "eye";

// features["creature center"] = "eye";

const CREATURE_CENTERS = {
  "gradient": (() => {
    const rmult = randFloat(() => fxrand() ** 8, 0.3, 1);
    return (x, y, radius, i) => {
      ctxl1.beginPath();
      ctxl1.arc(x, y, radius * rmult, 0, Math.PI * 2);
      const grad = ctxl1.createRadialGradient(x, y, 0, x, y, radius * rmult);
      grad.addColorStop(0, 'rgb(0 0 255 / 20%)');
      grad.addColorStop(1, 'transparent');
      ctxl1.fillStyle = grad;
      ctxl1.fill();

      ctxl1.beginPath();
      ctxl1.arc(x, y, radius * 0.1, 0, Math.PI * 2);
      ctxl1.fillStyle = 'rgb(0 0 0)';
      ctxl1.fill();
    }
  })(),
  "crossing": (() => {
    const rmult = randFloat(() => fxrand() ** 8, 0.2, 0.3);
    const amount = fxrand() < 0.7 ? 3 : 5;
    return (x, y, radius, i) => {
      ctxl1.beginPath();
      for (let j = 0; j < amount; j++) {
        const a = PI_2 / amount * j + Math.sin(j + t * 0.1) * 0.05 + i;
        ctxl1.moveTo(...lineEnd(x, y, a, radius * rmult));
        ctxl1.lineTo(...lineEnd(x, y, a + Math.PI, radius * rmult));
      }
      ctxl1.lineWidth = radius * 0.1;
      ctxl1.lineCap = "round";
      ctxl1.strokeStyle = `rgb(0 0 0 / 25%)`;
      ctxl1.stroke();

      ctxl1.beginPath();
      ctxl1.arc(x, y, radius * 0.1, 0, PI_2);
      ctxl1.fillStyle = "black";
      ctxl1.fill();
    }
  })(),
  "eye": (x, y, radius, i) => {
    ctxl1.beginPath();
    ctxl1.arc(x, y, radius * 0.4, 0, Math.PI * 2);
    ctxl1.fillStyle = "rgb(255 255 255 / 90%)";
    ctxl1.fill();

    ctxl1.beginPath();
    ctxl1.arc(...lineEnd(x, y, (Math.sin(t * 0.01 + Math.sin(t * 0.023 + i) + i ** 2.1) + t * 0.01) * (i % 2 === 0 ? 1 : -1) + Math.sin(t * 0.0001), lerp(0, radius, 0.25)), radius * 0.1, 0, Math.PI * 2);
    ctxl1.fillStyle = 'rgb(0 0 0 / 90%)';
    ctxl1.fill();
  }
};

const drawCreatureCenter = CREATURE_CENTERS[features["creature center"]];

features["creature pattern"] = randChoice(() => fxrand() ** 2, [
  'lines',
  'arc',
  'circles',
]);

const FOLDS_HUE = fxrand() * 360;

const CREATURE_PATTERNS = {
  "lines": (() => {
    const am = Math.round(fxrand() * 9 + 2);
    return (ctx, x, y, r, i, t) => {
      ctx.beginPath();
      for (let j = 0; j < am; j++) {
        const a = (PI_2 / am * j + i + t * i * 0.0001 + Math.sin(t * 0.1 + j) * 0.1) * (am % 2 === 0 ? 1 : -1);
        ctx.moveTo(...lineEnd(x, y, a, r * 0.4 + Math.sin(t * 0.1 * (j % 2 === 0 ? 1 : -1) + i + j) * r * 0.1));
        ctx.lineTo(...lineEnd(x, y, a, r * 0.5));
        ctx.lineWidth = r * 0.3;
        ctx.strokeStyle = `hsla(${FOLDS_HUE}, 75%, 25%, 0.4)`;
        ctx.lineCap = "round";
      }
      ctx.stroke();
    }
  })(),
  "arc": (() => {
    const widthmult = randChoice(fxrand, [
      0.9,
      randFloat(fxrand, 0.4, 0.5)
    ]);
    return (ctx, x, y, r, i, t) => {
      const a = i + t * 0.005;
      ctx.beginPath();
      ctx.arc(x, y, r * 0.5, a, Math.PI / 2 + a);

      ctx.lineWidth = r * widthmult;
      ctx.strokeStyle = `hsla(${FOLDS_HUE}, 75%, 25%, 0.4)`;
      ctx.lineCap = "round";
      ctx.stroke();
    }
  })(),
  'circles': (() => {
    const am = Math.round(fxrand() * 9 + 2);
    return (ctx, x, y, r, i, t) => {
      for (let j = 0; j < am; j++) {
        ctx.beginPath();
        const a = (PI_2 / am * j + i + t * i * 0.0001 + Math.sin(t * 0.1 + j) * 0.1) * (am % 2 === 0 ? 1 : -1);

        ctx.fillStyle = `hsla(${FOLDS_HUE}, 75%, 25%, 0.4)`;

        const path = new Path2D;

        {
          const circle = new Path2D;
          circle.arc(...lineEnd(x, y, a, r * 0.2), r * 0.05, 0, PI_2);
          path.addPath(circle);
        }

        {
          const circle = new Path2D;
          circle.arc(...lineEnd(x, y, a, r * 0.4), r * 0.1, 0, PI_2);
          path.addPath(circle);
        }

        {
          const circle = new Path2D;
          circle.arc(...lineEnd(x, y, a + PI_2 / am, r * 0.6), r * 0.08, 0, PI_2);
          path.addPath(circle);
        }
        ctx.fill(path);

      }
    }
  })(),
};


const TENTACLE_TIPS = {
  "round": (() => {
    return (ctx, x, y, r, i, narrow) => {
      ctx.beginPath();
      ctx.arc(x, y, r * 0.1, 0, Math.PI * 2);
      ctx.fillStyle = TENTACLE_COLORS[1];
      ctx.fill();
    };
  })(),
  "claw": (() => {
    return (ctx, x, y, r, i, am, narrow) => {
      ctx.beginPath();
      // const mul = nsin(t * am * 0.01);
      const mul = nsin(narrow * 5) + nsin(t * 0.04);
      ctx.moveTo(...lineEnd(x, y, narrow - 0.7 * mul, 20));
      ctx.lineTo(x, y);
      ctx.lineTo(...lineEnd(x, y, narrow + 0.7 * mul, 20));
      ctx.miterlimit = 1;
      ctx.lineJoin = "round";
      ctx.stroke();
    };
  })(),
};

const POINTS_PRESETS = {
  "none": (points) => {},
  "one big in center": points => {
    points.push({ pos: [...CENTER], r: WIDTH / 5 });
  },
  "lined up in a circle": points => {
    const amount = 16;
    for (let i = 0; i < amount; i++) {
      points.push({ pos: lineEnd(...CENTER, PI_2 / amount * i - Math.PI / 2, WIDTH / 6), r: WIDTH / 20 });
    }
  },
  // "lined up in a big circle": points => {
  //   const amount = 27;
  //   for (let i = 0; i < amount; i++) {
  //     points.push({ pos: lineEnd(...CENTER, PI_2 / amount * i, WIDTH / 3), r: WIDTH / 30 });
  //   }
  // },
};

features["points preset"] = randChoice(() => fxrand() ** 3, Object.keys(POINTS_PRESETS));

features["tentacle tip"] = randChoice(fxrand, Object.keys(TENTACLE_TIPS));

const drawTentacleTip = TENTACLE_TIPS[features["tentacle tip"]];

const drawCreaturePattern = CREATURE_PATTERNS[features["creature pattern"]];

const drawBg = randChoice(fxrand, BGDRAWS);
const plantCellDraw = PLANT_CELL_DRAWS[features["plant form"]];

const WIDTH = 2000;
const HEIGHT = 2000;
const CENTER = [WIDTH / 2, HEIGHT / 2];

const BORDER = WIDTH / 6;

const { canvas, ctx } = layer(WIDTH, HEIGHT);
document.body.appendChild(canvas);

const { canvas: layer1, ctx: ctxl1, clear: l1clear } = layer(WIDTH, HEIGHT);

const { canvas: bgParticlesLayer, ctx: ctlBgP } = layer(WIDTH, HEIGHT);

drawBg(ctlBgP);

(() => {

  const grad = ctlBgP.createRadialGradient(...CENTER, 0, ...CENTER, WIDTH / 2);
  const l = features["background colors"] === "dark" ? 100 : 25;
  grad.addColorStop(0, `hsla(${0}, 100%, ${l}%, 0.5)`);
  grad.addColorStop(1, `hsla(${180}, 100%, ${l}%, 0)`);

  ctlBgP.lineWidth = 1;

  const bgParticlesPoints = [];
  ctlBgP.fillStyle = grad;
  ctlBgP.strokeStyle = grad;
  // ctlBgP.globalAlpha = 0.1;
  for (let i = 0; i < 10000; i++) {
    // const newPoint = lineEnd(...CENTER, fxrand() * PI_2, Math.sqrt(fxrand()) * 1000);
    const newPoint = [fxrand() * WIDTH, fxrand() * HEIGHT];
    const r = getNoiseValue(...newPoint) ** 0.3;
    if (bgParticlesPoints.every(p => distance(...p.pos, ...newPoint) > r + p.r + 2 && r > 3)) {
      bgParticlesPoints.push({ pos: newPoint, r });
      // ctlBgP.strokeStyle = 'black';
      randChoice(fxrand, BGPARTICLES)(ctlBgP, ...newPoint, r);
      // ctlBgP.strokeStyle = 'red';
      // BGPARTICLES[0](ctlBgP, ...newPoint, r);
    }
  }
})();

const points = [];
POINTS_PRESETS[features["points preset"]](points);
for (let i = 0; i < 5000; i++) {
  const newPoint = lineEnd(...CENTER, fxrand() * PI_2, Math.sqrt(fxrand()) * 725);
  const r = getNoiseValue(...newPoint)
  if (points.every(p => distance(...p.pos, ...newPoint) > r + p.r + 2)) {
    points.push({ pos: newPoint, r });
  }
}

let t = 0;
void function loop() {

  l1clear();

  // const rnd = sfc32(...hashes);

  const minradius = 35;

  points.filter(({ r }) => r > minradius).forEach(({ pos: p2, r }, j) => {
    const amount = 8;
    for (let am = 0; am < amount; am++) {
      let pos = [...p2];
      const path = new Path2D();
      path.moveTo(...pos);
      let a;
      for (let i = 0; i < 15; i++) {
        const theta = getNoiseValue(...pos) * 0.1;
        a = (theta * 0.1 + Math.sin(i * 0.1 + t * 0.005 + j) * 2 + t * 0.005 + PI_2 / amount * am + j * 10) * (j % 2 === 0 ? 1 : -1);
        pos = lineEnd(...pos, a, 10);
        path.lineTo(...pos);
      }
      ctxl1.lineWidth = r * 0.03;
      ctxl1.strokeStyle = TENTACLE_COLORS[0];
      ctxl1.stroke(path);

      drawTentacleTip(ctxl1, ...pos, r, j, am, a);
    }
  });

  points.forEach((p, i) => {
    const center = lineEnd(...p.pos, (t * i * 0.0001 + i) * (i % 2 === 0 ? 1 : -1), 5);
    // ctxl1.fill();
    if (p.r > minradius) {
      drawCreaturePattern(ctxl1, ...center, p.r, i, t);
      ctxl1.beginPath();
      ctxl1.arc(...center, p.r + Math.sin(t * 0.05 + i) * p.r * 0.03, 0, Math.PI * 2);
      // ctxl1.fillStyle = "rgb(255 255 255 / 90%)";
      const grad = ctxl1.createRadialGradient(...center, p.r * 0.25, ...center, p.r);
      grad.addColorStop(0, `hsla(${180}, 50%, 75%, 0.5)`);
      grad.addColorStop(1, 'rgb(255 255 255 / 100%)');
      ctxl1.fillStyle = grad;
      ctxl1.fill();

      drawCreatureCenter(...center, p.r, i);

    } else {
      plantCellDraw(ctxl1, ...center, p.r, i, t);
    }
  });

  ctx.drawImage(bgParticlesLayer, 0, 0);

  ctx.filter = 'blur(50px) saturate(0.5)';
  ctx.drawImage(layer1, 0, 0);
  ctx.filter = 'none';
  ctx.drawImage(layer1, 0, 0);
  t++;
  requestAnimationFrame(loop);
}();

window.$fxhashFeatures = features;

// console.log(window.$fxhashFeatures);