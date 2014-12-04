<?php
	session_start();
	$username = $_SESSION['username'];
	$mysqli=new mysqli("localhost","root","123abc123","job");
	if(mysqli_connect_error()){
		echo(mysqli_connect_error());
		exit();
	}
	$mysqli->set_charset("utf8");
	$stmt=$mysqli->stmt_init();
	$query='insert into application values(default,?,?);';
	if($stmt->prepare($query)){
		$stmt->bind_param('ss',$_POST['job_id'],$username);
		$OK=$stmt->execute();
		echo json_encode($OK);
	}
?>