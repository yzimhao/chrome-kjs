'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

//用于压缩前端的css js

module.exports = function (grunt) {
    
    require('load-grunt-tasks')(grunt);
    
    var ext = require('./src/manifest');
    var new_version = function(){
        var n = Number(ext.version) + 0.01;
        n = n.toFixed(2);
        console.log(n);
        return n;
    };



    grunt.initConfig({

        pkg: require('./package'),

        src: {
            dir: 'src'
        },

        dist: {
            dir: '<%= pkg.name %>'
        },


        //监控文件变化, 自动压缩js到目标文件夹
        watch: {

            any: {
                files: ['<%= src.dir %>/**/*.*'],
                tasks: ['clean', 'copy', 'uglify']
            }
        },

        copy: {
            main: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= src.dir%>/',
                    dest: '<%= dist.dir%>/',
                    src: [
                        '*.*',
                        '**/*.*',
                        '!*.js',
                        '!**/*.js'
                    ]
                }]
            }
        },

        //rewiter version
        replace: {
            version: {
                options: {
                    patterns: [{
                        match: /\"version\": \".*?\"/,
                        replacement: function(){
                            return '"version": "'+ new_version() +'"';
                        }
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['<%=src.dir%>/manifest.json'],
                    dest: '<%=src.dir%>'
                }]
            }
        },



        
        //压缩js文件
        uglify: {
            jsmin: {
                options:{
                    mangle: false,
                    // banner: '/* <%= grunt.template.today("yyyy-mm-dd H:mm:ss") %> */'
                },
                files: [{
                    expand: true,
                    cwd: '<%= src.dir %>',
                    src: ['**/*.js'],
                    dest: '<%= dist.dir %>'
                }]
            }
        },

        shell: {
            pack_crx: {                        // Target
                options: {                        // Options
                    stderr: true
                },
                command: "/usr/bin/google-chrome --pack-extension=<%=dist.dir%> --pack-extension-key=<%=pkg.name%>.pem"
            }
        },

        clean: {
            dist: {
                options: {force: true},
                dist: {
                    files: [{
                        dot: true,
                        src: [
                            '<%= dist.dir %>'
                        ]
                    }]
                }
            },

            crx: {
                options: {force: true},
                dist: {
                    files: [{
                        dot: true,
                        src: ['<%= pkg.name %>.crx']
                    }]
                }
            }
        }


    });
    
    
    //开发测试执行grunt test
    grunt.registerTask('default', ['clean', 'copy', 'uglify', 'watch']);
    
    // grunt pack
    grunt.registerTask('pack', [
        'clean:crx',
        'replace:version',
        'clean',
        'copy',
        'uglify',
        'shell'
    ]);
    
};
