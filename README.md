# _Doctor Lookup_

#### By **Theary Im** 03/29/19

### Description

_This is a web application that provides an API calls to search for doctor information using the BetterDoctor API in Portland area. Users can search for doctors by specialty or name._

## Specs
    1. The website does an API call to retrieve the JSON object data from the server in the Portland area.

    2. A user can enter a medical issue to receive a list of doctors in the Portland area that fit the search query.
    _Example Input:_
      A user enters their medical issues
    _Example Output:_
      The application displays a list of doctors that fits the search query.

    3. A user can enter a name to receive a list of doctors in the Portland area that fit the search query.
    _Example Input:_
      A user enters the name of a doctor
    _Example Output:_
      The application displays a list of doctors that fits the search query.

    4. The user can view the list of specialties and information for all doctors.
    _Example Input:_
      A user selects a doctor
    _Example Output:_
      The application displays a list of information about each doctor: first name, last name, address, phone number, website and whether or not the doctor is accepting new patients.
      
    5. Application will notify the user if there's not response that fits the search query.
    _Example Input:_
      A user inputs a search that does not match any doctors
    _Example Output:_
      The application displays a message that no result meet the search criteria.

## Setup/Installation Requirements

Requirements Software

_Node.js is required for the npm commands to run. Must have Node.js installed. No servers are required for the running of this application._

1. Clone this repository: $ git clone https://github.com/Thearyim/doctor-lookup_
2. Navigate to root project directory in the terminal._
3. Input npm install into the terminal to install dependancies._
4. Create your own .env file in the root folder and initialize a new API Key variable with "exports.apiKey = KEYGOESHERE"._
5. Input npm run build to build the application._
6. Input npm run start to start the application._

## Known Bugs

_No known bugs._

## Support and contact details

thearyim@gmail.com

## Technologies Used

_HTML, CSS, Bootstrap, Javascript, JQuery, Javascript WebPack, Node Package Manager, BetterDoctor API_

### License

*MIT License*

Copyright (c) 2019 **_Theary Im_**
