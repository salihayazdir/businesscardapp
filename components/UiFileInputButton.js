import { useRef } from "react";

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
      <form ref={formRef}>
        <button type="button" onClick={onClickHandler}>
          {props.label}
        </button>
        <input
          accept={props.acceptedFileTypes}
          multiple={props.allowMultipleFiles}
          name={props.uploadFileName}
          onChange={onChangeHandler}
          ref={fileInputRef}
          style={{ display: 'block' }}
          type="file"
        />
      </form>
    );
  };