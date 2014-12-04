<?php
	function getCompanyInfo($email,$com){
		$mysqli=new mysqli("localhost","root","123abc123","job");
		if(mysqli_connect_error()){
			echo(mysqli_connect_error());
			exit();
		}
		$mysqli->set_charset("utf8");
		$stmt=$mysqli->stmt_init();
		$query="select * from company where email=?";
		if($stmt->prepare($query)){
			$stmt->bind_param('s',$email);
			$OK=$stmt->execute();
			$stmt->bind_result($user_email,$name,$password,$description,$product_service,$industry,$type,$company_size,$founded,$phone,$street,$city,$state,$zip_code,$website);
			while($stmt->fetch()){
				$com->user_email=$user_email;
				$com->password=$password;
				$com->name=$name;
				$com->description=$description;
				$com->product_service=$product_service;
				$com->industry=$industry;
				$com->type=$type;
				$com->company_size=$company_size;
				$com->founded=$founded;
				$com->phone=$phone;
				$com->street=$street;
				$com->city=$city;
				$com->state=$state;
				$com->zip_code=$zip_code;
				$com->website=$website;
			}
		}
		return $com;
	}
?>