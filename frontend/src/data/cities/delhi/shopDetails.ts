import type {
  Product,
  ShopDetails,
} from "../../types";

export const delhiShopDetails: Record<string, ShopDetails> = {
  Manyavar: {
    image: require("../../../../assets/cities/delhi/marketplace/karolbagh/shops/manyavar.jpg"),
    rating: 4.8,
    address: "Karol Bagh, New Delhi",
    phone: "+91-XXXXXXXXXX",
    timings: "10:00 AM - 9:00 PM",
    collections: ["Men", "Women", "Kids"],
    offers: ["Flat 20% OFF", "Buy 2 Get 1"],

    products: {
      Trending: [
        {
          id: "trend-1",
          name: "Royal Kurta",
          image: require("../../../../assets/cities/delhi/marketplace/karolbagh/shops/manyvar/products/trending1.jpg"),
          price: 2999,
          originalPrice: 3999,
          discount: "25% OFF",
          inStock: true,
        },
        {
          id: "trend-2",
          name: "Royal Kurta",
          image: require("../../../../assets/cities/delhi/marketplace/karolbagh/shops/manyvar/products/trending2.jpg"),
          price: 2999,
          originalPrice: 3999,
          discount: "25% OFF",
          inStock: true,
        },
        {
          id: "trend-3",
          name: "Royal Kurta",
          image: require("../../../../assets/cities/delhi/marketplace/karolbagh/shops/manyvar/products/trending3.jpg"),
          price: 2999,
          originalPrice: 3999,
          discount: "25% OFF",
          inStock: true,
        },
        {
          id: "trend-4",
          name: "Royal Kurta",
          image: require("../../../../assets/cities/delhi/marketplace/karolbagh/shops/manyvar/products/trending4.jpg"),
          price: 2999,
          originalPrice: 3999,
          discount: "25% OFF",
          inStock: true,
        },
      ],

      Shirts: [
        {
          id: "shirt-1",
          name: "Slim Fit Shirt",
          image: require("../../../../assets/cities/delhi/marketplace/karolbagh/shops/manyvar/products/shirts1.jpg"),
          price: 1499,
          inStock: true,
        },
         {
          id: "shirt-2",
          name: "Slim Fit Shirt",
          image: require("../../../../assets/cities/delhi/marketplace/karolbagh/shops/manyvar/products/shirts2.jpg"),
          price: 1499,
          inStock: true,
        },
       {
          id: "shirt-3",
          name: "Slim Fit Shirt",
          image: require("../../../../assets/cities/delhi/marketplace/karolbagh/shops/manyvar/products/shirts3.jpg"),
          price: 1499,
          inStock: true,
        },
         {
          id: "shirt-4",
          name: "Slim Fit Shirt",
          image: require("../../../../assets/cities/delhi/marketplace/karolbagh/shops/manyvar/products/shirts4.jpg"),
          price: 1499,
          inStock: true,
        },
      ],

      Pants: [
        {
          id: "pant-1",
          name: "Formal Pant",
          image: require("../../../../assets/cities/delhi/marketplace/karolbagh/shops/manyvar/products/pant1.jpg"),
          price: 1799,
          inStock: true,
        },
        {
          id: "pant-2",
          name: "Formal Pant",
          image: require("../../../../assets/cities/delhi/marketplace/karolbagh/shops/manyvar/products/pant2.jpg"),
          price: 1799,
          inStock: true,
        },
        {
          id: "pant-3",
          name: "Formal Pant",
          image: require("../../../../assets/cities/delhi/marketplace/karolbagh/shops/manyvar/products/pant3.jpg"),
          price: 1799,
          inStock: true,
        },
        {
          id: "pant-4",
          name: "Formal Pant",
          image: require("../../../../assets/cities/delhi/marketplace/karolbagh/shops/manyvar/products/pant4.jpg"),
          price: 1799,
          inStock: true,
        },
      ],

      Kurtas: [
        {
          id: "kurta-1",
          name: "Wedding Kurta",
          image: require("../../../../assets/cities/delhi/marketplace/karolbagh/shops/manyvar/products/kurtas1.jpg"),
          price: 3299,
          inStock: true,
        },
        {
          id: "kurta-2",
          name: "Wedding Kurta",
          image: require("../../../../assets/cities/delhi/marketplace/karolbagh/shops/manyvar/products/kurtas2.jpg"),
          price: 3299,
          inStock: true,
        },
        {
          id: "kurta-3",
          name: "Wedding Kurta",
          image: require("../../../../assets/cities/delhi/marketplace/karolbagh/shops/manyvar/products/kurtas3.jpg"),
          price: 3299,
          inStock: true,
        },
        {
          id: "kurta-4",
          name: "Wedding Kurta",
          image: require("../../../../assets/cities/delhi/marketplace/karolbagh/shops/manyvar/products/kurtas4.jpg"),
          price: 3299,
          inStock: true,
        },
      ],
    },
  },
};