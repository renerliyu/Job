$(document).ready(function(){
	
	$.ajax({
		url:'../php/session/session_info.php',
	})
	.done(function(data){
		$('#user_name_header').html(data);
		$.ajax({
			url:"../php/service/emailBelongTo.php",
			type:"POST",
			dataType:'json',
		}).done(function(types){
			if(types=='user'){
				$('#personal_option').removeClass('hidden');
				$('#profile_link').attr('href','/job/subpage/personal_profile.html?name='+data);
			}else if(types=='company'){
				$("#compan_profile_link").attr('href','/job/subpage/company_profile.html?email='+data);
				$('#company_option').removeClass('hidden');
			}
		}).error(function(error){
			alert(error);
		});
	});
});

$(document).on('click','#sign_out_btn',function(){
	$.ajax({
		url:'../php/session/session_destroy.php',
	})
	.done(function(data){
		window.location.href="/job";
	});
	$('#personal_option').addClass('hidden');
	$('#company_option').addClass('hidden');
	
});