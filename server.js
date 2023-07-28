const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const app = express();
const jsonServerRouter = jsonServer.router('api/data.json');
const jsonServerMiddleware = jsonServer.defaults();

const publicPath = path.join(__dirname, 'public');

// JSON Server Middlewares
app.use('/api', jsonServerMiddleware);

// JSON Server Routes
app.use('/api', jsonServerRouter);

// Static Content
app.use(express.static(publicPath));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});