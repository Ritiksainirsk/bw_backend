const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sessions = require('express-session');
const fileUpload = require('express-fileupload'); 
const PagemanagementRouter = require('./src/routes/pagemanagement.route');
const FileRouter = require('./src/routes/fileupload.route');
const connectDB = require('./src/config/database');
const LoginRouter = require('./src/routes/login.route');
const TemplateRouter = require('./src/routes/template.route');
const PageRouter = require('./src/routes/page.route');

const app = express();

// Connect to MongoDB
connectDB();

// Configure CORS
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'authtoken', 'session'],
    exposedHeaders: ['authtoken', 'session'],
    credentials: true
}));

// Handle preflight requests
app.options('*', cors());

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: false, limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));

const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "brainwonderstestmanagementsecretekey@target1000",
    saveUninitialized: true,
    cookie: { 
        maxAge: oneDay,
        secure: false, // set to true if using https
        httpOnly: true
    },
    resave: false
}));

// Add response headers middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, authtoken, session');
    next();
});

// Routes
app.use('/pagemanagement', PagemanagementRouter); 
app.use('/file', FileRouter);
app.use('/login', LoginRouter);
app.use('/api/templates', TemplateRouter );
app.use('/api/pages', PageRouter );

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

const PORT = process.env.PORT || 4000;

module.exports = app;