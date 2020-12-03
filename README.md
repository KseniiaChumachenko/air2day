## Air2Day

Webapplication created in order to represent data about air pollution in big cities. 

##### Technical stack:
- React 17 (Typescript)
- Material UI
- Apollo client (GraphQL API)
- Webpack 5
- Babel
- 20 lines of express app to serve React build 

## Available Scripts

#####First enrich an environment with following variables:
```
NODE_ENV - either "development" or "production"
API_URI - example: "http://localhost:8080/air2day-devel/api"
AUTH_TOKEN - example: "004aecc8-eb12-4572-85ac-4375cbe880ac"
GOOGLE_API_KEY - example "AIzaSyCMq7ChRIjtPzz_QNpiHShMY0dfmpkL8rs"
```
*Hint:* cross-env package is a part of the devDependencies, you can adjust scripts for simpler variables usage.

### In the project directory, you can run:

### `yarn install`

Install packages of dependencies listed in package.json

### `yarn dev`

Runs the app in the development mode, i.e. webpack-dev-server.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the build folder.<br>

App is ready to be deployed.

### `yarn start`

Runs express server with needed API proxy and serves build created by `build` script.
Application will run on port specified by PORT environmental variable, otherwise fallback to port 8080 will be used.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser. 

### `yarn start`

Repo extended with express, script will run server with build of React app.
