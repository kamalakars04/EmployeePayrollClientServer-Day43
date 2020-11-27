let employeeList = [];
window.addEventListener('DOMContentLoaded', (event)=>{
    event.preventDefault();
    event.stopPropagation();
    GetData();
});

// Get the data based on the storage selected
const GetData = ()=>{
    
    if(site_properties.use_local_storage)
        employeeList = JSON.parse(localStorage.getItem("NewEmployeePayrollList"));
    else
    {
        GetDataFromJSONServer();
    }
}

// Create table using template literals
function createInnerHtml()
{
    let innerHtmlCount = !employeeList ? `0` : `${Array.from(employeeList).length}`;
    document.querySelector(".emp-count").innerHTML = innerHtmlCount;
    let innerHtml = "";
    innerHtml = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>";
      for(const empPayrollData of employeeList) {
          innerHtml = `${innerHtml}
          <tr>
              <td><img class="profile" alt="profilePic" src="${empPayrollData._profilePic}"></td>
              <td>${empPayrollData._name}</td>
              <td>${empPayrollData._gender}</td>
              <td>${getDeptHtml(empPayrollData._department)}</td>
              <td>${empPayrollData._salary}</td>
              <td>${new Date(empPayrollData._startDate).toLocaleDateString('en-GB')}</td>
              <td>
              <img id="${empPayrollData.id}" onclick="remove(this)" 
                  src="../assets/icons/delete-black-18dp.svg" alt="delete">
              <img id="${empPayrollData.id}" onclick="update(this)" 
                  src="../assets/icons/create-black-18dp.svg" alt="edit"></td>
          </tr>
      `;
      }
      document.querySelector(".employeeTable").innerHTML = innerHtml;
}

// Get the data from json server
function GetDataFromJSONServer()
{
    makeAJAXCall("GET",site_properties.server_url,true)
    .then(responsetext => 
          {employeeList = JSON.parse(responsetext); createInnerHtml();})
    .catch(err => console.log("Get Error statustext : "+ err.statusText +" status : "+err.status))
}

// To delete a selected employee
const remove = (node) =>{

    // Remove from local storage if it is selected
    if(site_properties.use_local_storage)
    {
        let empPayrollData = employeeList.findIndex(emp => emp.id == node.id);
        if(askDelete())
        employeeList.splice(empPayrollData,1);
        else
        return;
        localStorage.setItem("NewEmployeePayrollList", JSON.stringify(employeeList));
        window.location.reload();
    }

    // remove from json server if it is selected
    else
    {
        if(askDelete())
        {
            makeAJAXCall("DELETE",site_properties.server_url+node.id.toString(),false)
            .then(window.location.reload())
            .catch(err => {alert(e.statusText);window.location.reload();})
        }
        else
        return;
    }
}

// Ask confirmation to delete
let askDelete = () =>{
    return confirm("Do you want to continue with the deletion of employee!!");
}

// Update a given node
const update = (node) =>{
    let employeePayrollData = employeeList.find(emp => emp.id == node.id);
    if(employeePayrollData != undefined)
    {
        localStorage.setItem("editEmp",JSON.stringify(employeePayrollData));
        window.location.replace(site_properties.add_user);
    }
}

// Get the values of all the departments selected
const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}
