$(document).on("keyup", '#job_search_txt',function(){
	$.ajax({
		url:"../php/jobSearch.php",
		method:'post',
		data:{content:$('#job_search_txt').val()},
		dataType:'json',
	})
	.done(function(datas){
		var data_anchor=false;
		$.each(datas,function(index,data){
			$('#search_results_list').css('display','block');
			data_anchor=true;
			if(index==0){
				$('#search_results_list').html("");
				$('#search_results_list').append('<li>'+data.title+'</li>');
			}else{
				$('#search_results_list').append('<li>'+data.title+'</li>');
			}
		});
		if(data_anchor==false){
			$('#search_results_list').css('display','none');
		}
	});
});