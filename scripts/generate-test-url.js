// Simple script to generate a test URL for a quote
const { v4: uuidv4 } = require('uuid');

// Mock quote ID (typically this would come from your database)
const quoteId = uuidv4();

// Generate a secure token
const token = uuidv4();

// Create the shareable URL
const baseUrl = 'http://localhost:3001'; // Adjust based on your development server
const shareableUrl = `${baseUrl}/quote/${quoteId}?token=${token}`;

console.log('Test Quote URL:');
console.log(shareableUrl);
console.log('\nUse this SQL to create a test quote with this ID and token:');
console.log(`
INSERT INTO quotes (
  id, 
  quote_number, 
  status, 
  issue_date, 
  due_date, 
  total_amount, 
  notes, 
  public_access, 
  public_token
) VALUES (
  '${quoteId}',
  'QT-TEST-123',
  'sent',
  CURRENT_DATE,
  CURRENT_DATE + INTERVAL '30 days',
  1299.99,
  'This is a test quote for demonstration purposes.',
  true,
  '${token}'
);

-- Add some example products to this quote
INSERT INTO products (id, name, description, price, cost, user_id)
VALUES 
  (uuid_generate_v4(), 'Laptop XPS 13', 'Dell XPS 13 with 16GB RAM, 512GB SSD', 1199.99, 950.00, auth.uid()),
  (uuid_generate_v4(), 'Monitor 27"', '27-inch 4K Monitor', 349.99, 270.00, auth.uid()),
  (uuid_generate_v4(), 'Setup Service', 'Computer setup and configuration', 99.99, 60.00, auth.uid());

-- Now link these products to the quote (you'll need to adjust the product IDs)
INSERT INTO quote_products (quote_id, product_id, quantity, price)
SELECT 
  '${quoteId}', 
  id, 
  1, 
  price 
FROM products 
ORDER BY created_at DESC
LIMIT 3;
`);