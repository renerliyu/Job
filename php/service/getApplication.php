<?php
	include '../model/user.php';
	session_start();
	$username = $_SESSION['username'];
	$result=array();
	$mysqli=new mysqli("localhost","root","123abc123","job");
	if(mysqli_connect_error()){
		echo(mysqli_connect_error());
		exit();
	}
	$mysqli->set_charset("utf8");
	$stmt=$mysqli->stmt_init();
	$query="select user_id from application where job_id=?";
	if($stmt->prepare($query)){
		$stmt->bind_param('s',$_POST['job_id']);
		$stmt->execute();
		$stmt->bind_result($user_id);
		while($stmt->fetch()){
			$user = new User();
			$mysqli2=new mysqli("localhost","root","123abc123","job");
			if(mysqli_connect_error()){
				echo(mysqli_connect_error());
				exit();
			}
			$stmt2=$mysqli2->stmt_init();
			$query2="select firstname,lastname,user_email from user where user_email=?";
			if($stmt2->prepare($query2)){
				$stmt2->bind_param('s',$user_id);
				$stmt2->execute();
				$stmt2->bind_result($firstname,$lastname,$user_email);
				while($stmt2->fetch()){
					$user->firstname=$firstname;
					$user->lastname=$lastname;
					$user->user_email=$user_email;
				}
				array_push($result,$user);
			}else echo("Statement failed: ". $stmt->error . "<br>");
		}
	}else echo("Statement failed: ". $stmt->error . "<br>");
	echo json_encode($result);
?>