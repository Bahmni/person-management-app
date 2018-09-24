# person-management-app [![Build Status](https://travis-ci.com/Bahmni/person-management-app.svg?branch=master)](https://travis-ci.com/Bahmni/person-management-app)

## Description

The Person management app is a standalone Create-React-App that allows for registration of persons and will be used with [Bahmni](https://github.com/Bahmni).

## Motivation

Currently [Bahmni](https://github.com/Bahmni) only supports registration of patients and not persons (people that don't need medical procedures or hospital appointements.

Person registration is needed for pre-screening appointements or household surveys.

## Installation

Clone the repository onto your local machine.

Run **`yarn install`**
Run **`yarn start`**

Create or add to your .env file 'REACT_APP_URL =' "insert your path to Bahmni"
example : https://demo.mybahmni.org/openmrs/ws/rest/v1/person

Changes to your installation of Bahmni maybe required for CORS request.

To enable CORS request you will need to adapt the apache http server configuration in your vagrant setup. You can do so by:

- starting the VM
  - **`vagrant up`**
- login
  - **`vagrant ssh`**
- configure the apache server (sorry but the editor installed is vi, some basic vi commands)
  - **`sudo vi /opt/bahmni-web/etc/httpd.conf`**
- search for Header via typing /Header, go into the insert mode with i and paste the following
  `* Header set Access-Control-Allow-Origin "http://localhost:3000" * Header set Access-Control-Allow-Credentials true * Header set Access-Control-Allow-Methods "POST, GET, OPTIONS, DELETE" * Header set Access-Control-Max-Age "1000" * Header set Access-Control-Allow-Headers "Content-Type, Cookie, origin, accept"`
- write and exit using :x

- Reload the apache server configuration
  - **`sudo service httpd reload`**

The app should be accessible on: http://localhost:3000/

## Tests

Tests will be written with Jest and Enzyme

Jest is installed by default, but you will need to install Enzyme along with an Adapter corresponding to the version of React you are using.

Run **`yarn install`**

To run the tests:
Run **`yarn test`**
