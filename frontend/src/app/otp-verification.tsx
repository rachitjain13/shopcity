import { router } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function OTPVerification() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>

      <Text style={styles.subtitle}>
        Enter the 6-digit OTP sent to your mobile
      </Text>

      <TextInput
        placeholder="Enter OTP"
        placeholderTextColor="#94A3B8"
        keyboardType="number-pad"
        style={styles.input}
      />

      <TouchableOpacity
  style={styles.button}
  onPress={() => router.push('/customer-dashboard')}
>
  <Text style={styles.buttonText}>
    Verify OTP
  </Text>
</TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.resend}>
          Resend OTP
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
    justifyContent: 'center',
    padding: 25,
  },

  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    color: '#CBD5E1',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 40,
  },

  input: {
    backgroundColor: '#172554',
    color: '#fff',
    padding: 18,
    borderRadius: 15,
    textAlign: 'center',
    fontSize: 22,
  },

  button: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 15,
    marginTop: 25,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  resend: {
    color: '#60A5FA',
    textAlign: 'center',
    marginTop: 25,
  },
});