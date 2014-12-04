<?php
	session_start();
	if(isset($_SESSION['username'])){
		echo $_SESSION['username'];
	}else{
		echo 'no user login';
		//header('Location: http://localhost/job');
	}
?>