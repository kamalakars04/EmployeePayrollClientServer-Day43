let employeePayrollObj = {};
let isUpdate = false;
let name;
let comparedate;

// During the page load
window.addEventListener('DOMContentLoaded', (event) => 
{
    event.preventDefault();
    event.stopPropagation();
    name = document.querySelector('#fullName'); 
    const textError = document.querySelector('.error-name');

    // To check the format of name
    name.addEventListener('input', function() 
    {
        if(name.value.length == 0) 
        { 
            textError.textContent = ""; 
            return; 
        } 
        try 
        {
            checkName(name.value);
            textError.textContent = "";
        }
        catch (e) 
        {
            textError.textContent = e;
        }
    });
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;

    // To output the salary from range
    salary.addEventListener('input', function()
    {
        output.textContent = salary.value; 
    });

    // To check the date format
    const date = Array.from(document.querySelectorAll('[name = date]'));
    date.forEach(p => p.addEventListener('input', function(){
        if(date[0].value !="" && date[1].value != "" && date[2].value != "")
        {
            const error = document.querySelector('.date-error');
            try
            {
                comparedate = getInputElementValue('#year')+","+getInputElementValue('#month')+","+getInputElementValue('#day');
                checkDate(new Date(comparedate));
                error.textContent = ""
                
            }
            catch(e)
            {
                error.textContent =e;
            }
        }
    }));

    // To check if it is an update request 
    checkForUpdate();
});

// Check for update request and get the obj details
const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}

// Set the form with obj details for update
const setForm = () => {
    setValue('#fullName', employeePayrollObj._name);
    setSelectedValues('[name=profilePic]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setValue('#salary',employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary);
    setValue('#notes',employeePayrollObj._note);
    let date = stringifyDate(employeePayrollObj._startDate).split("/");
    setValue('#day', date[0]);
    setValue('#month',date[1]);
    setValue('#year',date[2]);
}

// Set the value of slected item 
const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if(Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value === value)
            item.checked = true;
    });    
}

// To set the text content of elements
const setTextValue = (id, value) => 
{
    const element = document.querySelector(id); 
    element.textContent = value; 
} 

// To set the values of elements
const setValue = (id, value) =>
{
    const element = document.querySelector(id);
    element.value = value; 
}

// When button reset is pressed reset all fields
function resetForm()
{ 
    const output = document.querySelector('#salaryOutput');
    output.textContent = 400000;
    document.querySelector('.error-name').textContent = "";
    document.querySelector('.date-error').textContent = "";
}

// On submit save the details after checking necessary conditions
const save = (event) => 
{
    event.preventDefault();
    event.stopPropagation();
    
        let department = [];
        let result = [];
        department = Array.from(document.querySelectorAll("[name = department]"));
        result = department.filter(p => p.checked === true);
        if(result.length <= 0)
        {
            alert('Select atleast one department');
            department.forEach(p => p.focus());
            return;
        }
        try
        {
            checkName(name.value);
            checkDate(new Date(comparedate));
        }
        catch
        {
            alert("invalid entries!!");
            return;
        }
        try
        {
            createEmployeePayroll();
            if(site_properties.use_local_storage)
            {
                SaveToLocalStorage();
            }
            else
            {
                SaveToJsonServer();
            }
        }
        catch(e)
        {
            alert(e);
        }
}

// Create and save obj to local storage
function SaveToLocalStorage()
{
    let employeePayrollList = [];
    employeePayrollList = JSON.parse(localStorage.getItem("NewEmployeePayrollList")); 

    // If employee payroll list already exists in local storage then push into it.
    // Else create a new object and push it
    if(employeePayrollList != undefined)
    {
        let index =employeePayrollList.findIndex(emp => emp.id == employeePayrollObj.id);
        if(index != -1)
        {
            employeePayrollList.splice(index,1,employeePayrollObj);
            alert("Updated successfully!!");
        }
        else
        {
            employeePayrollList.push(employeePayrollObj); 
            alert("Added successfully!!");
        }
    } 
    else
    { 
        employeePayrollList = [employeePayrollObj] ;
        alert("Added successfully!!");
    }
    localStorage.setItem("NewEmployeePayrollList", JSON.stringify(employeePayrollList));
}

// Save to json server when selected as storage
function SaveToJsonServer()
{
    if(!isUpdate)
    {
         makeAJAXCall("POST",site_properties.server_url,true,employeePayrollObj)
        .then(responseText =>{window.location.replace(site_properties.home_page);})
        .catch(err => {alert(e.statusText);throw e;});
    }

    // Update the already present employee using put method into json server
    if(isUpdate)
    {
        makeAJAXCall("PUT",site_properties.server_url+employeePayrollObj.id.toString(),true,employeePayrollObj)
        .then(responseText => {window.location = "http://127.0.0.1:5500/pages/EmployeePayrollHome.html";})
        .catch(err => {alert(e.statusText);throw e;});
    }
}

// Create the object for saving into local storage or server
const createEmployeePayroll=()=>
{ 
    // Create id only if the storage is selected as local storage else server creates id by itself
    if(site_properties.use_local_storage == true)
        employeePayrollObj.id = createNewEmployeeId();
    employeePayrollObj._name = getInputElementValue('#fullName');
    employeePayrollObj._profilePic = getSelectedValues('[name=profilePic]').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop(); 
    employeePayrollObj._department = getSelectedValues('[name=department]');
    employeePayrollObj._salary = getInputElementValue('#salary');
    employeePayrollObj._note = getInputElementValue('#notes');
    let date = getInputElementValue('#year')+","+getInputElementValue('#month')+","+getInputElementValue('#day');
    employeePayrollObj._startDate = new Date(date);
    return employeePayrollObj; 
}

// To get values of multiple items of same type
const getSelectedValues = (propertyValue) =>
{
    let allItems = Array.from(document.querySelectorAll(propertyValue)); 
    let sellItems = [];
    allItems.forEach(item => 
    {
        if(item.checked) 
        sellItems.push(item.value);
    });
    return sellItems;
}
 
// To get element value of single element
const getInputElementValue = (id) =>
{
    let value = document.querySelector(id).value;
    return value; 
}

// Create a employee id if required
const createNewEmployeeId = () => 
{
    if(isUpdate)
    return employeePayrollObj.id;
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeID",empID);
    return empID;
}