'use strict'

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            text: {
                src: [
                    'src/*.js',
                    'test/*.js'
                ],
                options: {
                    jshintrc: '.jshintrc'
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
            },
            //continuous integration mode: run tests once in PhantomJS browser.
            continuous: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            },
        }
    })
    grunt.loadNpmTasks('grunt-contrib-jshint')
    grunt.loadNpmTasks('grunt-karma')
    grunt.registerTask('test', ['jshint'])
    grunt.registerTask('default', ['test'])

}