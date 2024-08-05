const final_date=(joining_date)=>{
    let date=new Date(joining_date);
    let data_month=['January','February','March','April','May','June','July','August','September','October','November','December'];
    let month= data_month[date.getMonth()];
    let year=date.getFullYear();
    let days=date.getDate();
    let final_date=days+' '+month+' '+year;
    return final_date;
}

module.exports=final_date