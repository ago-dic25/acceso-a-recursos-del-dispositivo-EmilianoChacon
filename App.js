import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
  FlatList, Alert, Image, Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

import { estiloTextos, styles } from './misEstilos';

export default function App() {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useStatse('');
  const [contador, setContador] = useState(0);
  const [listaNombres, setListaNombres] = useState([]);
  const [imagen, setImagen] = useState(null);


  const abrirCamara = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita acceso a la cámara para tomar fotos.');
      return;
    }


    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      base64: false,
    });

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
      Alert.alert('Éxito', 'Foto tomada correctamente.');
    }
  };

  const abrirGaleria = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita acceso a la galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: false,
    });

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
      Alert.alert('Éxito', 'Imagen seleccionada correctamente.');
    }
  };

  const guardarImagen = async () => {
    if (!imagen) return;
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync(true);
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'No se puede guardar sin permisos.');
        return;
      }

      await MediaLibrary.saveToLibraryAsync(imagen);
      Alert.alert('Guardado', 'La imagen se guardó en tu galería 📸');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'No se pudo guardar la imagen.');
    }
  };

  const onImagenPress = () => {
    Alert.alert(
      'Guardar Imagen',
      '¿Quieres guardar esta foto en tu galería?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Guardar', onPress: guardarImagen },
      ],
      { cancelable: true }
    );
  };

  const mostrarMensaje = () => {
    if (nombre.trim() === '') {
      setMensaje('Por favor escribe tu nombre antes de continuar.');
    } else {
      setMensaje(`Hola, ${nombre.trim()}!`);
    }
  };

  const agregarNombre = () => {
    const nombreTrimmed = nombre.trim();
    if (nombreTrimmed === '') {
      setMensaje('Escribe un nombre para poder agregarlo.');
      return;
    }
    if (listaNombres.includes(nombreTrimmed)) {
      setMensaje(`'${nombreTrimmed}' ya existe en la lista.`);
      return;
    }
    setListaNombres([...listaNombres, nombreTrimmed]);
    setNombre('');
    setMensaje(`'${nombreTrimmed}' fue agregado a la lista.`);
  };

  const limpiarCampos = () => {
    setNombre('');
    setMensaje('');
    setContador(0);
    setListaNombres([]);
    setImagen(null);
  };

  const incrementarContador = () => setContador(contador + 1);

  const handleDeleteConfirmation = (nombreParaBorrar) => {
    Alert.alert(
      'Eliminar Nombre',
      `¿Estás seguro de que quieres eliminar a "${nombreParaBorrar}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: () => {
            setListaNombres(prev => prev.filter(nombre => nombre !== nombreParaBorrar));
            setMensaje(`'${nombreParaBorrar}' fue eliminado de la lista.`);
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const emoji =
    nombre.trim().length === 0 ? '🙂' :
    nombre.trim().length < 5 ? '😄' :
    nombre.trim().length < 8 ? '😃' :
    nombre.trim().length < 15 ? '😁' :
    '🤩';

  return (
    <View style={styles.container}>
      <Text style={estiloTextos.texto}>Escribe tu nombre:</Text>

      <TextInput
        style={styles.input}
        placeholder="Tu nombre aquí"
        placeholderTextColor="#b8b8b8"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.contador}>Caracteres: {nombre.trim().length}</Text>
      <Text style={styles.emoji}>{emoji}</Text>

      <View style={styles.botones}>
        <TouchableOpacity style={styles.btnPrimario} onPress={mostrarMensaje}>
          <Text style={styles.btnTexto}>Mostrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnCuaternario} onPress={agregarNombre}>
          <Text style={styles.btnTexto}>Agregar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSecundario} onPress={limpiarCampos}>
          <Text style={styles.btnTexto}>Limpiar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.mensaje}>{mensaje}</Text>

      <View style={styles.contadorBtnContainer}>
        <TouchableOpacity style={styles.btnTerciario} onPress={incrementarContador}>
          <Text style={styles.btnTexto}>Contador</Text>
        </TouchableOpacity>
        <Text style={styles.contadorTexto}>{contador}</Text>
      </View>

      {/*  Botones para cámara y galería */}
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity style={styles.btnCamara} onPress={abrirCamara}>
          <Text style={styles.btnTexto}>Abrir Cámara</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnCamara} onPress={abrirGaleria}>
          <Text style={styles.btnTexto}>Abrir Galería</Text>
        </TouchableOpacity>
      </View>

      {/* Mostrar la imagen tomada */}
      {imagen && (
        <TouchableOpacity onPress={onImagenPress}>
          <Image source={{ uri: imagen }} style={styles.imagen} />
        </TouchableOpacity>
      )}

      <FlatList
        style={styles.lista}
        data={listaNombres}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleDeleteConfirmation(item)}>
            <Text style={styles.listaItem}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={() => (
          listaNombres.length > 0 && <Text style={styles.listaTitulo}>Nombres agregados:</Text>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}


