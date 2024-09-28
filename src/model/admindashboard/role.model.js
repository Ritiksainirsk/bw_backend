const Const = require('../../util/const.util');
const Field = require('../field.model');
const md5 = require('md5')
const csv = require('objects-to-csv');

/**
 * This class modify admin
 */
class Model {

  static Key = 'role';
  static TableName = 'role';
  static Alias = 'r';

  static MapTable = "associate_superadmin_map";

  static Id = 'id';
  static _id = 'role';

  static junior_id = 'superadmin_id';
  static junior = 'superadmin';

  static CreatedDate = 'created_date';

  /**
   * save admins
   * @param {Connection} query 
   * @param {JSON} json 
   * @param {JSON} model 
   */

  static add = async (query, fields, values, user ) => {
    //TODO : getInsetQueries -> get inspiration from pradhyumna sir.
    const fields_ = await Field.getInsertFieldsQueries(fields);
    const values_ = await Field.getInsertDataQueries(values);

    let queryStr = `INSERT INTO ${Model.TableName}`
      + ` (${fields_},`
      + ` created_by, modified_by, created_date, modified_date) VALUES`
      + ` (${values_},`
      + ` ${user}, ${user}, UTC_TIMESTAMP(), UTC_TIMESTAMP())`;
      
    const row = await query(queryStr);
    return row.insertId;
  }

  static update = async (query, body, user) => {
    // const update = Field.getUpdateQueries(model, admin);
    let update = "";
    update += ` role_name = "${body.role_name}" ,`;
    update += ` type = "${body.type}" ,`;
    update += ` user = "${body.user}" ,`;
    update += ` parent = "${body.parent}" ,`;
    update += ` admin = "${body.admin}" ,`;
    update += ` organization = "${body.organization}" ,`;
    update += ` superadmin = "${body.superadmin}" ,`;
    update += ` associate = "${body.associate}" `;
    update += ` examsetting = "${body.examsetting}" `;
    update += ` requestlist = "${body.requestlist}" `;
    update += ` coupon = "${body.coupon}" `;
    update += ` customrole = "${body.customrole}" `;
    update += ` status = "${body.status}" `;
    
    if(update && update.length > 0) {
      const queryString = `UPDATE ${Model.TableName}`
        + ` SET ${update}, modified_by = ${user}, modified_date = UTC_TIMESTAMP()`
        + ` WHERE id = ${body.id}`;
      await query(queryString);
    }
    return {"message" : "associate details updated"}
  }

  static duplicate = async (query, id, user) => {
    const queryString = `insert into ${Model.TableName} `
    + ` (role_name, type, user, parent, admin, organization, superadmin, associate, examsetting, requestlist, coupon, customrole, status, created_date, created_by, modified_by, modified_date) `
    + ` (select role_name, type, user, parent, admin, organization, superadmin, associate, examsetting, requestlist, coupon, customrole, status, created_date, created_by, modified_by, modified_date from ${Model.TableName} Where id=${id})`;
    await query(queryString);
    return {"message" : "Duplicated successfully"}
  }

  static updatepassword = async (query, model, admin, user) => {
    // const update = Field.getUpdateQueries(model, admin);
    let update = "";
    update += ` password = "${body.password}" `;
    update += ` encrypted_password = "${md5(body.password)}" `;
    if(update && update.length > 0) {
      const queryString = `UPDATE ${Model.TableName}`
        + ` SET ${update}, modified_by = ${user}, modified_date = UTC_TIMESTAMP()`
        + ` WHERE id = ${admin.id}`;
      await query(queryString);
    }
  }

  /**
   * this will give list of admins
   * @param {Connection} query
   * @param {JSON} model
   * @param {Int} page current page
   * @param {Int} perPage page page count
   * @param {Json} filters filters to be applied in where condition
   * @returns admins array
   */

