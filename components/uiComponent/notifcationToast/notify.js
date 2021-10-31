import { useToasts } from "react-toast-notifications";

const notifyEvent = (type ,message) => {
  const { addToast } = useToasts();

  switch (type) {
    case "Success":
      addToast(message, { appearance: "success" });
      break;
    case "Error":
      addToast(message, { appearance: "error" });
      break;
    case "Info": 
      addToast(message, { appearance: "info" });
      break;
    default:
      break;
  }

  return true;
};

export default notifyEvent