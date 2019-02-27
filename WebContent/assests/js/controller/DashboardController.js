gtaa.controller('dashboardCtrl',function($scope,$http,$interval){
	
	
	
	$scope.charts= function(temparray){
		console.info(temparray);
		 Highcharts.chart('container_charts', {
        chart: {
            type: 'spline',
            backgroundColor: 'rgba(255, 255, 255, 0.0)',
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        credits: {
            enabled: false
        },
        exporting: { enabled: false },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                labels: {

                    style: {
                        color: '#fff'
                    }
                }
        },
        yAxis: {
            title: {
                text: '',
            },
            labels: {
                formatter: function () {
                    return this.value;
                },
                style: {
                    color: '#fff'
                }
            },
            color: '#fff',
        },
        tooltip: {
            crosshairs: true,
            shared: true,
            visible: true,
            pointFormat: "{series.name}: <b>{point.y:.0f}</b><br/>",
            style: {
                fontSize:'11px',
            }
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#111',
                    lineWidth: 1,
                    enable: false,
                },
                
                dataLabels: {
                    enabled: false
                },
            }
        },
        series: temparray
    });
	}
	
	
	$scope.globalURL = localStorage.getItem('gtaa_main_url');
	$scope.operation_ETA_details=function(){
		$('.map_eta_table_dash tbody tr').remove();
		$http({
			url:$scope.globalURL+'gtaa_eta/operation_ETA_details',
			method:'GET',
		}).then(function successCallback(response){
			$('.map_eta_table_dash tbody tr').remove();
			$.each(response.data.Message,function(key,value){
				$('.map_eta_table_dash tbody').append('<tr><td>'+value.bus_details+'</td><td>'+value.route+'</td><td>'+value.status+'</td><td>'+value.going_towords+'</td><td>'+value.estimated_time+'</td></tr>')
			});
		});
	}
	$interval(function(){$scope.operation_ETA_details();},7000);
	//Alert List
	$scope.alert_list= function(){
		$http({
			url:$scope.globalURL+'gtaa_eta/dashboard_alert_details',
			method:'GET',
		}).then(function successCallback(response){
			$('.dash_alerts_summ .bshsah div').remove();
			if(response.data.Message.length == 0){
				var div='<div class="alert_val">';
				div+='<span class="alert_span col-md-12"><p class="pull-left">No Alert Found </p>';
				div+='<p class="pull-right"></p></span>';
				div+='<p class="p-content col-md-12"> &nbsp; </p>'; 
				div+='</div>';
				
				$('.dash_alerts_summ .bshsah').append(div);
			}else{
				
			$.each(response.data.Message,function(key, value){
				var div='<div class="alert_val">';
				div+='<span class="alert_span col-md-12"><p class="pull-left">Alert Type : '+ value.alert_type+'</p>';
				div+='<p class="pull-right">'+value.alert_time+'</p></span>';
				div+='<p class="p-content col-md-12">Vehicle No : <b>'+value.vehicle_number+'</b>, &nbsp; '+value.discription+'</p>'; 
				div+='</div>';
				
				$('.dash_alerts_summ .bshsah').append(div);
			});
		}
		});
	}
	
	$scope.count= function(){
		$http({
			url:$scope.globalURL+'gtaa_eta/dashboard_count_details',
			method:'GET',
		}).then(function successCallback(response){
			var main_count=0;
			for(i=0;i<(response.data.Message.length-1);i++){
				var bus_details='<div class="dash_trip_status"><span class="first_bus_count">'+response.data.Message[i].count+'</span class="first_bus_name"><br> <span>'+response.data.Message[i].vehicle_name+'</span></div>';
				$('.total_values_dmain_count').after(bus_details);
				main_count+=response.data.Message[i].count;
			}
		
			var total_count_bus=main_count;
			var total_assigned_count= parseInt(response.data.Message.length)-1;
			if(parseInt(response.data.Message[total_assigned_count].split(':')[1]) < 10){
				var count_value='0'+parseInt(response.data.Message[total_assigned_count].split(':')[1]);
			}else{
				var count_value=parseInt(response.data.Message[total_assigned_count].split(':')[1]);
			}
			/*$('.first_bus_count').html($scope.bus1);
			$('.second_bus_count').html($scope.bus2);*/
			$('.total_bus_count').html(total_count_bus);
			$('.dash_fleet_count_span_1').html(count_value)
			
			//$('.first_bus_name span').html('BUS1');
			//$('.second_bus_name span').html('BUS2');
			
			//console.info(total_count_bus);
			
		})
	}
	
	$scope.chart_alert = function(){
		$http({
			url:$scope.globalURL+'gtaa_eta/dashboard_chart_details',
			method:'GET',
		}).then(function successCallback(response){
			console.info(response);
			
			var temparray=[];
			for(i=0; i<(response.data.Message.length);i++){
				var tempData={};
				var new_array=[];
				var array_color=['#F44336','#00897b','#b3b3b3']
				$.each(response.data.Message[i].data,function(key,value){
					new_array.push(value);
				});
				tempData['name']=response.data.Message[i].vehicle_name;
				tempData['data']=new_array;
				tempData['color']=array_color[i];
				tempData['showInLegend']=false;
				temparray.push(tempData);
			}
			
			console.info(temparray);
			$scope.charts(temparray);
			
			
			$.each(temparray,function(key,value){
				var count=0;
				for(i=0; i<12;i++){
					//console.info(value.data[i]);
					count+=parseInt(value.data[i]);
				}
				console.info(count);
				var span='<span class="dash_bus_1">'+value.name+'<br> <div>'+count+'</div></span> <hr>';
				$('.dash_graph_1').append(span);
			});
			
		})
	}
	
	//Notification
	/*$scope.notification_m = function(tempRouteId){
		console.info('dddd');
		$('.notification_details').toggle();
		//console.info(tempRouteId);
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
	/*function get_config(){
		$('#myFrame').remove();
		$.ajax({
			url : globalURL + 'gtaa_eta/get_configuration ',
			method : 'GET',
			dataType : 'JSON',
			async : true,
			success : function(data) {
				console.info(data.Message[0].x);
				if(data.Message[0].x === 1){
					$('#out-eye').css('display','block');
		    		
					$('#login_background_dashboard_main div,.login_background_dashboard_main div').css('display','none');
				
					$('#login_background_dashboard_main').html('<iframe src="maintenance.html" frameborder="0" scrolling="no" id="myFrame" style="width:100%; height:100vh;"></iframe>');
				 
					//$('.gtaa_navbar_right li:nth-child(5) a').attr('onclick','return false');
					$('.gtaa_navbar_right li:nth-child(5) a, .gtaa_navbar_right li:nth-child(1) a, .gtaa_navbar_right li:nth-child(2) a, .gtaa_navbar_right li:nth-child(3) a, .gtaa_navbar_right li:nth-child(4) a').attr('onclick','return false');
					
				}
				else{
					$scope.operation_ETA_details();
					$scope.alert_list();
					$scope.count();
					$scope.chart_alert();
				}
			}
		});
	}*/
	
	
	var init = function(){
		//$scope.charts();
		//get_config();
		$scope.operation_ETA_details();
		$scope.alert_list();
		$scope.count();
		$scope.chart_alert();
		
	};
	init();
	
});

gtaa.run(function ($rootScope, $interval) {

        $rootScope.AssignedDate = Date;
        $interval(function () {

        },1000)

    });
