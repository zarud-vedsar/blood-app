import React from "react";

const Toast = ( type, message, onClose, onDelete ) => {
  if (!message) return null;

  let icon, textColor, extraContent;
  switch (type) {
    case "success":
      icon = "checkmark-circle";
      textColor = "text-success";
      break;
    case "error":
      icon = "close-circle-outline";
      textColor = "text-danger";
      break;
    case "warning":
      icon = "warning-outline";
      textColor = "text-warning";
      extraContent = (
        <>
          <h3 className="text-light">Are you sure?</h3>
          <p>This action cannot be undone.</p>
          <button
            type="button"
            className="btn btn-sm btn-text-danger"
            onClick={onDelete}
          >
            Yes, Delete
          </button>
        </>
      );
      break;
    default:
      return null;
  }

  return (
    <div className="toast-box toast-center p-2">
      <div className="in">
        <ion-icon name={icon} className={textColor}></ion-icon>
        <div>
          <p>{message}</p>
          {extraContent}
        </div>
      </div>
      <button type="button" className="btn btn-sm btn-text-light" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default Toast;
