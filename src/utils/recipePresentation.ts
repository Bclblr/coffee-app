const HOUSEHOLD_REPLACEMENTS:[RegExp,string][]=[
  [/40 ml (double )?espresso/g,"yaklaşık 1 kahve fincanı $1espresso"],
  [/15 ml/g,"1 yemek kaşığı"],
  [/10 ml/g,"2 çay kaşığı"],
  [/20 g çikolata sosu/g,"1 yemek kaşığı çikolata sosu"],
  [/20 g/g,"1 yemek kaşığı"],
  [/220 ml/g,"1 su bardağı + 1 yemek kaşığı"],
  [/210 ml/g,"1 su bardağı + 2 çay kaşığı"],
  [/200 ml/g,"1 su bardağı"],
  [/190 ml/g,"1 su bardağına yakın"],
  [/180–200 ml/g,"1 su bardağına yakın"],
  [/180 ml/g,"1 su bardağına yakın"],
  [/160 ml/g,"yaklaşık 3\/4 su bardağı"],
  [/150 ml/g,"yaklaşık 3\/4 su bardağı"],
  [/120 ml/g,"2 kahve fincanı"],
  [/100 ml/g,"1\/2 su bardağı"],
  [/300 ml/g,"1,5 su bardağı"],
  [/30 g iri öğütülmüş kahve/g,"yaklaşık 4 yemek kaşığı iri öğütülmüş kahve"],
  [/18 g (iri )?(öğütülmüş )?kahve/g,"yaklaşık 3 yemek kaşığı kahve"],
  [/18 g espresso kahvesi/g,"yaklaşık 3 yemek kaşığı espresso kahvesi"],
  [/12 g bal/g,"2 çay kaşığı bal"],
  [/10 g bal/g,"2 çay kaşığı bal"],
  [/5 g kakao/g,"1 yemek kaşığı kakao"],
  [/36–44 g çıktı/g,"1 küçük espresso fincanı kadar çıktı"],
  [/300 ml sıcak su/g,"1,5 su bardağı sıcak su"],
  [/300 ml oda sıcaklığında su/g,"1,5 su bardağı oda sıcaklığında su"],
  [/180 ml demlenmiş kahve/g,"yaklaşık 1 su bardağı demlenmiş kahve"],
  [/120 ml sıcak süt/g,"2 kahve fincanı sıcak süt"],
  [/100 ml sıcak süt/g,"1\/2 su bardağı sıcak süt"],
  [/1–2 cm süt köpüğü/g,"ince bir parmak kadar süt köpüğü"],
  [/2–3 cm süt köpüğü/g,"2 parmak kadar süt köpüğü"],
  [/55–65°C/g,"yaklaşık 60°C"],
  [/55–60°C/g,"yaklaşık 58°C"],
  [/92–96°C/g,"yaklaşık 94°C"],
];

export function formatKitchenMeasure(value:string){
  let result=value;
  for(const[pattern,replacement]of HOUSEHOLD_REPLACEMENTS)result=result.replace(pattern,replacement);
  return result;
}

const IMAGE_URLS={
  latte:"https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1000&q=85",
  iced:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1000&q=85",
  coffee:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85",
  frenchPress:"https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1000&q=85",
  mocha:"https://images.unsplash.com/photo-1578374173708-8d4a4d1a0d7b?auto=format&fit=crop&w=1000&q=85",
};

export function getRecipeImage(recipe:{method:string;tags:string[];name:string}){
  const text=(recipe.name+" "+recipe.tags.join(" ")).toLowerCase();
  if(recipe.method==="frenchPress")return IMAGE_URLS.frenchPress;
  if(text.includes("soğuk")||text.includes("buzlu")||text.includes("cold brew"))return IMAGE_URLS.iced;
  if(text.includes("çikolata")||text.includes("mocha")||text.includes("kakao"))return IMAGE_URLS.mocha;
  if(text.includes("latte")||text.includes("cappuccino")||text.includes("flat white"))return IMAGE_URLS.latte;
  return IMAGE_URLS.coffee;
}
