import { useState } from "react";
import Button from "./Button";

function Form({ onSubmit }) {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!values.name.trim()) errs.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errs.email = "Valid email is required";
    if (values.message.trim().length < 10) errs.message = "Message must be at least 10 characters";
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onSubmit(values);
      setValues({ name: "", email: "", message: "" });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <label>Name
        <input name="name" value={values.name} onChange={handleChange} />
        {errors.name && <small>{errors.name}</small>}
      </label>
      <label>Email
        <input name="email" value={values.email} onChange={handleChange} />
        {errors.email && <small>{errors.email}</small>}
      </label>
      <label>Message
        <textarea name="message" rows="3" value={values.message} onChange={handleChange} />
        {errors.message && <small>{errors.message}</small>}
      </label>
      <Button type="submit">Submit</Button>
    </form>
  );
}
export default Form;
