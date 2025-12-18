import heroImg from '@assets/generated_images/minimalist_living_room_hero_background.png';
import vaseImg from '@assets/generated_images/ceramic_vase_product_shot.png';
import headphonesImg from '@assets/generated_images/headphones_product_shot.png';
import coffeeImg from '@assets/generated_images/coffee_set_product_shot.png';
import notebookImg from '@assets/generated_images/notebook_product_shot.png';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Ceramic Artisan Vase",
    price: 89,
    description: "Hand-thrown ceramic vase with a matte beige glaze. Perfect for dried arrangements or fresh blooms. Each piece is unique and crafted by local artisans.",
    image: vaseImg,
    category: "Home Decor",
    features: ["Hand-thrown ceramic", "Matte glaze finish", "Dishwasher safe", "8.5 inches tall"]
  },
  {
    id: 2,
    name: "H-1 Noise Cancelling Headphones",
    price: 299,
    description: "Experience silence with our premium active noise-cancelling headphones. Featuring 30-hour battery life and studio-quality sound in a sleek, matte black finish.",
    image: headphonesImg,
    category: "Electronics",
    features: ["Active Noise Cancellation", "30-hour battery life", "Bluetooth 5.0", "Premium memory foam earcups"]
  },
  {
    id: 3,
    name: "Pour-Over Coffee Set",
    price: 65,
    description: "Elevate your morning ritual with this elegant glass and wood pour-over set. Designed for the perfect extraction, ensuring a rich and flavorful cup every time.",
    image: coffeeImg,
    category: "Kitchen",
    features: ["Borosilicate glass", "Acacia wood handle", "Stainless steel filter", "Makes 3-4 cups"]
  },
  {
    id: 4,
    name: "Heirloom Leather Notebook",
    price: 45,
    description: "A notebook designed to last a lifetime. Full-grain vegetable-tanned leather cover that patinas beautifully with age. Refillable paper inserts.",
    image: notebookImg,
    category: "Stationery",
    features: ["Full-grain leather", "100gsm acid-free paper", "Refillable design", "Hand-stitched binding"]
  }
];

export const heroImage = heroImg;
