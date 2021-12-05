import React, { useState, useEffect } from "react";

export default function Modal({ children, show }) {
  const [isOpened, setIsOpened] = useState(false);
  useEffect(() => {
    setIsOpened(show);
  }, [show]);
  return (
    <div
      className="modal-container"
      style={{ display: isOpened ? "block" : "none" }}
    >
      {children}
    </div>
  );
}
