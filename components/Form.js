import { Upload } from '../components/Upload';
import { MdOutlineClose } from "react-icons/md";
import { useState } from 'react';
import axios from 'axios';
import Loader from './Loader';

export default function Form({ cardState, setCardState, setOpenWindow }) {

    const [formState, setFormState] = useState({ ...cardState });
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        setFormState(
          {...formState,
            [e.target.name]: e.target.value}
        )
      }
    
    const handleSubmit =  (e) => {
        e.preventDefault();
        console.log(formState)
        setOpenWindow('')
        setCardState({...formState})
        localStorage.setItem('business_card', JSON.stringify(formState))
    }

    const passDownResponse = (response) => {
      console.log(response.data)
      populateAnnotations(response.data);
    }
    
    const populateAnnotations = async (res) => {
        const textAnnotations = await getTextAnnotations(res.data.media);
        console.log(textAnnotations);
        setFormState((prevFormState) => {
          return {
            ...prevFormState,
            name: textAnnotations[2],
            email: textAnnotations[7],
            title: `${textAnnotations[3]} - ${textAnnotations[4]}`,
          }
        })
        setIsLoading(false);
      }

      const getTextAnnotations = async (url) => {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_AZURE}/api/image?image=${url}`
          );
          console.log(response);
          return response.data.textContent[0].split("\n")
        } catch (err) {
          console.error(err);
          return ["error", err]
        }
      };
    
        
    const fieldStyles = 'outline outline-gray-200 rounded-md p-4'
    const labelStyles = 'flex text-sm flex-col gap-1 text-gray-600'
    
    return (
    <>
    <div className="fixed flex bg-white flex-col w-[90vw] left-[5vw] rounded-lg border border-gray-200 top-20">
        <div className="flex items-center justify-between p-4 text-xl font-semibold text-gray-600 border-b border-gray-200">
            Bilgileriniz
            <MdOutlineClose size={26} onClick={() => setOpenWindow('')} />
        </div>
        <Upload passDownResponse={passDownResponse} setIsLoading={setIsLoading} />
        <form 
            name="form" onSubmit={handleSubmit}
            className='flex flex-col gap-4 p-4 mt-2'>
                <label htmlFor='name' className={labelStyles}>
                    İsim
                    <input
                        id='name' type='text' name='name' placeholder='Your Name'
                        onChange={handleChange} value={formState.name}
                        className={`${fieldStyles}`}/>
                </label>
                <label htmlFor='email' className={labelStyles}>
                    E-posta Adresi
                    <input
                        id='email' type='email' name='email' placeholder='Your E-mail Adress'
                        onChange={handleChange} value={formState.email}
                        className={`${fieldStyles}`}/>
                </label>
                <label htmlFor='title' className={labelStyles}>
                    Ünvan
                    <input
                        id='title' type='text' name='title' placeholder='Your title'
                        onChange={handleChange} value={formState.title}
                        className={`${fieldStyles}`}/>
                </label>
                <label htmlFor='phone' className={labelStyles}>
                    Telefon Numarası
                    <input
                        id='phone' type='text' name='phone' placeholder='Your phone'
                        onChange={handleChange} value={formState.phone}
                        className={`${fieldStyles}`}/>
                </label>
                <button type='submit'
                    className='p-4 mt-4 font-semibold text-white bg-green-600 rounded-md'
                    >Onayla
                </button>
        </form>
    </div>

    {
    isLoading
    &&
    <div className='fixed flex justify-center top-0 left-0 z-10 w-full h-full backdrop-blur-[2px] bg-slate-500/30'>
        <Loader text='' 
        svgStyles="inline w-20 h-20 text-gray-400 animate-spin"
        containerStyles='p-6 text-gray-500 font-semibold flex justify-center items-center' />
    </div>
    }
    
    </>
  )
}