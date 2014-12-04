<?php
	include "model/job.php";
	include "service/getJobInfo.php";
	
	
	$job = new Job();
	$job = getJobInfo($_POST['id'],$job);
	echo json_encode($job);
?>