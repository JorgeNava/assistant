# assistant

SOE - Service Orchestration Engine

User sends message to SOE through Whatsapp
SOE request AI to identify user intent
Intent is retrieved to SOE
SOE handles intent and contacts other service
Retreives answer to whatsapp

Services to support:

- WhatsApp Cloud API
- Mongo databases management

Integration of services could be handled as microservices

ENV vars:
PORT
WHATSAPP_VERIFY_TOKEN
WHATSAPP_TOKEN
WHATSAPP_RECIPIENT_PHONE

## AWS Elastic Beanstalk
Environment details for: assistant-dev
  Application name: assistant
  Region: us-east-1
  Deployed Version: app-5ac4-240221_113033782602
  Environment ID: e-eya9j8adnj
  Platform: arn:aws:elasticbeanstalk:us-east-1::platform/Node.js 20 running on 64bit Amazon Linux 2023/6.1.0
  Tier: WebServer-Standard-1.0
  CNAME: assistant-dev.us-east-1.elasticbeanstalk.com
  Updated: 2024-02-21 17:30:46.975000+00:00