# Foodify - React Food Ordering Application with Supabase Backend

This README provides instructions for setting up and running the Foodify application with Supabase as the backend.

## Features

- Product browsing with categories and search
- Skeleton loaders for improved user experience
- User authentication and profile management
- Shopping cart functionality
- Order management
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account (free tier available at [supabase.com](https://supabase.com))

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd foodify
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project on [Supabase](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Run the SQL scripts from the `supabase-schema.md` file to create tables and set up RLS policies
4. Insert sample data using the provided SQL script

### 4. Configure Environment Variables

1. Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

2. Update the `.env.local` file with your Supabase credentials:

```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase dashboard under Project Settings > API.

### 5. Start the Development Server

```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
foodify/
├── public/                  # Public assets
├── src/
│   ├── components/          # Reusable components
│   │   ├── ProductCard.js   # Product card component
│   │   ├── ProductCardSkeleton.js # Skeleton loader for product cards
│   │   └── ...
│   ├── context/             # React context providers
│   │   └── AuthContext.js   # Authentication context
│   ├── pages/               # Application pages
│   │   ├── Home.js          # Home page
│   │   ├── Products.js      # Products listing page
│   │   └── ...
│   ├── services/            # API services
│   │   ├── productService.js # Product-related API calls
│   │   ├── userService.js   # User-related API calls
│   │   └── orderService.js  # Order-related API calls
│   ├── config/              # Configuration files
│   │   └── supabaseClient.js # Supabase client configuration
│   ├── App.js               # Main application component
│   └── index.js             # Application entry point
├── .env.example             # Example environment variables
├── supabase-schema.md       # Supabase database schema documentation
└── package.json             # Project dependencies and scripts
```

## Supabase Integration

### Authentication

The application uses Supabase Auth for user authentication. The `AuthContext.js` file provides the authentication context for the entire application.

### Database

The application uses the following tables in Supabase:

- `products`: Stores all food products
- `user_profiles`: Stores user profile information
- `orders`: Stores order information
- `order_items`: Stores individual items within each order

See `supabase-schema.md` for detailed schema information.

### Row Level Security (RLS)

Supabase RLS policies are configured to ensure data security:

- Products are viewable by everyone but can only be modified by admins
- Users can only view and modify their own profiles
- Users can only view and create their own orders
- Order items are linked to orders and follow the same security rules

## Skeleton Loaders

The application uses skeleton loaders to improve user experience during data loading:

- `ProductCardSkeleton.js`: Displays a skeleton version of product cards while data is loading
- Individual image loading skeletons within each product card

## Deployment

To deploy the application:

1. Build the production version:

```bash
npm run build
```

2. Deploy the contents of the `build` directory to your hosting provider of choice (Netlify, Vercel, GitHub Pages, etc.)

## Additional Resources

- [Supabase Documentation](https://supabase.io/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [React Loading Skeleton](https://www.npmjs.com/package/react-loading-skeleton)