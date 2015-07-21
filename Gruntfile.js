'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: {
            version: '0.1.0'
        },
        bump: {
            options: {
                files: ['package.json', 'Gruntfile.js'],
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
            initial: {
                options: {
                    after: 'v0.0.2',
                    n: ',,,',
                    featureRegex: /^(.*)closes #\d+:?(.*)$/gim,
                    fixRegex: /^(.*)fixes #\d+:?(.*)$/gim,
                    dest: 'changelog_<%= pkg.version %>.md',
                    template: '## Version <%= pkg.version %>({{date}})\n\n{{> features}}{{> fixes}}',
                    logArguments: [
                        '--pretty=- (%h) - %ad: %s',
                        '--no-merges',
                        '--date=short'
                    ],
                    partials: {
                        features: '###FEATURES:###\n\n{{#if features}}{{#each features}}{{> feature}}{{/each}}{{else}}{{> empty}}{{/if}}\n',
                        feature: '{{this}} {{this.date}}\n',
                        fixes: '###FIXES:###\n\n{{#if fixes}}{{#each fixes}}{{> fix}}{{/each}}{{else}}{{> empty}}{{/if}}\n',
                        fix: '{{this}} {{this.date}}\n'
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-changelog');
};