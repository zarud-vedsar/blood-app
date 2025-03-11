<?php
class AdminGet extends Database

{
  public function get_table_data($tableid, $filter = [], $orderclause = null, $columns = null)

  {
    // Initialize base query
    if ($columns == null) {

      $sql = "SELECT * FROM " . $this->getTable($tableid);
    } else {

      $sql = "SELECT $columns FROM " . $this->getTable($tableid);
    }
    // Check if filter is provided
    if (sizeof($filter) > 0) {
      $conditions = [];
      // Iterate through each filter key and add it to the conditions
      foreach ($filter as $key => $value) {
        $conditions[] = "$key = '$value'";
      }

      // Append conditions to the query
      $sql .= " WHERE " . implode(' AND ', $conditions);
    }

    // Add ordering
    if ($orderclause != null) {
      $sql .= " " . $orderclause;
    } else {

      $sql .= " ORDER BY id DESC";
    }
    $result = $this->sql($sql);
    // Return results
    return $result ?: false;
  }

  public function fetch_user($id)
  {
    $sql = $this->sql("SELECT * FROM " . $this->getTable(1) . " WHERE id = '{$id}'");
    return $sql;
  }

  public function get_user(
    $email = null,
    $pass = null,
    $c_phone = null,
    $id = null,
    $uid = null,
    $userType = null,
    $customLimit = null,
    $status = null,
    $limit = null,
    $duname = null,
    $ddistrict = null,
    $dstate = null,
    $dgender = null,
    $dfromdate = null,
    $dtodate = null
  ) {
    $sql1 = "SELECT * FROM " . $this->getTable(1) . " WHERE 1 AND delete_status = 0 ";

    if ($ddistrict !== null) {
      $sql1 .= " AND district = '{$ddistrict}'";
    }
    if ($dstate !== null) {
      $sql1 .= " AND state = '{$dstate}'";
    }
    if ($dgender !== null) {
      $sql1 .= " AND gender = '{$dgender}'";
    }
    if ($dfromdate !== null && $dtodate !== null) {
      $sql1 .= " AND reg_date BETWEEN '{$dfromdate}' AND '{$dtodate}'";
    }
    if ($duname !== null) {
      $sql1 .= " AND u_name = '{$duname}'";
    }
    if ($pass !== null) {
      $sql1 .= " AND pass = '{$pass}'";
    }
    if ($email !== null && $c_phone !== null) {
      $sql1 .= " AND (u_email = '{$email}' OR u_phone = '{$c_phone}')";
    }
    if ($email !== null && $c_phone === null) {
      $sql1 .= " AND u_email = '{$email}' ";
    }
    if ($c_phone !== null && $email === null) {
      $sql1 .= " AND u_phone = '{$c_phone}'";
    }
    if ($id !== null) {
      $sql1 .= " AND id = '{$id}'";
    }
    if ($uid !== null) {
      $sql1 .= " AND uid = '{$uid}'";
    }
    if ($status !== null) {
      $sql1 .= " AND status = '{$status}'";
    }
    if ($userType !== null) {
      $sql1 .= " AND type = '{$userType}'";
    }
    $sql1 .= " ORDER BY `id` DESC";
    if ($customLimit !== NULL) {
      $sql1 .= " $customLimit";
    }
    if ($limit !== NULL) {
      $sql1 .= " LIMIT '{$limit}'";
    }
    $sql = $this->sql($sql1);
    if ($sql) {
      return $sql;
    } else {
      return false;
    }
  }

