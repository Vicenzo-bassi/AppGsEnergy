import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../services/firebaseConfig'; 

const EdicaoConsumos = () => {
  const [consumos, setConsumos] = useState<any[]>([]);
  const [selectedConsumo, setSelectedConsumo] = useState<any | null>(null);
  const [competencia, setCompetencia] = useState('');
  const [consumo, setConsumo] = useState('');

  // Busca os consumos do Firestore
  useEffect(() => {
    const fetchConsumos = async () => {
      try {
        const q = query(collection(db, 'consumos'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedConsumos: any[] = [];
        querySnapshot.forEach((doc) => {
          fetchedConsumos.push({ id: doc.id, ...doc.data() });
        });
        setConsumos(fetchedConsumos);
      } catch (error) {
        console.error('Erro ao buscar os consumos:', error);
      }
    };

    fetchConsumos();
  }, []);

  //seleção de um consumo para edição
  const handleSelectConsumo = (consumo: any) => {
    setSelectedConsumo(consumo);
    setCompetencia(consumo.competencia);
    setConsumo(String(consumo.consumo));
  };

  // Atualiza o consumo no Firestore
  const handleUpdateConsumo = async () => {
    if (!competencia || !consumo) {
      Alert.alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const docRef = doc(db, 'consumos', selectedConsumo.id);
      await updateDoc(docRef, {
        competencia,
        consumo: parseFloat(consumo),
      });
      Alert.alert('Consumo atualizado com sucesso!');
      setCompetencia('');
      setConsumo('');
      setSelectedConsumo(null);
      // Atualiza a lista após a edição
      setConsumos((prev) =>
        prev.map((item) =>
          item.id === selectedConsumo.id
            ? { ...item, competencia, consumo: parseFloat(consumo) }
            : item
        )
      );
    } catch (error) {
    Alert.alert('Erro ao atualizar o consumo:', (error as Error).message);
    }
  };

  // Exclui o consumo no Firestore
  const handleDeleteConsumo = async (id: string) => {
    try {
      const docRef = doc(db, 'consumos', id);
      await deleteDoc(docRef);
      Alert.alert('Consumo excluído com sucesso!');
      // Atualiza a lista após exclusão
      setConsumos((prev) => prev.filter((item) => item.id !== id));
      if (selectedConsumo?.id === id) {
        setSelectedConsumo(null);
        setCompetencia('');
        setConsumo('');
      }
    } catch (error) {
      Alert.alert('Erro ao excluir o consumo:', (error as Error).message);
    }
  };

  // Renderiza um item da lista
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Text>{`${item.competencia} | ${item.consumo} kWh`}</Text>
      <TouchableOpacity onPress={() => handleSelectConsumo(item)}>
        <Text style={styles.editButton}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteConsumo(item.id)}>
        <Text style={styles.deleteButton}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {selectedConsumo ? (
        <View style={styles.editContainer}>
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
          <Button title="Salvar Alterações" onPress={handleUpdateConsumo} />
          <Button
            title="Cancelar"
            color="red"
            onPress={() => {
              setSelectedConsumo(null);
              setCompetencia('');
              setConsumo('');
            }}
          />
        </View>
      ) : (
        <FlatList
          data={consumos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={<Text>Nenhum consumo registrado.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  editButton: {
    color: 'blue',
    marginRight: 10,
  },
  deleteButton: {
    color: 'red',
  },
  editContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default EdicaoConsumos;
