import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  interpolate,
} from 'react-native-reanimated';
import { cityData }

  from '../data/cityData';

export default function CustomerDashboard() {

  const [city, setCity] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);

  // animations
  const headingOpacity = useSharedValue(0);
  const searchOpacity = useSharedValue(0);
  const chipsOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);
  const citiesOpacity = useSharedValue(0);
  const float1 = useSharedValue(-1);
  const float2 = useSharedValue(1);
  // animations start

  useEffect(() => {
    headingOpacity.value = withTiming(
      1,
      { duration: 800 }
    );
    searchOpacity.value = withTiming(
      1,
      { duration: 1200 }
    );
    chipsOpacity.value = withTiming(
      1,
      { duration: 1600 }
    );
    buttonOpacity.value = withTiming(
      1,
      { duration: 2000 }
    );
    citiesOpacity.value = withTiming(
      1,
      { duration: 2400 }
    );

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
  }, [])

  const filteredCities = cityData.filter(

    (item) =>

      item.name

        .toLowerCase()

        .includes(

          city.toLowerCase()

        )

  );  // LOCATION
  const getCurrentLocation = async () => {
    try {
      const { status } =
        await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Location permission denied');
        return;
      }
      const location =
        await Location.getCurrentPositionAsync({});
      const address =
        await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      if (address.length > 0) {
        const detectedCity =
          address[0].city ||
          address[0].district ||
          'Unknown City';

        const cityExists = cityData.some(

          (item) =>

            item.name === detectedCity

        );

        if (cityExists) {

          router.push({

            pathname: '/market-place',

            params: {

              city: detectedCity,

            },

          });

        }

        else {

          router.push('/city-not-available' as any);

        }
      }
    }
    catch (error) {
      console.log(error);
    }
  };  // animated styles
  const headingStyle = useAnimatedStyle(() => ({
    opacity: headingOpacity.value,
    transform: [
      {
        translateY: interpolate(
          headingOpacity.value,
          [0, 1],
          [30, 0]
        )
      }
    ]
  }));

  const searchStyle = useAnimatedStyle(() => ({
    opacity: searchOpacity.value,
    transform: [
      {
        translateY: interpolate(
          searchOpacity.value,
          [0, 1],
          [30, 0]
        )
      }
    ]
  }));
  const chipsStyle = useAnimatedStyle(() => ({
    opacity: chipsOpacity.value,
    transform: [
      {
        translateY: interpolate(
          chipsOpacity.value,
          [0, 1],
          [30, 0]
        )
      }
    ]
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [
      {
        translateY: interpolate(
          buttonOpacity.value,
          [0, 1],
          [30, 0]
        )
      }
    ]
  }));
  const citiesStyle = useAnimatedStyle(() => ({
    opacity: citiesOpacity.value,
    transform: [
      {
        translateY: interpolate(
          citiesOpacity.value,
          [0, 1],
          [30, 0]
        )
      }
    ]
  }));

  const blob1Style = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          float1.value,
          [-1, 1],
          [-15, 15]
        )
      }
    ]
  }));

  const blob2Style = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          float2.value,
          [-1, 1],
          [15, -15]
        )
      }
    ]
  })); return (
    <View style={styles.container}>
      {/* Floating Background */}
      <Animated.View
        style={[styles.blob1, blob1Style]}
      />
      <Animated.View
        style={[styles.blob2, blob2Style]}
      />

      {/* HEADER */}
      <View style={styles.header}>
        <Animated.Text
          style={[styles.welcome, headingStyle]}
        >
          Welcome to ShopCity 👋
        </Animated.Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Text style={styles.icon}>
              🔔
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setProfileOpen(
                !profileOpen
              )
            }
          >
            <Text style={styles.icon}>
              👤
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* PROFILE MENU */}
      {profileOpen && (
        <>
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={() =>
              setProfileOpen(false)
            }
          />
          <View style={styles.profileMenu}>
            <TouchableOpacity>
              <Text style={styles.profileItem}>
                👤 Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.profileItem}>
                📦 Orders
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.profileItem}>
                🛒 Cart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.profileItem}>
                ❤️ Wishlist
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.profileItem}>
                ⚙ Settings
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {/* CONTENT */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        {/* SEARCH ROW */}
        <Animated.View style={searchStyle}>
          <View style={styles.topSearchRow}>
            <TextInput
              placeholder="Search your city"
              placeholderTextColor="#777"
              style={styles.search}
              value={city}
              onChangeText={(text) => {
                setCity(text);
              }}
            />
            <TouchableOpacity
              style={styles.locationBtn}
              onPress={getCurrentLocation}
            >
              <Text style={styles.locationText}>
                Current Location
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        {/* CITY CHIPS */}
        <Animated.View style={chipsStyle}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cityRow}
          >
            {filteredCities.map((item) => (
              <TouchableOpacity
                key={item.name}
                style={styles.cityChip}
                onPress={() => {

                  router.push({

                    pathname: '/market-place',

                    params: {

                      city: item.name,

                    },

                  });

                }}
              >
                <Text style={styles.cityText}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
        {/* TRENDING CITIES */}
        <Animated.View style={citiesStyle}>
          <Text style={styles.trendingTitle}>
            🔥 Trending Cities
          </Text>
          <View style={styles.citySection}>

            {/* BANGALORE */}
            <View style={styles.rowHeader}>
              <Text style={styles.cityHeading}>
                Bangalore
              </Text>
            </View>
            <ScrollView
              horizontal
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity style={styles.shopCard}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b'
                  }}
                  style={styles.shopImage}
                />
                <Text style={styles.shopName}>
                  Balaji Fashion
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shopCard}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b'
                  }}
                  style={styles.shopImage}
                />
                <Text style={styles.shopName}>
                  Style Hub
                </Text>
              </TouchableOpacity>
            </ScrollView>
            {/* CHENNAI */}
            <View style={styles.rowHeader}>
              <Text style={styles.cityHeading}>
                Chennai
              </Text>
            </View>
            <ScrollView
              horizontal
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity style={styles.shopCard}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b'
                  }}
                  style={styles.shopImage}
                />
                <Text style={styles.shopName}>
                  Cotton Hub
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shopCard}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2'
                  }}
                  style={styles.shopImage}
                />
                <Text style={styles.shopName}>
                  South Trends
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC',
  },

  content: {
    flex: 1,
    paddingHorizontal: 25,
  },

  /* HEADER */

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 10,
    zIndex: 10,
  },
  welcome: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 28,
    marginLeft: 18,
  },
  /* PROFILE */
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 998,
  },
  profileMenu: {
    position: 'absolute',
    top: 70,
    right: 20,
    width: 230,
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 20,
    zIndex: 999,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  profileItem: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 18,
  },
  /* SEARCH ROW */
  topSearchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  search: {
    width: '48%',
    height: 58,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 18,
    fontSize: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  locationBtn: {
    width: '48%',
    height: 58,
    backgroundColor: '#111827',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  /* CITY CHIPS */
  cityRow: {
    paddingVertical: 10,
    paddingRight: 20,
  },
  cityChip: {
    minWidth: 120,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  activeChip: {
    backgroundColor: '#111827',
  },
  cityText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },


  /* BLOBS */
  blob1: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 200,
    backgroundColor: '#E5E7EB',
    top: 80,
    right: -100,
    opacity: 0.45,
  },
  blob2: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 150,
    backgroundColor: '#D1D5DB',
    bottom: 50,
    left: -60,
    opacity: 0.45,
  },

  /* TRENDING CITIES */
  trendingTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginTop: 30,
    marginBottom: 20,
  },
  citySection: {
    marginTop: 10,
  },
  rowHeader: {
    marginTop: 15,
    marginBottom: 15,
  },
  cityHeading: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  shopCard: {
    width: 260,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginRight: 20,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  shopImage: {
    width: '100%',
    height: 160,
  },
  shopName: {
    padding: 16,
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },
});