# AWS Cost Alert

## How to deploy

 1. Configure Slack client on [AWS Chatbot](https://us-east-2.console.aws.amazon.com/chatbot/home) (manually)

 2. Create context.json and configure

    - chatbot.slackWorkspaceId : Workspace ID created on AWS Chatbot
    - chatbot.slackChannelConfigurationName : Name of channel configuration to create
    - chatbot.slackChannelId : Slack Channel ID to notify
    - mailAddresses : Email addresses to send summaries

 3. Prepare

    ```shell
    npm install -g cdk
    npm install
    cdk bootstrap
    ```

 4. Deploy stack

    ```shell
    cdk deploy
    ```
