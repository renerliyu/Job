$(document).ready(function(){
	var pusher = new Pusher('c96fc50dde3a6a67dcd1');
	var channel=pusher.subscribe('comments');
	var company_email='';
	$("#page_header").load("header.html");
	var search_name='';
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++)
		{
			var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == 'email')
		{
			search_name = sParameterName[1];
		}
	}
	search_name=search_name.replace('%20',' ');
	$.ajax({
		type:"POST",
		dataType:"json",
		url:"../php/company_profile_load.php",
		data:{company_email:search_name},
		error:function(e){
			console.log(e.message);
		}
	}).done(function(data){
		$("#company_desc_head").html(data.name);
		$("#company_desc_content").html(data.description);
		$("#producate_desc").html(data.product_service);
		
		$com_detail="";
		$("#company_detail").append("<li><strong>Industry: </strong>"+data.industry+"</li>");
		$("#company_detail").append("<li><strong>Type: </strong>"+data.type+"</li>");
		$("#company_detail").append("<li><strong>Size: </strong>"+data.company_size+"</li>");
		$("#company_detail").append("<li><strong>Founded: </strong>"+data.founded+"</li>");
		var address=data.street+", "+data.city+", "+data.state;
		$("#com_contact_detail").append("<li><strong>Address: </strong>"+address+"</li>");
		$("#com_contact_detail").append("<li><strong>Email: </strong>"+data.user_email+"</li>");
		$("#com_contact_detail").append("<li><strong>Phone: </strong>"+data.phone+"</li>");
		d = new Date();
		$(".company_icon img").attr('src','../img/'+data.user_email+'.jpg?'+d.getTime());
		$("#company_map").append("<img src='http://maps.googleapis.com/maps/api/staticmap?center="+address.replace(' ','+')+"&zoom=15&size=600x300&maptype=roadmap"+"&markers=color:red%7Clabel:A%7C"+address.replace(' ','+')+"&sensor=false' />");
		company_email=data.user_email;
		channel.bind(data.user_email,function(data){
			$('#contact_online_msg').append("<strong>"+data.name+"</strong> says: "+data.comment+"<br/>");
			var i=0;
			var blink = function() {
				i++;
				if(i>8){return false;}
				$('#top_div span').animate({
					opacity: '0'
				},1000,function(){
					$(this).animate({
						opacity: '1'
					}, blink);
				});
			}
			if($('#top_div span').hasClass('glyphicon-eject')){
				blink();
			}
		});
	});
					
	$('#contact_box .glyphicon-ok').on('click',function(){
		var data ={
			name:$("#user_name_header").html(),
			comment:$('#contack_info_input').val(),
			event_name:company_email,
		};
		$.post('../php/post.php',data,function(){
		});
		$('#contack_info_input').val("");
	});
	$('#contack_info_input').on('keyup',function(e){
		if(e.keyCode==13){
			var data ={
				name:$("#user_name_header").html(),
				comment:$('#contack_info_input').val(),
				event_name:company_email,
			};
			$.post('../php/post.php',data,function(){
			});
			$('#contack_info_input').val("");
		}
	});
});

$(document).on('click','#contact_box .glyphicon-minus',function(){
	$('#contact_online_msg').animate({
		height:0,
	},500,function(){});
	$('#contact_box .input-group').hide(500);
	$('#contact_box').animate({
		height:'30px',
	},500,function(){});
	$(this).removeClass('glyphicon-minus').addClass('glyphicon glyphicon-eject');
});

$(document).on('click','#contact_box .glyphicon-eject',function(){
	$('#contact_online_msg').animate({
		height:'230px',
	},500,function(){});
	$('#contact_box .input-group').show(500);
	$('#contact_box').animate({
		height:'300px',
	},500,function(){});
	$(this).removeClass('glyphicon-eject').addClass('glyphicon glyphicon-minus');
});

$('#contact_online_msg').bind("DOMSubtreeModified",function(){
	
});

