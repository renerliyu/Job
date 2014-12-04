var pagenum=1;
var experience=0;
var education=0;
var project=0;
var skill=0;
var skill_arr=[];
var username='';


$(document).ready(function(){
	$("#page_header").load("header.html");
	$('.add_job_detail').hide();
	$('#add_job_detail0').fadeIn(2000);
	$("#add_job_result").hide();
	$.ajax({
		url:'../php/session/session_info.php',
	})
	.done(function(data){
		username=data;
		$.ajax({
			type:'POST',
			data:{company_email:data},
			dataType:'json',
			url:'../php/service/jobsLoad.php',
		}).done(function(jobs){
			$.each(jobs,function(index,job){
				var append_content=''
				if(index==0){
					$('.jobs_wrapper').html("");
				}
				$.ajax({
					url:'../php/service/getApplication.php',
					type:'POST',
					data:{job_id:job.job_id},
					dataType:'json',
				}).done(function(users){
					append_content='';
					var desc='';
					if(job.description!=null){
						desc=job.description.replace(/\n/g, '<br />');
					}
					var require='';
					if(job.requirement!=null){
						require=job.requirement.replace(/\n/g, '<br />');
					}
					append_content=append_content+"<div class='panel'><div class='panel-header'><strong>"+job.title+" </strong><small>"+job.location+"</small><i class='icon-cancel pull-right'></i></div><div class='panel-content'><table class='table striped hovered'><tr><th class='col-md-3'></th><th class='col-md-7'></th><th class='col-md-2'></th></tr><tr><td><strong>ID</strong></td><td name='job_id[]'>"+job.job_id+"</td><td></td></tr><tr><td><strong>Description</strong></td><td name='job_description[]'>"+desc+"</td><td></td></tr><tr><td><strong>Requirement</strong></td><td name='job_requirement[]'>"+require+"</td><td></td></tr><tr><td><strong>Employment Type</strong></td><td name='job_employment_type[]'>"+job.employment_type+"</td><td></td></tr><tr><td><strong>People applied</strong></td><td name='job_people_applied[]'>";
					$.each(users,function(index,user){
						append_content=append_content+"<p>"+"<a href='/job/subpage/personal_profile.html?name="+user.user_email+"'>"+user.firstname+" "+user.lastname+"</a></p>";
					});	
					append_content=append_content+"</td><td></td></tr></table></div></div>";	
					$('.jobs_wrapper').append(append_content);		
					$(".panel-content").hide();					
				});
			});
			
			$(".panel-content").hide();
		});
	});

});

$(document).on('click',".panel-header",function(){
	$(this).next().toggle('slow');
});

$(document).on('click','.nextButton',function(){
	var detailNum=($(this).closest("div[id^='add_job_detail']").attr('id'))[14];
	$('#add_job_detail'+detailNum).hide();
	var numNext=parseInt(detailNum)+1;
	if(numNext>6){
		numNext = numNext-7;
	}
	$('#add_job_detail'+numNext).show('slide',{direction:'right'},'slow',function(){
		$('#add_job_detail'+numNext+' input').focus();
		$('#add_job_detail'+numNext+' textarea').focus();
	});
	
});

$(document).on('click','.glyphicon-remove,.cancelButton',function(){
	$(this).closest('.add_job_detail').fadeOut(500);
	$('.add_job_detail input').attr('value','');$('#new_job_description').attr('value','');$('#new_job_requirement').attr('value','');
	$('.add_job_block').animate({
		width:"150px",
		height:"30px",
		marginLeft:'20px',
		padding:"5px",
	},1000,function(){
		$('.add_job_block').prepend('<label> &nbsp;&nbsp;Add More Jobs...</label>');
	});
	$('.add_job_block').addClass("small_add_job");
});

$(document).on('click','.add_job_block>label',function(){
	$('#add_job_detail0').fadeIn(500);
	$(this).remove();
	$('.add_job_block').animate({
		width:"610px",
		height:"183px",
		marginLeft:'180px',
		padding:"0px",
	},1000,function(){
		$('.add_job_block').height('auto');
	});
	$('.add_job_block').removeClass("small_add_job");
});

$(document).on('click','#add_job_done',function(){
	$.ajax({
		type:'POST',
		url:'../php/service/addJob.php',
		dataType:'json',
		data:{
			title:$('#new_job_title').val(),
			employment_type:$('#new_job_employment_type').val(),
			experience:$('#new_job_experience').val(),
			address:$('#new_job_address').val(),
			description:$('#new_job_description').val(),
			requirement:$('#new_job_requirement').val(),
		}
	})
	.done(function(data){
		
		$("#add_job_result").html(data);
		if(data=='New Job Added!'){
			$("#add_job_result").removeClass('alert-danger').addClass('alert-success');
		}else{
			$("#add_job_result").removeClass('alert-success').addClass('alert-danger');
		}
		$("#add_job_result").fadeIn(1000).delay('3000').hide(3000);
		$.ajax({
			type:'POST',
			data:{company_email:username},
			dataType:'json',
			url:'../php/service/jobsLoad.php',
		}).done(function(jobs){
			$.each(jobs,function(index,job){
				if(index==0){
					$('.jobs_wrapper').html("");
				}
				var desc='';
				if(job.description!=null){
					desc=job.description.replace(/\n/g, '<br />');
				}
				var require='';
				if(job.requirement!=null){
					require=job.requirement.replace(/\n/g, '<br />');
				}
				$('.jobs_wrapper').append("<div class='panel'><div class='panel-header'><strong>"+job.title+" </strong><small>"+job.location+"</small><i class='icon-cancel pull-right'></i></div><div class='panel-content'><table class='table striped hovered'><tr><th class='col-md-3'></th><th class='col-md-7'></th><th class='col-md-2'></th></tr><tr><td><strong>ID</strong></td><td name='job_id[]'>"+job.job_id+"</td><td></td></tr><tr><td><strong>Description</strong></td><td name='job_description[]'>"+desc+"</td><td></td></tr><tr><td><strong>Requirement</strong></td><td name='job_requirement[]'>"+require+"</td><td></td></tr><tr><td><strong>Employment Type</strong></td><td name='job_employment_type[]'>"+job.employment_type+"</td><td></td></tr><tr><td><strong>People applied</strong></td><td name='job_people_applied[]'>"+"???"+"</td><td></td></tr></table></div></div>");
			});
				$(".panel-content").hide();
			});
		$(".add_job_detail input").attr('value','');
		$('#new_job_description').attr('value','');$('#new_job_requirement').attr('value','');
	})
	.fail(function(data) {
		alert( data );
	 });
	 
});

$(document).on('mouseover',".jobs_wrapper i",function(){
	$(this).removeClass("icon-cancel").addClass("icon-cancel-2");
});

$(document).on('mouseout',".jobs_wrapper i",function(){
	$(this).removeClass("icon-cancel-2").addClass("icon-cancel");
});


$(document).on('click',".jobs_wrapper i",function(){
	var panel=$(this).closest('.panel');
	$(panel).hide('slow',function(){
		$.ajax({
			type:'POST',
			url:'../php/service/removeJob.php',
			dataType:'json',
			data:{id:$(panel).find('td[name="job_id[]"]').html()}
		})
		.done(function(){
			
		});
		$(panel).remove();
		
	});
});





