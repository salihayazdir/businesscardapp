
export default function Form({formData, setFormData, setOpenWindow}) {

    const handleChange = (e) => {
        setFormData(
          {...formData,
            [e.target.name]: e.target.value}
        )
      }
    
    const handleSubmit =  (e) => {
        e.preventDefault();
        console.log(formData)
    }
        
    const fieldStyles = 'focus:bg-slate-100 focus:outline-0 px-6 py-4 mb-[-px] border-b-2 border-black'
    
    return (
     <div className="bg-gray-200 p-4 fixed bottom-0">
    <div className="h-6 w-6 bg-red-500" onClick={() => setOpenWindow(0)} ></div>
     <form 
        name="form" onSubmit={handleSubmit}
        className=''>
            <input
                id='name' type='text' name='name' placeholder='Your Name'
                onChange={handleChange} value={formData.name}
                className={`${fieldStyles}`}
            />
            <input
                id='email' type='email' name='email' placeholder='Your E-mail Adress'
                onChange={handleChange} value={formData.email}
                className={`${fieldStyles}`}
            />
            <input
                id='phone' type='text' name='phone' placeholder='Your phone'
                onChange={handleChange} value={formData.phone}
                className={`${fieldStyles}`}
            />
            <button type='submit'
                className='px-6 py-4 text-left text-2xl font-bold outline outline-2 outline-black hover:bg-black hover:text-white'
                >SEND
            </button>
        </form>
        </div>
  )
}