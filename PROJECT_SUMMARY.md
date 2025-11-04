# FarmConnect - Project Summary

## Overview

FarmConnect is a comprehensive digital agriculture platform developed for NIIS Hackathon 2025. It addresses multiple challenges in agriculture through a unified software solution covering farm management, market access, sustainability tracking, and e-learning.

## Features Implemented

### ✅ Track A: Code for Change (Social Impact)
- Intuitive, user-friendly interface accessible to all literacy levels
- Digital platform for rural farmers
- Community-focused marketplace connecting farmers and buyers

### ✅ Track B: Smart Supply Chain & Market Access
- **Marketplace**: Buy and sell produce directly
- **Market Price Comparison**: Compare prices across multiple mandis
- **Price Analytics**: View price ranges and trends
- **Digital Trading**: Connect buyers and sellers

### ✅ Track C: Sustainability & Resource Management
- **Resource Tracking**: Monitor water, fertilizer, pesticide, and electricity usage
- **Usage Summaries**: Aggregate statistics by resource type
- **Sustainability Metrics**: Track resource efficiency over time
- **Environmental Impact**: Promote responsible farming practices

### ✅ Track D: Digital Tools for Farm Management
- **Farm Registration**: Create and manage multiple farms
- **Crop Management**: Track crops, planting dates, and harvest schedules
- **Expense Tracking**: Record all farm expenses (seeds, fertilizer, labor, equipment, etc.)
- **Farm Diary**: Digital diary for daily activities and weather notes
- **Yield Records**: Track harvest quantities and quality ratings
- **Financial Overview**: View expense summaries and totals

### ✅ Track E: E-Learning and Knowledge Empowerment
- **Learning Resources**: Articles, videos, tutorials, and guides
- **Progress Tracking**: Monitor learning progress with completion status
- **Categorized Content**: Filter by category (Crop Management, Soil Health, Water Management, etc.)
- **Multiple Content Types**: Support for articles, videos, tutorials, and guides
- **Offline-Ready Structure**: Content designed for future offline access

### ✅ Additional Features
- **User Authentication**: Secure login and registration with JWT
- **User Types**: Support for farmers and buyers
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Beautiful gradient design with intuitive navigation

## Technical Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MySQL**: Database
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

### Frontend
- **React.js**: UI framework
- **React Router**: Navigation
- **CSS3**: Styling with modern gradients
- **Fetch API**: HTTP requests

## Database Schema

The database includes 12 tables:
1. `users` - User accounts and authentication
2. `farms` - Farm information
3. `crops` - Crop records
4. `expenses` - Expense tracking
5. `yield_records` - Harvest records
6. `farm_diary` - Daily activity logs
7. `resource_usage` - Resource consumption tracking
8. `market_prices` - Market price data
9. `marketplace_listings` - Buy/sell listings
10. `learning_resources` - Educational content
11. `user_learning_progress` - Learning progress tracking

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Farms
- `GET /api/farms` - Get user's farms
- `POST /api/farms` - Create farm
- `GET /api/farms/:id` - Get farm details

### Crops
- `GET /api/crops/farm/:farmId` - Get farm crops
- `POST /api/crops` - Add crop

### Expenses
- `GET /api/expenses/farm/:farmId` - Get expenses
- `POST /api/expenses` - Add expense
- `GET /api/expenses/summary/farm/:farmId` - Expense summary

### Diary
- `GET /api/diary/farm/:farmId` - Get diary entries
- `POST /api/diary` - Add diary entry

### Yield
- `GET /api/yield/crop/:cropId` - Get yield records
- `POST /api/yield` - Add yield record

### Resources
- `GET /api/resources/farm/:farmId` - Get resource usage
- `POST /api/resources` - Record resource usage
- `GET /api/resources/summary/farm/:farmId` - Resource summary

### Marketplace
- `GET /api/marketplace` - Get all listings
- `GET /api/marketplace/my-listings` - Get user's listings
- `POST /api/marketplace` - Create listing

### Market Prices
- `GET /api/market-prices` - Get market prices (with filters)

### Learning
- `GET /api/learning` - Get resources
- `GET /api/learning/:id` - Get specific resource
- `GET /api/learning/progress/my-progress` - Get user progress
- `POST /api/learning/progress` - Update progress

## Project Structure

```
FarmerProject/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # All React components
│   │   │   ├── Header.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Farms.js
│   │   │   ├── Marketplace.js
│   │   │   ├── MarketPrices.js
│   │   │   ├── Learning.js
│   │   │   └── Resources.js
│   │   ├── services/       # API service layer
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
├── server/                 # Node.js backend
│   ├── routes/             # API routes
│   │   ├── auth.js
│   │   ├── farms.js
│   │   ├── crops.js
│   │   ├── expenses.js
│   │   ├── diary.js
│   │   ├── yield.js
│   │   ├── resources.js
│   │   ├── marketplace.js
│   │   ├── marketPrices.js
│   │   └── learning.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config/
│   │   └── db.js
│   └── index.js
├── database/
│   ├── schema.sql          # Database schema
│   └── seed.sql            # Sample data
├── package.json
├── README.md
├── SETUP.md
└── PROJECT_SUMMARY.md
```

## How to Run

1. **Install dependencies**: `npm install && cd client && npm install`
2. **Set up database**: Create `.env` file and run `database/schema.sql`
3. **Start backend**: `npm start` (from root)
4. **Start frontend**: `cd client && npm start`

See `SETUP.md` for detailed instructions.

## Highlights

1. **Comprehensive Solution**: Covers all 5 hackathon tracks
2. **Modern Tech Stack**: Latest React and Node.js
3. **Scalable Architecture**: Well-structured codebase
4. **User-Friendly**: Intuitive UI with beautiful design
5. **Production-Ready**: Includes authentication, error handling, and data validation
6. **Extensible**: Easy to add new features

## Future Enhancements

- Real-time market price APIs integration
- Weather data integration
- Mobile app version
- Offline mode for mobile
- Multi-language support
- Advanced analytics and reporting
- Chat/messaging system for marketplace
- Payment gateway integration
- Government scheme information system
- AI-powered crop advisory

## Contribution

This project was created for NIIS Hackathon 2025. All features are implemented and ready for demonstration.

## License

MIT License

---

**Built with ❤️ for the farming community**

