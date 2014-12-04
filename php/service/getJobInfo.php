<?php
	include "model/company.php";
	include "getCompanyInfo.php";
	function getJobInfo($job_id,$job){
		$mysqli=new mysqli("localhost","root","123abc123","job");
		if(mysqli_connect_error()){
			echo(mysqli_connect_error());
			exit();
		}
		$mysqli->set_charset("utf8");
		$stmt=$mysqli->stmt_init();
		$query="select * from job where job_id=?";
		if($stmt->prepare($query)){
			$stmt->bind_param('s',$job_id);
			$OK=$stmt->execute();
			$stmt->bind_result($job_idd,$requirement,$description,$employment_type,$experience,$title,$location,$company_email);
			
			while($stmt->fetch()){
				$job->job_id=$job_idd;
				$job->requirement=$requirement;
				$job->description=$description;
				$job->employment_type=$employment_type;
				$job->experience=$experience;
				$job->title=$title;
				$job->location=$location;
				$company=new Company();
				$company=getCompanyInfo($company_email,$company);
				$job->company=$company;
				$job->company_email=$company_email;
				//echo $description;
			}
		}
		return $job;
	}
	
?>