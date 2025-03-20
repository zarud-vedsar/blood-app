<?php

require("../config/proxy.php");

function login()
{

    global $action;
    $userid = $action->db->setPostRequiredField('userid', 'user ID is required');
    $password = $action->db->setPostRequiredField('password', 'Password is required');

    $user = $action->db->sql("SELECT `id`,`type`,`u_name`,`u_email`,`u_phone`,`address`,`state`,`district`,`pin_code`,`gender`,`dob`,`c_alter_phone`,`uid`,`status` FROM `zuraud_user` WHERE `pass`='" . sha1($password) . "' AND ( `u_email`='$userid' OR `u_phone`='$userid' )");
    if ($user) {
        echo $action->db->json(200, "Login successfully", '', $user[0]);
        http_response_code(200);
        return;
    } else {
        echo $action->db->json(400, "Invalid Credentialsss");
        http_response_code(400);
        return;
    }
}

function load_donation_request()
{
    global $action;
    $AuthendicteRequest = $action->db->AuthendicateRequest();
    if (!$AuthendicteRequest['authenticated']) {
        echo $action->db->json(401, "Unauthorized access.");
        http_response_code(401);
        return;
    }
    $admin_id = $AuthendicteRequest['loguserid'];

    $bloodGroup = $action->db->validatePostData('bloodGroup') ?: '';

    $fromDate = $action->db->validatePostData('fromDate') ?: '';
    $toDate = $action->db->validatePostData('toDate') ?: '';
    $pincode = $action->db->validatePostData('pincode') ?: '';
    $state = $action->db->validatePostData('state') ?: '';
    $city = $action->db->validatePostData('city') ?: '';
    $status = $action->db->validatePostData('status') ?: '';

    $sql = "SELECT dr.*,d.name AS req_name, d.phone , d.email, d.uniqueId FROM `zuraud_donation_request` dr JOIN `zuraud_doner` d ON d.id= dr.user_id WHERE 1";
    if (!empty($bloodGroup)) {
        $sql .= " AND dr.`bloodGroup`='$bloodGroup'";
    }
    if (!empty($fromDate)) {
        $sql .= " AND dr.`requiredDate`>='$fromDate'";
    }
    if (!empty($toDate)) {
        $sql .= " AND dr.`requiredDate`<='$toDate'";
    }
    if (!empty($pincode)) {
        $sql .= " AND dr.`pincode`='$pincode'";
    }
    if (!empty($state)) {
        $sql .= " AND dr.`state`='$state'";
    }
    if (!empty($city)) {
        $sql .= " AND dr.`city`='$city'";
    }
    if (!empty($status)) {
        $sql .= " AND dr.`status`='$status'";
    } else {
        $sql .= " AND dr.`status` IN (0,1,3) ";
    }
    $donation_request = $action->db->sql($sql);

    if ($donation_request) {
        echo $action->db->json(200, "Donation request listed", '', $donation_request);
        http_response_code(200);
        return;
    } else {
        echo $action->db->json(400, "No donation request found");
        http_response_code(400);
        return;
    }
}

