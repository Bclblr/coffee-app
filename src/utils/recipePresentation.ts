type Replacement = [RegExp, string];

const HOUSEHOLD_REPLACEMENTS: Replacement[] = [
  // Espresso: shot terminology is more useful than converting to teaspoons/fincans.
  [/40 ml double espresso/gi, "1 double espresso (yaklaşık 40 ml)"],
  [/40 ml espresso/gi, "1 espresso shot (yaklaşık 40 ml)"],
  [/36–44 g çıktı/gi, "36–44 g espresso çıktısı"],
  [/18 g espresso kahvesi/gi, "yaklaşık 2 yemek kaşığı espresso öğütümü"],
  [/18 g iri öğütülmüş kahve/gi, "yaklaşık 3 yemek kaşığı iri öğütülmüş kahve"],
  [/18 g iri kahve/gi, "yaklaşık 3 yemek kaşığı iri öğütülmüş kahve"],
  [/30 g iri öğütülmüş kahve/gi, "yaklaşık 4 yemek kaşığı iri öğütülmüş kahve"],
  [/18 g kahve/gi, "yaklaşık 3 yemek kaşığı kahve"],

  // Syrups/sauces: small volumes stay as teaspoons/tablespoons.
  [/15 ml/gi, "1 yemek kaşığı"],
  [/10 ml/gi, "2 çay kaşığı"],
  [/20 g çikolata sosu/gi, "yaklaşık 1 yemek kaşığı çikolata sosu"],
  [/20 g/gi, "yaklaşık 1 yemek kaşığı"],
  [/12 g bal/gi, "yaklaşık 2 çay kaşığı bal"],
  [/10 g bal/gi, "yaklaşık 2 çay kaşığı bal"],
  [/5 g kakao/gi, "1 yemek kaşığı kakao"],

  // Liquids: use Turkish household glass measures, not teaspoons.
  [/220 ml süt/gi, "1 su bardağı + 1 yemek kaşığı süt"],
  [/220 ml hindistan cevizi içeceği/gi, "1 su bardağı + 1 yemek kaşığı hindistan cevizi içeceği"],
  [/220 ml yulaf içeceği/gi, "1 su bardağı + 1 yemek kaşığı yulaf içeceği"],
  [/210 ml süt/gi, "1 su bardağı + 2 çay kaşığı süt"],
  [/200 ml/gi, "1 su bardağı"],
  [/190 ml soğuk süt/gi, "1 su bardağına yakın soğuk süt"],
  [/190 ml/gi, "1 su bardağına yakın"],
  [/180–200 ml soğuk süt/gi, "1 su bardağına yakın soğuk süt"],
  [/180–200 ml/gi, "1 su bardağına yakın"],
  [/180 ml soğuk süt/gi, "1 su bardağına yakın soğuk süt"],
  [/180 ml demlenmiş kahve/gi, "1 su bardağına yakın demlenmiş kahve"],
  [/180 ml/gi, "1 su bardağına yakın"],
  [/160 ml süt/gi, "yaklaşık 3/4 su bardağı süt"],
  [/150 ml süt/gi, "yaklaşık 3/4 su bardağı süt"],
  [/150 ml/gi, "yaklaşık 3/4 su bardağı"],
  [/120 ml sıcak süt/gi, "yaklaşık 1 küçük çay bardağı sıcak süt"],
  [/120 ml/gi, "yaklaşık 1 küçük çay bardağı"],
  [/100 ml sıcak süt/gi, "yaklaşık 1/2 su bardağı sıcak süt"],
  [/100 ml/gi, "yaklaşık 1/2 su bardağı"],
  [/300 ml sıcak su/gi, "1,5 su bardağı sıcak su"],
  [/300 ml oda sıcaklığında su/gi, "1,5 su bardağı oda sıcaklığında su"],
  [/300 ml su/gi, "1,5 su bardağı su"],

  // Foam and temperature: descriptive household language is enough.
  [/1–2 cm süt köpüğü/gi, "yaklaşık 1 parmak kalınlığında süt köpüğü"],
  [/2–3 cm süt köpüğü/gi, "yaklaşık 2 parmak kalınlığında süt köpüğü"],
  [/55–65°C/gi, "yaklaşık 60°C"],
  [/55–60°C/gi, "yaklaşık 58°C"],
  [/92–96°C/gi, "kaynama noktasına gelmeden, yaklaşık 94°C"],
];

export function formatKitchenMeasure(value: string) {
  let result = value;
  for (const [pattern, replacement] of HOUSEHOLD_REPLACEMENTS) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

const IMAGE_URLS = {
  latte: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1000&q=85",
  iced: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1000&q=85",
  coffee: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85",
  frenchPress: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1000&q=85",
  mocha: "https://images.unsplash.com/photo-1578374173708-8d4a4d1a0d7b?auto=format&fit=crop&w=1000&q=85",
};

export function getRecipeImage(recipe: { method: string; tags: string[]; name: string }) {
  const text = (recipe.name + " " + recipe.tags.join(" ")).toLowerCase();
  if (recipe.method === "frenchPress") return IMAGE_URLS.frenchPress;
  if (text.includes("soğuk") || text.includes("buzlu") || text.includes("cold brew")) {
    return IMAGE_URLS.iced;
  }
  if (text.includes("çikolata") || text.includes("mocha") || text.includes("kakao")) {
    return IMAGE_URLS.mocha;
  }
  if (text.includes("latte") || text.includes("cappuccino") || text.includes("flat white")) {
    return IMAGE_URLS.latte;
  }
  return IMAGE_URLS.coffee;
}
