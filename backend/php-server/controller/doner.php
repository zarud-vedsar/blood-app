<?php

require("../config/proxy.php");


function register(){

    global $action;

    $bloodGroups = [
        "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-",
        "A1+", "A1-", "A2+", "A2-", "A1B+", "A1B-", "A2B+", "A2B-"
    ];
    $name= $action->db->setPostRequiredField('name','Name is required');
    $email= $action->db->setPostRequiredField('email',"Email is required");
    $phone= $action->db->setPostRequiredField('phone',"Phone is required");
    $dob= $action->db->validatePostData('dob')?: '';
    $gender= $action->db->setPostRequiredField('gender',"Gender is required");
    $bloodGroup= $action->db->setPostRequiredField('bloodGroup',"Blood Group is required");
    
    if(!in_array($bloodGroup,$bloodGroups)){
        echo $action->db->json(400,"Invalid Blood Group",'bloodGroup');
        http_response_code(400);
        return;
    }

    $termsAccepted= $action->db->setPostRequiredField('termsAccepted',"Terms and Conditions is required");

    if($termsAccepted != "true"){
        echo $action->db->json(400,"Please accept terms and conditions",'termsAccepted');
        http_response_code(400);
        return;
    }

    $password= $action->db->setPostRequiredField('password',"Password is required",'password');
    $cpassword= $action->db->setPostRequiredField('cpassword',"Confirm Password is required",'cpassword');
    
    if($password != $cpassword){
        echo $action->db->json(400,"Password and Confirm Password does not match",'cpassword');
        http_response_code(400);
        return;
    }

    $otp= $action->custom->generateOTP(4);


    $user=$action->db->sql("SELECT id,`reg_status` FROM `zuraud_doner` WHERE `phone`='$phone' OR `email`='$email'");
    if($user){
        if($user[0]['reg_status'] == 1){
            echo $action->db->json(400,"User already registered with this phone number or email id");
            http_response_code(400);
            return;
        }else{
            $response=$action->db->update('zuraud_doner'," id=".$user[0]['id'],['name'=>$name,'email'=>$email,'phone'=>$phone,'dob'=>$dob,'gender'=>$gender,'bloodGroup'=>$bloodGroup,'password'=>sha1($password),'otp'=>$otp, 'otp_expiry'=>date('Y-m-d H:i:s',strtotime('+5 minutes'))]);
            if($response){
                echo $action->db->json(200,"OTP sent successfully",'',['id'=>$user[0]['id']]);
                http_response_code(200);
                return;
            }else{
                echo $action->db->json(500,"Internal Server Error");
                http_response_code(500);
                return;
            }
                
        }
    }
    else{
        $response=$action->db->insert('zuraud_doner',['name'=>$name,'email'=>$email,'phone'=>$phone,'dob'=>$dob,'gender'=>$gender,'bloodGroup'=>$bloodGroup,'password'=>sha1($password),'otp'=>$otp, 'otp_expiry'=>date('Y-m-d H:i:s',strtotime('+5 minutes'))]);
        if($response){
            echo $action->db->json(200,"OTP sent successfully",'',['id'=>$response]);
            http_response_code(200);
            return;
        }else{
            echo $action->db->json(500,"Internal Server Error");
            http_response_code(500);
            return;
        }

    }
    
}

function verifyRegistrationOTP(){
    global $action;
    $id= $action->db->setPostRequiredField('id','Id is required');
    $otp= $action->db->setPostRequiredField('otp','OTP is required');
    $user=$action->db->sql("SELECT `id`,`uniqueId`,`name`,`email`,`phone`,`dob`,`gender`,`bloodGroup`,`otp`,`otp_expiry` FROM `zuraud_doner` WHERE `id`='$id'");
    if($user){
        if($user[0]['otp'] == $otp && strtotime($user[0]['otp_expiry']) > time()){
            do{
                $uniqueId= 'BD'.time();
                $check=$action->db->sql("SELECT id FROM `zuraud_doner` WHERE `uniqueId`='$uniqueId'");
            }while($check);
            
            $response=$action->db->update('zuraud_doner'," id=".$user[0]['id'],['reg_status'=>1,'otp'=>null,'otp_expiry'=>null,'uniqueId'=>$uniqueId]);
            if($response){
                echo $action->db->json(200,"OTP verified successfully Login to Continue",'',$user[0]);
                http_response_code(200);
                return;
            }else{
                echo $action->db->json(500,"Internal Server Error");
                http_response_code(500);
                return;
            }
        }else{
            echo $action->db->json(400,"Invalid OTP");
            http_response_code(400);
            return;
        }
    }else{
        echo $action->db->json(400,"Invalid User");
        http_response_code(400);
        return;
    }

    function login(){

    }
}