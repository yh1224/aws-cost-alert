#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import {CostAnomalyStack} from "../lib/cost-anomaly-stack";
import {createContext} from "../lib/Context";

const app = new cdk.App();
const context = createContext(app.node.tryGetContext("env") || process.env.ENV);

new CostAnomalyStack(app, "CostAnomaly", {
    env: Object.assign({}, context.env, {region: "us-east-1"}),
    context,
});
