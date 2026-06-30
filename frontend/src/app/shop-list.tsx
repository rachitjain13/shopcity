import { router } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function ShopList() {
  const shops = [
    'Fashion Hub',
    'Style Point',
    'Royal Wear',
    'Denim Store',
    'Urban Fashion',
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Clothing Shops</Text>

      {shops.map((shop, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => router.push('/shop-details')}
        >
          <Text style={styles.shopName}>{shop}</Text>
          <Text style={styles.shopText}>
            Premium clothing collection
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
    padding: 20,
  },

  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#172554',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },

  shopName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  shopText: {
    color: '#CBD5E1',
    marginTop: 5,
  },
});