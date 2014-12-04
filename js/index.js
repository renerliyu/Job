$(document).ready(function(){
	$('.index_interested_jobs').hide();
	$.ajax({
		url: 'php/session/session_info.php',
	}).done(function(open){
		if(open!='no user login'){
			if($.cookie('search_jobs')!=null&&$.cookie('search_jobs')!='null'){
				$('.index_interested_jobs').show();
				$.ajax({
					url:"php/jobSearch.php",
					method:'post',
					data:{content:$.cookie('search_jobs')},
					dataType:'json',
				})
				.done(function(datas){	
					var data_anchor=false;
					$.each(datas,function(index,data){
						data_anchor=true;
						if(index==0){
							$('#job_interested').html("");
							$('#job_interested').append('<div class="job_list_item">'+'<div class="row">'+'<div class="col-sm-2">'+'<a href="http:///job/subpage/company_profile.html?email='+data.company_id+'"><img src="img/'+data.company_id+'.jpg" ></a>'+'</div>'+'<div class="col-sm-10">'+'<a href="http:///job/subpage/job_post.html?id='+data.job_id+'"><h4>'+data.title+'</h4></a>'+data.company_name+'<br/>'+'<address>'+data.location+'</address>'+'</div>'+'</div>'+'</div>');
						}else{
							$('#job_interested').append('<div class="job_list_item">'+'<div class="row">'+'<div class="col-sm-2">'+'<a href="http:///job/subpage/company_profile.html?email='+data.company_id+'"><img src="img/'+data.company_id+'.jpg" ></a>'+'</div>'+'<div class="col-sm-10">'+'<a href="http:///job/subpage/job_post.html?id='+data.job_id+'"><h4>'+data.title+'</h4></a>'+data.company_name+'<br/>'+'<address>'+data.location+'</address>'+'</div>'+'</div>'+'</div>');
						}
					});
					if(data_anchor==false){
						$('#job_interested').css('display','none');
					}
				});
			}else{
				$('.index_interested_jobs').hide();
			}						
			$('#user_name_header').html(open);
			$("#sign_in_btn").hide();
			$("#sign_out_btn").show();
			$.ajax({
				url:"php/service/emailBelongTo.php",
				type:"POST",
				dataType:'json',
			}).done(function(types){
				if(types=='user'){
					$('#personal_option').removeClass('hidden');
					$('#profile_link').attr('href','/job/subpage/personal_profile.html?name='+open);
				}else if(types=='company'){
					$("#compan_profile_link").attr('href','/job/subpage/company_profile.html?email='+open);
					$('#company_option').removeClass('hidden');
					$(".index_interested_jobs").hide();
				}
			}).error(function(error){
				alert(error);
			});
		}else{
			$("#sign_in_btn").show();
			$("#sign_out_btn").hide();
			if($.cookie('username')!='null'&&$.cookie('pw')!='null'&&$.cookie('username')!=null&&$.cookie('pw')!=null){
				$.ajax({
					url:"php/userLogin.php",
					type:"POST",
					dataType:'json',
					data:{username:$.cookie('username'),password:$.cookie('pw')},
				}).done(function(data){
					if(data.pass=="Y"){
						$("#sign").modal('hide');
						$('#user_name_header').html(data.username);
						$("#sign_in_btn").hide();
						$("#sign_out_btn").show();
						if(data.firstname==''&&data.name!=''){
							$('#company_option').removeClass('hidden');
							$("#compan_profile_link").attr('href','/job/subpage/company_profile.html?email='+data.username);
						}else{
							$('#personal_option').removeClass('hidden');
							
						}
						
					}else{
						$("#sign_message").html("Sign In Failed, User Name or Password Not Match");
					}
				});
			}
		}
	});
	$("#sign_in_form").validate({
		rules:{
			email:{
				required:true,
				email:true,
			},
			password:{
				required:true,
			}
		},
		message:{
			email:{
				required:"Please fill in the email",
				email:"Your Account Information is incorrect",
			},
			password:{
				required:"Your Account Information is incorrect",
			}
		},
		/*highlight: function(element){
			$(element).parent().addClass('has-error');
			$(element).tooltip("destroy") // Destroy any pre-existing tooltip so we can repopulate with new tooltip content
                  .data("title", error.message)
                  .tooltip(); // Create a new tooltip based on the error messsage we just set in the title
		},
		unhighlight:function(element){
			alert("t");
			$(element).parent().removeClass('has-error').addClass('has-success');
		},*/
		showErrors: function(errorMap, errorList) {
 
          $.each(this.validElements(), function (index, element) {
              var $element = $(element);
			  $element.parent().removeClass('has-error').addClass('has-success');
              $element.data("title", "").tooltip("destroy");
          });
 
          $.each(errorList, function (index, error) {
              var $element = $(error.element);
			  $element.parent().removeClass('has-success').addClass('has-error');
              $element.tooltip("destroy").data("title", error.message).tooltip(); 
          });
        },
		submitHandler:function(form){
			$.ajax({
				url:"php/userLogin.php",
				type:"POST",
				dataType:'json',
				data:{username:$("#email").val(),password:$("#password").val()},
			}).done(function(data){
				if(data.pass=="Y"){
					if($.cookie('search_jobs')!=null&&$.cookie('search_jobs')!='null'){
						$('.index_interested_jobs').show();
						$.ajax({
							url:"php/jobSearch.php",
							method:'post',
							data:{content:$.cookie('search_jobs')},
							dataType:'json',
						})
						.done(function(datas){	
							var data_anchor=false;
							$.each(datas,function(index,data){
								data_anchor=true;
								if(index==0){
									$('#job_interested').html("");
									$('#job_interested').append('<div class="job_list_item">'+'<div class="row">'+'<div class="col-sm-2">'+'<a href="/job/subpage/company_profile.html?email='+data.company_id+'"><img src="img/'+data.company_id+'.jpg" ></a>'+'</div>'+'<div class="col-sm-10">'+'<a href="http:///job/subpage/job_post.html?id='+data.job_id+'"><h4>'+data.title+'</h4></a>'+data.company_name+'<br/>'+'<address>'+data.location+'</address>'+'</div>'+'</div>'+'</div>');
								}else{
									$('#job_interested').append('<div class="job_list_item">'+'<div class="row">'+'<div class="col-sm-2">'+'<a href="/job/subpage/company_profile.html?email='+data.company_id+'"><img src="img/'+data.company_id+'.jpg" ></a>'+'</div>'+'<div class="col-sm-10">'+'<a href="http:///job/subpage/job_post.html?id='+data.job_id+'"><h4>'+data.title+'</h4></a>'+data.company_name+'<br/>'+'<address>'+data.location+'</address>'+'</div>'+'</div>'+'</div>');
								}
							});
							if(data_anchor==false){
								$('#job_interested').css('display','none');
							}
						});
					}else{
						$('.index_interested_jobs').hide();
					}
					if($("#remember_me").is(":checked")){
						$.cookie('username',$("#email").val(),{ expires : 10 });
						var pw=$("#password").val();
						$.cookie('pw',pw,{ expires : 10 });
					}
					$("#sign").modal('hide');
					$('#user_name_header').html(data.username);
					$("#sign_in_btn").hide();
					$("#sign_out_btn").show();
					if(data.firstname==''&&data.name!=''){
						$('#company_option').removeClass('hidden');
						$("#compan_profile_link").attr('href','/job/subpage/company_profile.html?email='+data.username);
					}else{
						$('#personal_option').removeClass('hidden');
						
					}
					
				}else{
					$("#sign_message").html("Sign In Failed, User Name or Password Not Match");
				}
			});
		}
	});
	
	
	$("#sign_up_form").validate({
		rules:{
			sign_up_email:{
				required:true,
				email:true,
			},
			sign_up_password:{
				required:true,
				minlength : 5
			},
			verify:{
				required:true,
				equalTo : "#sign_up_password",
			}
		},
		message:{
			sign_up_email:{
				required:"Please fill in the email",
				email:"Your Account Information is incorrect",
			},
			sign_up_password:{
				required:"Your Account Information is incorrect",
				minlength : "Mush more than 5 characters",
			},
			verify:{
				required:"Please fill in the password",
				equalTo:"Password are not the same",
			}
		},
		showErrors: function(errorMap, errorList) {
 
          $.each(this.validElements(), function (index, element) {
              var $element = $(element);
			  $element.parent().removeClass('has-error').addClass('has-success');
              $element.data("title", "").tooltip("destroy");
          });
 
          $.each(errorList, function (index, error) {
              var $element = $(error.element);
			  $element.parent().removeClass('has-success').addClass('has-error');
              $element.tooltip("destroy").data("title", error.message).tooltip(); 
          });
        },
		submitHandler:function(form){
			$.ajax({
				url:"php/service/userSignUp.php",
				dataType:'json',
				data:{email:$("#sign_up_email").val(),password:$('#sign_up_password').val()},
				type:'POST',
			})
			.done(function(data){
				if(data.result=="Success"){
					$.ajax({
					url:"php/userLogin.php",
					type:"POST",
					dataType:'json',
					data:{username:$("#sign_up_email").val(),password:$("#sign_up_password").val()},
				}).done(function(data){
					if(data.pass=="Y"){
						$("#sign").modal('hide');
						$('#user_name_header').html(data.username);
						$('#sign_in_btn').hide();
						$('#sign_out_btn').show();
						$('#personal_option').removeClass('hidden');
					}else{
						$("#sign_message").html("Sign In Failed, User Name or Password Not Match");
					}
				});
				}else{
					$("#sign_message").html("Email is not available");
				}
			});
			/*$.ajax({
				url:"php/userLogin.php",
				type:"POST",
				dataType:'json',
				data:{username:$("#email").val(),password:$("#password").val()},
			}).done(function(data){
				alert(data.pass=="Y");
				if(data.pass=="Y"){
					$("#sign").modal('hide');
					$('#user_name_header').html(data.username);
					$('#sign_in_btn').text("");
					$('#sign_out_btn').text("Sign Out");
					$('#personal_option').removeClass('hidden');
				}else{
					$("#sign_message").html("Sign In Failed, User Name or Password Not Match");
				}
			});*/
		}
	});

	
});

$(document).on('click','#sign_out_btn',function(){
	$('#sign_out_btn').hide();
	$('#user_name_header').html('');
	$('#personal_option').addClass('hidden');
	$('#company_option').addClass('hidden');
	$('#sign_in_btn').show();
	$.ajax({
		url:"php/session/session_destroy.php",
	}).done(function(data){});
	$.cookie('username',null);
	$.cookie('pw',null);
	$('.index_interested_jobs').hide();
});

$(document).on('click','#profile_link',function(){
	window.location.href = "/job/php/profile_redirect.php?name="+$('#user_name_header').html();;
});
