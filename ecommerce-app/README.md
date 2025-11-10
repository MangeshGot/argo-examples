# E-commerce Website with Google OAuth

A full-stack e-commerce application with Google OAuth authentication, built with React, Node.js, Express, MongoDB, and Docker.

## Features

- 🔐 Google OAuth 2.0 Authentication
- 🛍️ Product Catalog with Search and Filtering
- 🛒 Shopping Cart Management
- 📦 Order Management
- 🎨 Modern UI with Tailwind CSS
- 🐳 Docker Support for Easy Deployment

## Tech Stack

### Frontend
- React 18 with Vite
- React Router for navigation
- Tailwind CSS for styling
- Google OAuth (@react-oauth/google)
- Axios for API calls

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Google Auth Library for OAuth verification
- CORS enabled

### DevOps
- Docker & Docker Compose
- Multi-stage builds for optimized images
- Nginx for frontend serving

## Prerequisites

- Node.js 18+ (for local development)
- Docker & Docker Compose (for containerized deployment)
- MongoDB (included in Docker setup)
- Google OAuth Client ID ([Get it here](https://console.cloud.google.com/))

## Getting Started

### 1. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth Client ID
5. Configure OAuth consent screen
6. Create OAuth 2.0 Client ID (Web application)
7. Add authorized JavaScript origins:
   - `http://localhost:3000`
   - `http://localhost:5173` (for Vite dev server)
8. Add authorized redirect URIs:
   - `http://localhost:3000`
   - `http://localhost:5173`
9. Copy the Client ID

### 2. Setup Environment Variables

Create `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Google Client ID:

```
GOOGLE_CLIENT_ID=your_actual_client_id.apps.googleusercontent.com
```

Also create `.env` files in backend and frontend directories:

**Backend (.env):**
```bash
cd backend
cp .env.example .env
# Edit and add your Google Client ID
```

**Frontend (.env):**
```bash
cd frontend
cp .env.example .env
# Edit and add your Google Client ID
```

### 3. Run with Docker (Recommended)

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

### 4. Seed Database (Optional)

To add sample products:

```bash
# If using Docker
docker exec -it ecommerce-backend npm run seed

# If running locally
cd backend
npm run seed
```

### 5. Local Development (Without Docker)

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Make sure MongoDB is running locally on port 27017.

## Project Structure

```
ecommerce-app/
├── backend/
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Auth middleware
│   ├── server.js         # Express server
│   ├── seed.js           # Database seeding
│   ├── Dockerfile        # Backend Docker config
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── context/      # Context providers
│   │   ├── pages/        # Page components
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # Entry point
│   ├── Dockerfile        # Frontend Docker config (multi-stage)
│   ├── nginx.conf        # Nginx configuration
│   └── package.json
├── docker-compose.yml    # Docker Compose configuration
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/google` - Google OAuth login
- `GET /api/auth/verify` - Verify JWT token

### Products
- `GET /api/products` - Get all products (with optional filters)
- `GET /api/products/:id` - Get single product

### Cart (Protected)
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update item quantity
- `DELETE /api/cart/remove/:productId` - Remove item
- `DELETE /api/cart/clear` - Clear cart

### Orders (Protected)
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order

## Docker Commands

```bash
# Build images
docker-compose build

# Start services
docker-compose up

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Remove volumes (clean database)
docker-compose down -v
```

## Troubleshooting

### Google OAuth Issues
- Ensure your Client ID is correct in all `.env` files
- Check authorized origins in Google Cloud Console
- Clear browser cache and cookies

### MongoDB Connection Issues
- Ensure MongoDB container is running: `docker ps`
- Check logs: `docker-compose logs mongodb`

### Port Already in Use
- Change ports in `docker-compose.yml`
- Or stop conflicting services

## Production Deployment

1. Update environment variables with production values
2. Change JWT_SECRET to a strong random string
3. Update CORS settings in backend
4. Configure proper domain in Google OAuth settings
5. Use environment-specific docker-compose files
6. Enable HTTPS with SSL certificates

## License

MIT

## Contributing

Pull requests are welcome! For major changes, please open an issue first.