  public function load_user($page_no = null, $duid = null, $duname = null, $duemail = null, $dphone = null, $ddistrict = null, $dstate = null, $dgender = null, $dfromdate = null, $dtodate = null, $c_type = null)
  {
    $limit_per_page = 100;
    $customLimit = null;
    if ($page_no !== null) {
      $page = $page_no;

      $offset = ($page - 1) * $limit_per_page;
      $customLimit = " LIMIT {$offset},{$limit_per_page}";
    }
    try {

      $users = $this->get_user($duemail, null, $dphone, null, $duid, $c_type, null, null, null, $duname, $ddistrict, $dstate, $dgender, $dfromdate, $dtodate);
      echo $this->json(200, "Page loaded", '', $users);
      http_response_code(200);
      return;
    } catch (Exception $e) {
      echo $this->json(500, "Error loading page");
      http_response_code(500);
      return;
    }
  }

  public function load_page($trashed = 0)
  {
    $pageRecord = $this->get_table_data(4, ['delete_status' => $trashed]);
    echo $this->json(200, "Page loaded", '', $pageRecord);
    http_response_code(200);
    return;
  }

  public function getDistinctDistrict()
  {
    $sql2 = "SELECT DISTINCT c_district AS district FROM " . $this->getTable(1) . "
UNION
SELECT DISTINCT p_district AS district FROM " . $this->getTable(1) . "
ORDER BY district DESC";
    try {
      $sql = $this->sql($sql2);
      echo $this->json(200, "", '', $sql);
      http_response_code(200);
      return;
    } catch (Exception $e) {
      echo $this->json(500, "Error fetching data");
      http_response_code(500);
      return;
    }
  }
  public function getUserIdName()
  {
    $sql2 = "SELECT id, uid, u_name FROM " . $this->getTable(1) . " ORDER BY id  DESC";

    try {
      $sql = $this->sql($sql2);
      echo $this->json(200, "", '', $sql);
      http_response_code(200);
      return;
    } catch (Exception $e) {
      echo $this->json(500, "Error fetching data");
      http_response_code(500);
      return;
    }
  }
  public function getDistinctState()
  {
    $sql2 = "SELECT DISTINCT `c_state` as state FROM " . $this->getTable(1) . " UNION SELECT DISTINCT `p_state` as state FROM " . $this->getTable(1) . " ORDER BY state  DESC";
    try {
      $sql = $this->sql($sql2);
      echo $this->json(200, "", '', $sql);
      http_response_code(200);
      return;
    } catch (Exception $e) {
      echo $this->json(500, "Error fetching data");
      http_response_code(500);
      return;
    }
  }
  
  public function get_role($id = null, $name = null, $status = 0)
  {
    $conditions = [];
    if ($id !== null) {
      $conditions[] = "id = '{$id}'";
    }
    if ($status) {
      $conditions[] = "status = '{$status}'";
    }
    if ($name !== null) {
      $conditions[] = "role_name = '{$name}'";
    }
    $whereClause = !empty($conditions) ? " WHERE " . implode(" AND ", $conditions) : "";

    $sql = $this->sql("SELECT * FROM " . $this->getTable(2) . $whereClause . " AND delete_status = 0 ORDER BY id DESC");
    return $sql ? $sql : false;
  }

  public function load_role_data()
  {
    $sql = $this->get_role();
    echo $this->json(200, "Role loaded", '', $sql);
    http_response_code(200);
    return;
  }
  public function get_append_role($id)
  {
    $select = $this->get_table_data(2, ['id' => $id]);
    echo $this->json(200, "Data loaded", '', $select);
    http_response_code(200);
    return;
  }


  public function fetch_role_by_staff($id)
  {
    $result = $this->get_user(null, null, null, $id);
    if ($result) {
      foreach ($result as $data) {

        $sql = $this->get_role();
        echo $this->json(200, "Data loaded", '', $sql);
        http_response_code(200);
        return;
      }
    } else {
      return false;
    }
  }



