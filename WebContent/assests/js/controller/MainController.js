function notification_m(tempRouteId){
	
	$('.notification_details').toggle();
	//console.info(tempRouteId);
	var route="<div>Do you want to observe this route</div>"
	
	var confirm='<div class="observer_tempRoute"><div class="form-group"><label for="usr">Select Day Wise:</label><select name="select_day_wise"><option value="-1">Select Day Wise</option><option>5</option><option>6</option><option>7</option></select></div>';
	confirm+='<p>OR</p>';	
	confirm+='<div class="form-group"><label for="usr">Select Trip Wise:</label><select name="select_trip_wise"><option value="0">Select Trip Wise</option><option>10</option><option>20</option><option>30</option></select></div></div>';
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
	    		    	
	    		    	var daywise=$('[name="select_day_wise"]').val();
	    		    	var tripwise=$('[name="select_trip_wise"]').val();
	    		    	console.info(tripwise);
	    		    	if(result == true){
	    		    		temp_route_observe(tempRouteId,daywise,tripwise);
	    		    	}
	    		    }
	    		});
	    	}
	    	else if(result == false){
	    		create_route(tempRouteId)
	    	}
	        console.log('This was logged in the callback: ' + result);
	    }
	});
}

var globalURL = localStorage.getItem('gtaa_main_url');
//Function to get the list of notifications
function temp_route_details() {
	$('.notification_details ul li').remove();
	$.ajax({
		url : globalURL + 'gtaa_eta/temp_route_details',
		method : 'GET',
		dataType : 'JSON',
		async : true,
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		success : function(data) {
			console.info(data.Message.length);
			//$('#myFrame').remove();
			//$('#login_background_dashboard_main div,.login_background_dashboard_main div').show();
			$('.gtaa_navbar_right li:nth-child(5) a').attr('onclick','return true').html('Passenger Console');
			
			$('.noti_bell_val').html(data.Message.length);
			if(data.Message.length == 0){
				$('.notification_details ul').append('<li class="temp_routes">No New Notifications</li>');
			}
			else{
			$.each(data.Message,function(key,value){
				var value_routeName= "'"+value.route_name+"'";
				$('.notification_details ul').append('<li class="temp_routes" onclick="notification_m('+value_routeName+')">New Temp Route Observed :- <b>'+value.route_name+'</b></li>');
				//$('.notification_details ul').append('<li class="temp_routes" onclick="notification_m(3)">New Temp Route Observed :- '+value.route_name+'</li>');
			});
			}
		},error:function(data){
			console.info(data);
			//if(data.statusText == 'error'){
				//$('#myFrame').remove();
				//$('#login_background_dashboard_main div,.login_background_dashboard_main div').hide();
			
			 //$('#login_background_dashboard_main,.login_background_dashboard_main').append('<iframe src="maintenance.html" frameborder="0" scrolling="no" id="myFrame" style="width:100%; height:100vh;"></iframe>');
			 //$('.gtaa_navbar_right li:nth-child(5) a').attr('onclick','return false').html('Passenger Console (Coming Soon)');
			//$('.gtaa_navbar_right li:nth-child(5) a').attr('onclick','return false');
			//}
			
			/*$('#myFrame').remove();
			$('#login_background_dashboard_main div,.login_background_dashboard_main div').hide();
		
			$('#login_background_dashboard_main,.login_background_dashboard_main').append('<iframe src="maintenance.html" frameborder="0" scrolling="no" id="myFrame" style="width:100%; height:100vh;"></iframe>');
		 
			$('.gtaa_navbar_right li:nth-child(5) a').attr('onclick','return false');
			$('.gtaa_navbar_right li:nth-child(1) a, .gtaa_navbar_right li:nth-child(2) a, .gtaa_navbar_right li:nth-child(3) a, .gtaa_navbar_right li:nth-child(4) a').attr('onclick','return false');
			*/
			
		}
	});

}

//Temp Route Observe
function temp_route_observe(tempRouteId,daywise,tripwise){

$.ajax({
	url : globalURL + 'gtaa_eta/get_temp_route_observe_details',
	method : 'POST',
	dataType : 'JSON',
	async : true,
	headers : {
		'Accept' : 'application/json',
		'Content-Type' : 'application/json'
	},
	data:JSON.stringify({
		"route_name":tempRouteId,
		"observe_trip_count":tripwise,
		"observe_date_count":daywise
	}),
	success : function(data) {
	
		if(data.Message == 'Records updated Successfully'){
			bootbox.alert("Successfully Updated");
			temp_route_details();
		}
		
	}
});
}


//To Create Temp Route
function create_route(tempRouteId){

$.ajax({
	url : globalURL + 'gtaa_eta/create_temp_route_details',
	method : 'POST',
	dataType : 'JSON',
	async : true,
	headers : {
		'Accept' : 'application/json',
		'Content-Type' : 'application/json'
	},
	data:JSON.stringify({
		"route_name":tempRouteId,
	}),
	success : function(data) {
		console.info(data);
		if(data.Message == 'Records updated Successfully'){
			bootbox.alert("Successfully Created Temp Route :- <b>"+tempRouteId+"</b>" );
			temp_route_details();
		}
	}
});
}

/*function get_config(){
	$.ajax({
		url : globalURL + 'gtaa_eta/get_configuration ',
		method : 'GET',
		dataType : 'JSON',
		async : true,
		success : function(data) {
			console.info(data.Message[0].x);
			if(data.Message[0].x === 0){
				console.info('hi+hello');
				$('#out-eye').css('display','block');
	    		//$('#myFrame').remove();
				$('#login_background_dashboard_main div,.login_background_dashboard_main div').css('display','none');
			
				$('#login_background_dashboard_main,.login_background_dashboard_main').append('<iframe src="maintenance.html" frameborder="0" scrolling="no" id="myFrame" style="width:100%; height:100vh;"></iframe>');
			 
				$('.gtaa_navbar_right li:nth-child(5) a').attr('onclick','return false');
				$('.gtaa_navbar_right li:nth-child(1) a, .gtaa_navbar_right li:nth-child(2) a, .gtaa_navbar_right li:nth-child(3) a, .gtaa_navbar_right li:nth-child(4) a').attr('onclick','return false');
				
			}
		}
	});
}*/

$(document).on('click','.out-eye',function(){
	window.location.href='';
	$.ajax({
		url : globalURL + 'gtaa_eta/update_configuration',
		method : 'POST',
		dataType : 'JSON',
		async : true,
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		data:JSON.stringify({
			"x":0,
		}),
		success : function(data) {
			console.info(data);
			/*if(data.Message == 'Records updated Successfully'){
				bootbox.alert("Successfully Created Temp Route :- <b>"+tempRouteId+"</b>" );
				temp_route_details();
			}*/
		}
	});
});

var init = function (){
	//get_config();
	temp_route_details();
}

init();


setInterval(function(){
	temp_route_details();
	}, 5000);