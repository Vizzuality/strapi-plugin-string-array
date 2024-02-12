# Strapi string array plugin

This [Strapi](https://strapi.io/) plugin adds a new field type to store an array of strings.

## Installation

```sh
npm install strapi-plugin-string-array

# OR

yarn add strapi-plugin-string-array
```

## Setup and configuration

This plugin adds a [custom field type](https://docs.strapi.io/dev-docs/custom-fields) to your Strapi setup.

When adding a new field to a content type, select `String Array` from the list of available field types in the "Custom"
tab.

You'll be able to specify the separator to use when inputing data in the Strapi admin panel. If none is specified, a
comma is used by default.

## Usage

Once created, can be used like a regular text field. However, you can use the above defined separator to separate
multiple values within the field. The data is stored as a string (for db engine compatibility) and is automatically
converted to an array when served through the REST API.
