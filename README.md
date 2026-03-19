# Fantasy Fastify App

This is a Fastify application using TypeScript and Prisma as an ORM.

## Setup Instructions

### 1. Install Dependencies
Make sure you install all standard and dev dependencies:
```bash
npm install
```

### 2. Configure Environment Variables
The application uses environment-specific `.env` files. Copy the example file to create the necessary files for your environment:

```bash
# For development
cp .env.example .env.dev

# For staging
cp .env.example .env.staging

# For production
cp .env.example .env.prod
```

Edit these files and replace the placeholders (such as `[YOUR-PASSWORD]`) with your actual database credentials.

### 3. Cross-platform Environment Variables
We use `cross-env` to set environment variables (such as `NODE_ENV=development`) in our npm scripts to ensure compatibility across different operating systems (especially Windows). It is defined as a `devDependency`, so the standard `npm install` command will install it.

### 4. Initialize Prisma Or Fix "@prisma/client did not initialize yet" Error
If you are running the project for the first time, or if you ever change your database schema (`prisma/schema.prisma`), you need to generate the Prisma client before starting the server. This prevents the `Error: @prisma/client did not initialize yet` error from being thrown.

Run the auto-generation command:
```bash
npx prisma generate
```

### 5. Running the Development Server
To start the application in development mode with automatic hot reloading:
```bash
npm run dev
```

### 6. Production
To build the application for production and start the built version:
```bash
npm run build
npm run prod
```
