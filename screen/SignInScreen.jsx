import React, {useReducer} from 'react';
import {KeyboardAvoidingView, View, Image, Text, StyleSheet, TextInput, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

const initialFormState = {
  email: '',
  password: '',
};

function SignInScreen() {
  const [formData, setFormData] = useReducer((state, event) => {
    return {...state, [event.name]: event.value};
  }, initialFormState);

    const handleChange = (val, name) => {
        setFormData({
            name: name,
            value: val,
        });
    }

    const navigation = useNavigation();

  return (
    <View style={style.container}>
        <Image style={style.logo} source={require('../media/images/toyota.png')}/>
        <Feather onPress={() => {navigation.navigate("Home")}} style={style.back}  name="x" size={50}/>
      <Text style={style.title}>Sign In</Text>
      <KeyboardAvoidingView style={{width: '80%'}}>
        <Text style={style.fieldTitle}>Email*</Text>
        <TextInput style={style.field} onChangeText={(text) => handleChange(text, 'email')} placeholder='Contoh: JohnDoe@gmail.com'/>
        <Text style={style.fieldTitle}>Password</Text>
        <TextInput style={style.field} secureTextEntry={true} onChangeText={(text) => handleChange(text, 'password')} placeholder='6+ Character'/>
        <Button color="green" title="Sign In" />
        <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 14, textAlign: 'center'}}>Don't have an account? <Text style={style.link} onPress={() => navigation.navigate("SignUp")}> Sign Up Here</Text></Text>
      </KeyboardAvoidingView>
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
});

export default SignInScreen;
