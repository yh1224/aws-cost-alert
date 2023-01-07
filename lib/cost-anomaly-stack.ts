import * as cdk from "aws-cdk-lib";
import * as ce from "aws-cdk-lib/aws-ce";
import * as chatbot from "aws-cdk-lib/aws-chatbot";
import * as sns from "aws-cdk-lib/aws-sns";
import {Construct} from "constructs";
import {Context} from "./Context";

interface CostAnomalyStackProps extends cdk.StackProps {
    readonly context: Context,
}

export class CostAnomalyStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: CostAnomalyStackProps) {
        super(scope, id, props);

        const context = props.context;

        // CostAlarm Topic
        const topic = new sns.Topic(this, "CostAlarmTopic");

        // Chatbot
        const slackChannel = new chatbot.SlackChannelConfiguration(this, "SlackChannel", {
            slackWorkspaceId: context.chatbot.slackWorkspaceId,
            slackChannelConfigurationName: context.chatbot.slackChannelConfigurationName,
            slackChannelId: context.chatbot.slackChannelId,
            loggingLevel: chatbot.LoggingLevel.ERROR,
        });
        slackChannel.addNotificationTopic(topic);

        // Cost Anomaly Detection
        const cfnAnomalyMonitor = new ce.CfnAnomalyMonitor(this, "AnomalyMonitor", {
            monitorName: "AWS Services",
            monitorType: "DIMENSIONAL",
            monitorDimension: "SERVICE",

        });
        new ce.CfnAnomalySubscription(this, "ImmediateSubscription", {
            frequency: "IMMEDIATE",
            monitorArnList: [cfnAnomalyMonitor.attrMonitorArn],
            subscribers: [{
                address: topic.topicArn,
                type: "SNS",
            }],
            subscriptionName: "Anomaly Alert",
            threshold: 0,
        });
        new ce.CfnAnomalySubscription(this, "DailySubscription", {
            frequency: "DAILY",
            monitorArnList: [cfnAnomalyMonitor.attrMonitorArn],
            subscribers: context.mailAddresses.map(address => ({type: "EMAIL", address})),
            subscriptionName: "Daily Summary",
            threshold: 0,
        });
    }
}
