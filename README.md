![Logo](http://i.imgur.com/rp6p0vD.png)

A platform for brainstorming, organizing, and refining ideas in a distributed manner.

![Screenshot](http://i.imgur.com/aRuxehZ.png)

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

# Alternatively start the server in the background using nohup
$ npm run dev-start

# Builds the project and recompile changes are made to the src files
$ npm run watch

# Or do a dev-start along with a watch in the same command
$ npm run dev

# Check the source code for stylistic correctness
$ npm run lint

# Build the project for production
$ npm run build
```

### Contributing guide

See [CONTRIBUTING.md](CONTRIBUTING.md) for contributing guidelines.


### License

Copyright &copy; 2015-2016 MAGIC Spell Studios, all rights reserved.

See [PEOPLE.md](PEOPLE.md) for a list of contributors.
