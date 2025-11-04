# FarmConnect - Digital Agriculture Platform

## NIIS Hackathon 2025 Entry

A comprehensive digital agriculture platform that addresses multiple challenges in farming through software-based solutions.

## Features

### 🏡 Farm Management (Track D)
- **Farm Registration**: Create and manage multiple farms
- **Crop Tracking**: Record crop details, planting dates, and harvest schedules
- **Expense Management**: Track all farm expenses (seeds, fertilizer, labor, etc.)
- **Farm Diary**: Digital diary for daily activities and weather notes
- **Yield Records**: Track harvest quantities and quality ratings

### 💰 Smart Supply Chain & Market Access (Track B)
- **Marketplace**: Buy and sell produce directly with buyers
- **Market Price Comparison**: Compare prices across different mandis
- **Price Analytics**: View price trends and ranges for different crops

### 🌱 Sustainability & Resource Management (Track C)
- **Resource Tracking**: Monitor water, fertilizer, pesticide, and electricity usage
- **Resource Summaries**: View aggregated usage statistics
- **Sustainability Metrics**: Track resource efficiency

### 📚 E-Learning Platform (Track E)
- **Knowledge Resources**: Access articles, videos, tutorials, and guides
- **Learning Progress**: Track progress through courses
- **Categorized Content**: Filter by category (Crop Management, Soil Health, etc.)
- **Offline-Ready**: Content structure supports offline access

### 👥 User Management
- **Authentication**: Secure login and registration
- **User Types**: Support for farmers and buyers
- **Profile Management**: User profiles with location and contact info

## Tech Stack

- **Frontend**: React.js, HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)

## Project Structure

```
FarmerProject/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── services/      # API service layer
│   │   └── App.js         # Main app component
│   └── package.json
├── server/                 # Node.js backend
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   ├── config/            # Database config
│   └── index.js           # Server entry point
├── database/
│   └── schema.sql         # MySQL database schema
└── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL (already installed as per requirements)
- npm or yarn

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### 2. Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Run the schema file
mysql -u root -p < database/schema.sql
```

Or manually:
```sql
SOURCE database/schema.sql;
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=farmconnect
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

### 4. Run the Application

**Terminal 1 - Backend Server:**
```bash
npm start
# or for development with auto-reload
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### 5. Seed Sample Data (Optional)

You can add sample data directly through the application UI or use SQL:

```sql
-- Sample market prices
INSERT INTO market_prices (crop_name, mandi_name, price_per_kg, price_date, location) VALUES
('Rice', 'Delhi Mandi', 25.50, CURDATE(), 'Delhi'),
('Wheat', 'Mumbai Mandi', 22.00, CURDATE(), 'Mumbai'),
('Potato', 'Delhi Mandi', 15.00, CURDATE(), 'Delhi');

-- Sample learning resources
INSERT INTO learning_resources (title, category, content_type, content, tags) VALUES
('Introduction to Organic Farming', 'Organic Farming', 'article', 'Organic farming is a method that relies on natural processes...', 'organic, sustainable'),
('Water Management Techniques', 'Water Management', 'guide', 'Efficient water management is crucial for sustainable agriculture...', 'water, irrigation');
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Farms
- `GET /api/farms` - Get user's farms
- `POST /api/farms` - Create new farm
- `GET /api/farms/:id` - Get farm details

### Crops
- `GET /api/crops/farm/:farmId` - Get crops for a farm
- `POST /api/crops` - Add new crop

### Expenses
- `GET /api/expenses/farm/:farmId` - Get expenses for a farm
- `POST /api/expenses` - Add expense
- `GET /api/expenses/summary/farm/:farmId` - Get expense summary

### Marketplace
- `GET /api/marketplace` - Get all listings
- `GET /api/marketplace/my-listings` - Get user's listings
- `POST /api/marketplace` - Create listing

### Market Prices
- `GET /api/market-prices` - Get market prices (with filters)

### Learning
- `GET /api/learning` - Get learning resources
- `GET /api/learning/:id` - Get specific resource
- `GET /api/learning/progress/my-progress` - Get user progress
- `POST /api/learning/progress` - Update progress

### Resources
- `GET /api/resources/farm/:farmId` - Get resource usage
- `POST /api/resources` - Record resource usage
- `GET /api/resources/summary/farm/:farmId` - Get resource summary

## Usage Guide

1. **Register/Login**: Create an account or login
2. **Create Farm**: Add your first farm with details
3. **Add Crops**: Record crops you're growing
4. **Track Expenses**: Log all farm-related expenses
5. **Record Diary**: Keep daily notes about farm activities
6. **Marketplace**: List your produce for sale or browse available products
7. **Market Prices**: Compare prices before selling
8. **Resource Tracking**: Monitor water, fertilizer, and other resource usage
9. **Learning**: Access educational resources and track your progress

## Features by Hackathon Track

### Track A: Code for Change
- Digital literacy through intuitive UI
- Accessible platform for rural farmers
- Local language support structure

### Track B: Smart Supply Chain & Market Access
- Marketplace for buyer-seller connections
- Market price comparison across mandis
- Price analytics and trends

### Track C: Sustainability & Resource Management
- Resource usage tracking (water, fertilizer, etc.)
- Resource efficiency summaries
- Sustainability metrics

### Track D: Digital Tools for Farm Management
- Complete farm management system
- Expense tracking
- Farm diary
- Yield records

### Track E: E-Learning and Knowledge Empowerment
- Learning resource library
- Progress tracking
- Categorized content
- Multiple content types (articles, videos, tutorials)

## Contributing

This is a hackathon project. For improvements:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - Created for NIIS Hackathon 2025

## Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ for the farming community**

