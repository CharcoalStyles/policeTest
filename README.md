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

### Required Environmnet Variables

The following environment variables are required to be present to be embedded into this build. If you're building manually, a `.env` file that contains the required environment variables for the environment (non-prod or prod) that you are building for is required and will be read by the build process.

- `AI_CONNECTION_STRING`

### Building the application

The following command builds the application, which will be available in the `dist` directory.

```bash
$ yarn build-gen
```

### Prepare the application for deployment

To prepare the application for deployment, you need to follow these steps:

1. Copy the `dist` directory to the `deployer` directory
2. In the `deployer` directory, run `yarn`
3. Zip the contents of the `deployer` directory

The resulting zip file will be used to deploy the application into Azure.

### Running

When deployed the application will be served by running `index.js`.

## Content

The content for the application is handled through a connection to the Azure file storage. The application will use the following environment variables to connect to the file storage:

- `SMB_SHARE_NAME`
- `FILE_SERVICE_SAS_URL`

These environment variables wil be injected into the application at build time through environment variables. 

When running the application locally, without environment variables, the application will use static data. This is ok to use for development but should not be used in production.

## Analytics

Analytics are tracked using [Azure Application Insights](https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview). The application uses the following environment variables to connect to the application insights:

- `AI_CONNECTION_STRING`

These environment variables wil be injected into the application at build time through environment variables. 

When running the application locally, without environment variables, the application will log any calls to the analytics API to the console. This is ok to use for development but should not be used in production.