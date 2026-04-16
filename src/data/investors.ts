import { localAsset } from "@/lib/asset";

export interface InvestorLogo {
  name: string;
  src: string;
  alt: string;
}

const RAW = [
  ["Sequoia", "https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f40f0af6a7e8c082cb1048_6390af9097120ae573d056fc_image%252027.webp.png", "Sequoia"],
  ["OpenAI", "https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f40f0ac5379d0431f58295_662b2d2d9df17725c00d2584_OpenAI_Logo.svg.png.png", "OpenAI"],
  ["Founders Fund", "https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f40f0a2dcafafc7bb4aa1e_6390afd471afe7257b85ceb5_image%252028.webp.png", "Founders Fund"],
  ["Andreessen Horowitz (a16z)", "https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f40f0a1b5dfb8ea15bf40a_662b2ce7f89fbabb62688747_Andreessen_Horowitz_new_logo.svg.png.png", "a16z"],
  ["General Catalyst", "https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67fe8c02da12098978fea139_GC%20Logo%20Black.png", "General Catalyst"],
  ["Khosla Ventures", "https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67fe8c022cb3395b28fd62e6_khosla-ventures-logo-breit-1-1-1617129085.png", "Khosla Ventures"],
  ["Sam Altman", "https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f40f0abc6db4d6c840844e_6390b0d8bfe63be33a1d33b5_image%252033.webp.png", "Sam Altman"],
  ["Dylan Field", "https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f40f0abd61ce1ffac25722_6390b09fc2a6073f44265263_Dylan%2520Field.webp.png", "Dylan Field"],
  ["SignalFire", "https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f40f0abe1882c28958e980_63d0ab52a383ce1cbaa390ad_SFlight.png.png", "SignalFire"],
  ["Naval Ravikant", "https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f40f0a9c81277afcba4912_6390b0c527069cb47bbd2907_Naval%2520Ravikant.webp.png", "Naval Ravikant"],
  ["Thiel Capital", "https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f40f0ab19abcb5a010717c_662b2c8f4bd2f2ba3d11a663_thiel-capital.png.png", "Thiel Capital"],
  ["Balaji Srinivasan", "https://cdn.prod.website-files.com/638f3177988a2191df92b80b/67f40f0a2c26472b4038ea37_6390b07fa2f3a252ac13799a_Balaji%2520Srinivasan.webp.png", "Balaji Srinivasan"],
] as const;

export const investors: InvestorLogo[] = RAW.map(([name, src, alt]) => ({
  name,
  src: localAsset(src),
  alt,
}));
