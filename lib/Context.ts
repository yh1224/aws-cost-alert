import * as cdk from "aws-cdk-lib";
import * as fs from "fs";

interface ChatbotContext {
    /**
     * Slack Workspace ID
     * Configure Slack client on AWS Chatbot in advance.
     */
    readonly slackWorkspaceId: string;

    /**
     * Channel Configuration name
     */
    readonly slackChannelConfigurationName: string;

    /**
     * Slack Channel ID
     */
    readonly slackChannelId: string;
}

interface Context {
    /**
     * AWS Environment
     */
    readonly env?: cdk.Environment;

    /**
     * AWS Chatbot Context
     */
    readonly chatbot: ChatbotContext;

    /**
     * Mail addresses
     */
    readonly mailAddresses: string[];
}

/**
 * Create Context.
 *
 * @param env Environment name
 */
function createContext(env?: string): Context {
    return JSON.parse(fs.readFileSync(`context${env ? `.${env}` : ""}.json`).toString());
}

export {Context, createContext}
