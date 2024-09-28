const Const = require('../util/const.util');
const Login = require('../model/login.model');
const md5 = require('md5');

class LoginController {

  static adminLogin = async (query, id, body, session) => {
    const admin = await Login.adminLogin(query, body.username, body.password);
    if(admin.length>0){
      const auth_token = md5(JSON.stringify({"admin_id":admin[0].id,"role":admin[0].role,"table":"admin","expire":session._expires,"path":session.path,"originalMaxAge":session.originalMaxAge,"httpOnly":session.httpOnly})); 
      const auth = await Login.InsertLoginAccess(query, admin[0].id, admin[0].role, "admin",auth_token, session );
      const role = await Login.getRolePermission(query, admin[0].permission_role);
      auth.admin = admin[0];
      auth.role = role[0];
      return Const.Response(Const.Success200, auth);
    }else{
      return Const.Response(Const.UnAuth401, {"message":"Credentials Invalid"});
    }
  };
}

module.exports = LoginController;