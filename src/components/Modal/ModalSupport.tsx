import apiUrl from '@/app/api/apiUrl';

import { Message, SupportRequest } from '@/app/api/modal';

import React, { useEffect, useRef, useState } from 'react'


interface ModalSupportProps{
  changeIfOpen: (data: boolean) => void
  
  lastRequestId : string
  supportRequestId: string

}

const ModalSupport:React.FC<ModalSupportProps>=({changeIfOpen,lastRequestId,supportRequestId}) => {
  const signUpRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [supportRequest, setSupportRequest] = useState<SupportRequest>();
  const [content, setContent] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [adminId, setAdminId] = useState<string | null>(null);
  const [supportRequestList, setSupportRequestList] = useState<SupportRequest[]>([]);

const [lastMessageId, setLastMessageId] = useState<string | null>(null);
const socketRef = useRef<any>(null);


useEffect(() => {
    // Questo codice è garantito che giri lato client
    if (typeof window !== 'undefined') {
      setAdminId(localStorage.getItem('id'));
    }
    console.log("Admin ID:", adminId);
  }, []);



// Inizializza get richieste con supportRequestId
useEffect(() => {
  let interval: NodeJS.Timeout;
  const fetchSupportRequest = async () => {
    try {
      const res = await fetch(`${apiUrl}/support/request/${supportRequestId}`);
      const data = await res.json();
      
      setSupportRequest(data); // aggiorna altri dettagli della richiesta
      if (lastRequestId === supportRequestId) {
      
        lastRequestId = "";
      }
    } catch (err) {
      console.error("Errore nel recupero della richiesta supporto", err);
    }
  };

  if (supportRequestId) {
    fetchSupportRequest();
    interval = setInterval(fetchSupportRequest, 5000);
  }

  return () => clearInterval(interval);
}, [supportRequestId, refreshKey, lastMessageId]);


  
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [supportRequest?.messages]); 


  const handleSubmit = async () => {
    console.log("Admin ID:", adminId);
    console.log("Support Request ID:", supportRequestId);
    setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/support/message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: content,
            supportRequestId: supportRequestId,
            adminId : adminId
          }),
        }).then((res) => res.json())
        .then((data) => {
          
          //setSupportRequestId(data.supportRequest.id)
          setRefreshKey((prev) => prev + 1);
        })
        setSuccess(true);
        setContent("");
      } catch (err) {
        alert("Errore nell'invio della richiesta di supporto");
      } finally {
        setLoading(false);
      }
    
    
  };

  return (
    <div ref={signUpRef} className="fixed bottom-8 right-8 z-[9999] border border-blue-300  w-4/6 h-[500px] bg-white dark:bg-darkmode rounded-xl shadow-xl flex flex-col ">
      <div className="relative">
      <button
        onClick={() => changeIfOpen(false)}
        className="absolute top-0 right-0 mr-8 mt-8 ">
        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>

      </button>
     
      
      </div>
      {/* Chat scroll */}
      
      <div className=" flex-1 overflow-y-auto p-4 pt-20 ">
        {supportRequest?.id && <div>
          <p className='max-w-[80%]  m-2 p-2 rounded-md text-sm break-words overflow-hidden bg-blue-100 dark:bg-gray-400 self-end ml-auto'>
            {supportRequest?.message}
            </p>
          {supportRequest?.messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[80%]  m-2 p-2 rounded-md text-sm break-words overflow-hidden ${
                msg.userSender 
                  ? "bg-blue-100 dark:bg-gray-400 self-end ml-auto"
                  : "bg-gray-200 self-start"
              }`}
            >
              {msg.content}
              <div className="text-[10px] text-gray-400 dark:text-white mt-1">{new Date(msg.createdAt).toLocaleTimeString()}</div>
            </div>
          ))}
        </div>}
       
        <div ref={endOfMessagesRef} />
        </div>
          
          {/* Textarea in basso */}
          
       <div className="p-3 border-t flex gap-2">
          {adminId?<textarea
            className="flex-1 border rounded-md p-2 text-sm resize-none"
            rows={1}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Scrivi un messaggio..."
          /> : <p className='text-red-500'>Devi essere registrato per inviare un messaggio</p>}
          <button
            onClick={handleSubmit}
            
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            Invia
          </button>
        </div>
        

    </div>
  )
}

export default ModalSupport
