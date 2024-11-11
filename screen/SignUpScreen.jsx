import React, {useEffect, useReducer, useState} from 'react';
import {KeyboardAvoidingView,View, Image, Text, StyleSheet, TextInput, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import ModalPopUp from '../component/ModalPopUp';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialFormState = {
  fullname: '',
  email: '',
  password: '',
};

function SignUpScreen() {
  const [formData, setFormData] = useReducer((state, event) => {
    return {...state, [event.name]: event.value};
  }, initialFormState);

  const [modalVisible, setModalVisible] = useState(false);

    const handleChange = (val, name) => {
        setFormData({
            name: name,
            value: val,
        });
    }

    const handleSubmit = async () => {
        try {
            // const res = await axios.post("http://localhost:3000/api/v1/auth/signup",
            //     JSON.stringify(formData), {
            //     headers: {
            //         "Content-Type": 'application/json'
            //     }
            // }
            // )
            await AsyncStorage.setItem(
                'token',
                'logged in',
              );
            setModalVisible(true);
        } catch (error) {
            console.error(error);
        }
        
    }

    const handleClose = async () => {
        setModalVisible(false);
    }

    const navigation = useNavigation();

    // useEffect( async() => {
    //     const token = await AsyncStorage.getItem('token');
    //     console.log(token);
    //     if(token) {
    //         navigation.navigate("Home");
    //     }
    // }, []);

  return (
    <View style={style.container}>
        <Image style={style.logo} source={require('../media/images/toyota.png')}/>
        <Feather onPress={() => {navigation.navigate("Home")}} style={style.back}  name="x" size={50}/>
      <Text style={style.title}>Sign Up</Text>
      <KeyboardAvoidingView style={{width: '80%'}}>
        <Text style={style.fieldTitle}>Name*</Text>
        <TextInput style={style.field} onChangeText={(text) => handleChange(text, 'name')} placeholder='Full Name'/>
        <Text style={style.fieldTitle}>Email*</Text>
        <TextInput style={style.field} onChangeText={(text) => handleChange(text, 'email')} placeholder='Contoh: JohnDoe@gmail.com'/>
        <Text style={style.fieldTitle}>Password</Text>
        <TextInput style={style.field} secureTextEntry={true} onChangeText={(text) => handleChange(text, 'password')} placeholder='6+ Character'/>
        <Button color="green" title="Sign Up" onPress={handleSubmit}/>
        <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 14, textAlign: 'center'}}>Already have an account?<Text style={style.link} onPress={() => navigation.navigate("SignIn")}> Sign In Here</Text></Text>
      </KeyboardAvoidingView>
      <ModalPopUp visible={modalVisible}> 
        <Text style={style.modalText}>Sign Up Success</Text>
        <Button title="Close" onPress={() => {handleClose()}} />
      </ModalPopUp>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 40
  },
  fieldTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  field: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: '100%',
    fontSize: 16,
  },
  link: {
    color: 'green',
  },
  logo: {
    position: 'absolute',
    top: 30,
    left: 10,
    width: 150,
    height: 50,
    resizeMode: 'contain',
  },
  back: {
    position: 'absolute',
    top: 30,
    right: 20,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default SignUpScreen;
