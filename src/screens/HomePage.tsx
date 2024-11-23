import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HomePage = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Button
        title="Ir para Login"
        onPress={() => navigation.navigate('LoginScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default HomePage;
