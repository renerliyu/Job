<?php
	function getSkills($user_id,$stmt){
		$result_array=array();
		$query="select * from skill where user_email=?";
		if($stmt->prepare($query)){
			$stmt->bind_param('s',$user_id);
			$stmt->execute();
			$stmt->bind_result($skill_id,$skill_name,$skill_year,$user_email);
			while($stmt->fetch()){
				$skill=new Skill();
				$skill->skill_id=$skill_id;
				$skill->name=$skill_name;
				$skill->year=$skill_year;
				$skill->user_email=$user_email;
				array_push($result_array,$skill);
			}
		}
		return $result_array;
	}
?>