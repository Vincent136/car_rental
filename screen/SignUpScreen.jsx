import React, {useEffect, useReducer, useState} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import ModalPopUp from '../component/ModalPopUp';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import { postRegister, selectUser } from '../redux/reducer/user';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../component/Loading';


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
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(selectUser);

  const handleChange = (val, name) => {
    setFormData({
      name: name,
      value: val,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await dispatch(postRegister(formData));
    }catch (e) {
    }
    setIsLoading(false);

    // if (user.status == "success") {
    //   setModalVisible(true);
    //   setTimeout(() => {
    //     setModalVisible(false);
    //     dispatch(resetState());
    //     navigation.navigate('SignIn');
    //   }, 2000);
    // } else if (user.status == "failed") {
    //   setModalVisible(true);
    //   setTimeout(() => {
    //     setModalVisible(false);
    //     dispatch(resetState());
    //   }, 2000);
    // }
  };

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
      <Text style={style.title}>Sign Up</Text>
      <KeyboardAvoidingView style={{width: '80%'}}>
        <Text style={style.fieldTitle}>Name*</Text>
        <TextInput
          style={style.field}
          onChangeText={text => handleChange(text, 'fullname')}
          placeholder="Full Name"
        />
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
        <Button color="green" title="Sign Up" onPress={handleSubmit} />
        <Text
          style={{
            marginTop: 10,
            marginBottom: 10,
            fontSize: 14,
            textAlign: 'center',
          }}>
          Already have an account?
          <Text
            style={style.link}
            onPress={() => navigation.navigate('SignIn')}>
            {' '}
            Sign In Here
          </Text>
        </Text>
      </KeyboardAvoidingView>
      <Loading visible={isLoading} />
      <ModalPopUp visible={modalVisible}>
        <View style={style.modalContainer}>
          {user.status == 'failed' ? (
            <>
              <Feather name="x-circle" size={32} />
              {Array.isArray(user.message) ? (
                user.message.map(error => {
                  return <Text style={style.modalText}>{error}</Text>;
                })
              ) : (
                <Text style={style.modalText}>{user.message}</Text>
              )}
            </>
          ) : (
            <>
              <Feather name="check-circle" size={32} />
              <Text style={style.modalText}>Sign Up Success</Text>
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
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignUpScreen;
