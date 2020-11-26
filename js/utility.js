const stringifyDate =(date)=>
{
    return new Date(date).toLocaleDateString('en-GB');
}

function redirect()
{
    window.location.replace(site_properties.home_page);
}

function checkName(name)
{
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
     if (nameRegex.test(name))
       this._name = name; 
     else throw 'invalid name';
}

function checkDate(startDate)
{
    let now = new Date();
    if (startDate > now) throw 'Start Date is a Future Date!';
    var diff = Math.abs(now.getTime() - startDate.getTime());
    if (diff / (1000 * 60 * 60 * 24) > 30) 
      throw 'Start Date is beyond 30 Days!';
}