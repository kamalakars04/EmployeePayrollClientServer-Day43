const stringifyDate =(date)=>
{
    return new Date(date).toLocaleDateString('en-GB');
}

function redirect()
{
    window.location.replace(site_properties.home_page);
}