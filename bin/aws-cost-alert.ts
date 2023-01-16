#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import {CostAlertStack} from "../lib/cost-alert-stack";
import {createContext} from "../lib/Context";

const app = new cdk.App();
const context = createContext(app.node.tryGetContext("env") || process.env.ENV);

new CostAlertStack(app, "CostAlert", {
    env: Object.assign(context.env || {}, {region: "us-east-1"}),
    context,
});
