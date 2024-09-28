const Const = require('../util/const.util');
const Model = require('../model/landing.model');

class Controller {
    static LandingPageData = async (query, id, body) => {
        const landing_page = await Model.getLandingPageData(query, body.sef_url);
        const res = Const.Response(Const.Success200, { landing_page });
        return res;
    }
}
module.exports = Controller;