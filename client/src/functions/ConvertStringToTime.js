// given a time (in hhmm format) and a date (mmddyy format), return a Date object
// example: time = "0900", date = "010121" or time = "321", date = "010121"

export function ConvertStringToTime(time, date) {
    //console.log("time: "+time, "date: "+date);
    let year = 2000+parseInt(date.substring(4, 6));
    let month = parseInt(date.substring(0, 2));
    let day = parseInt(date.substring(2, 4));
    let hour = time.length === 3 ? parseInt(time.substring(0, 1)) : parseInt(time.substring(0, 2));
    let minute = time.length === 3 ? parseInt(time.substring(1, 3)) : parseInt(time.substring(2, 4));
    let dateObject = new Date(year, month - 1, day, hour, minute);
    alert(JSON.stringify(dateObject));
    return dateObject;
    } 