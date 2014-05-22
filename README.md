chrome-livereload
=================

chrome-livereload 是一款chrome浏览器下，web开发辅助插件，减少开发人员修改代码后，需要切换界面，刷新浏览器等操作。

在使用grunt grunt-contrib-watch配置任务时 请配置livereload为true

    watch: { //监控文件变化, 自动压缩js到目标文件夹

        options:{
            livereload: true
        },

        js: {
            files: ['<%= src.jsdir %>**/*.js'],
            tasks: ['uglify']
        },

        //监控网站php文件的变更, 如有变更刷新浏览器
        php: {
            files: ['**/*.php'],
            tasks: []
        }
    },

###配置好watch任务之后，执行下面命令
    grunt watch

###插件安装
下载文件到本地解压后，找到dist目录下chrome-livereload.crx文件，拖拽致chrome浏览器安装，该插件同时也能安装在新版本的360急速浏览器上。
安装好chrome插件，修改chrome-livereload插件配置，试试修改php，js等文件，浏览器是否会自动刷新