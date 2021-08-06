import { useState, FormEvent, ChangeEvent } from "react";
import { IFieldError, IValidatorResult } from "../validators/authValidator";
import { useDispatch } from "react-redux";

const UseFormAuth = <T>(
  callback: (state: T) => void,
  initialState: T,
  validator: (state: T) => IValidatorResult
) => {
  const [states, setState] = useState<T>(initialState);

  const [errors, setErrors] = useState<IFieldError>();
  const dispatch = useDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { valid, errors: erV } = validator(states);
    if (!valid) {
      setErrors({
        ...errors,
        email: erV?.email,
        username: erV?.username,
        password: erV?.password,
      });
    } else {
      setErrors({
        ...errors,
        email: "",
        username: "",
        password: "",
      });
      setState(initialState);
      dispatch(callback(states));
    }
  };
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.persist();
    setState({
      ...states,
      [event.target.name]: event.target.value,
    });
  };

  return {
    handleSubmit,
    handleChange,
    states,
    errors,
  };
};

export default UseFormAuth;
