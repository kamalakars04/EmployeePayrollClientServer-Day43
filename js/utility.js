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