import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// Replace these variables with your actual values
const connectInstanceId = "929671d3-1cef-4413-aa40-e23eee52e79b";

// Create a Kinesis Stream
const kinesisStream = new aws.kinesis.Stream("myKinesisStream", {
  streamModeDetails: {
    streamMode: "ON_DEMAND",
  },
});

const instanceStorageConfig = new aws.connect.InstanceStorageConfig(
  "instanceStorageConfig",
  {
    instanceId: connectInstanceId,
    resourceType: "REAL_TIME_CONTACT_ANALYSIS_CHAT_SEGMENTS",
    storageConfig: {
      storageType: "KINESIS_STREAM",
      kinesisStreamConfig: {
        streamArn: kinesisStream.arn,
      },
    },
  }
);

// Export the storage config ID
export const storageConfigId = instanceStorageConfig.id;
