import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export const DeleteSweetAlert = async (title,msg) => {
  // Use SweetAlert to show a confirmation prompt
  const result = await Swal.fire({
    title: title ? title:"Are you sure?",
    text: msg ? msg : "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#00c9a7",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Proceed",
  });

  if (result.isConfirmed) {
    return true;
  } else {
    return false;
  }
};

export const SubmitRemarkSweetAlert = async (status, msg) => {
  const { value: remark } = await Swal.fire({
    title: msg ? msg : "Are you sure?",
    icon: "warning",
    input: "text",
    inputPlaceholder: "Enter your remark...",
    showCancelButton: true,
    confirmButtonColor: "#00c9a7",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Proceed",
    inputValidator: (remark) => {
      if (status === 0 && !remark) {
        return "Please provide reason for rejection!";
      }
    },
  });

  if (remark !== undefined) {
    return { confirmed: true, remark };
  } else {
    return { confirmed: false, remark: null };
  }
};
