const Const = require('../util/const.util');
const Admin = require('../model/admindashboard/admin.model');

class AdminController {

  static save = async (query, id, body) => {
    
    //TODO: data validation
    if(false) {
      const res = Const.Response(Const.Invalid400, validate);
      return res;
    }
    if (body.id === undefined || body.id === null || body.id === 0) {
      body.id = await Admin.add(query, body.fields, body.values, body.admin_id);
    } else {
      body = await Admin.update(query, body, body.admin_id);
    }
    const res = Const.Response(Const.Success200, body);
    return res;
  }
  static getProfileDetails = async (query, id, body) => {
    const data = await Admin.getProfileDetails(query, body.id, body.role);
    return Const.Response(Const.Success200, data);
  }

  static duplicate = async (query, id, body) => {
    let message ={}
    if (body.id === undefined || body.id === null || body.id === 0) {
    }else{message = await Admin.duplicate(query, body.id, body.admin_id);}
    const res = Const.Response(Const.Success200, message);
    return res;
  }

  static list = async (query, id, body) => {
    const fields = body.fields;
    const rows = await Admin.list(query, fields,body.page, body.perPage, body.filter, 'AND', body.sorting);
    // const count = await Admin.count(query, fields, body.filter, 'AND');
    return Const.Response(Const.Success200, rows);
  }


  static createCsv = async (query, id, body) => {
    const fields = body.fields;
    const base_filename = body.filename;
    const rows = await Admin.exportlist(query, fields, body.page, body.perPage, body.filter, 'AND', body.sorting);
    // const count = await Admin.count(query, fields, body.filter, 'AND');
    const filename = base_filename.split('.').join('-' + Date.now() + '.');
    const message = await Admin.generateCsvFile(filename, rows , fields, body.admin_id);
    return Const.Response(Const.Success200, message);
  }

  static exportlist = async (query, id, body) => {
    const rows = await Admin.exportlist(query, body.page, body.perPage, body.filter, 'AND', body.sorting);
    return Const.Response(Const.Success200, rows);
  }

  static tablesetting = async (query, id, body) => {
    const rows = await Admin.tableSetting(query, body.admin_id, body.role, body.page );
    return Const.Response(Const.Success200, rows);
  }

  static savetablesetting = async (query, id, body) => {
    
    //TODO: data validation
    if(false) {
      const res = Const.Response(Const.Invalid400, validate);
      return res;
    }
    
    await Admin.updateTableSetting(query, body.fields, body.role, body.admin_id);
    const res = Const.Response(Const.Success200, body.fields);
    return res;
  }

  static get = async (query, id, body) => {
    // const fields = await Field.getOperationalFields(query, Admin.ModelNo);
    const lead = await Admin.get(query, id);
    return Const.Response(Const.Success200, lead);
  };

  static activate = async (query, id, body) => {
    const lead = await Admin.activate(query, body.id, body.admin_id);
    return Const.Response(Const.Success200, lead);
  };

  static deactivate = async (query, id, body) => {
    const lead = await Admin.deactivate(query, body.id, body.admin_id);
    return Const.Response(Const.Success200, lead);
  };

  static draft = async (query, id, body) => {
    const lead = await Admin.draft(query, body.id, body.admin_id);
    return Const.Response(Const.Success200, lead);
  };

  static permanentdelete = async (query, id, body) => {
    const lead = await Admin.permanentdelete(query, body.id, body.admin_id);
    return Const.Response(Const.Success200, lead);
  };


}

module.exports = AdminController;