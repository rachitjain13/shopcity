import React from 'react';

import {

    View,

    Text,

    TouchableOpacity,

    StyleSheet,

} from 'react-native';

import { router } from 'expo-router';

export default function CityNotAvailable() {

    return (

        <View style={styles.container}>

            <Text style={styles.title}>

                🚧 City Coming Soon

            </Text>

            <Text style={styles.subtitle}>

                This city is under development.

                Currently only Delhi is available.

            </Text>

            <TouchableOpacity

                style={styles.button}

                onPress={() => router.back()}

            >

                <Text style={styles.buttonText}>

                    ← Go Back

                </Text>

            </TouchableOpacity>

        </View>

    );

}


const styles = StyleSheet.create({

    container: {

        flex: 1,

        justifyContent: 'center',

        alignItems: 'center',

        padding: 30,

        backgroundColor: '#F8F9FC',

    },

    title: {

        fontSize: 34,

        fontWeight: '800',

        marginBottom: 20,

    },

    subtitle: {

        fontSize: 18,

        textAlign: 'center',

        lineHeight: 30,

        color: '#6B7280',

        marginBottom: 40,

    },

    button: {

        backgroundColor: '#111827',

        paddingHorizontal: 25,

        paddingVertical: 16,

        borderRadius: 18,

    },

    buttonText: {

        color: '#FFFFFF',

        fontWeight: '700',

        fontSize: 16,

    },

});