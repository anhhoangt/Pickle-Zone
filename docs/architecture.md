# System Architecture

```mermaid
graph TD
    subgraph Client
        Web[Web App (React + Vite)]
        Mobile[Mobile App (React Native - Future)]
    end

    subgraph AWS_Cloud
        LB[Load Balancer]

        subgraph Compute
            API[Backend API (NestJS / Node.js)]
        end

        subgraph Data_Storage
            RDS[(PostgreSQL - AWS RDS)]
            S3[S3 Bucket (Images/Assets)]
        end

        subgraph Services
            Cognito[AWS Cognito (Auth)]
            SES[AWS SES (Email)]
        end
    end

    subgraph External
        Stripe[Stripe Payment Gateway]
    end

    Web -->|HTTPS| LB
    LB --> API
    API -->|Read/Write| RDS
    API -->|Upload/Download| S3
    API -->|Auth Tokens| Cognito
    Web -->|Auth| Cognito
    API -->|Payments| Stripe
    API -->|Emails| SES
```
