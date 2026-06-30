import { router } from 'expo-router';
import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  interpolate,
} from 'react-native-reanimated';

export default function RoleSelection() {
  const headingOpacity = useSharedValue(0);
  const leftCardOpacity = useSharedValue(0);
  const rightCardOpacity = useSharedValue(0);

  const float1 = useSharedValue(-1);
  const float2 = useSharedValue(1);

  useEffect(() => {
    headingOpacity.value = withTiming(1, {
      duration: 1000,
    });

    leftCardOpacity.value = withTiming(1, {
      duration: 1400,
    });

    rightCardOpacity.value = withTiming(1, {
      duration: 1800,
    });

    float1.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000 }),
        withTiming(-1, { duration: 3000 })
      ),
      -1,
      true
    );

    float2.value = withRepeat(
      withSequence(
        withTiming(-1, { duration: 4000 }),
        withTiming(1, { duration: 4000 })
      ),
      -1,
      true
    );
  }, []);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: headingOpacity.value,
    transform: [
      {
        translateY: interpolate(
          headingOpacity.value,
          [0, 1],
          [40, 0]
        ),
      },
    ],
  }));

  const leftCardStyle = useAnimatedStyle(() => ({
    opacity: leftCardOpacity.value,
    transform: [
      {
        translateY: interpolate(
          leftCardOpacity.value,
          [0, 1],
          [50, 0]
        ),
      },
    ],
  }));

  const rightCardStyle = useAnimatedStyle(() => ({
    opacity: rightCardOpacity.value,
    transform: [
      {
        translateY: interpolate(
          rightCardOpacity.value,
          [0, 1],
          [50, 0]
        ),
      },
    ],
  }));

  const blob1Style = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          float1.value,
          [-1, 1],
          [-20, 20]
        ),
      },
    ],
  }));

  const blob2Style = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          float2.value,
          [-1, 1],
          [20, -20]
        ),
      },
    ],
  }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.View
        style={[styles.blob1, blob1Style]}
      />

      <Animated.View
        style={[styles.blob2, blob2Style]}
      />

      <Animated.Text
        style={[styles.title, titleStyle]}
      >
        Join the ShopCity Network
      </Animated.Text>

      <Text style={styles.subtitle}>
        Choose how you want to continue with ShopCity.
      </Text>

      <View style={styles.cardsContainer}>
        {/* Customer Card */}
        <Animated.View
          style={[styles.card, leftCardStyle]}
        >
          <Text style={styles.icon}></Text>

          <Text style={styles.cardTitle}>
            Customer
          </Text>

          <Text style={styles.cardDescription}>
            Discover local stores, compare products,
            chat with AI assistants and shop directly
            from trusted businesses in your city.
          </Text>

          <View style={styles.features}>
            <Text style={styles.feature}>
              • Search Nearby Shops
            </Text>

            <Text style={styles.feature}>
              • AI Shop Assistant
            </Text>

            <Text style={styles.feature}>
              • Video Call With Seller
            </Text>

            <Text style={styles.feature}>
              • Fast Local Delivery
            </Text>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/customer-dashboard')}
          >
            <Text style={styles.primaryButtonText}>
              Explore Stores
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Shopkeeper Card */}
        <Animated.View
          style={[styles.card, rightCardStyle]}
        >
          <Text style={styles.icon}></Text>

          <Text style={styles.cardTitle}>
            Shopkeeper
          </Text>

          <Text style={styles.cardDescription}>
            Create your digital store, upload
            products, manage orders and grow
            your local business.
          </Text>

          <View style={styles.features}>
            <Text style={styles.feature}>
              • Create Your Store
            </Text>

            <Text style={styles.feature}>
              • Manage Products
            </Text>

            <Text style={styles.feature}>
              • Handle Orders
            </Text>

            <Text style={styles.feature}>
              • Increase Sales
            </Text>
          </View>

          <TouchableOpacity

style={styles.primaryButton}

onPress={()=>

router.push('/feature-not-available')

}
>
            <Text style={styles.primaryButtonText}>
              Launch Your Store
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    padding: 30,
    justifyContent: 'center',
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

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111827',
    marginTop: 15,
  },

  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 10,
    marginBottom: 50,
  },

  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    flexWrap: 'wrap',

    
  },

  card: {
    width: 400,
    minHeight: 450,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 30,

    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 5,
  },

  icon: {
    fontSize: 55,
    marginBottom: 15,
  },

  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 15,
  },

  cardDescription: {
    fontSize: 15,
    lineHeight: 28,
    color: '#4B5563',
    marginBottom: 25,
  },

  features: {
    marginBottom: 25,
  },

  feature: {
    fontSize: 15,
    color: '#374151',
    marginBottom: 12,
  },

  primaryButton: {
    backgroundColor: '#111827',
    paddingVertical: 18,
    borderRadius: 15,
    marginTop: 'auto',
  },

  primaryButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});