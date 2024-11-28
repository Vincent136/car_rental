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
import { useDispatch, useSelector } from 'react-redux';
import { postLogin, selectUser, setStateByName, resetState } from '../redux/reducer/user';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '701286461281-bssu8kfi1lk3bkhb0cs5499irj533gg9.apps.googleusercontent.com',
});


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
    await dispatch(postLogin(formData));
  };

  async function onGoogleButtonPress() {
    console.log('function in');
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Get the users ID token
    try {
      const signInResult = await GoogleSignin.signIn();
      console.log('sign in success', signInResult);
    } catch (error) {
      console.error('Google sign-in failed', error);
    }
  
    // Try the new style of google-sign in result, from v13+ of that module
    idToken = signInResult.data?.idToken;
    if (!idToken) {
      // if you are using older versions of google-signin, try old style result
      idToken = signInResult.idToken;
    }
    if (!idToken) {
      throw new Error('No ID token found');
    }
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(signInResult.data.token);
    console.log(googleCredential);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  useEffect(() => {

    if (user.status === 'success') {
      setModalVisible(true);
      setErrorMessage(null);
      setTimeout(() => {
        setModalVisible(false);
        dispatch(setStateByName({
          name: 'status',
          value: 'idle',
        }));
        navigation.navigate('Tabs', { screen: 'Profile' });
      }, 1000);
    } else if (user.status === 'failed') {
      setModalVisible(true);
      setErrorMessage(user.message);
      setTimeout(() => {
        setModalVisible(false);
        dispatch(resetState());
      }, 2000);
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
        <Button
          title="Google Sign-In"
          onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
        />
      </KeyboardAvoidingView>
      <Loading visible={isLoading} />
      
      <ModalPopUp visible={modalVisible}>
        <View style={style.modalContainer}>
          {errorMessage ? (
            <>
              <Feather name="x-circle" size={32} />
              {Array.isArray(errorMessage) ? (
                errorMessage.map(error => {
                  return <Text key={error} style={style.modalText}>{error.message}</Text>;
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
