<?php

require("../config/proxy.php");


function register()
{

    global $action;

    $bloodGroups = [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
        "A1+",
        "A1-",
        "A2+",
        "A2-",
        "A1B+",
        "A1B-",
        "A2B+",
        "A2B-"
    ];
    $name = $action->db->setPostRequiredField('name', 'Name is required');
    $email = $action->db->setPostRequiredField('email', "Email is required");
    $phone = $action->db->setPostRequiredField('phone', "Phone is required");
    $dob = $action->db->validatePostData('dob') ?: '';
    $gender = $action->db->setPostRequiredField('gender', "Gender is required");
    $bloodGroup = $action->db->setPostRequiredField('bloodGroup', "Blood Group is required");

    if (!in_array($bloodGroup, $bloodGroups)) {
        echo $action->db->json(400, "Invalid Blood Group", 'bloodGroup');
        http_response_code(400);
        return;
    }

    $termsAccepted = $action->db->setPostRequiredField('termsAccepted', "Terms and Conditions is required");

    if ($termsAccepted != "true") {
        echo $action->db->json(400, "Please accept terms and conditions", 'termsAccepted');
        http_response_code(400);
        return;
    }

    $password = $action->db->setPostRequiredField('password', "Password is required", 'password');
    $cpassword = $action->db->setPostRequiredField('cpassword', "Confirm Password is required", 'cpassword');

    if ($password != $cpassword) {
        echo $action->db->json(400, "Password and Confirm Password does not match", 'cpassword');
        http_response_code(400);
        return;
    }

    $otp = $action->custom->generateOTP(4);


    $user = $action->db->sql("SELECT id,`reg_status` FROM `zuraud_doner` WHERE `phone`='$phone' OR `email`='$email'");
    if ($user) {
        if ($user[0]['reg_status'] == 1) {
            echo $action->db->json(400, "User already registered with this phone number or email id");
            http_response_code(400);
            return;
        } else {
            $response = $action->db->update('zuraud_doner', " id=" . $user[0]['id'], ['name' => $name, 'email' => $email, 'phone' => $phone, 'dob' => $dob, 'gender' => $gender, 'bloodGroup' => $bloodGroup, 'password' => sha1($password), 'otp' => $otp, 'otp_expiry' => date('Y-m-d H:i:s', strtotime('+5 minutes'))]);
            if ($response) {
                echo $action->db->json(200, "OTP sent successfully", '', ['id' => $user[0]['id']]);
                http_response_code(200);
                return;
            } else {
                echo $action->db->json(500, "Internal Server Error");
                http_response_code(500);
                return;
            }
        }
    } else {
        $response = $action->db->insert('zuraud_doner', ['name' => $name, 'email' => $email, 'phone' => $phone, 'dob' => $dob, 'gender' => $gender, 'bloodGroup' => $bloodGroup, 'password' => sha1($password), 'otp' => $otp, 'otp_expiry' => date('Y-m-d H:i:s', strtotime('+5 minutes'))]);
        if ($response) {
            echo $action->db->json(200, "OTP sent successfully", '', ['id' => $response]);
            http_response_code(200);
            return;
        } else {
            echo $action->db->json(500, "Internal Server Error");
            http_response_code(500);
            return;
        }
    }
}

function verifyRegistrationOTP()
{
    global $action;
    $id = $action->db->setPostRequiredField('id', 'Id is required');
    $otp = $action->db->setPostRequiredField('otp', 'OTP is required');
    $user = $action->db->sql("SELECT `id`,`uniqueId`,`name`,`email`,`phone`,`dob`,`gender`,`bloodGroup`,`otp`,`otp_expiry` FROM `zuraud_doner` WHERE `id`='$id'");
    if ($user) {
        if ($user[0]['otp'] == $otp && strtotime($user[0]['otp_expiry']) > time()) {
            do {
                $uniqueId = 'BD' . time();
                $check = $action->db->sql("SELECT id FROM `zuraud_doner` WHERE `uniqueId`='$uniqueId'");
            } while ($check);

            $response = $action->db->update('zuraud_doner', " id=" . $user[0]['id'], ['reg_status' => 1, 'otp' => null, 'otp_expiry' => null, 'uniqueId' => $uniqueId]);
            if ($response) {
                echo $action->db->json(200, "OTP verified successfully Login to Continue", '', $user[0]);
                http_response_code(200);
                return;
            } else {
                echo $action->db->json(500, "Internal Server Error");
                http_response_code(500);
                return;
            }
        } else {
            echo $action->db->json(400, "Invalid OTP");
            http_response_code(400);
            return;
        }
    } else {
        echo $action->db->json(400, "Invalid User");
        http_response_code(400);
        return;
    }
}

