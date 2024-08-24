# Pulse Design Assignment

This project is a basic setup to aggregate customer data from Slack, Jira, and Zendesk, converting this data into actionable insights using Node.js.

## Features
- Fetch messages from Slack.
- Fetch tickets from Jira.
- Fetch requests from Zendesk.
- Aggregate the fetched data and display it in a UI screen.

## Prerequisites
- Node.js installed on your machine.
- API tokens for Slack, Jira, and Zendesk.

## Setup
1. Clone the repository.
2. Navigate to the project directory.
3. Install the dependencies:
   ```
   npm install axios
   ```
4. Create a `.env` file in the root of the project and add your API tokens.

## Running the Project
To view the UI, open the `ui/index.html` file in your browser.

To fetch and aggregate the data, run the following command:
```
node index.js
```



