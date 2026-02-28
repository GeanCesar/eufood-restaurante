const PROXY_CONFIG = [
    {
        context: ['/usuario_login', '/restaurante'],
        target: "http://192.168.15.103:8080/",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/": ""
        }
    }
]

module.exports = PROXY_CONFIG;