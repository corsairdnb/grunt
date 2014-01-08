module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        sass: {
            dist: {
                files: {
                    'main.css': 'main.scss'
                },
                options: {
                    style: "expanded"
                }
            }
        },
        stylus: {
            compile: {
                files: {
                    'stylus.css': 'stylus.styl'
                    //'path/to/another.css': ['path/to/sources/*.styl', 'path/to/more/*.styl']
                },
                options: {
                    compress: false
                }
            }
        },
        connect: {
            all: {
                options:{
                    port: 9000,
                    hostname: '127.0.0.1',
                    base: '.',
                    //keepalive: true,
                    livereload: true
                }
            }
        },
        open: {
            all: {
                path: 'http://localhost:<%= connect.all.options.port%>'
            }
        },
        watch: {
            sass: {
                files: ['*.scss'],
                tasks: ['sass']
            },
            stylus: {
                files: ['*.styl'],
                tasks: ['stylus']
            },
            files: '*.html',
            options: {
                livereload: true
            }
        }
    });

    /*grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');*/

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['uglify', 'sass', 'stylus', 'watch']);
    grunt.registerTask('server',[
        'open',
        'connect',
        'sass',
        'watch'
    ]);

};