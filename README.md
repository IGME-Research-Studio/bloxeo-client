![Logo](http://i.imgur.com/rp6p0vD.png)

A platform for brainstorming, organizing, and refining ideas in a distributed manner.

## Bloxeo Client

The frontend code for our brainstorming app, [live version available here](http://bloxeo.herokuapp.com/).

### Tech stack

* React view layer
* Flux for one way data communication
* HTTP and WebSockets for server communication
* React-DND for drag and drop support
* Babel and Browserify for running the latest ES code 
* Follows Material-UI design spec

### Getting started

Clone or fork the repo.

```
$ git clone git@github.com:IGME-Research-Studio/StormClient.git
$ cd StormClient
$ npm install
```

### Commands
```
# Start an HTTP server, serve the app on port 3000
$ npm start

# Run the test suite
$ npm test

# Recompile the project whenever changes are made to the tests or src files
$ npm run watch

# Recompile the project sass and watch for changes if you are editing the scss for the project
$ npm run sass

# Check the source code for stylistic correctness
$ npm run lint

# Build the project for development with either:
$ npm run build
$ npm run build-dev

# Build the project for production
$ npm run build-prod

# Lint, test, and build the project for production (should be run before PRs)
$ npm run prod
```

### Contributing guide

See [CONTRIBUTING.md](CONTRIBUTING.md) for contributing guidelines.


### License

Copyright &copy; 2015 MAGIC Spell Studios, all rights reserved.

See [PEOPLE.md](PEOPLE.md) for a list of contributors.
