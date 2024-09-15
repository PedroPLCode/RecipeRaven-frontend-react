import { toast } from 'react-toastify';

export const displayApiResponseMessage = (response, result) => {
  if (response.ok) {
    toast.success(result.msg, {toastId: 1})
  } else {
    toast.warning(result.msg || result.message, {toastId: 1})
  }
}