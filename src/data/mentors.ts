import type { Mentor } from "@/types/content";
import { localAsset } from "@/lib/asset";

const RAW = [
  ["Marc Randolph", "Co-founder of Netflix", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/67feaca17635a86987dfdc31_639221fd1ec3f81f765fde24_Rectangle%25202-p-500.webp.png"],
  ["Kevin Hartz", "Co-founder of Eventbrite", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/67feac71557c55204712c9a8_63922210e40bf1c209f8639c_Rectangle%25202-3-p-500.webp.png"],
  ["Naval Ravikant", "Founder of AngelList", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/67feac918c900513ec7b2bbe_63922220742e46b21c45650c_Rectangle%25202-1-p-500.webp.png"],
  ["Max Mullen", "Co-founder of Instacart", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/67feac9aa22cf7a700877231_647e88b8d7283da775afddf5_20150807151657-max-mullen-p-500.png"],
  ["Trae Stephens", "Co-founder of Anduril", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/691ccf414ec5e570d9378cbf_AyfKJLMi_400x400.jpg"],
  ["Julia Hartz", "Co-founder of Eventbrite", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/691ccfafdc87c7efe6d368dc_Julia-Hartz-Headshot-Low-Res_cZYhrZzba.png"],
  ["Dylan Field", "Co-founder of Figma", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/67feae1898817d247db1923a_638f9a1dc58085e63ba477d8_Rectangle%25202-4-p-500.webp.png"],
  ["Justin Mateen", "Co-founder of Tinder", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/67fead6749c06025b319f2f3_638f9b163a4930416b8fda71_Rectangle%25202%2520(3)-p-500.webp.png"],
  ["Guillermo Rauch", "CEO of Vercel", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/691ccef146d0e21d548e9e46_Vercel.jpeg"],
  ["Stanley Tang", "Co-founder of DoorDash", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/67feac5909e6971484b71be9_638f9a4c4b77f14076eb057f_Rectangle%25202-2-p-500.webp.png"],
  ["Steven Schwartz", "Founder", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/691cd70c30675239ab0bac0d_IMG_1079.jpg"],
  ["Jack Altman", "CEO of Lattice", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/67feae6eadc278c00b565923_661d4d2acb726aaa4d12f460_QQ_MTtEZ_400x400.png"],
  ["Eric Glyman", "CEO of Ramp", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/67fead00c311ab98715bd28f_Eric%20Glyman.png"],
  ["Prasanna Sankar", "Co-founder of Rippling", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/67feac4a47478fb17cd62192_638f9b4c827c086e4697ea01_Rectangle%25202-2%2520(2)-p-500.webp.png"],
  ["Cyan Banister", "Investor (Founders Fund)", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/67feae351e7a3eb55fdad905_Cyan%20Banister.png"],
  ["Keith Rabois", "Investor (Khosla Ventures)", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/67fead1968c095c99ba16b0a_Listitem%20%E2%86%92%2063922219e40bf12fc4f863e5_Rectangle%25202-2-p-500.webp.png"],
  ["Mark Pincus", "Founder of Zynga", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/691ccff60fcc4a795c9e6137_N1ULvUc_Mark_pincus_headshot_500x500.jpg"],
  ["Shuo Wang", "Founder", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/681939a5b58272ead9f2cb42_shuoz.jpg"],
  ["Walter Kortschak", "Investor", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/691ccf33e8fb20273c3190d0_661fbbbd6d469419d4267c25_65f89b2e1d4ca24a2cb0b37c_WGK-seb.jpeg"],
  ["Robert Wachen", "Founder", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/691ccf52c4427b1f0c558998_1704066476542.jpeg"],
  ["Vinay Hiremath", "Co-founder of Loom", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/691ccfcd648077f1fb0d0e56_Vinay%20Hiremath%20HD%20(1).webp"],
  ["Shahed Khan", "Co-founder of Loom", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/691ccfdbd1951471a3c56170_Screenshot%202025-11-18%20at%2011.49.43%E2%80%AFAM.png"],
  ["Chris Farmer", "CEO of SignalFire", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/67feae47b9e7a00dd4e3f39b_639b07a0a96243ac834eb74d_1516242385190%20(1).png"],
  ["Deon Nicholas", "Founder of Forethought", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/681b7a509fde585648ab82df_0636ff49-5198-4f95-b039-3f8225d05731.webp"],
  ["Walden Yan", "Founder", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/691ccf93c6bf3285a90c126d_1699725986976.jpeg"],
  ["Paul Sciarra", "Co-founder of Pinterest", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/691d66c2c24aed8eda54a2d1_Paul-Sciarra.jpg"],
  ["Edward Lando", "Founder of Pareto Holdings", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/67feae51349f987abcdf547a_638f9b665b5c5696f07c0b57_Rectangle%202-4-p-500.png"],
  ["Lucy Guo", "Co-founder of Scale AI", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/67fead0b04367a8299b02af8_638f9a0cb76a2c48f3b0d455_Rectangle%202-1-p-500.png"],
  ["Sean Rad", "Co-founder of Tinder", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/67feac658ccf68bc5278d99c_638f9a32c580851983a47958_Rectangle%202-5-p-500.png"],
  ["Nick Rellas", "Co-founder of Drizly", "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/67feac85193c9bcda3745d8d_638f9b344d736b4014199381_Rectangle%202-1%20(2)-p-500.png"],
] as const;

export const mentors: Mentor[] = RAW.map(([name, role, img]) => ({
  name,
  role,
  image: localAsset(img),
}));
