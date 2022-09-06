import { SendMessageCommand } from "@aws-sdk/client-sqs";

import client from "./sqs/client";
import generateMessageCommand from "./sqs/sendMessageCommand";

interface AddToQueueParams {
  scope: string;
  data: unknown;
  label?: string;
}

/**
 * Send a message to the SQS queue.
 */
export async function add({ scope, data, label }: AddToQueueParams) {
  const params = generateMessageCommand({ scope, data, label });

  return await client.send(new SendMessageCommand(params));
}
