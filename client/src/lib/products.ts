import heroImg from '@assets/generated_images/dark_glassy_abstract_hero_background.png';
import fivemImg from '@assets/generated_images/fivem_server_hud_interface.png';
import botImg from '@assets/generated_images/discord_bot_avatar.png';
import gameImg from '@assets/generated_images/bored_game_app_icon.png';
import desktopImg from '@assets/generated_images/desktop_app_dashboard_ui.png';
import pluginsImg from '@assets/generated_images/mortal_plugins_product_box.png';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  features: string[];
  type: 'product' | 'project'; // Distinguish between sellable items and portfolio pieces
}

// Portfolio Projects (Not for sale, but showcased)
export const portfolioProjects: Product[] = [
  {
    id: 101,
    name: "FiveM / CFX.re Ecosystem",
    price: 0,
    description: "A comprehensive suite of modular systems including standalone HUD, advanced iOS-inspired chat UI, and robbery economy mechanics.",
    image: fivemImg,
    category: "Game Engineering",
    features: ["Standalone Architecture", "Custom HUD & UI", "Economy Systems", "Exploit Prevention"],
    type: 'project'
  },
  {
    id: 102,
    name: "Discord Ops Bot",
    price: 0,
    description: "Operational infrastructure for communities. Dynamic status, slash commands, and moderation tools reducing manual admin workload.",
    image: botImg,
    category: "Automation",
    features: ["Slash Commands", "Auto-Moderation", "Support Hub Integration", "Dynamic Status"],
    type: 'project'
  },
  {
    id: 103,
    name: "100Racks Server",
    price: 0,
    description: "A complete rebrand and technical overhaul of a FiveM server, transforming it from a generic pack into a unique product experience.",
    image: fivemImg, // Reusing FiveM img for context
    category: "Server Development",
    features: ["Brand Identity", "Custom Framework", "UI Overhaul", "Unique Gameplay Loop"],
    type: 'project'
  },
  {
    id: 104,
    name: "\"Bored.\" Game",
    price: 0,
    description: "A premium-feeling casual game with deep progression systems, smooth UI, and satisfying feedback loops.",
    image: gameImg,
    category: "Game Design",
    features: ["Progression System", "Premium UI/UX", "Achievements", "Combo Mechanics"],
    type: 'project'
  },
  {
    id: 105,
    name: "Runtime Tracker App",
    price: 0,
    description: "Python-based desktop application for tracking app usage with a modern OS-like interface and data visualization.",
    image: desktopImg,
    category: "Desktop Software",
    features: ["Python & Qt", "Data Visualization", "Auto-Tracking", "Modern Dark UI"],
    type: 'project'
  }
];

// Mortal Plugins (Sellable Products)
export const products: Product[] = [
  {
    id: 1,
    name: "Mortal Admin Panel",
    price: 49,
    description: "The ultimate controller-first admin menu for FiveM. Features sleek F4 trigger, player management, and live server metrics.",
    image: pluginsImg,
    category: "Scripts",
    features: ["Controller Support", "Live Metrics", "Ban/Kick System", "Permissions Integration"],
    type: 'product'
  },
  {
    id: 2,
    name: "Mortal HUD System",
    price: 29,
    description: "A standalone, highly optimized HUD overlay. customizable, minimal impact on performance, and beautiful animations.",
    image: fivemImg, // Contextual
    category: "UI Components",
    features: ["0.01ms CPU Usage", "Fully Customizable", "Status Indicators", "Vehicle HUD"],
    type: 'product'
  },
  {
    id: 3,
    name: "Mortal Chat iOS",
    price: 19,
    description: "Replace the default chat with a modern, iOS-inspired communication interface. Supports emojis, image embedding, and distinct channels.",
    image: botImg, // Contextual abstract
    category: "UI Components",
    features: ["iOS Aesthetic", "Image Embeds", "Channel Support", "Spam Protection"],
    type: 'product'
  },
  {
    id: 4,
    name: "Mortal Economy Core",
    price: 89,
    description: "The backbone of your server's economy. Secure, exploit-proof money handling with banking, cash, and robbery integration.",
    image: pluginsImg,
    category: "Core Systems",
    features: ["Exploit Proof", "Banking UI", "Robbery API", "Transaction Logs"],
    type: 'product'
  }
];

export const heroImage = heroImg;
