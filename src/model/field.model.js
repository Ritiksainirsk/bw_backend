const Const = require('../util/const.util');
// const AddressUtil = require('../util/address.util');
// const FilterUtil = require('../util/filter.util');

/**
 * This class modify admin
 */
class FieldsModel {


  /**
   * save admins
   * @param {String} alias // table alaise for concating the fields
   * @param {Array} fields  // list of fields to be selected in query
   */
  static getSelectedFields = async (fields) => {
    let fields_ = ""
    fields_ = fields.join(",");
    return fields_;
  }
  static getUserListFields = async (fields) => {
    let fields_ = ""
    return fields.map(item => {return " u."+item+""}).join(",");
    return fields_;
  }

  static getInsertFieldsQueries = async (fields) => {
    return fields.map(item => {return "`"+item+"`"}).join(",");
  }

  static getInsertDataQueries = async (fields) => {
    return fields.map(item => {return "'"+item+"'"}).join(",");
    
  }

}
module.exports = FieldsModel;