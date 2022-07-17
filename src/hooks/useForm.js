import { useState } from "react";

const useForm = (initialValue = {}) => {
  const [formValues, setFormValues] = useState(initialValue);
  const reset = () => {
    setValues(initialValue);
  };
  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value, //Access to the property of the object that has the name of the input
    });
  };

  return [formValues, handleInputChange, reset];
};

export default useForm;
