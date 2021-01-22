# ts-docker
 ts-docker is my attempt at creating a core project that I will be able to use within my projects. This core project has a Session based authentification. 
 
 # Stack
 you'll find :
 - Express - Typescript
 - Sequelize
 - PostgresQL
 - Docker
 - JWT
 
 # .ENV
 In order to run the project, you'll have to create your own .env file containing the following values :
 - PORT : port on which the application will run 
 - SALT_ROUND : number of round use for encrypting the user password
 - ACCESS_TOKEN_SECRET : secret use for encrypting the JWT token
 - SESSION_TOKEN_SECRET : secret used for encrypting the user session
 - MY_EMAIL : email with which the confirmations will be sent off
 - EMAIL_PASSWORD : used for the authentification of the email service
