import { Stack,useLocalSearchParams } from "expo-router";
import { StyleSheet,Text,View } from "react-native";
const data:Record<string,{name:string;ingredients:string[]}>={
"vanilla-latte":{name:"Vanilyalı Latte",ingredients:["40 ml espresso","15 ml vanilya şurubu","220 ml süt","1–2 cm süt köpüğü"]},
"iced-vanilla-latte":{name:"Buzlu Vanilyalı Latte",ingredients:["40 ml espresso","15 ml vanilya şurubu","180–200 ml soğuk süt","Bol buz"]},
"french-press-latte":{name:"French Press Sütlü Kahve",ingredients:["18 g iri öğütülmüş kahve","300 ml su","120 ml sıcak süt"]}};
export default function RecipeDetail(){const{id}=useLocalSearchParams<{id:string}>();const recipe=data[id??""]??data["vanilla-latte"];return <View style={styles.container}><Stack.Screen options={{title:recipe.name}}/><Text style={styles.title}>{recipe.name}</Text><Text style={styles.heading}>Malzemeler</Text>{recipe.ingredients.map(item=><Text key={item} style={styles.item}>• {item}</Text>)}</View>}
const styles=StyleSheet.create({container:{flex:1,padding:24,paddingTop:70,backgroundColor:"#F7F3ED"},title:{fontSize:32,fontWeight:"800",color:"#2B211D",marginBottom:28},heading:{fontSize:20,fontWeight:"700",color:"#2B211D",marginBottom:12},item:{fontSize:17,lineHeight:30,color:"#554741"}});