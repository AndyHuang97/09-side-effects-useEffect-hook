import { useEffect, useState } from "react";

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  const [remainingTime, setRemainingTime] = useState(TIMER);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("INTERVAL");
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    console.log("TIMER SET");

    // this is a SIDE EFFECT, not related to our JSX code
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    // clean up function is called when the component is removed/dismounted from the DOM
    // if no clean up function is provided, the timer will keep running and call onConfirm
    // even after closing the modal
    return () => {
      console.log("Cleaning up timer");
      clearTimeout(timer);
    };
  }, [onConfirm]);
  // could add onConfirm as dependency, but functions in js are just values
  // in react, the functions are defined in the components and when a component
  // rerenders the functions are recreated with different values (even if content does not change)
  // In normal cases, adding the onConfirm functions would generate an infinite loop
  // However, in our special case we dismount the DeleteConfirmation thanks to the modalIsOpen state
  // Or we can use "useCallback" to store the function internally and not recreate at each rerender

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
      <progress value={remainingTime} max={TIMER}/>
    </div>
  );
}
