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
            <td>
                <img id="delete" src="../assets/icons/delete-black-18dp.svg" alt="delete" onclick="Delete(this)">
                <img id="edit" src="../assets/icons/create-black-18dp.svg" alt="edit" onclick="Update(this)">
            </td>
        </tr>
    `;
    document.querySelector(".employeeTable").innerHTML = innerHtml;
}