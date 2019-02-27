$(function() {
    $('#toggle-two').bootstrapToggle({
      on: 'ON',
      off: 'OFF'
    });
    
    $(document).on( 'change', '#toggle-two',function() {
    	if($(this).prop('checked') === true){
    		$('#out-eye').css('display','block');
    		$('#myFrame').remove();
			$('#login_background_dashboard_main div,.login_background_dashboard_main div').hide();
		
			$('#login_background_dashboard_main,.login_background_dashboard_main').append('<iframe src="maintenance.html" frameborder="0" scrolling="no" id="myFrame" style="width:100%; height:100vh; position:fixed; "></iframe>');
		 
			$('.gtaa_navbar_right li:nth-child(5) a').attr('onclick','return false');
			$('.gtaa_navbar_right li:nth-child(1) a, .gtaa_navbar_right li:nth-child(2) a, .gtaa_navbar_right li:nth-child(3) a, .gtaa_navbar_right li:nth-child(4) a').attr('onclick','return false');
			
    	}else if($(this).prop('checked') === false){
    		$('#out-eye').css('display','none');
    	}
    	 
    }); 
    
    $(document).on('click','.out-eye',function(){
    	window.location.href='';
    });
  })