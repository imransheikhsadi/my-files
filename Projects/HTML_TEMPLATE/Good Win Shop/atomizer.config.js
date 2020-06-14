module.exports = {
    cssDest: 'src/style/css/atomic.css',
    options: {
        // namespace: '#atomic',
    },
    configs: {
        "breakPoints": {
            'xm': '@media(min-width:0)',
            'sm': '@media(min-width:576px)',
            'md': '@media(min-width:768px)',
            'lg': '@media(min-width:992px)',
            'xl': '@media(min-width:1200px)',
            'Msm': '@media(max-width:576px)',
            'Mmd': '@media(max-width:768px)',
            'Mlg': '@media(max-width:992px)',
            'Mxl': '@media(max-width:1200px)',
        },
        "custom": {
           'themeColor': '#27c7d8'
        },
        "classNames": [

        ]
    },
 
}
