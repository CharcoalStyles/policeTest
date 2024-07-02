# NSW Police Career Pathway Tool

## Essential development node commands

```bash
# install dependencies
$ yarn

# serve with hot reload at localhost:3000
$ yarn dev

# serve locally through express at localhost:3000
$ yarn build
$ yarn server-start
```

## Build

The application is built using [Nuxt.js](https://nuxtjs.org) and is served through [Express](https://expressjs.com).

### Building the application

The application has to be built before deployment. The environment variables are embedded into this build, so if building manually, you need a `.env` file that contains the required environment variables for the environmant (non-prod or prod) that you are building for.

The following command builds the application, after which the application can be deployed:

```bash
$ yarn build-gen
```

### Deploying

To deploy the application into Azure, zip up the following files and directories:

* /node_modules/
* /dist/
* index.js

### Running

When deployed the application will be served through the following command:

```bash
$ yarn server-start
```

Or by running `index.js`, which is what the above command does.

## Content

The content for the applicaiton is handled through a connection to the Azure file storage. The application will use the following environment variables to connect to the file storage:

- `SMB_SHARE_NAME`
- `FILE_SERVICE_SAS_URL`

These environment variables are set in the `envVars.js` file. The `envVars.js` file is generated by the `build-env-vars` command. This command is run automatically by the GitHub pipeline when building the application.

When running the application locally, without environment variables, the application will use static data. This is ok to use for development but should not be used in production.
