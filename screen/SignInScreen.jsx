import React, {useReducer, useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Loading from '../component/Loading';
import ModalPopUp from '../component/ModalPopUp';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { postLogin, selectUser } from '../redux/reducers/user';

const initialFormState = {
  email: '',
  password: '',
};

function SignInScreen() {
  const [formData, setFormData] = useReducer((state, event) => {
    return {...state, [event.name]: event.value};
  }, initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleChange = (val, name) => {
    setFormData({
      name: name,
      value: val,
    });
  };

  const handleSubmit = async () => {
    // try {
    //   const res = await axios.post(
    //     'http://192.168.1.57:3000/api/v1/auth/signin',
    //     JSON.stringify(formData),
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     },
    //   );
    //   console.log(res.data.data.token);
    //   if (res) {
    //     await AsyncStorage.setItem('token', res.data.data.token);
    //   }
    // } catch (error) {
    //   console.error(error.response.data.message);
    //   setErrorMessage(error.response.data.message);
    // }
    await dispatch(postLogin(formData));
  };

  useEffect(()=>{
    if(user.status === 'success'){
      console.log("berhasil berhasil ")
      console.log(user)
      setModalVisible(true);
      setErrorMessage(null);
      setTimeout(() => {
        navigation.navigate('Home');
      }, 1000);
    }
    else if(user.status === 'failed'){
      setModalVisible(true);
      setErrorMessage(user.message);
    }
  }, [navigation, user]);

  const navigation = useNavigation();

  return (
    <SafeAreaView style={style.container}>
      <Image
        style={style.logo}
        source={require('../media/images/toyota.png')}
      />
      <Feather
        onPress={() => {
          navigation.navigate('Home');
        }}
        style={style.back}
        name="x"
        size={50}
      />
      <Text style={style.title}>Sign In</Text>
      <KeyboardAvoidingView style={{width: '80%'}}>
        <Text style={style.fieldTitle}>Email*</Text>
        <TextInput
          style={style.field}
          onChangeText={text => handleChange(text, 'email')}
          placeholder="Contoh: JohnDoe@gmail.com"
        />
        <Text style={style.fieldTitle}>Password</Text>
        <TextInput
          style={style.field}
          secureTextEntry={true}
          onChangeText={text => handleChange(text, 'password')}
          placeholder="6+ Character"
        />
        <Button color="green" title="Sign In" onPress={handleSubmit} />
        <Text
          style={{
            marginTop: 10,
            marginBottom: 10,
            fontSize: 14,
            textAlign: 'center',
          }}>
          Don't have an account?{' '}
          <Text
            style={style.link}
            onPress={() => navigation.navigate('SignUp')}>
            {' '}
            Sign Up Here
          </Text>
        </Text>
      </KeyboardAvoidingView>
      <Loading visible={isLoading} />
      <ModalPopUp visible={modalVisible}>
        <View style={style.modalContainer}>
          {errorMessage ? (
            <>
              <Feather name="x-circle" size={32} />
              {Array.isArray(errorMessage) ? (
                errorMessage.map(error => {
                  return <Text style={style.modalText}>{error.message}</Text>;
                })
              ) : (
                <Text style={style.modalText}>{errorMessage}</Text>
              )}
            </>
          ) : (
            <>
              <Feather name="check-circle" size={32} />
              <Text style={style.modalText}>Sign In Success</Text>
            </>
          )}
        </View>
      </ModalPopUp>
    </SafeAreaView>
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
    marginVertical: 40,
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
