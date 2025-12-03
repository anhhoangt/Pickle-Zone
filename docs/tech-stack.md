# Technology Stack Proposal

## 1. Core Stack (Requested)
- **Language**: TypeScript (Strict mode enabled for enterprise reliability).
- **Frontend**: React.
- **Backend**: Node.js.
- **Cloud**: AWS.

## 2. Detailed Recommendations

### Backend Framework: **NestJS**
- **Why?**: While Express is popular, **NestJS** provides an out-of-the-box architecture (Modules, Controllers, Services) inspired by Angular. This enforces separation of concerns, making the codebase maintainable and scalable for an "enterprise" application. It has first-class TypeScript support.
- **Alternative**: Express.js (Too loose/unstructured for large teams/enterprise).

### Frontend Build Tool: **Vite**
- **Why?**: Significantly faster startup and HMR (Hot Module Replacement) compared to Create React App (Webpack).
- **Alternative**: Next.js. (We can use Next.js if SEO is critical, but for a pure marketplace app, a SPA with Vite is often more dynamic and easier to host cheaply on S3/CloudFront/Amplify. *However, if you prefer Next.js for SSR/SEO, let me know.*)

### UI Component Library: **Tailwind CSS + shadcn/ui**
- **Why?**:
    - **Tailwind**: Utility-first CSS allows for rapid custom designs without fighting framework overrides.
    - **shadcn/ui**: Not a component library you install as a dependency, but code you copy into your project. This gives you full control over the code. It uses Radix UI primitives for accessibility. It looks very professional and modern (Enterprise clean).
- **Alternative**: Material UI (Heavy, hard to customize), Chakra UI (Good, but runtime CSS-in-JS has performance costs).

### Database: **PostgreSQL (AWS RDS)**
- **Why?**: Marketplaces require complex relationships (Users -> Orders -> Products -> Reviews) and ACID transactions (Inventory management, Payments). SQL is superior to NoSQL (DynamoDB) for this specific use case.
- **Alternative**: DynamoDB (Good for scale, but complex for relational queries like "Find all orders for this user with products in category X").

### ORM: **Prisma**
- **Why?**: Best TypeScript integration. The type safety it provides between your DB schema and your code is unmatched, reducing runtime errors significantly.

### State Management: **TanStack Query (React Query) + Zustand**
- **Why?**:
    - **React Query**: Handles server state (fetching, caching, synchronizing data). Most "state" in a marketplace is actually server data.
    - **Zustand**: For the little bit of client state needed (e.g., UI toggles, cart open/close). It's much simpler than Redux.

### Authentication: **AWS Cognito**
- **Why?**: Secure, scalable, handles identity management so we don't have to build it from scratch. Has a generous free tier.

### Infrastructure as Code (IaC)
- **Recommendation**: **Terraform** or **AWS CDK**. For now, we will document the setup, but eventually, we should script it.
