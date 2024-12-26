



import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import Input from '../component/Input';
import DocumentPicker from 'react-native-document-picker'
import { fetchUserData } from '../reduxstore/userdataslice';
import { useDispatch, useSelector } from 'react-redux';

export default function PropertyForm() {
  const nav = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.userInfo)
  // console.log(data)
  const { id, name } = route.params
  const [payment, setPayment] = useState('month');
  const [selectedState, setSelectedState] = useState('');
  const [States, setState] = useState()
  const [listedby, setListedby] = useState('agent')
  const [furnishing, setFurnishing] = useState('fully-furnished');
  const [facing, setFacing] = useState('north');
  const [status, setStatus] = useState('active');
  const [propertyName, setPropertyName] = useState('');
  const [price, setPrice] = useState('');

  const [description, setDescription] = useState('');
  const [phone, setphone] = useState('');
  const [feature, setFeature] = useState('');
  const [address, setAddress] = useState('');
  const [city, setcity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [bathroom, setBathroom] = useState('');
  const [construction, setConstruction] = useState('');
  const [builtup, setBuiltup] = useState('');
  const [maintenance, setMaintenance] = useState('');
  const [floor, setFloor] = useState('');
  const [bedroom, setBedroom] = useState('');
  const [carpet, setCarpet] = useState('');
  const [total, setTotal] = useState('');
  const [carparking, setCarparking] = useState('');
  const [project, setProject] = useState('')
  const [featureimg, setFeatureImg] = useState(null)
  let [toggal, setToggal] = useState('none')
  let [propdata, setpropData] = useState('block')
  const [images, setImages] = useState([])

  const validation = () => {
    console.log(propertyName, price, description, phone, feature, address, city, zipcode, bathroom, construction, builtup, maintenance, floor, bedroom, carpet, total, carparking, project, selectedState)
    if (propertyName == '' || price == '' || description == '' || phone == '' || feature == '' || address == '' || city == '' || zipcode == '' || bathroom == '' || construction == '' || builtup == '' || maintenance == '' || floor == '' || bedroom == '' || carpet == '' || total == '' || carparking == '' || project == '' || selectedState == '') {
      Alert.alert(
        'all fields are required'

      )

    } else {
      setToggal('block');
      setpropData('none')
    }
  }
  const removeImage = (indx) => {
    console.log(indx)
    let b = images.slice(0, indx)
    console.log(b)
    setImages(b)

  }

  const handleImagePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images], // You can specify file types like .pdf, .docx, etc.
      });
      setFeatureImg(res);
      console.log('Picked document:', res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.log('Unknown error: ', err);
      }
    }
  }

  const handleImages = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images], // You can specify file types like .pdf, .docx, etc.
        allowMultiSelection: true
      });
      setImages(res)
      console.log('Picked document2:', images);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.log('Unknown error: ', err);
      }
    }
  }


  const handleSubmit = async () => {

    const formData = new FormData();

    // images.forEach((file, index) => {
    //   formData.append('images', {
    //     uri: file.uri,
    //     type: file.type, // MIME type of the file
    //     name: file.name, // File name
    //   });
    // });

    images.forEach((image) => {
      formData.append('images[]', {
        uri: image.uri,
        type: image.type,
        name: image.name,
      });
    });

    formData.append("feature_image", featureimg[0])

    // formData.append("images",'djfd')
    // formData.append('feature_image',"kdjf")
    formData.append("category_id", id)
    formData.append("property_name", propertyName)
    formData.append("price", price)
    formData.append("description", description)
    formData.append("phone", phone)
    formData.append("features", feature)
    formData.append("zip_code", zipcode)
    formData.append("bathroom", bathroom)
    formData.append("construction_status", construction)
    formData.append("maintenance", maintenance)
    formData.append("super_builtup_area", builtup)
    formData.append("floors", floor)
    formData.append("bedrooms", bedroom)
    formData.append("total_floors", total)
    formData.append("carparking", carparking)
    formData.append("project_name", project)
    formData.append("state", selectedState)
    formData.append("listed_by", listedby)
    formData.append("facing", facing)
    formData.append("status", status)
    formData.append("payment_type", payment)
    formData.append("address", address)
    formData.append("carpet_area", carpet);
    formData.append("city", city),
      formData.append("address", address),
      // formData.append("project_name", project_name)
      formData.append('status', status)
    formData.append("furnishing", furnishing)
    formData.append('user_id', data.result.data.id)
    // console.log(data.result.data.id)
    console.log(formData)
    fetch('https://rentsphere.onavinfosolutions.com/api/property-added-to-user', {
      method: 'post',
      body: formData,
      headers: {
        // 'Content-Type':'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => res.json()).then((result) => { console.log(result) }).catch((err) => { console.log(err) }).finally((final)=>{  nav.navigate('bottomtab',{screen:'Profile'})})



  };


  const getState = async () => {

    fetch('https://rentsphere.onavinfosolutions.com/api/states').then((res) => res.json()).then((result) => setState(result.data));

  }

  useEffect(() => {
    getState()
    dispatch(fetchUserData())
  }, [])

  return (
    <ScrollView  >
      <View style={{ alignItems: 'center', marginTop: 10, display: propdata }}>
        <View style={{ backgroundColor: '#1C183D', paddingVertical: 10, paddingHorizontal: 100, borderRadius: 20 }}>
          <Text style={{ color: 'white' }}>Selected Category : {name}</Text>
        </View>
        <View style={{ marginVertical: 20 }}>

          <Input onChangeHandler={(e) => { setPropertyName(e) }} label={'Property Name'} />

          <Input onChangeHandler={(e) => { setPrice(e) }} label={"Price"} />




          <Text>payment type</Text>
          <Picker
            selectedValue={payment}
            onValueChange={(itemValue) => setPayment(itemValue)}
            style={{ marginVertical: 10, backgroundColor: 'gray', width: '300', fontSize: 10 }}
          >
            <Picker.Item label='month' value={'month'} />
            <Picker.Item label='year' value={'year'} />
          </Picker >
          <Input onChangeHandler={(e) => { setDescription(e) }} label={'Description'} multiline={true} />
          <Input onChangeHandler={(e) => { setphone(e) }} label={"phone"} type={'numeric'} />
          <Input onChangeHandler={(e) => { setFeature(e) }} label={"Features"} multiline={true} />
          <Input onChangeHandler={(e) => { setAddress(e) }} label={'Address'} multiline={true} />
          <Input onChangeHandler={(e) => { setcity(e) }} label={'City'} />
          <Text>Select state</Text>
          <Picker
            selectedValue={selectedState}
            onValueChange={(itemValue) => setSelectedState(itemValue)}
            style={{ backgroundColor: "gray" }}>
            {States?.map((val, index) => {

              return (
                <Picker.Item label={val.states} value={val.states} />
              )
            })}
          </Picker>
          <Input onChangeHandler={(e) => { setZipcode(e) }} label={'Zip-Code'} type={'numeric'} />
          <Input onChangeHandler={(e) => { setBathroom(e) }} label={'Bathrooms'} type={'numeric'} />
          <Input onChangeHandler={(e) => { setBedroom(e) }} label={'Bedroom'} type={'numeric'} />
          <Input onChangeHandler={(e) => { setConstruction(e) }} label={'Construction Status'} />
          <Input onChangeHandler={(e) => { setBuiltup(e) }} label={'Super BuiltUp Area'} type={'numeric'} />
          <Input onChangeHandler={(e) => { setMaintenance(e) }} label={'Maintenance'} type={'numeric'} />
          <Input onChangeHandler={(e) => { setFloor(e) }} label={'Floor'} type={'numeric'} />
          <Input onChangeHandler={(e) => { setCarpet(e) }} label={'Carpet Area'} type={'numeric'} />
          <Input onChangeHandler={(e) => { setTotal(e) }} label={'Total Floors'} type={'numeric'} />
          <Input onChangeHandler={(e) => { setCarparking(e) }} label={'Car Parking'} type={'numeric'} />
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
            selectedValue={status}
            onValueChange={(itemValue) => setStatus(itemValue)}
            style={{ marginVertical: 10, backgroundColor: 'gray', width: '300', fontSize: 10 }}
          >
            <Picker.Item label='active' value={'active'} />
            <Picker.Item label='inactive' value={'semi-furnished'} />

          </Picker >

          <Input onChangeHandler={(e) => { setProject(e) }} label={'Project Name'} />
          <TouchableOpacity onPress={() => { validation() }} style={{ backgroundColor: '#1C183D', width: 300 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', paddingVertical: 10 }}>
              Next
            </Text>
          </TouchableOpacity>
        </View>

      </View>


      <View style={{ display: toggal }}>
        <TouchableOpacity onPress={() => {
          setToggal('none');
          setpropData('block')
        }} style={{ backgroundColor: '#1C183D', paddingVertical: 5, paddingHorizontal: 10, margin: 20 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>
            Go back
          </Text>
        </TouchableOpacity>
        <View style={{ alignItems: 'center', width: 400 }}>
          <View style={{ backgroundColor: '#1C183D', paddingVertical: 5, paddingHorizontal: 10 }}>
            <Text style={{ color: 'white' }}>Please select a Display image of your property</Text>
          </View>

          <View>
            <TouchableOpacity onPress={() => { handleImagePicker() }} style={{ backgroundColor: '#1C183D', paddingVertical: 5, paddingHorizontal: 10, margin: 10 }}>
              <Text style={{ textAlign: 'center', color: 'white' }}>Add Image</Text>

            </TouchableOpacity>
            <View style={{ height: 200, width: 200, borderWidth: 1, borderColor: 'gray', borderRadius: 10, overflow: 'hidden' }}>
              {
                featureimg != null ? <Image source={{ uri: featureimg[0].uri }} style={{ height: 200, width: 200, objectFit: 'cover' }} /> : <Text style={{ textAlign: 'center' }}>Preview</Text>
              }

            </View>
          </View >
          <View>
            <View>
              <Text>Select multiple image of your property </Text>
              <Text>note:</Text>
            </View>
            <TouchableOpacity onPress={() => { handleImages() }} style={{ backgroundColor: '#1C183D', paddingVertical: 5, paddingHorizontal: 10, margin: 10 }}>
              <Text style={{ textAlign: 'center', color: 'white' }}>Add Image</Text>

            </TouchableOpacity>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', margin: 20 }}>
              {

                images.length ? images?.map((val, index) => {

                  return (
                    <View> <Image source={{ uri: val.uri }} style={{ height: 100, width: 100, objectFit: 'cover' }} />

                      <Button onPress={() => { removeImage(index) }} title="delete" />
                    </View>

                  )
                }) : <Text style={{ textAlign: 'center', marginVertical: 20 }}> Images will be Previewed here</Text>
              }

            </View>
          </View>
          <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: '#1C183D', paddingVertical: 10, paddingHorizontal: 50, marginVertical: 40 }}>
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
}

