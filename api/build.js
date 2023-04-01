const { build } = require("esbuild");
const { dependencies, peerDependencies } = require('./package.json')

const sharedConfig = {
    entryPoints: ["server.ts"],
    bundle: true,
    minify: true,
    external: Object.keys(dependencies),
};

build({
    ...sharedConfig,
    platform: 'node', // for CJS
    outfile: "dist/server.js",
});

build({
    ...sharedConfig,
    outfile: "dist/index.esm.js",
    platform: 'neutral', // for ESM
    format: "esm",
});