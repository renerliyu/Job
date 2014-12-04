<?php
	session_start();
	$username=$_SESSION['username'];
	//echo $_POST['summary'];
	$OK=false;
	$mysqli=new mysqli("localhost","root","123abc123","job");
	if(mysqli_connect_error()){
		echo(mysqli_connect_error());
		exit();
	}
	$mysqli->set_charset("utf8");
	
	//Load User Table
	$stmt=$mysqli->stmt_init();
	$query="update user set firstname=?,lastname=?,status=?,websites=?,background=?, address=?,homephone=?,cellphone=?,contact_email=? where user_email=?";
	if($stmt->prepare($query)){
		$stmt->bind_param('ssssssssss',
		$_POST['firstname'],
		$_POST['lastname'],
		$_POST['status'],
		$_POST['websites'],
		$_POST['summary'],
		$_POST['address'],
		$_POST['homephone'],
		$_POST['cellphone'],
		$_POST['contact_email'],
		$username);
		$OK=$stmt->execute();
	}else echo("Statement failed: ". $stmt->error . "<br>");
	
	//Load education table
	$passed_education_ids=array();
	foreach($_POST['education'] as $education){
		$degree="";
		if($education['degree']=='1'){
			$degree='High School or equivalent';
		}else if($education['degree']=='3'){
			$degree='Vocational';
		}else if($education['degree']=='9'){
			$degree='Some College Coursework Completed';
		}else if($education['degree']=='4'){
			$degree='Associate Degree';
		}else if($education['degree']=='5'){
			$degree="Bachelor's Degree";
		}else if($education['degree']=='6'){
			$degree="Master's Degree";
		}else if($education['degree']=='7'){
			$degree='Doctorate';
		}else if($education['degree']=='8'){
			$degree='Professional';
		}
		$query_select_eduation="select * from education where education_id=?";
		if($stmt->prepare($query_select_eduation)){
			$stmt->bind_param('s',$education['id']);
			$OK=$stmt->execute();
			$anchor_education_id=false;
			while($stmt->fetch()){
				$anchor_education_id=true;
				array_push($passed_education_ids,$education['id']);
			}
			if($anchor_education_id==true){
				$query_update_education="update education set name=?,time_in=?,time_out=?,major=?,address=?,degree=? where education_id=?";
				
				if($stmt->prepare($query_update_education)){
					$stmt->bind_param('sssssss',
					$education['school_name'],
					$education['startDate'],
					$education['endDate'],
					$education['major'],
					$education['address'],
					$degree,
					$education['id']);
					$OK=$stmt->execute();
				}else echo("Statement failed: ". $stmt->error . "<br>");
			}else{
				$query_insert_education="insert into education values(default,?,?,?,?,?,?,default,?);";
				if($stmt->prepare($query_insert_education)){
					$stmt->bind_param('sssssss',
						$education['school_name'],
						$education['startDate'],
						$education['endDate'],
						$education['major'],
						$education['address'],
						$degree,
						$username
					);
					$OK=$stmt->execute();
					array_push($passed_education_ids,$stmt->insert_id);
				}else echo("Statement failed: ". $stmt->error . "<br>");
			}
		}else echo("Statement failed: ". $stmt->error . "<br>");
	}
	$exist_education_ids=array();
	$query_select_all_education_id="select education_id from education";
	if($stmt->prepare($query_select_all_education_id)){
		$stmt->execute();
		$stmt->bind_result($exist_education_id);
		while($stmt->fetch()){
			array_push($exist_education_ids,$exist_education_id);
		}
	}else echo("Statement failed: ". $stmt->error . "<br>");
	
	$will_be_delete_education_ids=array_diff($exist_education_ids,$passed_education_ids);
	foreach($will_be_delete_education_ids as $will_be_delete_education_id){
		$query_delete_education="delete from education where education_id=? and user_email=?";
		if($stmt->prepare($query_delete_education)){
			$stmt->bind_param('ss',$will_be_delete_education_id,$username);
			$stmt->execute();
		}else echo("Statement failed: ". $stmt->error . "<br>");
	}
	//load Experience Table
	$passed_experience_ids=array();
	foreach($_POST['experiences'] as $experience){
		$query_select_experience="select * from experience where experience_id=?";
		if($stmt->prepare($query_select_experience)){
			$stmt->bind_param('s',$experience['id']);
			$OK=$stmt->execute();
			$anchor_experience_id=false;
			while($stmt->fetch()){
				$anchor_experience_id=true;
				array_push($passed_experience_ids,$experience['id']);
			}
			if($anchor_experience_id==true){
				$query_update_experience="update experience set company_name=?,title=?,location=?,time_in=?,time_out=?,description=?,employer=? where experience_id=?";
				
				if($stmt->prepare($query_update_experience)){
					$stmt->bind_param('ssssssss',
					$experience['company_name'],
					$experience['title'],
					$experience['location'],
					$experience['time_in'],
					$experience['time_out'],
					$experience['description'],
					$experience['employer'],
					$experience['id']);
					$OK=$stmt->execute();
				}else echo("Statement failed: ". $stmt->error . "<br>");
			}else{
				$query_insert_experience="insert into experience values(default,?,?,?,?,?,?,?,?);";
				if($stmt->prepare($query_insert_experience)){
					$stmt->bind_param('ssssssss',
						$experience['company_name'],
						$experience['title'],
						$experience['location'],
						$experience['time_in'],
						$experience['time_out'],
						$experience['description'],
						$experience['employer'],
						$username);
					$OK=$stmt->execute();
					array_push($passed_experience_ids,$stmt->insert_id);
				}else echo("Statement failed: ". $stmt->error . "<br>");
			}
		}else echo("Statement failed: ". $stmt->error . "<br>");
	}
	$exist_experience_ids=array();
	$query_select_all_experience_id="select experience_id from experience";
	if($stmt->prepare($query_select_all_experience_id)){
		$stmt->execute();
		$stmt->bind_result($exist_experience_id);
		while($stmt->fetch()){
			array_push($exist_experience_ids,$exist_experience_id);
		}
	}else echo("Statement failed: ". $stmt->error . "<br>");
	
	$will_be_delete_experience_ids=array_diff($exist_experience_ids,$passed_experience_ids);
	foreach($will_be_delete_experience_ids as $will_be_delete_experience_id){
		$query_delete_experience="delete from experience where experience_id=? and user_email=?";
		if($stmt->prepare($query_delete_experience)){
			$stmt->bind_param('ss',$will_be_delete_experience_id,$username);
			$stmt->execute();
		}else echo("Statement failed: ". $stmt->error . "<br>");
	}
	//set project files
	$passed_project_ids=array();
	foreach($_POST['projects'] as $project){
		$query_select_project="select * from project where project_id=?";
		if($stmt->prepare($query_select_project)){
			$stmt->bind_param('s',$project['id']);
			$OK=$stmt->execute();
			$anchor_project_id=false;
			while($stmt->fetch()){
				$anchor_project_id=true;
				array_push($passed_project_ids,$project['id']);
			}
			if($anchor_project_id==true){
				$query_update_project="update project set title=?,project_desc=? where project_id=?";
				
				if($stmt->prepare($query_update_project)){
					$stmt->bind_param('sss',
					$project['title'],
					$project['description'],
					$project['id']);
					$OK=$stmt->execute();
				}else echo("Statement failed: ". $stmt->error . "<br>");
			}else{
				$query_insert_project="insert into project values(default,?,?,?);";
				if($stmt->prepare($query_insert_project)){
					$stmt->bind_param('sss',
						$project['title'],
						$project['description'],
						$username);
					$OK=$stmt->execute();
					array_push($passed_project_ids,$stmt->insert_id);
				}else echo("Statement failed: ". $stmt->error . "<br>");
			}
		}else echo("Statement failed: ". $stmt->error . "<br>");
	}
	$exist_project_ids=array();
	$query_select_all_project_id="select project_id from project";
	if($stmt->prepare($query_select_all_project_id)){
		$stmt->execute();
		$stmt->bind_result($exist_project_id);
		while($stmt->fetch()){
			array_push($exist_project_ids,$exist_project_id);
		}
	}else echo("Statement failed: ". $stmt->error . "<br>");
	
	$will_be_delete_project_ids=array_diff($exist_project_ids,$passed_project_ids);
	foreach($will_be_delete_project_ids as $will_be_delete_project_id){
		$query_delete_project="delete from project where project_id=? and user_email=?";
		if($stmt->prepare($query_delete_project)){
			$stmt->bind_param('ss',$will_be_delete_project_id,$username);
			$stmt->execute();
		}else echo("Statement failed: ". $stmt->error . "<br>");
	}
	//set skill table
	$passed_skill_ids=array();
	foreach($_POST['skills'] as $skill){
		$query_select_skill="select * from skill where skill_id=?";
		if($stmt->prepare($query_select_skill)){
			$stmt->bind_param('s',$skill['id']);
			$OK=$stmt->execute();
			$anchor_skill_id=false;
			while($stmt->fetch()){
				$anchor_skill_id=true;
				array_push($passed_skill_ids,$skill['id']);
			}
			if($anchor_skill_id==true){
				$query_update_skill="update skill set name=?,year=? where skill_id=?";
				
				if($stmt->prepare($query_update_skill)){
					$stmt->bind_param('sss',
					$skill['name'],
					$skill['year'],
					$skill['id']);
					$OK=$stmt->execute();
				}else echo("Statement failed: ". $stmt->error . "<br>");
			}else{
				$query_insert_skill="insert into skill values(default,?,?,?);";
				if($stmt->prepare($query_insert_skill)){
					$stmt->bind_param('sss',
						$skill['name'],
						$skill['year'],
						$username);
					$OK=$stmt->execute();
					array_push($passed_skill_ids,$stmt->insert_id);
				}else echo("Statement failed: ". $stmt->error . "<br>");
			}
		}else echo("Statement failed: ". $stmt->error . "<br>");
	}
	$exist_skill_ids=array();
	$query_select_all_skill_id="select skill_id from skill";
	if($stmt->prepare($query_select_all_skill_id)){
		$stmt->execute();
		$stmt->bind_result($exist_skill_id);
		while($stmt->fetch()){
			array_push($exist_skill_ids,$exist_skill_id);
		}
	}else echo("Statement failed: ". $stmt->error . "<br>");
	
	$will_be_delete_skill_ids=array_diff($exist_skill_ids,$passed_skill_ids);
	foreach($will_be_delete_skill_ids as $will_be_delete_skill_id){
		$query_delete_skill="delete from skill where skill_id=? and user_email=?";
		if($stmt->prepare($query_delete_skill)){
			$stmt->bind_param('ss',$will_be_delete_skill_id,$username);
			$stmt->execute();
		}else echo("Statement failed: ". $stmt->error . "<br>");
	}
?>