var pagenum=1;
var experience=0;
var education=0;
var project=0;
var skill=0;
var skill_arr=[];


$(document).ready(function(){
	var username='';
	$("#page_header").load("header.html");
	$("div[id^='exp_startdate']").datepicker();
	$("div[id^='exp_enddate']").datepicker();
	$.ajax({
		url:'../php/session/session_info.php',
	})
	.done(function(data){
		$("#person_photo_upload").attr('src','../img/'+data+"N.jpg");
		$.ajax({
			type:"POST",
			data:{name:data},
			dataType:"json",
			url:"../php/user_profile_load.php",
			error:function(e){
				console.log(e.message);
			}
		})
		.done(function(data){
			$("#firstname").val("");if(data.firstname!=null){$("#firstname").val(data.firstname);}
			$("#lastname").val("");if(data.lastname!=null){$("#lastname").val(data.lastname);}
			$("#personal_status").val("");if(data.status!=null){$("#personal_status").val(data.status);}
			$("#personal_website").val("");if(data.websites!=null){$("#personal_website").val(data.websites);}
			$("#personal_address").val("");if(data.address!=null){$("#personal_address").val((data.address.split(','))[0]);}
			$("#personal_city").val("");if(data.address!=null){$("#personal_city").val((data.address.split(','))[1]);}
			$("#personal_zip").val("");if(data.address!=null){$("#personal_zip").val((data.address.split(','))[3]);}
			$("#personal_homephone").val("");if(data.homephone!=null){$("#personal_homephone").val(data.homephone);}
			$("#personal_cellphone").val("");if(data.cellphone!=null){$("#personal_cellphone").val(data.cellphone);}
			$("#personal_contact_email").val("");if(data.contact_email!=null){$("#personal_contact_email").val(data.contact_email);}
			$("#personal_summary").val("");if(data.background!=null){$("#personal_summary").val(data.background);}
			$("#education_panels").html("");
			if(data.education_arr!=null){
				$.each(data.education_arr, function(index,edu){
					education++;
					$('#education_panels').append("<div id='education"+education+"' class='panel' data-role='panel'><div class='panel-header'>Education "+education+"<span class='pull-right'><i class='icon-cancel'></i></span></div><div class='panel-content'><div class='row'><div class='form-group col-lg-7'><label>School Name</label><input type='text' class='form-control col-md-7' name='personal_school_name[]' value='"+edu.name+"'/></div></div><div class='row'><div class='form-group col-lg-7'><label>Major</label><input type='text' class='form-control col-md-7' name='personal_education_major[]' value='"+edu.major+"'/></div></div><div class='row'><div class='form-group col-lg-7'><label>Address</label><input type='text' class='form-control col-md-7' name='personal_education_address[]' value='"+edu.address+"'/></div></div><div class='row'><div class='form-group col-lg-7'><label>Degree</label><select class='form-control' name='personal_education_degree[]'><option value='' selected disabled>Select your option</option><option value='1'>High School or equivalent</option><option value='3'>Vocational</option><option value='9'>Some College Coursework Completed</option><option value='4'>Associate Degree</option><option value='5'>Bachelor's Degree</option><option value='6'>Master's Degree</option><option value='7'>Doctorate</option><option value='8'>Professional</option></select></div></div><table class='table'><tr><th class='col-md-3'></th><th class='col-md-5'></th><th class='col-md-4'></th></tr><tr><td><strong>Start Date</strong></td><td><div class='input-control text span7' id='exp_startdate1'><input type='text' name ='edu_startdate[]' value='"+edu.time_in+"'><button class='btn-date'></button></div></td><td><input type='checkbox' name='personal_education_current_check[]'> I currently study here</td></tr><tr><td><strong>End Date</strong></td><td><div class='input-control text span7' id='exp_enddate1'><input type='text' name='edu_enddate[]' value='"+edu.time_out+"'><button class='btn-date'></button></div></td></tr></table><input type='hidden' name='person_education_id[]' value='"+edu.education_id+"'/></div></div>");
					if(edu.degree=='High School or equivalent'){
						$("select[name='personal_education_degree[]']:nth-child("+education+")").eq(education-1).val("1");
					}else if(edu.degree=='Vocational'){
						$("select[name='personal_education_degree[]']:nth-child("+education+")").eq(education-1).val("3");
					}else if(edu.degree=='Some College Coursework Completed'){
						$("select[name='personal_education_degree[]']:nth-child("+education+")").eq(education-1).val("9")
					}else if(edu.degree=='Associate Degree'){
						$("select[name='personal_education_degree[]']:nth-child("+education+")").eq(education-1).val("4");
					}else if(edu.degree=="Bachelor's Degree"){
						$("select[name='personal_education_degree[]']:nth-child("+education+")").eq(education-1).val("5");
					}else if(edu.degree=="Master's Degree"){
						$("select[name='personal_education_degree[]']").eq(education-1).val("6");
					}else if(edu.degree=='Doctorate'){
						$("select[name='personal_education_degree[]']:nth-child("+education+")").eq(education-1).val("7");
					}else if(edu.degree=='Professional'){
						$("select[name='personal_education_degree[]']:nth-child("+education+")").eq(education-1).val("8");
					}
					if(edu.time_out='0000-00-00'){
						$("input[name='personal_education_current_check[]']").prop('checked',true);
						$("input[name='personal_education_current_check[]']").closest('.panel-content').find("input[name='edu_enddate[]']").attr('value','');
						$("input[name='personal_education_current_check[]']").closest('.panel-content').find("input[name='edu_enddate[]']").closest('tr').hide();
					}
					
				});
			}
			$('#experience_panels').html("");
			$.each(data.experience_arr, function(index,exp){
				experience++;
				$('#experience_panels').append("<div id='experience"+experience+"' class='panel' data-role='panel'><div class='panel-header'>Experience "+experience+"<span class='pull-right'><i class='icon-cancel'></i></span></div><div class='panel-content'><div class='row'><div class='form-group col-lg-7'><label>Employer</label><input type='text' class='form-control col-md-7' placeholder='Who did you work for?' value='"+exp.employer+"' name='personal_exp_employer[]'/></div></div><div class='row'><div class='form-group col-lg-7'><label>Company Name</label><input type='text' class='form-control col-md-7' placeholder='Which company did you work for' value='"+exp.company_name+"' name='personal_company_name[]'/></div></div><div class='row'><div class='form-group col-lg-7'><label>Job Title</label><input type='text' class='form-control col-md-7' value='"+exp.title+"'name='personal_exp_title[]'/></div></div><div class='row'><div class='form-group col-lg-7'><label>Location</label><input type='text' class='form-control col-md-7'  value='"+exp.location+"'name='personal_exp_location[]'/></div></div><div class='row'><div class='form-group col-lg-7'><label>Description</label><textarea class='form-control' rows='6' name='personal_exp_description[]'>"+exp.description+"</textarea></div></div><table class='table'><tr><th class='col-md-3'></th><th class='col-md-5'></th><th class='col-md-4'></th></tr><tr><td><strong>Start Date</strong></td><td><div class='input-control text span7' id='exp_startdate1'><input type='text'  name='exp_startdate[]' value='"+exp.time_in+"'><button class='btn-date'></button></div></td><td><input type='checkbox' name='personal_experience_current_check[]'>I currently work here</td></tr><tr><td><strong>End Date</strong></td><td><div class='input-control text span7' id='exp_enddate1'><input type='text' name='exp_enddate[]' value='"+exp.time_out+"'><button class='btn-date'></button></div></td></tr></table><input type='hidden' name='person_exp_id[]' value='"+exp.experience_id+"'/></div></div>");				
			});
			$("#project_panels").html("");
			$.each(data.project_arr,function(index,pro){
				project++;
				$('#project_panels').append("<div id='project"+project+"' class='panel' data-role='panel'><div class='panel-header'>Project "+project+"<span class='pull-right'><i class='icon-cancel'></i></span></div><div class='panel-content'><div class='row'><div class='form-group col-lg-7'><label>Title</label><input type='text' class='form-control col-md-7' placeholder='What kind of project?' name='personal_project_title[]' value='"+pro.title+"'/></div></div><div class='row'><div class='form-group col-lg-7'><label>Description</label><textarea class='form-control' rows='6' name='personal_project_description[]'>"+pro.project_desc+"</textarea><input type='hidden' value='"+pro.project_id+"' name='person_pro_id[]' /> </div></div></div></div>");
			});
			$("#skill_board").html("<input id='skill_anchor' type='hidden'>");
			$.each(data.skills,function(index,data_skill){
				skill++;
				$("#skill_board").append("<div class='col-md-7 skill_wrapper'><span class='skill'>"+data_skill.name+": "+data_skill.year+"</span><i class='icon-pencil'></i><span class='pull-right'><i class='icon-cancel'></i></span></div><input type='hidden' value='"+data_skill.skill_id+"'/>");
			});
			skill_arr=data.skills;
		});
	});
});

