-- Sample Data for FarmConnect
-- Run this after creating the schema to populate sample data

USE farmconnect;

-- Sample Market Prices
INSERT INTO market_prices (crop_name, mandi_name, price_per_kg, price_date, location) VALUES
('Rice', 'Delhi Mandi', 25.50, CURDATE(), 'Delhi'),
('Rice', 'Mumbai Mandi', 27.00, CURDATE(), 'Mumbai'),
('Rice', 'Kolkata Mandi', 24.00, CURDATE(), 'Kolkata'),
('Wheat', 'Delhi Mandi', 22.00, CURDATE(), 'Delhi'),
('Wheat', 'Punjab Mandi', 21.50, CURDATE(), 'Punjab'),
('Potato', 'Delhi Mandi', 15.00, CURDATE(), 'Delhi'),
('Potato', 'UP Mandi', 14.50, CURDATE(), 'Uttar Pradesh'),
('Tomato', 'Mumbai Mandi', 30.00, CURDATE(), 'Mumbai'),
('Tomato', 'Delhi Mandi', 28.00, CURDATE(), 'Delhi'),
('Onion', 'Nasik Mandi', 18.00, CURDATE(), 'Maharashtra'),
('Onion', 'Delhi Mandi', 20.00, CURDATE(), 'Delhi'),
('Cotton', 'Gujarat Mandi', 65.00, CURDATE(), 'Gujarat'),
('Sugarcane', 'UP Mandi', 3.50, CURDATE(), 'Uttar Pradesh');

-- Sample Learning Resources
INSERT INTO learning_resources (title, category, content_type, content, tags, language) VALUES
('Introduction to Organic Farming', 'Organic Farming', 'article', 
'Organic farming is a method that relies on natural processes and cycles, adapted to local conditions. It combines tradition, innovation, and science to benefit the shared environment and promote fair relationships and good quality of life for all involved.

Key Principles:
1. Health: Organic agriculture should sustain and enhance the health of soil, plant, animal, human, and planet
2. Ecology: Organic agriculture should be based on living ecological systems and cycles
3. Fairness: Organic agriculture should build on relationships that ensure fairness
4. Care: Organic agriculture should be managed in a precautionary and responsible manner

Benefits:
- Better soil health
- Reduced chemical exposure
- Improved biodiversity
- Better water quality', 
'organic, sustainable, farming', 'English'),

('Water Management Techniques', 'Water Management', 'guide',
'Efficient water management is crucial for sustainable agriculture. Here are some key techniques:

1. Drip Irrigation: Delivers water directly to plant roots, reducing wastage by up to 60%
2. Rainwater Harvesting: Collect and store rainwater for dry periods
3. Mulching: Reduces evaporation and maintains soil moisture
4. Crop Rotation: Helps maintain soil moisture and fertility
5. Timing: Water during early morning or evening to reduce evaporation

Benefits:
- Reduced water usage
- Better crop yields
- Lower costs
- Environmental sustainability', 
'water, irrigation, sustainability', 'English'),

('Soil Health Management', 'Soil Health', 'tutorial',
'Healthy soil is the foundation of productive agriculture. Here''s how to maintain it:

1. Regular Testing: Test soil pH, nutrients, and organic matter content
2. Organic Matter: Add compost and manure to improve soil structure
3. Crop Rotation: Rotate crops to prevent nutrient depletion
4. Cover Crops: Plant cover crops to protect and enrich soil
5. Reduced Tillage: Minimize soil disturbance to preserve structure

Key Indicators:
- Good drainage
- Proper pH levels (6.0-7.0 for most crops)
- Adequate organic matter (3-5%)
- Active soil biology', 
'soil, health, management', 'English'),

('Pest Control Methods', 'Pest Control', 'article',
'Effective pest control balances crop protection with environmental safety:

1. Integrated Pest Management (IPM): Combines biological, cultural, and chemical methods
2. Biological Control: Use beneficial insects and natural predators
3. Crop Rotation: Breaks pest life cycles
4. Resistant Varieties: Plant pest-resistant crop varieties
5. Natural Pesticides: Use neem oil, garlic spray, and other natural solutions

Prevention:
- Monitor crops regularly
- Maintain healthy plants
- Use companion planting
- Remove infected plants promptly', 
'pest, control, IPM', 'English'),

('Modern Farming Technologies', 'Technology', 'guide',
'Technology is transforming agriculture. Here are key innovations:

1. Precision Farming: Use GPS and sensors for precise application of inputs
2. Drones: Monitor crops from above for early problem detection
3. IoT Sensors: Track soil moisture, temperature, and nutrients in real-time
4. Mobile Apps: Access market prices, weather, and expert advice
5. Automated Systems: Reduce labor and improve efficiency

Getting Started:
- Start with mobile apps for market information
- Consider weather monitoring tools
- Explore crop advisory services
- Gradually adopt precision technologies', 
'technology, innovation, modern', 'English');

