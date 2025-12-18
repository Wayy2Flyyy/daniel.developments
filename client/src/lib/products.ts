import heroImg from '@assets/generated_images/dark_glassy_abstract_hero_background.png';
import fivemImg from '@assets/generated_images/fivem_server_hud_interface.png';
import botImg from '@assets/generated_images/discord_bot_avatar.png';
import gameImg from '@assets/generated_images/bored_game_app_icon.png';
import desktopImg from '@assets/generated_images/desktop_app_dashboard_ui.png';
import pluginsImg from '@assets/generated_images/mortal_plugins_product_box.png';
import pythonImg from '@assets/generated_images/python_script_icon.png';
import webImg from '@assets/generated_images/web_template_thumbnail.png';
import appImg from '@assets/generated_images/desktop_application_icon.png';
import configImg from '@assets/generated_images/config_file_icon.png';
import codeImg from '@assets/generated_images/raw_code_snippet.png';

export type ProductCategory = 'FiveM Resources' | 'Applications' | 'Web Templates' | 'Developer Tools' | 'Misc';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: ProductCategory | string;
  features: string[];
  type: 'product' | 'project';
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
    image: fivemImg, 
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
  // FiveM Scripts
  {
    id: 1,
    name: "Mortal Admin Panel",
    price: 49,
    description: "The ultimate controller-first admin menu for FiveM. Features sleek F4 trigger, player management, and live server metrics.",
    image: pluginsImg,
    category: "FiveM Resources",
    features: ["Controller Support", "Live Metrics", "Ban/Kick System", "Permissions Integration"],
    type: 'product'
  },
  {
    id: 2,
    name: "Mortal HUD System",
    price: 29,
    description: "A standalone, highly optimized HUD overlay. Fully customizable, minimal impact on performance, and beautiful animations.",
    image: fivemImg,
    category: "FiveM Resources",
    features: ["0.01ms CPU Usage", "Fully Customizable", "Status Indicators", "Vehicle HUD"],
    type: 'product'
  },
  {
    id: 3,
    name: "Mortal Chat iOS",
    price: 19,
    description: "Replace the default chat with a modern, iOS-inspired communication interface. Supports emojis, image embedding, and distinct channels.",
    image: botImg,
    category: "FiveM Resources",
    features: ["iOS Aesthetic", "Image Embeds", "Channel Support", "Spam Protection"],
    type: 'product'
  },
  {
    id: 4,
    name: "Mortal Economy Core",
    price: 89,
    description: "The backbone of your server's economy. Secure, exploit-proof money handling with banking, cash, and robbery integration.",
    image: pluginsImg,
    category: "FiveM Resources",
    features: ["Exploit Proof", "Banking UI", "Robbery API", "Transaction Logs"],
    type: 'product'
  },
  {
    id: 5,
    name: "Advanced Robbery System",
    price: 35,
    description: "Complex heist mechanics with minigames, silent alarms, and police dispatch integration.",
    image: fivemImg,
    category: "FiveM Resources",
    features: ["Minigames", "Police Dispatch", "Cooldowns", "Loot Tables"],
    type: 'product'
  },

  // Applications
  {
    id: 6,
    name: "Server Launcher Pro",
    price: 25,
    description: "White-label desktop launcher for your game server. Auto-updates, cache clearing, and news feed.",
    image: appImg,
    category: "Applications",
    features: ["Auto-Updater", "Cache Clear", "News Feed", "White Label"],
    type: 'product'
  },
  {
    id: 7,
    name: "Log Viewer Desktop",
    price: 15,
    description: "A dedicated desktop app for parsing and viewing server logs in real-time with regex search and highlighting.",
    image: appImg,
    category: "Applications",
    features: ["Real-time Stream", "Regex Search", "Syntax Highlighting", "Export to CSV"],
    type: 'product'
  },
  {
    id: 8,
    name: "Texture Compressor Tool",
    price: 12,
    description: "Drag-and-drop utility to optimize game textures without losing visible quality. Essential for server performance.",
    image: appImg,
    category: "Applications",
    features: ["Batch Processing", "Lossless Mode", "DDS Support", "Drag & Drop"],
    type: 'product'
  },

  // Web Templates
  {
    id: 9,
    name: "Nexus Community Portal",
    price: 59,
    description: "Full-stack React template for gaming communities. Includes forums, store, and stats integration pages.",
    image: webImg,
    category: "Web Templates",
    features: ["React & Tailwind", "Forum Layout", "Store Integration", "Mobile Responsive"],
    type: 'product'
  },
  {
    id: 10,
    name: "Status Page Modern",
    price: 15,
    description: "Clean, auto-updating status page template to show your services uptime. Connects easily to UptimeRobot API.",
    image: webImg,
    category: "Web Templates",
    features: ["API Integration", "Dark Mode", "Incident History", "Fast Loading"],
    type: 'product'
  },
  {
    id: 11,
    name: "Loading Screen V4",
    price: 10,
    description: "Cinematic loading screen for FiveM servers with background video, music player, and staff roster.",
    image: webImg,
    category: "Web Templates",
    features: ["Video Background", "Music Player", "Staff List", "Configurable"],
    type: 'product'
  },

  // Developer Tools (Raw Code, Python, etc)
  {
    id: 12,
    name: "Discord Bot Boilerplate (Python)",
    price: 19,
    description: "Production-ready Python bot structure with Cog loading, database connection, and error handling pre-configured.",
    image: pythonImg,
    category: "Developer Tools",
    features: ["Cog Loader", "PostgreSQL Ready", "Error Handling", "Slash Commands"],
    type: 'product'
  },
  {
    id: 13,
    name: "Anti-Cheat Core (Lua)",
    price: 99,
    description: "Raw Lua source code for a robust anti-cheat system. Detects injections, triggers, and abnormal player values.",
    image: codeImg,
    category: "Developer Tools",
    features: ["Source Code", "Injection Detect", "Godmode Check", "Trigger Protection"],
    type: 'product'
  },
  {
    id: 14,
    name: "Data Scraper Script",
    price: 9,
    description: "Python script for scraping public game server data for analytics. Includes proxy rotation support.",
    image: pythonImg,
    category: "Developer Tools",
    features: ["Proxy Support", "Fast Async", "JSON Export", "Scheduler"],
    type: 'product'
  },

  // Misc
  {
    id: 15,
    name: "Ultimate VSCode Theme",
    price: 5,
    description: "My personal VSCode theme configuration. Optimized for long coding sessions with high contrast and eye-care colors.",
    image: configImg,
    category: "Misc",
    features: ["High Contrast", "Eye Care", "Custom Icons", "Semantic Highlighting"],
    type: 'product'
  },
  {
    id: 16,
    name: "Server Config Generator",
    price: 0,
    description: "Simple web tool to generate complex server.cfg files with best practices applied automatically.",
    image: configImg,
    category: "Misc",
    features: ["Best Practices", "One-Click Gen", "Validation", "Free Tool"],
    type: 'product'
  },
  {
    id: 17,
    name: "Stream Deck Icons Pack",
    price: 8,
    description: "Pack of 200+ icons specifically designed for developers and server admins using Stream Decks.",
    image: configImg,
    category: "Misc",
    features: ["200+ Icons", "PSD Included", "Vector SVG", "Dark/Light Variants"],
    type: 'product'
  }
];

export const heroImage = heroImg;
