const path = require("path");
const merge = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const baseConfig = {
    entry: {
        index: "./src/index.ts",
        "background/index": "./src/background/index.ts",
        "config/index": "./src/config/index.tsx"
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
        libraryTarget: "umd",
        library: "FundaNotities",
        umdNamedDefine: true
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    devtool: "source-map",
    optimization: {
        // filled in in env-specific config
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    context: "src",
                    from: "icons/*.png",
                    to: path.join(__dirname, "dist")
                },
                {
                    from: "src/manifest.json",
                    to: path.join(__dirname, "dist")
                },
                {
                    from: "src/style.css",
                    to: path.join(__dirname, "dist")
                },
                {
                    from: "src/config/index.html",
                    to: path.join(__dirname, "dist/config")
                }
            ]
        })
    ]
};

module.exports = env => {
    return merge(baseConfig, require(`./webpack.config.${env.NODE_ENV}.js`));
};
