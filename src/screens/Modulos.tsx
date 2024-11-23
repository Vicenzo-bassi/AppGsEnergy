import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Modulos = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      {/* Botão para o Módulo 1 */}
      <TouchableOpacity
        style={styles.moduleBox}
        onPress={() => navigation.navigate("Consumo")}
      >
        <Text style={styles.moduleText}>Consumo</Text>
      </TouchableOpacity>

      {/* Botão para o Módulo 2 */}
      <TouchableOpacity
        style={styles.moduleBox}
        onPress={() => navigation.navigate("AcompanhamentoConsumo")}
      >
        <Text style={styles.moduleText}>Acompanhamento de Consumo</Text>
      </TouchableOpacity>

      {/* Botão para o Módulo 3 */}
      <TouchableOpacity
        style={styles.moduleBox}
        onPress={() => navigation.navigate("EdicaoConsumos")}
      >
        <Text style={styles.moduleText}>Edit Consumo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#f8f8f8", 
  },
  moduleBox: {
    width: 200, 
    height: 100, 
    backgroundColor: "#007BFF", 
    borderRadius: 10, 
    justifyContent: "center", 
    alignItems: "center", 
    marginBottom: 20, 
  },
  moduleText: {
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold", 
    textAlign: "center", 
  },
});

export default Modulos;