function load_donation_list()
{
    global $action;
    $AuthendicteRequest = $action->db->AuthendicateRequest();
    if (!$AuthendicteRequest['authenticated']) {
        echo $action->db->json(401, "Unauthorized access.");
        http_response_code(401);
        return;
    }
    $admin_id = $AuthendicteRequest['loguserid'];

    $bloodGroup = $action->db->validatePostData('bloodGroup') ?: '';

    $fromDate = $action->db->validatePostData('fromDate') ?: '';
    $toDate = $action->db->validatePostData('toDate') ?: '';
    $pincode = $action->db->validatePostData('pincode') ?: '';
    $state = $action->db->validatePostData('state') ?: '';
    $city = $action->db->validatePostData('city') ?: '';


    $sql = "SELECT dr.*,d.name AS req_name, d.phone , d.email, d.uniqueId FROM `zuraud_donation_request` dr JOIN `zuraud_doner` d ON d.id= dr.user_id WHERE dr.`status` = 2 ";
    if (!empty($bloodGroup)) {
        $sql .= " AND dr.`bloodGroup`='$bloodGroup'";
    }
    if (!empty($fromDate)) {
        $sql .= " AND dr.`requiredDate`>='$fromDate'";
    }
    if (!empty($toDate)) {
        $sql .= " AND dr.`requiredDate`<='$toDate'";
    }
    if (!empty($pincode)) {
        $sql .= " AND dr.`pincode`='$pincode'";
    }
    if (!empty($state)) {
        $sql .= " AND dr.`state`='$state'";
    }
    if (!empty($city)) {
        $sql .= " AND dr.`city`='$city'";
    }

    $donation_request = $action->db->sql($sql);

    if ($donation_request) {
        echo $action->db->json(200, "Donation request listed", '', $donation_request);
        http_response_code(200);
        return;
    } else {
        echo $action->db->json(400, "No donation request found");
        http_response_code(400);
        return;
    }
}

function load_admin_detail()
{
    global $action;
    $userid = $action->db->setPostRequiredField('loguserid', "Admin Id is required");
    $admin = $action->db->sql("SELECT * FROM `zuraud_user` WHERE `id`='$userid'");
    if ($admin) {
        echo $action->db->json(200, "Admin details Fetched", '', $admin[0]);
        http_response_code(200);
        return;
    } else {
        echo $action->db->json(400, "No admin found");
        http_response_code(400);
        return;
    }
}

function load_donation_overview()
{
    global $action;
    $AuthendicteRequest = $action->db->AuthendicateRequest();
    if (!$AuthendicteRequest['authenticated']) {
        echo $action->db->json(401, "Unauthorized access.");
        http_response_code(401);
        return;
    }
    $admin_id = $AuthendicteRequest['loguserid'];

    $bloodGroup = $action->db->validatePostData('bloodGroup') ?: '';

    $fromDate = $action->db->validatePostData('fromDate') ?: '';
    $toDate = $action->db->validatePostData('toDate') ?: '';
    $pincode = $action->db->validatePostData('pincode') ?: '';
    $state = $action->db->validatePostData('state') ?: '';
    $city = $action->db->validatePostData('city') ?: '';
    $status = $action->db->validatePostData('status') ?: '';

    $sql = "SELECT COUNT(CASE WHEN `status` = 0 THEN 1 END) AS pending, COUNT(CASE WHEN `status` = 1 THEN 1 END) AS accepted, COUNT(CASE WHEN `status` = 2 THEN 1 END) AS approved, COUNT(CASE WHEN `status` = 3 THEN 1 END) AS rejected FROM `zuraud_donation_request` WHERE 1";
    if (!empty($bloodGroup)) {
        $sql .= " AND `bloodGroup`='$bloodGroup'";
    }
    if (!empty($fromDate)) {
        $sql .= " AND `requiredDate`>='$fromDate'";
    }
    if (!empty($toDate)) {
        $sql .= " AND `requiredDate`<='$toDate'";
    }
    if (!empty($pincode)) {
        $sql .= " AND `pincode`='$pincode'";
    }
    if (!empty($state)) {
        $sql .= " AND `state`='$state'";
    }
    if (!empty($city)) {
        $sql .= " AND `city`='$city'";
    }
    if (!empty($status)) {
        $sql .= " AND `status`='$status'";
    }
    $donation_request = $action->db->sql($sql);

    if ($donation_request) {
        echo $action->db->json(200, "Donation request listed", '', $donation_request);
        http_response_code(200);
        return;
    } else {
        echo $action->db->json(400, "No donation request found");
        http_response_code(400);
        return;
    }
}


