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
$ git clone git@github.com:IGME-Research-Studio/bloxeo-client.git
$ cd bloxeo-client
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

### Development

Lint before you commit by adding `pre-commit.sh` as a git hook:

```
ln -s ../../pre-commit.sh .git/hooks/pre-commit
```


### Contributing guide

See [CONTRIBUTING.md](CONTRIBUTING.md) for contributing guidelines.


### License

Copyright MAGIC Spell Studios, 2017

See [PEOPLE.md](PEOPLE.md) for a list of contributors.
