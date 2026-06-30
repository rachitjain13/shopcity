import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import type { Product } from "../data/types";

type Props = {
  product: Product;
  city: string;
  marketplace: string;
  shop: string;
};

export default function ProductCard({
  product,
  city,
  marketplace,
  shop,
}: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/product-page",
          params: {
            city,
            marketplace,
            shop,
            product: product.id,
          },
        })
      }
    >
      <Image
        source={product.image}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text
          numberOfLines={1}
          style={styles.name}
        >
          {product.name}
        </Text>

        <Text style={styles.price}>
          ₹{product.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 170,
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    marginRight: 15,
  },

  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },

  info: {
    padding: 10,
  },

  name: {
    fontSize: 15,
    fontWeight: "700",
  },

  price: {
    marginTop: 5,
    color: "#16A34A",
    fontWeight: "700",
    fontSize: 16,
  },
});