const { aliasPath } = require('esbuild-plugin-alias-path')
const path = require("path");

module.exports = {
    // Supports all esbuild.build options
    esbuild: {
        plugins: [
            aliasPath({
                alias: {
                    "@src": path.resolve(__dirname, "./src"),
                    "@root": path.resolve(__dirname, "./"),
                },
            }),
        ],
    },
}