import { StyleSheet } from 'react-native';

export const estiloTextos = StyleSheet.create({
  texto: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 50,
  },
  input: {
    backgroundColor: '#ffffff',
    width: '90%',
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    shadowColor: '#aaa',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  botones: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 15,
  },
  btnPrimario: {
    backgroundColor: '#A5DEE5',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  btnSecundario: {
    backgroundColor: '#FBC4AB',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  btnTerciario: {
    backgroundColor: '#C5E1A5',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  btnCuaternario: {
    backgroundColor: '#D8BFD8',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  btnCamara: {
    backgroundColor: '#AEDFF7',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginTop: 10,
  },
  btnTexto: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  mensaje: {
    color: '#333',
    fontSize: 18,
    marginTop: 15,
    textAlign: 'center',
    height: 40,
  },
  contador: {
    color: '#7A7A7A',
    fontSize: 14,
  },
  emoji: {
    fontSize: 40,
    marginVertical: 5,
  },
  contadorBtnContainer: {
    alignItems: 'center',
    marginVertical: 15,
    gap: 10,
  },
  contadorTexto: {
    color: '#333',
    fontSize: 16,
  },
  lista: {
    width: '90%',
    marginTop: 10,
  },
  listaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  listaItem: {
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    color: '#555',
  },
  imagen: {
    width: 250,
    height: 200,
    marginTop: 15,
    borderRadius: 15,
  },
});
