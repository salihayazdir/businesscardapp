
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
        
    const fieldStyles = ''
    
    return (
    <div className="fixed bottom-0 w-full p-4 bg-gray-200">
        <div className="w-6 h-6 bg-red-500" onClick={() => setOpenWindow(0)} ></div>
        <form 
            name="form" onSubmit={handleSubmit}
            className='flex flex-col'>
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
                    id='title' type='email' name='title' placeholder='Your title'
                    onChange={handleChange} value={formData.title}
                    className={`${fieldStyles}`}
                />
                <input
                    id='phone' type='text' name='phone' placeholder='Your phone'
                    onChange={handleChange} value={formData.phone}
                    className={`${fieldStyles}`}
                />
                {/* <button type='submit'
                    className='px-6 py-4 text-2xl font-bold text-left outline outline-2 outline-black hover:bg-black hover:text-white'
                    >SEND
                </button> */}
            </form>
        </div>
  )
}