<?php
	include 'model/company.php';
	include 'service/getCompanyInfo.php';
	
	$com=new Company();
	$com=getCompanyInfo($_POST['company_email'],$com);
	echo json_encode($com);
?>