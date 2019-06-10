$(document).ready(function(){

    //Get Employee data from the api
    $.ajax({
        url: "https://cors.io/?http://dummy.restapiexample.com/api/v1/employees",
        type: "GET",
        dataType : 'jsonp',
        crossDomain: true,
        dataType: "json",
        success: function (data) {
            
            
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
            console.log(status);
        }
    });

    // Add new employee html
    $(document).on('click', '#add_employee', function(){
        var add_employee_html = `<div class="col-md-12 col-sm-12 col-xs-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>Create New Employee</h2>
            <div class="clearfix"></div>
          </div>
          <div class="x_content">
            <br>
            <form id="create_employee_form" data-parsley-validate="" class="form-horizontal form-label-left" novalidate="">

              <div class="form-group">
                <label class="control-label 8 col-sm-6 col-xs-12" for="name">Employee Name <span class="required">*</span>
                </label>
                <div class="8 col-sm-6 col-xs-12">
                  <input type="text" id="name" name="name" required="required" class="form-control 8 col-xs-12" >
                </div>
              </div>
              <div class="form-group">
                <label class="control-label 8 col-sm-6 col-xs-12" for="salary">Salary <span class="required">*</span>
                </label>
                <div class="8 col-sm-6 col-xs-12">
                  <input type="text" id="salary" name="salary" required="required" class="form-control 8 col-xs-12">
                </div>
              </div>
              <div class="form-group">
                <label for="age" class="control-label 8 col-sm-6 col-xs-12">Age <span class="required">*</span>
                </label>
                <div class="8 col-sm-6 col-xs-12">
                  <input id="age" required="required" class="form-control 8 col-xs-12" type="text" name="age">
                </div>
              </div>


              <hr>
              <div class="form-group">
                <div class="8 col-sm-6 col-xs-12 col-md-offset-3">
                  <button class="btn btn-primary" type="button">Cancel</button>
                  <button class="btn btn-primary" type="reset">Reset</button>
                  <button type="submit" class="btn btn-success">Submit</button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>`;
      $('#alba-data').html(add_employee_html);
    });

    // Trigger when registration form is submitted
    $(document).on('submit', '#create_employee_form', function(){
    
        // get form data
        var create_employee_form=$(this);
        var form_data=JSON.stringify(create_employee_form.serializeObject());

        // submit form data to api
        $.ajax({
            url: `https://cors.io/?http://dummy.restapiexample.com/api/v1/create`,
            type : "POST",
            contentType : 'application/json',
            data : form_data,
            success : function(result) {
                // if response is a success, tell the user it was a successful sign up & empty the input boxes
                $('#response').html("<div class='alert alert-success'>Employee Creation Successful.</div>");
                // $('create_employee_form').reset();
            },
            error: function(xhr, resp, text){
                // on error, tell the user sign up failed
                $('#response').html("<div class='alert alert-danger'>Unable to create user. Please contact admin.</div>");
            }
        });

        return false;
    });

    
    // Trigger when update employee is clicked
    $(document).on('click','#edit_employee', function(){
        // get product id
        var id = $(this).attr('data-id');
        localStorage.removeItem("editEmployeeId");
        localStorage.setItem("editEmployeeId",id);

        // read one record based on given employee id
        $.getJSON(`https://cors.io/?http://dummy.restapiexample.com/api/v1/employee/${id}`, function(data){
            
            // values will be used to fill out our form
            var name = data.employee_name;
            var salary = data.employee_salary;
            var age = data.employee_age;
            
            
            var edit_employee_html = `<div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                <div class="x_title">
                    <h2>Update Employee</h2>
                    <div class="clearfix"></div>
                </div>
                <div class="x_content">
                    <br>
                    <form id="edit_employee_form" data-parsley-validate="" class="form-horizontal form-label-left" novalidate="">

                    <div class="form-group">
                        <label class="control-label col-md-8 col-sm-8 col-xs-12" for="name">Employee Name <span class="required">*</span>
                        </label>
                        <div class="col-md-8 col-sm-8 col-xs-12">
                        <input type="text" id="name" name="name" required="required"  value='` + name + `' class="form-control col-md-8 col-xs-12" >
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-8 col-sm-8 col-xs-12" for="salary">Employee Salary<span class="required">*</span>
                        </label>
                        <div class="col-md-8 col-sm-8 col-xs-12">
                        <input type="text" id="salary" name="salary" required="required" value='` + salary + `' class="form-control col-md-8 col-xs-12">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="age" class="control-label col-md-8 col-sm-8 col-xs-12">Employee Age <span class="required">*</span>
                        </label>
                        <div class="col-md-8 col-sm-8 col-xs-12">
                        <input id="age" name="age" required="required" value='` + age + `' class="form-control col-md-8 col-xs-12" type="text">
                        </div>
                    </div>
                    
                    <hr>
                    <div class="form-group">
                        <div class="8 col-sm-6 col-xs-12 col-md-offset-3">
                        <button class="btn btn-primary" type="button">Cancel</button>
                        <button class="btn btn-primary" type="reset">Reset</button>
                        <button type="submit" class="btn btn-success">Save Changes</button>
                        </div>
                    </div>

                    </form>
                </div>
                </div>
            </div>`;
            $('#alba-data').html(edit_employee_html);
        });
    });

    // will run if 'Edit product' form was submitted
    $(document).on('submit', '#edit_employee_form', function(){
        
        let id = localStorage.getItem("editEmployeeId");
        // get form data
        var form_data=JSON.stringify($(this).serializeObject()); 
        // submit form data to api
        $.ajax({
            url: `https://cors.io/?http://dummy.restapiexample.com/api/v1/update/${id}`,
            type : "PUT",
            contentType : 'application/json',
            data : form_data,
            success : function(result) {
                // if response is a success, tell the user it was a successful sign up & empty the input boxes
                $('#response').html("<div class='alert alert-success'>Employee Update Successful.</div>");
                // $('#edit_employee_form')[0].reset(); 
                localStorage.removeItem("editEmployeeId");
            },
            error: function(xhr, resp, text) {
                // on error, tell the user sign up failed
                $('#response').html("<div class='alert alert-danger'>Unable to update employee. Please contact Admin.</div>");
            }
        });
        return false;
    });

    // will run if the delete button was clicked
    $(document).on('click', '#delete_employee', function(){
        // get the employee id
        var id = $(this).attr('data-id');

        // bootbox for good looking 'confirm pop up'
        bootbox.confirm({
        
            message: "<h4>Are you sure?</h4>",
            buttons: {
                confirm: {
                    label: '<span><i class="far fa-check-square"></i></span> Yes',
                    className: 'btn-danger'
                },
                cancel: {
                    label: '<span><i class="far fa-window-close"></i></span> No',
                    className: 'btn-primary'
                }
            },
            callback: function (result) {
                if(result==true){
        
                    // send delete request to api / remote server
                    $.ajax({
                        url: `https://cors.io/?http://dummy.restapiexample.com/api/v1/delete/${id}`,
                        type : "DELETE",
                        dataType : 'json',
                        data : JSON.stringify({ id: id }),
                        success : function(result) {
                                // if response is a success, tell the user it was a successful delete
                                $('#response').html("<div class='alert alert-success'>Employee Deletion Successful.</div>");
                        },
                        error: function(xhr, resp, text) {
                            $('#response').html("<div class='alert alert-danger'>Unable to delete employee. Please contact Admin.</div>");
                            console.log(xhr, resp, text);
                        }
                    });
                
                }
            }
        });
    });

    // Reload Page
    $('#dashboard').click(function() {
        location.reload();
    });

    // function to make form values to json format
    $.fn.serializeObject = function(){
        
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

});