// Mock Data for Sarvagnan Platform
export interface MockUser {
  id: string;
  name: string;
  email: string;
  points: number;
  streak: number;
  currentDay: number;
  lifestyle: {
    wakeTime: string;
    sleepTime: string;
    dietPreference: string;
    activityLevel: string;
    goals: string[];
    healthConditions: string[];
  };
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: 'wellness' | 'community' | 'consistency' | 'learning';
}

export interface MockTask {
  id: string;
  title: string;
  description: string;
  category: 'food' | 'body' | 'mind' | 'eco';
  timeSlot: 'morning' | 'afternoon' | 'evening' | 'night';
  points: number;
  completed: boolean;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface MockProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isOrganic: boolean;
  tags: string[];
}

export interface MockWorkshop {
  id: string;
  title: string;
  description: string;
  instructor: string;
  date: Date;
  duration: string;
  price: number;
  spots: number;
  spotsLeft: number;
  category: 'yoga' | 'meditation' | 'nutrition' | 'ayurveda';
  image: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface MockExpert {
  id: string;
  name: string;
  specialization: string;
  bio: string;
  rating: number;
  experience: string;
  consultationFee: number;
  avatar: string;
  available: boolean;
  nextSlot: Date;
  tags: string[];
}

export interface MockPost {
  id: string;
  author: string;
  avatar: string;
  time: string;
  verified: boolean;
  content: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  group: string;
  tags: string[];
  badge?: string;
  warning?: string;
  challengeParticipant?: boolean;
}

export interface MockChallenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  daysLeft: number;
  reward: number;
  progress: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Mock User Data
export const mockUser: MockUser = {
  id: "user_001",
  name: "Arya Wellness",
  email: "arya@wellness.com",
  points: 1247,
  streak: 15,
  currentDay: 12,
  lifestyle: {
    wakeTime: "06:00",
    sleepTime: "22:00",
    dietPreference: "vegetarian",
    activityLevel: "moderate",
    goals: ["weight_loss", "stress_reduction", "better_sleep"],
    healthConditions: ["mild_anxiety"]
  },
  achievements: [
    {
      id: "ach_001",
      name: "Early Bird",
      description: "Wake up before 6 AM for 7 days",
      icon: "🌅",
      unlockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      category: "wellness"
    },
    {
      id: "ach_002", 
      name: "Community Helper",
      description: "Help 10 community members",
      icon: "🤝",
      unlockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      category: "community"
    }
  ]
};

// Mock Daily Tasks for Dashboard
export const mockDailyTasks = [
  {
    id: '1',
    time: '06:30',
    category: 'nutrition',
    task: 'Drink warm lemon water',
    description: 'Start your day with hydration and vitamin C to boost metabolism',
    points: 10,
    completed: false,
    icon: '🍋',
    actionType: 'recipe' as const,
    actionLink: '/recipes/lemon-water'
  },
  {
    id: '2', 
    time: '07:00',
    category: 'mental',
    task: '10-minute morning meditation',
    description: 'Set a positive intention for the day with mindful breathing',
    points: 15,
    completed: false,
    icon: '🧘‍♀️',
    actionType: 'meditation' as const,
    actionLink: '/meditation/morning-calm'
  },
  {
    id: '3',
    time: '08:00',
    category: 'fitness',
    task: '5-minute gentle stretching',
    description: 'Wake up your muscles with simple morning stretches',
    points: 10,
    completed: false,
    icon: '🤸‍♀️',
    actionType: 'exercise' as const,
    actionLink: '/exercises/morning-stretch'
  },
  {
    id: '4',
    time: '12:30',
    category: 'nutrition',
    task: 'Eat mindful lunch with vegetables',
    description: 'Practice slow eating and include at least 3 different vegetables',
    points: 20,
    completed: true,
    icon: '🥗',
    actionType: 'recipe' as const,
    actionLink: '/recipes/balanced-lunch'
  },
  {
    id: '5',
    time: '14:00',
    category: 'wellness',
    task: 'Drink 2 glasses of water',
    description: 'Stay hydrated for better energy and focus',
    points: 5,
    completed: false,
    icon: '💧',
    actionType: 'default' as const
  },
  {
    id: '6',
    time: '15:30',
    category: 'wellness',
    task: 'Take a 15-minute nature walk',
    description: 'Get fresh air and natural light to boost mood',
    points: 15,
    completed: false,
    icon: '🌳',
    actionType: 'default' as const
  },
  {
    id: '7',
    time: '18:00',
    category: 'fitness',
    task: '20-minute home workout',
    description: 'Strength training or cardio to build endurance',
    points: 25,
    completed: false,
    icon: '💪',
    actionType: 'exercise' as const,
    actionLink: '/exercises/evening-workout'
  },
  {
    id: '8',
    time: '19:30',
    category: 'self_care',
    task: 'Apply natural face mask',
    description: 'Use DIY ingredients like honey and oats for glowing skin',
    points: 15,
    completed: false,
    icon: '✨',
    actionType: 'recipe' as const,
    actionLink: '/recipes/natural-face-mask'
  },
  {
    id: '9',
    time: '21:00',
    category: 'mental',
    task: 'Practice gratitude journaling',
    description: 'Write down 3 things you\'re grateful for today',
    points: 10,
    completed: false,
    icon: '📓',
    actionType: 'default' as const
  },
  {
    id: '10',
    time: '21:30',
    category: 'wellness',
    task: 'Herbal tea and digital detox',
    description: 'Sip chamomile tea and avoid screens 30 minutes before bed',
    points: 15,
    completed: false,
    icon: '🍵',
    actionType: 'recipe' as const,
    actionLink: '/recipes/bedtime-tea'
  }
];

// Mock Products - Real Premium Wellness Products
export const mockProducts: MockProduct[] = [
  {
    id: "prod_001",
    name: "Organic Ashwagandha Root Powder - 250g",
    description: "Premium quality adaptogenic herb sourced from organic farms in Rajasthan. Reduces stress, improves energy, and supports immunity.",
    price: 899,
    originalPrice: 1299,
    category: "Ayurvedic Herbs",
    image: "🌿",
    rating: 4.8,
    reviews: 324,
    inStock: true,
    isOrganic: true,
    tags: ["stress-relief", "adaptogen", "certified-organic", "immunity-boost"]
  },
  {
    id: "prod_002",
    name: "Handcrafted Pure Copper Water Bottle - 1L",
    description: "Traditional Ayurvedic copper vessel with leak-proof design. Naturally alkaline water with antimicrobial properties.",
    price: 1599,
    originalPrice: 2199,
    category: "Wellness Accessories",
    image: "🧿",
    rating: 4.6,
    reviews: 189,
    inStock: true,
    isOrganic: false,
    tags: ["copper-benefits", "ayurvedic", "handcrafted", "alkaline-water"]
  },
  {
    id: "prod_003",
    name: "Himalayan Singing Bowl Set with Silk Cushion",
    description: "Authentic 7-metal meditation bowl handcrafted in Nepal. Includes wooden mallet, silk cushion, and instruction guide.",
    price: 2499,
    originalPrice: 3299,
    category: "Meditation Tools",
    image: "🎵",
    rating: 4.9,
    reviews: 156,
    inStock: true,
    isOrganic: false,
    tags: ["meditation", "sound-healing", "himalayan", "7-metals", "handcrafted"]
  },
  {
    id: "prod_004",
    name: "Cold-Pressed Organic Sesame Oil - 500ml",
    description: "Extra virgin sesame oil perfect for Abhyanga massage. Rich in Vitamin E and antioxidants. Chemical-free extraction.",
    price: 749,
    originalPrice: 999,
    category: "Body Care",
    image: "🫒",
    rating: 4.7,
    reviews: 267,
    inStock: true,
    isOrganic: true,
    tags: ["massage-oil", "organic", "ayurvedic", "vitamin-e", "chemical-free"]
  },
  {
    id: "prod_005",
    name: "Premium Ghee - Grass-Fed A2 Cow - 500ml",
    description: "Traditional bilona method ghee from indigenous A2 cows. Rich golden color with intense aroma. Perfect for cooking and Ayurvedic treatments.",
    price: 1299,
    originalPrice: 1699,
    category: "Organic Food",
    image: "🧈",
    rating: 4.9,
    reviews: 445,
    inStock: true,
    isOrganic: true,
    tags: ["A2-ghee", "grass-fed", "bilona-method", "ayurvedic", "cooking"]
  },
  {
    id: "prod_006",
    name: "Bamboo Yoga Mat with Cork Alignment Lines",
    description: "Eco-friendly non-slip yoga mat made from sustainable bamboo fiber. Natural cork alignment lines for perfect poses.",
    price: 2199,
    originalPrice: 2799,
    category: "Yoga Equipment",
    image: "🧘",
    rating: 4.8,
    reviews: 178,
    inStock: true,
    isOrganic: false,
    tags: ["eco-friendly", "bamboo", "cork", "non-slip", "alignment", "sustainable"]
  },
  {
    id: "prod_007",
    name: "Organic Turmeric Latte Mix - Golden Milk Blend",
    description: "Premium blend of organic turmeric, black pepper, ginger, cardamom, and coconut milk powder. Anti-inflammatory superfood drink.",
    price: 599,
    originalPrice: 799,
    category: "Wellness Drinks",
    image: "🥛",
    rating: 4.6,
    reviews: 298,
    inStock: true,
    isOrganic: true,
    tags: ["turmeric", "golden-milk", "anti-inflammatory", "superfood", "organic-blend"]
  },
  {
    id: "prod_008",
    name: "Crystal Healing Set - 7 Chakra Stones",
    description: "Complete chakra balancing kit with 7 genuine crystals, velvet pouch, and detailed healing guide. Energy cleansing and alignment.",
    price: 1899,
    category: "Crystal Healing",
    image: "💎",
    rating: 4.7,
    reviews: 123,
    inStock: true,
    isOrganic: false,
    tags: ["chakra-healing", "crystals", "energy-work", "meditation", "spiritual"]
  },
  {
    id: "prod_009",
    name: "Handwoven Organic Cotton Meditation Shawl",
    description: "Traditional white meditation shawl handwoven by artisans. 100% organic cotton with sacred geometry patterns. Perfect for deep practice.",
    price: 1499,
    originalPrice: 1899,
    category: "Meditation Accessories",
    image: "🕯️",
    rating: 4.8,
    reviews: 87,
    inStock: true,
    isOrganic: true,
    tags: ["meditation", "organic-cotton", "handwoven", "sacred-geometry", "artisan-made"]
  },
  {
    id: "prod_010",
    name: "Ayurvedic Herb Garden Starter Kit",
    description: "Complete kit to grow 8 medicinal herbs at home. Includes organic seeds, biodegradable pots, soil mix, and growing guide.",
    price: 899,
    originalPrice: 1199,
    category: "Gardening",
    image: "🌱",
    rating: 4.5,
    reviews: 156,
    inStock: true,
    isOrganic: true,
    tags: ["herb-garden", "medicinal-plants", "organic-seeds", "home-growing", "self-sufficient"]
  }
];

// Mock Workshops - Real Premium Wellness Sessions
export const mockWorkshops: MockWorkshop[] = [
  {
    id: "workshop_001",
    title: "Sacred Morning Pranayama & Sunrise Meditation",
    description: "Master ancient Vedic breathing techniques with guided sunrise meditation. Learn 5 powerful pranayama methods for mental clarity, energy boost, and spiritual awakening.",
    instructor: "Dr. Priya Sharma (Vedic Meditation Master)",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    duration: "90 minutes",
    price: 699,
    spots: 20,
    spotsLeft: 8,
    category: "meditation",
    image: "🧘‍♀️",
    level: "beginner"
  },
  {
    id: "workshop_002",
    title: "Ayurvedic Cooking Masterclass - Dosha-Specific Meals",
    description: "Discover your unique constitution and learn to cook healing meals. Prepare 6 dishes designed for Vata, Pitta, and Kapha doshas with Chef Anand.",
    instructor: "Chef Anand Kumar (Ayurvedic Nutritionist)",
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    duration: "2.5 hours",
    price: 1299,
    spots: 15,
    spotsLeft: 12,
    category: "nutrition",
    image: "🍛",
    level: "intermediate"
  },
  {
    id: "workshop_003",
    title: "Advanced Chakra Balancing Yoga Flow",
    description: "Deep energy work through targeted asanas, mudras, and mantras. Align your 7 energy centers for optimal physical, mental, and spiritual health.",
    instructor: "Guru Madhavi (Kundalini Yoga Master)",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    duration: "2 hours",
    price: 899,
    spots: 25,
    spotsLeft: 3,
    category: "yoga",
    image: "⚡",
    level: "advanced"
  },
  {
    id: "workshop_004",
    title: "Crystal Healing & Sound Bath Experience",
    description: "Immersive healing session combining Himalayan singing bowls, crystal therapy, and guided meditation for deep relaxation and energy cleansing.",
    instructor: "Dr. Maya Crystalhealer (Energy Healing Expert)",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    duration: "75 minutes",
    price: 799,
    spots: 30,
    spotsLeft: 18,
    category: "meditation",
    image: "💎",
    level: "beginner"
  },
  {
    id: "workshop_005",
    title: "Traditional Panchakarma Detox Workshop",
    description: "Learn authentic Ayurvedic detoxification methods. Includes oil massage techniques, herbal preparations, and personalized cleansing protocols.",
    instructor: "Dr. Vikram Ayurveda (Panchakarma Specialist)",
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    duration: "3 hours",
    price: 1599,
    spots: 12,
    spotsLeft: 7,
    category: "ayurveda",
    image: "🌿",
    level: "intermediate"
  },
  {
    id: "workshop_006",
    title: "Urban Eco-Living & Zero Waste Lifestyle",
    description: "Transform your home into an eco-haven. Learn sustainable practices, DIY natural products, and zero-waste living strategies for modern city life.",
    instructor: "Eco-Warrior Sunita (Sustainability Expert)",
    date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
    duration: "2 hours",
    price: 599,
    spots: 40,
    spotsLeft: 28,
    category: "nutrition",
    image: "🌱",
    level: "beginner"
  }
];

// Mock Experts - Premium Wellness Professionals
export const mockExperts: MockExpert[] = [
  {
    id: "expert_001",
    name: "Dr. Priya Sharma",
    specialization: "Ayurvedic Medicine & Vedic Meditation",
    bio: "20+ years experience integrating traditional Ayurveda with modern wellness. Certified Panchakarma specialist, meditation teacher, and author of 'Healing with Ancient Wisdom'.",
    rating: 4.9,
    experience: "20+ years",
    consultationFee: 2199,
    avatar: "PS",
    available: true,
    nextSlot: new Date(Date.now() + 24 * 60 * 60 * 1000),
    tags: ["ayurveda", "panchakarma", "meditation", "stress-management", "hormonal-balance"]
  },
  {
    id: "expert_002",
    name: "Yoga Guru Madhavi",
    specialization: "Kundalini & Hatha Yoga Master",
    bio: "Enlightened yoga master from Rishikesh with 25+ years of practice. Specializes in energy awakening, chakra healing, and advanced pranayama techniques.",
    rating: 4.9,
    experience: "25+ years",
    consultationFee: 1799,
    avatar: "GM",
    available: true,
    nextSlot: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    tags: ["kundalini", "hatha-yoga", "pranayama", "chakra-healing", "spiritual-guidance"]
  },
  {
    id: "expert_003",
    name: "Dr. Anand Nutritionist",
    specialization: "Holistic Nutrition & Plant-Based Healing",
    bio: "Harvard-trained nutritionist specializing in Ayurvedic nutrition and plant-based healing protocols. Expert in detox programs and metabolic restoration.",
    rating: 4.8,
    experience: "15+ years",
    consultationFee: 1999,
    avatar: "AN",
    available: false,
    nextSlot: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    tags: ["nutrition", "detox", "plant-based", "metabolic-health", "weight-management"]
  },
  {
    id: "expert_004",
    name: "Dr. Maya Crystal Healer",
    specialization: "Energy Healing & Crystal Therapy",
    bio: "Certified Reiki Master and crystal healing expert. Combines ancient crystal wisdom with modern energy work for emotional healing and chakra balancing.",
    rating: 4.7,
    experience: "12+ years",
    consultationFee: 1599,
    avatar: "MC",
    available: true,
    nextSlot: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    tags: ["crystal-healing", "reiki", "energy-work", "emotional-healing", "chakra-balancing"]
  },
  {
    id: "expert_005",
    name: "Dr. Vikram Panchakarma",
    specialization: "Authentic Panchakarma & Detox Specialist",
    bio: "Traditional Ayurvedic doctor from Kerala specializing in authentic Panchakarma treatments. Expert in deep detoxification and rejuvenation therapies.",
    rating: 4.9,
    experience: "18+ years",
    consultationFee: 2499,
    avatar: "VP",
    available: true,
    nextSlot: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    tags: ["panchakarma", "detox", "rejuvenation", "traditional-ayurveda", "therapeutic-treatments"]
  },
  {
    id: "expert_006",
    name: "Life Coach Sunita",
    specialization: "Mindful Living & Eco-Wellness Coach",
    bio: "Certified life coach specializing in sustainable living and mindful lifestyle transformation. Helps clients create eco-conscious, wellness-focused lifestyles.",
    rating: 4.6,
    experience: "10+ years",
    consultationFee: 1299,
    avatar: "SG",
    available: true,
    nextSlot: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    tags: ["life-coaching", "mindful-living", "eco-wellness", "lifestyle-transformation", "sustainability"]
  }
];

// Mock Community Posts - Vibrant Wellness Community
export const mockCommunityPosts: MockPost[] = [
  {
    id: "post_001",
    author: "Dr. Priya Sharma",
    avatar: "PS",
    time: "2 hours ago",
    verified: true,
    content: "🌟 Just completed my 30-day oil pulling challenge! The transformation is incredible - reduced plaque by 40%, breath is naturally fresh, and gums are visibly stronger. Start with 5 minutes daily using coconut oil. Who's ready to join the next challenge? 💪✨",
    image: "🦷",
    likes: 287,
    comments: 64,
    shares: 42,
    group: "Ayurveda Wisdom Circle",
    tags: ["oral-health", "oil-pulling", "ayurveda", "challenge-complete", "30-day-transformation"],
    badge: "Expert Verified"
  },
  {
    id: "post_002",
    author: "Chef Anand Kumar",
    avatar: "AK",
    time: "4 hours ago",
    verified: true,
    content: "🍛 Created this vibrant Buddha Bowl with quinoa, roasted rainbow vegetables, tahini dressing, and healing turmeric. Each color represents different nutrients and chakras! Recipe and video tutorial in comments 👇 #FoodIsMedicine",
    image: "🥗",
    likes: 156,
    comments: 38,
    shares: 29,
    group: "Conscious Cooking Community",
    tags: ["buddha-bowl", "rainbow-nutrition", "plant-based", "chakra-foods", "recipe-share"],
    badge: "Expert Verified"
  },
  {
    id: "post_003",
    author: "Wellness Warrior Maya",
    avatar: "WM",
    time: "6 hours ago", 
    verified: false,
    content: "🧘‍♀️ Morning meditation breakthrough! After 21 days of consistent practice, I experienced my first deep samadhi state. The peace was indescribable. For beginners: start with just 5 minutes daily, focus on breath, observe thoughts without judgment. Consistency is everything! 🌅✨",
    image: "🧘‍♀️",
    likes: 234,
    comments: 67,
    shares: 51,
    group: "Mindful Living Collective",
    tags: ["meditation", "mindfulness", "breakthrough", "samadhi", "consistency", "beginner-tips"],
    challengeParticipant: true
  },
  {
    id: "post_004",
    author: "Eco Mama Sunita",
    avatar: "ES",
    time: "8 hours ago",
    verified: false,
    content: "🌱 Zero-waste kitchen transformation complete! Made my own cleaning products, switched to glass containers, started composting, and reduced plastic by 95%. My family's health improved dramatically! Sharing my complete guide below 👇 #ZeroWasteJourney",
    image: "🌱",
    likes: 189,
    comments: 45,
    shares: 78,
    group: "Sustainable Living Hub",
    tags: ["zero-waste", "eco-living", "sustainable-kitchen", "plastic-free", "health-improvement"],
    warning: "Community shared - Always research before implementing lifestyle changes"
  },
  {
    id: "post_005",
    author: "Yogi Ram Das",
    avatar: "RD",
    time: "12 hours ago",
    verified: true,
    content: "🔥 Kundalini awakening experience during today's workshop was profound! 15 participants reported energy surges, emotional releases, and spiritual insights. The power of group practice is incredible. Next session: Advanced Pranayama this Saturday! 🙏",
    image: "⚡",
    likes: 167,
    comments: 23,
    shares: 31,
    group: "Spiritual Awakening Circle",
    tags: ["kundalini", "spiritual-awakening", "group-practice", "pranayama", "workshop"],
    badge: "Expert Verified"
  },
  {
    id: "post_006",
    author: "Crystal Healer Devi",
    avatar: "CD",
    time: "1 day ago",
    verified: true,
    content: "💎 Full moon crystal charging ritual was magical! Rose quartz, amethyst, and clear quartz absorbed incredible lunar energy. Today's healing sessions showed 3x stronger energy flow. Remember: intention + crystal + moon = transformation ✨🌕",
    image: "💎",
    likes: 198,
    comments: 34,
    shares: 29,
    group: "Crystal Healing Community",
    tags: ["crystal-healing", "full-moon", "lunar-energy", "intention-setting", "energy-work"],
    badge: "Expert Verified"
  }
];

// Mock Challenges
export const mockChallenges: MockChallenge[] = [
  {
    id: "challenge_001",
    title: "7-Day Plastic-Free Challenge",
    description: "Reduce plastic usage and track your impact",
    participants: 1247,
    daysLeft: 3,
    reward: 100,
    progress: 65,
    category: "eco-living",
    difficulty: "medium"
  },
  {
    id: "challenge_002", 
    title: "21-Day Morning Meditation",
    description: "Build a consistent meditation practice",
    participants: 892,
    daysLeft: 18,
    reward: 200,
    progress: 15,
    category: "mindfulness",
    difficulty: "easy"
  },
  {
    id: "challenge_003",
    title: "30-Day Ayurvedic Lifestyle",
    description: "Follow traditional Ayurvedic daily routines",
    participants: 456,
    daysLeft: 25,
    reward: 300,
    progress: 25,
    category: "wellness",
    difficulty: "hard"
  }
];

// Motivational Quotes
export const motivationalQuotes = [
  "Health is not just the absence of disease, but complete physical, mental and social well-being. - WHO",
  "The groundwork for all happiness is good health. - Leigh Hunt",
  "Your body is your temple. Keep it pure and clean for the soul to reside in. - B.K.S. Iyengar",
  "Prevention is better than cure. - Desiderius Erasmus",
  "Take care of your body. It's the only place you have to live. - Jim Rohn"
];

// Mock Functions for Interactions
export const mockInteractions = {
  completeTask: (taskId: string) => {
    console.log(`✅ Task ${taskId} completed! +${mockDailyTasks.find(t => t.id === taskId)?.points || 0} points`);
    return { success: true, pointsEarned: mockDailyTasks.find(t => t.id === taskId)?.points || 0 };
  },
  
  addToCart: (productId: string) => {
    console.log(`🛒 Added product ${productId} to cart`);
    return { success: true, message: "Added to cart successfully!" };
  },
  
  bookWorkshop: (workshopId: string) => {
    console.log(`📅 Booked workshop ${workshopId}`);
    return { success: true, message: "Workshop booked successfully!" };
  },
  
  likePost: (postId: string) => {
    console.log(`❤️ Liked post ${postId}`);
    return { success: true, newLikeCount: Math.floor(Math.random() * 200) + 50 };
  },
  
  joinChallenge: (challengeId: string) => {
    console.log(`🎯 Joined challenge ${challengeId}`);
    return { success: true, message: "Challenge joined! Good luck!" };
  },
  
  consultExpert: (expertId: string) => {
    console.log(`👨‍⚕️ Booking consultation with expert ${expertId}`);
    return { success: true, message: "Consultation booked!" };
  }
};