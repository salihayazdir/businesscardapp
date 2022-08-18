import axios from "axios";
import { UiFileInputButton } from "./UiFileInputButton";
import { GetServerSideProps } from "next";

export const Upload = ({handleImageUrlSubmit}) => {
  
    const onChange = async (formData) => {
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: (event) => {
          console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
        },
      };
  
      const response = await axios.post('/api/uploads', formData, config);
      const filename = response.data.filename
      console.log('response', response.data);
      handleImageUrlSubmit(`https://businesscardapp.vercel.app/uploads/${filename}`)
    };
  
    return (
      <UiFileInputButton
        label="Upload Single File"
        uploadFileName="theImage"
        onChange={onChange}
      />
    );
  };