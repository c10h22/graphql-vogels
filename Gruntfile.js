'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['-a'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false,
                prereleaseName: 'rc',
                regExp: false
            }
        },
        changelog: {
            sample: {
                options: {
                    // Task-specific options go here.
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-changelog');
};