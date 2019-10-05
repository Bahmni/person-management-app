# person-management-app [![Build Status](https://travis-ci.com/Bahmni/person-management-app.svg?branch=master)](https://travis-ci.com/Bahmni/person-management-app)

## Description

The Person management app is a standalone [Create-React-App](https://github.com/facebook/create-react-app) that allows for registration of persons and will be used with [Bahmni](https://github.com/Bahmni).

## Motivation

Currently [Bahmni](https://github.com/Bahmni) only supports registration of patients and not persons (people that don't need medical procedures or hospital appointments.

Person registration is needed for pre-screening appointments or household surveys.

## App installation & setup

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

## Integrating the app with a Bahmni installation

### 1. Installing Bahmni on Vagrant

To install Bahmni on Vagrant, follow the instructions [here](https://bahmni.atlassian.net/wiki/spaces/BAH/pages/14712841/Bahmni+Virtual+Box).

Or follow a video tutorial [here](https://www.youtube.com/watch?v=2wi7b3cW-xg).

Make sure to follow the folder structure as outlined in the Bahmni Wiki above:

Create a folder bahmni where you would like all project related files to be present.

**`cd /Projects`**

**`mkdir bahmni`**

Clone the following projects from Github inside the newly created folder bahmni

**`cd bahmni`**

**`git clone https://github.com/Bahmni/bahmni-vagrant.git`**

### 2. Link the project source folder with the Bahmni installation

Build the app using **`yarn build`**

Link the project build to Bahmni `/var/www/bahmniapps/`, 

for example:

**`sudo ln -s /bahmni/person-management-app/build/ /var/www/bahmniapps/personregistration`**

**Make sure to change the ownership of the link to Bahmni:**

**`sudo chown -h bahmni:bahmni /var/www/bahmniapps/personregistration`**

### 3. Default config and configuring the Bahmni installation

Clone the repository Default config repository here: https://github.com/Bahmni/default-config

To create a symlink that will allow you to make changes in the Bahmni Vagrant installation go to`default-config/scripts` and 

run **`sh vagrant-link.sh`**

To add the to the existing Bahmni dashboard, you'll have to create changes in:
`default-config/offline/openmrs/apps/home/extension.json`

You will also have to create new folder, in our case `personregistration`, under `default-config/openmrs/apps/` with an `app.json` file.

## Tests

Tests will be written with Jest and Enzyme.

To run the tests:
Run **`yarn test`**
