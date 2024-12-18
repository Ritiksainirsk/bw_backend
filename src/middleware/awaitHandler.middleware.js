const util = require('util');
const mysql = require('mysql');

const Const = require('../util/const.util');
const Config = require('../config/config');
const Login = require("../model/login.model");

const apiHandler = middleware => {
  return async (req, res) => {
    let conn;
    let result;

    try {
      
      conn = mysql.createConnection(Config.dev_db);
      conn.connect();
      const query = util.promisify(conn.query).bind(conn);
      const authtoken = req.headers['authtoken'];
      //TODO: Validate with code
      if(await Login.validateLoginAccess(query,authtoken,req.headers['session'])===false){  
        result = Const.Response(Const.UnAuth401, undefined, 'Unauthorized');
        res.status(result.status).send(result.body);
        return;
      }
      
      const id = req.params.id; 
      const body = req.body;
      result = await middleware(query, id, body);
      conn.end();
      res.status(result.status).send(result.body);
    } catch (err) {
      console.log(err);
      if(conn) {
        conn.end();
      }
      result = Const.Response(Const.ServerError500, undefined, "Error in API");
      res.status(result.status).send(result.body);
    }
  }
}
module.exports = apiHandler;