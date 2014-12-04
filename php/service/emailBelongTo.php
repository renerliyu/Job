<?php
	session_start();
	$username=$_SESSION['username'];
	$mysqli=new mysqli('localhost','root','123abc123','job');
	if(mysqli_connect_error()){
		echo(mysqli_connect_error());
		exit();
	}
	$mysqli->set_charset("utf8");
	$stmt=$mysqli->stmt_init();
	$query='select user_email from user where user_email=?';
	if($stmt->prepare($query)){
		$stmt->bind_param('s',$username);
		$OK=$stmt->execute();
		$stmt->bind_result($user_email);
		while($stmt->fetch()){
			echo json_encode('user');
		}
	}
	$query='select email from company where email=?';
	if($stmt->prepare($query)){
		$stmt->bind_param('s',$username);
		$OK=$stmt->execute();
		$stmt->bind_result($email);
		while($stmt->fetch()){
			echo json_encode('company');
		}
	}
?>