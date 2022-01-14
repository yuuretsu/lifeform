// @ts-check

const fs = require('fs');
const path = require('path');
const { argv } = require('process');

/** @type {string} */
const projectRoot = argv[2] || path.join(__dirname, "..");

// rename src/index.js -> src.index.ts

fs.renameSync(
  path.join(projectRoot, "src", "lib", "index.js"),
  path.join(projectRoot, "src", "lib", "index.ts")
);
fs.renameSync(
  path.join(projectRoot, "src", "index.js"),
  path.join(projectRoot, "src", "index.ts")
);


// add global.d.ts

fs.renameSync(
  path.join(projectRoot, "scripts", "global.d.ts"),
  path.join(projectRoot, "src", "global.d.ts")
);

// add tsconfig.json

fs.renameSync(
  path.join(projectRoot, "scripts", "_tsconfig.json"),
  path.join(projectRoot, "tsconfig.json")
);



// edit package.json

fs.renameSync(
  path.join(projectRoot, "scripts", "package.json"),
  path.join(projectRoot, "package.json")
);


// edit rollup.config.js

fs.renameSync(
  path.join(projectRoot, "scripts", "rollup.config.js"),
  path.join(projectRoot, "rollup.config.js")
);

// remove scripts

fs.rmSync(path.join(projectRoot, "scripts"), { recursive: true, force: true });
