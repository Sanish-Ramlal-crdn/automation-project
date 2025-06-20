## Assignment 1: Web UI Testing
<p align="center"><a href="#project-description">Project Description</a> - <a href="#key-features">Key Features</a> - <a href="#how-to-run">How To Run</a></p>

<img src="https://repolaunch.vercel.app/assets/img/yt.webp" alt="" align="center" width="auto" height="auto">

## Project Description

The goal of this assignment is to develop a functional end-to-end (E2E) flows for Practice Software Testing while designing a scalable test automation framework using Playwright

## Key Features
This project mainly uses:

*   **Page Object Model (POM)**: To separate reusable page classes.
*   **Cross-Browser testing**: All the tests run on Chrome, FireFox and Edge.
*   **Data-driven testing**: Test fixtures have been included via JSON Objects.
*   **Screenshots**: Screenshots have been included for key UI actions.
*   **Retries**: tests can be retried up to 2 times for flaky tests.
*   **Continuous Integration (CI) support**: All tests are Continuously integrated via GitHub Actions for every commit done.
*   **Reporting**: A report has already been generated in the playwright-report folder of the project which shows all the test results

## UI Test Scenarios

The following scenarios have been tested


## How to Run
Install Node and npm from https://nodejs.org/en/download/

Ensure that typescript is installed on your machine
TypeScript
```javascript
npm install -g typescript
```

Once you have installed TypeScript, open the project and install Playwright if it's not already installed by running the below command in the project's root
Playwright
```javascript
npm init playwright@latest
```

Now, you can run all the tests at once by typing this command on the terminal of your code editor
All Tests
```javascript
npx playwright test
```

Or you can choose which test file to run
Select test
```javascript
npx playwright test ./tests/ui/[test_file_name]
```

You can also select the browser on which to run the tests. For example
Chromium
```javascript
npx playwright test --project=chromium
```

And you can also choose to activate headed mode
Chromium
```javascript
npx playwright test --headed
```