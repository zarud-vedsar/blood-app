<?php
class custom
{
    public function send_mail($mail, $email, $html, $subject, $user_email, $user_pass, $host = "", $host_port = 587, $title = 'Unknown')
    {
        // Don't create a new $mail object here, as it's passed as an argument

        // Set SMTP configuration
        $mail->IsSMTP();
        $mail->Host = $host;
        $mail->Port = $host_port;
        $mail->SMTPSecure = "tls";
        $mail->SMTPAuth = true;
        $mail->Username = $user_email;
        $mail->Password = $user_pass;
        $mail->SetFrom($user_email, $title);
        $mail->addAddress($email);
        $mail->IsHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $html;

        // Set SMTP options using SMTPOptions
        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => false
            )
        );

        // Send the email
        if ($mail->Send()) {
            return TRUE;
        } else {
            return FALSE;
        }
    }


    
    // ! ||--------------------------------------------------------------------------------||
    // ! ||                        RETURN FORM GROUP COLUMN INPUT FIELD                    ||
    // ! ||--------------------------------------------------------------------------------||

    public function createFormField($label = '', $type = 'text', $name = '', $placeholder = '', $id = '', $labelClass = 'font-weight-semibold', $value = '',  $class = 'form-control', $customCode = '', $column = 'col-md-6', $columnid = '')
    {
        ob_start();
?>
        <div class="<?php echo $column ?> form-group" id="<?php echo $columnid ?>">
            <label class="<?php echo $labelClass ?>" for="<?php echo $id ?>"><?php echo $label ?></label>
            <input type="<?php echo $type; ?>" name="<?php echo $name ?>" id="<?php echo $id ?>" value="<?php echo $value; ?>" class="<?php echo $class ?>" placeholder="<?php echo $placeholder; ?>" <?php echo $customCode ?> />
            <span class="mt-1 text-danger <?php echo $id ?>"></span>
        </div>
    <?php
        return ob_get_clean();
    }

    public function createTextareaField($label = '', $name = '', $placeholder = '', $id = '', $labelClass = 'font-weight-semibold', $value = '', $class = 'form-control', $customCode = '', $column = 'col-md-6', $columnid = '')
    {
        ob_start();
    ?>
        <div class="<?php echo $column ?> form-group" id="<?php echo $columnid ?>">
            <label class="<?php echo $labelClass ?>" for="<?php echo $id ?>"><?php echo $label ?></label>
            <textarea name="<?php echo $name ?>" id="<?php echo $id ?>" class="<?php echo $class ?>" placeholder="<?php echo $placeholder; ?>" <?php echo $customCode ?>><?php echo $value; ?></textarea>
            <span class="mt-1 text-danger <?php echo $id ?>"></span>
        </div>
<?php
        return ob_get_clean();
    }

    // ! ||--------------------------------------------------------------------------------||
    // ! ||                           RETURN TD TAG WITH DATA                              ||
    // ! ||--------------------------------------------------------------------------------||
    public function createTableCell($content = '', $class = '')
    {
        $html = '<td class="' . $class . '">' . $content . '</td>';
        return $html;
    }
    // ! ||--------------------------------------------------------------------------------||
    // ! ||                                  RETURN UNIQUE ID                              ||
    // ! ||--------------------------------------------------------------------------------||

    public function generateRandomUniqueId($suffix)
    {
        $prefix = $suffix; // Optional prefix to add to the unique ID
        $timestamp = rand(10000, 99999) . date('mis');
        $randomId = $prefix . bin2hex(random_bytes(8)) . $timestamp;
        $randomId = substr($randomId, 0, 25); // Trim the ID to a maximum of 25 characters
        return $randomId;
    }

    // ! ||--------------------------------------------------------------------------------||
    // ! ||                                  VALIDATE EMAIL                                 ||
    // ! ||--------------------------------------------------------------------------------||
    public function validateEmail($email)
    {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return true;
        } else {
            return false;
        }
    }
    // ! ||--------------------------------------------------------------------------------||
    // ! ||                                  VALIDATE NAME                                 ||
    // ! ||--------------------------------------------------------------------------------||
    public function validateName($name)
    {
        // Specify the desired name pattern
        $pattern = '/^[a-zA-Z\'\- ]+$/u';

        if (preg_match($pattern, $name)) {
            return true;
        } else {
            return false;
        }
    }
    // ! ||--------------------------------------------------------------------------------||
    // ! ||                                 VALIDATE URL                                   ||
    // ! ||--------------------------------------------------------------------------------||
    public function validateURL($url)
    {
        // Specify the desired URL pattern
        $pattern = '/^(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/';

        if (preg_match($pattern, $url)) {
            return true;
        } else {
            return false;
        }
    }


    // ! ||--------------------------------------------------------------------------------||
    // ! ||                          TRUNCATE CHARACTER FROM A STRING                       ||
    // ! ||--------------------------------------------------------------------------------||
    public function truncateString($string, $maxLength)
    {
        if (strlen($string) > $maxLength) {
            $truncatedString = substr($string, 0, $maxLength) . '...';
        } else {
            $truncatedString = $string;
        }

        return $truncatedString;
    }

    // ! ||--------------------------------------------------------------------------------||
    // ! ||                             GENERATE FILE NAME                                 ||
    // ! ||--------------------------------------------------------------------------------||
    public function generateRandomFilename($filename)
    {
        $uniqueId = uniqid();
        $extension = pathinfo($filename, PATHINFO_EXTENSION);
        $randomFilename = $uniqueId . date('Ymdh') . '.' . $extension;
        return $randomFilename;
    }

    // Function to generate a random OTP
    function generateOTP($length = 6)
    {
        return str_pad(rand(0, pow(10, $length) - 1), $length, '0', STR_PAD_LEFT);
    }

    // Function to create the OTP verification email
    function createOtpVerificationEmail($userName, $otp)
    {

        // Start output buffering to capture the HTML content
        ob_start();

        // Using heredoc syntax for multi-line HTML
        echo <<<HTML
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
        <div style="width: 100%; background-color: #f4f4f4; padding: 20px 0;">
            <div style="max-width: 600px; background-color: #ffffff; margin: 0 auto; border-radius: 8px; padding: 0 20px 20px 20px;">
                <!-- Header Image -->
                <div style="text-align: center; padding: 10px 0;">
                    <img src="https://www.rpnlup.ac.in/assets/rpnl-logo-DLMisb5c.png" alt="Company Logo" style="width: 100%; height: auto; display: block; margin: 0 auto;">
                </div>

                <!-- Greeting and OTP Verification Title and Instructions -->
                <div style="text-align: center; padding: 20px 0;">
                    <h1 style="color: #333333; font-size: 26px; margin: 0; font-weight: bold;">OTP Verification for Job Application</h1>
                    <p style="color: #666666; font-size: 16px; margin-top: 10px;">Dear <strong>{$userName}</strong>,</p>
                    <p style="color: #666666; font-size: 16px; margin-top: 10px;">To verify your email as part of your job application process, please use the OTP below on the verification page.</p>
                </div>

                <!-- OTP Display -->
                <div style="text-align: center;">
                    <div style="display: inline-block; background-color: #005f99; color: #ffffff; font-size: 28px; font-weight: bold; padding: 15px 30px; border-radius: 8px; letter-spacing: 5px;">
                        {$otp}
                    </div>
                </div>

                <!-- Security Message -->
                <div style="text-align: center; padding: 20px;">
                    <p style="color: #888888; font-size: 14px; margin: 0;">This OTP is valid for 10 minutes. For security, please do not share it.</p>
                </div>

                <!-- Footer Message -->
                <div style="text-align: center; padding: 20px;">
                    <p style="color: #999999; font-size: 12px; margin: 0;">If you did not request this email, you can safely ignore it.</p>
                </div>
                <div style="text-align: center; padding: 20px 0; border-top: 1px solid #eeeeee;">
                    <p style="color: #aaaaaa; font-size: 12px; margin: 0;">&copy; 2024 <a href="https://www.rpnlup.ac.in" style="color: #005f99; text-decoration: none;">Dr. Rajendra Prasad National Law University</a>. All rights reserved.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    HTML;

        // Get the contents of the output buffer and clean it
        return ob_get_clean();
    }

    



    // ! ||--------------------------------------------------------------------------------||
    // ! ||                        AMOUNT IN BILLION, MILLION SYMBOL                       ||
    // ! ||--------------------------------------------------------------------------------||
    public function amount_in_k($amount)
    {
        if ($amount < 1000) {
            // Anything less than a thousand
            $format = number_format($amount);
        } else if ($amount < 1000000) {
            // Anything less than a million
            $format = number_format($amount / 1000, 2) . 'k';
        } else if ($amount < 1000000000) {
            // Anything less than a billion
            $format = number_format($amount / 1000000, 2) . 'M';
        } else {
            // At least a billion
            $format = number_format($amount / 1000000000, 2) . 'B';
        }

        return $format;
    }


    /* ***************************************************************************************************
    ************                       Function for mail message    ********
    **************************************************************************************************** */


    public function contactTemplete($msg)
    {
        $html = '
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Reply</title>
        <style>
        * {
            font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
            }
            </style>
            </head>
            <body>
            <div style="border-radius: 10px;margin:0;align-items: center;background: #F2F2F2;padding:1rem 0;">
            <div style="margin:auto;width:86%;border-radius: 10px;background: #fff !important;padding: 2rem;">
            <img style="width: 80%;margin:0 auto;display:flex;justify-content:center;max-height:200px;" src="https://www.rpnlup.ac.in/assets/rpnl-logo-DLMisb5c.png" alt="">
                <div style="margin-top:20px;">
                ' . $msg . '
                </div>
                </div>
                </div>
                </body>
                </html>
                ';
        return $html;
    }

    public function encrypt_data($data)
    {
        $key = '1234567890123456'; // 16-byte key for AES-128
        $iv = '1234567890123456';  // 16-byte IV (for simplicity, use a fixed IV here)

        // Encrypt the data using AES-128-CBC
        $encrypted = openssl_encrypt($data, 'aes-128-cbc', $key, 0, $iv);

        // URL-safe Base64 encode the encrypted data
        return rtrim(strtr(base64_encode($encrypted), '+/', '-_'), '=');
    }

    public function decrypt_data($encryptedData)
    {
        $key = '1234567890123456'; // 16-byte key for AES-128
        $iv = '1234567890123456';  // 16-byte IV (for simplicity, use a fixed IV here)

        // Convert URL-safe Base64 back to normal Base64
        $decoded = base64_decode(strtr($encryptedData, '-_', '+/'));

        // Decrypt the data using AES-128-CBC
        return openssl_decrypt($decoded, 'aes-128-cbc', $key, 0, $iv);
    }
    // ! ||--------------------------------------------------------------------------------||
    // ! ||                              THE END OF MAIN CLASS                             ||
    // ! ||--------------------------------------------------------------------------------||
}
