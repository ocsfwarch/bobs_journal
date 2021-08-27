# Bob's Journal

This purpose of this app is to allow the user the ability to create, read, update, and delete journal entries.

## Description

Bob's Journal displays user entries in a chronological order, with the most recent entries at the top of the display. The journal entries are stored in the user's system local storage, so they will be available when the user access the application.

## Application Image

# Technical Requirements

1. Project should be a React SPA.
2. Use create-react-app to instantiate this project.
   a. Be sure to use Typescript with strict mode enabled.
3. Use Material UI (https://material-ui.com/) components where applicable, for clean styling.
4. Use local storage to persist app data.
5. Be sure to use Promises & async/await instead of callbacks.
6. Use functional react hook components instead of class based components.
7. We are looking for efficient and clean code that could easily be picked up by another
   developer.
8. Use git to submit this project. Submit by sending a URL for which a user can run the
   following to get your project running locally:

## Testing

- Testing is performed on each of the components. Each of the component tests verifies the ability of the component to render and that each of the main sub-components are displayed. All the test files are contained in the `__test__` folder.

| Module used for testing   | Version |
| ------------------------- | ------- |
| @testing-library/jest-dom | ^5.14.1 |
| @testing-library/react    | ^11.2.7 |
