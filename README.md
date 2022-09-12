# Pursue
For events and triggers using AWS SQS.

## Environment Setup
1. `QUEUE_URL`: The url link to the queue. (SQS url)
2. `QUEUE_CALLBACK_URL`: The url that is called by queue.
3. `AWS_SQS_REGION`: Region of AWS queue
4. `AWS_SQS_API_VERSION`: SQS API version

## How to use

1. Create a object with key as name of handler and value as function that should run when the handler is called. 
   ```js
    const handlers = {
        sendEmailToBuyer: (args) => console.log(`Thank you for buying the product: ${args.productName} with us.`),
        sendEmailToSeller: (args) => console.log(`Congratulations! Your product ${args.productName} is purchased.`)
    }
   ```
2. Pass the `handler` object as argument while creating **class** [Handler](src/providers/Handler.ts)
   ```js
   import { Handler } from '@maskeynihal/pursue';
   
   // const handlers = {} define the handler function as given in step 1.

   const handlerClass = new Handler(handlers)
   ```
3. Create a event and handler mapper object. 
   ```js
   // const handlerClass = new Handler(handlers)

   const eventHandlerMapper = {
    productSold: [
        handlerClass.keys.sendEmailToBuyer,
        handlerClass.keys.sendEmailToSeller
    ]
   }
   ```
4. Pass the `eventHandlerMapper` object as argument while creating **class** [EventHandlerMapper](src/providers/EventHandlerMapper.ts)
   ```js
   import { EventHandlerMapper } from '@maskeynihal/pursue';

   // const eventHandlerMapper = {}

   const eventHandlerMapperClass = new EventHandlerMapper(eventHandlerMapper)
   ```
5. Create a new **class** [Job](src/providers/Jobs.ts) and pass the two classes [Handler](src/providers/Handler.ts) and [EventHandlerMapper](src/providers/EventHandlerMapper.ts) as argument
    ```js
    import { Job } from '@maskeynihal/pursue';

    // handlerClass
    // eventHandlerMapperClass

    const job = new Job(handlerClass, eventHandlerMapperClass);
    ```

6. Create a route file to handle the callback from the queue
    ```js
    // import the instance of job
    // import job from './job';

    // using express
    router.get('/api/queue/callback', (req, res) => {
        job.dispatch(req.body.scope, req.body.data);

        res.json({
            message: "Dispatched!"
        })
    });
    ```

### Triggering Event
> The instance of the **class** [Job](src/providers/Jobs.ts) should be exported from a file so that it's always pointing to same class (singleton). 

All the event key can be found from the instance of **class** `Job`. Event can be triggered calling the `trigger` function from instance of the class.

```js
// Get the required key
import job from './job';

const eventKey = job.events.productSold;

job.trigger(eventKey, {
    productName: "Macbook 16 inch"
});
```