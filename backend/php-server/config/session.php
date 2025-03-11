<?php
class Session
{
    // ! ||--------------------------------------------------------------------------------|| 
    // ! ||                          SET KEY AND VALUE IN SESSION                          ||
    // ! ||--------------------------------------------------------------------------------|| 
    /**
     * Set a value in the session for a given key.
     *
     * @param string $key The key to store the value under.
     * @param mixed $value The value to store in the session.
     */
    public function set($key, $value)
    {
        $_SESSION[$key] = $value;
    }

    // ! ||--------------------------------------------------------------------------------|| 
    // ! ||                      GET VALUE FROM SESSION BY GIVING KEY                      ||
    // ! ||--------------------------------------------------------------------------------|| 
    /**
     * Retrieve the value stored in the session for a given key.
     * If the key does not exist, it returns an empty string.
     *
     * @param string $key The key to retrieve the value for.
     * @return mixed The value stored under the given key or an empty string if not found.
     */
    public function get($key)
    {
        return $_SESSION[$key] ?? ''; // Return the value or an empty string if not set
    }

    // ! ||--------------------------------------------------------------------------------|| 
    // ! ||               DELETE KEY AND ITS VALUE FROM SESSION BY GIVING KEY              ||
    // ! ||--------------------------------------------------------------------------------|| 
    /**
     * Delete the key and its associated value from the session.
     *
     * @param string $key The key to delete from the session.
     */
    public function delete($key)
    {
        unset($_SESSION[$key]); // Unset the session value for the given key
    }

    // ! ||--------------------------------------------------------------------------------|| 
    // ! ||                        DESTROY ALL SESSION KEY AND VALUE                       ||
    // ! ||--------------------------------------------------------------------------------|| 
    /**
     * Destroy all session data, effectively clearing all session variables.
     */
    public function destroy()
    {
        session_unset();  // Unset all session variables
        session_destroy(); // Destroy the session completely
    }
}
?>
