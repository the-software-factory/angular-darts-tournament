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
dist/ // Contains builds
node_modules/ Hosts all npm dependencies
src/ // The source folder
	...
...
bower.json
gulpfile.js
package.json
...
```
Then run `npm start` to access the application at [http://localhost:8000/](http://localhost:8000/)
