<?php
	session_start();
	$username=$_POST['username'];
	$password=$_POST['password'];
	$firstname="";$lastname="";$name="";$result=array();
	$mysqli=new mysqli("localhost","root","123abc123","job");
	if(mysqli_connect_error()){
		echo(mysqli_connect_error());
		exit();
	}
	$mysqli->set_charset("utf8");
	$stmt=$mysqli->stmt_init();
	$query="select password,firstname,lastname from user where user_email=?";
	$checked=false;
	if($stmt->prepare($query)){
		$stmt->bind_param('s',$username);
		$OK=$stmt->execute();
		$stmt->bind_result($db_password,$db_firstname,$db_lastname);
		while($stmt->fetch()){
			if($password==$db_password){
				$checked=true;
				$firstname=$db_firstname;
				$lastname=$db_lastname;
				break;
			}	
		}	
	}
	$stmt=$mysqli->stmt_init();
	$query="select password,name from company where email=?";
	if($stmt->prepare($query)){
		$stmt->bind_param('s',$username);
		$OK=$stmt->execute();
		$stmt->bind_result($db_password,$db_name);
		while($stmt->fetch()){
			if($password==$db_password){
				$checked=true;
				$name=$db_name;
				break;
			}
		}
	}
	
	$result['username']=$username;
	$result['name']=$name;
	$result['firstname']=$firstname;
	$result['lastname']=$lastname;
	if($checked==true){
		$result['pass']='Y';
		$_SESSION['username']=$username;
	}else{
		$result['pass']='N';
	}
	
	echo json_encode($result);
?>