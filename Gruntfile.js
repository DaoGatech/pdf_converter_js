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
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint')
    grunt.registerTask('test', ['jshint'])
    grunt.registerTask('default', ['test'])

};