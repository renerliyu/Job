<?php
	include 'model/user.php';
	include 'model/skill.php';
	include 'service/getSkills.php';
	
	class Project{
		public $project_id;
		public $title;
		public $project_desc;
		public $user_email;
		
		public function __get($property_name){
			if(isset($this->$property_name)){
				return($this->$property_name);
			}else{
				return(NULL);
			}
		}
	
		public function __set($property_name, $value){
			$this->$property_name=$value;
		}
	}
	
	class Experience{
		public $experience_id;
		public $company_name;
		public $title;
		public $location;
		public $time_in;
		public $time_out;
		public $description;
		public $employer;
		public $user_email;
		
		public function __get($property_name){
			if(isset($this->$property_name)){
				return($this->$property_name);
			}else{
				return(NULL);
			}
		}
	
		public function __set($property_name, $value){
			$this->$property_name=$value;
		}

	}
	
	class Education{
		public $education_id;
		public $name;
		public $time_in;
		public $time_out;
		public $major;
		public $address;
		public $user_email;
		public $degree;
		public $description;

		public function __get($property_name){
			if(isset($this->$property_name)){
				return($this->$property_name);
			}else{
				return(NULL);
			}
		}
	
		public function __set($property_name, $value){
			$this->$property_name=$value;
		}
		
	}
	
	function getUserInfo($user_id,$user,$stmt){
		$query="select * from user where user_email=?";
		$email=$user_id;
		
		
		if($stmt->prepare($query)){
			$stmt->bind_param('s',$email);
			$OK=$stmt->execute();
			$stmt->bind_result($user_email,$password,$firstname,$lastname,$address,$background,$language,$skills,$homephone,$cellphone,$websites,$status,$contact_email);
			while($stmt->fetch()){
				$user->user_email=$user_email;
				$user->password=$password;
				$user->firstname=$firstname;
				$user->lastname=$lastname;
				$user->address=$address;
				$user->background=$background;
				$user->language=$language;
				$user->skills=getSkills($user_id,$stmt);
				$user->homephone=$homephone;
				$user->cellphone=$cellphone;
				$user->websites=$websites;
				$user->status=$status;
				$user->contact_email=$contact_email;
				$user->project_arr=getProjects($user_id,$stmt);
				$user->experience_arr=getExperience($user_id,$user,$stmt);
				$user->education_arr=getEducation($user_id,$user,$stmt);
			}
		}
		return $user;
	}
	
	function getProjects($user_id,$stmt){
		$result_array=array();
		$query="select * from project where user_email=?";
		if($stmt->prepare($query)){
			$stmt->bind_param('s',$user_id);
			$OK=$stmt->execute();
			$stmt->bind_result($project_id,$project_title,$project_desc,$user_email);
			while($stmt->fetch()){
				$project=new Project();
				$project->project_id=$project_id;
				$project->title=$project_title;
				$project->user_email=$user_email;
				$project->project_desc=$project_desc;
				array_push($result_array,$project);
			}
		}
		return $result_array;
	}
	
	function getProjectDesc($project_id){
		$mysqli=new mysqli("localhost","root","123abc123","job");
		if(mysqli_connect_error()){
			echo(mysqli_connect_error());
			exit();
		}
		$mysqli->set_charset("utf8");
		$stmt=$mysqli->stmt_init();
		$descrption_array=array();
		$query="select * from project_description where project_id=?";
		if($stmt->prepare($query)){
			$stmt->bind_param('s',$project_id);
			$OK=$stmt->execute();
			$stmt->bind_result($project_des_id,$project_des_content,$project_idd);
			while($stmt->fetch()){
				array_push($descrption_array,$project_des_content);
			}
		}
		return $descrption_array;
	}
	
	function getExperience($user_id,$user,$stmt){
		$result_array=array();
		//$mysqli->set_charset("utf8");
		$query="select * from experience where user_email=?";
		if($stmt->prepare($query)){
			$stmt->bind_param('s',$user_id);
			$OK=$stmt->execute();
			$stmt->bind_result($experience_id,$company_name,$title,$location,$time_in,$time_out,$description,$employer,$user_email);
			while($stmt->fetch()){
				$exp=new Experience();
				$exp->experience_id=$experience_id;
				$exp->company_name=$company_name;
				$exp->title=$title;
				$exp->location=$location;
				$exp->time_in=$time_in;
				$exp->time_out=$time_out;
				$exp->user_email=$user_email;
				$exp->employer=$employer;
				$exp->description=$description;
				array_push($result_array,$exp);
			}
		}
		return $result_array;
	}
	
	function getExperienceDesc($experience_id){
		$mysqli=new mysqli("localhost","root","123abc123","job");
		if(mysqli_connect_error()){
			echo(mysqli_connect_error());
			exit();
		}
		$mysqli->set_charset("utf8");
		$stmt=$mysqli->stmt_init();
		$descrption_array=array();
		$query="select * from exp_description where experience_id=?";
		if($stmt->prepare($query)){
			$stmt->bind_param('s',$experience_id);
			$OK=$stmt->execute();
			$stmt->bind_result($exp_des_id,$exp_des_content,$experience_idd);
			while($stmt->fetch()){
				//echo $exp_des_content;
				array_push($descrption_array,$exp_des_content);
			}
		}
		return $descrption_array;
	}
	
	function getEducation($user_id,$user,$stmt){
		$result_array=array();
		$query="select * from education where user_email=?";
		if($stmt->prepare($query)){
			$stmt->bind_param('s',$user_id);
			$OK=$stmt->execute();
			$stmt->bind_result($education_id,$name,$time_in,$time_out,$major,$address,$degree,$description,$user_email);
			while($stmt->fetch()){
				$edu=new Education();
				$edu->education_id=$education_id;
				$edu->name=$name;
				$edu->time_in=$time_in;
				$edu->time_out=$time_out;
				$edu->major=$major;
				$edu->address=$address;
				$edu->user_email=$user_email;
				$edu->degree=$degree;
				
				$edu->description=getEducationCourse($education_id);
				array_push($result_array,$edu);
			}
		}
		return $result_array;
	}
	
	function getEducationCourse($education_id){
		$mysqli=new mysqli("localhost","root","123abc123","job");
		if(mysqli_connect_error()){
			echo(mysqli_connect_error());
			exit();
		}
		$mysqli->set_charset("utf8");
		$stmt=$mysqli->stmt_init();
		$course_array=array();
		$query="select * from course where education_id=?";
		if($stmt->prepare($query)){
			$stmt->bind_param('s',$education_id);
			$OK=$stmt->execute();
			$stmt->bind_result($course_id,$name,$education_idd);
			while($stmt->fetch()){
				array_push($course_array,$name);
			}
		}
		return $course_array;
	}
	
	session_start();
	
	$mysqli=new mysqli("localhost","root","123abc123","job");
	if(mysqli_connect_error()){
		echo(mysqli_connect_error());
		exit();
	}
	$mysqli->set_charset("utf8");
	$stmt=$mysqli->stmt_init();
	$user=new User();
	if(isset($_SESSION['username'])){
		$param_name=$_SESSION['username'];
	}else{
		header('Location: http://localhost/job');
	}
	$param_name=$_POST['name'];
	$user=getUserInfo($param_name,$user,$stmt);

	echo json_encode($user);
?>