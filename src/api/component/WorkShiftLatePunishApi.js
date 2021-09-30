import BaseApi from "../base/BaseApi";
import BaseApiConfig from '../base/BaseApiConfig.js'

class WorkShiftLatePunishApi extends BaseApi{
    constructor() {
        super();
        this.controller = "WorkShiftLatePunishs"
    }
    
    getByWorkShiftCode(code){
        return BaseApiConfig.get(`${this.controller}/GetByWorkshiftCode${code}`)
    }
}

export default new WorkShiftLatePunishApi();