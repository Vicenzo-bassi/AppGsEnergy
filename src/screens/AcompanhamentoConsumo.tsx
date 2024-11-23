import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../services/firebaseConfig'; 

const AcompanhamentoConsumo = () => {
  const [consumos, setConsumos] = useState<any[]>([]);

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

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Text>{`${item.competencia} | ${item.consumo} kWh`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={consumos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Nenhum consumo registrado.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default AcompanhamentoConsumo;
