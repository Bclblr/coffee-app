import {createContext,useContext,useEffect,useMemo,useState,ReactNode} from "react";
import {supabase} from "../lib/supabase";
import {recipes as localRecipes,Recipe} from "../data/recipes";

type Equipment="espresso"|"frenchPress";
type InventoryItem="milk"|"vanilla"|"caramel"|"chocolate"|"water"|"ice"|"coffee"|"hazelnut"|"cinnamon"|"honey"|"coconut"|"oat"|"tonic"|"lemon"|"iceCream"|"cocoa";
type AppContextValue={recipes:Recipe[];recipesLoading:boolean;favorites:string[];toggleFavorite:(id:string)=>void;equipment:Equipment[];toggleEquipment:(item:Equipment)=>void;inventory:InventoryItem[];toggleInventory:(item:InventoryItem)=>void;query:string;setQuery:(v:string)=>void};

const AppContext=createContext<AppContextValue|null>(null);

export function AppProvider({children}:{children:ReactNode}){
  const[favorites,setFavorites]=useState<string[]>([]);
  const[equipment,setEquipment]=useState<Equipment[]>(["espresso"]);
  const[inventory,setInventory]=useState<InventoryItem[]>(["milk","water","coffee"]);
  const[query,setQuery]=useState("");
  const[recipes,setRecipes]=useState<Recipe[]>(localRecipes);
  const[recipesLoading,setRecipesLoading]=useState(true);

  useEffect(()=>{
    let active=true;
    async function loadRecipes(){
      const{data,error}=await supabase.from("recipes").select("id,name,category,method,time,difficulty,description,ingredients,steps,tags,required_items").order("name");
      if(!active)return;
      if(error||!data?.length){setRecipes(localRecipes);setRecipesLoading(false);return;}
      setRecipes(data.map((r)=>({
        id:r.id,name:r.name,category:r.category,method:r.method,time:r.time,difficulty:r.difficulty,
        description:r.description,ingredients:r.ingredients??[],steps:r.steps??[],tags:r.tags??[],requiredItems:r.required_items??[]
      })) as Recipe[]);
      setRecipesLoading(false);
    }
    loadRecipes();
    return()=>{active=false};
  },[]);

  const value=useMemo(()=>({
    recipes,recipesLoading,favorites,
    toggleFavorite:(id:string)=>setFavorites(x=>x.includes(id)?x.filter(i=>i!==id):[...x,id]),
    equipment,toggleEquipment:(item:Equipment)=>setEquipment(x=>x.includes(item)?x.filter(i=>i!==item):[...x,item]),
    inventory,toggleInventory:(item:InventoryItem)=>setInventory(x=>x.includes(item)?x.filter(i=>i!==item):[...x,item]),
    query,setQuery
  }),[recipes,recipesLoading,favorites,equipment,inventory,query]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
export function useApp(){const value=useContext(AppContext);if(!value)throw new Error("useApp must be used inside AppProvider");return value}
export type {Equipment,InventoryItem};