<?php
if(isset($_POST['jason'])){
   //echo "dasdasdasd";
    $user=json_decode($_POST['jason'],true);
   //echo json_encode($user);
   $con=new mysqli("localhost","root","","project");
   if($con->connect_error)
   die($con->connect_error);
   for($i=0;$i<count($user);$i++){
      $type=$user[$i]['Type'];
      $target=$user[$i]['Target'];
      $time=$user[$i]['Time'];
      $Name=$user[$i]['Name'];
      $sql="insert into user values('$Name','$type','$target','$time')";
      $con->query($sql);
      if($con->affected_rows>0)
      echo "insert done ";
      else
      echo "!not inserted";
   }
}
   if(isset($_GET['h'])){
      $con=new mysqli("localhost","root","","project");
      if($con->connect_error)
      die("error");
      $sql="select * from user";
      if($res=$con->query($sql)){
         $rows=array();
         while($row=$res->fetch_assoc())
         array_push($rows,$row);
         echo json_encode($rows);
      }
   }?>