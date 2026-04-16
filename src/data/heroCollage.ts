import { localAsset } from "@/lib/asset";

/** Hero collage of founder photos. Layout matches the Z Fellows live hero. */
export interface HeroPhoto {
  src: string;
  alt: string;
  /** Hide on viewports < 1280px (matches Webflow .hide-1280px) */
  hideUnder1280?: boolean;
}

const RAW: Array<[string, string, boolean?]> = [
  ["https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f41545fa7bd0dc4a8c019d_8268461C-D4C7-436A-8102-6A6A906BCD81IMG_0600%203.png", "z fellow"],
  ["https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f415447abd1ee40e5ba49d_Ethan%201%202.png", "Z Fellow Ethan"],
  ["https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f4154480d3804fa744cef0_Etched%201%201.png", "Etched"],
  ["https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f41547ad68b9c0e3011890_spacex%201.png", "Elon Musk working on his computer"],
  ["https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f41544f2700d0a9d98ba0d_nvidia%202.png", "Jensen Huang | Nvidia"],
  ["https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f4154528c4e14e38dca9da_msft%202.png", "Bill Gates"],
  ["https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f41545bc859963421c0b88_msft%205.png", "Bill Gates"],
  ["https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f4154522d4fd2295b8069e_IMG_9615%201.png", "z fellow"],
  ["https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f41545af64de331fd57710_Etched%203%201.png", "Etched"],
  ["https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f415476c651fb001840d26_stripe.png", "Stripe founders"],
  ["https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f415459055a000d014d609_apple%201.png", "Steve Jobs | Apple"],
  ["https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f415459decbfc70d86491d_mercor.png", "Mercor"],
  ["https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f41547ad68b9c0e3011893_zfellows-cory%27s-tweet%201.png", "Z Fellows Cory's tweet"],
  ["https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f41547ee5c1e3f82efaf31_zuck%201.webp.crdownload%201.png", "Mark Zuckerberg in his dorm"],
  ["https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f41544fa7bd0dc4a8c0177_google%20dorm%201.png", "Google founder working on his laptop"],
  ["https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67fcfd4179940dd014d31c16_elon-musk-paypal.png", "Elon Musk | PayPal", true],
  ["https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67fcfd445361f75441fcc120_zfellows%20working%20on%20laptop.png", "Z Fellows working on laptop", true],
  ["https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67fcfd415f8ca304117128e7_standing%20near%20the%20table.png", "Z Fellows standing near the table", true],
];

export const heroCollage: HeroPhoto[] = RAW.map(([src, alt, hideUnder1280]) => ({
  src: localAsset(src),
  alt,
  hideUnder1280,
}));
