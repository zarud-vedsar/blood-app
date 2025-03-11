<?php
error_reporting(E_ALL); // Enable all PHP error reporting for debugging.
date_default_timezone_set("Asia/Kolkata"); // Set the default timezone to "Asia/Kolkata".

// Include necessary files for database connection, admin operations, session management, and student operations.
require_once('config.php'); // Configuration and CRUD operations for the database.
require_once('custom.php'); // CUSTOM FUNCTION LIKE EMAIL OTP AND SO
require_once('AdminGet.php'); // Class for handling admin operations and database queries.
require_once('session.php'); // Class for managing PHP session operations.


class Action
{
    // Declaring properties to store instances of the required classes
    public $db, $adminGet, $session,  $custom;

    // Constructor method to initialize the class instances
    public function __construct()
    {
        // Initialize the properties with their respective class instances
        $this->db = new Database; // Instance for database connection and operations.
        $this->session = new Session; // Instance for managing session data.
        $this->adminGet = new AdminGet; // Instance for admin-related CRUD operations.        
        $this->custom = new Custom; // Instance for custom functions.
    }
}

// Instantiate the Action class
$action = new Action;
// THIS SINGLE OBJECT VARIABLE USED FOR ALL SITE AND ADMIN QUERY
?>