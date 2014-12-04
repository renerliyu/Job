<?php
	include "../model/job.php";
	
	function getJobsByCompany($company_email){
		$result=array();
		$mysqli=new mysqli("localhost","root","123abc123","job");
		if(mysqli_connect_error()){
			echo(mysqli_connect_error());
			exit();
		}
		$mysqli->set_charset("utf8");
		$stmt=$mysqli->stmt_init();
		$query="select * from job where company_email=?";
		if($stmt->prepare($query)){
			$stmt->bind_param('s',$company_email);
			$OK=$stmt->execute();
			$stmt->bind_result($job_id,$requirement,$description,$employment_type,$experience,$title,$location,$company_emaill);
			while($stmt->fetch()){
				$job = new Job();
				$job->job_id=$job_id;
				$job->requirement=$requirement;
				$job->description=$description;
				$job->employment_type=$employment_type;
				$job->experience=$experience;
				$job->title=$title;
				$job->location=$location;
				$job->company_email=$company_email;
				array_push($result,$job);
			}
		}
		return $result;
	}
	
	$jobs = getJobsByCompany($_POST['company_email']);
	echo json_encode($jobs);
?>