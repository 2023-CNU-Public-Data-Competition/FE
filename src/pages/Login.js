import { useNavigation, useRoute } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Chip, Divider } from "@react-native-material/core";
import NavigationBar from "../components/NavigationBar";
import { StatusBar } from "expo-status-bar";
import { request } from '../api';



export default function Login(){
  const navigation = useNavigation();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  
  const onChangeId = inputId => setId(inputId);
  const onChangePw = inputPw => setPw(inputPw);
  console.log(id)
  console.log(pw)
  const login = async () => {
    const res = await request(`/auth/login`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
          id: "test4",
          password: "1234"
      })
    });
    console.log('login')
    console.log(res)
  };

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>CNU 똑똑이</Text>
      </View>
      <View style={styles.loginForm}>
        <TextInput
          onChangeText={onChangeId}
          //onSubmitEditing={addTodo}
          value={id}
          placeholder={"아이디"} 
          style={styles.input}
        />
        <TextInput
          onChangeText={onChangePw}
          //onSubmitEditing={addTodo}
          value={pw}
          placeholder={"비밀번호"} 
          style={styles.input}
        />
        <Button 
          title="로그인"
          onPress={login}
        />
      </View>
      <View style={styles.goSignUp}>
        <Button 
          title="회원가입"
          onPress={() => navigation.navigate("SignUp")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  logo: {
    fontSize: 30
  },
  loginForm: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor:"white",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    marginVertical: 20,
    fontSize: 18,
    borderWidth: 1,
    width: 350
  },
  goSignUp: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 50
  }
})