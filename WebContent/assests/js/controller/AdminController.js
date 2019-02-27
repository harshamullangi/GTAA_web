gtaa.controller('adminConsole',function(myURL,$scope, $http){
	
	//Add Column Devices
	$(document).on('click','#addColumn_device',function(){
	
		//$('.ac_table tr:not(.even),.ac_table tr:not(.odd)').remove();
		$('.new_column').remove();
		
	//$scope.addColumn= function(){
		var tr= "<tr class='new_column'>";
			tr+="<td><input type='text' name='msid_no' required placeholder='MSID'/> </td>";
			tr+="<td><input type='text' name='msid_type' required placeholder='MSID Type'/></td>";
			tr+="<td><input type='text' name='requestor_id' required placeholder='Requestor ID' /></td>";
			tr+="<td><input type='text' name='d_username' required placeholder='UserName' /></td>";
			tr+="<td><input type='password' name='d_password' required placeholder='Password' /></td><td></td>";
			tr+="<td><i class='fa fa-send ad_device_sub' aria-hidden='true' title='submit' type='submit'></i></td></tr>";
			
		$('.ac_d').before(tr);
	//}
	});
	
	function datepicker(){
		$(".datepicker").kendoDateTimePicker({
	 	    value: new Date(),
	 	    dateInput: true,
	 	   format: "yyyy-MM-dd",
	 	});
	}
	//Add Column Buses
	$(document).on('click','#addColumn_bus',function(){
		
	
	//$scope.addColumn_bus= function(){
		var tr= "<tr><td><input type='text' name='vehicle_no_bus' placeholder='Vehicle No' /></td>";
			tr+="<td><select name='vehicle_type_bus'><option>Bus</option></select></td>";
			tr+="<td><input type='text' name='vehicle_name_bus' placeholder='Vehicle Name' /></td>";
			tr+="<td><input type='text' name='vehicle_avg_speed' placeholder='Vehicle Max Speed'/></td>";
			tr+="<td><i class='fa fa-send ad_bus_sub' aria-hidden='true' title='submit'></i></td></tr>";
		$('.ac_b').before(tr);
	//}
	});
	
	//Add Column Users
	$(document).on('click','#addColumn_users',function(){
		
	
	//$scope.addColumn_users= function(){
		var tr= "<tr><td><input type='text' name='firstname' placeholder='First Name' ng-model='user_firstname'/></td>";
			tr+="<td><input type='text' name='lastname' placeholder='Last Name' ng-model='user_lastname'/></td>";
			tr+="<td><input type='text' name='username' placeholder='UserName' ng-model='user_username'/> <input type='password' name='password' placeholder='Password' ng-model='user_password'/></td>";
			tr+="<td><input type='text' name='email' placeholder='Email' ng-model='user_email'/></td>";
			tr+="<td><input type='text' name='contact_no' placeholder='Contact No' ng-model='user_contactno'/></td>";
			tr+="<td><input type='text' name='department' placeholder='Department' ng-model='user_department'/></td>";
			tr+="<td><select name='role' ng-model='user_role'> <option value='admin'>Admin</option> <option value='operator'>Operator</option> </select> <input type='hidden' name='organization' value='GTAA' ng-model='user_org'/></td>";
			tr+="<td><i class='fa fa-send ad_f_sub' aria-hidden='true' title='submit'></i></td></tr>";
			
		$('.ac_u').before(tr);
	//}
	});
	//Add Column Assign
	$(document).on('click','#addColumn_assign',function(){
		
	
	//$scope.addColumn_assign= function(){
		
		
		var tr= "<tr><td><select id='route_name_assign' name='route_name_assign'><option>Select Route</option></select></td>";
			tr+="<td><select id='vehicle_name_assign' name='vehicle_name_assign'><option>Select Vehicle</option></select></td>";
			tr+="<td></td>";
			tr+="<td></td>";
			tr+="<td></td>";
			tr+="<td><i class='fa fa-send ad_assign_sub' aria-hidden='true' title='submit'></i></td></tr>";
			
			$http({
				url:$scope.globalURL+'gtaa_eta/dispaly_route_names',
				method:'GET',
				
			}).then(function successCallback(response){
				console.info(response);
				var output=response.data.Message;
				$.each(response.data.Message,function(key,value){
					$('#route_name_assign').append('<option value='+value.route_name+'>'+value.route_name+'</option>');
				});
			});
			
			$http({
				url:$scope.globalURL+'gtaa_eta/display_vehicle_names',
				method:'GET',
				
			}).then(function successCallback(response){
				console.info(response);
				var output=response.data.Message;
				$.each(response.data.Message,function(key,value){
					$('#vehicle_name_assign').append('<option value='+value.vehicle_numbers+'>'+value.vehicle_numbers+'</option>');
				});
			});
			
		$('.ac_a').before(tr);
	//}
	});
	
	//Add Column assign vehicle
	$(document).on('click','#addColumn_assign_vehicle',function(){
		
		
		//$scope.addColumn_assign= function(){
			
			
			var tr= "<tr><td><select id='route_name_assign_vehicle' name='route_name_assign_vehicle'><option>Select GPS Id</option></select></td>";
				tr+="<td><select id='vehicle_name_assign_vehicle' name='vehicle_name_assign_vehicle'><option>Select Vehicle</option></select></td>";
				tr+="<td></td>";
				tr+="<td><i class='fa fa-send ad_assign_sub_vehicle' aria-hidden='true' title='submit'></i></td></tr>";
				
				$http({
					url:$scope.globalURL+'gtaa_eta/msid_list_assign_gps',
					method:'GET',
					
				}).then(function successCallback(response){
					console.info(response);
					var output=response.data.Message;
					$.each(response.data.Message,function(key,value){
						$('#route_name_assign_vehicle').append('<option value='+value.msid+'>'+value.msid+'</option>');
					});
				});
				
				$http({
					url:$scope.globalURL+'gtaa_eta/display_vehicle_names_gps',
					method:'GET',
					
				}).then(function successCallback(response){
					console.info(response);
					var output=response.data.Message;
					$.each(response.data.Message,function(key,value){
						$('#vehicle_name_assign_vehicle').append('<option>'+value.vehicle_numbers+'</option>');
					});
				});
				
			$('.ac_a').before(tr);
		//}
		});
	
	//Display Route Names for Assign
	$scope.dispaly_route_names= function(){
		$http({
			url:$scope.globalURL+'gtaa_eta/dispaly_route_names',
			method:'GET',
			
		}).then(function successCallback(response){
			console.info(response);
			var output=response.data.Message;
			return output;
		});
	}
	
	
	
$scope.globalURL='';
	
	// text file reader
	$scope.intialURL = function() {
		$scope.globalURL = localStorage.getItem('gtaa_main_url');
		console.info($scope.globalURL);
		
		$scope.display_devices();
		/*if($scope.globalURL !=''){
			//$scope.display_user_details();
		}*/
	}
	
	//To Display All Users once page loads
	$scope.display_user_details= function(){
		
		$http({
			method:'GET',
			url:$scope.globalURL+'gtaa_eta/display_user_details'
		}).then(function successCallback(response){
			$('.ac_u').siblings().remove();
			$('#users .dataTables_wrapper').remove();
			var table='<table class="table table-bordered ac_table" id="users_data">';
						table+='<thead>';
						table+='<tr>';
						table+='<th data-field="first_name">First Name</th>';
						table+='<th data-field="last_name">Last Name</th>';
						table+='<th data-field="user_name">User Name</th>';
						table+='<th data-field="email_id">Email Id</th>';
						table+='<th data-field="contact_no">Contact No</th>';
						table+='<th data-field="department">Department</th>';
						table+='<th data-field="role">Role</th>';
						table+='<th>Action</th></tr></thead>';

						table+='<tbody>';
						table+='<tr class="ac_u">';
						table+='<td><i class="fa fa-plus-square-o adminConsole_plus" id="addColumn_users"></i></td>';
						table+='<td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table>';
			$('#users').append(table);
						
						$scope.userDetails=response.data;
			$.each(response.data.Message,function(key,value){
				$('.ac_u').before('<tr><td>'+value.first_name+'</td><td>'+value.last_name+'</td><td>'+value.user_name+'</td><td>'+value.email_id+'</td><td>'+value.contact_no+'</td><td>'+value.department+'</td><td>'+value.role+'</td><td><i class="fa fa-edit ad_f_edit" aria-hidden="true" title="Edit"></i> <i class="fa fa-trash-o ad_f_del" aria-hidden="true" title="Delete"></i></td></tr>');
				
			});
			
			$('#users table').DataTable( {
	            dom: 'Bfrtip',
	            "bSort": false,
	              buttons: [
					{
					    extend: 'excelHtml5',
					  text:      '<i class="fa fa-file-excel-o"></i>',
					    title: 'Users List',
					 },
					{
					    extend: 'pdfHtml5',
					  text:      '<i class="fa fa-file-pdf-o"></i>',
					    title: 'Users List',
					},
					{
					    extend: 'print',
					  text:      '<i class="fa fa-files-o"></i>',
					    title: 'Users List',
					}
	              ]
	          });
			$(".dataTables_filter input").attr("placeholder", "Search User");
			
		})
	}
	
	//Add User 
	$(document).on('click','.ad_f_sub',function(){
		if($('[name="firstname"]').val()==''||$('[name="lastname"]').val()==''||$('[name="username"]').val()==''||$('[name="email"]').val()==''||$('[name="contact_no"]').val()==''||$('[name="organization"]').val()==''||$('[name="department"]').val()==''||$('[name="role"]').val()==''||$('[name="password"]').val()==''){
			bootbox.hideAll();
			bootbox.alert('All fields are mandatory');
		}
		else{
		$http({
			method : 'POST',
			url : $scope.globalURL + 'gtaa_eta/add_user_details',
			data : {
				"first_name" : $('[name="firstname"]').val(),
				"last_name" : $('[name="lastname"]').val(),
				"user_name" : $('[name="username"]').val(),
				"email_id" : $('[name="email"]').val(),
				"contact_no" : $('[name="contact_no"]').val(),
				"organization" : $('[name="organization"]').val(),
				"department" : $('[name="department"]').val(),
				"role" : $('[name="role"]').val(),
				"password" : $('[name="password"]').val(),
				"user_added_by" : localStorage.getItem('login_user'),
			},
		})
		.then(function successCallback(response) {
					console.info(response);
					if(response.data=='1 Record inserted Successfully'){
						bootbox.hideAll();
						bootbox.alert("Record inserted Successfully");
					}else{
						bootbox.hideAll();
						bootbox.alert(response.data.Message);
					}
					$scope.display_user_details();
				},
				function errorCallback(response) {
					bootbox.hideAll();
					bootbox.alert("Not able to connect");
				});
	}
	});
	
	//Delete User
	$(document).on('click','.ad_f_del',function(){
		$('.bootbox').remove();
		var that=$(this);
		bootbox.confirm({
		    message: "Are you sure you want to delete?",
		    buttons: {
		        confirm: {
		            label: 'Yes',
		            className: 'btn-success'
		        },
		        cancel: {
		            label: 'No',
		            className: 'btn-danger'
		        }
		    },
		    callback: function (result) {
		    	if(result=== true){
		    		console.info($(that).closest('tr').find('td:nth-child(1)').text());
		    		$http({
		    			method:'POST',
		    			url:$scope.globalURL+'gtaa_eta/delete_user_details',
		    			data:{
		    				"user_name":$(that).closest('tr').find('td:nth-child(3)').text(),
		    			}
		    		}).then(function successCallback(response){
		    			console.info(response);
		    			if(response.data.Message='1 Record deleted Successfully'){
		    				bootbox.hideAll();
		    				bootbox.alert("Succesfully Deleted");
		    			}else{
		    				bootbox.hideAll();
		    				bootbox.alert(response.data.Message);
		    			}
		    			
		    			$scope.display_user_details();
		    		});
		    	}
		    }
		});
	/*	$http({
			method:'POST',
			url:$scope.globalURL+'gtaa_eta/delete_user_details',
			data:{
				"user_name":$(this).closest('tr').find('td:nth-child(3)').text(),
			}
		}).then(function successCallback(response){
			console.info(response);
			if(response.data.Message='1 Record deleted Successfully'){
				bootbox.alert("Succesfully Deleted");
			}else{
				bootbox.alert(response.data.Message);
			}
			
			$scope.display_user_details();
		});*/
		
		
	});
	
	
	//Edit User
	$(document).on('click','.ad_f_edit',function(){
		var first_name= $(this).closest('tr').find('td:first-child').text();
		var last_name= $(this).closest('tr').find('td:nth-child(2)').text();
		var user_name= $(this).closest('tr').find('td:nth-child(3)').text();
		var email_id= $(this).closest('tr').find('td:nth-child(4)').text();
		var contact_no= $(this).closest('tr').find('td:nth-child(5)').text();
		var department= $(this).closest('tr').find('td:nth-child(6)').text();
		var role= $(this).closest('tr').find('td:nth-child(7)').text();
		
		console.info(first_name);console.info(last_name);console.info(user_name);console.info(email_id);
		console.info(contact_no);
		
		$(this).closest('tr').find('td:nth-child(1)').html('<input type="text" name="first_name_update_user" value="'+first_name+'" >');
		$(this).closest('tr').find('td:nth-child(2)').html('<input type="text" name="last_name_update_user" value="'+last_name+'" >');
		$(this).closest('tr').find('td:nth-child(3)').html('<input type="text" name="user_name_update_user" readonly value="'+user_name+'" >');
		$(this).closest('tr').find('td:nth-child(4)').html('<input type="text" name="email_id_update_user" value="'+email_id+'" >');
		$(this).closest('tr').find('td:nth-child(5)').html('<input type="text" name="contact_no_update_user" value="'+contact_no+'" >');
		$(this).closest('tr').find('td:nth-child(6)').html('<input type="text" name="department_update_user" value="'+department+'" >');
		$(this).closest('tr').find('td:nth-child(7)').html('<input type="text" name="role_update_user" value="'+role+'" >');
		
		$(this).closest('tr').find('td:nth-child(8)').html('<i class="fa fa-check fa_user_update" aria-hidden="true"></i><i class="fa fa-close fa_user_update_del" aria-hidden="true"></i>');
		
		$(document).on('click','.fa_user_update',function(){
		if($('[name="first_name_update_user"]').val()==''||$('[name="last_name_update_user"]').val()==''||$('[name="user_name_update_user"]').val()==''||$('[name="email_id_update_user"]').val()==''||$('[name="contact_no_update_user"]').val()==''||$('[name="department_update_user"]').val()==''||$('[name="role_update_user"]').val()==''){
			bootbox.hideAll();
			bootbox.alert('All fields are mandatory');
		}else{
			$http({
				url:$scope.globalURL+'gtaa_eta/update_user_details',
				method:'POST',
				data:{
					"first_name":$('[name="first_name_update_user"]').val(),
					 "last_name":$('[name="last_name_update_user"]').val(),
					 "user_name":$('[name="user_name_update_user"]').val(),
					 "email_id":$('[name="email_id_update_user"]').val(),
					 "contact_no":$('[name="contact_no_update_user"]').val(),
					 "organization":'GTAA',
					 "department":$('[name="department_update_user"]').val(),
					 "role":$('[name="role_update_user"]').val(),
					 "user_modified_by":localStorage.getItem('')
				}
			}).then(function successCallback(response){
				if(response.data.Message=='1 Record updated Successfully'){
					bootbox.hideAll();
					bootbox.alert("User Details Updated");
				}else{
					bootbox.hideAll();
					bootbox.alert(response.data.Message);
				}
				
				$scope.display_user_details();
				
			})
		}
		});
		
		$(document).on('click','.fa_user_update_del',function(){
			$scope.display_user_details();
		});
		
		
	});
	
	
	//Dispaly Vehicles (Tab 2)
	$scope.display_bus_details=function(){
		$http({
			method:'GET',
			url:$scope.globalURL+'gtaa_eta/display_vehicle_details',
		}).then(function successCallback(response){
			$('.ac_b').siblings().remove();
			$('#buses .dataTables_wrapper').remove();
			
			var table= '<table class="table table-bordered ac_table">';
			table+='<thead>';
			table+='<tr><th>Vehicle No</th><th>Vehicle Type</th><th>Vehicle Name</th><th>Vehicle Max Speed</th><th>Action</th></tr>';
			table+='</thead>';

			table+='<tbody>';
			table+='<tr class="ac_b">';
			table+='<td><i class="fa fa-plus-square-o adminConsole_plus" id="addColumn_bus"></i></td>';
			table+='<td></td><td></td><td></td>	<td></td></tr></tbody></table>';
			$('#buses').append(table);
			
			$scope.busdetails=response.data;
			$.each(response.data.Message, function(key, value){
				$('.ac_b').before('<tr><td>'+value.vehicle_number+'</td><td>'+value.vehicle_type+'</td><td>'+value.vehicle_name+'</td><td>'+value.vehicle_avgspeed+'</td><td><i class="fa fa-edit ad_bus_edit" aria-hidden="true" title="Edit"></i> <i class="fa fa-trash-o ad_bus_del" aria-hidden="true" title="Delete"></i></td></tr>')
			});
			$('#buses table').DataTable( {
	            dom: 'Bfrtip',
	            "bSort": false,
	              buttons: [
					{
					    extend: 'excelHtml5',
					  text:      '<i class="fa fa-file-excel-o"></i>',
					    title: 'Buses List',
					 },
					{
					    extend: 'pdfHtml5',
					  text:      '<i class="fa fa-file-pdf-o"></i>',
					    title: 'Buses List',
					},
					{
					    extend: 'print',
					  text:      '<i class="fa fa-files-o"></i>',
					    title: 'Buses List',
					}
	              ]
	          });
			
			$(".dataTables_filter input").attr("placeholder", "Search Vehicle");
			
		});
	}
	
	//Add Bus
	$(document).on('click','.ad_bus_sub',function(){
		if($('[name="vehicle_no_bus"]').val()==''||$('[name="vehicle_type_bus"]').val()==''||$('[name="vehicle_name_bus"]').val()==''||$('[name="vehicle_avg_speed"]').val()==''){
			bootbox.hideAll();
			bootbox.alert('All fields are mandatory');
		}
		else{
			
		$http({
			method:'POST',
			url:$scope.globalURL+'gtaa_eta/add_vehicle_details',
			data:{
				'vehicle_number':$('[name="vehicle_no_bus"]').val(),
				'vehicle_type':$('[name="vehicle_type_bus"]').val(),
				'vehicle_name':$('[name="vehicle_name_bus"]').val(),
				'vehicle_avgspeed':$('[name="vehicle_avg_speed"]').val(),
				'vehicle_added_by':localStorage.getItem('login_user')
			},
			dataType:'JSON',
		}).then(function successCallback(response){
			console.info(response);
			if(response.data.Message =='1 Record inserted Successfully'){
				bootbox.hideAll();
				bootbox.alert('Vehicle Added Successfully');
			}else{
				bootbox.hideAll();
				bootbox.alert(response.data.Message);
			}
			$scope.display_bus_details();
		});
	}
	});
	
	//Delete Bus/Vehicle
	$(document).on('click','.ad_bus_del',function(){
		$('.bootbox').remove();
		var that=$(this);
		bootbox.confirm({
		    message: "Are you sure you want to delete?",
		    buttons: {
		        confirm: {
		            label: 'Yes',
		            className: 'btn-success'
		        },
		        cancel: {
		            label: 'No',
		            className: 'btn-danger'
		        }
		    },
		    callback: function (result) {
		    	if(result=== true){
		    		console.info($(that).closest('tr').find('td:nth-child(1)').text());
		    		$http({
		    			method:'POST',
		    			url:$scope.globalURL+'gtaa_eta/delete_vehicle_details',
		    			data:{
		    				"vehicle_number":$(that).closest('tr').find('td:nth-child(1)').text(),
		    			}
		    		}).then(function successCallback(response){
		    			console.info(response);
		    			if(response.data.Message=='3 Record deleted Successfully'){
		    				bootbox.hideAll();
		    				bootbox.alert("Succesfully Deleted");
		    			}else{
		    				bootbox.hideAll();
		    				bootbox.alert(response.data.Message);
		    			}
		    			
		    			$scope.display_bus_details();
		    		});
		    	}
		    }
		});
		/*$http({
			method:'POST',
			url:$scope.globalURL+'gtaa_eta/delete_vehicle_details',
			data:{
				"vehicle_number":$(this).closest('tr').find('td:nth-child(1)').text(),
			}
		}).then(function successCallback(response){
			console.info(response);
			if(response.data.Message=='3 Record deleted Successfully'){
				bootbox.alert("Succesfully Deleted");
			}else{
				bootbox.alert(response.data.Message);
			}
			
			$scope.display_bus_details();
		});*/
	});
	
	//Update Bus
	$(document).on('click','.ad_bus_edit',function(){
		var vehicle_number= $(this).closest('tr').find('td:first-child').text();
		var vehicle_type= $(this).closest('tr').find('td:nth-child(2)').text();
		var vehicle_name= $(this).closest('tr').find('td:nth-child(3)').text();
		var vehicle_avgspeed= $(this).closest('tr').find('td:nth-child(4)').text();
		var vehicle_modified_by= localStorage.getItem('login_user');
		
		$(this).closest('tr').find('td:nth-child(1)').html('<input type="text" name="vehicle_number_update" value="'+vehicle_number+'" >');
		$(this).closest('tr').find('td:nth-child(2)').html('<input type="text" name="vehicle_type_update" value="'+vehicle_type+'" >');
		$(this).closest('tr').find('td:nth-child(3)').html('<input type="text" name="vehicle_name_update" value="'+vehicle_name+'" >');
		$(this).closest('tr').find('td:nth-child(4)').html('<input type="text" name="vehicle_avgspeed_update" value="'+vehicle_avgspeed+'" >');
		
		$(this).closest('tr').find('td:nth-child(5)').html('<i class="fa fa-check fa_bus_update" aria-hidden="true"></i> <i class="fa fa-close fa_bus_update_del" aria-hidden="true"></i>');
		
		$(document).on('click','.fa_bus_update',function(){
			if($('[name="vehicle_number_update"]').val()==''||$('[name="vehicle_type_update"]').val() == ''|| $('[name="vehicle_name_update"]').val() =='' || $('[name="vehicle_avgspeed_update"]').val()==''){
				bootbox.hideAll();
				bootbox.alert('All fields are mandatory');
			}else{
			$http({
				url:$scope.globalURL+'gtaa_eta/update_vehicle_details',
				method:'POST',
				data:{
					"vehicle_number":$('[name="vehicle_number_update"]').val(),
					"vehicle_type":$('[name="vehicle_type_update"]').val(),
					"vehicle_name":$('[name="vehicle_name_update"]').val(),
					"vehicle_avgspeed":$('[name="vehicle_avgspeed_update"]').val(),
					"vehicle_modified_by":localStorage.getItem('login_user')
				}
			}).then(function successCallback(response){
				if(response.data.Message=='1 Record updated Successfully'){
					bootbox.hideAll();
					bootbox.alert("Vehicle Details Modified");
				}else{
					bootbox.hideAll();
					bootbox.alert(response.data.Message);
				}
				
				$scope.display_bus_details();
				
			})
			}
			
		});
		
		$(document).on('click','.fa_bus_update_del',function(){
			$scope.display_bus_details();
		});
		
	});
	
	//Display Assign Routes
	$scope.display_assign_routes= function(){
		$('#assign').empty();
		
	var radio='<div class="devices_assign"><p>Select Type of Assign</p> <input type="radio" name="route_assign" value="Route"><span> Route Assign</span><input type="radio" name="route_assign" value="Vehicle"> <span>Vehicle Assign</span></div>';
	$('#assign').append(radio);
	
	var assign_active;
	$('[name="route_assign"]').on('change',function(){
		assign_active= $('[name="route_assign"]:checked').val();
	
	console.info(assign_active);
	if(assign_active == 'Route'){
		$http({
			url:$scope.globalURL+'gtaa_eta/display_assign_routes',
			method:'GET'
		}).then(function successCallback(response){
			$('.ac_a').siblings().remove();
			$('#assign .dataTables_wrapper').remove();
			var table='<table class="table table-bordered ac_table">';
			table+='<thead>';
				table+='<tr>';
				table+='<th>Vehicle Name</th><th>Vehicle No</th><th>Route Name</th><th>Source</th><th>Destination</th><th>Action</th>';
				table+='</tr>';
				table+='</thead>';

				table+='<tbody>';
				table+='<tr class="ac_a">';
				table+='<td><i class="fa fa-plus-square-o adminConsole_plus" id="addColumn_assign"></i></td>';
				table+='<td></td><td></td><td></td><td></td><td></td></tr></tbody></table>';
				
				$('#assign').append(table);
			$scope.busdetails=response.data;
			console.info(response);
			$.each(response.data.Message,function(key,value){
				$('.ac_a').before('<tr><td>'+value.vehicle_name+'</td><td>'+value.vehicle_number+'</td><td>'+value.route_name+'</td><td>'+value.source+'</td><td>'+value.destination+'</td><td><i class="fa fa-edit ad_assign_edit" aria-hidden="true" title="Edit"></i> <i class="fa fa-trash-o ad_assign_del" aria-hidden="true" title="Delete"></i></td></tr>')
			});
			$('#assign table').DataTable( {
	            dom: 'Bfrtip',
	            "bSort": false,
	              buttons: [
					{
					    extend: 'excelHtml5',
					  text:      '<i class="fa fa-file-excel-o"></i>',
					    title: 'Assign List',
					 },
					{
					    extend: 'pdfHtml5',
					  text:      '<i class="fa fa-file-pdf-o"></i>',
					    title: 'Assign List',
					},
					{
					    extend: 'print',
					  text:      '<i class="fa fa-files-o"></i>',
					    title: 'Assign List',
					}
	              ]
	          });
			
			$(".dataTables_filter input").attr("placeholder", "Search Assigned Routes");
		});
	}else if(assign_active == 'Vehicle'){
		
		$http({
			url:$scope.globalURL+'gtaa_eta/display_assign_gps',
			method:'GET'
		}).then(function successCallback(response){
			$('.ac_a').siblings().remove();
			$('#assign .dataTables_wrapper').remove();
			var table='<table class="table table-bordered ac_table">';
			table+='<thead>';
				table+='<tr>';
				table+='<th>Vehicle Name</th><th>Vehicle No</th><th>GPS Id</th><th>Action</th>';
				table+='</tr>';
				table+='</thead>';

				table+='<tbody>';
				table+='<tr class="ac_a">';
				table+='<td><i class="fa fa-plus-square-o adminConsole_plus_vehicle" id="addColumn_assign_vehicle"></i></td>';
				table+='<td></td><td></td><td></td></tr></tbody></table>';
				
				$('#assign').append(table);
			$scope.busdetails=response.data;
			console.info(response);
			$.each(response.data.Message,function(key,value){
				$('.ac_a').before('<tr><td>'+value.vehicle_name+'</td><td>'+value.vehicle_number+'</td><td>'+value.gps_id+'</td><td><i class="fa fa-edit ad_assign_edit_veh" aria-hidden="true" title="Edit"></i> <i class="fa fa-trash-o ad_assign_del_veh" aria-hidden="true" title="Delete"></i></td></tr>')
			});
			$('#assign table').DataTable( {
	            dom: 'Bfrtip',
	            "bSort": false,
	              buttons: [
					{
					    extend: 'excelHtml5',
					  text:      '<i class="fa fa-file-excel-o"></i>',
					    title: 'Assign List',
					 },
					{
					    extend: 'pdfHtml5',
					  text:      '<i class="fa fa-file-pdf-o"></i>',
					    title: 'Assign List',
					},
					{
					    extend: 'print',
					  text:      '<i class="fa fa-files-o"></i>',
					    title: 'Assign List',
					}
	              ]
	          });
			
			$(".dataTables_filter input").attr("placeholder", "Search Assigned Vehicle");
		});
		
		
	}
	});	
	}
	
	//Add Assign Route
	$(document).on('click','.ad_assign_sub',function(){
		if($('[name="route_name_assign"]').val()==''||$('[name="vehicle_name_assign"]').val()==''){
			console.info($('[name="route_name_assign"]').val());
			console.info($('[name="vehicle_name_assign"]').val());
			bootbox.hideAll();
			bootbox.alert('All fields are mandatory');
		}else{
			
		
		$http({
			url:$scope.globalURL+'gtaa_eta/assign_routes',
			method:'POST',
			data:{
				"route_name":$('[name="route_name_assign"]').val(),
				 "vehicle_name":$('[name="vehicle_name_assign"]').val(),
				  "assigned_by":localStorage.getItem('login_user')
			}
		}).then(function successCallback(response){
			if(response.data.Message == '1 Record inserted Successfully'){
				bootbox.hideAll();
				bootbox.alert('Successfully Assigned');
			}else{
				bootbox.hideAll();
				bootbox.alert(response.data.Message);
			}
			
			$scope.display_assign_routes();
		});
		
		}
	});
	
	//Add Assign Vehicle
	$(document).on('click','.ad_assign_sub_vehicle',function(){
		if($('[name="route_name_assign_vehicle"]').val()==''||$('[name="vehicle_name_assign_vehicle"]').val()==''){
			console.info($('[name="route_name_assign_vehicle"]').val());
			console.info($('[name="vehicle_name_assign_vehicle"]').val());
			bootbox.hideAll();
			bootbox.alert('All fields are mandatory');
		}else{
			
		
		$http({
			url:$scope.globalURL+'gtaa_eta/assign_gps',
			method:'POST',
			data:{
				"gps_id":$('[name="route_name_assign_vehicle"]').val(),
				 "vehicle_name":$('[name="vehicle_name_assign_vehicle"]').val(),
				  "assigned_by":localStorage.getItem('login_user')
			}
		}).then(function successCallback(response){
			console.info(response);
			if(response.data.Message == '1 Record inserted Successfully'){
				bootbox.hideAll();
				bootbox.alert('Successfully Assigned');
			}else{
				bootbox.hideAll();
				bootbox.alert(response.data.Message);
			}
			
			$scope.display_assign_routes();
		});
		
		}
	});
	
	
	//Delete Assign
	$(document).on('click','.ad_assign_del',function(){
		$('.bootbox').remove();
		var that=$(this);
		bootbox.confirm({
		    message: "Are you sure you want to delete?",
		    buttons: {
		        confirm: {
		            label: 'Yes',
		            className: 'btn-success'
		        },
		        cancel: {
		            label: 'No',
		            className: 'btn-danger'
		        }
		    },
		    callback: function (result) {
		    	if(result=== true){
		    		$http({
		    			url:$scope.globalURL+'gtaa_eta/delete_assign_routes',
		    			method:'POST',
		    			data:{
		    				"vehicle_number":$(that).closest('tr').find('td:nth-child(2)').text(),
		    			}
		    		}).then(function successCallback(response){
		    			console.info(response.data);
		    			if(response.data.Message== '1 Record deleted Successfully'){
		    				bootbox.hideAll();
		    				bootbox.alert('Deleted Successfully');
		    			}else{
		    				bootbox.hideAll();
		    				bootbox.alert(response.data.Message);
		    			}
		    			
		    			$scope.display_assign_routes();
		    		});
		    	}
		    }
		});
		
	});
	
	//Delete Assign vehicle
	$(document).on('click','.ad_assign_del_veh',function(){
		$('.bootbox').remove();
		var that=$(this);
		bootbox.confirm({
		    message: "Are you sure you want to delete?",
		    buttons: {
		        confirm: {
		            label: 'Yes',
		            className: 'btn-success'
		        },
		        cancel: {
		            label: 'No',
		            className: 'btn-danger'
		        }
		    },
		    callback: function (result) {
		    	if(result=== true){
		    		$http({
		    			url:$scope.globalURL+'gtaa_eta/delete_assign_gps',
		    			method:'POST',
		    			data:{
		    				"vehicle_number":$(that).closest('tr').find('td:nth-child(2)').text(),
		    			}
		    		}).then(function successCallback(response){
		    			console.info(response.data);
		    			if(response.data.Message== '1 Record deleted Successfully'){
		    				bootbox.hideAll();
		    				bootbox.alert('Deleted Successfully');
		    			}else{
		    				bootbox.hideAll();
		    				bootbox.alert(response.data.Message);
		    			}
		    			
		    			$scope.display_assign_routes();
		    		});
		    	}
		    }
		});
		
	});
	
	//Displaying Device
	$scope.display_devices= function(){
		$http({
			url:$scope.globalURL+'gtaa_eta/get_mdg_details',
			method:'GET'
		}).then(function successCallback(response){
			$('.ac_d').siblings().remove();
			$('#devices .dataTables_wrapper').remove();
			var table='<table class="table table-bordered ac_table">';
			table+='<thead>';
				table+='<tr>';
				table+='<th>MSID</th><th>MSID Type</th><th>Requestor ID</th><th>MSID Status</th><th>Client ID</th><th>Client ID Status</th><th>Action</th>';
				table+='</tr>';
				table+='</thead>';

				table+='<tbody>';
				table+='<tr class="ac_d">';
				table+='<td><i class="fa fa-plus-square-o adminConsole_plus" id="addColumn_device"></i></td>';
				table+='<td></td> <td></td> <td></td> <td></td> <td></td><td></td> </tr></tbody></table>';
				
				$('#devices').append(table);
			$scope.busdetails=response.data;
			$.each(response.data.Message,function(key,value){
				$('.ac_d').before('<tr><td>'+value.msid+'</td><td>'+value.msid_type+'</td><td>'+value.requestor_id+'</td><td>'+value.status_msid+'</td><td>'+value.client_id+'</td><td>'+value.status_sessionid+'</td><td><!--<i class="fa fa-edit ad_device_edit" aria-hidden="true" title="Edit"></i>--> <i class="fa fa-trash-o ad_device_del" aria-hidden="true" title="Delete"></i></td></tr>')
			});
			$('#devices table').DataTable( {
		            dom: 'Bfrtip',
		            "bSort": false,
		              buttons: [
						{
						    extend: 'excelHtml5',
						  text:      '<i class="fa fa-file-excel-o"></i>',
						    title: 'Devices List',
						 },
						{
						    extend: 'pdfHtml5',
						  text:      '<i class="fa fa-file-pdf-o"></i>',
						    title: 'Devices List',
						},
						{
						    extend: 'print',
						  text:      '<i class="fa fa-files-o"></i>',
						    title: 'Devices List',
						}
		              ]
		          });
			
			$(".dataTables_filter input").attr("placeholder", "Search MSID");
		});
	}
	
	//Adding Devices
	$(document).on('click','.ad_device_sub',function(){
		//document.getElementById('gps_name_t1').validity.valid;
		if($('[name="msid_no"]').val() == ''||$('[name="msid_type"]').val()== '' ||$('[name="requestor_id"]').val()=='')
		{
			bootbox.hideAll();
			bootbox.alert('All fields are mandatory');
			
		}else{
			
	
			$http({
			url:$scope.globalURL+'gtaa_eta/add_msid_details',
			method:'POST',
			data:{
				  "client_id":$('[name="d_username"]').val(),
				  "client_password":$('[name="d_password"]').val(),
				  "msid":$('[name="msid_no"]').val(),
				  "msid_type":$('[name="msid_type"]').val(),
				  "requestor_id":$('[name="requestor_id"]').val(),
				  "added_by":localStorage.getItem('login_user')
			},
			dataType:'JSON'
		}).then(function successCallback(response){
			console.info(response.data);
			if(response.data.Message == '1 Record inserted Successfully'){
				bootbox.hideAll();
				bootbox.alert('Added Successfully',function(){
					$scope.display_devices();
				});
			}else{
				bootbox.hideAll();
				bootbox.alert(response.data.Message,function(){
					$scope.display_devices();
				});
			}
			
		})
	}
	})
	
	//Delete Device
	$(document).on('click','.ad_device_del',function(evt){
		
		$('.bootbox').remove();
		evt.stopImmediatePropagation();
		var that=$(this);
		bootbox.confirm({
		    message: "Are you sure you want to delete?",
		    buttons: {
		        confirm: {
		            label: 'Yes',
		            className: 'btn-success'
		        },
		        cancel: {
		            label: 'No',
		            className: 'btn-danger'
		        }
		    },
		    callback: function (result) {
		    	if(result=== true){
		    		console.info($(that).closest('tr').find('td:nth-child(1)').text());
		    		$http({
		    			url:$scope.globalURL+'gtaa_eta/delete_msid_details',
		    			method:'POST',
		    			data:{
		    				"msid":$(that).closest('tr').find('td:nth-child(1)').text(),
		    			}
		    		}).then(function successCallback(response){
		    			console.info(response.data);
		    			if(response.data.Message== '1 Record deleted Successfully'){
		    				bootbox.hideAll();
		    				bootbox.alert('Deleted Successfully');
		    			}else{
		    				bootbox.hideAll();
		    				bootbox.alert(response.data.Message);
		    			}
		    			
		    			$scope.display_devices();
		    		});
		    	}
		    }
		});
		
	});
	
	//Editing Device Tab1
	$(document).on('click','.ad_device_edit',function(){
		var msid= $(this).closest('tr').find('td:first-child').text();
		var msid_type= $(this).closest('tr').find('td:nth-child(2)').text();
		var requestor_id= $(this).closest('tr').find('td:nth-child(3)').text();
		
		$(this).closest('tr').find('td:nth-child(1)').html('<input type="text" name="msid_u" readonly value="'+msid+'" >');
		$(this).closest('tr').find('td:nth-child(2)').html('<input type="text" name="msid_type_u" value="'+msid_type+'" >');
		$(this).closest('tr').find('td:nth-child(3)').html('<input type="text" name="requestor_id_u" value="'+requestor_id+'" >');
		
		$(this).closest('tr').find('td:nth-child(7)').html('<i class="fa fa-check fa_device_update" aria-hidden="true"></i> <i class="fa fa-close fa_device_close" aria-hidden="true"></i>');
		
$(document).on('click','.fa_device_update',function(){
			if($('[name="gps_name_t1_u"]').val() == '' ||$('[name="imei_no_t1_u"]').val() == '' || $('[name="model_no_t1_u"]').val()=='' || $('[name="manufacture_date_t1_u"]').val()== '' || $('[name="manufacture_company_t1_u"]').val() == '' || $('[name="serial_no_t1_u"]').val()== ''){
				bootbox.hideAll();
				bootbox.alert('All fields are mandatory');
			}
			else{
			$http({
				url:$scope.globalURL+'gtaa_eta/update_msid_details',
				method:'POST',
				data:{
					  "client_id":"username",
					  "client_password":"password",
					  "msid":$('[name="msid_u"]').val(),
					  "msid_type":$('[name="msid_type_u"]').val(),
					  "requestor_id":$('[name="requestor_id_u"]').val(),
					  "modified_by_by":localStorage.getItem('login_user')
				}
			}).then(function successCallback(response){
				console.info(response);
				if(response.data.Message=='1 Record updated Successfully'){
					bootbox.hideAll();
					bootbox.alert("Succesfully Updated");
				}else{
					bootbox.hideAll();
					bootbox.alert(response.data.Message);
				}
				
				$scope.display_devices();
				
			})
			
			}
		});

$(document).on('click','.fa_device_close',function(){
	$scope.display_devices();
})
		
	});
	
	
	//Modifying assign
	$(document).on('click','.ad_assign_edit',function(){
		//console.info('hello');
		var route_name=$(this).closest('tr').find('td:nth-child(3)').text();
		var vehicle_name=$(this).closest('tr').find('td:nth-child(1)').text();
		console.info(route_name);console.info(vehicle_name);
		
		
		$http({
			url:$scope.globalURL+'gtaa_eta/dispaly_route_names',
			method:'GET',
			
		}).then(function successCallback(response){
			var output=response.data.Message;
			$.each(response.data.Message,function(key,value){
				if(value.route_name != route_name){
					$('#route_name_assign_mod').append('<option value='+value.route_name+'>'+value.route_name+'</option>');	
				}
				
			});
		});
		
		$http({
			url:$scope.globalURL+'gtaa_eta/display_vehicle_names',
			method:'GET',
			
		}).then(function successCallback(response){
			var output=response.data.Message;
			$.each(response.data.Message,function(key,value){
				$('#vehicle_name_assign_mod').append('<option value='+value.vehicle_numbers+'>'+value.vehicle_numbers+'</option>');
			});
		});
		
		
		$(this).closest('tr').find('td:nth-child(1)').html('<select id="vehicle_name_assign_mod" disabled="true" name="vehicle_name_assign_mod"><option>'+vehicle_name+'</option></select>');
		$(this).closest('tr').find('td:nth-child(2)').html('<select id="route_name_assign_mod" name="route_name_assign_mod"><option class="route_underline">'+route_name+'</option></select>');
		$(this).closest('tr').find('td:nth-child(3)').html('');
		$(this).closest('tr').find('td:nth-child(4)').html('');
		$(this).closest('tr').find('td:nth-child(5)').html('');
		$(this).closest('tr').find('td:nth-child(6)').html('<i class="fa fa-check fa_assign_update" aria-hidden="true"></i><i class="fa fa-close fa_assign_update_del" aria-hidden="true"></i>');
		
		
		$(document).on('click','.fa_assign_update',function(){
		$http({
			url:$scope.globalURL+'gtaa_eta/update_assign_routes',
			method:'POST',
			data:{
				"route_name":$('[name="route_name_assign_mod"]').val(),
				"vehicle_name":$('[name="vehicle_name_assign_mod"]').val(),
				"modified_by":localStorage.getItem('login_user')
			}
		}).then(function successCallback(response){
			console.info(response);
			if(response.data.Message=='1 Record updated Successfully'){
				bootbox.hideAll();
				bootbox.alert("Succesfully Updated");
			}else{
				bootbox.hideAll();
				bootbox.alert(response.data.Message);
			}
			
			$scope.display_assign_routes();
			
		})
		});
		
		$(document).on('click','.fa_assign_update_del',function(){
			$scope.display_assign_routes();
		})
		
	});
	
	

	//Modifying assign vehicle
	$(document).on('click','.ad_assign_edit_veh',function(){
		//console.info('hello');
		var route_name=$(this).closest('tr').find('td:nth-child(3)').text();
		var vehicle_name=$(this).closest('tr').find('td:nth-child(1)').text();
		console.info(route_name);console.info(vehicle_name);
		
		
		$http({
			url:$scope.globalURL+'gtaa_eta/msid_list_details',
			method:'GET',
			
		}).then(function successCallback(response){
			var output=response.data.Message;
			$.each(response.data.Message,function(key,value){
				if(value.route_name != route_name){
					$('#route_name_assign_mod_vehicle').append('<option value='+value.msid+'>'+value.msid+'</option>');	
				}
				
			});
		});
		
		$http({
			url:$scope.globalURL+'gtaa_eta/display_vehicle_names',
			method:'GET',
			
		}).then(function successCallback(response){
			var output=response.data.Message;
			$.each(response.data.Message,function(key,value){
				$('#vehicle_name_assign_mod_vehicle').append('<option>'+value.vehicle_numbers+'</option>');
			});
		});
		
		
		$(this).closest('tr').find('td:nth-child(1)').html('<select id="vehicle_name_assign_mod_vehicle" disabled="true" name="vehicle_name_assign_mod_vehicle"><option>'+vehicle_name+'</option></select>');
		$(this).closest('tr').find('td:nth-child(2)').html('<select id="route_name_assign_mod_vehicle" name="route_name_assign_mod_vehicle"><option class="route_underline">'+route_name+'</option></select>');
		$(this).closest('tr').find('td:nth-child(3)').html('');
		$(this).closest('tr').find('td:nth-child(4)').html('<i class="fa fa-check fa_assign_update_vehicle" aria-hidden="true"></i><i class="fa fa-close fa_assign_update_del_vehicle" aria-hidden="true"></i>');
		
		
		$(document).on('click','.fa_assign_update_vehicle',function(){
		$http({
			url:$scope.globalURL+'gtaa_eta/update_assign_gps',
			method:'POST',
			data:{
				"gps_id":$('[name="route_name_assign_mod_vehicle"]').val(),
				"vehicle_name":$('[name="vehicle_name_assign_mod_vehicle"]').val(),
				"modified_by":localStorage.getItem('login_user')
			}
		}).then(function successCallback(response){
			console.info(response);
			if(response.data.Message=='1 Record updated Successfully'){
				bootbox.hideAll();
				bootbox.alert("Succesfully Updated");
			}else{
				bootbox.hideAll();
				bootbox.alert(response.data.Message);
			}
			
			$scope.display_assign_routes();
			
		})
		});
		
		$(document).on('click','.fa_assign_update_del',function(){
			$scope.display_assign_routes();
		})
		
	});
	
	//Notification
	/*$scope.notification_m = function(tempRouteId){
		console.info('dddd');
		$('.notification_details').toggle();
		var route="<div>Do you want to observe this route</div>"
		
			var confirm='<div class="observer_tempRoute"><div class="form-group"><label for="usr">Select Day Wise:</label><select><option>5</option><option>6</option><option>7</option></select></div>';
		confirm+='<p>OR</p>';	
		confirm+='<div class="form-group"><label for="usr">Select Trip Wise:</label><select><option>10</option><option>20</option><option>30</option></select></div></div>';
		bootbox.confirm({
		    title: "New Route Notifications :- "+tempRouteId,
		    message: route,
		    buttons: {
		        cancel: {
		            label: '<i class="fa fa-check"></i> Create'
		        },
		        confirm: {
		            label: '<i class="fa fa-search"></i> Observe'
		        }
		    },
		    callback: function (result) {
		    	if(result == true){
		    		bootbox.confirm({
		    		    title: "New Route Observation :- "+tempRouteId,
		    		    message: confirm,
		    		    buttons: {
		    		        cancel: {
		    		            label: '<i class="fa fa-times"></i> Cancel'
		    		        },
		    		        confirm: {
		    		            label: '<i class="fa fa-check"></i> Yes'
		    		        }
		    		    },
		    		    callback: function (result) {
		    		        console.log('This was logged in the callback: ' + result);
		    		    }
		    		});
		    	}
		    	else if(result == false){
		    		bootbox.alert("Successfully Created Temp Route :- "+tempRouteId );
		    	}
		        console.log('This was logged in the callback: ' + result);
		    }
		});
		
	}*/
	
	$scope.display_config = function(){
		
	}
	
	var init= function(){
		//$scope.intialURL();
		get_config();
		
		/* $('#toggle-two').bootstrapToggle({
		      on: 'ON',
		      off: 'OFF'
		    });*/
		    
		    $(document).on( 'change', '#toggle-two',function() {
		    	if($(this).prop('checked') === true){
		    		
		    		$.ajax({
			    		url : $scope.globalURL + 'gtaa_eta/update_configuration',
			    		method : 'POST',
			    		dataType : 'JSON',
			    		async : true,
			    		headers : {
			    			'Accept' : 'application/json',
			    			'Content-Type' : 'application/json'
			    		},
			    		data:JSON.stringify({
			    			"x":1,
			    		}),
			    		success : function(data) {
			    			console.info(data);
			    			if(data.Message == 'Records updated Successfully'){
			    				$('#toggle-two').attr('checked','checked');
			    				$('#toggle-two').css('display','none');
			    				$('#out-eye').css('display','block');
			    				/*$('#out-eye').css('display','block');
					    		$('#myFrame').remove();
								$('#login_background_dashboard_main div,.login_background_dashboard_main div').hide();
							
								$('#login_background_dashboard_main,.login_background_dashboard_main').append('<iframe src="maintenance.html" frameborder="0" scrolling="no" id="myFrame" style="width:100%; height:100vh; position:fixed; "></iframe>');
							 
								//$('.gtaa_navbar_right li:nth-child(5) a').attr('onclick','return false');
								$('.gtaa_navbar_right li:nth-child(5) a, .gtaa_navbar_right li:nth-child(1) a, .gtaa_navbar_right li:nth-child(2) a, .gtaa_navbar_right li:nth-child(3) a, .gtaa_navbar_right li:nth-child(4) a').attr('onclick','return false');
							*/	
			    			}else{
			    				bootbox.alert('Configuration Update Failed');
			    			}
			    		}
			    	});
		    		/*$('#out-eye').css('display','block');
		    		$('#myFrame').remove();
					$('#login_background_dashboard_main div,.login_background_dashboard_main div').hide();
				
					$('#login_background_dashboard_main,.login_background_dashboard_main').append('<iframe src="maintenance.html" frameborder="0" scrolling="no" id="myFrame" style="width:100%; height:100vh; position:fixed; "></iframe>');
				 
					$('.gtaa_navbar_right li:nth-child(5) a').attr('onclick','return false');
					$('.gtaa_navbar_right li:nth-child(1) a, .gtaa_navbar_right li:nth-child(2) a, .gtaa_navbar_right li:nth-child(3) a, .gtaa_navbar_right li:nth-child(4) a').attr('onclick','return false');
					*/
		    	}else if($(this).prop('checked') === false){
		    		$('#out-eye').css('display','none');
		    	}
		    	 
		    }); 
		    
		    $(document).on('click','.out-eye',function(){
		    	window.location.href='';
		    	
		    	
		    });
		
	}
	
	function get_config(){
		$('#myFrame').remove();
		$.ajax({
			url : globalURL + 'gtaa_eta/get_configuration ',
			method : 'GET',
			dataType : 'JSON',
			async : true,
			success : function(data) {
				if(data.Message[0].x === 1){
					$('#toggle-two').attr('checked','checked');
					$('#toggle-two').css('display','none');
    				$('#out-eye').css('display','block');
					$scope.intialURL();
					/*$('#out-eye').css('display','block');
		    		
					$('#login_background_dashboard_main div,.login_background_dashboard_main div').css('display','none');
				
					$('#login_background_dashboard_main').html('<iframe src="maintenance.html" frameborder="0" scrolling="no" id="myFrame" style="width:100%; height:100vh;"></iframe>');
				 
					//$('.gtaa_navbar_right li:nth-child(5) a').attr('onclick','return false');
					$('.gtaa_navbar_right li:nth-child(5) a, .gtaa_navbar_right li:nth-child(1) a, .gtaa_navbar_right li:nth-child(2) a, .gtaa_navbar_right li:nth-child(3) a, .gtaa_navbar_right li:nth-child(4) a').attr('onclick','return false');
					*/
				}
				else{
					$scope.intialURL();
				}
			}
		});
	}
	
	$('document').on('click','.gta_close_fun',function(){
		alert();
		$('.bootbox').remove();
	});
	
	
	init();
	

});