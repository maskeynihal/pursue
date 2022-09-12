import config from "../../config/jobs.config";

interface MessageCommand {
  scope: string;
  data: unknown;
  label?: string;
}

export const generateSqsMessageCommand = ({
  scope,
  data,
  label,
}: MessageCommand) => {
  return {
    MessageAttributes: {
      scope: {
        DataType: "String",
        StringValue: scope,
      },
      data: {
        DataType: "String",
        StringValue: JSON.stringify(data),
      },
      destination: {
        DataType: "String",
        StringValue: config.callbackUrl,
      },
    },
    MessageBody: label || scope,
    QueueUrl: config.sqs.queueUrl,
  };
};
