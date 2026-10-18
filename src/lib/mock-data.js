
const getPastDate = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split("T")[0]; 
};

export let gigs = [
  {
    id: "1",
    title: "React Bug Fix — Fast & Reliable",
    shortDescription: "Fix React bugs, hooks issues, and performance problems.",
    fullDescription: "I will fix React bugs, state management issues, hook problems, and optimize your app's performance.",
    category: "Frontend",
    budget: 5000,
    deliveryDays: 2,
    skills: ["React", "Next.js", "TypeScript"],
    sellerName: "Rahim Ahmed",
    sellerRating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", 
    createdAt: getPastDate(15), 
  },
  {
    id: "2",
    title: "Next.js Landing Page in 3 Days",
    shortDescription: "Modern, responsive Next.js landing page with Tailwind.",
    fullDescription: "I will build a fully responsive, SEO-optimized landing page using Next.js App Router, Tailwind CSS, and Framer Motion.",
    category: "Frontend",
    budget: 8000,
    deliveryDays: 3,
    skills: ["Next.js", "Tailwind", "Framer Motion"],
    sellerName: "Sadia Khan",
    sellerRating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    createdAt: getPastDate(12), 
  },
  {
    id: "3",
    title: "REST API with Node.js & Express",
    shortDescription: "Build secure REST APIs with authentication.",
    fullDescription: "I will develop a scalable REST API using Node.js, Express, MongoDB, and JWT authentication.",
    category: "Backend",
    budget: 12000,
    deliveryDays: 5,
    skills: ["Node.js", "Express", "MongoDB"],
    sellerName: "Tanvir Hasan",
    sellerRating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    createdAt: getPastDate(10), 
  },
  {
    id: "4",
    title: "Flutter App UI Development",
    shortDescription: "Pixel-perfect Flutter UI from Figma design.",
    fullDescription: "I will convert your Figma design into a pixel-perfect Flutter app UI with smooth animations.",
    category: "Mobile",
    budget: 15000,
    deliveryDays: 7,
    skills: ["Flutter", "Dart", "Figma"],
    sellerName: "Nusrat Jahan",
    sellerRating: 5.0,
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    createdAt: getPastDate(8), 
  },
  {
    id: "5",
    title: "Docker & CI/CD Setup",
    shortDescription: "Dockerize your app and set up CI/CD pipeline.",
    fullDescription: "I will containerize your application with Docker, set up GitHub Actions for CI/CD.",
    category: "DevOps",
    budget: 10000,
    deliveryDays: 4,
    skills: ["Docker", "GitHub Actions", "AWS"],
    sellerName: "Arif Chowdhury",
    sellerRating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80",
    createdAt: getPastDate(5), 
  },
  {
    id: "6",
    title: "Fullstack MERN App Development",
    shortDescription: "Complete MERN stack application from scratch.",
    fullDescription: "I will build a complete MERN stack app (MongoDB, Express, React, Node.js) with authentication.",
    category: "Fullstack",
    budget: 25000,
    deliveryDays: 10,
    skills: ["MongoDB", "React", "Node.js"],
    sellerName: "Mehedi Hasan",
    sellerRating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    createdAt: getPastDate(3),
  },
  {
    id: "7",
    title: "WordPress Speed Optimization",
    shortDescription: "Boost your WordPress site speed to 90+.",
    fullDescription: "I will optimize your WordPress site speed using caching, image compression, and CDN.",
    category: "Frontend",
    budget: 4000,
    deliveryDays: 2,
    skills: ["WordPress", "SEO", "Performance"],
    sellerName: "Fahim Rahman",
    sellerRating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    createdAt: getPastDate(2), 
  },
  {
    id: "8",
    title: "Python Data Scraping Script",
    shortDescription: "Custom web scraping with Python & BeautifulSoup.",
    fullDescription: "I will build a custom web scraper using Python, BeautifulSoup, and Selenium.",
    category: "Backend",
    budget: 6000,
    deliveryDays: 3,
    skills: ["Python", "BeautifulSoup", "Selenium"],
    sellerName: "Rifat Hossain",
    sellerRating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80",
    createdAt: getPastDate(1), 
  },
];

//new gig add
export function addGig(gig) {
  gigs.push(gig);
}

// gig delete function
export function removeGig(id) {
  gigs = gigs.filter((g) => g.id !== id);
}