> Darts is a form of throwing game in which small missiles are thrown at a circular dartboard fixed to a wall.

# Angular Darts Tournament
An AngularJS app to play darts:
- choose players
- select point for each shooting
- see the summary
- win your match

<!-- TODO add gulp plugin -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!-- ## ChangeLog
Take a look at the [CHANGELOG.md](CHANGELOG.md) to verify if a case has been included in a release or not.
It contains the list of commits grouped by tag.
<!-- TODO Add plugin for the changelog -->

## Project Structure

```
core/ // Contains the common AngularJS code
mobile/ // It's the ionic project
web/ // The web application project
```

## Development
Project requires:
- [node](https://nodejs.org/)
- [bower](http://bower.io/)
- [gulp](http://gulpjs.com/)

Please run following commands to install all `dev-dependencies`:

```sh
$ npm install
```

and

```sh
$ bower install
```

Then run `gulp` to create the `development` and `production` builds of the app. 
After all of these steps the project structure should match the following one:

```
bower_components/ // Hosts all bower dependencies
node_modules/ Hosts all npm dependencies
	...
...
bower.json
gulpfile.js
karma.conf.js
package.json
...
```

Then run `npm start` to access the application at [http://localhost:8000/](http://localhost:8000/)

### Tests
Test suite can be run with the following command:

```sh
npm test
```

### Contributing
Take a look at [CONTRIBUTING.md](CONTRIBUTING.md) for more details.
