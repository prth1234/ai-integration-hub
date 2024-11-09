export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Chatbot App",
  description: "Chat with AI, save and manage your conversations with ease.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "How it Works",
      href: "/how-it-works",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "History",
      href: "/history",
    },
    {
      label: "Saved Chats",
      href: "/saved-chats",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Feedback",
      href: "/feedback",
    },
    {
      label: "Help & Support",
      href: "/help-support",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/your-repo/chatbot-app",
    twitter: "https://twitter.com/your-twitter",
    docs: "https://docs.chatbot-app.com",
    discord: "https://discord.gg/yourdiscordlink",
    sponsor: "https://patreon.com/yourpatreon",
  },
};