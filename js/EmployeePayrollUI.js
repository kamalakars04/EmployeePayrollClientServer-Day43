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
    }) ;
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

});

function resetForm()
{ 
    const output = document.querySelector('#salaryOutput');
    output.textContent = 400000;
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
            alert(createEmployeePayroll().toString());
            return true;
        }
        catch(e)
        {
            alert(e);
        }
    }
    else if(result.length <=0)
    {
        alert('Select atleast one department');
        return false;
    }
    return false;
}

const createEmployeePayroll=()=>
{ 
    let employeePayrollData = new EmployeePayRoll();
    employeePayrollData.name = getInputElementValue('#fullName');
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop(); 
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputElementValue('#salary');
    employeePayrollData.note = getInputElementValue('#notes');
    let date = getInputElementValue('#year')+","+getInputElementValue('#month')+","+getInputElementValue('#day');
    employeePayrollData.startDate = new Date(date)
    return employeePayrollData; 
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