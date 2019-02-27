
	var globalURL;
	$.get('../../url.txt', function(data) {
		globalURL = data;
		
		//MSID List
		$.ajax({
			url:globalURL+'gtaa_eta/msid_list_details',
			method:'GET',
			success:function(response){
				$.each(response.Message,function(key,value){
					$('#mdg_msid').append('<option>'+value.msid+'</option>');
				})
				
			},
		});
	}, 'text');
	
	//Step 1 to pass UserID and MSId
	$(document).on('click','#initial_step_btn',function(){
		var username=$('#mdg_main_id').val();
		var password=$('#mdg_main_pswd').val();
		var msid= $('#mdg_msid').val();
	
	$.ajax({
		'url':globalURL+'gtaa_eta/session_status',
		'type':'post',
		'contentType':'application/json; charset=utf-8',
		'data':JSON.stringify({
			"client_id":username,
			"client_password":password,
			"msid":msid,
		}),
		'dataType':'json',
		success:function(response){
			console.info(response);
			var responseVal=response.Message;
			
			if(responseVal == 'RegistrationRequest'){
				$('#initial_step').css('display','none');
				$('.mdg_registration_step').css('display','block');
				registration_step1(username,password,msid)
			}else if(responseVal == 'LocationStopRequest'){
				$('#initial_step').css('display','none');
				$('.mdg_location_step').css('display','block');
				$('#loc_stop_main_id').val(username);
				$('#loc_stop_main_pswd').val(password);
				$('#loc_stop_msid').val(msid);
				location_requestStop(username,password,msid);
			}else if(responseVal == 'TriggerdLocationRequest'){
				$('#initial_step').css('display','none');
				$('.mdg_location_step3').css('display','block');
				triggerRequest(username,password,msid);
			}else{
				bootbox.alert(responseVal);
			}
		},
	});
	});
	
	//Registration Step- Register
	function registration_step1(username,password,msid){
		$('#reg_clientID').val(username);
		$('#reg_password').val(password);
	
	$(document).on('click','#reg_step1_submit',function(){
		var username=$('#reg_password').val();
		var password=$('#reg_password').val();
		//var request_id=$('#reg_req_id').val();
	
	$.ajax({
		'url':globalURL+'gtaa_eta/trigger_registration_request',
		'type':'post',
		'contentType':'application/json; charset=utf-8',
		'data':JSON.stringify({
			"client_id":username,
			"client_password":password,
			//"requestor_id":request_id,
		}),
		'dataType':'json',
		success:function(response){
			console.info(response);
			var responseVal = response.Message;
			if(responseVal == 'SuccessfullyRegisteredandSessionIDsaved'){
				$('#loc_req_clientID').val(username);
				$('#loc_req_password').val(password);
				bootbox.alert("Successfully Registered and SessionID Saved", function(){ 
					keep_alive(username,password);
				});
				
			}else if(responseVal == 'SuccessfullyRegisteredandSessionIDNOTsaved'){
				bootbox.alert("Successfully Registered and SessionID Not Saved");
			}else{
				bootbox.alert(responseVal);
			}
		},
	});
	});
	
	//Keep Alive
	function keep_alive(username,password){
		//window.setInterval(function(){
		$.ajax({
			'url':globalURL+'gtaa_eta/trigger_keep_alive_request',
			'type':'post',
			'contentType':'application/json; charset=utf-8',
			'data':JSON.stringify({
				"client_id":username,
				"client_password":password,
			}),
			'dataType':'json',
			success:function(response){
				console.info(response);
				if(response.Message == 'OK'){
					
				}else{
					$('#initial_step').css('display','block');
				}
			},
		});
		//},60000);
	}
	
	//Location Request Register
	$('#loc_msidno').val(msid).attr('readonly','readonly');
	$(document).on('click','.loc_req_register',function(){
		$.ajax({
			'url':globalURL+'gtaa_eta/trigger_location_report_request',
			'type':'post',
			'contentType':'application/json; charset=utf-8',
			'data':JSON.stringify({
				"client_id":$('#loc_req_clientID').val(),
				"client_pwd":$('#loc_req_password').val(),
				"msid":$('#loc_msidno').val(),
				"time_interval":$('#loc_timeInterval').val(),
				"reporting_distance":$('#loc_repDistance').val(),
				"p25_su_power_on":$('#loc_P25_poweron').val(),
				"p25_su_power_off":$('#loc_P25_poweroff').val(),
				"p25_emergency":$('#loc_p25_emergency').val(),
				"ptt":$('#loc_p25_tt').val()
			}),
			'dataType':'json',
			success:function(response){
				console.info(response);
				if(response.Message == 'OKandReq_idSaved'){
					bootbox.alert('OK and Req_id Saved');					
				}else if(response.data.Message == 'OKandReq_idNOTSaved'){
					bootbox.alert('OK and Req_id Not Saved');	
				}else{
					bootbox.alert(response.Message);	
				}
			},
		});
	});
	}
	
	//Location Request
	function location_requestStop(username,password,msid){
		$(document).on('click','.location_stop_submit',function(){
			
		$.ajax({
			'url':globalURL+'gtaa_eta/trigger_location_report_stop_request',
			'type':'POST',
			'contentType':'application/json; charset=utf-8',
			'data':JSON.stringify({
				"client_id":username,
				"client_password":password,
				"msid":msid,
			}),
			'dataType':'json',
			success:function(response){
				console.info(response);
				if(response.Message == 'LocationReportingserviceStopped'){
					bootbox.alert('Location Reporting Service Stopped',function(){
						$('#un_stop_main_id').val(username);
						$('#un_stop_main_pswd').val(password);
						//$('#un_stop_msid').val(msid);
					});
				}else{
					bootbox.alert(response.Message);	
				}
			},
		});
		});
	}
	
	//Unregister
	$(document).on('click','.unregister_stop_sub',function(){
	$.ajax({
		'url':globalURL+'gtaa_eta/trigger_unregistration_request',
		'type':'post',
		'contentType':'application/json; charset=utf-8',
		'data':JSON.stringify({
			"client_id":$('#un_stop_main_id').val(),
			"client_password":$('#un_stop_main_pswd').val(),
			//"msid":$('#un_stop_msid').val(),
		}),
		'dataType':'json',
		success:function(response){
			console.info(response);
			if(response.Message == 'UnregistrationSuccessfully'){
				bootbox.alert('Unregistration Successfully');
			}else{
				bootbox.alert(response.Message);
			}
		},
	});
	});
	
	//Trigger Request
	function triggerRequest(username,password,msid){
		$('#s3_loc_req_clientID').val(username);
		$('#s3_loc_req_password').val(password);
		$('#s3_loc_msidno').val(msid);
		
		$(document).on('click','.s3_location_request',function(){
			$.ajax({
				'url':globalURL+'gtaa_eta/trigger_location_report_request',
				'type':'POST',
				'contentType':'application/json; charset=utf-8',
				'data':JSON.stringify({
					"client_id":$('#s3_loc_req_clientID').val(),
					"client_pwd":$('#s3_loc_req_password').val(),
					"msid":$('#s3_loc_msidno').val(),
					"time_interval":$('#s3_loc_timeInterval').val(),
					"reporting_distance":$('#s3_loc_repDistance').val(),
					"p25_su_power_on":$('#s3_loc_P25_poweron').val(),
					"p25_su_power_off":$('#s3_loc_P25_poweroff').val(),
					"p25_emergency":$('#s3_p25_emergency').val(),
					"ptt":$('#s3_p25_tt').val()
				}),
				'dataType':'json',
				success:function(response){
					console.info(response);
					if(response.Message == 'OKandReq_idSaved'){
						bootbox.alert('OK and Req_id Saved');					
					}else if(response.Message == 'OKandReq_idNOTSaved'){
						bootbox.alert('OK and Req_id Not Saved');	
					}else{
						bootbox.alert(response.Message);	
					}
					location_submit(username,password,msid)
				},
			});
		});
	}
	
	function location_submit(username,password,msid){
		$('#s3_loc_stop_main_id').val(username);
		$('#s3_loc_stop_main_pswd').val(password);
		$('#s3_loc_stop_msid').val(msid);
		
		$(document).on('click','.s3_loc_stop_btn_submit',function(){
			$.ajax({
				'url':globalURL+'gtaa_eta/trigger_location_report_stop_request',
				'type':'POST',
				'contentType':'application/json; charset=utf-8',
				'data':JSON.stringify({
					"client_id":username,
					"client_password":password,
					"msid":msid,
				}),
				'dataType':'JSON',
				success:function(response){
					console.info(response);
					if(response.Message == 'LocationReportingserviceStopped'){
						bootbox.alert('Location Reporting Service Stopped',function(){
							$('#s3_un_stop_main_id').val(username);
							$('#s3_un_stop_main_pswd').val(password);
							//$('#un_stop_msid').val(msid);
						});
					}else{
						bootbox.alert(response.Message);	
					}
				},
			});
		});
	}
	
	//Trigger Unregister 
	/*$(document).on('click','.unregister_stop_sub',function(){
		$.ajax({
			url:globalURL+'gtaa_eta/trigger_unregistration_request',
			method:'POST',
			data:{
				"client_id":$('#un_stop_main_id').val(),
				"client_pwd":$('#un_stop_main_pswd').val(),
				//"msid":$('#un_stop_msid').val(),
			},
			success:function(response){
				if(response.data.Message == 'UnregistrationSuccessfully'){
					bootbox.alert('Unregistration Successfully');
				}else{
					bootbox.alert(response.data.Message);
				}
			},
		});
		});*/