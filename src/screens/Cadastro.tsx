import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Cadastro = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCadastro = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert('Usuário cadastrado com sucesso!');
        navigation.navigate('Login');
      })
      .catch((error) => {
        Alert.alert('Erro ao realizar cadastro:', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Cadastrar" onPress={handleCadastro} />
      <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>
        Já tem uma conta? Faça login aqui
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '50%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  linkText: {
    color: '#6200ea',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default Cadastro;
