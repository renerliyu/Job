<?php
	function getMySQLi(){
		$mysqli=new mysqli("localhost:3306","root","123abc123","job");
		if(mysqli_connect_error()){
			echo(mysqli_connect_error());
			exit();
		}
		$mysqli->set_charset("utf8");
		return $mysqli;
	}
?>