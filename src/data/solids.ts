export type Product = {
  title: string;
  handle: string;
  price: string;
  image: string;
  hoverImage?: string;
  images?: string[];
  type: string;
  color: string;
  colorHex: string;
  gender: "Men" | "Women";
  fit: string;
  available: boolean;
  description: string;
  sizes?: string[];
};

export type Collection = {
  title: string;
  handle: string;
  image: string;
  href: string;
};

export type SolidsVariant =
  | "baseline"
  | "hero-cta"
  | "collection-signal"
  | "pdp-reassurance";

const asset = (file: string) => `/thesolids/${file}`;
const productAsset = (handle: string, index = 1) =>
  asset(`products/${handle}-${index}.jpg`);

export const navItems = [
  { title: "Men", href: "/collections/men" },
  { title: "Women", href: "/collections/women" },
  { title: "Colors", href: "/collections/colors" },
  { title: "Blog", href: "/pages/brand-story" },
];

export const navCollections = [
  { title: "Men", handle: "men" },
  { title: "Women", handle: "women" },
  { title: "Colors", handle: "colors" },
  { title: "Men's Oversized T-shirts", handle: "mens-oversized-t-shirts" },
  { title: "Men's Regular T-Shirt", handle: "mens-regular-t-shirt" },
  { title: "Women's T-Shirt", handle: "womens-t-shirt" },
  { title: "Women's Tank Tops", handle: "womens-tank-tops" },
  { title: "Joggers & Sweatshirts", handle: "joggers-sweatshirts" },
];

export const categoryButtons = [
  "Men's/Women's Joggers & Sweatshirts",
  "Womens T-Shirt",
  "Womens Tank Tops",
  "Men's Oversized T-shirts",
  "Men's Regular T-Shirt",
];

export const homeCategoryTiles: Collection[] = [
  {
    title: "Joggers & Sweatshirts",
    handle: "joggers-sweatshirts",
    image: asset("cat-joggers.png"),
    href: "/collections/joggers-sweatshirts",
  },
  {
    title: "Womens T-Shirt",
    handle: "womens-t-shirt",
    image: asset("cat-womens-tshirt.jpg"),
    href: "/collections/womens-t-shirt",
  },
  {
    title: "Womens Tank Tops",
    handle: "womens-tank-tops",
    image: asset("cat-tank.jpg"),
    href: "/collections/womens-tank-tops",
  },
  {
    title: "Men's Oversized T-shirts",
    handle: "mens-oversized-t-shirts",
    image: asset("cat-oversized.png"),
    href: "/collections/mens-oversized-t-shirts",
  },
  {
    title: "Men's Regular T-Shirt",
    handle: "mens-regular-t-shirt",
    image: asset("cat-regular.jpg"),
    href: "/collections/mens-regular-t-shirt",
  },
];

export const collectionHeroTiles: Collection[] = [
  {
    title: "Oversized T-Shirts",
    handle: "mens-oversized-t-shirts",
    image: asset("collection-men-1.jpg"),
    href: "/collections/mens-oversized-t-shirts",
  },
  {
    title: "Regular T-Shirts",
    handle: "mens-regular-t-shirt",
    image: asset("collection-men-2.jpg"),
    href: "/collections/mens-regular-t-shirt",
  },
  {
    title: "Joggers",
    handle: "joggers-sweatshirts",
    image: productAsset("mens-joggers-jet-black"),
    href: "/collections/joggers-sweatshirts",
  },
  {
    title: "Everyday Colors",
    handle: "colors",
    image: productAsset("mens-oversized-t-shirt-honey-beige"),
    href: "/collections/colors",
  },
];

const teeDescription =
  "This oversized crew neck t-shirt comes with half sleeves that hit the elbow for a relaxed look. Made with 100% premium cotton, its a cool, breathable tee you will wear on repeat.";

