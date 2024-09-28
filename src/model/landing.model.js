const Const = require('../util/const.util');

class Model {
  
  static LandingPageData = 'landing_page_data';

 
  /**
   * save admins
   * @param {Connection} query 
   * @param {JSON} json 
   * @param {JSON} model
   */


  static getLandingPageData = async (query) => {
    let queryStr = `Select * from ${Model.LandingPageData} `
    let landingData = await query(queryStr);
    if (landingData?.length > 0) {
      landingData = landingData[0];
    }
    return landingData;
  }


}



module.exports = Model;