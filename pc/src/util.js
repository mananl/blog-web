export function dateFormate (timestamp){
    let date = new Date(timestamp);
    let yy = date.getFullYear()
    let mm = addZero(date.getMonth()+1)
    let dd =addZero(date.getDate())  
    let hh = addZero(date.getHours())
    let min = addZero(date.getMinutes())
    return yy+"-"+mm+"-"+dd+" "+hh+":"+min
}

function addZero(val){
    let str  = val >=10 ?  val : '0' +val
    return  str
}