$(document).on('click','#person_edit_next',function(){
	$('#personal_edit_stepper').stepper('next');
	if(pagenum<5){
		pagenum++;
		$('.personal_edit').hide();
		$('#personal_edit_page'+pagenum).show();
	}
});

$(document).on('click','#person_edit_prior',function(){
	$('#personal_edit_stepper').stepper('prior');
	if(pagenum>1){
		pagenum--;
		$('.personal_edit').hide();
		$('#personal_edit_page'+pagenum).show();
	}
});

$(document).on('click','#person_edit_first',function(){
	$('#personal_edit_stepper').stepper('first');
	pagenum=1;
	$('.personal_edit').hide();
	$('#personal_edit_page'+pagenum).show();
});

$(document).on('click','#person_edit_last',function(){
	$('#personal_edit_stepper').stepper('last');
	pagenum=5;
	$('.personal_edit').hide();
	$('#personal_edit_page'+pagenum).show();
});


$(document).on('mouseenter',".icon-cancel",function(){
	$(this).removeClass('icon-cancel').addClass('icon-cancel-2');
});

$(document).on('mouseout',".icon-cancel-2",function(){
	$(this).removeClass('icon-cancel-2').addClass('icon-cancel');
});

$(document).on('click','#education_add_more',function(){
	education++;
	$('#education_panels').append("<div id='education"+education+"' class='panel' data-role='panel' style='display:none'><div class='panel-header'>Education "+education+"<span class='pull-right'><i class='icon-cancel'></i></span></div><div class='panel-content'><div class='row'><div class='form-group col-lg-7'><label>School Name</label><input type='text' class='form-control col-md-7' name='personal_school_name[]' value=''/></div></div><div class='row'><div class='form-group col-lg-7'><label>Major</label><input type='text' class='form-control col-md-7' name='personal_education_major[]' value=''/></div></div><div class='row'><div class='form-group col-lg-7'><label>Address</label><input type='text' class='form-control col-md-7' name='personal_education_address[]' value=''/></div></div><div class='row'><div class='form-group col-lg-7'><label>Degree</label><select class='form-control' name='personal_education_degree[]'><option value='' selected disabled>Select your option</option><option value='1'>High School or equivalent</option><option value='3'>Vocational</option><option value='9'>Some College Coursework Completed</option><option value='4'>Associate Degree</option><option value='5'>Bachelor's Degree</option><option value='6'>Master's Degree</option><option value='7'>Doctorate</option><option value='8'>Professional</option></select></div></div><table class='table'><tr><th class='col-md-3'></th><th class='col-md-5'></th><th class='col-md-4'></th></tr><tr><td><strong>Start Date</strong></td><td><div class='input-control text span7' id='exp_startdate1'><input type='text' name ='edu_startdate[]' value=''><button class='btn-date'></button></div></td><td><input type='checkbox' name='personal_education_current_check[]'> I currently study here</td></tr><tr><td><strong>End Date</strong></td><td><div class='input-control text span7' id='exp_enddate1'><input type='text' name='edu_enddate[]' value=''><button class='btn-date'></button></div></td></tr></table><input type='hidden' name='person_education_id[]' value=''/></div></div>");
	$("#education"+education).show("slide", {direction: "right" }, "slow");
});

