  const Const = require('../util/const.util');
  const Blog = require('../model/admindashboard/blog.model');

  class BlogController {

    static save = async (query, id, body) => {
      
      //TODO: data validation
      if(false) {
        const res = Const.Response(Const.Invalid400, validate);
        return res;
      }
      if (body.id === undefined || body.id === null || body.id === 0) {
        body.id = await Blog.add(query, body.fields, body.values, body.admin_id);
      } else {
        body = await Blog.update(query, body, body.admin_id);
      }
      const res = Const.Response(Const.Success200, body);
      return res;
    }
    static getProfileDetails = async (query, id, body) => {
      const data = await Blog.getProfileDetails(query, body.id, body.role);
      return Const.Response(Const.Success200, data);
    }

    static duplicate = async (query, id, body) => {
      let message ={}
      if (body.id === undefined || body.id === null || body.id === 0) {
      }else{message = await Blog.duplicate(query, body.id, body.admin_id);}
      const res = Const.Response(Const.Success200, message);
      return res;
    }

    static list = async (query, id, body) => {
      const fields = body.fields;
      const rows = await Blog.list(query, fields,body.page, body.perPage, body.filter, 'AND', body.sorting);
      // const count = await Admin.count(query, fields, body.filter, 'AND');
      return Const.Response(Const.Success200, rows);
    }


    static createCsv = async (query, id, body) => {
      const fields = body.fields;
      const base_filename = body.filename;
      const rows = await Blog.exportlist(query, fields, body.page, body.perPage, body.filter, 'AND', body.sorting);
      // const count = await Admin.count(query, fields, body.filter, 'AND');
      const filename = base_filename.split('.').join('-' + Date.now() + '.');
      const message = await Blog.generateCsvFile(filename, rows , fields, body.admin_id);
      return Const.Response(Const.Success200, message);
    }

    static exportlist = async (query, id, body) => {
      const rows = await Blog.exportlist(query, body.page, body.perPage, body.filter, 'AND', body.sorting);
      return Const.Response(Const.Success200, rows);
    }

    static tablesetting = async (query, id, body) => {
      const rows = await Blog.tableSetting(query,body.admin_id, body.role, body.page );
      return Const.Response(Const.Success200, rows);
    }

    static savetablesetting = async (query, id, body) => {
      
      //TODO: data validation
      if(false) {
        const res = Const.Response(Const.Invalid400, validate);
        return res;
      }
      
      await Blog.updateTableSetting(query, body.fields, body.role, body.admin_id);
      const res = Const.Response(Const.Success200, body.fields);
      return res;
    }

    static get = async (query, id, body) => {
      // const fields = await Field.getOperationalFields(query, Admin.ModelNo);
      const lead = await Blog.get(query, id);
      return Const.Response(Const.Success200, lead);
    };

    static activate = async (query, id, body) => {
      const lead = await Blog.activate(query, body.id, body.admin_id);
      return Const.Response(Const.Success200, lead);
    };

    static deactivate = async (query, id, body) => {
      const lead = await Blog.deactivate(query, body.id, body.admin_id);
      return Const.Response(Const.Success200, lead);
    };

    static draft = async (query, id, body) => {
      const lead = await Blog.draft(query, body.id, body.admin_id);
      return Const.Response(Const.Success200, lead);
    };

    static permanentdelete = async (query, id, body) => {
      const lead = await Blog.permanentdelete(query, body.id, body.admin_id);
      return Const.Response(Const.Success200, lead);
    };


  }

  module.exports = BlogController;