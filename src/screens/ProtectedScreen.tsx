/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Authcontext } from '../context/AuthContext';

export const ProtectedScreen = () => {

  const {user,token, logOut} = useContext(Authcontext);

  return (
      <View style={styles.container}>
        <Text style={styles.title} > ProtectedScreen </Text>
        <Button
          title="logout"
          color="#5856d6"
          onPress={ logOut }
        />

        <Text>
          {JSON.stringify(user, null,2)}
        </Text>
        <Text>
          {JSON.stringify(token, null,2)}
        </Text>
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      marginBottom: 20,
    },
});
