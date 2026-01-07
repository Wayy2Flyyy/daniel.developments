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
  // C# Applications
  {
    id: 1,
    name: "NetworkMonitor",
    price: 15,
    description: "Monitor network traffic and connections in real-time. Built with C# for Windows desktop environments. Note: Application ships without bundled content; you receive a ready-to-customize application.",
    image: appImg,
    category: "Applications",
    features: ["C#", "Windows Native", "Real-time Monitoring", "Connection Tracking", "Traffic Analysis"],
    type: 'product'
  },
  {
    id: 2,
    name: "Mixer",
    price: 12,
    description: "Audio mixing and control application with modern UI. Built with C# for professional audio management. Note: Application ships without bundled content; you receive a ready-to-customize application.",
    image: appImg,
    category: "Applications",
    features: ["C#", "Windows Native", "Audio Control", "Multi-Channel Support", "Modern UI", "Low Latency"],
    type: 'product'
  },
  {
    id: 3,
    name: "Devtool",
    price: 18,
    description: "Essential developer utilities and tools in one application. Built with C# for streamlined development workflow. Note: Application ships without bundled content; you receive a ready-to-customize application.",
    image: appImg,
    category: "Applications",
    features: ["C#", "Windows Native", "Developer Utils", "Code Tools", "Productivity Suite"],
    type: 'product'
  },

  // Python Applications (£2 each)
  {
    id: 4,
    name: "Login/Register System",
    price: 2,
    description: "Complete authentication system with login and registration functionality. Built with Python. Note: Application ships without bundled content; you receive a ready-to-customize application.",
    image: pythonImg,
    category: "Applications",
    features: ["Python", "Python Based", "User Authentication", "Registration Flow", "Password Security"],
    type: 'product'
  },
  {
    id: 5,
    name: "Image Convertor",
    price: 2,
    description: "Convert images between multiple formats with ease. Built with Python for batch processing. Note: Application ships without bundled content; you receive a ready-to-customize application.",
    image: pythonImg,
    category: "Applications",
    features: ["Python", "Python Based", "Multiple Formats", "Batch Processing", "Quality Control"],
    type: 'product'
  },
  {
    id: 6,
    name: "Application Use & Gaming Stopwatch",
    price: 2,
    description: "Track time spent on applications and games. Built with Python for detailed usage analytics. Note: Application ships without bundled content; you receive a ready-to-customize application.",
    image: pythonImg,
    category: "Applications",
    features: ["Python", "Python Based", "Time Tracking", "Usage Analytics", "Gaming Stats"],
    type: 'product'
  },
  {
    id: 7,
    name: "Calculator Template",
    price: 2,
    description: "Customizable calculator template for various calculation needs. Built with Python. Note: Application ships without bundled content; you receive a ready-to-customize application.",
    image: pythonImg,
    category: "Applications",
    features: ["Python", "Python Based", "Customizable", "Multiple Operations", "Clean UI"],
    type: 'product'
  },

  // Main Project
  {
    id: 8,
    name: "Secure Vault",
    price: 49,
    description: "Secure Vault represents a new approach to personal data security — one that prioritizes your privacy, gives you complete control, and doesn't compromise on usability or design. Whether you're a security-conscious individual, a professional handling sensitive data, or just someone who wants better password management, Secure Vault provides a trustworthy, transparent solution. Built with C#, TypeScript, HTML, CSS, and JavaScript. Note: Application ships without bundled content; you receive a ready-to-customize application.",
    image: appImg,
    category: "Applications",
    features: ["C#", "TypeScript", "Web Interface", "End-to-End Encryption", "Secure Storage", "Multi-Platform"],
    type: 'product'
  }
];

export const heroImage = heroImg;
