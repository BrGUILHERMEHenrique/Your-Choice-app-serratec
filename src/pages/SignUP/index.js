import React, {useState} from 'react'
import {Image, ActivityIndicator} from 'react-native';
import { useAuth } from '../../hooks/auth';

import { Container, Input, Button, ButtonText } from './styles';



const SignUp = () => {
    const { signUp } = useAuth();
  
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    async function handleSubmit() {
      if(!email) return;
      if(!password) return;
      
      setLoading(true);
  
      console.log("submit", email, password);
  
      try {
        await signUp({
          email: email,
          password: password,
        });
  
      } catch (error) {
        console.log(error);
        // console.log("Usuário ou senha não confere.");
  
      } finally {
        setLoading(false);
      }
    }
  
    return (
      <Container>

  
        <Input 
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="E-mail"
        />
  
        <Input 
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Senha"
          secureTextEntry={true}
        />
  
        <Button onPress={() => handleSubmit()} >
          { loading ? (
            <ActivityIndicator color="#fff" />
          ):(
            <ButtonText>Acessar</ButtonText>
          )}
        </Button>
  
      </Container>
    )
  }
  
  export default SignUp;