$(document).on('click','#experience_add_more',function(){
	experience++;
	$('#experience_panels').append("<div id='experience"+experience+"' class='panel' data-role='panel' style='display:none'><div class='panel-header'>Experience "+experience+"<span class='pull-right'><i class='icon-cancel'></i></span></div><div class='panel-content'><div class='row'><div class='form-group col-lg-7'><label>Employer</label><input type='text' class='form-control col-md-7' placeholder='Who did you work for?'  name='personal_exp_employer[]'/></div></div><div class='row'><div class='form-group col-lg-7'><label>Company Name</label><input type='text' class='form-control col-md-7' placeholder='Which company did you work for'  name='personal_company_name[]'/></div></div><div class='row'><div class='form-group col-lg-7'><label>Job Title</label><input type='text' class='form-control col-md-7' name='personal_exp_title[]'/></div></div><div class='row'><div class='form-group col-lg-7'><label>Location</label><input type='text' class='form-control col-md-7' name='personal_exp_location[]'/></div></div><div class='row'><div class='form-group col-lg-7'><label>Description</label><textarea class='form-control' rows='6' name='personal_exp_description[]'></textarea></div></div><table class='table'><tr><th class='col-md-3'></th><th class='col-md-5'></th><th class='col-md-4'></th></tr><tr><td><strong>Start Date</strong></td><td><div class='input-control text span7' id='exp_startdate1'><input type='text'  name='exp_startdate[]'><button class='btn-date'></button></div></td><td><input type='checkbox' name='personal_experience_current_check[]'> I currently work here</td></tr><tr><td><strong>End Date</strong></td><td><div class='input-control text span7' id='exp_enddate1'><input type='text' name='exp_enddate[]'><button class='btn-date'></button></div></td></tr></table><input type='hidden' name='person_exp_id[]' value=''/></div></div>");
	$("#experience"+experience).show("slide", {direction: "right" }, "slow");
});

