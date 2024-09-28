const config = {
  port: 4001,
  dev_db: {
    host: process.env.DB_HOST ? process.env.DB_HOST : 'ls-88ff1aa05e7d04e62a925bf4fd2b33f1b050d027.cifqbroovvmr.ap-south-1.rds.amazonaws.com',
    port: process.env.DB_PORT ? process.env.DB_PORT : 3306,
    user: process.env.DB_USER ? process.env.DB_USER : 'dbadmin',
    password: process.env.DB_PASS ? process.env.DB_PASS : 'mFyW^(5mVR9SAxzcN((^e1MykGd#$_js',
    database: 'website-backend'
  },
  uat_db: {
    host: process.env.DB_HOST ? process.env.DB_HOST : 'ls-88ff1aa05e7d04e62a925bf4fd2b33f1b050d027.cifqbroovvmr.ap-south-1.rds.amazonaws.com',
    port: process.env.DB_PORT ? process.env.DB_PORT : 3306,
    user: process.env.DB_USER ? process.env.DB_USER : 'dbadmin',
    password: process.env.DB_PASS ? process.env.DB_PASS : 'mFyW^(5mVR9SAxzcN((^e1MykGd#$_js',
    database: 'website-backend'
  },
  prod_db: {
    host: process.env.DB_HOST ? process.env.DB_HOST : 'ls-88ff1aa05e7d04e62a925bf4fd2b33f1b050d027.cifqbroovvmr.ap-south-1.rds.amazonaws.com',
    port: process.env.DB_PORT ? process.env.DB_PORT : 3306,
    user: process.env.DB_USER ? process.env.DB_USER : 'dbadmin',
    password: process.env.DB_PASS ? process.env.DB_PASS : 'mFyW^(5mVR9SAxzcN((^e1MykGd#$_js',
    database: 'website-backend'
  },
  domain: "http://localhost:3000/"
}
module.exports = config;