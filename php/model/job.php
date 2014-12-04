<?php
	class Job{
		public $job_id;
		public $requirement;
		public $description;
		public $employment_type;
		public $experience;
		public $title;
		public $location;
		public $company;
		
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