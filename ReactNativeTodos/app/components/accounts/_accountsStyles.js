import React, {
  StyleSheet,
  PixelRatio,
} from 'react-native';

let device = require('Dimensions').get('window');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#d2edf4'
  },
  headerText: {
    fontSize: 30,
    marginBottom: 30,
    marginTop: 30,
    fontWeight: '200',
    color: '#1c3f53'
  },
  input: {
    width: device.width - 40,
    height: 50,
    alignSelf: 'center',
    paddingHorizontal: 10,
    marginBottom: 2,
    backgroundColor: '#ffffff'
  },
  button: {
    width: device.width - 40,
    // height: 40,
    backgroundColor: '#2cc5d2',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 18
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18
  },
  error: {
    color: 'red',
    marginTop: 10
  }
});