function load_donor_list()
{
    global $action;
    $AuthendicteRequest = $action->db->AuthendicateRequest();
    if (!$AuthendicteRequest['authenticated']) {
        echo $action->db->json(401, "Unauthorized access.");
        http_response_code(401);
        return;
    }
    $admin_id = $AuthendicteRequest['loguserid'];

    $gender = $action->db->validatePostData('gender') ?: '';
    $bloodGroup = $action->db->validatePostData('bloodGroup') ?: '';
    $pincode = $action->db->validatePostData('pincode') ?: '';
    $state = $action->db->validatePostData('state') ?: '';
    $city = $action->db->validatePostData('city') ?: '';

    $sql = "SELECT * FROM `zuraud_doner` WHERE `reg_status`=1 ";
    if (!empty($gender)) {
        $sql .= " AND `gender`='$gender'";
    }
    if (!empty($bloodGroup)) {
        $sql .= " AND `bloodGroup`='$bloodGroup'";
    }
    if (!empty($pincode)) {
        $sql .= " AND `pincode`='$pincode'";
    }
    if (!empty($state)) {
        $sql .= " AND `state`='$state'";
    }
    if (!empty($city)) {
        $sql .= " AND `city`='$city'";
    }
    $donor_list = $action->db->sql($sql);

    if ($donor_list) {
        echo $action->db->json(200, "Donor list fetched", '', $donor_list);
        http_response_code(200);
        return;
    } else {
        echo $action->db->json(400, "No donor found");
        http_response_code(400);
        return;
    }
}

function load_donation_donerwise()
{
    global $action;
    $AuthendicteRequest = $action->db->AuthendicateRequest();
    if (!$AuthendicteRequest['authenticated']) {
        echo $action->db->json(401, "Unauthorized access.");
        http_response_code(401);
        return;
    }
    $donorId = $action->db->setPostRequiredField('donorId', 'Doner Id is required');

    $doner = $action->db->sql("SELECT * FROM `zuraud_doner` WHERE `id`='$donorId'");
    if ($doner) {
        $donation_request = $action->db->sql("SELECT ad.acceptance_date,ad.rejection_reason,ad.rejection_date,ad.approval_date,ad.status, dr.patientName,dr.attendeePhone,dr.unit,dr.requiredDate,dr.criticalStatus, dr.id AS donationid, dr.request_date FROM `approved_donations` ad JOIN zuraud_donation_request dr ON dr.id= ad.req_id WHERE ad.user_id='$donorId'") ?: [];

        echo $action->db->json(200, "Donation request listed", '', ['doner' => $doner[0], 'donation_request' => $donation_request]);
        http_response_code(200);
        return;
    } else {
        echo $action->db->json(400, "No doner found");
        http_response_code(400);
        return;
    }
}

function view_donation()
{
    global $action;
    $AuthendicteRequest = $action->db->AuthendicateRequest();
    if (!$AuthendicteRequest['authenticated']) {
        echo $action->db->json(401, "Unauthorized access.");
        http_response_code(401);
        return;
    }


    $donation_id = $action->db->setPostRequiredField('donation_id', 'Donation Id is required');

    $donation = $action->db->sql("SELECT dr.*, d.name AS req_name, d.email AS req_email , d.phone AS req_phone , d.uniqueId AS req_uniqueId , d.address AS req_address , d.pincode AS req_pincode, d.state AS req_state, d.city AS req_city FROM `zuraud_donation_request` dr JOIN zuraud_doner d ON d.id= dr.user_id WHERE dr.id='$donation_id'");
    if ($donation) {

        $acceptance = $action->db->sql("SELECT ad.`acceptance_date`,ad.`rejection_reason`,ad.`rejection_date`,ad.`approval_date`,ad.`status`,d.name AS donorName, d.phone AS donorPhone, d.email AS donorEmail , d.address, d.city, d.pincode, d.state, d.uniqueId  FROM `approved_donations` ad JOIN zuraud_doner d ON d.id= ad.user_id WHERE ad.req_id='$donation_id'") ?: [];

        echo $action->db->json(200, "Donation details fetched", '', ['donation' => $donation[0], 'acceptance' => $acceptance]);
        http_response_code(200);
        return;
    } else {
        echo $action->db->json(400, "Something went wrong");
        http_response_code(400);
        return;
    }
}


