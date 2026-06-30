import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import * as Location from 'expo-location';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    withSequence,
    interpolate,
} from 'react-native-reanimated';
import { cityConfig } from '../data/cityConfig';
export default function MarketplaceSelection() {
    const { city } = useLocalSearchParams();
    const [search, setSearch] = useState('');
    const cityData =
        cityConfig[city as keyof typeof cityConfig];
    const marketplaces =
        (cityData?.marketplaces || []) as {
            name: string;
            image: any;
            shops: string;
        }[];
    // animation
    const headingOpacity = useSharedValue(0);
    const searchOpacity = useSharedValue(0);
    const chipsOpacity = useSharedValue(0);
    const cardsOpacity = useSharedValue(0);
    const float1 = useSharedValue(-1);
    const float2 = useSharedValue(1);

    // animations start
    useEffect(() => {
        headingOpacity.value = withTiming(
            1,
            { duration: 900 }
        );
        searchOpacity.value = withTiming(
            1,
            { duration: 1300 }
        );
        chipsOpacity.value = withTiming(
            1,
            { duration: 1700 }
        );
        cardsOpacity.value = withTiming(
            1,
            { duration: 2100 }
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

    // current location
    const getCurrentLocation = async () => {
        try {
            const { status } =
                await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') return;
            const location =
                await Location.getCurrentPositionAsync({});
            console.log(location);
        }
        catch (error) {
            console.log(error);
        }
    };
    // marketplace data

    // anmated styles
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

    const cardsStyle = useAnimatedStyle(() => ({
        opacity: cardsOpacity.value,
        transform: [
            {
                translateY: interpolate(
                    cardsOpacity.value,
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
    }));
    const filteredMarketplaces = marketplaces.filter((item) =>
        item.name
            .toLowerCase()
            .includes(
                search.toLowerCase()
            )
    );
    const goToCategory = (
        marketplace: string
    ) => {
        router.push({
            pathname: '/category-selection',
            params: {
                city: String(city),
                marketplace,
            },
        });
    };

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

            >


                {/* HEADER */}

                <Animated.View style={headingStyle}>


                    <Text style={styles.city}>

                        {city}

                    </Text>


                    <Text style={styles.title}>

                        Explore {city} Marketplaces

                    </Text>

                </Animated.View>




                {/* SEARCH ROW */}

                <Animated.View style={searchStyle}>


                    <View style={styles.topRow}>


                        <TextInput

                            placeholder='Search Marketplace'

                            placeholderTextColor='#777'

                            style={styles.search}

                            value={search}

                            onChangeText={setSearch}

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




                {/* MARKETPLACE CHIPS */}

                <Animated.View style={chipsStyle}>


                    <ScrollView

                        horizontal

                        showsHorizontalScrollIndicator={false}

                        contentContainerStyle={styles.marketRow}
                    >
                        {filteredMarketplaces.map((item) => (
                            <TouchableOpacity
                                key={item.name}
                                style={styles.marketChip}
                                onPress={() =>
                                    goToCategory(item.name)
                                }
                            >


                                <Text

                                    style={styles.marketText}
                                >

                                    {item.name}

                                </Text>


                            </TouchableOpacity>


                        ))}


                    </ScrollView>


                </Animated.View>




                {/* RECOMMENDED MARKETPLACES */}


                <Animated.View style={cardsStyle}>


                    <Text style={styles.sectionTitle}>

                        Recommended Marketplaces

                    </Text>



                    <View style={styles.cardsContainer}>


                        {filteredMarketplaces.map((item) => (


                            <TouchableOpacity

                                key={item.name}

                                style={styles.card}

                                onPress={() =>
                                    goToCategory(item.name)
                                }
                            >
                                <Image

                                    source={item.image}

                                    style={styles.image}

                                />



                                <Text style={styles.cardTitle}>

                                    {item.name}

                                </Text>



                                <Text style={styles.shopCount}>

                                    {item.shops}

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

        top: 50,

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

    city: {

        fontSize: 20,

        fontWeight: '700',

        color: '#4B5563',

        marginTop: 15,

    },

    title: {

        fontSize: 34,

        fontWeight: '800',

        color: '#111827',

        marginTop: 10,

        marginBottom: 25,

    },

    /* SEARCH */

    topRow: {

        flexDirection: 'row',

        alignItems: 'center',

        justifyContent: 'space-between',

        marginBottom: 20,

    },

    search: {

        width: '45%',

        height: 45,

        backgroundColor: '#FFFFFF',

        borderRadius: 18,

        paddingHorizontal: 18,

        fontSize: 16,

        elevation: 4,

        shadowColor: '#000',

        shadowOpacity: 0.3,

        shadowRadius: 8,

    },

    locationBtn: {

        width: '45%',

        height: 45,

        backgroundColor: '#111827',

        borderRadius: 18,

        justifyContent: 'center',

        alignItems: 'center',

        elevation: 4,

        shadowColor: '#000',

        shadowOpacity: 0.3,

        shadowRadius: 8,

    },

    locationText: {

        fontSize: 16,

        fontWeight: '700',

        color: '#FFFFFF',

    },

    /* CHIPS */

    marketRow: {

        paddingBottom: 20,

        paddingRight: 20,

    },

    marketChip: {

        minWidth: 120,

        height: 45,

        backgroundColor: '#FFFFFF',

        borderRadius: 30,

        justifyContent: 'center',

        alignItems: 'center',

        marginRight: 10,

        elevation: 3,

        shadowColor: '#000',

        shadowOpacity: 0.1,

        shadowRadius: 8,

    },

    activeChip: {

        backgroundColor: '#111827',

    },

    marketText: {

        fontSize: 15,

        fontWeight: '700',

        color: '#111827',

    },

    /* SECTION */

    sectionTitle: {

        fontSize: 28,

        fontWeight: '800',

        color: '#111827',

        marginTop: 10,

        marginBottom: 20,

    },

    /* CARDS */

    cardsContainer: {

        flexDirection: 'row',

        flexWrap: 'wrap',

        justifyContent: 'space-between',

        paddingBottom: 100,

    },

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

        height: 120,

    },

    cardTitle: {

        fontSize: 16,

        fontWeight: '700',

        color: '#111827',

        paddingHorizontal: 12,

        paddingTop: 12,

    },

    shopCount: {

        fontSize: 14,

        fontWeight: '600',

        color: '#6B7280',

        paddingHorizontal: 12,

        paddingBottom: 14,

    },

});