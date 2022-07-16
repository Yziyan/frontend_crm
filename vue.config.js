const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    outputDir: "./build",
    // publicPath: "./",
    configureWebpack: {
        plugins: [
            require('unplugin-element-plus/webpack')({
                // options
            }),
            require('unplugin-icons/webpack')({ /* options */ }),
            require('unplugin-auto-import/webpack')({ /* options */ }),
        ],
    },
})
