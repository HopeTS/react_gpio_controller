import "./Form.css";

/** Form with options to update selected pin */
const Form = ({
  pinData,
  setPinData,
  selectedPin,
  setSelectedPin,
}: {
  pinData: Object;
  setPinData: (oldState: Object) => void;
  selectedPin: number;
  setSelectedPin: (oldState: number) => void;
}) => {
  return <div className="GPIOForm"></div>;
};

export default Form;
