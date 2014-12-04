var job_id='';
var company_id='';
$(document).ready(function(){
	$("#page_header").load("header.html");
	var search_name='';
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++)
		{
			var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == 'id')
		{
			search_name = sParameterName[1];
		}
	}
	job_id=search_name;
	$.ajax({
		type:"POST",
		dataType:"json",
		url:"../php/job_post.php",
		data:{id:search_name},
		error:function(e){
			console.log(e.message);
		}
	})
	.done(function(data){
		$("#job_title").html("<strong>"+data.title+"</strong>");
		$("#job_location").html("<address>"+data.location+"</address>");
		$("#job_employment_type").html(data.employment_type);
		$("#company_email").html(data.company_email);
		$("#job_experience").attr('href',"mailto:"+data.company_email);		
		$("#job_experience").html(data.experience)
		$("#job_desc").html("");
		if(data.description!=null){$("#job_desc").html(data.description.replace(/\n/g, '<br />'));}
		$("#job_require").html("");
		if(data.requirement!=null){$("#job_require").html(data.requirement.replace(/\n/g, '<br />'));}
		$("#company_info").html("");
		if(data.company!=null&&data.company.description!=null){$("#company_info").html(data.company.description.replace(/\n/g, '<br />'));}
		d = new Date();
		$("#job_post_company_icon img").attr('src','../img/'+data.company.user_email+'.jpg?'+d.getTime());
		$("#job_post_company_icon a").attr('href',"/job/subpage/company_profile.html?email="+data.company.user_email);
		company_id=data.company.user_email;
	});
});

$(document).on('click',"#job_application_btn",function(){
	$.ajax({
		url:"../php/service/applyJob.php",
		data:{job_id:job_id},
		type:'POST',
		dataType:'json',
	})
	.done(function(data){
		if(data==true){
			$("#apply_result").removeClass("alert-danger").addClass("alert-success").html("Apply Successfully").show();
			setInterval(function(){$("#apply_result").hide('slow');},3000);
		}else if(data==false){
			$("#apply_result").removeClass("alert-success").addClass("alert-danger").html("Something is wrong").show();
		}
	})
	.error(
		function(data){
		alert(data);
	});
});