  static list = async (query, fields, page, perPage, filters, sort) => {
    const offset = (page - 1) * perPage;
    const sortField = sort && sort.field ? sort.field : Model.CreatedDate;
    const sortOrder = sort && sort.order && sort.order == 1 ? ` ASC ` : ` DESC `;
    
    let filters_ = "";
    let and = ` and `;
    if(filters && filters['status']){
      filters_ += ` status = "${filters['status']}" ` ;
    }else{
      filters_ += ` status != 4 ` ;
    }

    let fields_ = fields.filter(item => (item.table_name)).map(item =>  (item.field))
    
    const adminQueryString = `SELECT `
      + ` id,${await Field.getSelectedFields(fields_)}`
      + ` FROM ${Model.TableName} ` 
      + ` WHERE ${filters_}`
      + ` ORDER BY ${sortField} ${sortOrder}`
      + ` LIMIT ${perPage} OFFSET ${offset}`;
    const result = await query(adminQueryString);
    return result;
  }

  static selectlist = async (query,role_type) => {
    
    let filters_ = ` status != 4 ` ;
    if(role_type > 0){
      filters_ += ` and type= ${role_type}`;
    }
    const adminQueryString = `SELECT `
      + ` id, role_name`
      + ` FROM ${Model.TableName} ` 
      + ` WHERE ${filters_} order  by role_name` ;
    const result = await query(adminQueryString);
    return result;
  }

  static exportlist = async (query, fields, filters, sort) => {
    const sortField = sort && sort.field ? sort.field : Model.CreatedDate;
    const sortOrder = sort && sort.order && sort.order == 1 ? ` ASC ` : ` DESC `;
    
    let filters_ = "";
    let and = ` and `;
    if(filters && filters['status']){
      filters_ += ` status = "${filters['status']}" ` ;
    }else{
      filters_ += ` status != 4 ` ;
    }
    if(filters && filters['name']){
      // TODO: validate filter['VALUE'] before sending to query
      filters_ += and + ` name like "%${filters['name']}%"`;
    }

    let fields_ = fields.filter(item => (item.table_name)).map(item =>  (item.field))
    
    const adminQueryString = `SELECT `
      + ` id,${await Field.getSelectedFields(fields_)}`
      + ` FROM ${Model.TableName} ` 
      + ` WHERE ${filters_}`
      + ` ORDER BY ${sortField} ${sortOrder}`;
    const result = await query(adminQueryString);    
    return result;
  }

  /**
   * this will give list of admins
   * @param {Connection} query
   * @param {JSON} model
   * @param {Int} admin id
   * @returns JSON admin Object
   */
   static get = async (query, id, fields) => {
    // const queryFields = Field.getSelectFields(fields);
    let queryString = `SELECT * `
      + ` FROM ${Model.TableName}`
      + ` WHERE id = ${id} AND status != ${Const.Trash}`;
    const rows = await query(queryString);
    return rows[0];
  }

  static deactivate = async (query, id, user) => {
    let queryStr = `UPDATE ${Model.TableName}`
      + ` SET status = ${Const.Deactive}, modified_by = '${user}',`
      + ` modified_date = UTC_TIMESTAMP() WHERE id = ${id}`;
    await query(queryStr);
    return {"message" : Model.TableName + " deactivated"};
  }

  static permanentdelete = async (query, id, user) => {
    let queryStr = `UPDATE ${Model.TableName}`
      + ` SET status = ${Const.Trash}, modified_by = '${user}',`
      + ` modified_date = UTC_TIMESTAMP() WHERE id = ${id}`;
    await query(queryStr);
    return {"message" : Model.TableName + " deleted permanently, for undo contact admin"};
  }

  static activate = async (query, id, user) => {
    let queryStr = `UPDATE ${Model.TableName}`
      + ` SET status = ${Const.Active}, modified_by = '${user}',`
      + ` modified_date = UTC_TIMESTAMP() WHERE id = ${id}`;
    await query(queryStr);
    return {"message" : Model.TableName + " activated"};
  }

  static draft = async (query, id, user) => {
    let queryStr = `UPDATE ${Model.TableName}`
      + ` SET status = ${Const.Draft}, modified_by = '${user}',`
      + ` modified_date = UTC_TIMESTAMP() WHERE id = ${id}`;
    await query(queryStr);
    return {"message" : Model.TableName + " drafted"};
  }

  static generateCsvFile = async (filename, rows , fields, user) => {
    await new csv(rows).toDisk("export/"+filename, { allColumns: true });
    //TODO: save the fille to s3 ;
    // "export/" + filename to s3 export bucket list;
    //TODO: save the path to export list table with user;
    return {"message" : Model.TableName + " list created", "filepath" : filename};
  }

}
module.exports = Model;