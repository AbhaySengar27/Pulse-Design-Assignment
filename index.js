const axios = require('axios');
require('dotenv').config();

// Fetch messages from Slack
async function getSlackMessages(channelId) {
  try {
    const response = await axios.get('https://slack.com/api/conversations.history', {
      headers: {
        'Authorization': `Bearer ${process.env.SLACK_API_TOKEN}`,
      },
      params: {
        channel: channelId,
        limit: 100, // Adjust as needed
      },
    });
    return response.data.messages;
  } catch (error) {
    console.error('Error fetching Slack messages:', error);
  }
}

// Fetch Jira tickets
async function getJiraTickets(projectKey) {
  try {
    const response = await axios.get(`https://your-jira-domain.atlassian.net/rest/api/3/search`, {
      headers: {
        'Authorization': `Basic ${Buffer.from('your_email:' + process.env.JIRA_API_TOKEN).toString('base64')}`,
        'Accept': 'application/json'
      },
      params: {
        jql: `project=${projectKey} ORDER BY created DESC`,
        maxResults: 50, // Adjust as needed
      },
    });
    return response.data.issues;
  } catch (error) {
    console.error('Error fetching Jira tickets:', error);
  }
}

// Fetch Zendesk tickets
async function getZendeskTickets() {
  try {
    const response = await axios.get(`https://your-zendesk-domain.zendesk.com/api/v2/tickets.json`, {
      headers: {
        'Authorization': `Basic ${Buffer.from('your_email/token:' + process.env.ZENDESK_API_TOKEN).toString('base64')}`,
      },
    });
    return response.data.tickets;
  } catch (error) {
    console.error('Error fetching Zendesk tickets:', error);
  }
}

// Aggregate data
async function aggregateData() {
  const slackMessages = await getSlackMessages(process.env.SLACK_CHANNEL_ID);
  const jiraTickets = await getJiraTickets(process.env.JIRA_PROJECT_KEY);
  const zendeskTickets = await getZendeskTickets();

  return {
    slack: slackMessages,
    jira: jiraTickets,
    zendesk: zendeskTickets,
  };
}

aggregateData().then(data => {
  console.log('Aggregated Data:', data);
}).catch(err => {
  console.error('Error during aggregation:', err);
});
