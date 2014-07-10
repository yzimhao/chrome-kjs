chrome-inject
=================

chrome-inject 是一款chrome浏览器下，web开发辅助插件，向指定的网页中插入js、css脚本等，实现一些自动化的操作,
结合grunt构建工具，实现修改代码自动刷新测试页面等操作。

例：
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
下载文件到本地解压后，找到dist目录下chrome-inject.crx文件，拖拽致chrome浏览器安装，该插件同时也能安装在新版本的360急速浏览器上。
安装好chrome插件，修改chrome-inject插件配置，试试修改php，js等文件，浏览器是否会自动刷新