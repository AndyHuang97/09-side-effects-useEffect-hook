import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({ open, children, onClose }) {
  const dialog = useRef();

  // This implementation yields an error, because the first time the components are rendered
  // at this point the ref has not been assigned to the dialog built-in component
  // Should use useEffect() because it synchronizes your prop/state values to dom elements (ref)
  // In fact, it postpones the execution of the code after the component has been rendered
  // this code is considered a side effect, because it affects the UI but not the JSX code, so not related to the component render cycle!!!
  // if (open) {
  //   dialog.current.showModal();
  // } else {
  //   dialog.current.close();
  // }

  useEffect(() => {
    console.log("open: " + open);
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);
  // effect dependencies are state or prop values used in the useEffect lambda
  // other dependencies would be functions or context values that use state or props

  // this implementation does not show the backdrop, because showModal() is not invoked
  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;
