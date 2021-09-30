import moment from "moment"

class Format{
    formatHour(dateTime){
        var hourFormat = new Date(dateTime)
        return moment(hourFormat).format("HH:mm")
    }
}

export default new Format();