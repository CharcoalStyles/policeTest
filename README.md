# Procurement Career Pathways Tool

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production
$ yarn build
$ yarn generate
```

When building the site ensure the correct Google Analytics code has been included in the `/nuxt.config.js` file.

```javascript
googleAnalytics: {
  id: 'UA-188748344-1' // Production site http://digitalcareerpathways.psc.nsw.gov.au
},
```

The build and generated static site will be in the `/dist` directory. An automated CI pipeline is not yet added for automatic deployment to the production Azure environment. The files within the `/dist` directory must be zipped and sent to [Chris Mace](mailto:Chris.Mace@psc.nsw.gov.au) for transfer to Azure.

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Content

There is currently now content management system integration. Any content not powered by the JSON files in the `/data` directory should be updated manually in-code.

## Updating existing data

JSON files in the `/data` directory exist for the following data:

- Capabilities
- Colours (Role Explorer Job Function Grouping)
- Resources
- Roles
- Skills
- Steps (Question form flow)

This information can be updated but the existing data structure must be observed. Any changes in structure will require code changes.

## Importing new data from PSC

Import scripts for both **roles** and **upskilling resources** can be found in the `/importers` directory. These scripts convert csv files into json while also normalising and reformatting the data.

These import scripts had dependencies of their which you must install first. Ensure you are in the directory of the script you wish to use and then do the following.

```bash
# install dependencies
$ yarn install
```

Copy the .csv file into the importer directory and the run the following command.

```bash
# import data
$ yarn run import filename.csv # The filename of the file you are importing from
```

The generated JSON file can then be moved into the `/data` directory, overwriting the existing.
