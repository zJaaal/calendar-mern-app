import { useState } from "react";

const useOpen = (initialValue = false) => {
  const [open, setOpen] = useState(initialValue);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return { open, handleOpen, handleClose };
};

export default useOpen;
