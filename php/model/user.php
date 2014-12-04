<?php
	class User{
		public $user_email;
		public $password;
		public $firstname;
		public $lastname;
		public $address;
		public $background;
		public $language;
		public $skills;
		public $homephone;
		public $cellphone;
		public $websites;
		public $status;
		public $project_arr;
		public $experience_arr;
		public $education_arr;
		public $contact_email;
			
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