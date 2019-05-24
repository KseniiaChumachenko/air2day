## CzechAir

Webapplication created in order to represent data about air pollution in big cities. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn install`

Install packages of dependencies listed in package.json

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the build folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.<br>

The build is minified and the filenames include the hashes.<br>

Your app is ready to be deployed.

## no-cors policy
If CORS (Cross-Origin Resource Sharing) is blocked by server(back-end setup currently not stable) no-cors mode of browser have to be used.<br>

####On mac:<br>
* Install Chrome
* Run in terminal <br> 
`open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security`

####On windows:<br>
* Install Chrome
* Right click on desktop, add new shortcut
* Add the target as "[PATH_TO_CHROME]\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp

## Deployment
Detailed information about deployment could be found on:<br>
[https://facebook.github.io/create-react-app/docs/deployment]