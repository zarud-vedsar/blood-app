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

