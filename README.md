# JWT Authentication Example

This project demonstrates JWT (JSON Web Token) authentication in a React application with a Node.js backend. It includes user registration, login, and a protected route that requires authentication.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repository.git


   Install dependencies:

   cd your-repository
    npm install

    Start the development server:

    npm start

  This project uses JWT for user authentication. The authentication flow involves:
##
User registration , 
User login , 
Token generation on successful login , 
Token storage using HTTP cookies , 
Protected route that requires a valid JWT for access

##  Known Issue: Cookie Problem

#### Users have reported an issue where the JWT cookie is not appearing in the "Application" tab of the browser's developer tools. The cause of this issue needs investigation and resolution

## Contributing

#### Feel free to contribute to this project by forking the repository, fixing the cookie problem, and submitting a pull request. Your contributions are highly appreciated!

###  How to Contribute

1. Fork the repository.
2. Create a new branch for your changes:

     ```
      git checkout -b fix-cookie-issue

3. Make your changes and commit them:

     ```
     git commit -am "Fix JWT cookie issue"

4. Push your changes to your fork:

    ```
    git push origin fix-cookie-issue`

5. Create a pull request against the main branch.    





