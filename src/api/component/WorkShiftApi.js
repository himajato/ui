import BaseApi from "../base/BaseApi";
import BaseApiConfig from '../base/BaseApiConfig.js'

class WorkShiftApi extends BaseApi{
    constructor() {
        super();
        this.controller = "WorkShifts"
    }
    
    getAllCode(){
        return BaseApiConfig.get(`${this.controller}/GetAllCode`);
    }
}

export default new WorkShiftApi();