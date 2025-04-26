import { useEffect } from "react";
export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    console.log("TIMER SET");

    // this is a SIDE EFFECT, not related to our JSX code
    const timer = setTimeout(() => {
      onConfirm();
    }, 3000);

    // clean up function is called when the component is removed/dismounted from the DOM
    // if no clean up function is provided, the timer will keep running and call onConfirm
    // even after closing the modal
    return () => {
      console.log("Cleaning up timer");
      clearTimeout(timer);
    };
  }, []);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
    </div>
  );
}
