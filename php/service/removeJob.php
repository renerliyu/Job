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
	$query="delete from job where job_id=?";
	if($stmt->prepare($query)){
		$stmt->bind_param(
			's',
			$_POST['id']
		);
		$OK=$stmt->execute();
		if($OK){
			echo json_encode("New Job Added!");
		}else{
			echo json_encode("Execute is wrong");
		}
	}
?>