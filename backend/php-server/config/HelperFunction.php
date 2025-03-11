<?php
/**
 * Generates an HTML email template for sending an OTP (One-Time Password).
 * 
 * This function creates a visually styled HTML email template that includes:
 * - An OTP for email verification.
 * - A disclaimer to not share the OTP with anyone.
 * - Custom branding and signature for Dr. Rajendra Prasad National Law University.
 * 
 * @param string $random_otp The generated OTP to be included in the email.
 * @param string $img_src The URL/path of the image to be displayed in the email.
 * @return string A complete HTML email template as a string.
 */
function generate_otp_email_template($random_otp, $img_src)
{
  // Begin creating the HTML structure for the email
  $html = '<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OTP Verification</title>
            <style>
                /* Apply global font styles for consistency */
                * {
                    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", 
                                "Lucida Sans", Arial, sans-serif;
                }
            </style>
        </head>
        <body>
            <!-- Outer container for background and centering -->
            <div style="border-radius: 20px; margin: 0; align-items: center; background: rgba(250, 235, 215); padding: 2rem 0;">
                <!-- Inner container for content with styled background -->
                <div style="margin: auto; width: 85%; text-align: center; border-radius: 8px;
                            background: #fff; box-shadow: 2px 2px 3px #c9c9c9, -2px -2px 3px #ffffff;
                            padding: 2rem 0;">
                    <!-- Display logo or image -->
                    <img style="width: 30%; height: auto;" src="' . $img_src . '" alt="University Logo">
                    <br>
                    <!-- OTP container -->
                    <div style="margin: 0; align-items: center; padding: 0.5rem 0;" class="d-flex justify-content-center">
                        <h2 style="margin-left: 20%; font-size: 22px; width: 60%; text-align: center;
                                    color: #333; background: #ededed; padding: 1.5rem 0;">
                            ' . $random_otp . '
                        </h2>
                    </div>
                    <!-- Message for OTP purpose -->
                    <h3>
                        <b>Your <i style="color: rgb(0, 170, 0); font-size: 20px;">OTP</i> to verify your email address.</b>
                    </h3>
                    <!-- Security disclaimer -->
                    <h3 style="background: rgb(255, 30, 30); margin-top: 2rem; color: #fff; padding: 1.5rem; letter-spacing: 3px;">
                        <b>Please, Do Not Share This Code With Anyone.</b>
                    </h3>
                    <!-- Footer message -->
                    <p style="font-size: 16px; color: #333; text-align: start; padding: 5px 30px;">
                        Best regards,<br>The University Team
                    </p>
                    <!-- Footer with university details -->
                    <p style="margin: 0;">&copy; ' . date('Y') . ' Dr. Rajendra Prasad National Law University. All Rights Reserved.</p>
                    <p style="margin: 0;">Gaddopur, Phaphamau, Prayagraj, Uttar Pradesh 211013</p>
                </div>
            </div>
        </body>
        </html>';

  // Return the generated HTML string
  return $html;
}
/**
 * Generates an HTML email template for student registration confirmation.
 * 
 * This template includes:
 * - Registration details (e.g., Registration No, Enrollment No, Name, Email, Password).
 * - A warm welcome message with the university's branding.
 * - Footer with university address and copyright information.
 * 
 * @param string $companyLogo URL of the university logo.
 * @param string $sname Student's name.
 * @param string $registrationNo Student's registration number.
 * @param string $enrollmentNo Student's enrollment number.
 * @param string $semail Student's email address.
 * @param string $spassword Student's password (to be shared securely).
 * @return string A complete HTML email template as a string.
 */
