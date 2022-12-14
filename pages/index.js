import Head from 'next/head'
import Form from '../components/Form'
import { useState, useEffect } from 'react'
import Share from '../components/Share';

export default function Home() {

  const [cardState, setCardState] = useState({ name: '', email: '',phone: '', title: ''});
  const [openWindow, setOpenWindow] = useState('');

  useEffect(() => {
    const localData = localStorage.getItem("business_card");
    setCardState(() => {
      return {
        ...JSON.parse(localData)
      }
    });
  }, [])
  

  return (
    <div className='flex flex-col justify-between min-h-screen px-6'>
      <Head>
        <title>Bileşim Kartvizit</title>
        <meta name="description" content="Bileşim Kartvizit Uygulaması" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {
      (cardState.name && cardState.email)
      &&
      <div className='mt-20 border border-gray-200 rounded-md bg-gray-50'>
        <div className="flex items-center justify-between p-4 text-xl font-semibold text-gray-600 border-b border-gray-200">
            Kartvizit
        </div>
        <div className='flex flex-col gap-4 p-6 '>
          <span>{cardState.name}</span>
          <span>{cardState.title}</span>
          <span>{cardState.email}</span>
        </div>
      </div>
      }

      <div className='flex flex-col self-end w-full gap-6 py-14'>
        {
        openWindow === 'form'
        ?
        <Form
          cardState={cardState}
          setCardState={setCardState}
          setOpenWindow={setOpenWindow} />
        :
        <button
          onClick={() => setOpenWindow('form')} 
          className="w-full p-8 text-2xl font-semibold bg-gray-100 border border-gray-200 rounded-md"
          >{`${(cardState.name && cardState.email) ? 'Düzenle' : 'Kartvizit Oluştur'}`}
        </button>
        }

        {
        (cardState.name && cardState.email)
        &&
        <button
          onClick={() => setOpenWindow('share')} 
          className="w-full p-8 text-2xl font-semibold bg-gray-100 border border-gray-200 rounded-md"
        >Paylaş</button>
        }
      </div>

      {
      openWindow === 'share'
      &&
      <Share
        cardState={cardState}
        setOpenWindow={setOpenWindow} />
      }

    </div>
  )
}

// BEGIN:VCARD
// N:${formState.name};
// TEL;TYPE=work,VOICE:${formState.phone}
// TEL;TYPE=home,VOICE:(404) 386-1017
// TEL;TYPE=fax:(866) 408-1212
// EMAIL:${formState.email}
// ORG:Smith Designs LLC
// TITLE:Lead Designer
// ADR;TYPE=WORK,PREF:;;151 Moore Avenue;Grand Rapids;MI;49503;United States of America
// URL:https://www.smithdesigns.com
// VERSION:3.0
// END:VCARD
