$(document).ready(function(){
	$("#page_header").load("header.html");
	var search_name='';
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++)
		{
			var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == 'search')
		{
			search_name = sParameterName[1];
		}
	}
	search_name=search_name.replace('%20',' ');
	$.ajax({
		url:"../php/jobSearch.php",
		method:'post',
		data:{content:search_name},
		dataType:'json',
	})
	.done(function(datas){	
		var data_anchor=false;
		$.each(datas,function(index,data){
			data_anchor=true;
			if(index==0){
				$('#jobList').html("");
				$('#jobList').append('<div class="job_list_item">'+'<div class="row">'+'<div class="col-sm-2">'+'<a href="/job/subpage/company_profile.html?email='+data.company_id+'"><img src="../img/'+data.company_id+'.jpg" ></a>'+'</div>'+'<div class="col-sm-10">'+'<a href="/job/subpage/job_post.html?id='+data.job_id+'"><h4>'+data.title+'</h4></a>'+data.company_name+'<br/>'+'<address>'+data.location+'</address>'+'</div>'+'</div>'+'</div>');
			}else{
				$('#jobList').append('<div class="job_list_item">'+'<div class="row">'+'<div class="col-sm-2">'+'<a href="/job/subpage/company_profile.html?email='+data.company_id+'"><img src="../img/'+data.company_id+'.jpg" ></a>'+'</div>'+'<div class="col-sm-10">'+'<a href="/job/subpage/job_post.html?id='+data.job_id+'"><h4>'+data.title+'</h4></a>'+data.company_name+'<br/>'+'<address>'+data.location+'</address>'+'</div>'+'</div>'+'</div>');
			}
		});
		if(data_anchor==false){
			$('#jobList').css('display','none');
		}
	});
});

$(document).on('click','#search_results_list li',function(){
	$('#job_search_txt').attr('value',$(this).html());
	window.location.href="/job/subpage/job_list.html?search="+$('#job_search_txt').val();
});

$(document).on('click',"#job_search_button",function(){
	window.location.href="/job/subpage/job_list.html?search="+$('#job_search_txt').val();
});



