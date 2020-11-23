window.addEventListener('DOMContentLoaded', ()=>{
    createEmployeeTable();
});

const createEmployeeTable = ()=>{
    const innerHtml = `
    <tr>
            <th></th>
            <th>Name</th>
            <th>Gender</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Start Date</th>
            <th>Actions</th>
        </tr>
        <tr>
            <td><img src="../assets/profilePic/Ellipse -2.png" alt=""></td>
            <td>Kamalakar Rao</td>
            <td>male</td>
            <td><div class="dept-label">Finance</div><div class="dept-label">HR</div></td>
            <td>350000</td>
            <td>21/07/1999</td>
            <td>Kamalakar Rao</td>
        </tr>
    `;
    document.querySelector(".employeeTable").innerHTML = innerHtml;
}