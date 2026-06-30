import { FEATURES }
from '../data/appData/features';
import { CITIES }
from '../data/appData/cities';
import { FEATURED_CITIES }
from '../data/appData/featuredCities';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import React, { useEffect } from 'react';
import { cityData } from '../data/cityData';

import {
  withRepeat,
} from 'react-native-reanimated';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  withSpring,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.85);
  const logoRotate = useSharedValue(-8);

  const headlineReveal = useSharedValue(0);
  const subReveal = useSharedValue(0);
  const ctaReveal = useSharedValue(0);

  const trustReveal = useSharedValue(0);
  const featuresReveal = useSharedValue(0);
  const shopsReveal = useSharedValue(0);
  const statsReveal = useSharedValue(0);

  const float1 = useSharedValue(0);
  const float2 = useSharedValue(0);

  useEffect(() => {

    logoOpacity.value = withTiming(1, { duration: 700, easing: Easing.out(Easing.cubic) });
    logoScale.value = withSpring(1, { damping: 12, stiffness: 90 });
    logoRotate.value = withSpring(0, { damping: 14, stiffness: 80 });

    headlineReveal.value = withDelay(250, withSpring(1, { damping: 14, stiffness: 90 }));
    subReveal.value = withDelay(450, withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) }));
    ctaReveal.value = withDelay(650, withSpring(1, { damping: 12, stiffness: 100 }));

    trustReveal.value = withDelay(900, withTiming(1, { duration: 700, easing: Easing.out(Easing.cubic) }));
    featuresReveal.value = withDelay(1100, withSpring(1, { damping: 14, stiffness: 90 }));
    shopsReveal.value = withDelay(1350, withSpring(1, { damping: 14, stiffness: 90 }));
    statsReveal.value = withDelay(1600, withTiming(1, { duration: 700, easing: Easing.out(Easing.cubic) }));

    logoRotate.value = withRepeat(
  withSequence(
    withTiming(3, { duration: 4000 }),
    withTiming(-3, { duration: 4000 }),
  ),
  -1,
  true
);
    // Subtle background float
    float1.value = withRepeat(

withSequence(

withTiming(1,{duration:5000}),

withTiming(-1,{duration:5000})

),

-1,

true

);

float2.value = withRepeat(

withSequence(

withTiming(-1,{duration:6000}),

withTiming(1,{duration:6000})

),

-1,

true

);
  }, []);

  // Animated styles
  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [
      { scale: logoScale.value },
      { rotate: `${logoRotate.value}deg` },
    ],
  }));

  const headlineStyle = useAnimatedStyle(() => ({
    opacity: headlineReveal.value,
    transform: [{ translateY: interpolate(headlineReveal.value, [0, 1], [20, 0]) }],
  }));

  const subStyle = useAnimatedStyle(() => ({
    opacity: subReveal.value,
    transform: [{ translateY: interpolate(subReveal.value, [0, 1], [15, 0]) }],
  }));

  const ctaStyle = useAnimatedStyle(() => ({
    opacity: ctaReveal.value,
    transform: [{ translateY: interpolate(ctaReveal.value, [0, 1], [20, 0]) }],
  }));

  const trustStyle = useAnimatedStyle(() => ({
    opacity: trustReveal.value,
    transform: [{ translateY: interpolate(trustReveal.value, [0, 1], [15, 0]) }],
  }));

  const featuresStyle = useAnimatedStyle(() => ({
    opacity: featuresReveal.value,
    transform: [{ translateY: interpolate(featuresReveal.value, [0, 1], [25, 0]) }],
  }));

  const shopsStyle = useAnimatedStyle(() => ({
    opacity: shopsReveal.value,
    transform: [{ translateY: interpolate(shopsReveal.value, [0, 1], [25, 0]) }],
  }));

  const statsStyle = useAnimatedStyle(() => ({
    opacity: statsReveal.value,
  }));

  const float1Style = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(float1.value, [-1, 1], [-15, 15]) },
      { scale: interpolate(float1.value, [-1, 1], [1, 1.1]) },
    ],
  }));

  const float2Style = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(float2.value, [-1, 1], [20, -20]) },
      { scale: interpolate(float2.value, [-1, 1], [1.05, 0.95]) },
    ],
  }));
  const featuredCities=

