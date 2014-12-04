<?php
	$mysqli=new mysqli("localhost","root","123abc123","job");
	if(mysqli_connect_error()){
		echo(mysqli_connect_error());
		exit();
	}
	$mysqli->set_charset("utf8");
?>