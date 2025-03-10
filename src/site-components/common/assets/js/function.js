const path_crud = "./php-server/controller/";

const toastSuccess = (msg) => {
    $("#toast-11").removeClass('d-none');
    $("#toast-11").addClass('d-block');
    $("#toast-11-msg").html(msg);
    setTimeout(() => {
        $("#toast-11-msg").html("");
        $("#toast-11").addClass('d-none');
        $("#toast-11").removeClass('d-block');
    }, 3000);
}
const toastError = (msg) => {
    $("#toast-12").removeClass('d-none');
    $("#toast-12").addClass('d-block');
    $("#toast-12-msg").html(msg);
    setTimeout(() => {
        $("#toast-12-msg").html("");
        $("#toast-12").addClass('d-none');
        $("#toast-12").removeClass('d-block');
    }, 2500);
}
$(document).on('click', '.close-button-success', function () {
    $("#toast-11").addClass('d-none');
});
$(document).on('click', '.close-button-error', function () {
    $("#toast-12").addClass('d-none');
});
$(document).on('click', '.close-button-delete', function () {
    $("#toast-13").addClass('d-none');
});
/**
 * Function to handle status change via checkbox toggle.
 * Listens for clicks on the specified button class and updates the status via AJAX.
 * 
 * @param {string} button_class - The class selector for the checkboxes.
 * @param {string} table_name_tb - The database table name to update.
 */
function check_status(button_class, table_name_tb, id) {
    $(document).on("click", button_class, function () {
        let status = $(this).prop("checked") ? "active" : "inactive";
        let checkid = $(this).data("checkid");

        $.ajax({
            url: `${path_crud}set.php`,
            type: "POST",
            data: { [status]: checkid, table_name: table_name_tb, data: "check_status", id },
            success: function (data) {
                let response = JSON.parse(data);
                if (response.status == 1 || response.status == 3) {
                    toastSuccess(response.msg);
                } else if (response.status == 2 || response.status == 4) {
                    toastError(response.msg);
                }
            },
        });
    });
}
function delete_table(button_class, table_name_tb, col_id) {
    $(document).on("click", button_class, function (e) {
        e.preventDefault();
        let this_btn = $(this);
        let del_id = $(this).data("delid");
        window.this_btn = this_btn;
        document.getElementById("toast-13").style.display = "block";
        document.getElementById("toast-13").classList.remove("d-none");
        $("#delete_data_set").attr({
            'data-id': del_id,
            'data-col_id': col_id,
            'data-table': table_name_tb
        });
    });
}
$(document).on('click', "#delete_data_set", function (e) {
    e.preventDefault();
    let del_id = $(this).data("id");
    let col_id = $(this).data("col_id");
    let table_name = $(this).data("table");
    document.querySelector('.loadermine').classList.remove("d-none");
    let this_btn = window.this_btn;  // Retrieve stored button reference

    if (del_id && table_name) {
        $.ajax({
            url: `${path_crud}set.php`,
            type: "POST",
            data: { del_id: del_id, col_id, table_name: table_name, data: "delete_table" },
            success: function (response) {
                document.querySelector('.loadermine').classList.add("d-none");
                let jsonResponse = JSON.parse(response);
                document.querySelector('.close-button-delete').click();
                if (!this_btn || this_btn.length === 0) {
                    console.error("Button reference lost");
                    return;
                }
                switch (jsonResponse.status) {
                    case 1:
                        toastSuccess(jsonResponse.msg);
                        if ($(this_btn).hasClass("delete-bay")) {
                            $(this_btn).closest(".item").remove();
                        } else if ($(this_btn).hasClass("delete-emp")) {
                            $(this_btn).closest("li").remove();
                        } else {
                            $(this_btn).closest("tr").remove();
                        }
                        break;
                    case 2:
                        toastError(jsonResponse.msg);
                        break;
                    default:
                        toastError("An unexpected error occurred. Please try again.");
                        break;
                }
            },
            error: function () {
                document.querySelector('.loadermine').classList.add("d-none");
                document.querySelector('.close-button-delete').click();
                toastError("Failed to delete data. Please try again later.");
            }
        });
    }
});
function filterTable(searchInput, tableId) {
    let input = document.getElementById(searchInput);
    let filter = input.value.toLowerCase();
    let table = document.getElementById(tableId);
    let rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
        let cols = rows[i].getElementsByTagName("td");
        let match = false;

        for (let j = 0; j < cols.length - 1; j++) { // Ignore the last column (actions)
            if (cols[j]) {
                let textValue = cols[j].textContent || cols[j].innerText;
                if (textValue.toLowerCase().indexOf(filter) > -1) {
                    match = true;
                    break;
                }
            }
        }
        rows[i].style.display = match ? "" : "none";
    }
}
