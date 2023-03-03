# assistant

User sends message to SOE through Whatsapp
SOE request AI to identify user intent
Intent is retrieved to SOE
SOE handles intent and contacts other service
Retreives answer to whatsapp

Services to support:

- Mongo databases management

SOE - Service Orchestration Engine

Infrastrcuture:

- Twilio: Connects user whatsapp with a Whatsapp sandbox that receives its messages.

Integration of services could be handled as microservices
Using (ngrok http 8080) to create a public url to which the Twilio webhook will send the request.

ENV vars:
VERIFY_TOKEN - WHATSAPP_TOKEN - PORT
