import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  interpolate,
} from 'react-native-reanimated';

export default function CustomerLogin() {
 const handleLogin = async () => {
  try {
    setLoading(true);

    const response = await fetch(
      'http://localhost:5000/api/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    if (data.success) {
      router.push('/customer-dashboard');
    } else {
      alert(data.message);
    }

  } catch (error) {
    console.log(error);
    alert('Login Failed');
  } finally {
    setLoading(false);
  }
};
  const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);
  const headingOpacity = useSharedValue(0);
  const formOpacity = useSharedValue(0);
  const cardOpacity = useSharedValue(0);

  const float1 = useSharedValue(-1);
  const float2 = useSharedValue(1);

  useEffect(() => {
    headingOpacity.value = withTiming(1, {
      duration: 1000,
    });

    formOpacity.value = withTiming(1, {
      duration: 1500,
    });

    cardOpacity.value = withTiming(1, {
      duration: 2000,
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

  const headingStyle = useAnimatedStyle(() => ({
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

  const formStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [
      {
        translateY: interpolate(
          formOpacity.value,
          [0, 1],
          [30, 0]
        ),
      },
    ],
  }));

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [
      {
        translateY: interpolate(
          cardOpacity.value,
          [0, 1],
          [30, 0]
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
    <View style={styles.container}>

      <Animated.View
        style={[styles.blob1, blob1Style]}
      />

      <Animated.View
        style={[styles.blob2, blob2Style]}
      />

      {/* LEFT SIDE */}

      <View style={styles.leftSection}>

        <Text style={styles.logo}>
          SHOPCITY
        </Text>

        <Animated.Text
          style={[styles.heading, headingStyle]}
        >
          Your City's Marketplace
        </Animated.Text>

        <Animated.Text
          style={[styles.subHeading, headingStyle]}
        >
          Discover local stores, connect directly with
          shopkeepers, compare products and enjoy
          smarter local shopping.
        </Animated.Text>

        <Animated.View style={formStyle}>

          <TextInput
  placeholder="Email or Mobile Number"
  placeholderTextColor="#6B7280"
  style={styles.input}
  value={email}
  onChangeText={setEmail}
/>

          <TextInput
  placeholder="Password"
  placeholderTextColor="#6B7280"
  secureTextEntry
  style={styles.input}
  value={password}
  onChangeText={setPassword}
/>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>
              Enter ShopCity
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.link}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              router.push('/customer-signup' as any)
            }
          >
            <Text style={styles.signupLink}>
              Don't have an account? Create Account
            </Text>
          </TouchableOpacity>

        </Animated.View>

      </View>

      {/* RIGHT SIDE */}

      <Animated.View
        style={[styles.rightSection, cardStyle]}
      >

        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>
            AI Assistant
          </Text>

          <Text style={styles.featureText}>
            Smart product recommendations.
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>
            Video Shopping
          </Text>

          <Text style={styles.featureText}>
            Connect directly with shop owners.
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>
            Fast Delivery
          </Text>

          <Text style={styles.featureText}>
            Quick delivery from nearby stores.
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>
            Local Stores
          </Text>

          <Text style={styles.featureText}>
            Explore trusted shops in your city.
          </Text>
        </View>

      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC',
    flexDirection: 'row',
    paddingHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  leftSection: {
    width: '55%',
  },

  rightSection: {
    width: '28%',
  },

  logo: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 4,
    color: '#111827',
    marginBottom: 20,
  },

  heading: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 15,
  },

  subHeading: {
    fontSize: 18,
    color: '#6B7280',
    lineHeight: 28,
    marginBottom: 40,
    maxWidth: 550,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#7f7f8f',
    borderRadius: 14,
    padding: 18,
    marginBottom: 15,

    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 5,
  },

  loginButton: {
    backgroundColor: '#111827',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,

    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 5,
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  link: {
    textAlign: 'center',
    color: '#374151',
    marginTop: 18,
  },

  signupLink: {
    textAlign: 'center',
    color: '#111827',
    marginTop: 18,
    fontWeight: '600',
  },

  featureCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },

  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },

  featureText: {
    color: '#6B7280',
    lineHeight: 22,
  },

  blob1: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(0,0,0,0.03)',
    top: -50,
    right: -50,
  },

  blob2: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(0,0,0,0.04)',
    bottom: -30,
    left: -30,
  },
});