cityData.filter(

city=>city.featured

);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
      >
        {/* Subtle background blobs */}
        <Animated.View style={[styles.blob, styles.blob1, float1Style]} />
        <Animated.View style={[styles.blob, styles.blob2, float2Style]} />

        {/* ── HERO ──────────────────────────────────────────── */}
        <View style={styles.hero}>
          {/* Status pill */}
          <View style={styles.pill}>
            <View style={styles.pillDot} />
            <Text style={styles.pillText}>Live in some cities</Text>
          </View>

          {/* Logo */}
          <Animated.View style={[styles.logoWrap, logoStyle]}>
            <Image
              source={require('@/assets/images/logo-glow.png')}
              style={styles.logo}
              contentFit="contain"
              transition={600}
            />
          </Animated.View>

          {/* Headline */}
          <Animated.Text style={[styles.headline, headlineStyle]}>
            Shop Local.{'\n'}
            <Text style={styles.headlineAccent}>Live Better</Text>
          </Animated.Text>

          {/* Sub */}
          <Animated.Text style={[styles.sub, subStyle]}>
           Find trusted shops, connect with sellers,{'\n'}
            and experience smarter local shopping.
          </Animated.Text>

          {/* CTAs */}
          <Animated.View style={[styles.ctaRow, ctaStyle]}>
            <Pressable
              onPress={() => router.push('/role-selection')}
              style={({ pressed }) => [styles.btnPrimary, pressed && styles.pressed]}
            >
              <Text style={styles.btnPrimaryText}>Get Started</Text>
              <SymbolView
                name="arrow.right"
                size={16}
                tintColor="#fff"
              />
            </Pressable>

            {/* <Pressable
              onPress={() => router.push('/customer-login')}
              style={({ pressed }) => [styles.btnSecondary, pressed && styles.pressed]}
            >
              <Text style={styles.btnSecondaryText}>Sign In</Text>
            </Pressable> */}
          </Animated.View>
        </View>

        {/* ── TRUST / CITIES ───────────────────────────────── */}
        <Animated.View style={[styles.section, trustStyle]}>
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>TRUSTED ACROSS</Text>
            <View style={styles.dividerLine} />
          </View>
          <View style={styles.citiesRow}>
            {cityData.map((city)=>(

<View

key={city.name}

style={styles.cityChip}

>

<Text style={styles.cityText}>

{city.name}

</Text>

</View>

))}
          </View>
        </Animated.View>

        {/* ── FEATURES ─────────────────────────────────────── */}
        <Animated.View style={[styles.section, featuresStyle]}>
          <Text style={styles.sectionTitle}>Why ShopCity</Text>
          <View style={styles.featureGrid}>
            {FEATURES.map((f) => (
              <View key={f.title} style={styles.featureCard}>
                <View style={styles.featureIconWrap}>
                  {Platform.OS === 'web' ? (
                    <Text style={styles.featureIconEmoji}>{f.fallback}</Text>
                  ) : (
                    <SymbolView
                      name={(Platform.OS === 'ios' ? f.ios : f.android) as any}
                      size={26}
                      tintColor="#4F46E5"
                    />
                  )}
                </View>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureBody}>{f.body}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[styles.section, shopsStyle]}>

  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>
      Featured Cities
    </Text>
  </View>

  <View style={styles.cityGrid}>

    {FEATURED_CITIES.map((item) => (

  <Pressable

    key={item.city}

    style={styles.featuredCityCard}

    onPress={() =>

router.push({

pathname:'/customer-dashboard',

params:{

city:item.city,

},

})

}

  >

    <Text style={styles.featuredCityName}>

      {item.city}

    </Text>

    <Text style={styles.featuredCityCount}>

      {item.shops}

    </Text>

  </Pressable>

))}
  </View>

</Animated.View>

        {/* ── FEATURED SHOPS ─────────────────────────────────
        <Animated.View style={[styles.section, shopsStyle]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Shops</Text>
            <Pressable onPress={() => router.push('/shop-list' as any)}>
              <Text style={styles.linkText}>See all →</Text>
            </Pressable>
          </View>
          {SAMPLE_SHOPS.map((shop) => (
            <Pressable
              key={shop.name}
              onPress={() => router.push('/shop-details' as any)}
              style={({ pressed }) => [styles.shopRow, pressed && styles.pressed]}
            >
              <View style={styles.shopAvatar}>
                <Text style={styles.shopAvatarText}>
                  {shop.name.charAt(0)}
                </Text>
              </View>
              <View style={styles.shopInfo}>
                <Text style={styles.shopName}>{shop.name}</Text>
                <Text style={styles.shopCategory}>{shop.category}</Text>
              </View>
              <View style={styles.shopRating}>
                <Text style={styles.shopRatingText}>⭐ {shop.rating}</Text>
              </View>
            </Pressable>
          ))}
        </Animated.View> */}

        {/* ── STATS ────────────────────────────────────────── */}
        <Animated.View style={[styles.statsRow, statsStyle]}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Local Shops</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>50+</Text>
            <Text style={styles.statLabel}>Cities</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>10K+</Text>
            <Text style={styles.statLabel}>Users</Text>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  cityGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 12,
  marginTop: 15,
},

