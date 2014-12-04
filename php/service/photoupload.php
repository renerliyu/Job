<?php
	session_start();
	$username=$_SESSION['username'];
	$resized_width=180;
	if(isset($_POST)){
		$name=$_FILES['file']['name'];
		$type=$_FILES['file']['type'];
		$size=$_FILES['file']['size'];
		$temp=$_FILES['file']['tmp_name'];
		$error=$_FILES['file']['error'];
		
		$photo_type=$_POST['type'];
		$typeName=explode('.',$name);
		if($error==0){
			echo $temp.' '.$type.' '.$name;
			$moved=move_uploaded_file($temp,"../../img/".$username.'.'.$typeName[count($typeName)-1]);
			echo $moved;
			echo '1';
			/*
			$src = imagecreatefromjpeg("../../img/".$username.'.'.$typeName[count($typeName)-1]);
			list($src_width,$src_height)=getimagesize("../../img/".$username.'.'.$typeName[count($typeName)-1]);
			$resized_height=($src_height/$src_width)*$resized_width;
			$tmp = imagecreatetruecolor($resized_width,$resized_height);
			imagecopyresampled($tmp, $src,0, 0, 0, 0, $resized_width, $resized_height, $src_width, $src_height);
			imagejpeg($tmp,'../../img/'.$username.'N.'.$typeName[count($typeName)-1],100);
			imagedestroy($src);
			imagedestroy($tmp);
			unlink("../../img/".$username.'.'.$typeName[count($typeName)-1]);*/
		}
	}else{
		echo "Not Post";
	}
?>