import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig'; 

const Consumo = ({ navigation }: any) => {
  const [competencia, setCompetencia] = useState('');
  const [consumo, setConsumo] = useState('');

  const handleSalvar = async () => {
    if (!competencia || !consumo) {
      Alert.alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      await addDoc(collection(db, 'consumos'), {
        competencia,
        consumo: parseFloat(consumo), 
        timestamp: new Date(), 
      });
      Alert.alert('Consumo registrado com sucesso!');
      setCompetencia('');
      setConsumo('');
      navigation.navigate('AcompanhamentoConsumo'); 
    } catch (error) {
      Alert.alert('Erro ao salvar o consumo:', (error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Competência (mm/yyyy)"
        value={competencia}
        onChangeText={(text) => setCompetencia(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Consumo (kWh)"
        value={consumo}
        onChangeText={(text) => setConsumo(text)}
        keyboardType="numeric"
      />
      <Button title="Salvar Consumo" onPress={handleSalvar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});

export default Consumo;
