/* jshint node: true */
'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['Gruntfile.js', 'src/*.js', 'test/*.js']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('default', ['test']);

};