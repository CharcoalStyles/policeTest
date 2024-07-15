# NSW Police Career Pathway Tool

## Local Development Set-up

The development computer needs to have the following installed:
* Git
* [NodeJS v20](https://nodejs.org/en)
* [Yarn v1](https://classic.yarnpkg.com/en/docs/install)

It is also highly recommended that you use [Visual Studio Code](https://code.visualstudio.com/) for development. It is what the project was coded in and is setup to work with the ESLint rules.

Once you have the above installed, you can clone the repository and run the following commands to get the project up and running:

1.	`git clone https://github.police.nsw.gov.au/APS/career-pathway-tool ./nswpf-cp`
2.	`cd nswpf-cp`
3.	`yarn`

To run a local development version of the application, create a new file called `.env` in the project directory. In this file, add the line `DEVELOPMENT_MODE=true`. This will set the application to load the data files from the static versions on the website, instead of the Azure File Storage. 

After that is done, enter the following command in a terminal in the project directory `yarn dev`. This will start the development server, which can be accessed in a browser through the following [http://localhost:3000/](http://localhost:3000/).

## Build

The application is built as a static site using [Nuxt.js](https://nuxtjs.org) and is served through [Express](https://expressjs.com).

### Required Environmnet Variables

The following environment variables are required to be present to be embedded into this build. If you're building manually, a `.env` file that contains the required environment variables for the environment (non-prod or prod) that you are building for is required and will be read by the build process.

- `AI_CONNECTION_STRING`

Make sure to remove or comment out the `DEVELOPMENT_MODE` environment variable in the `.env` file before building.

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