const config = {
  connection: process.env.QUEUE_CONNECTION || 'sqs',
  callbackUrl: process.env.QUEUE_CALLBACK_URL,
  sqs: {
    driver: 'sqs',
    queueUrl: process.env.QUEUE_URL,
    region: process.env.AWS_SQS_REGION || 'ap-south-1',
    apiVersion: process.env.AWS_SQS_API_VERSION || '2012-11-05'
  }
};

export default config;
