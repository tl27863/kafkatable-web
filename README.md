# Kafka Real-time Table

Web application that displays Kafka messages in table format with syntax highlighting for JSON.

## Features

- Real-time display of Kafka messages
- Paginated table interface
- JSON syntax highlighting

## Setup

### Backend

1. Create a `.env` file in the backend directory with the following variables:
```
CLIENT=your_client_id
HOST=your_kafka_host
CF_USERNAME=your_username
PASS=your_password
```

2. Install dependencies:
```bash
cd backend
npm install
```

3. Start the server:
```bash
npm start
```

### Frontend

1. Update the Socket.IO connection URL in `script.js` to match your backend server address.

2. Serve the frontend files using any static file server or deploy to a hosting service.

## Deployment

The application is currently deployed at:
- Frontend: https://kafka-table.web.app

## Technology Stack

### Backend
- Node.js
- Express
- Socket.IO
- KafkaJS
- TypeScript

### Frontend
- HTML
- CSS
- JavaScript
- Socket.IO Client
- Highlight.js for syntax highlighting

## License

[MIT License](LICENSE)
