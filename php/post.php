<?php
	require_once "service/Pusher.php";

	$app_id="70946";
	$app_secret="528c67bb4cec4a2e300f";
	$app_key="c96fc50dde3a6a67dcd1";
	
	$pusher = new Pusher($app_key,$app_secret,$app_id);
	
	$data = $_POST;
	echo $_POST['event_name'];
	$data = array ('name'=>$_POST['name'],'comment'=>$_POST['comment']);
	
	//$pusher->trigger('comments',$_POST['event_name'],$data);
	$pusher->trigger('comments',$_POST['event_name'],$data);
	
?>