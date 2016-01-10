module.export = {
    context: __dirname + "/app",
    entry: "./entry",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    }
}