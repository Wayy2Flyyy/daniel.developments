import { db } from "../db/index.js";
import { products } from "../shared/schema.js";

const seedProducts = async () => {
  console.log("🌱 Seeding products...");

  const productsData = [
    // C# Applications
    {
      name: "NetworkMonitor",
      price: 15,
      description: "Monitor network traffic and connections in real-time. Built with C# for Windows desktop environments. Note: Application ships without bundled content; you receive a ready-to-customize application.",
      image: "/generated_images/desktop_application_icon.png",
      category: "Applications",
      features: ["Real-time Monitoring", "Connection Tracking", "Traffic Analysis", "Windows Native"],
      type: "product"
    },
    {
      name: "Mixer",
      price: 12,
      description: "Audio mixing and control application with modern UI. Built with C# for professional audio management. Note: Application ships without bundled content; you receive a ready-to-customize application.",
      image: "/generated_images/desktop_application_icon.png",
      category: "Applications",
      features: ["Audio Control", "Multi-Channel Support", "Modern UI", "Low Latency"],
      type: "product"
    },
    {
      name: "Devtool",
      price: 18,
      description: "Essential developer utilities and tools in one application. Built with C# for streamlined development workflow. Note: Application ships without bundled content; you receive a ready-to-customize application.",
      image: "/generated_images/desktop_application_icon.png",
      category: "Applications",
      features: ["Developer Utils", "Code Tools", "Productivity Suite", "Windows Native"],
      type: "product"
    },
    // Python Applications (£2 each)
    {
      name: "Login/Register System",
      price: 2,
      description: "Complete authentication system with login and registration functionality. Built with Python. Note: Application ships without bundled content; you receive a ready-to-customize application.",
      image: "/generated_images/python_script_icon.png",
      category: "Applications",
      features: ["User Authentication", "Registration Flow", "Password Security", "Python Based"],
      type: "product"
    },
    {
      name: "Image Convertor",
      price: 2,
      description: "Convert images between multiple formats with ease. Built with Python for batch processing. Note: Application ships without bundled content; you receive a ready-to-customize application.",
      image: "/generated_images/python_script_icon.png",
      category: "Applications",
      features: ["Multiple Formats", "Batch Processing", "Quality Control", "Python Based"],
      type: "product"
    },
    {
      name: "Application Use & Gaming Stopwatch",
      price: 2,
      description: "Track time spent on applications and games. Built with Python for detailed usage analytics. Note: Application ships without bundled content; you receive a ready-to-customize application.",
      image: "/generated_images/python_script_icon.png",
      category: "Applications",
      features: ["Time Tracking", "Usage Analytics", "Gaming Stats", "Python Based"],
      type: "product"
    },
    {
      name: "Calculator Template",
      price: 2,
      description: "Customizable calculator template for various calculation needs. Built with Python. Note: Application ships without bundled content; you receive a ready-to-customize application.",
      image: "/generated_images/python_script_icon.png",
      category: "Applications",
      features: ["Customizable", "Multiple Operations", "Clean UI", "Python Based"],
      type: "product"
    },
    // Main Project
    {
      name: "Secure Vault",
      price: 49,
      description: "Secure Vault represents a new approach to personal data security — one that prioritizes your privacy, gives you complete control, and doesn't compromise on usability or design. Whether you're a security-conscious individual, a professional handling sensitive data, or just someone who wants better password management, Secure Vault provides a trustworthy, transparent solution. Built with C#, TypeScript, HTML, CSS, and JavaScript. Note: Application ships without bundled content; you receive a ready-to-customize application.",
      image: "/generated_images/desktop_application_icon.png",
      category: "Applications",
      features: ["End-to-End Encryption", "Web Interface", "Secure Storage", "Multi-Platform"],
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
