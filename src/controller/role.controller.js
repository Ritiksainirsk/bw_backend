const Const = require('../util/const.util');
const Role = require('../model/admindashboard/role.model');

class RoleController {

  static save = async (query, id, body) => {
    
    //TODO: data validation
    if(false) {
      const res = Const.Response(Const.Invalid400, validate);
      return res;
    }
    if (body.id === undefined || body.id === null || body.id === 0) {
      body.id = await Role.add(query, body.fields, body.values, body.admin_id);
    } else {
      body = await Role.update(query, body, body.admin_id);
    }
    const res = Const.Response(Const.Success200, body);
    return res;
  }

  //TODO: Duplicate the associate including the access, permissions and test.
  //Ask whom they want to duplicate as well.
  static duplicate = async (query, id, body) => {
    let message ={};
    if (body.id === undefined || body.id === null || body.id === 0) {
      
    }else{message = await Role.duplicate(query, body.id, body.admin_id);}
    const res = Const.Response(Const.Success200, message);
    return res;
  }

  static list = async (query, id, body) => {
    const fields = body.fields;
    const rows = await Role.list(query, fields, body.page, body.perPage, body.filter, 'AND', body.sorting);
    // const count = await Role.count(query, fields, body.filter, 'AND');
    return Const.Response(Const.Success200, rows);
  }
  static selectlist = async (query, id, body) => {
    const role_type = body.role_type;
    const rows = await Role.selectlist(query, role_type);
    return Const.Response(Const.Success200, rows);
  }

  static createCsv = async (query, id, body) => {
    const fields = body.fields;
    const base_filename = body.filename;
    const rows = await Role.exportlist(query, fields, body.filter, 'AND', body.sorting);
    // const count = await Role.count(query, fields, body.filter, 'AND');
    const filename = base_filename.split('.').join('-' + Date.now() + '.');
    const message = await Role.generateCsvFile(filename, rows , fields, body.admin_id);
    return Const.Response(Const.Success200, message);
  }

  static exportlist = async (query, id, body) => {
    const rows = await Role.exportlist(query, body.parent, body.page, body.perPage, body.filter, 'AND', body.sorting);
    return Const.Response(Const.Success200, rows);
  }

  static get = async (query, id, body) => {
    // const fields = await Field.getOperationalFields(query, Role.ModelNo);
    const lead = await Role.get(query, id);
    return Const.Response(Const.Success200, lead);
  };

  static activate = async (query, id, body) => {
    const lead = await Role.activate(query, body.id, body.admin_id);
    return Const.Response(Const.Success200, lead);
  };

  static deactivate = async (query, id, body) => {
    const lead = await Role.deactivate(query, body.id, body.admin_id);
    return Const.Response(Const.Success200, lead);
  };

  static draft = async (query, id, body) => {
    const lead = await Role.draft(query, body.id, body.admin_id);
    return Const.Response(Const.Success200, lead);
  };

  static permanentdelete = async (query, id, body) => {
    const lead = await Role.permanentdelete(query, body.id, body.admin_id);
    return Const.Response(Const.Success200, lead);
  };

}

module.exports = RoleController;