$(document).on('click','#project_add_more',function(){
	project++;
	$('#project_panels').append("<div id='project"+project+"' class='panel' data-role='panel'><div class='panel-header'>Project "+project+"<span class='pull-right'><i class='icon-cancel'></i></span></div><div class='panel-content'><div class='row'><div class='form-group col-lg-7'><label>Title</label><input type='text' class='form-control col-md-7' placeholder='What kind of project?' name='personal_project_title[]' value=''/></div></div><div class='row'><div class='form-group col-lg-7'><label>Description</label><textarea class='form-control' rows='6' name='personal_project_description[]'></textarea><input type='hidden' value='' name='person_pro_id[]' /></div></div></div></div>");
	$("#project"+project).show("slide", {direction: "right" }, "slow");
});

$(document).on('change','#browse_for_photo',function(){
	var formData = new FormData();
	formData.append('type','personal_photo');
	formData.append('file', $('#browse_for_photo')[0].files[0]);
	$.ajax({
		url:'../php/service/photoupload.php',
		type:'POST',
		data:formData,
		contentType: false,
        processData: false
	})
	.done(function(data){
		d = new Date();
		$("#person_photo_upload").attr("src", '../img/'+$("#user_name_header").html()+".jpg?"+d.getTime());
	});
});

$(document).on('click','#person_edit_finish',function(){
	var educations=[];
	var experiences=[];
	var projects=[];
	var skills=[];
	for(i=0;i<education;i++){
		var education_obj={school_name:'2',major:"",address:"",degree:"",startDate:"",endDate:"",id:""};
		education_obj.school_name=$("input[name='personal_school_name[]']").eq(i).val();
		education_obj.major=$("input[name='personal_education_major[]']").eq(i).val();
		education_obj.address=$("input[name='personal_education_address[]']").eq(i).val();
		education_obj.degree=$("select[name='personal_education_degree[]']").eq(i).val();
		education_obj.startDate=$("input[name='edu_startdate[]']").eq(i).val();
		alert($("input[name='edu_enddate[]']").eq(i).val());
		if($("input[name='edu_enddate[]']").eq(i).val()!=null&&$("input[name='edu_enddate[]']").eq(i).val()!='null'&&$("input[name='edu_enddate[]']").eq(i).val()!=''){
			education_obj.endDate=$("input[name='edu_enddate[]']").eq(i).val();
		}else{
			education_obj.endDate='0000-00-00';
		}
		education_obj.id=$("input[name='person_education_id[]']").eq(i).val();		
		educations[i]=education_obj;
	}
	for(i=0;i<experience;i++){
		var experience_obj={id:'',company_name:'2',title:"",location:"",time_in:"",time_out:"",description:"",employer:""};
		experience_obj.company_name=$("input[name='personal_company_name[]']").eq(i).val();
		experience_obj.title=$("input[name='personal_exp_title[]']").eq(i).val();
		experience_obj.location=$("input[name='personal_exp_location[]']").eq(i).val();
		experience_obj.time_in=$("input[name='exp_startdate[]']").eq(i).val();
		if($("input[name='exp_enddate[]']").eq(i).val()!=null&&$("input[name='exp_enddate[]']").eq(i).val()!='null'&&$("input[name='exp_enddate[]']").eq(i).val()!=''){
			experience_obj.time_out=$("input[name='exp_enddate[]']").eq(i).val();
		}else{
			experience_obj.time_out='0000-00-00';
		}
		experience_obj.description=$("textarea[name='personal_exp_description[]']").eq(i).val();
		experience_obj.employer=$("input[name='personal_exp_employer[]']").eq(i).val();
		experience_obj.id=$("input[name='person_exp_id[]']").eq(i).val();
		experiences[i]=experience_obj;
	}
	for(i=0;i<project;i++){
		var project_obj={id:'',title:"",description:""};
		project_obj.title=$("input[name='personal_project_title[]']").eq(i).val();
		project_obj.description=$("textarea[name='personal_project_description[]']").eq(i).val();
		project_obj.id=$("input[name='person_pro_id[]']").eq(i).val();
		projects[i]=project_obj;
	}
	for(i=0;i<skill;i++){
		var skill_obj={id:'',name:'',year:""};
		skill_obj.id=$(".skill").eq(i).closest('.skill_wrapper').next().val();
		skill_obj.name=($(".skill").eq(i).html().split(": "))[0];
		skill_obj.year=($(".skill").eq(i).html().split(": "))[1];
		skills[i]=skill_obj;
	}
	var info={
		firstname:$("#firstname").val(),
		lastname:$("#lastname").val(),
		status:$("#personal_status").val(),
		websites:$("#personal_website").val(),
		summary:$("#personal_summary").val(),
		address:$("#personal_address").val()+", "+$("#personal_city").val()+", "+$("#personal_state").val()+", "+$("#personal_zip").val(),
		homephone:$("#personal_homephone").val(),
		cellphone:$("#personal_cellphone").val(),
		contact_email:$("#personal_contact_email").val(),
		education:educations,
		experiences:experiences,
		projects:projects,
		skills:skills
	};
	$.ajax({
		url:"../php/service/setPersonalProfile.php",
		type:"POST",
		data:info,
	})
	.done(function(data){
		alert("done");
	});
});

