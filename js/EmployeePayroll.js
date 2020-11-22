window.addEventListener('DOMContentLoaded', (event)=>
{
    const salary = document.querySelector('#salary');
    const output = document.querySelector('#salaryOutput');
    output.textContent = salary.value;
    salary.addEventListener('input', function() 
    {
        output.textContent = salary.value; 
    }) ;
});
function resetForm()
{ 
    const output = document.querySelector('#salaryOutput');
    output.textContent = 400000;
}

