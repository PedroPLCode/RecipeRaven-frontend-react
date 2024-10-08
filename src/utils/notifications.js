import { toast } from 'react-toastify';

export const createNotification = (type, message, toastId=null) => {
    switch (type) {
      case 'info':
        toast.info(message, {toastId: toastId});
        break;
      case 'success':
        toast.success(message, {toastId: toastId});
        break;
      case 'warning':
        toast.warn(message, {toastId: toastId});
        break;
      case 'error':
        toast.error(message, {toastId: toastId});
        break;
      default:
        break;
    }
  };