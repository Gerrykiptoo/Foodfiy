# Foodify Supabase Database Schema

This document outlines the database schema for the Foodify application using Supabase.

## Tables

### 1. products

This table stores all food products available in the application.

```sql
CREATE TABLE products (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  rating DECIMAL(3,1) NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  popular BOOLEAN DEFAULT false,
  preparation_time TEXT,
  dietary TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster category filtering
CREATE INDEX idx_products_category ON products(category);

-- Create index for text search
CREATE INDEX idx_products_name_description ON products USING GIN (to_tsvector('english', name || ' ' || description));
```

### 2. user_profiles

This table stores additional information about users beyond the auth.users table.

```sql
CREATE TABLE user_profiles (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create index for faster user lookups
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
```

### 3. orders

This table stores order information.

```sql
CREATE TABLE orders (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  shipping_address TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster user order lookups
CREATE INDEX idx_orders_user_id ON orders(user_id);
```

### 4. order_items

This table stores the individual items within each order.

```sql
CREATE TABLE order_items (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
  product_id BIGINT REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  product_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster order item lookups
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
```

## Row Level Security (RLS) Policies

### products Table

```sql
-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Products are viewable by everyone" 
ON products FOR SELECT 
USING (true);

-- Only allow admins to insert/update/delete
CREATE POLICY "Products can be inserted by admins" 
ON products FOR INSERT 
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Products can be updated by admins" 
ON products FOR UPDATE 
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Products can be deleted by admins" 
ON products FOR DELETE 
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');
```

### user_profiles Table

```sql
-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Users can view and update their own profiles
CREATE POLICY "Users can view their own profile" 
ON user_profiles FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON user_profiles FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

-- Only the user can insert their profile
CREATE POLICY "Users can insert their own profile" 
ON user_profiles FOR INSERT 
TO authenticated
USING (auth.uid() = user_id);
```

### orders Table

```sql
-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Users can view their own orders
CREATE POLICY "Users can view their own orders" 
ON orders FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Users can insert their own orders
CREATE POLICY "Users can insert their own orders" 
ON orders FOR INSERT 
TO authenticated
USING (auth.uid() = user_id);

-- Only admins can update order status
CREATE POLICY "Admins can update orders" 
ON orders FOR UPDATE 
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');
```

### order_items Table

```sql
-- Enable RLS
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Users can view their own order items (via orders)
CREATE POLICY "Users can view their own order items" 
ON order_items FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);

-- Users can insert their own order items
CREATE POLICY "Users can insert their own order items" 
ON order_items FOR INSERT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);
```

## Sample Data

Here's a SQL script to insert sample data into the products table:

```sql
INSERT INTO products (name, price, rating, description, image, category, popular, preparation_time, dietary)
VALUES
  ('Classic Burger', '$12.99', 4.8, 'Juicy beef patty with cheese, lettuce, tomato, and special sauce', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1170&q=80', 'Burgers', true, '15 min', ARRAY['Contains Gluten', 'Contains Dairy']),
  ('Veggie Burger', '$11.99', 4.6, 'Plant-based patty with avocado, lettuce, tomato, and vegan mayo', 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=1170&q=80', 'Burgers', false, '15 min', ARRAY['Vegetarian', 'Contains Gluten']),
  ('Double Cheeseburger', '$15.99', 4.9, 'Two beef patties with double cheese, bacon, and our signature sauce', 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=1170&q=80', 'Burgers', true, '20 min', ARRAY['Contains Gluten', 'Contains Dairy']),
  ('Margherita Pizza', '$14.99', 4.7, 'Traditional pizza with tomato sauce, mozzarella, and fresh basil', 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=1170&q=80', 'Pizza', true, '20 min', ARRAY['Vegetarian', 'Contains Gluten', 'Contains Dairy']),
  ('Pepperoni Pizza', '$16.99', 4.8, 'Classic pizza topped with pepperoni slices and mozzarella cheese', 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=1170&q=80', 'Pizza', true, '20 min', ARRAY['Contains Gluten', 'Contains Dairy']),
  ('Vegetable Pizza', '$15.99', 4.5, 'Fresh vegetables, tomato sauce, and cheese on a thin crust', 'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?auto=format&fit=crop&w=1170&q=80', 'Pizza', false, '20 min', ARRAY['Vegetarian', 'Contains Gluten', 'Contains Dairy']),
  ('Chicken Alfredo Pasta', '$16.99', 4.6, 'Creamy alfredo sauce with grilled chicken and fettuccine pasta', 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=1170&q=80', 'Pasta', false, '25 min', ARRAY['Contains Gluten', 'Contains Dairy']),
  ('Spaghetti Bolognese', '$14.99', 4.7, 'Spaghetti with rich meat sauce and parmesan cheese', 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?auto=format&fit=crop&w=1170&q=80', 'Pasta', true, '20 min', ARRAY['Contains Gluten', 'Contains Dairy']),
  ('Caesar Salad', '$10.99', 4.5, 'Fresh romaine lettuce, croutons, parmesan cheese, and Caesar dressing', 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=1170&q=80', 'Salads', false, '10 min', ARRAY['Contains Dairy', 'Contains Gluten']),
  ('Greek Salad', '$11.99', 4.6, 'Cucumber, tomato, olives, feta cheese, and olive oil dressing', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1170&q=80', 'Salads', false, '10 min', ARRAY['Vegetarian', 'Contains Dairy']),
  ('Chocolate Brownie', '$6.99', 4.9, 'Warm chocolate brownie with vanilla ice cream and chocolate sauce', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1170&q=80', 'Desserts', true, '15 min', ARRAY['Vegetarian', 'Contains Gluten', 'Contains Dairy']),
  ('Cheesecake', '$7.99', 4.8, 'Creamy New York style cheesecake with berry compote', 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1170&q=80', 'Desserts', true, '10 min', ARRAY['Vegetarian', 'Contains Gluten', 'Contains Dairy']);
```

## Setting Up Supabase

1. Create a new project in Supabase
2. Go to the SQL Editor
3. Run the SQL scripts above to create tables and insert sample data
4. Set up authentication (Email/Password)
5. Configure Row Level Security policies
6. Create API keys and update your application's environment variables