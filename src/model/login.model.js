const Const = require('../util/const.util');
const md5 = require('md5');

/**
 * This class modify lead
 */
class LoginModel {

  static adminLogin = async (query, username, password) => {
    let queryStr = `select * from admin`
      + ` Where  user_name = "${username}" and encrypted_password = "${md5(password)}"`;
    const admin = await query(queryStr);
    return admin;
  }


  static InsertLoginAccess = async (query, user, role, admin_type, auth_token, session) => {
    let insertQuery = `Insert into login_request (admin_id,role,token,table_name,expire,loggedin,path,originalMaxAge,httpOnly) `
    + ` values ("${user}", "${role}", "${auth_token}", "${admin_type}", "${session._expires}",1, "${session.path}", "${session.originalMaxAge}", "${session.httpOnly}")`;
    await query(insertQuery);
    let updateLoginStatusQuery = `update login_request set loggedin=2 where admin_id="${user}" and role=${role}  and token!="${auth_token}" and api!=1 `;
    //await query(updateLoginStatusQuery);
    return {"token": auth_token,"session":session};
  }

  static validateLoginAccess = async (query, token, session) => {
    let validateQuery = `select * from login_request`
    + ` where token="${token}" and loggedin=1`;
    const admin = await query(validateQuery);
    if(admin && admin.length>0){
      return true;
    }else{
      return false;
    }
  }

  static getRolePermission = async (query, role) => {
    let roleQuery = `select * from role where id=${role} `;
    const customRole = await query(roleQuery);
    return customRole;
  }




}
module.exports = LoginModel;