$(document).on('click',"#education_panels i",function(){
	var panel=$(this).closest('.panel');
	var panelNum=$(panel).attr('id').substring($(panel).attr('id').length-1);
	$(panel).hide('slow',function(){
		$(panel).remove();
		education--;
		$.each($("#education_panels .panel"),function(index,panel_left){
			if(index+1>=panelNum){
				$(panel_left).attr('id','education'+(index+1));
				$(panel_left).children(".panel-header").html("Education "+(index+1)+"<span class='pull-right'><i class='icon-cancel'></i></span>");
			}
		});
	});
});

$(document).on('click',"#experience_panels i",function(){
	var panel=$(this).closest('.panel');
	var panelNum=$(panel).attr('id').substring($(panel).attr('id').length-1);
	$(panel).hide('slow',function(){
		$(panel).remove();
		experience--;
		$.each($("#experience_panels .panel"),function(index,panel_left){
			if(index+1>=panelNum){
				$(panel_left).attr('id','experience'+(index+1));
				$(panel_left).children(".panel-header").html("Experience "+(index+1)+"<span class='pull-right'><i class='icon-cancel'></i></span>");
			}
		});
	});
});

$(document).on('click',"#project_panels i",function(){
	var panel=$(this).closest('.panel');
	var panelNum=$(panel).attr('id').substring($(panel).attr('id').length-1);
	$(panel).hide('slow',function(){
		$(panel).remove();
		project--;
		$.each($("#project_panels .panel"),function(index,panel_left){
			if(index+1>=panelNum){
				$(panel_left).attr('id','project'+(index+1));
				$(panel_left).children(".panel-header").html("Project "+(index+1)+"<span class='pull-right'><i class='icon-cancel'></i></span>");
			}
		});
	});
});

