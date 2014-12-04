<?php
	$OK=false;
	$mysqli=new mysqli("localhost","root","123abc123","job");
	if(mysqli_connect_error()){
		echo(mysqli_connect_error());
		exit();
	}
	$mysqli->set_charset("utf8");
	$stmt=$mysqli->stmt_init();
	$query="insert into user (user_email,password) values(?,?)";
	if($stmt->prepare($query)){
		$stmt->bind_param('ss',$_POST['email'],$_POST['password']);
		$OK=$stmt->execute();
	}else echo("Statement failed: ". $stmt->error . "<br>");
	$re=array('result','');
	if($OK){$re['result']='Success';}
	else{$re['result']="Wrong";}
	echo json_encode($re);
?>