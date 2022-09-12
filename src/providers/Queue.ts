import { SendMessageCommand } from "@aws-sdk/client-sqs";

import client from "../services/sqs/client";
import { generateSqsMessageCommand } from "../services/sqs/command";

interface AddToQueueParams {
  scope: string;
  data: unknown;
  label?: string;
}

class Queue {
  static async add({ scope, data, label }: AddToQueueParams) {
    const command = generateSqsMessageCommand({ scope, data, label });

    return await client.send(new SendMessageCommand(command));
  }
}

export default Queue;