  public function get_jobpost(
    $jobId = null,
    $position = null,
    $jobType = null,
    $postDateStart = null,
    $postDateEnd = null,
    $postLastDateStart = null,
    $postLastDateEnd = null,
    $cateId = null,
    $status = null,
    $delete_status = null

  ) {

    $job_postTable = $this->getTable(36);
    $job_categoryTable = $this->getTable(35);
    // Base SQL query
    $sql = "SELECT $job_postTable.id, $job_postTable.position,$job_postTable.status, $job_postTable.job_type,$job_postTable.delete_status,$job_postTable.job_experience,$job_postTable.state, $job_postTable.vacancy, $job_postTable.post_date, $job_postTable.post_last_date, $job_categoryTable.cat_title FROM $job_postTable INNER JOIN  $job_categoryTable ON $job_postTable.job_category = $job_categoryTable.id";

    // Array to hold conditions
    $conditions = [];

    // Add conditions based on provided parameters
    if ($jobId) {
      $conditions[] = "$job_postTable.id = " . intval($jobId);
    }
    if ($delete_status != null) {
      $conditions[] = " $job_postTable.delete_status = " . intval($delete_status);
    }
    if ($position) {
      $conditions[] = "$job_postTable.position LIKE '%" . $position . "%'";
    }
    if ($jobType) {
      $conditions[] = "$job_postTable.job_type = '" . $jobType . "'";
    }
    if ($postDateStart && $postDateEnd) {
      $conditions[] = "$job_postTable.post_date BETWEEN '{$postDateStart}' AND '{$postDateEnd}'";
    } elseif ($postDateStart) {
      $conditions[] = "$job_postTable.post_date = '{$postDateStart}'";
    }
    if ($postLastDateStart && $postLastDateEnd) {
      $conditions[] = "$job_postTable.post_last_date BETWEEN '{$postLastDateStart}' AND '{$postLastDateEnd}'";
    } elseif ($postLastDateStart) {
      $conditions[] = "$job_postTable.post_last_date = '{$postLastDateStart}'";
    } else {
      $conditions[] = "$job_postTable.post_last_date >= CURRENT_DATE()";
    }
    if ($cateId) {
      $conditions[] = " $job_categoryTable.id = " . intval($cateId);
    }
    if ($status !== null) { // Change to handle null correctly
      $conditions[] = "$job_postTable.status = " . intval($status);
    }



    // Append conditions to the SQL query if any
    if (!empty($conditions)) {
      $sql .= " WHERE " . implode(" AND ", $conditions);
    }

    // Execute the query and return the response
    $response = $this->sql($sql);
    if ($response) {

      echo $this->json(200, '', '', $response);
      http_response_code(200);
      return;
    } else {
      echo $this->json(400, "No job found");
      http_response_code(400);
      return;
    }
  }

  public function get_internship(
    $internshipId = null,
    $position = null,
    $postDateStart = null,
    $postDateEnd = null,
    $postLastDateStart = null,
    $postLastDateEnd = null,
    $status = null,
    $delete_status = null

  ) {

    $job_postTable = $this->getTable(23);
    
    // Base SQL query
    // $sql = "SELECT $job_postTable.id, $job_postTable.position,$job_postTable.status, $job_postTable.job_type,$job_postTable.delete_status,$job_postTable.state, $job_postTable.vacancy, $job_postTable.post_date, $job_postTable.post_last_date FROM $job_postTable ";
    $sql = "SELECT * FROM $job_postTable ";

    // Array to hold conditions
    $conditions = [];

    // Add conditions based on provided parameters
    if ($internshipId) {
      $conditions[] = "$job_postTable.id = " . intval($internshipId);
    }
    if ($delete_status != null) {
      $conditions[] = " $job_postTable.delete_status = " . intval($delete_status);
    }
    if ($position) {
      $conditions[] = "$job_postTable.position LIKE '%" . $position . "%'";
    }
    
    if ($postDateStart && $postDateEnd) {
      $conditions[] = "$job_postTable.post_date BETWEEN '{$postDateStart}' AND '{$postDateEnd}'";
    } elseif ($postDateStart) {
      $conditions[] = "$job_postTable.post_date = '{$postDateStart}'";
    }
    if ($postLastDateStart && $postLastDateEnd) {
      $conditions[] = "$job_postTable.post_last_date BETWEEN '{$postLastDateStart}' AND '{$postLastDateEnd}'";
    } elseif ($postLastDateStart) {
      $conditions[] = "$job_postTable.post_last_date = '{$postLastDateStart}'";
    } else {
      $conditions[] = "$job_postTable.post_last_date >= CURRENT_DATE()";
    }
    
    if ($status !== null) { // Change to handle null correctly
      $conditions[] = "$job_postTable.status = " . intval($status);
    }



    // Append conditions to the SQL query if any
    if (!empty($conditions)) {
      $sql .= " WHERE " . implode(" AND ", $conditions);
    }

    // Execute the query and return the response
    $response = $this->sql($sql);
    if ($response) {

      echo $this->json(200, '', '', $response);
      http_response_code(200);
      return;
    } else {
      echo $this->json(400, "No Internship found");
      http_response_code(400);
      return;
    }
  }