function login()
{
    global $action;
    $phone = $action->db->setPostRequiredField('phone', 'Phone is required');
    $password = $action->db->setPostRequiredField('password', 'Password is required');
    $user = $action->db->sql("SELECT `id`,`uniqueId`,`name`,`email`,`phone`,`dob`,`gender`,`bloodGroup`,`address`,`latitude`,`longitude`,`pincode`,`state`,`city` FROM `zuraud_doner` WHERE (`phone`='$phone' OR `email`= '$phone' OR  `uniqueId`='$phone') AND `password`='" . sha1($password) . "' AND `reg_status`=1");
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

function setlocation()
{
    // address,latitude,longitude,pincode,state,city

    global $action;

    $AuthendicteRequest = $action->db->AuthendicateRequest();
    if (!$AuthendicteRequest['authenticated']) {
        echo $action->db->json(401, "Unauthorized access.");
        http_response_code(401);
        return;
    }

    $address = $action->db->validatePostData('address') ?: '';
    $latitude = $action->db->validatePostData('latitude') ?: '';
    $longitude = $action->db->validatePostData('longitude') ?: '';
    $pincode = $action->db->setPostRequiredField('pincode', 'Pincode is required');
    $state = $action->db->validatePostData('state') ?: '';
    $city = $action->db->validatePostData('city') ?: '';
    $id = $AuthendicteRequest['loguserid'];

    $update = $action->db->update('zuraud_doner', " id=" . $id, ['address' => $address, 'latitude' => $latitude, 'longitude' => $longitude, 'pincode' => $pincode, 'state' => $state, 'city' => $city]);
    if ($update) {
        echo $action->db->json(200, "Location updated successfully");
        http_response_code(200);
        return;
    } else {
        echo $action->db->json(500, "Internal Server Error");
        http_response_code(500);
        return;
    }
}



function fetchuserbyid()
{
    global $action;
    $id = $action->db->setPostRequiredField('loguserid', 'Id is required');
    $user = $action->db->sql("SELECT `id`,`uniqueId`,`name`,`email`,`phone`,`dob`,`gender`,`bloodGroup`,`address`,`latitude`,`longitude`,`pincode`,`state`,`city` FROM `zuraud_doner` WHERE `id`='$id' AND `reg_status`=1");
    if ($user) {
        echo $action->db->json(200, "User fetched successfully", '', $user[0]);
        http_response_code(200);
        return;
    } else {
        echo $action->db->json(400, "Invalid User");
        http_response_code(400);
        return;
    }
}

function reset_password()
{   
    
    global $action;
    $phone = $action->db->setPostRequiredField('phone', 'Phone is required');
    $password = $action->db->setPostRequiredField('password', 'Password is required');
    $cpassword = $action->db->setPostRequiredField('cpassword', 'Confirm Password is required');
    if ($password != $cpassword) {
        echo $action->db->json(400, "Password and Confirm Password does not match", 'cpassword');
        http_response_code(400);
        return;
    }
    $user = $action->db->sql("SELECT `id` FROM `zuraud_doner` WHERE `phone`='$phone' AND `reg_status`=1");
    if ($user) {
        $otp = $action->custom->generateOTP(4);

        $response = $action->db->update('zuraud_doner', " id=" . $user[0]['id'], ['otp' => $otp, 'otp_expiry' => date('Y-m-d H:i:s', strtotime('+5 minutes'))]);
        if ($response) {
            echo $action->db->json(200, "OTP sent successfully", '', ['id' => $user[0]['id']]);
            http_response_code(200);
            return;
        } else {
            echo $action->db->json(500, "Internal Server Error");
            http_response_code(500);
            return;
        }
    } else {
        echo $action->db->json(400, "Invalid User");
        http_response_code(400);
        return;
    }
}

function verifyResetPasswordOTP()
{
    global $action;
    $id = $action->db->setPostRequiredField('id', 'Id is required');
    $otp = $action->db->setPostRequiredField('otp', 'OTP is required');
    $password = $action->db->setPostRequiredField('password', 'Password is required');
    $cpassword = $action->db->setPostRequiredField('cpassword', 'Confirm Password is required');
    if ($password != $cpassword) {
        echo $action->db->json(400, "Password and Confirm Password does not match", 'cpassword');
        http_response_code(400);
        return;
    }
    $user = $action->db->sql("SELECT `id`,`uniqueId`,`name`,`email`,`phone`,`dob`,`gender`,`bloodGroup`,`otp`,`otp_expiry` FROM `zuraud_doner` WHERE `id`='$id'");
    if ($user) {
        if ($user[0]['otp'] == $otp && strtotime($user[0]['otp_expiry']) > time()) {
            $response = $action->db->update('zuraud_doner', " id=" . $user[0]['id'], ['password' => sha1($password), 'otp' => null, 'otp_expiry' => null]);
            if ($response) {
                echo $action->db->json(200, "Password updated successfully Login to Continue", '', $user[0]);
                http_response_code(200);
                return;
            } else {
                echo $action->db->json(500, "Internal Server Error");
                http_response_code(500);
                return;
            }
        } else {
            echo $action->db->json(400, "Invalid OTP");
            http_response_code(400);
            return;
        }
    } else {
        echo $action->db->json(400, "Invalid User");
        http_response_code(400);
        return;
    }
}

function newDonationReq()
{
    global $action;
    $AuthendicteRequest = $action->db->AuthendicateRequest();
    if (!$AuthendicteRequest['authenticated']) {
        echo $action->db->json(401, "Unauthorized access.");
        http_response_code(401);
        return;
    }
    $user_id = $AuthendicteRequest['loguserid'];
    $bloodGroup = $action->db->setPostRequiredField('bloodGroup', 'Blood Group is required');
    $patientName = $action->db->setPostRequiredField('patientName', 'Patient Name is required');
    $attendeePhone = $action->db->validatePostData('attendeePhone') ?: '';
    $unit = $action->db->setPostRequiredField('unit', 'Units is required');
    $requiredDate = $action->db->setPostRequiredField('requiredDate', 'Required Date is required');
    $additionalNote = $action->db->validatePostData('additionalNote') ?: '';
    $criticalStatus = $action->db->setPostRequiredField('criticalStatus', 'Critical Status is required');
    $criticalStatus = $criticalStatus == "true" ? 1 : 0;
    $address = $action->db->setPostRequiredField('address', 'Address is required');
    $latitude = $action->db->setPostRequiredField('latitude', 'Latitude is required');
    $longitude = $action->db->setPostRequiredField('longitude', 'Longitude is required');
    $pincode = $action->db->setPostRequiredField('pincode', 'Pincode is required');
    $state = $action->db->setPostRequiredField('state', 'State is required');
    $city = $action->db->setPostRequiredField('city', 'City is required');
    $tearmsAccepted = $action->db->setPostRequiredField('termsAccepted', 'Terms and Conditions is required');
    $id = $action->db->validatePostData('id') ?: '';
    if ($tearmsAccepted != "true") {
        echo $action->db->json(400, "Please accept terms and conditions", 'tearmsAccepted');
        http_response_code(400);
        return;
    }

    if (empty($id)) {
        $response = $action->db->insert('zuraud_donation_request', ['user_id' => $user_id, 'bloodGroup' => $bloodGroup, 'patientName' => $patientName, 'attendeePhone' => $attendeePhone, 'unit' => $unit, 'requiredDate' => $requiredDate, 'additionalNote' => $additionalNote, 'criticalStatus' => $criticalStatus, 'address' => $address, 'latitude' => $latitude, 'longitude' => $longitude, 'pincode' => $pincode, 'state' => $state, 'city' => $city]);
        if ($response) {
            echo $action->db->json(201, "Donation Request added successfully");
            http_response_code(201);
            return;
        } else {
            echo $action->db->json(500, "Internal Server Error");
            http_response_code(500);
            return;
        }
    } else {
        $response = $action->db->update('zuraud_donation_request', " id=" . $id, ['bloodGroup' => $bloodGroup, 'patientName' => $patientName, 'attendeePhone' => $attendeePhone, 'unit' => $unit, 'requiredDate' => $requiredDate, 'additionalNote' => $additionalNote, 'criticalStatus' => $criticalStatus, 'address' => $address, 'latitude' => $latitude, 'longitude' => $longitude, 'pincode' => $pincode, 'state' => $state, 'city' => $city]);
        if ($response) {
            echo $action->db->json(200, "Donation Request updated successfully");
            http_response_code(200);
            return;
        } else {
            echo $action->db->json(500, "Internal Server Error");
            http_response_code(500);
            return;
        }
    }
}

function fetchMyDonationReq()
{
    global $action;
    $AuthendicteRequest = $action->db->AuthendicateRequest();
    if (!$AuthendicteRequest['authenticated']) {
        echo $action->db->json(401, "Unauthorized access.");
        http_response_code(401);
        return;
    }
    $user_id = $AuthendicteRequest['loguserid'];
    $donationReq = $action->db->sql("SELECT `id`,`bloodGroup`,`patientName`,`attendeePhone`,`unit`,`requiredDate`,`additionalNote`,`criticalStatus`,`address`,`latitude`,`longitude`,`pincode`,`state`,`city`,`status` FROM `zuraud_donation_request` WHERE `user_id`='$user_id'");
    if ($donationReq) {
        echo $action->db->json(200, "Donation Request fetched successfully", '', $donationReq);
        http_response_code(200);
        return;
    } else {
        echo $action->db->json(400, "No Donation Request found");
        http_response_code(400);
        return;
    }
}

function fetchDonationReqforMe()
{
    global $action;
    $AuthendicteRequest = $action->db->AuthendicateRequest();
    if (!$AuthendicteRequest['authenticated']) {
        echo $action->db->json(401, "Unauthorized access.");
        http_response_code(401);
        return;
    }
    $user_id = $AuthendicteRequest['loguserid'];

    $user = $action->db->sql("SELECT `id`,`bloodGroup`,`latitude`,`longitude`, `pincode`,`state`,`city` FROM `zuraud_doner` WHERE `id`='$user_id' AND `reg_status`=1");

    $donationReq = $action->db->sql("SELECT `id`,`bloodGroup`,`patientName`,`attendeePhone`,`unit`,`requiredDate`,`additionalNote`,`criticalStatus`,`address`,`latitude`,`longitude`,`pincode`,`state`,`city` FROM `zuraud_donation_request` WHERE `bloodGroup`='" . $user[0]['bloodGroup'] . "' AND (`state`='" . $user[0]['state'] . "' OR `city`='" . $user[0]['city'] . "' OR `pincode`='" . $user[0]['pincode'] . "') AND `user_id`!='$user_id' AND `status` IN (0, 3) AND `requiredDate` > '" . date('Y-m-d H:i:s', strtotime('-7 days')) . "'");

    if ($donationReq) {
        echo $action->db->json(200, "Donation Request fetched successfully", '', $donationReq);
        http_response_code(200);
        return;
    } else {
        echo $action->db->json(400, "No Donation Request found");
        http_response_code(400);
        return;
    }
}

function view_MyDonationReqById()
{
    global $action;
    $AuthendicteRequest = $action->db->AuthendicateRequest();
    if (!$AuthendicteRequest['authenticated']) {
        echo $action->db->json(401, "Unauthorized access.");
        http_response_code(401);
        return;
    }
    $user_id = $AuthendicteRequest['loguserid'];
    $id = $action->db->setPostRequiredField('id', 'Request Id is required');
    $donationReq = $action->db->sql("SELECT `id`,`bloodGroup`,`patientName`,`attendeePhone`,`unit`,`requiredDate`,`additionalNote`,`criticalStatus`,`address`,`latitude`,`longitude`,`pincode`,`state`,`city`,`status`,`doner`,`request_date`,`approve_date` FROM `zuraud_donation_request` WHERE `user_id`='$user_id' AND `id`='$id'");
    
    if ($donationReq) {
        // $potentialdoner = $action->db->sql("SELECT `id`,`uniqueId`,`name`,`email`,`phone`,`dob`,`gender`,`bloodGroup`,`address`,`latitude`,`longitude`,`pincode`,`state`,`city` FROM `zuraud_doner` WHERE `bloodGroup`='" . $donationReq[0]['bloodGroup'] . "' AND (`state`='" . $donationReq[0]['state'] . "' OR `city`='" . $donationReq[0]['city'] . "' OR `pincode`='" . $donationReq[0]['pincode'] . "') AND `id`!='$user_id' AND `reg_status`=1") ?: [];
        
        $doner = $action->db->sql("SELECT d.`id`,d.`uniqueId`,d.`name`,d.`email`,d.`phone`,d.`dob`,d.`gender`,d.`bloodGroup`,d.`address`,d.`latitude`,d.`longitude`,d.`pincode`,d.`state`,d.`city`,ad.id AS historyid,ad.status,ad.rejection_reason FROM `zuraud_doner` d JOIN `approved_donations` ad ON ad.user_id = '{$donationReq[0]['doner']}' AND ad.req_id= $id  WHERE d.`id`='" . $donationReq[0]['doner'] . "' AND d.`reg_status`=1") ?: [];
        echo $action->db->json(200, "Donation Request fetched successfully", '', ['requestDetail' => $donationReq[0],  'doner' => $doner]);
        http_response_code(200);
        return;
    } else {
        echo $action->db->json(400, "No Donation Request found");
        http_response_code(400);
        return;
    }
}

function acceptDonationReq()
{
    global $action;
    $AuthendicteRequest = $action->db->AuthendicateRequest();
    if (!$AuthendicteRequest['authenticated']) {
        echo $action->db->json(401, "Unauthorized access.");
        http_response_code(401);
        return;
    }
    $user_id = $AuthendicteRequest['loguserid'];
    $id = $action->db->setPostRequiredField('id', 'Request Id is required');
    $donationReq = $action->db->sql("SELECT `id`,`bloodGroup`,`patientName`,`attendeePhone`,`unit`,`requiredDate`,`additionalNote`,`criticalStatus`,`address`,`latitude`,`longitude`,`pincode`,`state`,`city`,`status`,`doner`,`request_date`,`approve_date` FROM `zuraud_donation_request` WHERE `user_id`!='$user_id' AND `id`='$id'");
    if ($donationReq) {
        $doner = $action->db->sql("SELECT `id`,`uniqueId`,`name`,`email`,`phone`,`dob`,`gender`,`bloodGroup`,`address`,`latitude`,`longitude`,`pincode`,`state`,`city` FROM `zuraud_doner` WHERE `id`='$user_id' AND `reg_status`=1") ?: [];
        if (!$doner) {
            echo $action->db->json(400, "Invalid User");
            http_response_code(400);
            return;
        }

        if ($donationReq[0]['pincode'] == $doner[0]['pincode'] || $donationReq[0]['state'] == $doner[0]['state'] || $donationReq[0]['city'] == $doner[0]['city']) {

            $response = $action->db->update('zuraud_donation_request', " id=" . $donationReq[0]['id'], ['status' => 1, 'doner' => $user_id, 'approve_date' => date('Y-m-d H:i:s')]);
            if ($response) {
                
                $insert = $action->db->insert('approved_donations',
                 ['user_id' => $user_id,
                  'req_id' => $id, 
                  'acceptance_date' => date('Y-m-d')]);
                // die;
                if ($insert) {
                    echo $action->db->json(200, "Donation Request accepted successfully");
                    http_response_code(200);
                    return;
                } else {
                    echo $action->db->json(500, "Internal Server Error");
                    http_response_code(500);
                    return;
                }
            } else {
                echo $action->db->json(500, "Internal Server Error");
                http_response_code(500);
                return;
            }
        } else {
            echo $action->db->json(400, "Donation Request not in your location");
            http_response_code(400);
            return;
        }
    } else {
        echo $action->db->json(400, "No Donation Request found");
        http_response_code(400);
        return;
    }
}

function deleteDonationReq()
{
    global $action;
    $AuthendicteRequest = $action->db->AuthendicateRequest();
    if (!$AuthendicteRequest['authenticated']) {
        echo $action->db->json(401, "Unauthorized access.");
        http_response_code(401);
        return;
    }
    $user_id = $AuthendicteRequest['loguserid'];
    $id = $action->db->setPostRequiredField('id', 'Request Id is required');

    $response = $action->db->deleteTableRow('zuraud_donation_request', $id);
    if ($response) {
        echo $action->db->json(200, "Donation Request deleted successfully");
        http_response_code(200);
        return;
    } else {
        echo $action->db->json(500, "Internal Server Error");
        http_response_code(500);
        return;
    }
}

function confirmDonation()
{   
    
    global $action;
    $AuthendicteRequest = $action->db->AuthendicateRequest();
    if (!$AuthendicteRequest['authenticated']) {
        echo $action->db->json(401, "Unauthorized access.");
        http_response_code(401);
        return;
    }
    $user_id = $AuthendicteRequest['loguserid'];
    $id = $action->db->setPostRequiredField('id', 'Request Id is required');
    $historyid= $action->db->setPostRequiredField('historyid', 'History Id is required');
    $remark= $action->db->setPostRequiredField('remark', 'Remark is required');
    $response = $action->db->update('zuraud_donation_request', " id=" . $id, ['status' => 2]);
    if ($response) {
        $update= $action->db->update('approved_donations', " id=" . $historyid, ['status' => 1, 'approval_date' => date('Y-m-d'),'rejection_reason'=>$remark]);
        echo $action->db->json(200, "Donation Request confirmed successfully");
        http_response_code(200);
        return;
    } else {
        echo $action->db->json(500, "Internal Server Error");
        http_response_code(500);
        return;
    }
}

function rejectDonation_requestor()
{
    global $action;
    $AuthendicteRequest = $action->db->AuthendicateRequest();
    if (!$AuthendicteRequest['authenticated']) {
        echo $action->db->json(401, "Unauthorized access.");
        http_response_code(401);
        return;
    }
    $user_id = $AuthendicteRequest['loguserid'];
    $id = $action->db->setPostRequiredField('id', 'Request Id is required');
    $historyid= $action->db->setPostRequiredField('historyid', 'History Id is required');
    $rejection_reason= $action->db->setPostRequiredField('remark', 'rejection Reason is required');

    $response = $action->db->update('zuraud_donation_request', " id=" . $id, ['status' => 3]);
    if ($response) {
        $update= $action->db->update('approved_donations', " id=" . $historyid, ['status' => 2, 'rejection_date' => date('Y-m-d'), 'rejection_reason'=>$rejection_reason,'rejected_by'=>$user_id]);
        echo $action->db->json(200, "Donation Request Rejected successfully");
        http_response_code(200);
        return;
    } else {
        echo $action->db->json(500, "Internal Server Error");
        http_response_code(500);
        return;
    }
}

function fetchMyDonationHistory()
{
    global $action;
    $AuthendicteRequest = $action->db->AuthendicateRequest();
    if (!$AuthendicteRequest['authenticated']) {
        echo $action->db->json(401, "Unauthorized access.");
        http_response_code(401);
        return;
    }
    $user_id = $AuthendicteRequest['loguserid'];
    $donationHistory = $action->db->sql("SELECT ad.id AS historyid,ad.req_id ad.acceptance_date,ad.rejection_date,ad.status , dr.bloodGroup,dr.patientName,dr.unit,dr.address,dr.pincode,dr.request_date,dr.city,dr.state FROM `approved_donations` ad JOIN zuraud_donation_request dr ON dr.id= ad.req_id  WHERE ad.user_id='$user_id'");
    if ($donationHistory) {
        echo $action->db->json(200, "Donation History fetched successfully", '', $donationHistory);
        http_response_code(200);
        return;
    } else {
        echo $action->db->json(400, "No Donation History found");
        http_response_code(400);
        return;
    }
}


function rejectDonation_donar()
{
    global $action;
    $AuthendicteRequest = $action->db->AuthendicateRequest();
    if (!$AuthendicteRequest['authenticated']) {
        echo $action->db->json(401, "Unauthorized access.");
        http_response_code(401);
        return;
    }
    $user_id = $AuthendicteRequest['loguserid'];
    $id = $action->db->setPostRequiredField('req_id', 'Request Id is required');
    $historyid= $action->db->setPostRequiredField('historyid', 'History Id is required');
    $rejection_reason= $action->db->setPostRequiredField('rejection_reason', 'rejection Reason is required');

    $response = $action->db->update('zuraud_donation_request', " id=" . $id, ['status' => 3]);
    if ($response) {
        $update= $action->db->update('approved_donations', " id=" . $historyid, ['status' => 2, 'rejection_date' => date('Y-m-d'), 'rejection_reason'=>$rejection_reason]);
        echo $action->db->json(200, "Donation Request Rejected successfully");
        http_response_code(200);
        return;
    } else {
        echo $action->db->json(500, "Internal Server Error");
        http_response_code(500);
        return;
    }
}