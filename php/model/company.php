<?php
	class Company{
		public $user_email;
		public $password;
		public $name;
		public $description;
		public $product_service;
		public $industry;
		public $type;
		public $company_size;
		public $founded;
		public $phone;
		public $street;
		public $city;
		public $state;
		public $zip_code;
		public $website;
		
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