<?php

require("../config/proxy.php");


function fetch_user()
{
    global $action;

    $updateid = $action->db->validatePostData('update_id');
    if (!$updateid) {
        echo $action->db->json(400, 'Invalid user id', '.update_id');
        http_response_code(400);
        return;
    }
    echo $action->db->json(200, 'Success', '.update_id', $action->adminGet->fetch_user($updateid));
    http_response_code(200);
    return;
}

function send_direct_mail($mail)
{
    global $action;
    $description = $action->db->validatePostData('desc') ?: '';
    $email = $action->db->validatePostData('email') ?: '';
    $subject = $action->db->validatePostData('subject') ?: '';

    // $mailsent=$action->custom->send_direct_mail($mail,$description,$subject,$email);
    $emailConfig = $action->db->getEmailHost();


    $email_sent = $action->custom->send_mail(
        $mail,
        $email,
        $description,
        $subject,
        $emailConfig['email'],
        $emailConfig['password'],
        $emailConfig['host'],
        $emailConfig['port'],
        $emailConfig['senderName']
    );

    if ($email_sent) {
        echo $action->db->json(200, true);
        http_response_code(200);
        return;
    } else {
        echo $action->db->json(400, false);
        http_response_code(400);
        return;
    }
}


function user_add($mail)
{
    global $action;

    $AuthendicteRequest = $action->db->AuthendicateRequest();
    if (!$AuthendicteRequest['authenticated']) {
        echo $action->db->json(401, "Unauthorized access.");
        http_response_code(401);
        return;
    }

    ##===========  image validation
    $tableId = 1;
    $path = "";
    if (isset($_FILES['avtar_user']) && !empty($_FILES['avtar_user']) && !empty($_FILES['avtar_user']['name'])) {
        $file = $_FILES['avtar_user'];
        $filename = pathinfo($file['name'], PATHINFO_FILENAME);
        $tmpname = $file['tmp_name'];
        $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        $new_file_other = 'avtar_user' . date('Yhs') . rand(10000000, 99999999) . round(microtime(true)) . '.' . $extension;

        ## check file valid
        if (in_array($extension, ["png", "jpg", "jpeg"]) && $file['size'] <= 5000000) {
            $path = $new_file_other;
        } else {
            $filename = $new_file_other = "";
            $errorMsg = $file['size'] > 5000000 ? "File Size should be maximum 5 MB." : "Only png, jpg, jpeg file format only.";
            echo $action->db->json(400, $errorMsg, ".avtar_user");
            http_response_code(400);
            return;
        }
    } elseif ($action->db->validatePostData('unlink_avtar_user')) {
        $filename = $new_file_other = $action->db->sanitizeClientInput($_POST['unlink_avtar_user']);
    } else {
        $filename = $new_file_other = "";
    }

    ##------------------------------------ Username Validation ----------------------------------
    $first_name = $action->db->validatePostData('first_name');
    if ($first_name) {
        if (strlen($first_name) > 25) {
            echo $action->db->json(400, "First Name should be maximum 25 characters.", ".first_name");
            http_response_code(400);
            return;
        }

        if (!preg_match('/^[A-Za-z\s.]+$/', $first_name)) {
            echo $action->db->json(400, "First Name should be alphabet characters only.", ".first_name");
            http_response_code(400);
            return;
        }
    } else {
        echo $action->db->json(400, "First Name is required.", ".first_name");
        http_response_code(400);
        return;
    }

    $middle_name = $action->db->validatePostData('middle_name');
    if ($middle_name) {
        if (strlen($middle_name) > 25) {
            echo $action->db->json(400, "Middle Name should be maximum 25 characters.", ".middle_name");
            http_response_code(400);
            return;
        }

        if (!preg_match('/^[A-Za-z\s.]+$/', $middle_name)) {
            echo $action->db->json(400, "Middle Name should be alphabet characters only.", ".middle_name");
            http_response_code(400);
            return;
        }
    } else {
        $middle_name = '';
    }

    $last_name = $action->db->validatePostData('last_name');
    if ($last_name) {
        if (strlen($last_name) > 25) {
            echo $action->db->json(400, "Last Name should be maximum 25 characters.", ".last_name");
            http_response_code(400);
            return;
        }

        if (!preg_match('/^[A-Za-z\s.]+$/', $last_name)) {
            echo $action->db->json(400, "Last Name should be alphabet characters only.", ".last_name");
            http_response_code(400);
            return;
        }
    } else {
        $last_name = '';
    }

    $role = $action->db->validatePostData('role');
    if (!$role) {
        echo $action->db->json(400, "Role is required.", ".role");
        http_response_code(400);
        return;
    }


    ##------------------------------------ Email Validation ----------------------------------
    $c_email = $action->db->validatePostData('c_email');
    if ($c_email) {
        if (filter_var(filter_var($c_email, FILTER_SANITIZE_EMAIL), FILTER_VALIDATE_EMAIL) == false) {
            echo $action->db->json(400, "Invalid Email.", ".c_email");
            http_response_code(400);
            return;
        }
    } else {
        echo $action->db->json(400, "Email is required.", ".c_email");
        http_response_code(400);
        return;
    }

    ##-----------------------------  Mobile Number Validation  ------------------

    $c_phone = $action->db->validatePostData('c_phone');
    if ($c_phone) {
        if (!preg_match('/^\d{10}$/', $c_phone)) {
            echo $action->db->json(400, "10 Digit Number allowed only.", ".c_phone");
            http_response_code(400);
            return;
        }
    } else {
        $c_phone = '';
    }
    ##-----------------------------  Mobile Number Validation  ------------------

    $c_alter_phone = $action->db->validatePostData('c_alter_phone');
    if ($c_alter_phone) {
        if (!preg_match('/^\d{10}$/', $c_alter_phone)) {
            echo $action->db->json(400, "10 Digit Number allowed only.", ".c_alter_phone");
            http_response_code(400);
            return;
        }
    } else {
        $c_alter_phone = '';
    }

    // ---------------------------------- Other Validations ------------------------

    $c_dob = $action->db->validatePostData('c_dob') ? $action->db->validatePostData('c_dob') : null;
    $c_gender = $action->db->validatePostData('c_gender');
    if (!$c_gender) {
        echo $action->db->json(400, "Gender is required.", ".c_gender");
        http_response_code(400);
        return;
    }
    $qualification = $action->db->validatePostData('qualification') ? $action->db->validatePostData('qualification') : '';

    $galterphone = $action->db->validatePostData('galterphone') ? $action->db->validatePostData('galterphone') : '';
    $gphone = $action->db->validatePostData('gphone') ? $action->db->validatePostData('gphone') : '';
    $mother_name = $action->db->validatePostData('mother_name') ? $action->db->validatePostData('mother_name') : '';
    $father_name = $action->db->validatePostData('father_name') ? $action->db->validatePostData('father_name') : '';
    $c_discription = htmlentities($_POST['c_discription'])?: '';
    $emergency_contact = $action->db->validatePostData('emergency_contact') ? $action->db->validatePostData('emergency_contact') : '';
    $exp_yrs = $action->db->validatePostData('exp_yrs') ? $action->db->validatePostData('exp_yrs') : '';
    $specialization = $action->db->validatePostData('specialization') ? $action->db->validatePostData('specialization') : null;
    $joining_date = $action->db->validatePostData('joining_date') ? $action->db->validatePostData('joining_date') : null;
    $c_pass = $action->db->validatePostData('c_pass') ? $action->db->validatePostData('c_pass') : 123456;
    $show_contact_on_website = $action->db->validatePostData('show_contact_on_website');
    if (!$show_contact_on_website) {
        echo $action->db->json(400, "Show contact on website data is required");
        http_response_code(400);	
        return;
    } else {
        $show_contact_on_website = ($show_contact_on_website == "true") ? 1 : 0;
    }
    $show_email_on_website = $action->db->validatePostData('show_email_on_website');
    if (!$show_email_on_website) {
        echo $action->db->json(400, "Show email on website data is required");
        http_response_code(400);
        return;
    } else {
        $show_email_on_website = ($show_email_on_website == "true") ? 1 : 0;
    }


    $departmentid = $action->db->validatePostData('departmentid') ?: 0;
    // if (!$departmentid) {
    //     echo $action->db->json(400, "Department is required.", ".departmentid");
    //     http_response_code(400);
    //     return;
    // }
    $designationid = $action->db->validatePostData('designationid') ?: 0;
    // if (!$designationid) {
    //     echo $action->db->json(400, "Designation is required.", ".designationid");
    //     http_response_code(400);
    //     return;
    // }

    ##-----------------------------  Address Validation  ------------------

    $c_address = $action->db->validatePostData('c_address') ?: '';
    // if (!$c_address) {
    //     echo $action->db->json(400, "Address is required.", ".c_address");
    //     http_response_code(400);
    //     return;
    // }
    $c_pincode = $action->db->validatePostData('c_pincode') ?: '';
    // if (!$c_pincode) {
    //     echo $action->db->json(400, "Pin code is required.", ".c_pincode");
    //     http_response_code(400);
    //     return;
    // }
    $c_district = $action->db->validatePostData('c_district') ?: '';
    // if (!$c_district) {
    //     echo $action->db->json(400, "District is required.", ".c_district");
    //     http_response_code(400);
    //     return;
    // }
    $c_state = $action->db->validatePostData('c_state') ?: '';
    // if (!$c_state) {
    //     echo $action->db->json(400, "State is required.", ".c_state");
    //     http_response_code(400);
    //     return;
    // }
    $c_country = $action->db->validatePostData('c_country') ?: '';
    // if (!$c_country) {
    //     echo $action->db->json(400, "Current Country is required.", ".c_country");
    //     http_response_code(400);
    //     return;
    // }

    $p_address = $action->db->validatePostData('p_address') ?: '';
    // if (!$p_address) {
    //     echo $action->db->json(400, "Address is required.", ".p_address");
    //     http_response_code(400);
    //     return;
    // }
    $p_pincode = $action->db->validatePostData('p_pincode') ?: '';
    // if (!$p_pincode) {
    //     echo $action->db->json(400, "Pin code is required.", ".p_pincode");
    //     http_response_code(400);
    //     return;
    // }
    $p_district = $action->db->validatePostData('p_district') ?: '';
    // if (!$p_district) {
    //     echo $action->db->json(400, "District is required.", ".p_district");
    //     http_response_code(400);
    //     return;
    // }
    $p_state = $action->db->validatePostData('p_state') ?: '';
    // if (!$p_state) {
    //     echo $action->db->json(400, "State is required.", ".p_state");
    //     http_response_code(400);
    //     return;
    // }
    $p_country = $action->db->validatePostData('p_country') ?: '';
    // if (!$p_country) {
    //     echo $action->db->json(400, "Current Country is required.", ".p_country");
    //     http_response_code(400);
    //     return;
    // }


    ##------------------------------------ Update id ----------------------------------

    $user_update_id = $action->db->validatePostData('user_update_id') ? $action->db->validatePostData('user_update_id') : '';
    $user_updateu_id = $action->db->validatePostData('user_updateu_id') ? $action->db->validatePostData('user_updateu_id') : '';
    ##------------------------------------ INSERT INTO DATABASE ----------------------------------


    $column = [
        'first_name' => $first_name,
        'middle_name' => $middle_name,
        'last_name' => $last_name,
        'role' => $role,
        'u_email' => $c_email,
        'u_phone' => $c_phone,
        'c_alter_phone' => $c_alter_phone,
        'dob' => $c_dob,
        'gender' => $c_gender,
        'qualification' => $qualification,
        'departmentid' => $departmentid,
        'designationid' => $designationid,
        'father_name' => $father_name,
        'mother_name' => $mother_name,
        'gphone' => $gphone,
        'galterphone' => $galterphone,
        'c_pin_code' => $c_pincode,
        'c_address' => $c_address,
        'c_district' => $c_district,
        'c_state' => $c_state,
        'c_country' => $c_country,
        'p_pincode' => $p_pincode,
        'p_address' => $p_address,
        'p_district' => $p_district,
        'p_country' => $p_country,
        'p_state' => $p_state,
        'pass' => sha1($c_pass),
        'discription' => $c_discription,
        'emergency_contact' => $emergency_contact,
        'exp_yrs' => $exp_yrs,
        'specialization' => $specialization,
        'joining_date' => $joining_date,
        'show_email_on_website' => $show_email_on_website,
        'show_contact_on_website' => $show_contact_on_website,
    ];
  	
    if (!empty($path)) {
        $column['avtar'] = $path;
    }
    if (empty($user_update_id)) {



        $result_uid = $action->db->sql("SELECT id FROM " . $action->db->getTable($tableId) . " ORDER BY id DESC LIMIT 1");
        // $prefix = strtoupper(substr(uniqid(), -6));


        if ($result_uid) {
            $last_id = $result_uid[0]['id'];
            $uid = 'RPNLUP' . ($last_id + 1);
        } else {
            $uid = 'RPNLUP';
        }

        $action->db->make_dir($action->db->uploadDir() . 'user/' . $uid);
        $upload_path = $action->db->uploadDir() . 'user/' . $uid . '/';

        $result = $action->adminGet->get_table_data($tableId, ['u_email' => $c_email, 'u_phone' => $c_phone]);
        if ($result) {
            echo $action->db->json(400, "Faculty already registered.", ".c_email");
            http_response_code(400);
            return;
        } else {


            $column['reg_date'] = date('Y-m-d');
            $column['uid'] = $uid;


                $insert = $action->db->insert($action->db->getTable($tableId), $column);
            if ($insert) {
                $log = $action->db->mainLog($AuthendicteRequest['loguserid'], $AuthendicteRequest['login_type'], $action->db->getTable($tableId), $insert, "Create", "Faculty Created with userID: " . $uid, $action->db->getClientIP());
                $rootUrl = 'http' . (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 's' : '') . '://' . $_SERVER['HTTP_HOST'] . '/';
                $encuid = $action->custom->encrypt_data($uid);

                // $varifylink = $rootUrl . "/admin/verify-email?uid=$encuid";
                //$varifylink = "http://localhost:5173/admin/verify-email?uid=" . urlencode($encuid);
              $domain11 = ($_SERVER['HTTPS'] ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'];
			  $varifylink = $domain11 . "/admin/verify-email?uid=" . urlencode($encuid);

                $description = "Please click the below link to verify your email address <br>  " . $varifylink;
                $subject = "Email Verify Link";

                $emailConfig = $action->db->getEmailHost();


                $email_sent = $action->custom->send_mail(
                    $mail,
                    $c_email,
                    $description,
                    $subject,
                    $emailConfig['email'],
                    $emailConfig['password'],
                    $emailConfig['host'],
                    $emailConfig['port'],
                    $emailConfig['senderName']
                );
            } else {
                echo $action->db->json(500, "Internal Server Error", '', $column);
                http_response_code(500);
                return;
            }


            if (!empty($path) && !empty($new_file_other)) {
                move_uploaded_file($tmpname, $upload_path . $path);
            }
            echo $action->db->json(201, "Faculty Created with userID: " . $uid, );

            http_response_code(201);
            return;
        }
    } else {

        $upload_path_upd = $action->db->uploadDir() . 'user/' . $user_updateu_id . '/';
        $action->db->make_dir($action->db->uploadDir() . 'user');
        $action->db->make_dir($action->db->uploadDir() . 'user/' . $user_updateu_id);
        $upload_path = $action->db->uploadDir() . 'user/' . $user_updateu_id . '/';
      
      
 

        $result_update = $action->adminGet->get_table_data($tableId, ['u_email' => $c_email, 'u_phone' => $c_phone]);

        if ($result_update && count($result_update) >= 1 && $result_update[0]['id'] != $user_update_id) {
            echo $action->db->json(400, "Faculty already registered.", ".c_email");
            http_response_code(400);
            return;
        } else {
            try {

                $action->db->update($action->db->getTable($tableId), "id='{$user_update_id}'", $column);
                $log = $action->db->mainLog($AuthendicteRequest['loguserid'], $AuthendicteRequest['login_type'], $action->db->getTable($tableId), $user_update_id, "Update", "Faculty Updated .", $action->db->getClientIP());

                if (!empty($path)) {
                    move_uploaded_file($tmpname, $upload_path_upd . $path);
                }
                if (!empty($path) && isset($_POST['unlink_avtar_user']) && !empty($_POST['unlink_avtar_user'])) {
                    if (file_exists($upload_path_upd . $_POST['unlink_avtar_user'])) {
                        unlink($upload_path_upd . $_POST['unlink_avtar_user']);
                    }
                }

                echo $action->db->json(200, "Updated successfully.");
                http_response_code(200);
                return;
            } catch (Exception $e) {
                echo $action->db->json(500, $e);
                http_response_code(500);
                return;
            }
        }
    }

}



function verify_email()
{
    global $action;

    $encuid = $action->db->validatePostData('uid');
    if (!$encuid) {
        echo $action->db->json(400, "UID Is required");
        http_response_code(400);
        return;
    }

    try {

        $decryptedUid = $action->custom->decrypt_data($encuid);

        $user = $action->adminGet->get_table_data(1, ['uid' => $decryptedUid], null, " `verified_email`, `id`, `uid` ");

        if ($user[0]['verified_email'] == 0) {
            $update = $action->db->update($action->db->getTable(1), "id='{$user[0]['id']}", ['verified_email' => 1]);

            if ($update) {
                $log = $action->db->mainLog($user[0]['id'], "Faculty", $action->db->getTable(1), $user[0]['id'], "Update", "Email Verified", $action->db->getClientIP());
                echo $action->db->json(200, "Email verified successfully.");
                http_response_code(200);
                return;
            } else {
                echo $action->db->json(500, "Internal Server Error");
                http_response_code(500);
            }
        } else {
            echo $action->db->json(400, "Email is already verified");
            http_response_code(400);
            return;
        }
    } catch (Exception $e) {
        echo $action->db->json(400, "Something Went Wrong");
        http_response_code(400);
        return;
    }
}

function load_userPage()
{
    global $action;



    $page_no = $duid = $duname = $duemail = $dphone = $ddistrict = $dstate = $dgender = $dfromdate = $dtodate = $c_type = null;

    // Convert $page_no to an integer
    $page_no = isset($_POST['page_no']) ? intval($_POST['page_no']) : null;

    $duid = isset($_POST['duid']) ? $action->db->validatePostData('duid') : null;
    $duname = isset($_POST['duname']) ? $action->db->validatePostData('duname') : null;
    $duemail = isset($_POST['duemail']) ? $action->db->validatePostData('duemail') : null;
    $dphone = isset($_POST['dphone']) ? $action->db->validatePostData('dphone') : null;
    $ddistrict = isset($_POST['ddistrict']) ? $action->db->validatePostData('ddistrict') : null;
    $dstate = isset($_POST['dstate']) ? $action->db->validatePostData('dstate') : null;
    $dgender = isset($_POST['dgender']) ? $action->db->validatePostData('dgender') : null;
    $dfromdate = isset($_POST['dfromdate']) ? $action->db->validatePostData('dfromdate') : null;
    $dtodate = isset($_POST['dtodate']) ? $action->db->validatePostData('dtodate') : null;
    $c_type = isset($_POST['c_type']) ? $action->db->validatePostData('c_type') : null;

    echo $action->adminGet->load_user($page_no, $duid, $duname, $duemail, $dphone, $ddistrict, $dstate, $dgender, $dfromdate, $dtodate, $c_type);
}

function trashed_userPage()
{
    global $action;
    try {
        $faculty = $action->adminGet->get_table_data(1, ['delete_status' => 1]);
        echo $action->db->json(200, "", '', $faculty);
        http_response_code(200);
        return;
    } catch (Exception $e) {
        echo $action->db->json(500, "An error occurred. Please try again later.");
        http_response_code(500);
        return;
    }
}

function getDistinctState()
{
    global $action;



    $action->adminGet->getDistinctState();
}
function getDistinctDistrict()
{
    global $action;



    $action->adminGet->getDistinctDistrict();
}
function getUserIdName()
{
    global $action;


    $action->adminGet->getUserIdName();
}

function pin_code()
{

    global $action;

    $pincode = $action->db->validatePostData('c_pincode');
    $data = file_get_contents('http://postalpincode.in/api/pincode/' . $pincode);
    $data = json_decode($data);


    if (isset($data->PostOffice['0'])) {
        echo $action->db->json(200, "", "", $data->PostOffice['0']);
        http_response_code(200);
        return;
    } else {

        echo $action->db->json(400, "Pincode not found");
        http_response_code(400);
        return;
    }
}

function checkemailverified()
{

    global $action;
    $email = $action->db->validatePostData('user_email');
    if (!$email) {
        echo $action->db->json(400, "Email is required");
        http_response_code(400);
        return;
    }
    $user = $action->adminGet->get_table_data(1, ['u_email' => $email], null, " u_name, u_email, verified_email");
    if ($user) {
        if ($user[0]['verified_email'] == 0) {
            echo $action->db->json(201, "OTP Sent");
            http_response_code(200);
            return;
        } else {
            echo $action->db->json(200, "Email Verified");
            http_response_code(200);
            return;
        }
    } else {
        echo $action->db->json(400, "Invalid Email is Provided");
        http_response_code(400);
        return;
    }
}

function resetpass1($mail)
{
    global $action;
    $email = $action->db->validatePostData('email');
    if (!$email) {
        echo $action->db->json(400, "Email is required", ".email");
        http_response_code(400);
        return;
    }
    $user = $action->adminGet->get_table_data(1, ['u_email' => $email], null, " `u_email`, `id` ");
    if ($user) {
        $otp = mt_rand(100000, 999999);
        $description = "OTP To varify your Mail is  " . $otp;
        $subject = "OTP For Reset Your Password";

        $emailConfig = $action->db->getEmailHost();
        try {

            $emailsent = $action->custom->send_mail(
                $mail,
                $email,
                $description,
                $subject,
                $emailConfig['email'],
                $emailConfig['password'],
                $emailConfig['host'],
                $emailConfig['port'],
                $emailConfig['senderName']
            );
            if ($emailsent) {
                $log = [
                    'userid' => $user[0]['id'],
                    'user_type' => "Faculty",
                    'table_name' => $action->db->getTable(1),
                    'row_id' => $user[0]['id'],
                    'log_type' => "Update",
                    'log_details' => "Password reset initiated",
                ];
                $logset = $action->db->insert($action->db->getTable(11), $log);
                $currentTime = new DateTime();
                $currentTime->modify('+5 minutes');
                $timeFiveMinutesAhead = $currentTime->format('Y-m-d H:i:s');
                $setotp = $action->db->update($action->db->getTable(1), " id= " . $user[0]['id'], ['otp' => $otp, 'otp_expiry' => $timeFiveMinutesAhead]);
            }
            if (($emailsent || $logset) && $setotp) {
                echo $action->db->json(201, "OTP Sent to Your Email");
                http_response_code(201);
                return;
            }
        } catch (Exception $e) {
            echo $action->db->json(400, "Email sending failed: " . $e->getMessage());
            return;
        }
    } else {
        echo $action->db->json(400, "Invalid Email is Provided");
        http_response_code(400);
        return;
    }
}

function resetpass2()
{
    global $action;
    $email = $action->db->validatePostData('email');
    if (!$email) {
        echo $action->db->json(400, "Email is required", ".email");
        http_response_code(400);
        return;
    }

    $otp = $action->db->validatePostData('otp');
    if (!$otp) {
        echo $action->db->json(400, "OTP is required", ".otp");
        http_response_code(400);
        return;
    }

    $newpassword = $action->db->validatePostData('newpassword');
    if (!$newpassword) {
        echo $action->db->json(400, "Password is required", ".newpassword");
        http_response_code(400);
        return;
    }


    $user = $action->adminGet->get_table_data(1, ['u_email' => $email], null, " `u_email`, `id`, `otp`, `otp_expiry` ");
    if ($user) {

        if ($user[0]['otp_expiry'] > time()) {
            if ($otp == $user[0]['otp']) {
                $password = sha1($newpassword);
                try {
                    $passwordchanged = $action->db->update($action->db->getTable(1), " id = {$user[0]['id']} ", ['pass' => $password]);
                    if ($passwordchanged) {
                        echo $action->db->json(200, "Password Changed Successfully");
                        http_response_code(200);
                        $log = $action->db->mainLog($user[0]['id'], "Faculty", $action->db->getTable(1), $user[0]['id'], "Update", "Password Changed", $action->db->getClientIP());
                        return;
                    }
                } catch (Exception $e) {
                    echo $action->db->json(500, "Internal Server Error ");
                    http_response_code(500);
                    return;
                }
            } else {
                echo $action->db->json(400, "Invalid OTP");
                http_response_code(400);
                return;
            }
        } else {
            echo $action->db->json(400, "OTP has expired");
            http_response_code(400);
            return;
        }
    } else {
        echo $action->db->json(400, "Invalid Email is Provided");
        http_response_code(400);
        return;
    }
}

function get_role()
{
    global $action;
    $AuthendicteRequest = $action->db->AuthendicateRequest();
    if (!$AuthendicteRequest['authenticated']) {
        echo $action->db->json(401, "Unauthorized access.");
        http_response_code(401);
        return;
    }

    $role = $action->adminGet->get_table_data(2, ['status' => 1], null, " role_name,id");
    if ($role) {
        echo $action->db->json(200, '', '', $role);
        http_response_code(200);
        return;
    } else {
        echo $action->db->json(400, "No Role Found ");
        http_response_code(400);
        return;
    }
}

function userLogin_ad($mail)
{
    global $action;



    $email = $action->db->validatePostData('user_email');
    if (!$email) {
        echo $action->db->json(400, "Please enter your email.", ".user_email", ".user_email");
        http_response_code(400);
        return;
    }


    $pass = $action->db->validatePostData('user_pass');
    if (!$pass) {
        echo $action->db->json(400, "Please enter your password.", ".user_pass");
        http_response_code(400);
        return;
    }
    $pass = sha1($pass);

    $otp = $action->db->validatePostData('otp') ? $action->db->validatePostData('otp') : false;

    $result1 = $action->db->adminUserLogin($email, $pass, $otp);
    if ($result1) {
        // return data of each row
        if ($result1[0]['first_login'] == 0 || $result1[0]['verified_email'] == 0) {
            $otp = rand(100000, 999999);
            $description = "OTP To varify your Mail is  " . $otp;
            $subject = "OTP For varifying your Mail";

            $emailConfig = $action->db->getEmailHost();
            try {

                $email_sent = $action->custom->send_mail(
                    $mail,
                    $email,
                    $description,
                    $subject,
                    $emailConfig['email'],
                    $emailConfig['password'],
                    $emailConfig['host'],
                    $emailConfig['port'],
                    $emailConfig['senderName']
                );
            } catch (Exception $e) {
                echo $action->db->json(400, "Email sending failed: " . $e->getMessage());
                return;
            }
            if ($email_sent) {
                $currentTime = new DateTime();
                $currentTime->modify('+5 minutes');
                $timeFiveMinutesAhead = $currentTime->format('Y-m-d H:i:s');
                $action->db->update($action->db->getTable(1), "id='{$result1[0]['id']}'", ['otp' => $otp, 'otp_expiry' => $timeFiveMinutesAhead]);

                echo $action->db->json(201, "OTP Generated and sent to your email");
                http_response_code(201);
                return;
            }
        } elseif ($result1[0]['role'] == 0) {
            echo $action->db->json(400, "Access Denied, Contact Your Admin");
            http_response_code(400);
        } else {
            $roleid = $result1[0]['role'];
            $status = $action->adminGet->get_table_data(2, ['id' => $roleid], '', " status ");
            if ($status && $status[0]['status'] == 0) {
                echo $action->db->json(400, "Access Denied, Contact Your Admin");
                http_response_code(400);
                return;
            }
            echo $action->db->json(200, "", "", $result1);
            http_response_code(200);
            return;
        }
    } else {
        echo $action->db->json(400, "Invalid credentials.");
        http_response_code(400);
    }
}


function delete_faculty()
{
    global $action;
    $AuthendicteRequest = $action->db->AuthendicateRequest();
    if (!$AuthendicteRequest['authenticated']) {
        echo $action->db->json(401, "Unauthorized access.");
        http_response_code(401);
        return;
    }
    $id = $action->db->validatePostData('id');
    if (!$id) {
        echo $action->db->json(400, "Provide faculty id to delete.");
        http_response_code(400);
        return;
    }

    $action->db->deleteTable($action->db->getTable(1), $id, $AuthendicteRequest);
}

function toggle_status()
{
    global $action;
    $AuthendicteRequest = $action->db->AuthendicateRequest();
    if (!$AuthendicteRequest['authenticated']) {
        echo $action->db->json(401, "Unauthorized access.");
        http_response_code(401);
        return;
    }
    $id = $action->db->validatePostData('id');
    if (!$id) {
        echo $action->db->json(400, "Provide page id to Toggle Status.");
        http_response_code(400);
        return;
    }
    $action->db->toggle_status($action->db->getTable(1), $id, $AuthendicteRequest);
}

function load_faculty_front()
{
    global $action;
    $faculty = $action->db->sql("SELECT u.`avtar`, u.`first_name`, u.`middle_name`, u.`last_name`, CASE WHEN u.`show_email_on_website` = 1 THEN u.`u_email` ELSE NULL END AS `u_email`, CASE WHEN u.`show_contact_on_website` = 1 THEN u.`u_phone` ELSE NULL END AS `u_phone`, u.`qualification`, u.`departmentid`, u.`designationid`, u.`specialization`, u.`exp_yrs`, u.`uid`, u.`id`, d.`title` AS `designation` FROM `zuraud_user` u LEFT JOIN `designation` d ON d.`id` = u.`designationid` WHERE u.`delete_status` = 0 AND u.`status` = 1;");
    if ($faculty) {
        echo $action->db->json(200, "", "", $faculty);
        http_response_code(200);
        return;
    } else {
        echo $action->db->json(400, "No faculty found");
        http_response_code(400);
        return;
    }
}

function fetch_role_by_staff()
{
    global $action;
    $id = $action->db->validatePostData('role_id');
    if (!$id) {
        echo $action->db->json(400, "Role id is required");
        http_response_code(400);
        return;
    }

    echo $action->adminGet->fetch_role_by_staff($id);

}
function fetchRoleOnly()
{
    global $action;
    $id = $action->db->validatePostData('id');
    $role = $action->db->sql("SELECT * FROM zuraud_role WHERE id = {$id}");
    if ($role) {
        echo $action->db->json(200, "", "", $role);
        http_response_code(200);
        return;
    } else {
        echo $action->db->json(400, "No role found");
        http_response_code(400);
        return;
    }
}