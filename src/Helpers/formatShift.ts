const formatShift = (startShift:number, endShift:number) =>
{
   var s = "";
   var e = "";
    if(startShift == 0)
       s= "12:00 AM";
    else if(startShift >= 1 && startShift<= 9){
       s= "0"+startShift+":00 AM";
    }else if(startShift >= 10 && startShift<= 12){
       s= startShift+":00 AM";
    }else if(startShift >= 13 && startShift <= 21){
       s= "0"+(startShift-12)+":00 PM"
    }else if(startShift >= 22 && startShift <= 23){
       s= (startShift-12)+":00 PM"
    }
    if(endShift == 0)
       e= "12:00 AM";
    else if(endShift >= 1 && endShift<= 9){
       e= "0"+endShift+":00 AM";
    }else if(endShift >= 10 && endShift<= 12){
       e= endShift+":00 AM";
    }else if(endShift >= 13 && endShift <= 21){
       e= "0"+(endShift-12)+":00 PM"
    }else if(endShift >= 22 && endShift <= 23){
       e= (endShift-12)+":00 PM"
    }
    return s+" - "+e;
};
export default formatShift;