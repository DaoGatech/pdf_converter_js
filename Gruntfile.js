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
            }
        }
    })
    grunt.loadNpmTasks('grunt-contrib-jshint')
    grunt.loadNpmTasks('grunt-karma')
    grunt.registerTask('test', ['jshint'])
    grunt.registerTask('unit-test', ['karma'])
    grunt.registerTask('default', ['test'])

}