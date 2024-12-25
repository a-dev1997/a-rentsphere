import { Button, ScrollView, Text,View,TouchableOpacity,Image } from "react-native";
import { useEffect, useState } from "react";
import { useRoute,useNavigation } from "@react-navigation/native";
import Input from "../component/Input";
import { useSelector,useDispatch } from "react-redux";
import { fetchStates } from "../reduxstore/getstatesSlice";
import { Picker } from "@react-native-picker/picker";
const UpdateProperty=()=>{
    const nav = useNavigation();
    const route = useRoute();
    const {id}=route.params;
    const dispatch=useDispatch();
    const {data,status}=useSelector((state) => state.states);
    // console.log(data)
    const [payment, setPayment] = useState('month');
    const [selectedState, setSelectedState] = useState('');
    const [States, setState] = useState()
    const [listedby, setListedby] = useState('agent')
    const [furnishing, setFurnishing] = useState('fully-furnished');
    const [facing, setFacing] = useState('north');
    const [statuss, setStatus] = useState('active');
    const [propertyName, setPropertyName] = useState('');
    const [price, setPrice] = useState('');
  
    const [description, setDescription] = useState('');
    const [phone, setphone] = useState('');
    const [feature,setFeature]=useState('');
    const [address,setAddress]=useState('');
    const [city,setcity]=useState('');
    const [zipcode ,setZipcode]=useState('');
    const [bathroom,setBathroom]=useState('');
    const [construction,setConstruction]=useState('');
    const [builtup,setBuiltup]=useState('');
    const [maintenance,setMaintenance]=useState('');
    const [floor,setFloor]=useState('');
    const [bedroom,setBedroom]=useState('');
    const [carpet,setCarpet]=useState('');
    const [total,setTotal]=useState('');
    const [carparking,setCarparking]=useState('');
    const [project,setProject]=useState('')
    const [featureimg,setFeatureImg]=useState(null)

    const setValues=(val)=>{
        setPropertyName(val.data.property_name);
        setDescription(val.data.description)
        setPrice(val.data.price);
        setPayment(val.data.payment_type);
        setphone(val.data.phone);
        setFeature(val.data.features);
        setAddress(val.data.address);
        setcity(val.data.city);
        setSelectedState(val.data.state);
        setZipcode(val.data.zip_code);
        setBathroom(val.data.bathrooms);
        setBedroom(val.data.bathrooms);
        setCarparking(val.data.carparking);
        setConstruction(val.data.construction_status);
        setBuiltup(val.data.super_builtup_area)
        setTotal(val.data.total_floors)
        setFacing(val.data.facing);
        setProject(val.data.project_name)
        setFloor(val.data.floors);
        setCarpet(val.data.carpet);
        setFurnishing(val.data.furnishing);
        setListedby(val.data.listedby);
        setMaintenance(val.data.maintenance);
        setCarpet(val.data.carpet_area)
        
    }

    const getPropert=async(user)=>{
        await fetch('https://rentsphere.onavinfosolutions.com/api/single-property',{
            method:'post',
            body:JSON.stringify({id:user}),
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res)=>res.json()).then((result)=>{setValues(result)}).catch((err)=>console.log(err))

    }

    useEffect(()=>{
        getPropert(id)
        dispatch(fetchStates());
        console.log(floor)
       
    },[])
    useEffect(()=>{
 if(status =='succeeded'){
          setState(data.data);
         
 
        }
    },[data])
    return(
        <ScrollView>
            <Button onPress={()=>{nav.goBack()}}  title="Cancel"/>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
        <View style={{ backgroundColor: '#1C183D', paddingVertical: 10, paddingHorizontal: 100, borderRadius: 20 }}>
          <Text style={{ color: 'white' }}>Selected Category :</Text>
        </View>
        <View style={{ marginVertical: 20 }}>

          <Input  onChangeHandler={(e)=>{setPropertyName(e)}} value={propertyName}  label={'Property Name'} />

          <Input onChangeHandler={(e)=>{setPrice(e)}} value={price} label={"Price"} />




          <Text>payment type</Text>
          <Picker
            selectedValue={payment}
            onValueChange={(itemValue) => setPayment(itemValue)}
            style={{ marginVertical: 10, backgroundColor: 'gray', width: '300', fontSize: 10 }}
          >
            <Picker.Item label='month' value={'month'} />
            <Picker.Item label='year' value={'year'} />
          </Picker >
          <Input onChangeHandler={(e)=>{setDescription(e)}} value={description} label={'Description'} multiline={true} />
          <Input onChangeHandler={(e)=>{setphone(e)}} value={phone} label={"phone"} type={'numeric'} />
          <Input onChangeHandler={(e)=>{setFeature(e)}} value={feature} label={"Features"} multiline={true} />
          <Input value={address} onChangeHandler={(e)=>{setAddress(e)}} label={'Address'} multiline={true} />
          <Input value={city} onChangeHandler={(e)=>{setcity(e)}} label={'City'} />
          <Text>Select state</Text>
          <Picker
            selectedValue={selectedState}
            onValueChange={(itemValue)=>setSelectedState(itemValue)}
            style={{ backgroundColor: "gray" }}>
            {States? States?.map((val, index) => {

              return (
                <Picker.Item label={val.states} value={val.states} />
              )
            }):''}
          </Picker>
          <Input value={zipcode} onChangeHandler={(e)=>{setZipcode(e)}} label={'Zip-Code'} type={'numeric'} />
          <Input  onChangeHandler={(e)=>{setBathroom(e)}} label={'Bathrooms'} value={bathroom.toString()} type={'numeric'} />
          <Input value={bathroom.toString()} onChangeHandler={(e)=>{setBedroom(e)}} label={'Bedroom'} type={'numeric'} />
          <Input value={construction} onChangeHandler={(e)=>{setConstruction(e)}} label={'Construction Status'} />
          <Input value={builtup.toString()} onChangeHandler={(e)=>{setBuiltup(e)}} label={'Super BuiltUp Area'} type={'numeric'} />
          <Input value={maintenance.toString()} onChangeHandler={(e)=>{setMaintenance(e)}} label={'Maintenance'} type={'numeric'} />
          <Input onChangeHandler={(e)=>{setFloor(e)}} value={floor.toString()} label={'Floor'} type={'numeric'} />
          <Input onChangeHandler={(e)=>{setCarpet(e)}} value={carpet.toString()} label={'Carpet Area'} type={'numeric'} />
          <Input value={total.toString()} onChangeHandler={(e)=>{setTotal(e)}} label={'Total Floors'} type={'numeric'} />
          <Input value={carparking.toString()} onChangeHandler={(e)=>{setCarparking(e)}} label={'Car Parking'} type={'numeric'} />
          <Text>Listed by</Text>
          <Picker
            selectedValue={listedby}
            onValueChange={(itemValue) => setListedby(itemValue)}
            style={{ marginVertical: 10, backgroundColor: 'gray', width: '300', fontSize: 10 }}
          >
            <Picker.Item label='agent' value={'agent'} />
            <Picker.Item label='owner' value={'owner'} />
          </Picker >
          <Text>Furnishing</Text>
          <Picker
            selectedValue={furnishing}
            onValueChange={(itemValue) => setFurnishing(itemValue)}
            style={{ marginVertical: 10, backgroundColor: 'gray', width: '300', fontSize: 10 }}
          >
            <Picker.Item label='fully-furnished' value={'fully-furnished'} />
            <Picker.Item label='semi-furnished' value={'semi-furnished'} />
            <Picker.Item label='unfurnished' value={'unfurnished'} />
          </Picker >

          <Text>Facing</Text>
          <Picker
            selectedValue={facing}
            onValueChange={(itemValue) => setFacing(itemValue)}
            style={{ marginVertical: 10, backgroundColor: 'gray', width: '300', fontSize: 10 }}
          >
            <Picker.Item label='north' value={'north'} />
            <Picker.Item label='east' value={'east'} />
            <Picker.Item label='west' value={'west'} />
            <Picker.Item label='south' value={'south'} />
            <Picker.Item label='north-east' value={'north-east'} />
            <Picker.Item label='north-west' value={'north-west'} />
            <Picker.Item label='south-east' value={'south-east'} />
            <Picker.Item label='south-west' value={'south-west'} />
          </Picker >

          <Text>Status</Text>
          <Picker
            selectedValue={statuss}
            onValueChange={(itemValue) => setStatus(itemValue)}
            style={{ marginVertical: 10, backgroundColor: 'gray', width: '300', fontSize: 10 }}
          >
            <Picker.Item label='active' value={'active'} />
            <Picker.Item label='inactive' value={'semi-furnished'} />

          </Picker >

          <Input value={project} onChangeHandler={(e)=>{setProject(e)}} label={'Project Name'} />
          <TouchableOpacity onPress={()=>{validation()}} style={{ backgroundColor: '#1C183D', width: 300 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', paddingVertical: 10 }}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
        </View>
        </ScrollView>
    )
}

export default UpdateProperty;