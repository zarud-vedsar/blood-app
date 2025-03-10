$(document).ready(function () {
    $(document).on('click', '.goBack', () => {
        window.history.back();
    });
    check_status(".bay-checkbox", 2, 'bay_id');
    delete_table(".delete-bay", 2, 'bay_id');
    delete_table(".delete-spare", 3, 'spare_id');
    delete_table(".delete-machine", 4, 'id');
    delete_table(".delete-service_vehicle", 5, 'sid');
    /**
     * Function to show the loading animation
     * Hides the button and displays the loader
     */
    function showLoad(id = "#loadermine") {
        $(id).removeClass('d-none'); // Show the loader
    }

    /**
     * Function to hide the loading animation
     * Shows the button and hides the loader
     */
    function hideLoad(id = "#loadermine") {
        $(id).addClass('d-none'); // Hide the loader
    }
    $(document).on('click', '.baymodalnew', () => {
        $('.change-title-bay').text('New Bay');
    });
    /**
     * Automatically hide the main loader after 100ms
     * Ensures smooth user experience on page load
     */
    setTimeout(() => {
        $('#loader').addClass('d-none'); // Hide the loader after timeout
    }, 100); showLoad
    $(document).on("submit", "#login-main", function (e) {
        e.preventDefault(); // Prevent default form submission behavior
        $("#btn-load").attr('disabled', true);
        showLoad('#loadermineform'); // Show loading animation
        const tnumber = $("#tnumber").val();
        const dob = $("#dob").val();
        $(".tnumber-error").text("");
        $(".dob-error").text("");
        if (!tnumber) {
            hideLoad('#loadermineform'); // Hide the loader to stop any ongoing process
            toastError('Please enter your T-number.'); // Display an error notification
            $(".tnumber-error").text('T-number is required.'); // Update on-page error text
            $("#btn-load").attr('disabled', false);
            return false; // Stop further execution
        }

        if (!dob) {
            // No date of birth provided:
            hideLoad('#loadermineform'); // Hide the loader to stop any ongoing process
            toastError('Please select a valid date of birth.'); // Display an error notification to the user
            $(".dob-error").text('Please select a valid date of birth.'); // Update any on-page error text for clarity
            $("#btn-load").attr('disabled', false);
            return false; // Stop further execution
        }
        $.ajax({
            url: `${path_crud}staff.php`, // Backend URL to handle login
            type: "POST", // HTTP method
            data: $(this).serialize() + "&data=login", // Serialize form data and append login identifier
            success: function (data) {
                $("#btn-load").attr('disabled', false);
                hideLoad('#loadermineform'); // Hide the loader to stop any ongoing process
                try {
                    let json = JSON.parse(data); // Attempt to parse response as JSON
                    if (json.status === 200) {
                        let data = JSON.parse(json.data);
                        $("#login-main").trigger("reset"); // Reset login form on success
                        localStorage.setItem("staff_id", data.staff_id);
                        setTimeout(() => {
                            window.location.assign("./home.php"); // Redirect after a short delay
                        }, 500);
                        toastSuccess(json.msg); // Show success notification
                    } else if (json.status === 400) {
                        toastError(json.msg); // Show error message from backend
                    }
                } catch (error) {
                    toastError("An error occurred. Please try again."); // Catch and handle JSON parsing errors
                    $("#btn-load").attr('disabled', false);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                hideLoad('#loadermineform'); // Hide the loader to stop any ongoing process
                $("#btn-load").attr('disabled', false);
                try {
                    let json = JSON.parse(jqXHR.responseText); // Attempt to parse error response
                    if (json.status === 400 || json.status === 500) {
                        toastError(json.msg); // Display backend-provided error message
                        return;
                    }
                } catch (error) {
                    // If parsing fails, fallback to a generic error message
                    toastError("An error occurred while submitting the form. Please try again later.");
                }
            }
        });
    });

    $(document).on("submit", "#bays_saved", function (e) {
        e.preventDefault(); // Prevent default form submission behavior
        $("#btn-load").attr('disabled', true);
        showLoad("#loadermineform"); // Show loading animation
        const btitle = $("#btitle").val();
        const dob = $("#dob").val();
        $(".btitle-error").text("");
        $(".error-span").text("");
        if (!btitle) {
            hideLoad('#loadermineform'); // Hide the loader to stop any ongoing process
            toastError('Please enter the bay name.'); // Display an error notification
            $(".btitle-error").text('Please enter the bay name.'); // Update on-page error text
            $("#btn-load").attr('disabled', false);
            return false; // Stop further execution
        }
        $.ajax({
            url: `${path_crud}bays.php`, // Backend URL to handle login
            type: "POST", // HTTP method
            data: $(this).serialize() + "&data=baysSaved", // Serialize form data and append login identifier
            success: function (data) {
                $("#btn-load").attr('disabled', false);
                hideLoad("#loadermineform"); // Hide loader after receiving a response
                try {
                    let json = JSON.parse(data); // Attempt to parse response as JSON
                    if (json.status === 200 || json.status === 201) {
                        if (json.status === 201) {
                            $("#bays_saved").trigger("reset"); // Reset login form on success
                        }
                        toastSuccess(json.msg); // Show success notification
                        setTimeout(() => { location.reload() }, 300);
                    } else if (json.status === 400) {
                        toastError(json.msg); // Show error message from backend
                        $(".btitle-error").text(json.msg); // Update on-page error text
                    }
                } catch (error) {
                    toastError("An error occurred. Please try again."); // Catch and handle JSON parsing errors
                    $("#btn-load").attr('disabled', false);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                hideLoad("#loadermineform"); // Hide loader on AJAX error
                $("#btn-load").attr('disabled', false);
                try {
                    let json = JSON.parse(jqXHR.responseText); // Attempt to parse error response
                    if (json.status === 400 || json.status === 500) {
                        toastError(json.msg); // Display backend-provided error message
                        $(".btitle-error").text(json.msg); // Update on-page error text
                        return;
                    }
                } catch (error) {
                    // If parsing fails, fallback to a generic error message
                    toastError("An error occurred while submitting the form. Please try again later.");
                }
            }
        });
        /**
         * Edit bays details, fill the form with the specified data for update
         */
        $(document).on("click", ".edit_bay", function (e) {
            e.preventDefault();
            $('.change-title-bay').text('Update Bay');
            const bay_id = parseInt($(this).data("id")) || 0;
            const btitle = $(this).data("title");
            if (bay_id > 0 && btitle) {
                $("#btitle").val(btitle);
                $("#updateid").val(bay_id);
            } else {
                $(".btitle-error").text("An error occurred while fetching bay details.");
                toastError("An error occurred while fetching bay details.");
            }
        });
    });
    $(document).on('click', '.close-button-delete', () => {
        document.getElementById("toast-13").style.display = "none";
        document.getElementById("toast-13").classList.add("d-none");
        $("#delete_data_set").attr({
            'data-id': "",
            'data-col_id': "",
            'data-table': ""
        });
    });
    /**
     * Save And Update Spare Parts
     */
    $(document).on("submit", "#save_and_update_spart_part", function (e) {
        e.preventDefault(); // Prevent default form submission behavior
        $("#btn-load").attr('disabled', true);
        showLoad("#loadermineform"); // Show loading animation
        $(".error-span").text("");
        $.ajax({
            url: `${path_crud}set.php`, // Backend URL to handle login
            type: "POST", // HTTP method
            data: $(this).serialize() + "&data=spart_part_saved", // Serialize form data and append login identifier
            success: function (data) {
                $("#btn-load").attr('disabled', false);
                hideLoad("#loadermineform"); // Hide loader after receiving a response
                try {
                    let json = JSON.parse(data); // Attempt to parse response as JSON
                    if (json.status === 200 || json.status === 201) {
                        if (json.status === 201) {
                            $("#save_and_update_spart_part").trigger("reset"); // Reset login form on success
                        }
                        toastSuccess(json.msg); // Show success notification
                        setTimeout(() => { location.reload() }, 300);
                    } else if (json.status === 400) {
                        toastError(json.msg); // Show error message from backend
                        if (json.key) {
                            $(`.${json.key}`).text(json.msg); // Update on-page error text
                        }
                    }
                } catch (error) {
                    toastError("An error occurred. Please try again."); // Catch and handle JSON parsing errors
                    $("#btn-load").attr('disabled', false);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                hideLoad("#loadermineform"); // Hide loader on AJAX error
                $("#btn-load").attr('disabled', false);
                try {
                    let json = JSON.parse(jqXHR.responseText); // Attempt to parse error response
                    if (json.status === 400 || json.status === 500) {
                        toastError(json.msg); // Display backend-provided error message
                        if (json.key) {
                            $(`.${json.key}`).text(json.msg); // Update on-page error text
                        }
                        return;
                    }
                } catch (error) {
                    // If parsing fails, fallback to a generic error message
                    toastError("An error occurred while submitting the form. Please try again later.");
                }
            }
        });
    });
    $(document).on('submit', '#upload_csv_spare_part', function (e) {
        e.preventDefault();
        $("#btn-load2").attr('disabled', true);
        showLoad("#loadermine2");
        $(".error-span").text("");
        const formData = new FormData(this);
        formData.append('data', 'spart_part_saved_csv');
        $.ajax({
            url: `${path_crud}set.php`, // Backend URL to handle login
            type: "POST", // HTTP method
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                $("#btn-load2").attr('disabled', false);
                hideLoad("#loadermine2"); // Hide loader after receiving a response
                try {
                    let json = JSON.parse(data); // Attempt to parse response as JSON
                    if (json.status === 200 || json.status === 201) {
                        if (json.status === 201) {
                            $("#upload_csv_spare_part").trigger("reset"); // Reset login form on success
                        }
                        toastSuccess(json.msg); // Show success notification
                        setTimeout(() => { location.reload() }, 300);
                    } else if (json.status === 400) {
                        toastError(json.msg); // Show error message from backend
                        if (json.key) {
                            $(`.${json.key}`).text(json.msg); // Update on-page error text
                        }
                    }
                } catch (error) {
                    toastError("An error occurred. Please try again."); // Catch and handle JSON parsing errors
                    $("#btn-load2").attr('disabled', false);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                hideLoad("#loadermine2"); // Hide loader on AJAX error
                $("#btn-load2").attr('disabled', false);
                try {
                    let json = JSON.parse(jqXHR.responseText); // Attempt to parse error response
                    if (json.status === 400 || json.status === 500) {
                        toastError(json.msg); // Display backend-provided error message
                        if (json.key) {
                            $(`.${json.key}`).text(json.msg); // Update on-page error text
                        }
                        return;
                    }
                } catch (error) {
                    // If parsing fails, fallback to a generic error message
                    toastError("An error occurred while submitting the form. Please try again later.");
                }
            }
        });
    });
    /**
    * Save And Update Spare Parts
    */
    $(document).on("submit", "#save_and_update_machine", function (e) {
        e.preventDefault(); // Prevent default form submission behavior
        $("#btn-load").attr('disabled', true);
        showLoad("#loadermineform"); // Show loading animation
        $(".error-span").text("");
        $.ajax({
            url: `${path_crud}set.php`, // Backend URL to handle login
            type: "POST", // HTTP method
            data: $(this).serialize() + "&data=machinery_details_saved", // Serialize form data and append login identifier
            success: function (data) {
                $("#btn-load").attr('disabled', false);
                hideLoad("#loadermineform"); // Hide loader after receiving a response
                try {
                    let json = JSON.parse(data); // Attempt to parse response as JSON
                    if (json.status === 200 || json.status === 201) {
                        if (json.status === 201) {
                            $("#save_and_update_machine").trigger("reset"); // Reset login form on success
                        }
                        toastSuccess(json.msg); // Show success notification
                        setTimeout(() => { location.reload() }, 300);
                    } else if (json.status === 400) {
                        toastError(json.msg); // Show error message from backend
                        if (json.key) {
                            $(`.${json.key}`).text(json.msg); // Update on-page error text
                        }
                    }
                } catch (error) {
                    toastError("An error occurred. Please try again."); // Catch and handle JSON parsing errors
                    $("#btn-load").attr('disabled', false);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                hideLoad("#loadermineform"); // Hide loader on AJAX error
                $("#btn-load").attr('disabled', false);
                try {
                    let json = JSON.parse(jqXHR.responseText); // Attempt to parse error response
                    if (json.status === 400 || json.status === 500) {
                        toastError(json.msg); // Display backend-provided error message
                        if (json.key) {
                            $(`.${json.key}`).text(json.msg); // Update on-page error text
                        }
                        return;
                    }
                } catch (error) {
                    // If parsing fails, fallback to a generic error message
                    toastError("An error occurred while submitting the form. Please try again later.");
                }
            }
        });
    });

    check_status(".emp-checkbox", 1, 'staff_id');
    delete_table(".delete-emp", 1, 'staff_id');
    $(document).on("submit", "#add-employee-form", function (e) {
        e.preventDefault(); // Prevent default form submission behavior
        $("#btn-load").attr('disabled', true);
        showLoad("#loadermineform"); // Show loading animation
        $(".error-span").text("");
        var formData = new FormData(this);
        formData.append("data", "add_staff");
        $.ajax({
            url: `${path_crud}staff.php`, // Backend URL to handle login
            type: "POST", // HTTP method
            contentType: false,
            processData: false,
            cache: false,
            data: formData, // Serialize form data and append login identifier
            success: function (data) {
                $("#btn-load").attr('disabled', false);
                hideLoad("#loadermineform"); // Hide loader after receiving a response
                try {
                    let json = JSON.parse(data); // Attempt to parse response as JSON
                    if (json.status === 200 || json.status === 201) {
                        if (json.status === 201) {
                            $("#add-employee-form").trigger("reset"); // Reset login form on success
                        }
                        toastSuccess(json.msg); // Show success notification
                        setTimeout(() => { location.reload() }, 300);
                    } else if (json.status === 400) {
                        toastError(json.msg); // Show error message from backend
                        if (json.key) {
                            $(`.${json.key}`).text(json.msg); // Update on-page error text
                        }
                    }
                } catch (error) {
                    toastError("An error occurred. Please try again."); // Catch and handle JSON parsing errors
                    $("#btn-load").attr('disabled', false);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                hideLoad("#loadermineform"); // Hide loader on AJAX error
                $("#btn-load").attr('disabled', false);
                try {
                    let json = JSON.parse(jqXHR.responseText); // Attempt to parse error response
                    if (json.status === 400 || json.status === 500) {
                        toastError(json.msg); // Display backend-provided error message
                        if (json.key) {
                            $(`.${json.key}`).text(json.msg); // Update on-page error text
                        }
                        return;
                    }
                } catch (error) {
                    // If parsing fails, fallback to a generic error message
                    toastError("An error occurred while submitting the form. Please try again later.");
                }
            }
        });
    });
    $(document).on('submit', '#upload_csv_machine', function (e) {
        e.preventDefault();
        $("#btn-load2").attr('disabled', true);
        showLoad("#loadermine2");
        $(".error-span").text("");
        const formData = new FormData(this);
        formData.append('data', 'machinery_details_saved_csv');
        $.ajax({
            url: `${path_crud}set.php`, // Backend URL to handle login
            type: "POST", // HTTP method
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                $("#btn-load2").attr('disabled', false);
                hideLoad("#loadermine2"); // Hide loader after receiving a response
                try {
                    let json = JSON.parse(data); // Attempt to parse response as JSON
                    if (json.status === 200 || json.status === 201) {
                        if (json.status === 201) {
                            $("#upload_csv_machine").trigger("reset"); // Reset login form on success
                        }
                        toastSuccess(json.msg); // Show success notification
                        setTimeout(() => { location.reload() }, 300);
                    } else if (json.status === 400) {
                        toastError(json.msg); // Show error message from backend
                        if (json.key) {
                            $(`.${json.key}`).text(json.msg); // Update on-page error text
                        }
                    }
                } catch (error) {
                    toastError("An error occurred. Please try again."); // Catch and handle JSON parsing errors
                    $("#btn-load2").attr('disabled', false);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                hideLoad("#loadermine2"); // Hide loader on AJAX error
                $("#btn-load2").attr('disabled', false);
                try {
                    let json = JSON.parse(jqXHR.responseText); // Attempt to parse error response
                    if (json.status === 400 || json.status === 500) {
                        toastError(json.msg); // Display backend-provided error message
                        if (json.key) {
                            $(`.${json.key}`).text(json.msg); // Update on-page error text
                        }
                        return;
                    }
                } catch (error) {
                    // If parsing fails, fallback to a generic error message
                    toastError("An error occurred while submitting the form. Please try again later.");
                }
            }
        });
    });
    /**
    * Save And Update Vehicle Details
    */
    $(document).on("submit", "#save_vehicle_details", function (e) {
        e.preventDefault(); // Prevent default form submission behavior
        $("#btn-load").attr('disabled', true);
        showLoad("#loadermineform"); // Show loading animation
        $(".error-span").text("");
        $.ajax({
            url: `${path_crud}set.php`, // Backend URL to handle login
            type: "POST", // HTTP method
            data: $(this).serialize() + "&data=save_vehicle_details", // Serialize form data and append login identifier
            success: function (data) {
                $("#btn-load").attr('disabled', false);
                hideLoad("#loadermineform"); // Hide loader after receiving a response
                try {
                    let json = JSON.parse(data); // Attempt to parse response as JSON
                    if (json.status === 200 || json.status === 201) {
                        if (json.status === 201) {
                            $("#save_vehicle_details").trigger("reset"); // Reset login form on success
                        }
                        toastSuccess(json.msg); // Show success notification
                        setTimeout(() => { location.reload() }, 300);
                    } else if (json.status === 400) {
                        toastError(json.msg); // Show error message from backend
                        if (json.key) {
                            $(`.${json.key}`).text(json.msg); // Update on-page error text
                        }
                    }
                } catch (error) {
                    toastError("An error occurred. Please try again."); // Catch and handle JSON parsing errors
                    $("#btn-load").attr('disabled', false);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                hideLoad("#loadermineform"); // Hide loader on AJAX error
                $("#btn-load").attr('disabled', false);
                try {
                    let json = JSON.parse(jqXHR.responseText); // Attempt to parse error response
                    if (json.status === 400 || json.status === 500) {
                        toastError(json.msg); // Display backend-provided error message
                        if (json.key) {
                            $(`.${json.key}`).text(json.msg); // Update on-page error text
                        }
                        return;
                    }
                } catch (error) {
                    // If parsing fails, fallback to a generic error message
                    toastError("An error occurred while submitting the form. Please try again later.");
                }
            }
        });
    });
    /**
    * Save And Update Vehicle Details
    */
    $(document).on("submit", "#serviceVehicleForm", function (e) {
        e.preventDefault(); // Prevent default form submission behavior
        $("#btn-load").attr('disabled', true);
        showLoad("#loadermineform"); // Show loading animation
        $(".error-span").text("");
        $.ajax({
            url: `${path_crud}set.php`, // Backend URL to handle login
            type: "POST", // HTTP method
            data: $(this).serialize() + "&data=serviceVehicleForm", // Serialize form data and append login identifier
            success: function (data) {
                $("#btn-load").attr('disabled', false);
                hideLoad("#loadermineform"); // Hide loader after receiving a response
                try {
                    let json = JSON.parse(data); // Attempt to parse response as JSON
                    if (json.status === 200 || json.status === 201) {
                        if (json.status === 201) {
                            $("#serviceVehicleForm").trigger("reset"); // Reset login form on success
                        }
                        toastSuccess(json.msg); // Show success notification
                        setTimeout(() => { location.reload() }, 300);
                    } else if (json.status === 400) {
                        toastError(json.msg); // Show error message from backend
                        if (json.key) {
                            $(`.${json.key}`).text(json.msg); // Update on-page error text
                        }
                    }
                } catch (error) {
                    toastError("An error occurred. Please try again."); // Catch and handle JSON parsing errors
                    $("#btn-load").attr('disabled', false);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                hideLoad("#loadermineform"); // Hide loader on AJAX error
                $("#btn-load").attr('disabled', false);
                try {
                    let json = JSON.parse(jqXHR.responseText); // Attempt to parse error response
                    if (json.status === 400 || json.status === 500) {
                        toastError(json.msg); // Display backend-provided error message
                        if (json.key) {
                            $(`.${json.key}`).text(json.msg); // Update on-page error text
                        }
                        return;
                    }
                } catch (error) {
                    // If parsing fails, fallback to a generic error message
                    toastError("An error occurred while submitting the form. Please try again later.");
                }
            }
        });
    });
    // THE END OF JQUERY
});