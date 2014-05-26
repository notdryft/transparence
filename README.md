# Transparence [![Build Status](https://travis-ci.org/notdryft/transparence.svg?branch=master)](https://travis-ci.org/notdryft/transparence) [![Code Climate](https://codeclimate.com/github/notdryft/transparence.png)](https://codeclimate.com/github/notdryft/transparence) [![Code Climate](https://codeclimate.com/github/notdryft/transparence/coverage.png)](https://codeclimate.com/github/notdryft/transparence)

A tool to help with bonus calculation in a **visual** and **easy** way.


## Modules

### Install

Just do the following:
```bash
$ npm install -g grunt grunt-cli bower
[... transparence ]$ bower install
[... transparence ]$ npm install
```

### Update

You must do both:
```bash
[... transparence ]$ bower list
[... transparence ]$ npm-check-updates [-u]
```

Beware though, as `npm-check-updates` tends to downgrade `karma-jasmine` to `1.5`, which will break the application.

## Build

Default build chain:
```bash
[... transparence ]$ NODE_ENV=development grunt
```

Available tasks are:
* `clean[:after, :all, :package]`
* `jshint[:all]`
* `concat[:all]`
* `uglify[:all]`
* `less[:development, :production]`
* `preprocess[:index]`
* `copy[:development, :production]`
* `karma[:unit]`
* `shell[:package]`

Main tasks are:
* `compile`: development oriented compiling
 - `clean:all`, `clean:package`, `jshint`, `concat`, `less:development`, `preprocess:index`, `copy:development`
* `test`: development oriented compiling and testing
 - `compile`, `karma:unit`
* `prepare`: production oriented compiling
 - `clean:all`, `clean:package`, `jshint`, `concat`, `uglify`, `less:production`, `preprocess:index`, `copy:production`, `clean:after`
* `confirm`: production oriented compiling and testing
 - `prepare`, `karma:unit`
* `package`: which does `prepare` and `confirm` plus project packaging
 - `confirm`, `shell:package`

Main chains are:
```bash
[... transparence ]$ NODE_ENV=development grunt test
[... transparence ]$ NODE_ENV=production grunt package
```

Don't forget to set `NODE_ENV` to either `development` or `production`.

## Testing

You can start [Karma](http://karma-runner.github.io/)'s file watch this way:

```bash
$ npm install -g karma
[... transparence ]$ karma start
```

Alternatively, you can use the provided grunt task, which does a single run:

```bash
[... transparence ]$ grunt test
```

## Launching

You can start a server by the following grunt task:
```bash
[... transparence ]$ grunt connect
```

This will execute all the build tasks, then start a server on port `3000` with the content of directory `dist`.

Finally, the best way to compile, test and connect in development mode is the following:
```bash
[... transparence ]$ NODE_ENV=development grunt test && grunt connect
```
