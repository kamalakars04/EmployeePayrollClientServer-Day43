let employeePayrollObj = {};
let isUpdate = false;
window.addEventListener('DOMContentLoaded', (event) => 
{
    const name = document.querySelector('#fullName'); 
    const textError = document.querySelector('.error-name');
    name.addEventListener('input', function() 
    {
        if(name.value.length == 0) 
        { 
            textError.textContent = ""; 
            return; 
        } 
        try 
        {
            (new EmployeePayRoll()).name = name.value;
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
    salary.addEventListener('input', function()
    {
        output.textContent = salary.value; 
    });

    const date = Array.from(document.querySelectorAll('[name = date]'));
    date.forEach(p => p.addEventListener('input', function(){
        if(date[0].value !="" && date[1].value != "" && date[2].value != "")
        {
            const error = document.querySelector('.date-error');
            try
            {
                let date = getInputElementValue('#year')+","+getInputElementValue('#month')+","+getInputElementValue('#day');
                (new EmployeePayRoll()).startDate = new Date(date);
                error.textContent = ""
                
            }
            catch(e)
            {
                error.textContent =e;
            }
        }
    }));

    checkForUpdate();
});


const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}

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

const setTextValue = (id, value) => 
    {
        const element = document.querySelector(id); 
        element.textContent = value; 
    } 

const setValue = (id, value) =>
    {
        const element = document.querySelector(id);
        element.value = value; 
    }

function resetForm()
{ 
    const output = document.querySelector('#salaryOutput');
    output.textContent = 400000;
    document.querySelector('.error-name').textContent = "";
}

function save()
{
    let department = [];
    let result = [];
    department = Array.from(document.querySelectorAll("[name = department]"));
    result = department.filter(p => p.checked === true);
    if(result.length > 0)
    {
        try
        {
            let employee = createEmployeePayroll();
            CreateAndSaveLocalStorage(employee);
            if(isUpdate)
                alert("Successfully Updated");
            else
            {
                alert(employee.toString());
            }
            window.location.replace(site_properties.home_page);
        }
        catch(e)
        {
            alert(e);
            if(e.toString().includes("name"))
                document.querySelector("#fullName").focus();
            if(e.toString().includes("Date"))
                Array.from(document.querySelectorAll('select')).forEach(p => p.focus());
        }
    }
    else if(result.length <=0)
    {
        alert('Select atleast one department');
        department.forEach(p => p.focus());
        return false;
    }
    return false;
}

function CreateAndSaveLocalStorage(employee)
{
    let employeePayrollList = [];
    employeePayrollList = JSON.parse(localStorage.getItem("NewEmployeePayrollList")); 
    if(employeePayrollList != undefined)
    {
        let index =employeePayrollList.findIndex(emp => emp._id == employee._id);
        if(index != -1)
        employeePayrollList.splice(index,1,employee);
        else
            employeePayrollList.push(employee); 
    } 
    else
    { 
        employeePayrollList = [employee] ;
    }
    localStorage.setItem("NewEmployeePayrollList", JSON.stringify(employeePayrollList))
     
}

const createEmployeePayroll=()=>
{ 
    let employeeNew = new EmployeePayRoll();
    employeeNew._id = createNewEmployeeId();
    employeeNew._name = getInputElementValue('#fullName');
    employeeNew._profilePic = getSelectedValues('[name=profilePic]').pop();
    employeeNew._gender = getSelectedValues('[name=gender]').pop(); 
    employeeNew._department = getSelectedValues('[name=department]');
    employeeNew._salary = getInputElementValue('#salary');
    employeeNew._note = getInputElementValue('#notes');
    let date = getInputElementValue('#year')+","+getInputElementValue('#month')+","+getInputElementValue('#day');
    employeeNew._startDate = new Date(date);
    return employeeNew; 
}

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
            
const getInputElementValue = (id) =>
{
    let value = document.querySelector(id).value;
    return value; 
}

const createNewEmployeeId = () => {
    
    if(employeePayrollObj._id != undefined)
    return employeePayrollObj._id;
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeID",empID);
    return empID;
    
}