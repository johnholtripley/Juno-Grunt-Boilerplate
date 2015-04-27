module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {   
          dist: {
              src: [
                  'js/src/*.js' // All JS in the libs folder
              ],
              dest: 'js/concat.js',
          }
        },
        jshint: {
        files: ['js/src/*.js'],
        options: {
          globals: {
            jQuery: false
          }
        }
        },
        uglify: {
            build: {
                src: 'js/concat.js',
                dest: 'js/concat.min.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'images/src/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'images/'
                }]
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/base.css': 'css/src/base.scss',
                    'css/IE8Support.css': 'css/src/IE8Support.scss'
                }
            } 
        },
        watch: {
            scripts: {
                files: ['js/src/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            images: {
              files: ['images/src/'],
              tasks: ['imagemin'],
              options: {
                  spawn: false,
              },
            },
            css: {
              files: ['css/src/*.scss'],
              tasks: ['sass'],
              options: {
                  spawn: false,
              },
            },
            }
        });

// ---------------
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // ---------------
   grunt.registerTask('test', ['jshint']);
   grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'sass', 'watch']);

};