$(document).on('click',"#personal_edit_page5 .icon-cancel-2",function(){
	$(this).closest('.skill_wrapper').next().remove();
	$(this).closest('.skill_wrapper').remove();
	skill--;
});

$(document).on('mouseover',".skill_wrapper",function(){
	$(this).children('.skill').next().show();
	$(this).children('.skill').next().next().children('i').show();
});

$(document).on('mouseout',".skill_wrapper",function(){
	$(this).children('.skill').next().hide();
	$(this).children('.skill').next().next().children('i').hide();
});

$(document).on('click',".skill_wrapper .icon-pencil",function(){
	$skill=($(this).closest('.skill_wrapper').children(".skill").html().split(": "))[0];
	$year=($(this).closest('.skill_wrapper').children(".skill").html().split(": "))[1];
	var anchor=$(this).closest('.skill_wrapper').prev();
	
	$(this).closest('.skill_wrapper').replaceWith("<div class='col-md-7 skill_wrapper'><table class='table'><tr><th class='col-md-2'></th><th class='col-md-4'></th><th class='col-md-3'></th><th class='col-md-3'></th></tr><tr><td><label>Skill</label></td><td colspan=2><input type='text' class='form-control' placeholder='Skill' name='skill_edit[]' value='hello'/></td><td></td></tr><tr><td><label>Year</label></td><td colspan=2><select class='form-control' name='skill_year[]'><option value='1'>1-2 yr.</option><option value='2'>3-5 yr.</option><option value='3'>More than 5 yr.</option></select></td><td></td></tr><tr><td></td><td><input type='text' class='btn btn-primary' value='Save'name='skill_save[]'></button></td><td><input type='text' class='btn btn-default' value='Cancel' name='skill_cancel[]'></button></td><td></td></tr></table></div>");
	;
	$(anchor).next().find("input[name='skill_edit[]']").attr("value",$skill);
	if($year=="1-2 yr."){
		$(anchor).next().find("select[name='skill_year[]']").attr("value",'1');
	}else if($year=="3-5 yr."){
		$(anchor).next().find("select[name='skill_year[]']").attr("value",'2');
	}else if($year=="More than 5 yr."){
		$(anchor).next().find("select[name='skill_year[]']").attr("value",'3');
	}
});

$(document).on('click',"input[name='skill_save[]']",function(){
	$skill=$(this).closest('.skill_wrapper').find("input[name='skill_edit[]']").val();
	$year=$(this).closest('.skill_wrapper').find("select[name='skill_year[]']").val();
	if($year==1){
		$year="1-2 yr.";
	}else if($year==2){
		$year="3-5 yr.";
	}else if($year==3){
		$year="More than 5 yr.";
	}
	$(this).closest('.skill_wrapper').replaceWith("<div class='col-md-7 skill_wrapper'><span class='skill'>"+$skill+": "+$year+"</span><i class='icon-pencil'></i><span class='pull-right'><i class='icon-cancel'></i></span></div>");
});

