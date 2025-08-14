import Link from "next/link";
import Image from "next/image";
import { Chat } from "@/types/chat";
import apiUrl from "@/app/api/apiUrl";
import { useEffect, useState } from "react";
import ModalSupport from "../Modal/ModalSupport";



const ChatCard = () => {

  const [ifOpen, setIfOpen] = useState(false);
  const [newMessageAlert, setNewMessageAlert] = useState(false);
  const [lastRequistId, setLastRequistId] = useState<string | null>(null);
  const [supportRequestId, setSupportRequestId] = useState<string | null>(null);
  const [supportRequests, setSupportRequests] = useState<any[]>([]);
  const [lastMessageMap, setLastMessageMap] = useState<Record<string, string>>({});
  const [initialized, setInitialized] = useState(false);
  const [totalPage , setTotalPage] = useState<number|undefined>(1)
  const [currentPage , setCurrentPage] = useState<number|undefined>(1)
  const [link , setLink] = useState<string>(`${apiUrl}/support/page/messages?page=1&limit=5`)
  const pageNumbers = Array.from({ length: totalPage??1 }, (_, index) => index + 1);
  const handelChangeIfOpen = (data : boolean ) =>{
    setIfOpen(data)
  }
  const changeSupportId = (data : boolean,SupportId:string ) =>{
    setIfOpen(data)
    setSupportRequestId(SupportId);
  }

  // Funzione get last message
  useEffect(() => {
    const fetchSupportRequests = async () => {
      try {
        const res = await fetch(`${link}`);
        const data = await res.json(); // supportRequests array
  
        setSupportRequests(data.supportRequests);
        const tot = Math.ceil(data.total/5)
        setTotalPage(tot)
  
        let hasNewMessage = false;
        const updatedLastMessageMap = { ...lastMessageMap };
  
       
  
        setLastMessageMap(updatedLastMessageMap);
        
        
  
        if (!initialized) {
          setInitialized(true); // ignora il primo fetch
        } else if (hasNewMessage) {
          setNewMessageAlert(true);
          
        }
      } catch (err) {
        console.error("Errore nel recupero delle richieste supporto:", err);
      }
    };
    
  
    fetchSupportRequests(); // primo fetch
    const interval = setInterval(fetchSupportRequests, 5000); // ogni 5s
  
    return () => clearInterval(interval);
  }, [lastMessageMap,link,initialized]);

  
  const previousPage = async () => {
      if(currentPage)
      if(currentPage > 1){
        setCurrentPage(currentPage-1)
        
          setLink(`${apiUrl}/support/page/messages?page=${currentPage-1}&limit=5`)
      }
    }
    const changePage = (page :number) => {
      setCurrentPage(page)
        setLink(`${apiUrl}/support/page/messages?page=${page}&limit=5`)
  }
  
    const nextPage = async () => {
      if(currentPage&&totalPage){
        if(currentPage < totalPage){
          setCurrentPage(currentPage+1)
            setLink(`${apiUrl}/support/page/messages?page=${currentPage+1}&limit=5`)
      }
    }}
    function formatCreatedAt(createdAt: string): string {
      const date = new Date(createdAt);
    
      return date.toLocaleString('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }

  return (
    <div className="col-span-12 rounded-[10px] bg-white py-6 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-4">
      {ifOpen &&<ModalSupport  changeIfOpen={handelChangeIfOpen} lastRequestId={lastRequistId || ""} supportRequestId={supportRequestId || ""} />}
      <h4 className="mb-5.5 px-7.5 text-body-2xlg font-bold text-dark dark:text-white">
        Chats
      </h4>

      <div  className="flex flex-col gap-4.5 px-7.5">
        {supportRequests.map((support, key) => (
          <div
          onClick={() => changeSupportId(true, support.id)}
            className="flex items-center gap-4.5 px-7.5 py-3 hover:bg-gray-1 dark:hover:bg-dark-2"
            key={key}
          >
            <div className="relative h-14 w-14 rounded-full">
              <Image
                width={56}
                height={56}
                src={'/images/user/avatar-1.jpg'}
                alt="User"
                style={{
                  width: "auto",
                  height: "auto",
                }}
              />
              
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-dark dark:text-white">
                  {support.message}
                </h5>
                <p>
                  {support.subject}
                </p>
                <p>
                  {support.createdAt ? formatCreatedAt(support.createdAt) : ""}
                </p>
              </div>
             
                <div className="flex items-center justify-center rounded-full bg-primary px-2 py-0.5">
                  <span className="text-sm font-medium text-white">
                    *
                  </span>
                </div>
             
            </div>
          </div>
        ))}
      </div>
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button onClick={()=>previousPage()}  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
        </li>
        {pageNumbers.map((value,index)=>(
          currentPage ==index+1 ?<li key={index}>
          <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{index+1}</a>
        </li>:<li key={index}>
          <button onClick={()=>changePage(index+1)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{index+1}</button>
        </li>
      ))}
      <li>
        <button onClick={()=>nextPage()} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
      </li>
    </ul>
  </nav>
    </div>
  );
};

export default ChatCard;
