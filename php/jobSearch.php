<?php
	include "service/getJobInfo.php";
	include "model/job.php";
	$mysqli = new mysqli('localhost','root','123abc123','job');
	$search_content=$_POST['content'];
	if(mysqli_connect_error()){
		echo mysqli_connect_error();
		exit();
	}
	$mysqli->set_charset("utf8");
	$stmt=$mysqli->stmt_init();
	$query="select job_id,title from job";
	$results=array();
	if($stmt->prepare($query)){
		$OK=$stmt->execute();
		$stmt->bind_result($job_id,$title);
		while($stmt->fetch()){
			$job = new Job();
			similar_text($search_content,$title,$percent);
			if($percent>=50){
				$job = getJobInfo($job_id,$job);
				$result=array();
				$result['job_id']=$job_id;
				$result['title']=$title;
				$result['company_id']=$job->company->user_email;
				$result['company_name']=$job->company->name;
				$result['location']=$job->location;
				array_push($results,$result);
			}
		}
	}
	echo json_encode($results);
?>