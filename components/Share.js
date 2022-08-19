import QRCode from "react-qr-code"
import { MdOutlineClose } from "react-icons/md";

export default function Share({cardState, setOpenWindow}) {
  
    const {name, phone, email, title} = cardState
    
    const qrData = `BEGIN:VCARD
N:${name};
TEL;TYPE=work,VOICE:${phone}
EMAIL:${email}
ORG:BILESIM FINANSAL TEKNOLOJILER VE ODEME SISTEMLERI
TITLE:${title}
VERSION:3.0
END:VCARD`

    return (
        <div className="absolute flex bg-white flex-col w-[90vw] left-[5vw] rounded-lg border border-gray-200 top-20">
            <div className="flex items-center justify-between p-4 text-xl font-semibold text-gray-600 border-b border-gray-200">
                Kartvizit Paylaş
                <MdOutlineClose size={26} onClick={() => setOpenWindow('')} />
            </div>
            <div className="flex justify-center w-full my-10" >
                <QRCode value={qrData} size={300}/>
            </div>
        </div>
    )
}