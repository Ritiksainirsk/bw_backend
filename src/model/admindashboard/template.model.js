const Const = require('../../util/const.util');
const Field = require('../field.model');
const md5 = require('md5')
const csv = require('objects-to-csv');

/**
 * This class modify admin
 */
class Model {

  
  static TableName = 'templates';
  

  static Id = 'id';
  static _id = 'page_id';

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

  static getPageDetails = async (query, id) => {
    const queryString = `SELECT `
      + ` * `
      + ` FROM ${Model.TableName} ` 
      + ` WHERE id=${id}`;
    const result = await query(queryString);
    if(result && result.length > 0){
      return result[0];
    }
    return null;
  }

  static getComponentDetails = async (query, id) => {
    const queryString = `SELECT `
      + ` components `
      + ` FROM ${Model.TableName} ` 
      + ` WHERE id=${id}`;
    const result = await query(queryString);
    if(result && result.length > 0){
      return result[0]['components'];
    }
    return null;
  }

  static update = async (query, body, user) => {
    // const update = Field.getUpdateQueries(model, admin);
    let update = "";
    update += ` name = "${body.name}" ,`;
    update += ` user_name = "${body.user_name}" ,`;
    update += ` email = "${body.email}" ,`;
    update += ` contact_no = "${body.contact_no}" ,`;
    update += ` password = "${body.password}" ,`;
    update += ` encrypted_password = "${md5(body.password)}" ,`;
    update += ` permission_role = "${body.permission_role}" , `;
    update += ` status = "${body.status}" `;
    
    if(update && update.length > 0) {
      const queryString = `UPDATE ${Model.TableName}`
        + ` SET ${update}, modified_by = ${user}, modified_date = UTC_TIMESTAMP()`
        + ` WHERE id = ${body.id}`;
      await query(queryString);
    }
    return {"message" : Model.TableName + " details updated"}
  }

  static duplicate = async (query, id, parent, user) => {
    
    const queryString = `insert into ${Model.TableName} `
    + ` () `
    + ` (select  from ${Model.TableName} Where id=${id})`;
    const row = await query(queryString);
    
    return {"message" : "Duplicated successfully"}
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
      filters_ += ` status in ( ${filters['status'].join(",")} ) ` ;
    }else{
      filters_ += ` status != 4 ` ;
    }
    if(filters && filters['name']){
      // TODO: validate filter['VALUE'] before sending to query
      filters_ += and + ` name like "%${filters['name']}%"`;
    }

    if(filters && filters['email']){
      filters_ += and + ` email like "%${filters['email']}%"`;
    }

    if(filters && filters['user_name']){
      filters_ += and + ` user_name like "%${filters['user_name']}%"`;
    }

    if(filters && filters['role']){
      filters_ += and + ` role = "${filters['role']}"`;
    }
    if(filters && filters['contact_no']){
      filters_ += and + ` contact_no like "%${filters['contact_no']}%"`;
    }

    if(filters && filters['created_date']){
      filters_ += and + ` ( created_date between  "${filters['created_date']['from']}" and "${filters['created_date']['till']}" )`;
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

  /**
   * save admins
   * @param {Connection} query 
   * @param {JSON} id - admin id
   * @param {JSON} role - admin role
   */
  
  static tableSetting = async (query, id, role , page ) => {
    let queryStr = `select field,name,edit,checked,table_name,sequence from tablesetting`
    + ` Where admin_id=${id} and role=${role} and status=1 and page="${page}"`
    + ` Order by sequence ASC`;
    const rows = await query(queryStr);
    return rows;
  }

  static updateTableSetting = async (query, fields, role, user) => {
    // const update = Field.getUpdateQueries(model, admin);
    fields.map(async (item) => {
      let update = "";
      update += ` sequence = "${item.sequence}" ,`;
      update += ` edit = "${item.edit}" ,`;
      update += ` checked = "${item.checked}" ,`;
      update += ` name = "${item.name}" ,`;
      update += ` status = "${item.status}" `;
      
      if(update && update.length > 0) {
        const queryString = `UPDATE tablesetting`
          + ` SET ${update}, modified_by = ${user}, modified_date = UTC_TIMESTAMP()`
          + ` WHERE admin_id = ${user} and role=${role} and page="${item.page}" and field="${item.field}" `;
        await query(queryString);
      } 
    })
    return {"message" : "table setting updated"};
    
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

}
module.exports = Model;