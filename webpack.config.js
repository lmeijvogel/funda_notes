const path = require("path");
const merge = require("webpack-merge");

const baseConfig = {
    entry: {
        "index": "./src/index.ts",
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
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                sideEffects: true
            }
        ]
    },
    plugins: []
};

module.exports = env => {
    return merge(baseConfig, require(`./webpack.config.${env.NODE_ENV}.js`));
};
