$(document).scroll(function() {
    var cutoff = $(window).scrollTop();
	if(cutoff>500){
		//alert("200");
	}
    $('.panel').removeClass('top').each(function() {
        if ($(this).offset().top > cutoff) {
			if($(this).attr('id')=='summary_anchor'){
				$(".nav_lists").css("top","-200");
				$(".nav_lists li").removeClass('active');
				$('#summary_tag').closest('li').addClass('active');
			}else if($(this).attr('id')=='experience_anchor'){
				$(".nav_lists li").removeClass('active');
				$('#experience_tag').closest('li').addClass('active');
			}else if($(this).attr('id')=='education_anchor'){
				$(".nav_lists li").removeClass('active');
				$('#education_tag').closest('li').addClass('active');
			}else if($(this).attr('id')=='project_anchor'){
				$(".nav_lists li").removeClass('active');
				$('#project_tag').closest('li').addClass('active');
			}else if($(this).attr('id')=='language_anchor'){
				$(".nav_lists li").removeClass('active');
				$('#language_tag').closest('li').addClass('active');
			}else if($(this).attr('id')=='skills_anchor'){
				$(".nav_lists li").removeClass('active');
				$('#skills_tag').closest('li').addClass('active');
			}
            return false; // stops the iteration after the first one on screen
        }
    });
});
$(document).ready(function(){
	$("#page_header").load("header.html");
	$.ajax({
		type:"POST",
		data:{name:GetURLParameter('name')},
		dataType:"json",
		url:"../php/user_profile_load.php",
		error:function(e){
			console.log(e.message);
		}
	})
	.done(function(data){
		$("#actualname").html("<strong>"+data.firstname+" "+data.lastname+"</strong>");
		$("#user_status").html(data.status);
		$("#user_address").html("<address>"+data.address+"</address>");
		$("#user_phone").html(data.cellphone+"<span style='color:#CCC'>(Mobile)");
		$("#user_email").attr('href',"mailto:"+data.user_email);
		$("#user_email").html(data.contact_email);
		$("#user_websites").html(data.websites);
		if(data.background!=null){$("#user_summary").html(data.background.replace(/\n/g, '<br />'))}else{$("#user_summary").html("")};
		$("#user_experience").html("");
		$.each(data.experience_arr, function(index,exp){
			$content="";
			$content=$content+"<ul class='none_style_ul'>"
			$content=$content+"<p><h5><strong>"+exp.title+"</strong></h5>";
			$content=$content+"<h6>"+exp.company_name+"</h6>";
			$content=$content+"<h6 class='user_info'>"+exp.location+" || "+exp.time_in+" To ";
			if(exp.time_out=='0000-00-00'){
				$content=$content+"Current</h6>";
			}else{
				$content=$content+exp.time_out+"</h6>";
			}
			$content=$content+"<p>"+exp.description.replace(/\n/g, '<br />')+"</p>";
			$content=$content+"</ul></p>";
			$("#user_experience").append($content);
		});
		$("#user_education").html("");
		$.each(data.education_arr, function(index,edu){
			$content="";
			$content=$content+"<ul class='none_style_ul'>"
			$content=$content+"<p><h5><strong>"+edu.name+"</strong></h5>";
			$content=$content+"<h6>"+edu.major+"</h6>";
			$content=$content+"<h6 class='user_info'>"+edu.time_in+" To ";
			if(edu.time_out=='0000-00-00'){
				$content=$content+"Current</h6>";
			}else{
				$content=$content+edu.time_out+"</h6>";
			}
			$.each(edu.description,function(index2,des){
				$content=$content+"<li>"+des.replace(/\n/g, '<br />')+"</li>";
			});
			$content=$content+"</ul></p>";
			$("#user_education").append($content);
		});
		$("#user_project").html("");
		$.each(data.project_arr, function(index,pro){
			$content="";
			$content=$content+"<ul class='none_style_ul'>"
			$content=$content+"<p><h5><strong>"+pro.title+"</strong></h5>";
			$content=$content+"<p>"+pro.project_desc.replace(/\n/g, '<br />')+"</p>";
			$content=$content+"</ul></p>";
			$(user_project).append($content);
		});
		$("#user_language").html(data.language);
		$("#user_skills").html("");
		$.each(data.skills,function(index,skill){
			$("#user_skills").append("<p>"+skill.name+"</p>");
		});
		d=new Date()
		$("#personal_photo").attr('src','../img/'+data.user_email+".jpg?"+d.getTime());
	});
});

$(document).on('click','.sidebar_tag',function(){
	$(".nav_lists li").removeClass('active');
	$(this).closest('li').addClass('active');
	
});

$(document).on('click','#search_results_list li',function(){
	
	$('#job_search_txt').attr('value',$(this).html());
	var search_name=$('#job_search_txt').val();
	var list = new cookieList("MyItems");
	$.cookie('search_jobs',search_name,{ expires : 10 , path:'/'});
	list.add(search_name);
	search_name=search_name.replace('%20',' ');
	window.location.href="/job/subpage/job_list.html?search="+search_name;
});

$(document).on('click',"#job_search_button",function(){
	var search_name=$('#job_search_txt').val();
	search_name=search_name.replace('%20',' ');
	$.cookie('search_jobs',search_name,{ expires : 10 });
	window.location.href="/job/subpage/job_list.html?search="+search_name;
});