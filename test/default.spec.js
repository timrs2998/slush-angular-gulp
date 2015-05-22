/* jshint node:true */
/**
 * MIT licensed, see LICENSE file
 * Copyright (c) Venkateswara VP <reflexdemon@github>
 */

(function() {
    'use strict';
    var gulp = require('gulp'),
        testingUtil = require('./testing_util.js'),
        mockGulpDest = require('mock-gulp-dest')(gulp);

    var assert = require('assertthat');

    require('../slushfile');
    describe('slush-angular-gulp', function() {
        before(function() {
            process.chdir(__dirname);
        });
        describe('default generator', function() {
            beforeEach(function() {
                testingUtil.mockPrompt({
                    name: 'module'
                });
            });
            it('should put all project files in current working directory', function(done) {
                gulp.start('default').once('stop', function() {
                    // mockGulpDest.cwd().should.equal(__dirname);
                    // mockGulpDest.basePath().should.equal(__dirname);

                    assert.that(mockGulpDest.cwd()).is.equalTo(__dirname);
                    assert.that(mockGulpDest.basePath()).is.equalTo(__dirname);
                    done();
                });
            });
            it('should add dot files to project root', function(done) {
                gulp.start('default').once('stop', function() {
                    mockGulpDest.assertDestContains([
                        '.bowerrc',
                        '.csslintrc',
                        '.editorconfig',
                        '.gitignore',
                        '.jshintrc'
                    ]);
                    done();
                });
            });
            it('should add bower.json and package.json to project root', function(done) {
                gulp.start('default').once('stop', function() {
                    mockGulpDest.assertDestContains([
                        'package.json',
                        'bower.json'
                    ]);
                    done();
                });
            });
            it('should add a gulpfile to project root', function(done) {
                gulp.start('default').once('stop', function() {
                    mockGulpDest.assertDestContains('gulpfile.js');
                    done();
                });
            });
            it('should add a karma config file to project root', function(done) {
                gulp.start('default').once('stop', function() {
                    mockGulpDest.assertDestContains('karma.conf.js');
                    done();
                });
            });
            it('should add a readme file to project root', function(done) {
                gulp.start('default').once('stop', function() {
                    mockGulpDest.assertDestContains('README.md');
                    done();
                });
            });
            it('should add an index.html to the app folder', function(done) {
                gulp.start('default').once('stop', function() {
                    mockGulpDest.assertDestContains('src/app/index.html');
                    done();
                });
            });
            it('should add a JavaScript app module definition file by default', function(done) {
                testingUtil.mockPrompt({
                    name: 'module'
                });
                gulp.start('default').once('stop', function() {
                    mockGulpDest.assertDestContains('src/app/app.js');
                    done();
                });
            });
            it('should create a gitkeep file in the app assets dir', function(done) {
                gulp.start('default').once('stop', function() {
                    mockGulpDest.assertDestContains('src/app/assets/.gitkeep');
                    done();
                });
            });
            describe('Todo example', function() {
                it('should not add any todo example files by default', function(done) {
                    testingUtil.mockPrompt({
                        name: 'module'
                    });
                    gulp.start('default').once('stop', function() {
                        mockGulpDest.assertDestNotContains({
                            'src/app/components/todo': [
                                'todo.js',
                                'todo.html',
                                'todo.css',
                                'todo-route.js',
                                'todo-controller.spec.js',
                                'todo-controller.js'
                            ]
                        });
                        done();
                    });
                });
                describe('When Todo example is included', function() {
                    beforeEach(function() {
                        testingUtil.mockPrompt({
                            name: 'module',
                            example: ['todo']
                        });
                    });
                    it('should add a module specific template', function(done) {
                        gulp.start('default').once('stop', function() {
                            mockGulpDest.assertDestContains('src/app/components/todo/todo.html');
                            done();
                        });
                    });
                    it('should add a module definition file for the Todo module', function(done) {
                        gulp.start('default').once('stop', function() {
                            mockGulpDest.assertDestContains('src/app/components/todo/todo.js');
                            done();
                        });
                    });
                    it('should add a Todo controller with a corresponding test file', function(done) {
                        gulp.start('default').once('stop', function() {
                            mockGulpDest.assertDestContains([
                                'src/app/components/todo/todo-controller.js',
                                'src/app/components/todo/todo-controller.spec.js'
                            ]);
                            done();
                        });
                    });
                });
            });
            describe('CSS files', function() {
                it('should add less stylesheets by default', function(done) {
                    testingUtil.mockPrompt({
                        name: 'module',
                        example: ['todo']
                    });
                    gulp.start('default').once('stop', function() {
                        mockGulpDest.assertDestContains([
                            'src/app/app.less',
                            'src/app/styles/_base.less',
                            'src/app/components/todo/todo.less'
                        ]);
                        done();
                    });
                });
                it('should add LESS stylesheets when LESS is chosen', function(done) {
                    testingUtil.mockPrompt({
                        name: 'module',
                        csstype: 'less',
                        example: ['todo']
                    });
                    gulp.start('default').once('stop', function() {
                        mockGulpDest.assertDestContains([
                            'src/app/app.less',
                            'src/app/styles/_base.less',
                            'src/app/components/todo/todo.less'
                        ]);
                        done();
                    });
                });
                it('should add Sass stylesheets when Sass is chosen', function(done) {
                    testingUtil.mockPrompt({
                        name: 'module',
                        csstype: 'sass',
                        example: ['todo']
                    });
                    gulp.start('default').once('stop', function() {
                        mockGulpDest.assertDestContains([
                            'src/app/app.scss',
                            'src/app/styles/_base.scss',
                            'src/app/components/todo/todo.scss'
                        ]);
                        done();
                    });
                });
            });
        });

    });

})();