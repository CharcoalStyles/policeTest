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

The build and generated static site will be in the `/dist` directory.

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Content

There is currently no content management system integration. Any content not powered by the JSON files in the `/data` directory should be updated manually in-code.

## Updating existing data

JSON files in the `/data` directory exist for the following data:

- Roles
- Capabilities
- Skills
- Resources
- Steps (Question form flow)
- Capability Names (Map capability codes to full names)
- Colours (Role Explorer Job Function Grouping)

This information can be updated but the existing data structure must be observed. Any changes in structure will require code changes.

## Importing new data from PSC

Import scripts for **roles**, **resources**, **capabilities** and **skills** can be found in the `/importers` directory. These scripts convert csv files into json while also normalising and reformatting the data.

These import scripts have dependencies of their own which you must be installed before you can run them. Ensure you are in the directory of the script you wish to use and then do the following.

```bash
# install dependencies
$ yarn install
```

Copy the .csv file into the importer directory and the run the following command.

```bash
# import data
$ yarn run import filename.csv # The filename of the file you are importing from
```

The generated JSON file can then be moved into the `/data` directory, overwriting the existing JSON file.

You must then redeploy the project to push them newly generated JSON files into production.

_Note: Import scripts do not run any validation against the csv columns or cells so you must manually check the data after performing an import._
