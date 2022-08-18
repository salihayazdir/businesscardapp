import axios from "axios";
import { UiFileInputButton } from "./UiFileInputButton";

export const Upload = ({passDownResponse}) => {
  
    const onChange = async (formData) => {
      
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: (event) => {
          console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
        },
      };
      
      const response = await axios.post('https://thumbsnap.com/api/upload', formData, config)
      passDownResponse(response);
    };
  
    return (
      <UiFileInputButton
        label="Upload Single File"
        uploadFileName="theImage"
        onChange={onChange}
      />
    );
  };