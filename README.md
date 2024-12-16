## Quickstart

### Development environment 
For this environment webpack development server.
To start the application:

  - `npm install`
  - `npm start`
  #### for backend
  - `npm init -y && npm install express socket.io body-parser cors`
  - `node backend.js`

## Platform requirements
- Node.js 18.18.0 or higher
- NPM 9.8.1 or higher

## Example
The application entry page is accessible at [http://localhost:3030](http://localhost:3030).

## Project structure
```
project-root/
├── src/
│   ├── components/
│   ├── stores/
│   ├── utils/
│   ├── App.jsx
│   └── index.tsx
├── package.json
├── webpack.config.js
└── README.md
```

## Page Components Overview

### Order Creation Form
A form that allows users to create new orders by entering amounts in tokens or dollars. It ensures seamless user interaction and real-time updates by fetching the latest exchange rates.

### Order List
A dynamic list that displays all created orders with real-time updates.
