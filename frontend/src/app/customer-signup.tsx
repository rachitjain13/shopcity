import { router } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function CustomerSignup() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#94A3B8"
        style={styles.input}
      />

      <TextInput
        placeholder="Mobile Number"
        placeholderTextColor="#94A3B8"
        style={styles.input}
      />

      <TextInput
        placeholder="Email Address"
        placeholderTextColor="#94A3B8"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#94A3B8"
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#94A3B8"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
  style={styles.button}
  onPress={() => router.push('/otp-verification')}
>
  <Text style={styles.buttonText}>
    Create Account
  </Text>
</TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
    padding: 25,
  },

  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 30,
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#172554',
    color: '#fff',
    padding: 16,
    borderRadius: 15,
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 40,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});