function generate_registration_confirmation_email($companyLogo, $sname, $registrationNo, $enrollmentNo, $semail, $spassword)
{
  // HTML content for the email
  $html = '
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Student Registration Confirmation</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 5px; overflow: hidden; border: 1px solid #e0e0e0;">
          <thead>
            <tr>
              <td colspan="4" style="padding: 20px; background-color: #f4f4f4;">
                <div style="width: 100%; max-width: 600px; margin: 0 auto;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <img src="' . $companyLogo . '" alt="University Logo">
                    <div style="text-align: right;">
                      <h5 style="margin: 0; font-size: 18px;">Dr. Rajendra Prasad National Law University</h5>
                      <h6 style="margin: 0; font-size: 14px; color: #555;">Gaddopur, Phaphamau, Prayagraj, Uttar Pradesh 211013</h6>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th style="background-color: #4CAF50; color: #ffffff; padding: 15px; text-align: center;">
                <h1 style="margin: 0;">Welcome to Our University!</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 20px;">
                <p style="font-size: 16px; color: #333;">Dear <strong>' . $sname . '</strong>,</p>
                <p style="font-size: 16px; color: #333;">Thank you for registering with us! Below are your registration details:</p>

                <table style="width: 100%; margin-top: 20px; font-size: 16px;">
                  <tr>
                    <td style="padding: 10px 0;"><strong>Registration No:</strong></td>
                    <td style="padding: 10px 0;">' . $registrationNo . '</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0;"><strong>Enrollment No:</strong></td>
                    <td style="padding: 10px 0;">' . $enrollmentNo . '</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0;"><strong>Name:</strong></td>
                    <td style="padding: 10px 0;">' . $sname . '</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0;"><strong>Email:</strong></td>
                    <td style="padding: 10px 0;">' . $semail . '</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0;"><strong>Password:</strong></td>
                    <td style="padding: 10px 0;">' . $spassword . '</td>
                  </tr>
                </table>

                <p style="font-size: 16px; color: #333;">Please keep this information safe and do not share it with anyone.</p>
                <p style="font-size: 16px; color: #333;">If you have any questions, feel free to contact us.</p>

                <p style="font-size: 16px; color: #333;">Best regards,<br>The University Team</p>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td style="background-color: #f4f4f4; padding: 15px; text-align: center; color: #777;">
                <p style="margin: 0;">&copy; ' . date('Y') . ' Dr. Rajendra Prasad National Law University. All Rights Reserved.</p>
                <p style="margin: 0;">Gaddopur, Phaphamau, Prayagraj, Uttar Pradesh 211013</p>
              </td>
            </tr>
          </tfoot>
        </table>
      </body>
    </html>';

  return $html;
}
/**
 * Forgot Password Email Template
 * यह फंक्शन OTP और एक इमेज का उपयोग करके पासवर्ड रीसेट ईमेल टेम्पलेट तैयार करता है।
 *
 * @param string $random_otp - पासवर्ड रीसेट के लिए जेनरेटेड OTP।
 * @param string $img_src - इमेज का सोर्स URL।
 * @return string - HTML फॉर्मेटेड ईमेल टेम्पलेट।
 */
function forgot_mail_template($random_otp, $img_src)
{
  // HTML Template with Inline CSS
  $html = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password OTP</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f9f9f9; font-family: 'Trebuchet MS', Arial, sans-serif;">
    <div style="border-radius: 20px; margin: auto; background-color: #faebd7; padding: 2rem 0; text-align: center; max-width: 600px;">
        <div style="margin: auto; width: 85%; text-align: center; border-radius: 8px; background: #fff; box-shadow: 2px 2px 3px #c9c9c9, -2px -2px 3px #ffffff; padding: 2rem;">
            <img src="{$img_src}" alt="College Logo" style="width: 30%; height: auto; margin-bottom: 1rem;">
            <h2 style="font-size: 22px; text-align: center; color: #333; background: #ededed; padding: 1.5rem 0; border-radius: 5px; margin: 1rem 0;">{$random_otp}</h2>
            <h3 style="color: #333;"><b>Your <i style="color: rgb(0, 170, 0); font-size: 20px;">OTP</i> to reset your password.</b></h3>
            <div style="background: rgb(255, 30, 30); color: #fff; padding: 1.5rem; letter-spacing: 3px; margin-top: 2rem; border-radius: 5px;">
                <b>Please, Do Not Share This Code With Anyone.</b>
            </div>
           <tr>
    <td style="background-color: #f4f4f4; padding: 15px; text-align: center; color: #777; font-family: 'Trebuchet MS', Arial, sans-serif; font-size: 14px;">
        <p style="margin: 0;">&copy; <?php echo date('Y'); ?> Dr. Rajendra Prasad National Law University. All Rights Reserved.</p>
        <p style="margin: 0;">Gaddopur, Phaphamau, Prayagraj, Uttar Pradesh 211013</p>
    </td>
</tr>

        </div>
    </div>
</body>
</html>
HTML;

  return $html;
}

?>