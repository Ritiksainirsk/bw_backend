const app = require('./app');
app.listen(process.env.PORT || 4000,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
});