  public function get_placement(
    $placementId = null,
    $position = null,
    $postDateStart = null,
    $postDateEnd = null,
    $postLastDateStart = null,
    $postLastDateEnd = null,
    $status = null,
    $delete_status = null

  ) {

    $job_postTable = $this->getTable(22);
    
    // Base SQL query
    // $sql = "SELECT $job_postTable.id, $job_postTable.position,$job_postTable.status, $job_postTable.job_type,$job_postTable.delete_status,$job_postTable.state, $job_postTable.vacancy, $job_postTable.post_date, $job_postTable.post_last_date FROM $job_postTable ";
    $sql = "SELECT * FROM $job_postTable ";

    // Array to hold conditions
    $conditions = [];

    // Add conditions based on provided parameters
    if ($placementId) {
      $conditions[] = "$job_postTable.id = " . intval($placementId);
    }
    if ($delete_status != null) {
      $conditions[] = " $job_postTable.delete_status = " . intval($delete_status);
    }
    if ($position) {
      $conditions[] = "$job_postTable.position LIKE '%" . $position . "%'";
    }
    
    if ($postDateStart && $postDateEnd) {
      $conditions[] = "$job_postTable.post_date BETWEEN '{$postDateStart}' AND '{$postDateEnd}'";
    } elseif ($postDateStart) {
      $conditions[] = "$job_postTable.post_date = '{$postDateStart}'";
    }
    if ($postLastDateStart && $postLastDateEnd) {
      $conditions[] = "$job_postTable.post_last_date BETWEEN '{$postLastDateStart}' AND '{$postLastDateEnd}'";
    } elseif ($postLastDateStart) {
      $conditions[] = "$job_postTable.post_last_date = '{$postLastDateStart}'";
    } else {
      $conditions[] = "$job_postTable.post_last_date >= CURRENT_DATE()";
    }
    
    if ($status !== null) { // Change to handle null correctly
      $conditions[] = "$job_postTable.status = " . intval($status);
    }



    // Append conditions to the SQL query if any
    if (!empty($conditions)) {
      $sql .= " WHERE " . implode(" AND ", $conditions);
    }

    // Execute the query and return the response
    $response = $this->sql($sql);
    if ($response) {

      echo $this->json(200, '', '', $response);
      http_response_code(200);
      return;
    } else {
      echo $this->json(400, "No Placement found");
      http_response_code(400);
      return;
    }
  }

