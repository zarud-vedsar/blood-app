<?php

require("../config/proxy.php");

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

