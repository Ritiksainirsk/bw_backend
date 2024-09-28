const Const = require('../util/const.util');
const {uploadImage} = require('../model/s3upload.model');

class Controller {

  static singleImageUpload = async (file) => {
    const body = await uploadImage(file.name, file.data, "tm-uat-resources/brand-resources");
    const resp = Const.Response(Const.Success200, {filepath: body.Location});
    return resp;
  }
}
module.exports = Controller;