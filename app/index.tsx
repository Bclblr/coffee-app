import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return <View style={styles.container}>
    <Text style={styles.eyebrow}>COFFEE APP</Text>
    <Text style={styles.title}>Kafenizi evde yapın.</Text>
    <Text style={styles.subtitle}>Espresso makinesi, French Press veya elinizdeki ekipmanlarla hazırlayabileceğiniz kafe tarzı kahveler.</Text>
    <Link href="/recipes" style={styles.button}>Tarifleri keşfet</Link>
  </View>;
}
const styles=StyleSheet.create({
 container:{flex:1,justifyContent:"center",padding:28,backgroundColor:"#F7F3ED"},
 eyebrow:{fontSize:13,fontWeight:"700",letterSpacing:2,color:"#765548",marginBottom:12},
 title:{fontSize:38,lineHeight:44,fontWeight:"800",color:"#2B211D"},
 subtitle:{marginTop:16,fontSize:17,lineHeight:25,color:"#62534D"},
 button:{marginTop:28,alignSelf:"flex-start",paddingHorizontal:20,paddingVertical:14,borderRadius:14,backgroundColor:"#5B3A29",color:"#FFF",fontSize:16,fontWeight:"700"}
});