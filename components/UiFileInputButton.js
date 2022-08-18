import { useRef } from "react";
import {MdAddAPhoto} from "react-icons/md";

export const UiFileInputButton = (props) => {
    const fileInputRef = useRef(null);
    const formRef = useRef(null);
  
    const onClickHandler = () => {
      fileInputRef.current.click();
    };
  
    const onChangeHandler = (event) => {
      console.log("///////////event.target.files//////////////", event.target.files[0])
      if (!event.target.files.length) {
        console.log("NO FILES!")
        return;
      }
  
      const formData = new FormData();
      formData.append("media", event.target.files[0]);
      formData.append("key", "00001d6925845e2300261f742925640f");
      console.log("///////////event.target//////////////", event.target)

      // Array.from(event.target.files).forEach((file) => {
      //   formData.append(event.target.name, file);
      // });
  
      props.onChange(formData);
      console.log("///////////formdata//////////////", formData)
      formRef.current.reset();
    };
  
    return (
      <form ref={formRef} className='flex'>
        <button 
          type="button"
          className="flex items-center justify-between w-full p-4 mx-4 mt-4 font-semibold text-left text-white bg-blue-600 rounded-md "
          onClick={onClickHandler}
          >{props.label}
          <MdAddAPhoto size={26} />
        </button>
        <input
          accept={props.acceptedFileTypes}
          multiple={props.allowMultipleFiles}
          name={props.uploadFileName}
          onChange={onChangeHandler}
          ref={fileInputRef}
          style={{ display: 'none' }}
          type="file"
        />
      </form>
    );
  };