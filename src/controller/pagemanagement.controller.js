const Const = require('../util/const.util');
const PageManagement = require('../model/admindashboard/pagemanagement.model');

class PageManagementController {

  static save = async (query, id, body) => {
    
    //TODO: data validation
    if(false) {
      const res = Const.Response(Const.Invalid400, validate);
      return res;
    }
    if (body.id === undefined || body.id === null || body.id === 0) {
      body.id = await PageManagement.add(query, body.fields, body.values, body.admin_id);
    } else {
      body = await PageManagement.update(query, body, body.admin_id);
    }
    const res = Const.Response(Const.Success200, body);
    return res;
  }
  static getPageDetails = async (query, id, body) => {
    const data = await PageManagement.getPageDetails(query, body.id);
    return Const.Response(Const.Success200, data);
  }

  static duplicate = async (query, id, body) => {
    let message ={}
    if (body.id === undefined || body.id === null || body.id === 0) {
    }else{message = await PageManagement.duplicate(query, body.id);}
    const res = Const.Response(Const.Success200, message);
    return res;
  }

  static list = async (query, id, body) => {
    const fields = body.fields;
    const rows = await PageManagement.list(query, fields, body.page, body.perPage, body.filter, 'AND', body.sorting);
    return Const.Response(Const.Success200, rows);
  }
  
  static tablesetting = async (query, id, body) => {
    const rows = await PageManagement.tableSetting(query, body.admin_id, body.role, body.page );
    return Const.Response(Const.Success200, rows);
  }

  static savetablesetting = async (query, id, body) => {
    
    //TODO: data validation
    if(false) {
      const res = Const.Response(Const.Invalid400, validate);
      return res;
    }
    
    await PageManagement.updateTableSetting(query, body.fields, body.role, body.admin_id);
    const res = Const.Response(Const.Success200, body.fields);
    return res;
  }

  static get = async (query, id, body) => {
    // const fields = await Field.getOperationalFields(query, PageManagement.ModelNo);
    const lead = await PageManagement.get(query, id);
    return Const.Response(Const.Success200, lead);
  };

  static activate = async (query, id, body) => {
    const lead = await PageManagement.activate(query, body.id, body.page_id);
    return Const.Response(Const.Success200, lead);
  };

  static deactivate = async (query, id, body) => {
    const lead = await PageManagement.deactivate(query, body.id, body.page_id);
    return Const.Response(Const.Success200, lead);
  };

  static draft = async (query, id, body) => {
    const lead = await PageManagement.draft(query, body.id, body.page_id);
    return Const.Response(Const.Success200, lead);
  };

  static permanentdelete = async (query, id, body) => {
    const lead = await PageManagement.permanentdelete(query, body.id, body.page_id);
    return Const.Response(Const.Success200, lead);
  };


}

module.exports = PageManagementController;