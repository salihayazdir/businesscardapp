import axios from "axios";
import { UiFileInputButton } from "./UiFileInputButton";

export const Upload = ({passDownResponse, setIsLoading}) => {
  
  const onChange = async (formData) => {
    setIsLoading(true)
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
      },
    };
    
    const response = await axios.post('https://thumbsnap.com/api/upload', formData, config)
    passDownResponse(response)
  };

  return (
    <UiFileInputButton
      label="Fotoğraftan Al"
      uploadFileName="theImage"
      onChange={onChange}
    />
  );
};