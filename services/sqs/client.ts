import { SQSClient } from '@aws-sdk/client-sqs';

import config from '../../config/jobs.config';

const REGION = config.sqs.region;

const sqsClient = new SQSClient({ region: REGION });

export default sqsClient;