export const products: Product[] = [
  {
    title: "Mens Oversized T Shirt Jet Black",
    handle: "mens-oversized-t-shirt-jet-black",
    price: "Rs. 699.00",
    image: productAsset("mens-oversized-t-shirt-jet-black"),
    hoverImage: productAsset("mens-oversized-t-shirt-jet-black", 2),
    images: [
      productAsset("mens-oversized-t-shirt-jet-black"),
      productAsset("mens-oversized-t-shirt-jet-black", 2),
      productAsset("mens-oversized-t-shirt-jet-black", 3),
      productAsset("mens-oversized-t-shirt-jet-black", 4),
      productAsset("mens-oversized-t-shirt-jet-black", 5),
    ],
    type: "Men T-shirt",
    color: "Jet Black",
    colorHex: "#050505",
    gender: "Men",
    fit: "Oversized",
    available: true,
    description: teeDescription,
  },
  {
    title: "Mens Oversized T Shirt Chocolate Fudge",
    handle: "mens-oversized-t-shirt-chocolate-fudge",
    price: "Rs. 699.00",
    image: productAsset("mens-oversized-t-shirt-chocolate-fudge"),
    hoverImage: productAsset("mens-oversized-t-shirt-chocolate-fudge", 2),
    type: "Men T-shirt",
    color: "Chocolate Fudge",
    colorHex: "#3c241c",
    gender: "Men",
    fit: "Oversized",
    available: true,
    description: teeDescription,
  },
  {
    title: "Mens Oversized T Shirt Pearl White",
    handle: "mens-oversized-t-shirt-pearl-white",
    price: "Rs. 699.00",
    image: productAsset("mens-oversized-t-shirt-pearl-white"),
    hoverImage: productAsset("mens-oversized-t-shirt-pearl-white", 2),
    type: "Men T-shirt",
    color: "Pearl White",
    colorHex: "#f4f0e7",
    gender: "Men",
    fit: "Oversized",
    available: true,
    description: teeDescription,
  },
  {
    title: "Mens Oversized T Shirt Mocha Latte",
    handle: "mens-oversized-t-shirt-mocha-latte",
    price: "Rs. 699.00",
    image: productAsset("mens-oversized-t-shirt-mocha-latte"),
    hoverImage: productAsset("mens-oversized-t-shirt-mocha-latte", 2),
    type: "Men T-shirt",
    color: "Mocha Latte",
    colorHex: "#8b6a5b",
    gender: "Men",
    fit: "Oversized",
    available: true,
    description: teeDescription,
  },
  {
    title: "Mens Oversized T Shirt Midnight Navy",
    handle: "mens-oversized-t-shirt-midnight-navy",
    price: "Rs. 699.00",
    image: productAsset("mens-oversized-t-shirt-midnight-navy"),
    hoverImage: productAsset("mens-oversized-t-shirt-midnight-navy", 2),
    type: "Men T-shirt",
    color: "Midnight Navy",
    colorHex: "#151e32",
    gender: "Men",
    fit: "Oversized",
    available: true,
    description: teeDescription,
  },
  {
    title: "Mens Oversized T Shirt Honey Beige",
    handle: "mens-oversized-t-shirt-honey-beige",
    price: "Rs. 699.00",
    image: productAsset("mens-oversized-t-shirt-honey-beige"),
    hoverImage: productAsset("mens-oversized-t-shirt-honey-beige", 2),
    type: "Men T-shirt",
    color: "Honey Beige",
    colorHex: "#cbb391",
    gender: "Men",
    fit: "Oversized",
    available: true,
    description: teeDescription,
  },
  {
    title: "Mens Oversized T Shirt Dusty Olive",
    handle: "mens-oversized-t-shirt-dusty-olive",
    price: "Rs. 699.00",
    image: productAsset("mens-oversized-t-shirt-dusty-olive"),
    hoverImage: productAsset("mens-oversized-t-shirt-dusty-olive", 2),
    type: "Men T-shirt",
    color: "Dusty Olive",
    colorHex: "#555943",
    gender: "Men",
    fit: "Oversized",
    available: true,
    description: teeDescription,
  },
  {
    title: "Mens Oversized T Shirt Coffee Brew",
    handle: "mens-oversized-t-shirt-coffee-brew",
    price: "Rs. 699.00",
    image: productAsset("mens-oversized-t-shirt-coffee-brew"),
    hoverImage: productAsset("mens-oversized-t-shirt-coffee-brew", 2),
    type: "Men T-shirt",
    color: "Coffee Brew",
    colorHex: "#5a392b",
    gender: "Men",
    fit: "Oversized",
    available: true,
    description: teeDescription,
  },
  {
    title: "Mens Oversized T Shirt Cocoa Brown",
    handle: "mens-oversized-t-shirt-cocoa-brown",
    price: "Rs. 699.00",
    image: productAsset("mens-oversized-t-shirt-cocoa-brown"),
    hoverImage: productAsset("mens-oversized-t-shirt-cocoa-brown", 2),
    type: "Men T-shirt",
    color: "Cocoa Brown",
    colorHex: "#4a342a",
    gender: "Men",
    fit: "Oversized",
    available: true,
    description: teeDescription,
  },
  {
    title: "Mens Oversized T Shirt Blush Pink",
    handle: "mens-oversized-t-shirt-blush-pink",
    price: "Rs. 699.00",
    image: productAsset("mens-oversized-t-shirt-blush-pink"),
    hoverImage: productAsset("mens-oversized-t-shirt-blush-pink", 2),
    type: "Men T-shirt",
    color: "Blush Pink",
    colorHex: "#b88688",
    gender: "Men",
    fit: "Oversized",
    available: true,
    description: teeDescription,
  },
  {
    title: "Mens Oversized T Shirt Blue Breeze",
    handle: "mens-oversized-t-shirt-blue-breeze",
    price: "Rs. 699.00",
    image: productAsset("mens-oversized-t-shirt-blue-breeze"),
    hoverImage: productAsset("mens-oversized-t-shirt-blue-breeze", 2),
    type: "Men T-shirt",
    color: "Blue Breeze",
    colorHex: "#88b8c4",
    gender: "Men",
    fit: "Oversized",
    available: true,
    description: teeDescription,
  },
  {
    title: "Mens Oversized T Shirt Berry Maroon",
    handle: "mens-oversized-t-shirt-berry-maroon",
    price: "Rs. 699.00",
    image: productAsset("mens-oversized-t-shirt-berry-maroon"),
    hoverImage: productAsset("mens-oversized-t-shirt-berry-maroon", 2),
    type: "Men T-shirt",
    color: "Berry Maroon",
    colorHex: "#5b1f2f",
    gender: "Men",
    fit: "Oversized",
    available: true,
    description: teeDescription,
  },
  {
    title: "Womens Joggers Midnight Navy",
    handle: "womens-joggers-midnight-navy",
    price: "Rs. 1,299.00",
    image: productAsset("womens-joggers-midnight-navy"),
    hoverImage: productAsset("womens-joggers-midnight-navy", 2),
    type: "Women Joggers",
    color: "Midnight Navy",
    colorHex: "#151e32",
    gender: "Women",
    fit: "Relaxed",
    available: true,
    description:
      "Soft everyday joggers with an easy elastic waist and relaxed straight fit.",
  },
  {
    title: "Womens Joggers Jet Black",
    handle: "womens-joggers-jet-black",
    price: "Rs. 1,299.00",
    image: productAsset("womens-joggers-jet-black"),
    hoverImage: productAsset("womens-joggers-jet-black", 2),
    type: "Women Joggers",
    color: "Jet Black",
    colorHex: "#050505",
    gender: "Women",
    fit: "Relaxed",
    available: true,
    description:
      "Soft everyday joggers with an easy elastic waist and relaxed straight fit.",
  },
  {
    title: "Mens Joggers Pearl White",
    handle: "mens-joggers-pearl-white",
    price: "Rs. 1,299.00",
    image: productAsset("mens-joggers-pearl-white"),
    hoverImage: productAsset("mens-joggers-pearl-white", 2),
    type: "Men Joggers",
    color: "Pearl White",
    colorHex: "#f4f0e7",
    gender: "Men",
    fit: "Relaxed",
    available: true,
    description:
      "Everyday joggers with a relaxed silhouette and soft cotton feel.",
  },
  {
    title: "Mens Joggers Jet Black",
    handle: "mens-joggers-jet-black",
    price: "Rs. 1,299.00",
    image: productAsset("mens-joggers-jet-black"),
    hoverImage: productAsset("mens-joggers-jet-black", 2),
    type: "Men Joggers",
    color: "Jet Black",
    colorHex: "#050505",
    gender: "Men",
    fit: "Relaxed",
    available: true,
    description:
      "Everyday joggers with a relaxed silhouette and soft cotton feel.",
  },
  {
    title: "Womens Crop Boxy T Shirt Pearl White",
    handle: "womens-crop-boxy-t-shirt-pearl-white",
    price: "Rs. 499.00",
    image: productAsset("womens-crop-boxy-t-shirt-pearl-white"),
    hoverImage: productAsset("womens-crop-boxy-t-shirt-pearl-white", 2),
    type: "Women Boxy T-shirt",
    color: "Pearl White",
    colorHex: "#f4f0e7",
    gender: "Women",
    fit: "Boxy",
    available: true,
    description:
      "A cropped boxy t-shirt made for daily wear in soft breathable cotton.",
  },
  {
    title: "Womens Crop Boxy T Shirt Mocha Latte",
    handle: "womens-crop-boxy-t-shirt-mocha-latte",
    price: "Rs. 499.00",
    image: productAsset("womens-crop-boxy-t-shirt-mocha-latte"),
    hoverImage: productAsset("womens-crop-boxy-t-shirt-mocha-latte", 2),
    type: "Women Boxy T-shirt",
    color: "Mocha Latte",
    colorHex: "#8b6a5b",
    gender: "Women",
    fit: "Boxy",
    available: true,
    description:
      "A cropped boxy t-shirt made for daily wear in soft breathable cotton.",
  },
];

