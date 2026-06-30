import { cityConfig }
from '../data/cityConfig';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    withSequence,
    interpolate,
} from 'react-native-reanimated';
export default function ShopSelection() {
    const { city, category, marketplace }
        = useLocalSearchParams();
    const selectedCity =String(city)as keyof typeof cityConfig;

const selectedCityData =
cityConfig[selectedCity];
const shopDetails = selectedCityData.shopDetails;
const shopData = selectedCityData.shopDetails as Record<
  string,
  {
    image: any;
  }
>;

    const [search, setSearch]
        = useState('');

    // animations
    const headingOpacity
        = useSharedValue(0);
    const searchOpacity
        = useSharedValue(0);
    const cardsOpacity
        = useSharedValue(0);
    const float1
        = useSharedValue(-1);
    const float2
        = useSharedValue(1);

    useEffect(() => {
        headingOpacity.value
            = withTiming(
                1,
                { duration: 900 }
            );
        searchOpacity.value
            = withTiming(
                1,
                { duration: 1300 }
            );
        cardsOpacity.value
            = withTiming(
                1,
                { duration: 1800 }
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
                    { duration: 6000 }
                ),
                withTiming(
                    1,
                    { duration: 6000 }
                )
            ),
            -1,
            true
        );
    }, []);

    // SHOP DAT

const shops: string[] =(selectedCityData.shops as Record<string, Record<string, string[]>>

)

[String(marketplace)]

?.[String(category)]

|| [];
    // realtime search
  const filteredShops = shops
  .filter((shop) => shop in shopData)
  .filter((shop) =>
    shop.toLowerCase().includes(search.toLowerCase())
  );
    // ANIMATED STYLES
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


    const cardsStyle = useAnimatedStyle(() => ({
        opacity: cardsOpacity.value,
        transform: [
            {
                translateY: interpolate(
                    cardsOpacity.value,
                    [0, 1],
                    [40, 0]
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
    }));

    return (
        <View style={styles.container}>

            {/* BLOBS */}
            <Animated.View
                style={[styles.blob1, blob1Style]}
            />
            <Animated.View
                style={[styles.blob2, blob2Style]}
            />

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
            >

                {/* HEADER */}
                <View style={styles.headerRow}>
                    <Text style={styles.headerInfo}>
                        {city}
                    </Text>
                    <Text style={styles.headerInfo}>
                        {marketplace}
                    </Text>
                    <Text style={styles.headerInfo}>
                        {category}
                    </Text>
                </View>

                {/* SEARCH */}
                <Animated.View style={searchStyle}>

                    <TextInput
                        placeholder='Search Shops'
                        placeholderTextColor='#777'
                        style={styles.search}
                        value={search}
                        onChangeText={setSearch}
                    />
                </Animated.View>


                {/* SHOPS */}
                <Animated.View style={cardsStyle}>

                    <Text style={styles.sectionTitle}>
                        All Shops
                    </Text>

                    <View style={styles.cardsContainer}>
                        {filteredShops.map((shopName:string) => (

                            <TouchableOpacity
                                key={shopName}
                                style={styles.card}
                                onPress={() =>
                                    router.push({
                                        pathname: '/shop-details',
                                        params: {
                                            city,
                                            category,
                                            marketplace,
                                            shop: shopName,
                                        },
                                    })
                                }
                            >
                                {shopData[shopName] ? (
  <Image
    source={shopData[shopName].image}
    style={styles.image}
  />
) : (
  <View
    style={[
      styles.image,
      {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5E7EB',
      },
    ]}
  >
    <Text style={{ fontSize: 12, color: '#666' }}>
      No Image
    </Text>
  </View>
)}

                                <Text style={styles.cardTitle}>
                                    {shopName}
                                </Text>

                            </TouchableOpacity>

                        ))}
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
    /* BLOBS */
    blob1: {
        position: 'absolute',
        width: 250,
        height: 250,
        borderRadius: 180,
        backgroundColor: '#E5E7EB',
        top: 60,
        right: -90,
        opacity: 0.45,
    },
    blob2: {
        position: 'absolute',
        width: 180,
        height: 180,
        borderRadius: 150,
        backgroundColor: '#D1D5DB',
        bottom: 40,
        left: -50,
        opacity: 0.45,
    },

    /* HEADER */
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 25,
        elevation: 4,
    },
    headerInfo: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    /* SEARCH */
    search: {
        width: '50%',
        height: 60,
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        paddingHorizontal: 20,
        fontSize: 16,
        marginBottom: 30,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    /* SECTION */
    sectionTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#111827',
        marginBottom: 20,
    },

    /* GRID */
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',

        paddingBottom: 120,
    },
    /* CARD */
    card: {
        width: '31%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 22,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },

    image: {
        width: '100%',
        height: 180,
    },

    cardTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#111827',
        textAlign: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8,
    },
});