$(document).on('click',"#personal_edit_page5 .icon-plus",function(){
	$("#skill_anchor").after("<div class='col-md-7 skill_wrapper' style='display:none'><table class='table'><tr><th class='col-md-2'></th><th class='col-md-4'></th><th class='col-md-3'></th><th class='col-md-3'></th></tr><tr><td><label>Skill</label></td><td colspan=2><input type='text' class='form-control' placeholder='Skill' name='skill_edit[]' /></td><td></td></tr><tr><td><label>Year</label></td><td colspan=2><select class='form-control' name='skill_year[]'><option value='1'>1-2 yr.</option><option value='2'>3-5 yr.</option><option value='3'>More than 5 yr.</option></select></td><td></td></tr><tr><td></td><td><input type='text' class='btn btn-primary' value='Save'name='skill_save[]'></button></td><td><input type='text' class='btn btn-default' value='Cancel' name='skill_cancel[]'></button></td><td></td></tr></table></div><input type='hidden' value=''/>");
	$("#skill_anchor").next().show("slide", {direction: "right" }, "slow");
	skill++;
});

$(document).on('click',"input[name='skill_cancel[]']",function(){
	if($(this).closest('.skill_wrapper').next().val()==""){
		$(this).closest('.skill_wrapper').next().remove();
		$(this).closest('.skill_wrapper').hide('slide',{direction:'right'},'slow',function(){
			$(this).closest('.skill_wrapper').remove();
		});
	}else{
		var id_value=$(this).closest('.skill_wrapper').next().val();
		$.each(skill_arr,function(index,skill_data){
			if(skill_data.skill_id==id_value){
				$("input[name='skill_cancel[]']").closest('.skill_wrapper').replaceWith("<div class='col-md-7 skill_wrapper'><span class='skill'>"+skill_data.name+": "+skill_data.year+"</span><i class='icon-pencil'></i><span class='pull-right'><i class='icon-cancel'></i></span></div>");
			}
		});
		
	}
});

$(document).on('click',"input[name='personal_education_current_check[]']",function(){
	if($(this).is(":checked")){
		$(this).closest('.panel-content').find("input[name='edu_enddate[]']").attr('value','');
		$(this).closest('.panel-content').find("input[name='edu_enddate[]']").closest('tr').hide();
	}else{
		$(this).closest('.panel-content').find("input[name='edu_enddate[]']").closest('tr').show();
	}
});

$(document).on('click',"input[name='personal_experience_current_check[]']",function(){
	if($(this).is(":checked")){
		$(this).closest('.panel-content').find("input[name='exp_enddate[]']").attr('value','');
		$(this).closest('.panel-content').find("input[name='exp_enddate[]']").closest('tr').hide();
	}else{
		$(this).closest('.panel-content').find("input[name='exp_enddate[]']").closest('tr').show();
	}
});

$(document).on('keyup','#personal_homephone',function(e){
	if(e.keyCode==8){
	}else{
		if($('#personal_homephone').val().length>=1&&$('#personal_homephone').val().length<5){
			if(($('#personal_homephone').val())[0]!='('){
				var homephone_strings=$('#personal_homephone').val().split('');
				for(i=$('#personal_homephone').val().length;i>0;i--){
					homephone_strings[i]=homephone_strings[i-1];
				}
				homephone_strings[0]='(';
				$('#personal_homephone').attr('value',homephone_strings.join(''));
			}
		}else if($('#personal_homephone').val().length>=5&&$('#personal_homephone').val().length<9){
			if(($('#personal_homephone').val())[0]!='('){
				var homephone_strings=$('#personal_homephone').val().split('');
				for(i=$('#personal_homephone').val().length;i>0;i--){
					homephone_strings[i]=homephone_strings[i-1];
				}
				homephone_strings[0]='(';
				$('#personal_homephone').attr('value',homephone_strings.join(''));
			}
			if(($('#personal_homephone').val())[4]!=')'){
				var homephone_strings=$('#personal_homephone').val().split('');
				for(i=$('#personal_homephone').val().length;i>4;i--){
					homephone_strings[i]=homephone_strings[i-1];
				}
				homephone_strings[4]=')';
				$('#personal_homephone').attr('value',homephone_strings.join(''));
			}
		}else if($('#personal_homephone').val().length>=9){
			if(($('#personal_homephone').val())[0]!='('){
				var homephone_strings=$('#personal_homephone').val().split('');
				for(i=$('#personal_homephone').val().length;i>0;i--){
					homephone_strings[i]=homephone_strings[i-1];
				}
				homephone_strings[0]='(';
				$('#personal_homephone').attr('value',homephone_strings.join(''));
			}
			if(($('#personal_homephone').val())[4]!=')'){
				var homephone_strings=$('#personal_homephone').val().split('');
				for(i=$('#personal_homephone').val().length;i>4;i--){
					homephone_strings[i]=homephone_strings[i-1];
				}
				homephone_strings[4]=')';
				$('#personal_homephone').attr('value',homephone_strings.join(''));
			}
			if(($('#personal_homephone').val())[8]!='-'){
				var homephone_strings=$('#personal_homephone').val().split('');
				for(i=$('#personal_homephone').val().length;i>8;i--){
					homephone_strings[i]=homephone_strings[i-1];
				}
				homephone_strings[8]='-';
				$('#personal_homephone').attr('value',homephone_strings.join(''));
			}
		}
	}		
});