export const collectionProducts = products;
export const homeNewArrivals = products.slice(0, 8);

export function getProductsForCollection(handle = "all") {
  if (handle === "women" || handle === "womens-t-shirt" || handle === "womens-tank-tops") {
    return products.filter((product) => product.gender === "Women");
  }

  if (handle === "joggers-sweatshirts") {
    return products.filter((product) => product.type.includes("Joggers"));
  }

  if (handle === "colors") {
    return products;
  }

  if (
    handle === "men" ||
    handle === "mens-oversized-t-shirts" ||
    handle === "mens-regular-t-shirt" ||
    handle === "all"
  ) {
    return products.filter((product) => product.gender === "Men");
  }

  return products;
}

export function getProduct(handle: string) {
  return products.find((product) => product.handle === handle);
}

export function getCollectionTitle(handle = "all") {
  if (handle === "all") return "All";

  const navMatch = navCollections.find((collection) => collection.handle === handle);
  if (navMatch) return navMatch.title.replace(/^Men's /, "Men ").replace(/^Women's /, "Women ");

  return handle
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function parseVariant(value?: string): SolidsVariant {
  if (
    value === "hero-cta" ||
    value === "collection-signal" ||
    value === "pdp-reassurance"
  ) {
    return value;
  }

  return "baseline";
}
