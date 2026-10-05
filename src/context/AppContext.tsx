import { createContext,useContext,useMemo,useState,ReactNode } from "react";
type Equipment="espresso"|"frenchPress";
type AppContextValue={favorites:string[];toggleFavorite:(id:string)=>void;equipment:Equipment[];toggleEquipment:(item:Equipment)=>void;query:string;setQuery:(v:string)=>void};
const AppContext=createContext<AppContextValue|null>(null);
export function AppProvider({children}:{children:ReactNode}){const[favorites,setFavorites]=useState<string[]>([]);const[equipment,setEquipment]=useState<Equipment[]>(["espresso"]);const[query,setQuery]=useState("");const value=useMemo(()=>({favorites,toggleFavorite:(id:string)=>setFavorites(x=>x.includes(id)?x.filter(i=>i!==id):[...x,id]),equipment,toggleEquipment:(item:Equipment)=>setEquipment(x=>x.includes(item)?x.filter(i=>i!==item):[...x,item]),query,setQuery}),[favorites,equipment,query]);return <AppContext.Provider value={value}>{children}</AppContext.Provider>}
export function useApp(){const value=useContext(AppContext);if(!value)throw new Error("useApp must be used inside AppProvider");return value}
