<?php

class Database
{
    private $servername = 'localhost';
    protected $httpHost;
    private $username;
    private $password;
    private $dbname;
    private $conn;
    private $uploadDirectory = '../../public/upload/';
    private $fileUrl = 'http://localhost/htdocs/blood-app/backend/public/upload';

    // Table mapping for easier referencing of tables (can be extended in future)
    /**
     * Retrieve the table name based on index.
     * 
     * @param int $index
     * @return string|null
     */
    public function getTable($index)
    {
        $tables = [
            1 => 'zuraud_user',
            2 => 'zuraud_role',
            2 => 'zuraud_doner',
            
        ];
        return isset($tables[$index]) ? $tables[$index] : null;
    }

    /**
     * Database constructor initializes the connection.
     */
    public function __construct()
    {
        $this->httpHost = strtolower($_SERVER['HTTP_HOST']);
        $this->setDatabaseParameters();
        $this->initializeConnection();
    }

    /**
     * Set database connection parameters.
     * Defaults to localhost MySQL credentials.
     */
    private function setDatabaseParameters()
    {
        $this->username = 'root';   // Default username
        $this->password = '';       // Default password
        $this->dbname = 'blood_app';      // Default database name
    }

    /**
     * Initialize the PDO connection for the database.
     * Uses prepared statements for secure database interactions.
     */
    private function initializeConnection()
    {
        try {
            $this->conn = new PDO("mysql:host=$this->servername;dbname=$this->dbname", $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("SET CHARACTER SET utf8");
        } catch (PDOException $e) {
            // Handle exception (logging, etc.)
        }
    }
    
    
    /**
     * Calculate total days between two dates.
     * 
     * @param string $startDate
     * @param string $endDate
     * @return int
     */
    public function getTotalDaysBetweenDates($startDate, $endDate)
    {
        $startDateTime = new DateTime($startDate);
        $endDateTime = new DateTime($endDate);
        $dateInterval = $startDateTime->diff($endDateTime);
        return $dateInterval->days;
    }

    /**
     * Create a URL-friendly slug from a string.
     * 
     * @param string $string
     * @return string
     */
    public function createSlug($string)
    {
        $slug = strtolower($string);
        $slug = preg_replace('/[^a-z0-9\s-]/', '', $slug); // Remove special characters
        $slug = preg_replace('/[\s-]+/', '-', $slug); // Replace spaces with hyphens
        return trim($slug, '-');
    }

    /**
     * Format a number as Indian currency (INR).
     * 
     * @param float $number
     * @return string
     */
    public function formatIndianCurrency($number)
    {
        return number_format($number, 2, '.', ',');
    }
    public function uploadDir()
    {
        return $this->uploadDirectory;
    }
    public function fileUrl()
    {
        return $this->fileUrl;
    }
    /**
     * Validate and sanitize POST data.
     * 
     * @param string $data
     * @return mixed
     */
    public function validatePostData($data)
    {
        if (isset($_POST[$data]) && !empty($this->sanitizeClientInput($_POST[$data]))) {
            return $this->sanitizeClientInput($_POST[$data]);
        }
        return false;
    }

    public function setPostRequiredField($name, $errormessage)
    {
        if (isset($_POST[$name]) && !empty($this->sanitizeClientInput($_POST[$name]))) {
            return $this->sanitizeClientInput($_POST[$name]);
        }
        else{
            echo $this->json(400, $errormessage, $name);
            http_response_code(400);
            die;
        }
    }

    /**
     * Validate and sanitize GET data.
     * 
     * @param string $data
     * @return mixed
     */
    public function validateGetData($data)
    {
        if (isset($_GET[$data]) && !empty($this->sanitizeClientInput($_GET[$data]))) {
            return $this->sanitizeClientInput($_GET[$data]);
        }
        return false;
    }

    /**
     * Get the full domain name (including protocol).
     * 
     * @return string
     */
    public function getDomain()
    {
        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' ? 'https' : 'http';
        return $protocol . '://' . $_SERVER['HTTP_HOST'];
    }



    /**
     * Sanitize user input by stripping unwanted characters.
     * 
     * @param string $form_data
     * @return string
     */
    public function sanitizeClientInput($form_data)
    {
        if ($form_data !== null) {
            $form_data = trim($form_data);
            $form_data = stripslashes($form_data);
            $form_data = strip_tags($form_data);
            $form_data = htmlspecialchars($form_data, ENT_QUOTES, 'UTF-8', false);
            $form_data = preg_replace('/on\w+="[^"]*"/i', '', $form_data); // Strip JavaScript events (on* attributes)
        }
        return $form_data;
    }

    /**
     * Create a directory if it doesn't exist.
     * 
     * @param string $path
     */
    public function make_dir($path)
    {
        if (!is_dir($path)) {
            mkdir($path, 0755, true);
        }
    }

    /**
     * Delete a file if it exists.
     * 
     * @param string $filePath
     * @param string $unlinkField
     */
    public function deleteFileIfExists(string $filePath, string $unlinkField)
    {
        $filename = $this->sanitizeClientInput(isset($_POST[$unlinkField]) ? $_POST[$unlinkField] : '');
        if (!empty($filename)) {
            $fullPath = $filePath . DIRECTORY_SEPARATOR . $filename;
            if (file_exists($fullPath)) {
                unlink($fullPath);
            }
        }
    }

    /**
     * Generate a JSON response for API endpoints.
     * 
     * @param string $status
     * @param string $message
     * @param array $data
     * @return string JSON encoded response
     */
    public function json($status, $message, $key = '', $data = [])
    {
        return json_encode([
            'status' => $status,
            'msg' => $message,
            'key' => $key,
            'data' => $data
        ], JSON_UNESCAPED_UNICODE); // Fixed: JSON_UNESCAPED_UNICODE to avoid issues with special characters
    }

    /**
     * Execute an SQL insert query with parameters.
     * 
     * @param string $sql
     * @param array $params
     * @return bool
     */
    public function sql_insert($sql, $params = [])
    {
        try {
            $stmt = $this->conn->prepare($sql);
            $stmt->execute($params);
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }

    /**
     * Execute an SQL query with custom conditions (SELECT).
     * 
     * @param string $query
     * @return mixed
     */
    public function sql($query)
    {
        try {
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            // print_r($query);
            // die;
            return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: false;
        } catch (PDOException $e) {
            return false;
        }
    }

    /**
     * Get the count of records in a table with optional WHERE conditions.
     * 
     * @param string $table
     * @param string $field
     * @param string|null $where
     * @return int|false
     */
    public function count_table($table, $field = 'id', $where = null)
    {
        $table = $this->sanitizeClientInput($table);
        $sql = "SELECT COUNT($field) AS total FROM $table";
        if (!empty($where)) {
            $sql .= " WHERE $where";
        }
        try {
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            return $stmt->fetchColumn();
        } catch (PDOException $e) {
            return false;
        }
    }

    /**
     * Insert a record into a table using the prepared statement method.
     * 
     * @param string $table_name
     * @param array $data
     * @return mixed
     */
    public function insert($table_name, $data)
    {
        $table_name = $this->sanitizeClientInput($table_name);
        $columns = array_keys($data);
        $placeholders = ':' . implode(', :', $columns);
        $sql = "INSERT INTO " . $table_name . " (" . implode(",", $columns) . ") VALUES (" . $placeholders . ")";
      	$debugSql = $sql; //debugging
        
        try {
            $stmt = $this->conn->prepare($sql);
            foreach ($data as $column => $value) {
              	//if($value=='null' || $value== 'NULL');{
                
                 // $value= null;
               // }
              	
                $stmt->bindValue(':' . $column, $value);
            //  $debugSql = str_replace(':' . $column, $this->conn->quote($value), $debugSql);
            }
          	// print_r($debugSql);
            $stmt->execute();
            return $this->conn->lastInsertId();
        } catch (PDOException $e) {
            return $e;
        }
    }

    public function insertMultiple($table_name, $data)
    {
        $table_name = $this->sanitizeClientInput($table_name);
        if (empty($data) || !is_array($data)) {
            return false;
        }

        $columns = array_keys($data[0]);


        $placeholders = [];
        foreach ($data as $row) {
            $placeholders[] = '(' . implode(', ', array_fill(0, count($columns), '?')) . ')';
        }

        $sql = "INSERT INTO " . $table_name . " (" . implode(",", $columns) . ") VALUES " . implode(", ", $placeholders);

        try {
            // Prepare the SQL statement
            $stmt = $this->conn->prepare($sql);

            // Flatten the data array for binding values
            $flattenedData = [];
            foreach ($data as $row) {
                foreach ($row as $value) {
                    $flattenedData[] = $value;
                }
            }

            // Execute the query with the flattened data
            $stmt->execute($flattenedData);
            return true; // return true if the query was successful
        } catch (PDOException $e) {
            return false; // return false if an error occurs
        }
    }


    // ! ||--------------------------------------------------------------------------------||
    // ! ||                                          UPDATE                                ||
    // ! ||--------------------------------------------------------------------------------||  

    public function update($table, $id, $para = array())
    {
        $args = array();
        $table = $this->sanitizeClientInput($table);
        foreach ($para as $key => $value) {
          	
          if(  $value == 'null' || $value == 'NULL'  ){
            $args[] = " $key = null "; 
            
          }
          else{
            $args[] = " $key = '$value' ";
          }
          
                        
          
        }
        $sql11 = "UPDATE  $table SET " . implode(',', $args);
        $sql11 .= " WHERE $id";
        // print_r($sql11);
        // die;
        try {
            // echo $sql11;
            $stmt = $this->conn->prepare($sql11);
            $stmt->execute();
            return true;  // Update successful
        } catch (PDOException $e) {
            return false;
        }
    }

    /* ---------------------------------------------------------------
                              ADMIN LOGIN
  ----------------------------------------------------------------*/
   
  public function adminUserLogin($username, $password, $otp = NULL)
    {
        try {
            // Assuming username is unique, replace 'user_id' with the appropriate column name for username

            if (!$otp) {
                $stmt = $this->conn->prepare("SELECT * FROM " . $this->getTable(1) . " WHERE (u_email = :username OR u_phone = :username ) AND pass = :password");
                $stmt->bindParam(':username', $username); // Bind both email and phone to the same parameter
                $stmt->bindParam(':password', $password);

                $stmt->execute();
                $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if ($user) {
                    // echo $this->json(200, " Password Validated", null , $user);

                    return $user;
                } else {
                    // echo $this->json(401, "Invalid Password");
                    // http_response_code(401);
                    return false;
                }
            } else {

                $stmt = $this->conn->prepare("SELECT * FROM " . $this->getTable(1) . " WHERE (u_email = :username OR u_phone = :username ) AND ( otp = :otp AND otp != 0 ) AND pass = :password");
                $stmt->bindParam(':username', $username); // Bind both email and phone to the same parameter
                $stmt->bindParam(':password', $password);
                $stmt->bindParam(':otp', $otp);
                // $stmt->bindParam(':date', $date);
                $stmt->execute();
                $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if ($user) {
                    $stmt = $this->conn->prepare("UPDATE   " . $this->getTable(1) . " SET  otp = 0, first_login = 1, otp_expiry = NULL, verified_email=1  WHERE id = :id");

                    $stmt->bindParam(':id', $user[0]['id']);
                    $stmt->execute();
                    // get the updated data of user;
                    $stmt = $this->conn->prepare("SELECT * FROM " . $this->getTable(1) . " WHERE id = :userid ");
                    $stmt->bindParam(':userid', $user[0]['id']); // Bind 

                    $stmt->execute();
                    $updateduser = $stmt->fetchAll(PDO::FETCH_ASSOC);

                    return $updateduser;
                } else {
                    // echo $this->json(402, "Invalid OTP");
                    // http_response_code(402);
                    return false;
                }
            }
        } catch (PDOException $e) {

            echo $this->json(500, $e);
            return false;
        }
    }

    /* ---------------------------------------------------------------
                              Authendicate Request
  ----------------------------------------------------------------*/
    public function AuthendicateRequest()
    {
        $loguserid = $this->validatePostData('loguserid');
        // $login_type = $this->validatePostData('login_type');
        $authenticated = false;
        if ($loguserid ) {
            $authenticated = true;
        }

        return [
            'loguserid' => $loguserid,
            'authenticated' => $authenticated
        ];
    }

  

    public function getEmailHost()
    {

        $emailsetting = $this->sql("SELECT * FROM " . $this->getTable(10));

        return [
            'email' => @$emailsetting[0]['mail_user'],
            'password' => @$emailsetting[0]['mail_pass'],
            'host' => @$emailsetting[0]['mail_host'],
            'port' => @$emailsetting[0]['mail_port'],
            'encryption' => 'tls',
            'sender' => @$emailsetting[0]['mail_user'],
            'senderName' => @$emailsetting[0]['mail_from_name'],
        ];
    }




    function getClientIP()
    {
        // Check for shared Internet/ISP IP
        if (!empty($_SERVER['HTTP_CLIENT_IP']) && filter_var($_SERVER['HTTP_CLIENT_IP'], FILTER_VALIDATE_IP)) {
            return $_SERVER['HTTP_CLIENT_IP'];
        }

        // Check for IP addresses passed in specific headers by proxies
        if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            // Extract a list of IPs from the X-Forwarded-For header
            $ipList = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            foreach ($ipList as $ip) {
                if (filter_var(trim($ip), FILTER_VALIDATE_IP)) {
                    return $ip;
                }
            }
        }

        // Check for the actual remote IP address
        if (!empty($_SERVER['REMOTE_ADDR']) && filter_var($_SERVER['REMOTE_ADDR'], FILTER_VALIDATE_IP)) {
            return $_SERVER['REMOTE_ADDR'];
        }

        // Return a default IP if none of the above succeed
        return 'UNKNOWN';
    }

    /**
     * Destructor to close database connection.
     */
    public function __destruct()
    {
        $this->conn = null;
    }
}