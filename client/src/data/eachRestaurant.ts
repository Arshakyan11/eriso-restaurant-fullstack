import { nanoid } from "nanoid";
import {
  losRestImg1,
  losRestImg2,
  losRestImg3,
  losRestImg4,
  tokyoRestImg1,
  tokyoRestImg2,
  tokyoRestImg3,
  tokyoRestImg4,
  yerRestImg1,
  yerRestImg2,
  yerRestImg3,
  yerRestImg4,
} from "../components/Images";
import type { EachRestaurantType } from "../types";

export const eachRestaurantData: EachRestaurantType[] = [
  {
    id: nanoid(2),
    location: "at Yerevan",
    address: "3 Amiryan Street, Yerevan 0010, Armenia",
    phone: "+374 10 123456",
    email: "erikarshakyan222@gmail.com",
    workingTime: "Working Time: Mon-Sun: 10:00 AM to 11:00 PM",
    city: "Yerevan",
    info: "Located in the lively center of Yerevan, just steps from Republic Square, our Armenia branch offers a warm and traditional atmosphere where culture and cuisine come together. Decorated with handcrafted woodwork and Armenian art, the restaurant serves time-honored dishes like khorovats, tolma, and fresh lavash from our tonir oven. Perfect for tourists and locals, Lavash Yerevan is the ideal place to experience authentic Armenian hospitality, flavors, and music in one unforgettable meal.",
    iframeLink:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.427700215288!2d44.507304675733624!3d40.17761117147554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4041dba714a7bb4f%3A0xe8a02c9c245b5589!2s3%20Amiryan%20St%2C%20Yerevan%200010%2C%20Armenia!5e0!3m2!1sen!2sam!4v1716901058041!5m2!1sen!2sam",
    images: [yerRestImg1, yerRestImg2, yerRestImg3, yerRestImg4],
  },
  {
    id: nanoid(2),
    location: "at Los Angeles",
    address: "5125 Melrose Avenue Los Angeles, CA 90038",
    email: "yerevan@lavashrestaurant.com",
    phone: "+37477112233",
    workingTime: "Workiing Time: Mon-Sun: 10:00 AM to 11:00 PM",
    city: "Los Angeles",
    info: "Located in the heart of Los Angeles, our LA branch brings a taste of authentic Armenian and Mediterranean cuisine to the  West Coast. With a stylish modern interior, warm ambiance, and a  spacious outdoor patio, its the perfect place for both casual  dinners and special gatherings.From our handmade lavash bread  baked daily in-house to our grilled kebabs, dolma, and signature  pomegranate lamb, every dish is made with care using traditional  recipes and the freshest ingredients. ",
    iframeLink:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55402.18801908369!2d-118.40614951772898!3d34.12382709270203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2z0JvQvtGBLdCQ0L3QtNC20LXQu9C10YEsINCa0LDQu9C40YTQvtGA0L3QuNGPLCDQodCo0JA!5e0!3m2!1sru!2sam!4v1748379682365!5m2!1sru!2sam",
    images: [losRestImg1, losRestImg2, losRestImg3, losRestImg4],
  },
  {
    id: nanoid(2),
    location: "at Tokyo",
    address: "1-1-2 Oshiage, Sumida City, Tokyo 131-0045, Japan",
    phone: "+81 3-1234-5678",
    email: "tokyo@lavashrestaurant.com",
    workingTime: "Working Time: Mon-Sun: 11:00 AM to 10:00 PM",
    city: "Tokyo",
    info: "Located near the famous Tokyo Skytree, our Tokyo branch offers a perfect fusion of traditional Armenian hospitality and modern Japanese precision. The restaurant features a sleek, minimalist design with warm wood accents, creating a calm and inviting dining atmosphere. Guests can enjoy Armenian classics like grilled meats, dolma, and freshly baked lavash, paired with locally inspired drinks and desserts. Ideal for travelers and locals alike, Lavash Tokyo brings a unique cultural and culinary experience to the vibrant heart of Japan's capital.",
    iframeLink:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0321739813986!2d139.8130299756538!3d35.71006237257942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188ecfa70a047b%3A0x3e672b63f0c19e5c!2sTokyo%20Skytree!5e0!3m2!1sen!2sjp!4v1716900558041!5m2!1sen!2sjp",
    images: [tokyoRestImg1, tokyoRestImg2, tokyoRestImg3, tokyoRestImg4],
  },
];
