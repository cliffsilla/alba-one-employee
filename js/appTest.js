$.ajax({
    url: "http://dummy.restapiexample.com/api/v1/employees",
    type: "GET",
    crossDomain: true,
    dataType: "json",
    success: function (data) {
        
        console.log(data);
        var users_table_html = `<table id="alba-table" class="table table-striped">
        <thead>
        <tr>
            <th>#</th>
            <th>Employee Name</th>
            <th>Employee Salary</th>
            <th>Employee Age</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>`;

        $.each(data, function(key, value){
        users_table_html +=`
        <tr>
            <td>` + value.id +`</td>
            <td>` + value.employee_name +`</td>
            <td>` + value.employee_salary +`</td>
            <td>` + value.employee_age +`</td>
            <td>
                <button id="edit_employee" type="button" class="btn btn-outline-warning" data-id='` + value.id + `'><span><i class="far fa-edit"></i></span> Edit Employee</button>
                <button id="delete_employee" type="button" class="btn btn-outline-danger" data-id='` + value.id + `'><span><i class="far fa-trash-alt"></i></span> Delete Employee</button>
            </td>
        </tr>`
        });
        

        users_table_html += `</tbody>
        </table>`;

        $('#alba-data').html(users_table_html);
        $('#alba-table').DataTable({
            "columns": [
              { "width": "10%" },
              { "width": "20%" },
              { "width": "10%" },
              { "width": "10%" },
              null
            ]
          });
    },
    error: function (xhr, status) {
        alert("error");
    }
});