export interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
  readTime: string;
  description: string;
  tag: string;
  image: string;
}

export const articlesData: Article[] = [
  {
    id: 1,
    title: "The Hidden Gems of Nubra Valley",
    author: "Tenzin Dorjay",
    date: "June 5, 2024",
    readTime: "8 min read",
    description:
      "Discover the lesser-known attractions of Nubra Valley, from secret hot springs to ancient petroglyphs that few tourists ever see.",
    tag: "Travel guide",
    image: "/images/nubra.jpg",
  },
  {
    id: 2,
    title: "Photographing Pangong Lake: A Complete Guide",
    author: "Diki Dolma",
    date: "May 28, 2024",
    readTime: "12 min read",
    description:
      "Learn the best techniques, locations, and times to capture the ever-changing colors of Pangong lake through your lens.",
    tag: "Photography",
    image: "/images/pangong.jpg",
  },
  {
    id: 3,
    title: "Ladakhi Cuisine: Beyond Momos and Thukpa",
    author: "Sonam Yangzom",
    date: "May 15, 2024",
    readTime: "10 min read",
    description:
      "Explore the rich culinary traditions of Ladakh, featuring ancient recipes and unique ingredients from the high-altitude desert.",
    tag: "Food and culture",
    image: "/images/ladakhi-cuisine.jpg",
  },
  {
    id: 4,
    title: "Winter in Ladakh: The Road Less Traveled",
    author: "Rigzin Namgyal",
    date: "April 30, 2024",
    readTime: "15 min read",
    description:
      "Discover the magical winter landscape of Ladakh when tourists are few and the frozen rivers create a surreal wonderland.",
    tag: "Adventure",
    image: "/images/winter-ladakh.jpg",
  },
];

export const videosData = [
    { src: "/images/ladakh-journey.jpg", title: "Journey Through Ladakh: A Visual Odyssey", duration: "12:05" },
    { src: "/images/khardung.jpg", title: "Riding the Highest Roads: Khardung La Pass", duration: "07:17" },
    { src: "/images/monastic-life.jpg", title: "Monastic Life in Ladakh: A Day with the Monks", duration: "12:55" },
];

export const categoriesData = ["All Categories", "Travel guide", "Photography", "Food & culture", "Adventure", "Eco-Tourism"];