  public function load_job_application($job_cat = null, $from = null, $to = null, $status = null, $application_status = null,  $email = null,$appid=null)
  {

    $job_applicationstbl = $this->getTable(39);
    $jobtbl = $this->getTable(36);
    $job_categoryTable = $this->getTable(35);
    $job_emailvarifyTbl= $this->getTable(40);

    if($appid){
      $sql = "SELECT $job_applicationstbl.*, $jobtbl.position,$jobtbl.job_type,$jobtbl.post_date,$jobtbl.post_last_date,$jobtbl.job_experience,$jobtbl.salary_to,$jobtbl.salary_starting,$jobtbl.gender,$jobtbl.state,$jobtbl.city,$jobtbl.address,$jobtbl.description,$job_categoryTable.cat_title FROM $job_applicationstbl INNER JOIN $job_emailvarifyTbl ON $job_applicationstbl.email = $job_emailvarifyTbl.email INNER JOIN $jobtbl ON $job_applicationstbl.job_id = $jobtbl.id INNER JOIN $job_categoryTable ON $jobtbl.job_category = $job_categoryTable.id WHERE 1";
    }
    else{

      $sql = "SELECT $job_applicationstbl.id,$job_applicationstbl.name,$job_applicationstbl.photo,$job_applicationstbl.email,$job_applicationstbl.alternatePhone,$job_applicationstbl.title, $job_applicationstbl.phone,$job_applicationstbl.status,$job_applicationstbl.application_status, $job_applicationstbl.created_at, $jobtbl.position,$jobtbl.job_type,$jobtbl.post_date,$jobtbl.post_last_date,$job_categoryTable.cat_title FROM $job_applicationstbl INNER JOIN $job_emailvarifyTbl ON $job_applicationstbl.email = $job_emailvarifyTbl.email INNER JOIN $jobtbl ON $job_applicationstbl.job_id = $jobtbl.id INNER JOIN $job_categoryTable ON $jobtbl.job_category = $job_categoryTable.id WHERE 1";

    }
    

    

    if ($job_cat) {
      $sql .= " AND $jobtbl.job_category = '{$job_cat}'";
    }
    if ($appid) {
      $sql .= " AND $job_applicationstbl.id = '{$appid}'";
    }
    if ($status) {
      $sql .= " AND $job_applicationstbl.status = '{$status}'";
    }
    if ($application_status) {
      $sql .= " AND $job_applicationstbl.application_status = '{$application_status}'";
    }
    if ($from) {
      $sql .= " AND $job_applicationstbl.created_at >= '{$from}'";
    }
    if ($to) {
      $sql .= " AND $job_applicationstbl.created_at <= '{$to}'";
    }
    if ($email) {
      $sql .= " AND $job_applicationstbl.email = '{$email}'";
    }
    $result = $this->sql($sql);
    if ($result) {
      echo $this->json(200, '', '', $result);
      http_response_code(200);
      return;
    } else {
      echo $this->json(400, "No job application found");
      http_response_code(400);
      return;
    }
  }

