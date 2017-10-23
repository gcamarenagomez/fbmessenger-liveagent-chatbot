Facebook Messenger Chatbot and Live Agent Integration Demo
------------------

Sample app for demonstrating the integration between Salesforce Live Agent and Facebook Messenger using the Live Agent REST API that runs on Heroku and uses the nForce file to get data from Salesforce.  Check out a demo:

This app is built with Node.js so you can easily run it locally and on Heroku.

### Step 1: Create Connected App on Salesforce
If you haven't already done so, follow the steps below to create a Salesforce connected app:

1. In Salesforce Setup, type **Apps** in the quick find box, and click the **Apps** link

1. In the **Connected Apps** section, click **New**, and define the Connected App as follows:

    - Connected App Name: MyConnectedApp (or any name you want)
    - API Name: MyConnectedApp
    - Contact Email: enter your email address
    - Enabled OAuth Settings: Checked
    - Callback URL: http://localhost:8200/oauthcallback.html (You'll change this later)
    - Selected OAuth Scopes: Full Access (full)
    - Click **Save**

### Step 2: Deploy the Messenger Bot

1. Make sure you are logged in to the [Heroku Dashboard](https://dashboard.heroku.com/)
1. Click the button below to deploy the Messenger bot on Heroku:
[![Deploy on Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/gcamarenagomez/fbmessenger-liveagent-chatbot)
1. Fill in the config variables as described.

    - Leave **FB_PAGE_TOKEN** blank for now
    - For **FB_VERIFY_TOKEN**, enter a passphrase of your choice. You'll have to enter the same passphrase when you create the webhook in Facebook.
    - For **SF_CLIENT_ID**, enter the Consumer Key of your Salesforce Connected App
    - For **SF_CLIENT_SECRET**, enter the Consumer Secret of your Salesforce Connected App
    - For **SF_USER_NAME**, enter the the username of your Salesforce integration user
    - For **SF_PASSWORD**, enter the the username of your Salesforce integration user
    - For **LIVE_AGENT_DEPLOYMENT**, enter the ID of your Live Agent Deployment in Salesforce
    - For **LIVE_AGENT_BUTTON**, enter the ID of your Live Agent Button
    - For **LIVE_AGENT_LANGUAGE**, enter the Locale Code of your chat: i.e. es-MX, en-US
    - For **ORG_ID**, enter your Salesforce Org ID (Starts with 00D)
    - For **SCREEN_RES**, your current screen resolution i.e. 2560x1440

### Step 4: Create a Facebook App

1. Follow [these instructions](https://developers.facebook.com/docs/messenger-platform/quickstart) to create a Facebook app. You'll have to create a Facebook page, a Facebook application, and configure Messenger for your application.

    - When asked for a **Callback URL**, enter the URL of the Heroku app you just deployed followed by /webhook. For example:
        ```
        https://myapp.herokuapp.com/webhook
        ```
    - When the Page Access Token is generated, login to the Heroku Dashboard, and set the Heroku **FB_PAGE_TOKEN** config variable to the value of that token (**Setting>Reveal Config Vars**)
    - When asked for the **Verify Token**, enter the value you entered for the **FB_VERIFY_TOKEN** config variable when you deployed the Heroku app.
    - Make sure you select a page in the **Select a page to subscribe your webhook...** dropdown
    
1. Visit the Facebook page you created in the previous step, and click the **Message** button. Type **help** in the chat bot. You can continue the conversation with the bot in the Messenger app on your phone or in the browser (http://messenger.com).
