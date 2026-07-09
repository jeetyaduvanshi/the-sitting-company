export interface Category {
  id: string;
  name: string;
  count: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: "office-chairs",
    name: "Office Chairs",
    count: "24 Products",
    image: "/images/monarch_executive.webp",
  },
  {
    id: "visitor-conference",
    name: "Visitor & Conference Chairs",
    count: "16 Products",
    image: "/images/monarch_executive.webp",
  },
  {
    id: "folding-chairs",
    name: "Folding Chairs",
    count: "12 Products",
    image: "/images/folding_chair.webp",
  },
  {
    id: "study-chairs",
    name: "Study Chairs",
    count: "18 Products",
    image: "/images/study_chair.webp",
  },
  {
    id: "ergonomic-chairs",
    name: "Ergonomic Chairs",
    count: "28 Products",
    image: "/images/aeron_pro.webp",
  },
  {
    id: "bar-stools",
    name: "Bar Stools",
    count: "14 Products",
    image: "/images/bar_stool.webp",
  },
  {
    id: "lounge-chairs",
    name: "Lounge Chairs",
    count: "20 Products",
    image: "/images/sovereign_lounge.webp",
  },
  {
    id: "gaming-chairs",
    name: "Gaming Chairs",
    count: "10 Products",
    image: "/images/gaming_chair.webp",
  },
];
