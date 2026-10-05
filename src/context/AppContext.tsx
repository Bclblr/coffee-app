import {createContext,useContext,useMemo,useState,ReactNode} from "react";
type Equipment="espresso"|"frenchPress";
type InventoryItem="milk"|"vanilla"|"caramel"|"chocolate"|"water"|"ice"|"coffee"|"hazelnut"|"cinnamon"|"honey"|"coconut"|"oat"|"tonic"|"lemon"|"iceCream"|"cocoa";
type AppContextValue={favorites:string[];toggleFavorite:(id:string)=>void;equipment:Equipment[];toggleEquipment:(item:Equipment)=>void;inventory:InventoryItem[];toggleInventory:(item:InventoryItem)=>void;query:string;setQuery:(v:string)=>void};
const AppContext=createContext<AppContextValue|null>(null);
export function AppProvider({children}:{children:ReactNode}){const[favorites,setFavorites]=useState<string[]>([]);const[equipment,setEquipment]=useState<Equipment[]>(["espresso"]);const[inventory,setInventory]=useState<InventoryItem[]>(["milk","water","coffee"]);const[query,setQuery]=useState("");
const value=useMemo(()=>({favorites,toggleFavorite:(id:string)=>setFavorites(x=>x.includes(id)?x.filter(i=>i!==id):[...x,id]),equipment,toggleEquipment:(item:Equipment)=>setEquipment(x=>x.includes(item)?x.filter(i=>i!==item):[...x,item]),inventory,toggleInventory:(item:InventoryItem)=>setInventory(x=>x.includes(item)?x.filter(i=>i!==item):[...x,item]),query,setQuery}),[favorites,equipment,inventory,query]);return <AppContext.Provider value={value}>{children}</AppContext.Provider>}
export function useApp(){const value=useContext(AppContext);if(!value)throw new Error("useApp must be used inside AppProvider");return value}
export type {Equipment,InventoryItem};