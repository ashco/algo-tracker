# AshCo's Algo App

This application acts as a way for me to track statistics related to the algorithm challenges I attempt. As I collect data, I will upgrade the application to better visualize it and identify trends.

## How to use this app

Posted data is publically available to all. You can view individual data posts via the list tab as well as the visualized data via the analytics tab.

Please note that only users with an `@ashco.io` email domain can sign up and will automatically be added to the Admin group. Only Admins have access to Create, Update, and Delete operations.

## Tech Stack

### Frontend

- React - Bootstrapped with Create React App
- TypeScript - Types make life better.
- Material UI - A UI framework to quickly build applications based off of Google's Material Design.
- React Hook Form - An easier way to handle form fields in React.
- React Router - Routing for React.
- AWS Amplify Datastore - Database option that interacts with backend AWS AppSync service. Enables realtime data sync + updates.

### Backend

- AWS Amplify - All you need to create a serverless backend for your app.
  - GraphQL API via AppSync - Uses DynamoDB as data source.
  - Cognito - A way to handle user authentication and authorization.
  - Lambda Functions - Triggered to ensure only whitelisted domain emails addresses can sign up. Also adds new users to Admin group.
  - CI/CD - App is hosted via AWS through a Continuous Integration work flow.
