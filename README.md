# GoodData Ember Bindings

This project aims to provide Ember bindings for the [GoodData API][1].

## General  CRUD

    GET /gdc/md/{project-id}/query/{object-type} # list all objects of a given type

    GET /gdc/md/{project-id}/obj/{object-id} # retrieve object by id

    POST /gdc/md/{project-id}/obj  # create object (of any type)

    PUT /gdc/md/{project-id}/obj/{object-id} # update object

    DELETE /gdc/md/{project-id}/obj/{object-id} # delete object


## Dependencies

    GET /gdc/md/{project-id}/usedby/{object-id}

    GET /gdc/md/{project-id}/using/{object-id}


## Projects

  A project is the basic data structure in GoodData. Almost everything else lives inside
  the context of a project.

### Attributes

  * title (string) : Project Title
  * summary (string) : Project summary
  * roles (uri) : User's role in the Project
  * ~~userPermissions (uri) : User permissions information~~
  * ~~userRoles (uri) : User roles information~~
  * ~~users (uri) : Project users information~~
  * created (date) : Date of project creation
  * updated (date) : Date of project update
  * author (uri) : Project creator account
  * ~~exportUsers (boolean) : export users from project true/false~~
  * ~~exportData (boolean) : export data from project true/false~~
  * ~~token (string) : export Token for export/import project usage~~

### API calls

    GET /gdc/account/profile/{profile-id}/projects # list all projects for this user

    GET /gdc/projects/{project-id} # retrieve a specific project

    POST /gdc/projects # creates a new project

    DELETE /gdc/projects/{project-id} # deletes a project


## Users

### Attributes

  * login (string) : User login
  * password (string) : User password
  * verifyPassword (string) : Password for verification
  * email : User's email for invitations, used as contact email
  * firstname (string) : User's firstname
  * lastname (string) : User's lastname
  * userRoles (uri) : Uri to the specific user roles
  * projectUsersUpdateResult : Give an array of successful/failed created users
  * companyName (string) : Name of user's company
  * country (string) : User's country
  * created (date) : Date of user creation
  * updated (date) : Date of user properties update
  * phoneNumber : User's phonenumber
  * position (string) : User's position in a company
  * authenticationModes (array of strings) : an optional field specifying authentication modes (SSO, PASSWORD) allowed for this user. The value of this field overrides the global settings for the domain.

### API calls

    GET /gdc/acount/domains/{organization-name}/users # list all users in domain

    POST /gdc/account/domains/{organization-name}/users # create new user in domain (requires admin rights)

    GET /gdc/projects/{project-id}/users # list all users in project

    POST /gdc/projects/{project-id}/users # add a user to a project

    GET /gdc/account/profile/current # get info about current user

    PUT /gdc/account/profile/{user-id} # update user info

    DELETE /gdc/account/profile/{user-id} # delete a user


## Reports

### Attributes

  * link (uri) : Link to specific Report
  * author (uri) : URI of Report author
  * tags : Report tags
  * created (date) : Report creation date
  * updated (date) : Report update date
  * summary (string) : Report text summary
  * report (uri) : Specific report URI
  * format : Report export format (pdf, csv, png)

### API calls

    GET /gdc/md/{project-id}/query/reports # list all reports in a given project

    POST /gdc/md/{project-id}/obj # create a report / report definition


## Dashboards

    GET /gdc/md/{project-id}/query/projectdashboards # list dashboards in a project

    GET /gdc/md/{project-id}/obj/{object-id} # retrieve dashboard contents

    POST /gdc/md/{project-id}/obj # create a new dashboard

    PUT /gdc/md/{project-id}/obj/{object-id} # update dashboard


## Mandatory user filters

    GET /gdc/md/{project-id}/query/userfilters # Get list of user filters

    POST /gdc/md/{project-id}/obj   # Create User filter

    DELETE /gdc/md/{project-id}/obj/{muf-id} # Delete a user filter


[1]: https://developer.gooddata.com/api
