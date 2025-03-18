<?php

require("../config/proxy.php");

function login()
{
    global $action;
    $userid = $action->db->setPostRequiredField('userid', 'user ID is required');
    $password = $action->db->setPostRequiredField('password', 'Password is required');
    $user = $action->db->sql("SELECT `type`,`u_name`,`u_email`,`u_phone`,`address`,`state`,`district`,`pin_code`,`gender`,`dob`,`c_alter_phone`,`uid`,`status`, FROM `zuraud_user` WHERE `pass`='" . sha1($password) . "' AND `u_email`='$userid' OR `u_phone`='$userid'");
    if ($user) {
        echo $action->db->json(200, "Login successfully", '', $user[0]);
        http_response_code(200);
        return;
    } else {
        echo $action->db->json(400, "Invalid Credentials");
        http_response_code(400);
        return;
    }
}

function load_donation_request(){
    global $action;
    $AuthendicteRequest = $action->db->AuthendicateRequest();
    if (!$AuthendicteRequest['authenticated']) {
        echo $action->db->json(401, "Unauthorized access.");
        http_response_code(401);
        return;
    }
    $admin_id = $AuthendicteRequest['loguserid'];

    $bloodGroup= $action->db->validatePostData('bloodGroup')?:'';

    $fromDate= $action->db->validatePostData('fromDate')?:'';
    $toDate= $action->db->validatePostData('toDate')?:'';
    $pincode= $action->db->validatePostData('pincode')?:'';
    $state = $action->db->validatePostData('state')?:'';
    $city= $action->db->validatePostData('city')?:'';
    $status= $action->db->validatePostData('status')?:'';

    $sql="SELECT * FROM `zuraud_donation_request` WHERE 1";
    if(!empty($bloodGroup)){
        $sql.=" AND `bloodGroup`='$bloodGroup'";
    }
    if(!empty($fromDate)){
        $sql.=" AND `requiredDate`>='$fromDate'";
    }
    if(!empty($toDate)){
        $sql.=" AND `requiredDate`<='$toDate'";
    }
    if(!empty($pincode)){
        $sql.=" AND `pincode`='$pincode'";
    }
    if(!empty($state)){
        $sql.=" AND `state`='$state'";
    }
    if(!empty($city)){
        $sql.=" AND `city`='$city'";
    }
    if(!empty($status)){
        $sql.=" AND `status`='$status'";
    }
    $donation_request = $action->db->sql($sql);

    if($donation_request){
        echo $action->db->json(200, "Donation request listed", '', $donation_request);
        http_response_code(200);
        return;
    }else{
        echo $action->db->json(400, "No donation request found");
        http_response_code(400);
        return;
    }

}

function load_donation_overview(){
    global $action;
    $AuthendicteRequest = $action->db->AuthendicateRequest();
    if (!$AuthendicteRequest['authenticated']) {
        echo $action->db->json(401, "Unauthorized access.");
        http_response_code(401);
        return;
    }
    $admin_id = $AuthendicteRequest['loguserid'];

    $bloodGroup= $action->db->validatePostData('bloodGroup')?:'';

    $fromDate= $action->db->validatePostData('fromDate')?:'';
    $toDate= $action->db->validatePostData('toDate')?:'';
    $pincode= $action->db->validatePostData('pincode')?:'';
    $state = $action->db->validatePostData('state')?:'';
    $city= $action->db->validatePostData('city')?:'';
    $status= $action->db->validatePostData('status')?:'';

    $sql="SELECT COUNT(CASE WHEN `status` = 0 THEN 1 END) AS pending, COUNT(CASE WHEN `status` = 1 THEN 1 END) AS accepted, COUNT(CASE WHEN `status` = 2 THEN 1 END) AS approved, COUNT(CASE WHEN `status` = 3 THEN 1 END) AS rejected FROM `zuraud_donation_request` WHERE 1";
    if(!empty($bloodGroup)){
        $sql.=" AND `bloodGroup`='$bloodGroup'";
    }
    if(!empty($fromDate)){
        $sql.=" AND `requiredDate`>='$fromDate'";
    }
    if(!empty($toDate)){
        $sql.=" AND `requiredDate`<='$toDate'";
    }
    if(!empty($pincode)){
        $sql.=" AND `pincode`='$pincode'";
    }
    if(!empty($state)){
        $sql.=" AND `state`='$state'";
    }
    if(!empty($city)){
        $sql.=" AND `city`='$city'";
    }
    if(!empty($status)){
        $sql.=" AND `status`='$status'";
    }
    $donation_request = $action->db->sql($sql);

    if($donation_request){
        echo $action->db->json(200, "Donation request listed", '', $donation_request);
        http_response_code(200);
        return;
    }else{
        echo $action->db->json(400, "No donation request found");
        http_response_code(400);
        return;
    }

}


