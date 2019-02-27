gtaa.controller('operationConsole', function($scope,$http,$interval) {

	
	$scope.globalURL = localStorage.getItem('gtaa_main_url');
	$scope.mapandeta = function() {
		$( ".operation_map" ).load( "html/operation-console/map_and_eta.html" ,function(){
			$scope.operation_ETA_details();
			$scope.passenger_eta();
		});
		
	}

	$scope.op_transit = function() {
		$( ".operation_map" ).load( "html/operation-console/transit_monitoring.html" );
	}
	
	$scope.op_alerts = function() {
		$( ".operation_map" ).load( "html/operation-console/alerts.html" );
		$scope.alert_count();
		$scope.alert_list();
		$scope.highcharts();
	}
	
	$scope.op_reports = function() {
		$( ".operation_map" ).load( "html/operation-console/Reports.html" );
	}
	
	$scope.operation_ETA_details=function(){
		
		//$('.map_eta_table_m tbody tr').remove();
		$http({
			url:$scope.globalURL+'gtaa_eta/operation_ETA_details',
			method:'GET',
		}).then(function successCallback(response){
			
			var abc="";
			$.each(response.data.Message,function(key,value){
				
				abc+='<tr><td>'+value.vehicle_number+'</td><td>'+value.route+'</td><td>'+value.status+'</td><td>'+value.going_towords+'</td><td>'+value.estimated_time+'</td></tr>';
				
			});
			
			$('.map_eta_table_m tbody').html(abc);
			
			var xyz= $(abc).filter('tr').length;
			if(xyz == 1){
				var xyz= abc.split('<tr>')[1].split('<td>')[1].split('</td>')[0];
				$('.bus_ex_arr').html(xyz);
				$('.bus_ex_dep').html('');
			}
		});
		
	}
	$interval(function(){$scope.operation_ETA_details(); },10000);
	$interval(function(){$scope.passenger_eta(); },10000);
	
	$scope.passenger_eta= function(){
		$http({
			url:$scope.globalURL+'gtaa_eta/passenger_ETA_details',
			method:'GET',
		}).then(function successCallback(response){
			/*if(response.data.Message[0].leaving_vehicle_number == response.data.Message[0].reaching_vehicle_number){
				var nxt_exp_a_m= response.data.Message[0].bus_reaching_in.split('(')[0];
				var nxt_exp_dep_m= response.data.Message[0].bus_leaving_in.split('(')[0];
				
			}else{*/
			
			var nxt_exp_a_m= response.data.Message[0].bus_reaching_in.split('(')[0];
			var nxt_exp_dep_m= response.data.Message[0].bus_leaving_in.split('(')[0];
				/*var nxt_exp_a_m= response.data.Message[0].bus_leaving_in.split('(')[0];
				var nxt_exp_dep_m= response.data.Message[0].bus_reaching_in.split('(')[0];*/
				
			/*}*/
			$('.nxt_exp_dep_m').html(nxt_exp_dep_m);
			$('.nxt_exp_a_m').html(nxt_exp_a_m);
			$('.bus_ex_arr').html(response.data.Message[0].leaving_vehicle_number);
			$('.bus_ex_dep').html(response.data.Message[0].reaching_vehicle_number);
		});
	}
	
	//Alert Count
	$scope.alert_count= function(){
		console.info('alert_list');
		$http({
			url:$scope.globalURL+'gtaa_eta/operation_alert_count_details',
			method:'GET',
		}).then(function successCallback(response){
			console.info(response.data[0].Message.stoppage);
				$scope.stoppage=response.data[0].Message.stoppage;
				$('.alerts_stoppage').html(response.data[0].Message.stoppage);
			
				/*$scope.device_alert=response.data.Message[0].device_alert;
				$('.alerts_device_alert').html(response.data.Message[0].device_alert);*/
			
				$scope.halt=response.data[0].Message.halt;
				$('.alerts_halt').html(response.data[0].Message.halt);
			
				$scope.geofence_violation=response.data[0].Message.geofence_violation;
				$('.alerts_geofence_violation').html(response.data[0].Message.geofence_violation);
			
				$scope.route_violation=response.data[0].Message.route_violation;
				$('.alerts_route_violation').html(response.data[0].Message.route_violation);
			
			$scope.total_count= parseInt($scope.stoppage)+parseInt($scope.geofence_violation)+parseInt($scope.route_violation)+parseInt($scope.halt);
			$('.alerts_overall_count').html($scope.total_count);
		})
	}
	
	//Alert List
	$scope.alert_list= function(){
		$http({
			url:$scope.globalURL+'gtaa_eta/operation_alert_details',
			method:'GET',
		}).then(function successCallback(response){
			$('.dash_alerts_summ .hash_alert_div div').remove();
			if(response.data.Message.length == 0){
				var div='<div class="alert_val">';
				div+='<span class="alert_span col-md-12"><p class="pull-left">No Alert Found </p>';
				div+='<p class="pull-right"></p></span>';
				div+='<p class="p-content col-md-12"> &nbsp; </p>'; 
				div+='</div>';
				
				$('.dash_alerts_summ .hash_alert_div').append(div);
			}else{
			$.each(response.data.Message,function(key, value){
				if(value.severity =='High'){
					var class_name='alert_high_i';
				}else if(value.severity =='Medium'){
					var class_name=	'alert_med_i';
				}else if(value.severity =='Low'){
					var class_name=	'alert_low_i';
				}
				var div='<div class="alert_val" main_id="'+value.alert_id+'"><i class="fa fa-dot-circle-o pull-left fa-dot-1 '+class_name+'" aria-hidden="true"></i>';
				div+='<span class="alert_span col-md-12 alert_span_op"><p class="pull-left">Alert Type : '+ value.alert_type+'</p>';
				div+='<p class="pull-right">'+value.alert_time+'</p></span>';
				div+='<p class="p-content col-md-12">Vehicle No : <b>'+value.vehicle_number+'</b>, &nbsp; '+value.discription+'</p>'; 
				div+='</div>';
				
				$('.dash_alerts_summ .hash_alert_div').append(div);
			});
		}
		});
	}
	
	//Onclick alert
	$(document).on('click','.alert_val',function(){
		$http({
			url:$scope.globalURL+'gtaa_eta/operation_alert_discription_details',
			method:'POST',
			data:{
				'alert_id':$(this).attr('main_id')
			},
			dataType:'JSON',
		}).then(function successCallback(response){
			
			var div_details='<div class="col-md-12 alert_popups">';
				div_details+='<div class="col-md-6">Vehicle No : </div><div class="col-md-6">'+response.data.Message[0].vehicle_number+'</div>';
				div_details+='<div class="col-md-6">GPS Id : </div><div class="col-md-6">'+response.data.Message[0].gps_id+'</div>';
				div_details+='<div class="col-md-6">Alert Type : </div><div class="col-md-6">'+response.data.Message[0].alert_type+'</div>';
				div_details+='<div class="col-md-6">Alert Time : </div><div class="col-md-6">'+response.data.Message[0].alert_time+'</div>';
				div_details+='<div class="col-md-6">Alert Description : </div><div class="col-md-6">'+response.data.Message[0].discription+'</div>';
				div_details+='</div>';
			//bootbox.alert(div_details);
				bootbox.hideAll();
			bootbox.alert({ 
				  title: "Alert Details",
				  message: div_details, 
				  callback: function(){ /* your callback code */ }
				})
		})
		
	});
	
	//HighCharts
	$scope.highcharts= function(){
		 var d = new Date();
		    var n = d.getMonth();
		$http({
			url:$scope.globalURL+'gtaa_eta/operation_graph_details',
			method:'POST',
			data:{
				'month':parseInt(n+1),
				'year':'2018'
			},
			dataType:'JSON',
		}).then(function successCallback(response){
			//if (response)
			var data=[];
			var datas=[];
			/*for(i=0; i<response.data.Message.length; i++){
				console.info(response.data.Message[i].alert_type)
				for(j=0; j<response.data.Message.length; j++){
					data[j][0]=response.data.Message[i].alert_type;
					data[j][1]=parseInt(response.data.Message[0].count);
				}
				datas[i].push(data);
			
			}*/
			$.each(response.data[0].Message,function(key,val){
				console.info(key);
				console.info(val);
				//for(i=0; i<response.data.Message.length; i++){
				data[key]=[val.alert_type,val.count]
					//data.push(val.alert_type,val.count);
					//console.info(i);
					datas.push(data);
				//}
				
			})
			console.info(data2);
			var data2=[
			          ['Route Violation',parseInt(response.data[0].Message.route_violation)],
			          ['Geofence Violation',parseInt(response.data[0].Message.geofence_violation)],
			          ['Stoppage Alert',parseInt(response.data[0].Message.stoppage)],
			          ['Halt Alert',parseInt(response.data[0].Message.halt)],
			          ];
			//console.info(data);
			highcharts(data2);
		})
	}
	
	function highcharts(data){
		Highcharts
		.chart(
				'container',
				{
					chart: {
				        type: 'column',
				        backgroundColor: 'rgba(179, 179, 179, 0.25)',
				        style: {
					         color: '#fff',
					      },
				    },
				    credits: {
					    enabled: false
					  },
				    title: {
				        text: ''
				    },
				    subtitle: {
				        text: ''
				    },
				    exporting: { enabled: false },
				    xAxis: {
				        type: 'category',
				        labels: {
				            rotation: -45,
				            style: {
				            	color : '#fff'
				            }
				        }
				    },
				    yAxis: {
				    	gridLineWidth: 1,
		                minorGridLineWidth: 2,
				        title: {
				            text: 'Count'
				        },
				        color : '#fff',
				        labels: {
			                 style: {
			                     color: '#fff'
			                 },
			                 
			            },
				    },
				    legend: {
				        enabled: false
				    },
				    tooltip: {
				        pointFormat: ''
				    },
				    series: [{
				        name: 'Count',
				        data: data,
				        dataLabels: {
				            enabled: true,
				            //rotation: -90,
				            color: '#FFFFFF',
				            align: 'right',
				            format: '{point.y:.1f}', // one decimal
				            y: 10, // 10 pixels down from the top
				            style: {
				                fontSize: '13px',
				                fontFamily: 'Verdana, sans-serif',
				                color:'#fff'
				            }
				    
				        }
				    }]
				});
	}
	
	
	//Report Page
	$(document).on('click','.report_btn', function(){
		$('#loading_message').show();
		var from_date=$('[name="from_date_rep"]').val();
		var to_date=$('[name="to_date_rep"]').val();
		var type_rep=$('[name="type_of_report"]').val();
		

					if (type_rep == 'rv') {
						var url="gtaa_eta/operation_report_route_violation";
						} else if (type_rep == 'gv') {
							var url="gtaa_eta/operation_report_geofence_violation";
						} else if (type_rep == 'halt') {
							var url="gtaa_eta/operation_report_halt";
						} else if (type_rep == 'stp') {
							var url="gtaa_eta/operation_report_stoppage";
						}
					$http({
						url:$scope.globalURL+url,
						method:'POST',
						data:{
							'from_date':from_date,
							'to_date':to_date
						},
						dataType:'JSON',
					}).then(function successCallback(response){
						$('#loading_message').hide();
						$('.dataTables_wrapper').remove();
						var table='<table class="table table-bordered table-responsive ac_table report_table">';
							table+='<thead><tr><th>Vehicle No</th><th>Vehicle Name</th><th>Violation Date</th><th>Violation Time</th><th>Route</th><th>Violation Duration</th><!-- <th></th> --></tr></thead>';
							table+='</thead><tbody class="success table-bordered"></tbody></table>';
							
							$('.gta_rep_m_div').after(table);
							$('.report_table').css('display','block');
						if(response.data.Message=="No Data on selected dates"){
							
						}else{
						
						$.each(response.data.Message,function(key,value){
							var longi='t_'+value.longitude.toString().trim();
	  						var lati='t_'+value.latitude.toString().trim();
	  						//console.info(longi);console.info(lati);
							//$('.report_table tbody').append('<tr><td>'+value.vehicle_number+'</td><td>'+value.vehicle_name+'</td><td>'+value.cap_date+'</td><td>'+value.cap_time+'</td><td>'+value.route_followed+'</td><td>'+value.duration+'</td><td><i class="fa fa-globe wcl_m-icons wcl_share_icon" onclick="test(\"'+longi+'\",\"'+ lati+'\")"></i></td></tr>');
	  						$('.report_table tbody').append('<tr><td>'+value.vehicle_number+'</td><td>'+value.vehicle_name+'</td><td>'+value.cap_date+'</td><td>'+value.cap_time+'</td><td>'+value.route_followed+'</td><td>'+value.duration+'</td></tr>')
						});
						}
						$('.report_table').DataTable( {
		  		            dom: 'Bfrtip',
		  		            "bSort": false,
		  		              buttons: [
		  						{
		  						    extend: 'excelHtml5',
		  						  text:      '<i class="fa fa-file-excel-o"></i>',
		  						    title: 'Route Violated Report',
		  						 },
		  						{
		  						    extend: 'pdfHtml5',
		  						  text:      '<i class="fa fa-file-pdf-o"></i>',
		  						    title: 'Route Violated Report',
		  						},
		  						{
		  						    extend: 'print',
		  						  text:      '<i class="fa fa-files-o"></i>',
		  						    title: 'Route Violated Report',
		  						}
		  		              ]
		  		          });
					});
					
		
	});
	
	function test(long,lat){
		/*var $dialog = $('<div></div>')
           .html('<iframe style="border: 0px; " src="https://www.google.com/maps/?q=' + long + ','+lat+'" width="100%" height="100%"></iframe>')
           .dialog({
               autoOpen: true,
               modal: true,
            dialogClass: 'dialog_fixed,ui-widget-header',
               height: 500,
               width: 1000,
            	draggable:true,
              // title: "Map"
           });*/
		//$dialog.dialog('open');
	}
	
	
	$scope.trigger = function(){
		$('.adconsle_navtabs_operation li:first-child a').trigger('click');
	}
	var init = function(){
		
		//$scope.trigger();
	};
	
	init();
});

