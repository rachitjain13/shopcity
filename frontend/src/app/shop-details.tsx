import ProductCard from "../components/ProductCard";
import type { Product } from '../data/types';
import { cityConfig } from '../data/cityConfig';
import React, { useEffect, useState } from 'react';

import {

    View,

    Text,

    StyleSheet,

    ScrollView,

    TouchableOpacity,

    TextInput,

    Image,

} from 'react-native';

import {

    router,

    useLocalSearchParams,

} from 'expo-router';

import Animated, {

    useSharedValue,

    useAnimatedStyle,

    withTiming,

    withRepeat,

    withSequence,

    interpolate,

} from 'react-native-reanimated';



export default function ShopDetails() {


    const {

        city,

        marketplace,

        shop,

    } = useLocalSearchParams();
    const selectedCity = String(city) as keyof typeof cityConfig;


    const selectedCityData = cityConfig[selectedCity];

    const currentShop =
        selectedCityData.shopDetails[
        String(shop) as keyof typeof selectedCityData.shopDetails
        ];
    if (!currentShop) {
        return null;
    }

    const [search, setSearch]

        = useState('');



    const headingOpacity

        = useSharedValue(0);

    const searchOpacity

        = useSharedValue(0);

    const chipsOpacity

        = useSharedValue(0);

    const contentOpacity

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



        chipsOpacity.value

            = withTiming(

                1,

                { duration: 1700 }

            );



        contentOpacity.value

            = withTiming(

                1,

                { duration: 2200 }

            );



        float1.value

            = withRepeat(

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



        float2.value

            = withRepeat(

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



    const headingStyle

        = useAnimatedStyle(() => ({

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



    const searchStyle

        = useAnimatedStyle(() => ({

            opacity: searchOpacity.value,

        }));



    const chipsStyle

        = useAnimatedStyle(() => ({

            opacity: chipsOpacity.value,

        }));



    const contentStyle

        = useAnimatedStyle(() => ({

            opacity: contentOpacity.value,

        }));



    const blob1Style

        = useAnimatedStyle(() => ({

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



    const blob2Style

        = useAnimatedStyle(() => ({

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



    const collections =
        currentShop.collections;
    const [selectedCollection, setSelectedCollection] =
        useState(collections[0]);
const filteredProducts =
  selectedCollection === "Men"
    ? currentShop.products
    : {};
    return (

        <View style={styles.container}>


            {/* FLOATING BLOBS */}

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

                    paddingBottom: 120,

                }}

            >


                {/* HEADER */}

                <Animated.View

                    style={[styles.headerBox, headingStyle]}

                >

                    <Text style={styles.headerText}>
                        🏬 {shop}
                    </Text>

                    <Text style={styles.headerSubText}>
                        📍 {marketplace}, {city}
                    </Text>


                </Animated.View>




                {/* SEARCH */}

                <Animated.View style={searchStyle}>


                    <TextInput

                        placeholder='Search Products'

                        placeholderTextColor='#777'

                        style={styles.search}

                        value={search}

                        onChangeText={(text) => {

                            setSearch(text);

                        }}

                    />


                </Animated.View>




                {/* MEN WOMEN KIDS */}

                <Animated.View style={chipsStyle}>


                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.collectionRow}
                    >
                        {collections.map((collection: string) => (
                            <TouchableOpacity
                                key={collection}
                                style={[
                                    styles.collectionChip,
                                    selectedCollection === collection && {
                                        backgroundColor: "#6D28D9",
                                    },
                                ]}
                                onPress={() =>
                                    setSelectedCollection(collection)
                                }
                            >
                                <Text
                                    style={[
                                        styles.collectionText,
                                        selectedCollection === collection && {
                                            color: "#fff",
                                            fontWeight: "700",
                                        },
                                    ]}
                                >
                                    {collection}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                </Animated.View>





                <Animated.View style={contentStyle}>


                    {/* TRENDING */}
                    
                  {selectedCollection === "Men" ? (

  Object.entries(filteredProducts).map(([section, items]) => (

    <View key={section}>

      <View style={styles.rowHeader}>

        <Text style={styles.rowTitle}>
          {section}
        </Text>

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/product-page" as any,
              params: {
                city,
                marketplace,
                shop,
                product: section,
              },
            })
          }
        >
          <Text style={styles.viewAll}>
            View All →
          </Text>
        </TouchableOpacity>

      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >

        {(items as Product[]).map((product) => (

          <ProductCard
    key={product.id}
    product={product}
    city={String(city)}
    marketplace={String(marketplace)}
    shop={String(shop)}
/>

        ))}

      </ScrollView>

    </View>

  ))

) : (

  <View
    style={{
      alignItems: "center",
      paddingVertical: 50,
    }}
  >

    <Text
      style={{
        fontSize: 22,
        fontWeight: "700",
      }}
    >
      {selectedCollection} Collection
    </Text>

    <Text
      style={{
        marginTop: 10,
        color: "#666",
      }}
    >
      Coming Soon 🚀
    </Text>

  </View>

)}

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
        paddingHorizontal: 20,
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
    imageCard: {
        width: 180,
        height: 240,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginRight: 15,
        overflow: 'hidden',
        elevation: 5,
    },
    productImage: {
        width: '100%',
        height: 160,
        resizeMode: 'cover',
    },

    /* HEADER */
    headerSubText: {
        fontSize: 15,
        color: '#6B7280',
        marginTop: 6,
    },
    headerBox: {
        backgroundColor: '#fffdfd',
        fontSize: 20,
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 15,
        marginBottom: 25,
        elevation: 4,
    },
    headerText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
    },
    /* SEARCH */
    search: {
        width: '50%',
        height: 58,
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        paddingHorizontal: 20,
        fontSize: 18,
        elevation: 4,
        marginBottom: 20,
    },

    /* COLLECTIONS */
    collectionRow: {
        paddingBottom: 10,
    },
    collectionChip: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 18,
        marginRight: 12,
        elevation: 4,
    },
    collectionText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },

    /* SECTIONS */
    sectionTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#111827',
        marginTop: 20,
        marginBottom: 18,
    },
    /* TRENDING */
    trendingCard: {
        width: 140,
        height: 90,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        elevation: 4,
    },
    trendingText: {
        fontSize: 18,
        fontWeight: '700',
    },

    /* ROWS */
    rowHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 35,
        marginBottom: 20,
    },
    rowTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#111827',
    },
    viewAll: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2563EB',
    },
});