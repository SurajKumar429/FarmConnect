# FarmConnect Architecture Diagram

## System Architecture Overview

```mermaid
graph TB
    subgraph "Client Layer - React.js"
        A[User Browser] --> B[React App<br/>Port 3000]
        B --> C[React Router]
        C --> D[Components]
        D --> E[API Service Layer]
    end
    
    subgraph "Components"
        D1[Login/Register]
        D2[Dashboard]
        D3[Farms Management]
        D4[Marketplace]
        D5[Market Prices]
        D6[Learning Platform]
        D7[Resources Tracking]
    end
    
    subgraph "API Layer - Express.js"
        E --> F[Express Server<br/>Port 5001]
        F --> G[Middleware]
        G --> H[Route Handlers]
    end
    
    subgraph "Authentication"
        G --> G1[JWT Auth]
        G --> G2[bcryptjs]
    end
    
    subgraph "Routes"
        H --> H1[/api/auth]
        H --> H2[/api/farms]
        H --> H3[/api/crops]
        H --> H4[/api/expenses]
        H --> H5[/api/diary]
        H --> H6[/api/yield]
        H --> H7[/api/resources]
        H --> H8[/api/marketplace]
        H --> H9[/api/market-prices]
        H --> H10[/api/learning]
    end
    
    subgraph "Data Layer - MySQL"
        H --> I[MySQL Database<br/>farmconnect]
        I --> I1[users]
        I --> I2[farms]
        I --> I3[crops]
        I --> I4[expenses]
        I --> I5[farm_diary]
        I --> I6[yield_records]
        I --> I7[resource_usage]
        I --> I8[marketplace_listings]
        I --> I9[market_prices]
        I --> I10[learning_resources]
        I --> I11[user_learning_progress]
    end
    
    style A fill:#e1f5ff
    style B fill:#61dafb
    style F fill:#90EE90
    style I fill:#4479A1
    style G1 fill:#FFD700
    style G2 fill:#FFD700
```

## Component Architecture

```mermaid
graph LR
    subgraph "Frontend - React Components"
        A[App.js] --> B[Header]
        A --> C[Login]
        A --> D[Register]
        A --> E[Dashboard]
        A --> F[Farms]
        A --> G[Marketplace]
        A --> H[MarketPrices]
        A --> I[Learning]
        A --> J[Resources]
        
        F --> F1[Crop Management]
        F --> F2[Expense Tracking]
        F --> F3[Farm Diary]
        F --> F4[Yield Records]
        
        G --> G1[Browse Listings]
        G --> G2[Create Listing]
        
        J --> J1[Water Tracking]
        J --> J2[Fertilizer Tracking]
        J --> J3[Resource Summary]
    end
    
    subgraph "Services"
        K[api.js] --> K1[authAPI]
        K --> K2[farmsAPI]
        K --> K3[cropsAPI]
        K --> K4[expensesAPI]
        K --> K5[diaryAPI]
        K --> K6[yieldAPI]
        K --> K7[resourcesAPI]
        K --> K8[marketplaceAPI]
        K --> K9[marketPricesAPI]
        K --> K10[learningAPI]
    end
    
    A --> K
    
    style A fill:#61dafb
    style K fill:#FFA500
```

## Backend Architecture

```mermaid
graph TB
    subgraph "Express Server - server/index.js"
        A[Express App] --> B[CORS Middleware]
        B --> C[Body Parser]
        C --> D[Route Handlers]
    end
    
    subgraph "Route Modules"
        D --> R1[auth.js<br/>Login/Register]
        D --> R2[farms.js<br/>Farm CRUD]
        D --> R3[crops.js<br/>Crop Management]
        D --> R4[expenses.js<br/>Expense Tracking]
        D --> R5[diary.js<br/>Diary Entries]
        D --> R6[yield.js<br/>Yield Records]
        D --> R7[resources.js<br/>Resource Usage]
        D --> R8[marketplace.js<br/>Buy/Sell]
        D --> R9[marketPrices.js<br/>Price Data]
        D --> R10[learning.js<br/>E-Learning]
    end
    
    subgraph "Middleware"
        M1[authenticateToken<br/>JWT Verification]
        R2 --> M1
        R3 --> M1
        R4 --> M1
        R5 --> M1
        R6 --> M1
        R7 --> M1
        R8 --> M1
        R10 --> M1
    end
    
    subgraph "Database Connection"
        DB[db.js<br/>MySQL Connection Pool]
        R1 --> DB
        R2 --> DB
        R3 --> DB
        R4 --> DB
        R5 --> DB
        R6 --> DB
        R7 --> DB
        R8 --> DB
        R9 --> DB
        R10 --> DB
    end
    
    DB --> MySQL[(MySQL Database)]
    
    style A fill:#90EE90
    style MySQL fill:#4479A1
    style M1 fill:#FFD700
```

## Database Schema Relationships

```mermaid
erDiagram
    users ||--o{ farms : has
    farms ||--o{ crops : contains
    farms ||--o{ expenses : tracks
    farms ||--o{ farm_diary : maintains
    farms ||--o{ resource_usage : records
    crops ||--o{ yield_records : produces
    users ||--o{ marketplace_listings : creates
    users ||--o{ user_learning_progress : tracks
    learning_resources ||--o{ user_learning_progress : has
    
    users {
        int id PK
        string name
        string email UK
        string password
        string user_type
        string location
    }
    
    farms {
        int id PK
        int user_id FK
        string farm_name
        decimal area_acres
        string location
    }
    
    crops {
        int id PK
        int farm_id FK
        string crop_name
        date planting_date
        string status
    }
    
    expenses {
        int id PK
        int farm_id FK
        string expense_type
        decimal amount
        date expense_date
    }
    
    yield_records {
        int id PK
        int crop_id FK
        decimal quantity
        date harvest_date
    }
    
    marketplace_listings {
        int id PK
        int seller_id FK
        string crop_name
        decimal quantity
        decimal price_per_kg
    }
    
    learning_resources {
        int id PK
        string title
        string category
        text content
    }
```

