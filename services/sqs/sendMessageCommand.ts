import config from "../../config/jobs.config";

interface MessageCommand {
  scope: string;
  data: unknown;
  label?: string;
}

const generateMessageCommand = ({ scope, data, label }: MessageCommand) => {
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

export default generateMessageCommand;
