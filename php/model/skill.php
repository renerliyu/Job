<?php
	class Skill{
		public $skill_id;
		public $name;
		public $year;
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
?>