featuredCityCard: {
  width: '47%',
  backgroundColor: '#F8FAFC',
  borderWidth: 1,
  borderColor: '#E2E8F0',
  borderRadius: 18,
  padding: 20,
},

featuredCityName: {
  fontSize: 18,
  fontWeight: '700',
  color: '#0F172A',
},

featuredCityCount: {
  marginTop: 6,
  color: '#64748B',
},
  // ── Background blobs
  blob: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.4,
  },
  blob1: {
    width: 320,
    height: 320,
    top: -100,
    right: -120,
    backgroundColor: '#EEF2FF',
  },
  blob2: {
    width: 280,
    height: 280,
    top: 200,
    left: -100,
    backgroundColor: '#FAF5FF',
  },

  // ── Hero
  hero: {
    paddingHorizontal: 24,
    paddingTop: 24,
    alignItems: 'center',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    gap: 8,
    marginBottom: 20,
  },
  pillDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
  },
  pillText: {
    color: '#15803D',
    fontSize: 13,
    fontWeight: '600',
  },
  logoWrap: {
    width: width * 0.55,
    aspectRatio: 1,
    marginBottom: 24,
  },
  logo: {
    width: '80%',
    height: '80%',
  },
  headline: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    letterSpacing: -0.8,
    lineHeight: 38,
  },
  headlineAccent: {
    color: '#18181a',
  },
  sub: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 23,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 28,
    width: '100%',
  },
  btnPrimary: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#0F172A',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  btnSecondary: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSecondaryText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.75,
  },

  // ── Section helpers
  section: {
    paddingHorizontal: 24,
    marginTop: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.4,
  },
  linkText: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '600',
  },

  // ── Trust / cities
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  citiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cityChip: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  cityText: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '600',
  },

  // ── Features
  featureGrid:{

flexDirection:'row',

flexWrap:'wrap',

gap:12,

},
  featureCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    borderRadius: 16,
    minHeight: 170,
  },
  featureIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureIconEmoji: {
    fontSize: 22,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  featureBody: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
  },

  // ── Shops
  shopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    gap: 12,
  },
  shopAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopAvatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  shopInfo: {
    flex: 1,
  },
  shopName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  shopCategory: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  shopRating: {
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  shopRatingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
  },

  // ── Stats
  statsRow: {
    flexDirection: 'row',
    marginTop: 40,
    marginHorizontal: 24,
    backgroundColor: '#0F172A',
    borderRadius: 18,
    paddingVertical: 22,
    paddingHorizontal: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#1E293B',
  },
});
