import { cityConfig }

  from '../data/cityConfig';
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  interpolate,
  FadeInUp
} from 'react-native-reanimated';
export default function CategorySelection() {
  const { city, marketplace } = useLocalSearchParams();
  // const { city } = useLocalSearchParams();
  const headingOpacity = useSharedValue(0);
  const cardsOpacity = useSharedValue(0);
  const float1 = useSharedValue(-1);
  const float2 = useSharedValue(1);
  const headingScale = useSharedValue(0.9);
  useEffect(() => {
    // Heading animation
    headingOpacity.value = withTiming(
      1,
      {
        duration: 1200,
      }
    );
    headingScale.value = withTiming(
      1,
      {
        duration: 1200,
      }
    );
    // Cards animation
    cardsOpacity.value = withTiming(
      1,
      {
        duration: 1800,
      }
    );
    // Blob 1
    float1.value = withRepeat(
      withSequence(
        withTiming(
          1,
          { duration: 5000 }
        ),
        withTiming(
          -1,
          { duration: 5000 }
        )
      ),
      -1,
      true
    );
    // Blob 2
    float2.value = withRepeat(
      withSequence(
        withTiming(
          -1,
          { duration: 6500 }
        ),
        withTiming(
          1,
          { duration: 6500 }
        )
      ),
      -1,
      true
    );
  }, []);

  // Heading animation
  const headingStyle = useAnimatedStyle(() => ({
    opacity: headingOpacity.value,
    transform: [
      {
        translateY: interpolate(
          headingOpacity.value,
          [0, 1],
          [35, 0]
        ),
      },
      {
        scale: headingScale.value,
      },
    ],
  }));

  // Cards animation
  const cardsStyle = useAnimatedStyle(() => ({
    opacity: cardsOpacity.value,
    transform: [
      {
        translateY: interpolate(
          cardsOpacity.value,
          [0, 1],
          [40, 0]
        ),
      },
    ],
  }));

  // Blob 1
  const blob1Style = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          float1.value,
          [-1, 1],
          [-18, 18]
        ),
      },
    ],
  }));

  // Blob 2
  const blob2Style = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          float2.value,
          [-1, 1],
          [18, -18]
        ),
      },
    ],
  }));

  const allCategories = [
    {
      name: 'Clothes',
      image: require('../../assets/categories/cloths.png')
    },
    {
      name: 'Shoes',
      image: require('../../assets/categories/shoes.png')
    },
    {
      name: 'Medical',
      image: require('../../assets/categories/medical.png')
    },
    {
      name: 'Electronics',
      image: require('../../assets/categories/electronics.png')
    },

    {
      name: 'Grocery',
      image: require('../../assets/categories/grocery.png')
    },
    {
      name: 'Beauty',
      image: require('../../assets/categories/beauty.png')
    },
    {
      name: 'Gym',
      image: require('../../assets/categories/gym.png')
    },
    {
      name: 'Books',
      image: require('../../assets/categories/books.png')
    },
    {
      name: 'Home Decor',
      image: require('../../assets/categories/homedecor.png')
    },
    {
      name: 'Toys',
      image: require('../../assets/categories/toys.png')
    },
    {
      name: 'Pet Care',
      image: require('../../assets/categories/petcare.png')
    },
    {
      name: 'Jewellery',
      image: require('../../assets/categories/jewellery.png')
    },
    {
      name: 'Gifts',
      image: require('../../assets/categories/gift.png')
    },
    {
      name: 'Hardware',
      image: require('../../assets/categories/hardware.png')
    },
  ];

  const categoryImages = Object.fromEntries(
    allCategories.map(item => [
      item.name,
      item.image,
    ])
  );

  const selectedCity =
    String(city) as keyof typeof cityConfig;

  const selectedCityData =
    cityConfig[selectedCity];

  const categories =
    selectedCityData.categories[
    String(marketplace) as keyof typeof selectedCityData.categories
    ] as string[];

  const goToShops = (
    category: string
  ) => {
    router.push({
      pathname: '/shop-selection',
      params: {
        city,
        marketplace,
        category,
      },
    });
  };

  return (

    <ScrollView
      contentContainerStyle={styles.container}
    >
      <Animated.View
        style={[styles.blob1, blob1Style]}
      />
      <Animated.View
        style={[styles.blob2, blob2Style]}
      />
      <Animated.Text
        style={[styles.cityTitle, headingStyle]}
      >
        📍 {city}
      </Animated.Text>
      <Text style={styles.marketplaceTitle}>
        🛍 {marketplace}
      </Text>
      <Text style={styles.heading}>
        What would you like to buy today?
      </Text>
      <Text style={styles.subHeading}>
        Choose a category
      </Text>
      <Animated.View
        style={[styles.grid, cardsStyle]}
      >
        {categories.map(
          (item: string, index: number) => (
            <Animated.View
              key={item}
              entering={
                FadeInUp
                  .delay(index * 120)
                  .duration(900)
                  .springify()
              }
              style={styles.cardWrapper}
            >
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  goToShops(item)
                }
              >
                <Image
                  source={categoryImages[item]}
                  style={styles.image}
                />
                <Text style={styles.cardText}>
                  {item}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
      </Animated.View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    padding: 30,
  },
  blob1: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#E5E7EB',
    top: 50,
    left: -80,
    opacity: 0.5,
  },
  blob2: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#D1D5DB',
    bottom: 50,
    right: -100,
    opacity: 0.4,
  },
  marketplaceTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#555',
    marginBottom: 12,
  },
  cityTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#111827',
    marginTop: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 20,
    color: '#111827',
  },
  subHeading: {
    fontSize: 18,
    color: '#6B7280',
    marginTop: 10,
    marginBottom: 35,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  cardWrapper: {
    width: '31%',
    marginBottom: 25,
  },
  image: {
    width: '100%',
    height: 130,
  },
  cardText: {
    padding: 15,
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    color: '#111827',
  },
}); 