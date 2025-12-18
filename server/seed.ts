import { db } from "../db/index.js";
import { products } from "../shared/schema.js";

const seedProducts = async () => {
  console.log("🌱 Seeding products...");

  const productsData = [
    // FiveM Scripts
    {
      name: "Mortal Admin Panel",
      price: 49,
      description: "The ultimate controller-first admin menu for FiveM. Features sleek F4 trigger, player management, and live server metrics.",
      image: "/generated_images/mortal_plugins_product_box.png",
      category: "FiveM Resources",
      features: ["Controller Support", "Live Metrics", "Ban/Kick System", "Permissions Integration"],
      type: "product"
    },
    {
      name: "Mortal HUD System",
      price: 29,
      description: "A standalone, highly optimized HUD overlay. Fully customizable, minimal impact on performance, and beautiful animations.",
      image: "/generated_images/fivem_server_hud_interface.png",
      category: "FiveM Resources",
      features: ["0.01ms CPU Usage", "Fully Customizable", "Status Indicators", "Vehicle HUD"],
      type: "product"
    },
    {
      name: "Mortal Chat iOS",
      price: 19,
      description: "Replace the default chat with a modern, iOS-inspired communication interface. Supports emojis, image embedding, and distinct channels.",
      image: "/generated_images/discord_bot_avatar.png",
      category: "FiveM Resources",
      features: ["iOS Aesthetic", "Image Embeds", "Channel Support", "Spam Protection"],
      type: "product"
    },
    {
      name: "Mortal Economy Core",
      price: 89,
      description: "The backbone of your server's economy. Secure, exploit-proof money handling with banking, cash, and robbery integration.",
      image: "/generated_images/mortal_plugins_product_box.png",
      category: "FiveM Resources",
      features: ["Exploit Proof", "Banking UI", "Robbery API", "Transaction Logs"],
      type: "product"
    },
    {
      name: "Advanced Robbery System",
      price: 35,
      description: "Complex heist mechanics with minigames, silent alarms, and police dispatch integration.",
      image: "/generated_images/fivem_server_hud_interface.png",
      category: "FiveM Resources",
      features: ["Minigames", "Police Dispatch", "Cooldowns", "Loot Tables"],
      type: "product"
    },
    // Applications
    {
      name: "Server Launcher Pro",
      price: 25,
      description: "White-label desktop launcher for your game server. Auto-updates, cache clearing, and news feed.",
      image: "/generated_images/desktop_application_icon.png",
      category: "Applications",
      features: ["Auto-Updater", "Cache Clear", "News Feed", "White Label"],
      type: "product"
    },
    {
      name: "Log Viewer Desktop",
      price: 15,
      description: "A dedicated desktop app for parsing and viewing server logs in real-time with regex search and highlighting.",
      image: "/generated_images/desktop_application_icon.png",
      category: "Applications",
      features: ["Real-time Stream", "Regex Search", "Syntax Highlighting", "Export to CSV"],
      type: "product"
    },
    {
      name: "Texture Compressor Tool",
      price: 12,
      description: "Drag-and-drop utility to optimize game textures without losing visible quality. Essential for server performance.",
      image: "/generated_images/desktop_application_icon.png",
      category: "Applications",
      features: ["Batch Processing", "Lossless Mode", "DDS Support", "Drag & Drop"],
      type: "product"
    },
    // Web Templates
    {
      name: "Nexus Community Portal",
      price: 59,
      description: "Full-stack React template for gaming communities. Includes forums, store, and stats integration pages.",
      image: "/generated_images/web_template_thumbnail.png",
      category: "Web Templates",
      features: ["React & Tailwind", "Forum Layout", "Store Integration", "Mobile Responsive"],
      type: "product"
    },
    {
      name: "Status Page Modern",
      price: 15,
      description: "Clean, auto-updating status page template to show your services uptime. Connects easily to UptimeRobot API.",
      image: "/generated_images/web_template_thumbnail.png",
      category: "Web Templates",
      features: ["API Integration", "Dark Mode", "Incident History", "Fast Loading"],
      type: "product"
    },
    {
      name: "Loading Screen V4",
      price: 10,
      description: "Cinematic loading screen for FiveM servers with background video, music player, and staff roster.",
      image: "/generated_images/web_template_thumbnail.png",
      category: "Web Templates",
      features: ["Video Background", "Music Player", "Staff List", "Configurable"],
      type: "product"
    },
    // Developer Tools
    {
      name: "Discord Bot Boilerplate (Python)",
      price: 19,
      description: "Production-ready Python bot structure with Cog loading, database connection, and error handling pre-configured.",
      image: "/generated_images/python_script_icon.png",
      category: "Developer Tools",
      features: ["Cog Loader", "PostgreSQL Ready", "Error Handling", "Slash Commands"],
      type: "product"
    },
    {
      name: "Anti-Cheat Core (Lua)",
      price: 99,
      description: "Raw Lua source code for a robust anti-cheat system. Detects injections, triggers, and abnormal player values.",
      image: "/generated_images/raw_code_snippet.png",
      category: "Developer Tools",
      features: ["Source Code", "Injection Detect", "Godmode Check", "Trigger Protection"],
      type: "product"
    },
    {
      name: "Data Scraper Script",
      price: 9,
      description: "Python script for scraping public game server data for analytics. Includes proxy rotation support.",
      image: "/generated_images/python_script_icon.png",
      category: "Developer Tools",
      features: ["Proxy Support", "Fast Async", "JSON Export", "Scheduler"],
      type: "product"
    },
    // Misc
    {
      name: "Ultimate VSCode Theme",
      price: 5,
      description: "My personal VSCode theme configuration. Optimized for long coding sessions with high contrast and eye-care colors.",
      image: "/generated_images/config_file_icon.png",
      category: "Misc",
      features: ["High Contrast", "Eye Care", "Custom Icons", "Semantic Highlighting"],
      type: "product"
    },
    {
      name: "Server Config Generator",
      price: 0,
      description: "Simple web tool to generate complex server.cfg files with best practices applied automatically.",
      image: "/generated_images/config_file_icon.png",
      category: "Misc",
      features: ["Best Practices", "One-Click Gen", "Validation", "Free Tool"],
      type: "product"
    },
    {
      name: "Stream Deck Icons Pack",
      price: 8,
      description: "Pack of 200+ icons specifically designed for developers and server admins using Stream Decks.",
      image: "/generated_images/config_file_icon.png",
      category: "Misc",
      features: ["200+ Icons", "PSD Included", "Vector SVG", "Dark/Light Variants"],
      type: "product"
    }
  ];

  try {
    await db.insert(products).values(productsData);
    console.log("✅ Products seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding products:", error);
  }

  process.exit(0);
};

seedProducts();