  public function load_internship_application( $from = null, $to = null, $status = null, $application_status = null,  $email = null,$appid=null)
  {

    $internship_applicationstbl = $this->getTable(45);
    $internshiptbl = $this->getTable(23);

    if($appid){
      $sql = "SELECT $internship_applicationstbl.*, $internshiptbl.position,$internshiptbl.post_date,$internshiptbl.education_level,$internshiptbl.post_last_date,$internshiptbl.salary_to,$internshiptbl.salary_starting,$internshiptbl.gender,$internshiptbl.state,$internshiptbl.city,$internshiptbl.address,$internshiptbl.description FROM $internship_applicationstbl  INNER JOIN $internshiptbl ON $internship_applicationstbl.internship_id = $internshiptbl.id  WHERE 1";
    }
    else{

      $sql = "SELECT $internship_applicationstbl.id,$internship_applicationstbl.name,$internship_applicationstbl.photo,$internship_applicationstbl.email,$internship_applicationstbl.alternatePhone,$internship_applicationstbl.title, $internship_applicationstbl.phone,$internship_applicationstbl.status,$internship_applicationstbl.application_status, $internship_applicationstbl.created_at, $internshiptbl.position,$internshiptbl.post_date,$internshiptbl.post_last_date FROM $internship_applicationstbl  INNER JOIN $internshiptbl ON $internship_applicationstbl.internship_id = $internshiptbl.id  WHERE 1";

    }
    
    if ($appid) {
      $sql .= " AND $internship_applicationstbl.id = '{$appid}'";
    }
    if ($status) {
      $sql .= " AND $internship_applicationstbl.status = '{$status}'";
    }
    if ($application_status) {
      $sql .= " AND $internship_applicationstbl.application_status = '{$application_status}'";
    }
    if ($from) {
      $sql .= " AND $internship_applicationstbl.created_at >= '{$from}'";
    }
    if ($to) {
      $sql .= " AND $internship_applicationstbl.created_at <= '{$to}'";
    }
    if ($email) {
      $sql .= " AND $internship_applicationstbl.email = '{$email}'";
    }
    $result = $this->sql($sql);
    if ($result) {
      echo $this->json(200, '', '', $result);
      http_response_code(200);
      return;
    } else {
      echo $this->json(400, "No Internship application found");
      http_response_code(400);
      return;
    }
  }
  public function load_placement_application( $from = null, $to = null, $status = null, $application_status = null,  $email = null,$appid=null)
  {

    $placement_applicationstbl = $this->getTable(48);
    $placementtbl = $this->getTable(22);

    if($appid){
      $sql = "SELECT $placement_applicationstbl.*, $placementtbl.position,$placementtbl.post_date,$placementtbl.education_level,$placementtbl.post_last_date,$placementtbl.salary_to,$placementtbl.salary_starting,$placementtbl.gender,$placementtbl.state,$placementtbl.city,$placementtbl.address,$placementtbl.description FROM $placement_applicationstbl  INNER JOIN $placementtbl ON $placement_applicationstbl.placement_id = $placementtbl.id  WHERE 1";
    }
    else{

      $sql = "SELECT $placement_applicationstbl.id,$placement_applicationstbl.name,$placement_applicationstbl.photo,$placement_applicationstbl.email,$placement_applicationstbl.alternatePhone,$placement_applicationstbl.title, $placement_applicationstbl.phone,$placement_applicationstbl.status,$placement_applicationstbl.application_status, $placement_applicationstbl.created_at, $placementtbl.position,$placementtbl.post_date,$placementtbl.post_last_date FROM $placement_applicationstbl  INNER JOIN $placementtbl ON $placement_applicationstbl.placement_id = $placementtbl.id  WHERE 1";

    }
    
    if ($appid) {
      $sql .= " AND $placement_applicationstbl.id = '{$appid}'";
    }
    if ($status) {
      $sql .= " AND $placement_applicationstbl.status = '{$status}'";
    }
    if ($application_status) {
      $sql .= " AND $placement_applicationstbl.application_status = '{$application_status}'";
    }
    if ($from) {
      $sql .= " AND $placement_applicationstbl.created_at >= '{$from}'";
    }
    if ($to) {
      $sql .= " AND $placement_applicationstbl.created_at <= '{$to}'";
    }
    if ($email) {
      $sql .= " AND $placement_applicationstbl.email = '{$email}'";
    }
    $result = $this->sql($sql);
    if ($result) {
      echo $this->json(200, '', '', $result);
      http_response_code(200);
      return;
    } else {
      echo $this->json(400, "No Placement application found");
      http_response_code(400);
      return;
    }
  }
  

  public function load_contact($delete_status = null,$email = null,$from_date=null,$to_date =null)
  {

    

    
      $sql = "SELECT * FROM ". $this->getTable(16). " WHERE 1";
    
    
    

    

    if ($delete_status) {
      $sql .= " AND delete_status = '{$delete_status}'";
    }
    
    if ($email) {
      $sql .= " AND email = '{$email}'";
    }
    if ($from_date) {
      $sql .= " AND date >= '{$from_date}'";
    }
    if ($to_date) {
      $sql .= " AND date <= '{$to_date}'";
    }



    $result = $this->sql($sql);
    if ($result) {
      echo $this->json(200, '', '', $result);
      http_response_code(200);
      return;
    } else {
      echo $this->json(400, "No job application found");
      http_response_code(400);
      return;
    }
  }



}