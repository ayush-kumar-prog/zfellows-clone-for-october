import type { Testimonial } from "@/types/content";
import { localAsset } from "@/lib/asset";

export const testimonials: Testimonial[] = [
  {
    author: "Avante P.",
    authorRole: "Founder of Posh",
    quote:
      "My co-founder and I were just two college students, working harder on our idea than our schoolwork, looking for the slightest signal that we were supposed to drop out. Z Fellows was that signal. Just 2 months after joining Z Fellows, we dropped out and have never looked back.",
    authorImage: localAsset(
      "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/6500f6febcfcd8c8ec2e68fe_avante-headshot.jpeg",
    ),
  },
  {
    author: "Kian S.",
    authorRole: "Founder of Nucleus",
    quote:
      "I was in my bedroom at home building Nucleus for more than a year. I dropped out of school. My parents looked at me like I was crazy. My friends looked at me like I was crazy. Society looked at me like I was crazy. I was losing my mind. I was a one man show in my bedroom. I texted Cory and several days later was on a flight to SF.",
    authorImage: localAsset(
      "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/639eb339bf9aafb2bcf792a6_M4IFVWyX_400x400%20(1).jpeg",
    ),
  },
  {
    author: "Ali D.",
    authorRole: "Founder of swsh",
    quote:
      "Z Fellows was such a cool opportunity for me to meet other young founders that are super ambitious and kind and compassionate to each other. In the community, people are so supportive with everything from intros to engineering work — I could not recommend Z Fellows more!",
    authorImage: localAsset(
      "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/67098b12bc065eead588a502_1708901490118.jpeg",
    ),
  },
  {
    author: "Cameron Z.",
    authorRole: "Founder of Whop.com",
    quote:
      "When we first got into Z Fellows, we didn't know exactly what to expect. Before we knew it, we were on the phone with the founder of Tinder talking about our company! Cory has helped us immensely at every stage of the startup process and if you're starting a company, applying to Z Fellows is the best thing you can do.",
    authorImage: localAsset(
      "https://cdn.prod.website-files.com/638f9506ec81ea880c332009/639eab36406f2f75959c4491_1566225517792%20(1).jpeg",
    ),
  },
];
