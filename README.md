# Building

The browser plugin is written in Typescript. To build it, make sure you have nodejs / yarn installed.

Then:

```
yarn install
yarn webpack
yarn build
```

This will create a zip in `web-ext-artifacts` that can be uploaded to addons.mozilla.org

# Debugging

```
yarn install
yarn dev # Debugs the plugin in Firefox via "web-ext run" and runs a backend service in Ruby + Sinatra
yarn dev-frontend # Debugs the plugin in Firefox via "web-ext run" without the backend service
yarn backend # Runs the backend service in Ruby + Sinatra
```
