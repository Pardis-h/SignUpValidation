import { toast } from 'react-toastify';

export const toastifySubmit = (type,text) => {
    if(type === "Success"){
        return toast.success(text);
    }else if(type === "Error"){
        return toast.error(text);
    }
}