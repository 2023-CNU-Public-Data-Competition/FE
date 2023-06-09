import { StatusBar } from "expo-status-bar";
import { View, Button, StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useState, useEffect } from 'react';
import { Chip, Divider } from "@react-native-material/core";
import { useNavigation, useRoute } from '@react-navigation/native';
import NavigationBar from "../components/NavigationBar";
import PostPreview from "../components/postPreview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { request } from "../api";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function NotificationList() {
  const navigation = useNavigation();
  const route = useRoute();

  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    const fetchNotification = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if(userData){
        const userId = JSON.parse(userData).userId;
        const token = JSON.parse(userData).token;
        const res = await request('/alarms', {
          headers: {
            Authorization: token
          }
        });
        setNotifications(res);
      }
    };

    fetchNotification();
    navigation.setOptions({
      headerLeft: () => (
        <View style={{marginLeft: 10}}>
          <Icon 
          name="arrow-left"
          color="#4469C0"
          size={30}
          onPress={() => navigation.navigate('PostList')}
        />
        </View>
      ),
      headerRight: () => (
        <Button
          title="편집"
          //onPress={() => navigation.navigate('PostList')}
        />
      ),
    });
  }, [navigation]);

  const renderItem = ({ item }) => {
    return <PostPreview item={item} />
  }

  return (
    <View style={styles.container}>
      <View>
          <FlatList
            data={notifications}
            renderItem={renderItem}
            keyExtractor={item => item.articleNo}
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10 
  },
  
})