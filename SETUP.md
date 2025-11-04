# FarmConnect Setup Guide

## Quick Start

### Step 1: Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### Step 2: Configure Database

1. Make sure MySQL is running
2. Create a `.env` file in the root directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=farmconnect
JWT_SECRET=your_random_secret_key_here_make_it_long_and_random
PORT=5000
```

3. Set up the database:

```bash
# Option 1: Using MySQL command line
mysql -u root -p < database/schema.sql

# Option 2: Using MySQL shell
mysql -u root -p
# Then run:
source database/schema.sql;
```

4. (Optional) Add sample data:

```bash
mysql -u root -p < database/seed.sql
```

### Step 3: Start the Application

**Terminal 1 - Backend:**
```bash
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

### Step 4: Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Troubleshooting

### Database Connection Issues

1. Check MySQL is running: `mysql -u root -p`
2. Verify `.env` file has correct credentials
3. Check database exists: `SHOW DATABASES;`
4. Verify tables: `USE farmconnect; SHOW TABLES;`

### Port Already in Use

If port 5000 is in use, change `PORT` in `.env` file.
If port 3000 is in use, React will prompt to use a different port.

### Module Not Found Errors

Run `npm install` in both root and client directories.

### CORS Issues

Make sure backend is running before starting frontend.

## Testing the Application

1. Register a new account
2. Create a farm
3. Add crops
4. Record expenses
5. Add diary entries
6. Browse marketplace
7. Check market prices
8. Explore learning resources
9. Track resource usage

## Default Test Credentials

After setup, you'll need to register a new account. Use:
- Email: your-email@example.com
- Password: (choose a strong password)
- User Type: Farmer or Buyer

## Next Steps

- Customize the UI colors and branding
- Add more learning resources
- Integrate real market price APIs
- Add more advanced features

## Support

For issues, check:
1. MySQL is running
2. `.env` file is configured correctly
3. All dependencies are installed
4. Ports are available

