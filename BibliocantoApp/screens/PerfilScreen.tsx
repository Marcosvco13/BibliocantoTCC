import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

export default function UserProfileScreen() {
  const [nome, setNome] = useState('');
  const [apelido, setApelido] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    // Simulando a busca de dados do backend
    const carregarDados = async () => {
      // Substitua por chamada real à API
      const dadosDoUsuario = {
        nome: 'João da Silva',
        apelido: 'Joca',
        descricao: 'Desenvolvedor mobile com paixão por café.',
        dataNascimento: '15/08/1990'
      };

      setNome(dadosDoUsuario.nome);
      setApelido(dadosDoUsuario.apelido);
      setDescricao(dadosDoUsuario.descricao);
      setDataNascimento(dadosDoUsuario.dataNascimento);
    };

    carregarDados();
  }, []);

  const handleSalvar = () => {
    // Aqui você faria a chamada para salvar os dados no backend
    console.log('Dados atualizados:', { nome, apelido, descricao, dataNascimento });
    setEditando(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        editable={editando}
      />

      <Text style={styles.label}>Apelido</Text>
      <TextInput
        style={styles.input}
        value={apelido}
        onChangeText={setApelido}
        editable={editando}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={descricao}
        onChangeText={setDescricao}
        editable={editando}
        multiline
      />

      <Text style={styles.label}>Data de Nascimento</Text>
      <TextInput
        style={styles.input}
        value={dataNascimento}
        onChangeText={setDataNascimento}
        editable={editando}
        keyboardType="numeric"
      />

      {editando ? (
        <Button title="Salvar Alterações" onPress={handleSalvar} />
      ) : (
        <Button title="Editar Perfil" onPress={() => setEditando(true)} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    marginTop: 15,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});