$(document).on('keyup','#personal_cellphone',function(e){
	if(e.keyCode==8){
	}else{
		if($('#personal_cellphone').val().length>=1&&$('#personal_cellphone').val().length<5){
			if(($('#personal_cellphone').val())[0]!='('){
				var cellphone_strings=$('#personal_cellphone').val().split('');
				for(i=$('#personal_cellphone').val().length;i>0;i--){
					cellphone_strings[i]=cellphone_strings[i-1];
				}
				cellphone_strings[0]='(';
				$('#personal_cellphone').attr('value',cellphone_strings.join(''));
			}
		}else if($('#personal_cellphone').val().length>=5&&$('#personal_cellphone').val().length<9){
			if(($('#personal_cellphone').val())[0]!='('){
				var cellphone_strings=$('#personal_cellphone').val().split('');
				for(i=$('#personal_cellphone').val().length;i>0;i--){
					cellphone_strings[i]=cellphone_strings[i-1];
				}
				cellphone_strings[0]='(';
				$('#personal_cellphone').attr('value',cellphone_strings.join(''));
			}
			if(($('#personal_cellphone').val())[4]!=')'){
				var cellphone_strings=$('#personal_cellphone').val().split('');
				for(i=$('#personal_cellphone').val().length;i>4;i--){
					cellphone_strings[i]=cellphone_strings[i-1];
				}
				cellphone_strings[4]=')';
				$('#personal_cellphone').attr('value',cellphone_strings.join(''));
			}
		}else if($('#personal_cellphone').val().length>=9){
			if(($('#personal_cellphone').val())[0]!='('){
				var cellphone_strings=$('#personal_cellphone').val().split('');
				for(i=$('#personal_cellphone').val().length;i>0;i--){
					cellphone_strings[i]=cellphone_strings[i-1];
				}
				cellphone_strings[0]='(';
				$('#personal_cellphone').attr('value',cellphone_strings.join(''));
			}
			if(($('#personal_cellphone').val())[4]!=')'){
				var cellphone_strings=$('#personal_cellphone').val().split('');
				for(i=$('#personal_cellphone').val().length;i>4;i--){
					cellphone_strings[i]=cellphone_strings[i-1];
				}
				cellphone_strings[4]=')';
				$('#personal_cellphone').attr('value',cellphone_strings.join(''));
			}
			if(($('#personal_cellphone').val())[8]!='-'){
				var cellphone_strings=$('#personal_cellphone').val().split('');
				for(i=$('#personal_cellphone').val().length;i>8;i--){
					cellphone_strings[i]=cellphone_strings[i-1];
				}
				cellphone_strings[8]='-';
				$('#personal_cellphone').attr('value',cellphone_strings.join(''));
			}
		}
	}		
});
					

$(document).on('click',"div[id^='exp_startdate']",function(){$("div[id^='exp_startdate']").datepicker();});
$(document).on('click',"div[id^='exp_enddate']",function(){$("div[id^='exp_enddate']").datepicker();});

$(document).on('click',".panel-header",function(){
	$(this).closest('.panel').find('.panel-content').toggle();
});