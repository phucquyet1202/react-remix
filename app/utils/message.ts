import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const handleSuccess = () => {
  console.log(12);
  toast.success("Nghiệp vụ thành công!", {
    position: "top-right", // Đặt vị trí trực tiếp
  });
};
export const handleFailure = () => {
  toast.error("Nghiệp vụ thất bại!", {
    position: "top-right", // Đặt vị trí trực tiếp
  });
};
