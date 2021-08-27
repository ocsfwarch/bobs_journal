# Bob's Journal

This purpose of this app is to allow the user the ability to create, read, and delete journal entries.

## Description

Bob's Journal displays user entries in a chronological order, with the most recent entries at the top of the display. The journal entries are stored in the user's system local storage, so they will be available when the user access the application.

## Application Image

![Landing Page](https://github.com/ocsfwarch/bobs_journal/blob/master/Project_Docs/app_image.png?raw=true)

# Technical Overview

- This application was bootstrapped using `create-react-app` with the `typescript`f template.
- The development environment included:
  - Visual Studio Code v1.46.0
  - Node v14.17.3
  - npm/npx v6.14.13
  - Typescript v4.4.2

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

## Use Case 1 - Display application to the user

- This use case starts when the user access the app through the browser.
- The system will check if the users computer supports local storage.
- The system will pull existing journal from local storage, if it is supported.
- The system will initial the application component views.
- The system will display the app navigation header.
- The system will display any existing journal entries.
- This use case ends when the app is initialized and displayed to the user.

## Use Case 2: - Create a new journal entry

- This use case starts when the user selects the `AddCircleIcon` from the navigation header.
- The `/AddJournalItem` route is invoked.
- The system displays the `Add a Journal Entry` view.
- The user selects an `Entry Date` for the entry.
- The user enters the `Entry Content`.
- The user selects the `SAVE` button.
- The system check to see if an entry for this date exists.
- The system will add the entry to the existing date.
- The system will add a new entry for the date if it does not exist.
- The system will update the current state.
- The system will save to local storage if it is available.
- The system sets a status display to the user.
- This use case ends when the system displays the status to the user.

## Use Case 3: - Delete a journal entry

- This use case starts when the user selects the `DELETE` button from an entry.
- The system checks the entry for the date exists.
- The system removes the entry from the current list of entries.
- The system updates the current state.
- The system will save to local storage if it is available.
- The system updates the journal entry display.
- The system sets a status display to the user.
- This use case ends when the system displays the status to the user.

## Testing

- Testing is performed on each of the components. Each of the component tests verifies the ability of the component to render and that each of the main sub-components are displayed. All the test files are contained in the `__test__` folder.

| Module used for testing   | Version |
| ------------------------- | ------- |
| @testing-library/jest-dom | ^5.14.1 |
| @testing-library/react    | ^11.2.7 |
