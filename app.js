const express = require('express');
const cors = require('cors');
const sessions = require('express-session');
const fileUpload = require('express-fileupload');
// const sessions = require('cookie-parser');

// const ApiRouter = require('./src/routes/api.route');
const AdminRouter = require('./src/routes/admin.route');    
const PagemanagementRouter = require('./src/routes/pagemanagement.route');
const BlogRouter = require('./src/routes/blog.route');
const TemplateRouter = require('./src/routes/template.route');
const APIRouter = require('./src/routes/api.route');
const RoleRouter = require('./src/routes/role.route');
const FileRouter = require('./src/routes/fileupload.route');

const LoginRouter = require('./src/routes/login.route');

const app = express();

app.use(cors());
app.use(fileUpload());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "brainwonderstestmanagementsecretekey@target1000",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use('/admin', AdminRouter);
app.use('/blog', BlogRouter);
app.use('/pagemanagement', PagemanagementRouter);
app.use('/template', TemplateRouter);
app.use('/role', RoleRouter);
app.use('/api', APIRouter);
app.use('/file', FileRouter);

app.use('/login', LoginRouter);

module.exports = app;