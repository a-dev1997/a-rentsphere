import { useEffect, useState } from "react";
import { ScrollView, Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native"
import { useSelector } from "react-redux";

const PropertyView=({route})=>{
    let [isloading, setLoading] = useState(true)
    const { id,token } = route.params;
    
    let [datas, setdata] = useState()
    let [images,setImages]= useState([])
    let [count,setCount]=useState(0)
    const getProperty = () => {
        fetch(`https://rentsphere.onavinfosolutions.com/api/single-property`, {
            method: 'post',
            body: JSON.stringify({ id }),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then((result) => {
            setdata(result.data)
           setImages(result.data.images.split(","))
         console.log(datas.feature_image)
            
        }).finally((final) => setLoading(false))
    }
    useEffect(() => {
        getProperty()
    }, [])
    if (isloading == true) {
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large" color="#1C183D" />
            </View>
        )
    } else {
        return (
            <ScrollView style={{  }}>

                <View style={{ flexDirection: 'column', alignItems: 'center' ,marginTop:5}}>
                    {(images=='' || images==null)? <Image style={{height:400,width:'90%'}} source={{uri: `https://rentsphere.onavinfosolutions.com/public/uploads/propertyImages/${datas.featured_image}`}}  />
                  : <View style={{ height: 400, width: '100%',position:'relative',flexDirection:'row',justifyContent:'center' }} >
                    <TouchableOpacity onPress={()=>{if(count>0){
                        setCount(count-1)
                    }}} style={{position:'absolute',top:'50%',backgroundColor:'white',zIndex:10,width:50,right:'85%'}}> 
                        <Text>prev</Text>
                    </TouchableOpacity>
                   <Image style={{ height: 400, width: '90%' }} source={{ uri: `https://rentsphere.onavinfosolutions.com/public/uploads/propertyImages/${images[count]}` }} />
                   <TouchableOpacity onPress={()=>{if(count<images.length-1){
                        setCount(count+1)
                    }}} style={{position:'absolute',top:'50%',left:'85%',width:50,backgroundColor:'white'}}>
                        <Text>Next</Text>
                    </TouchableOpacity>
                    </View> }
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 10 }}>
                        <View style={{ width: '50%' }}>
                            <View style={{ padding: 2,marginHorizontal: 5,height:80 }}>
                                <Text style={{ fontWeight: 'bold' }}>Property Name</Text><Text> {datas.property_name}</Text></View>
                            <View style={{ padding: 2,marginHorizontal: 5,height:80 }}>
                                <Text style={{ fontWeight: 'bold' }}>Price</Text><Text> {datas.price}/{datas.payment_type}</Text></View>

                                <View style={{ padding: 2, marginHorizontal: 5,height:80 }}>
                                <Text style={{ fontWeight: 'bold' }}>Furnishing</Text><Text> {datas.furnishing}</Text></View>

                                <View style={{ padding: 2, marginHorizontal: 5,height:80 }}>
                                <Text style={{ fontWeight: 'bold' }}>city</Text><Text> {datas.city}</Text></View>
                                <View style={{ padding: 2,  marginHorizontal: 5,height:80 }}>
                                <Text style={{ fontWeight: 'bold' }}>State</Text><Text> {datas.state}</Text></View>
                                <View style={{ padding: 2,  marginHorizontal: 5,height:80 }}>
                                <Text style={{ fontWeight: 'bold' }}>construction Status</Text><Text> {datas.construction_status}</Text></View>
                                <View style={{ padding: 2,  marginHorizontal: 5,height:80 }}>
                                <Text style={{ fontWeight: 'bold' }}>Status</Text><Text> {datas.status}</Text></View>
                        </View>

                        <View style={{ width: '50%' }}>
                            <View style={{ padding: 2,marginHorizontal: 5 ,height:80}}>
                                <Text style={{ fontWeight: 'bold' }} >category</Text><Text> {datas.cat_data.category}</Text>
                            </View>
                            <View style={{ padding: 2,marginHorizontal: 5,height:80 }}>
                                <Text style={{ fontWeight: 'bold' }} >Posted on</Text><Text> {datas.created_at}</Text>
                            </View>
                            <View style={{ padding: 2, marginHorizontal: 5,height:80 }}>
                                <Text style={{ fontWeight: 'bold' }} >Facing</Text><Text> {datas.facing}</Text>
                            </View>
                            <View style={{ padding: 2,marginHorizontal: 5,height:80 }}>
                                <Text style={{ fontWeight: 'bold' }} >Floor</Text><Text> {datas.floors}</Text>
                            </View>
                            <View style={{ padding: 2,marginHorizontal: 5,height:80 }}>
                                <Text style={{ fontWeight: 'bold' }} >car Parking</Text><Text> {datas.carparking}</Text>
                            </View>
                            <View style={{ padding: 2, marginHorizontal: 5,height:80 }}>
                                <Text style={{ fontWeight: 'bold' }} >Maintenance</Text><Text> {datas.maintenance}</Text>
                            </View>
                            <View style={{ padding: 2,  marginHorizontal: 5,height:80 }}>
                                <Text style={{ fontWeight: 'bold' }} >Listed By</Text><Text> {datas.listed_by}</Text>
                            </View>
                        </View>
                        
                    </View>
                    <View style={{padding:10,width:'95%'}}>
                            <Text style={{fontWeight:'bold',textAlign:'left'}}>Features</Text>
                            <Text>{datas.features}</Text>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:'space-evenly',width:'100%',marginVertical:20}}>
                            <TouchableOpacity style={{backgroundColor:"#1C183D",paddingHorizontal:40,paddingVertical:20,borderRadius:20}}>
                                <Text style={{color:'white',fontWeight:'bold'}}>Call</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor:"#1C183D",paddingHorizontal:40,paddingVertical:20,borderRadius:20}}>
                                <Text style={{color:'white',fontWeight:'bold'}}>Chat</Text>
                            </TouchableOpacity>
                        </View>
                </View>

            </ScrollView>
        )
    }
}

export default PropertyView;