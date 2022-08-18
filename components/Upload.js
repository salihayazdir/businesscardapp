import axios from "axios";
import { UiFileInputButton } from "./UiFileInputButton";

export const Upload = (props) => {
  
    const onChange = async (formData) => {
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: (event) => {
          console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
        },
      };
  
      const response = await axios.post('/api/uploads', formData, config);
  
      console.log('response', response.data);
    };
  
    return (
      <UiFileInputButton
        label="Upload Single File"
        uploadFileName="theImage"
        onChange={onChange}
      />
    );
  };