## Data Flow Diagram

```mermaid
sequenceDiagram
    participant U as User
    participant R as React App
    participant API as API Service
    participant E as Express Server
    participant A as Auth Middleware
    participant DB as MySQL Database
    
    U->>R: Login Request
    R->>API: POST /api/auth/login
    API->>E: HTTP Request
    E->>DB: Query User
    DB-->>E: User Data
    E->>E: Verify Password
    E->>E: Generate JWT Token
    E-->>API: {token, user}
    API-->>R: Response
    R->>R: Store Token
    R-->>U: Redirect to Dashboard
    
    U->>R: View Farms
    R->>API: GET /api/farms
    API->>E: HTTP Request + Token
    E->>A: Verify Token
    A-->>E: Valid User
    E->>DB: SELECT farms WHERE user_id
    DB-->>E: Farms Data
    E-->>API: JSON Response
    API-->>R: Farms List
    R-->>U: Display Farms
```

## Technology Stack

```mermaid
graph TB
    subgraph "Frontend Stack"
        F1[React 19.2.0]
        F2[React Router DOM 6.30.1]
        F3[CSS3]
        F4[Fetch API]
    end
    
    subgraph "Backend Stack"
        B1[Node.js]
        B2[Express.js 4.18.2]
        B3[JWT Authentication]
        B4[bcryptjs 2.4.3]
        B5[CORS]
    end
    
    subgraph "Database Stack"
        D1[MySQL]
        D2[mysql2 3.6.5]
        D3[Connection Pooling]
    end
    
    subgraph "Development Tools"
        T1[react-scripts]
        T2[nodemon]
        T3[dotenv]
    end
    
    style F1 fill:#61dafb
    style B2 fill:#90EE90
    style D1 fill:#4479A1
```

## Security Architecture

```mermaid
graph TB
    A[User Request] --> B{Has Token?}
    B -->|No| C[Login/Register]
    B -->|Yes| D[Verify JWT]
    D -->|Invalid| E[401 Unauthorized]
    D -->|Valid| F[Extract User Info]
    F --> G[Check Resource Ownership]
    G -->|Own Resource| H[Allow Access]
    G -->|Not Own Resource| I[403 Forbidden]
    
    C --> J[Hash Password<br/>bcryptjs]
    J --> K[Create JWT Token]
    K --> L[Return Token]
    
    style D fill:#FFD700
    style J fill:#FF6B6B
    style K fill:#4ECDC4
```

## Feature Modules

```mermaid
mindmap
  root((FarmConnect))
    Authentication
      Login
      Register
      JWT Tokens
      Password Hashing
    Farm Management
      Farm Registration
      Crop Tracking
      Expense Management
      Farm Diary
      Yield Records
    Marketplace
      Buy/Sell Listings
      Price Comparison
      Market Analytics
    Sustainability
      Resource Tracking
      Water Usage
      Fertilizer Tracking
      Usage Summaries
    E-Learning
      Learning Resources
      Progress Tracking
      Categories
      Content Types
```

## Deployment Architecture (Future)

```mermaid
graph TB
    subgraph "Client Deployment"
        CDN[CDN/Static Hosting]
        SPA[React Build]
    end
    
    subgraph "Server Deployment"
        LB[Load Balancer]
        S1[Express Server 1]
        S2[Express Server 2]
        S3[Express Server N]
    end
    
    subgraph "Database Cluster"
        DB1[MySQL Primary]
        DB2[MySQL Replica 1]
        DB3[MySQL Replica 2]
    end
    
    CDN --> SPA
    Users --> CDN
    Users --> LB
    LB --> S1
    LB --> S2
    LB --> S3
    S1 --> DB1
    S2 --> DB1
    S3 --> DB1
    DB1 --> DB2
    DB1 --> DB3
    
    style CDN fill:#61dafb
    style LB fill:#90EE90
    style DB1 fill:#4479A1
```

---

## Architecture Notes

### Frontend Architecture
- **Framework**: React.js with functional components and hooks
- **Routing**: React Router DOM for client-side routing
- **State Management**: React useState and useEffect hooks
- **API Communication**: Centralized API service layer
- **Styling**: CSS3 with modern gradients and responsive design

### Backend Architecture
- **Framework**: Express.js RESTful API
- **Authentication**: JWT-based with bcrypt password hashing
- **Middleware**: CORS, body-parser, custom auth middleware
- **Database**: MySQL with connection pooling
- **Error Handling**: Try-catch blocks with error responses

### Database Architecture
- **RDBMS**: MySQL
- **Connection**: Connection pooling for efficiency
- **Relationships**: Foreign key constraints for data integrity
- **Indexing**: Primary keys and unique constraints

### Security Features
- **Password Security**: bcryptjs hashing (10 rounds)
- **Token Security**: JWT with expiration (7 days)
- **Route Protection**: Authentication middleware
- **Data Validation**: Input validation on both client and server
- **CORS**: Configured for cross-origin requests

### Scalability Considerations
- Connection pooling for database efficiency
- Stateless API design for horizontal scaling
- Modular component architecture
- Separation of concerns (routes, middleware, services)

---

**Note**: These diagrams are in Mermaid format. They can be viewed in:
- GitHub (renders automatically)
- VS Code (with Mermaid extension)
- Online Mermaid editors (https://mermaid.live)
- Documentation tools that support Mermaid

