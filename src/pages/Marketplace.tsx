import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { MiniCart } from "@/components/MiniCart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useRealtimeProducts } from "@/hooks/useRealtimeData";
import { useCartActions } from "@/hooks/useCartActions";
import { useWishlistActions } from "@/hooks/useWishlistActions";
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Star, 
  Heart, 
  Sparkles, 
  Award,
  Leaf,
  Zap,
  ShoppingCart,
  Gift,
  TrendingUp,
  Verified
} from "lucide-react";

const categories = [
  { 
    name: "Food", 
    iconName: "Leaf", 
    emoji: "🌿",
    color: "bg-wellness-emerald/10 border-wellness-emerald/30",
    description: "Organic, sustainable nutrition",
    count: 156
  },
  { 
    name: "Body", 
    iconName: "Sparkles", 
    emoji: "✨",
    color: "bg-wellness-sage/10 border-wellness-sage/30",
    description: "Natural body & skin care",
    count: 89
  },
  { 
    name: "Home", 
    iconName: "Award", 
    emoji: "🏡",
    color: "bg-accent/10 border-accent/30",
    description: "Eco-friendly living",
    count: 67
  },
  { 
    name: "Eco", 
    iconName: "Zap", 
    emoji: "🌍",
    color: "bg-primary/10 border-primary/30",
    description: "Zero-waste lifestyle",
    count: 134
  },
];

const featuredBrands = [
  { name: "Sarvagnan Originals", logo: "🌱", verified: true },
  { name: "Himalayan Harvest", logo: "🏔️", verified: true },
  { name: "Ayur Naturals", logo: "🍃", verified: true },
  { name: "Earth Essentials", logo: "🌍", verified: false },
];

const products = [
  {
    id: "1",
    name: "Organic Himalayan Honey",
    brand: "Himalayan Harvest",
    price: 899,
    originalPrice: 1299,
    pointsRedeemable: 45,
    rating: 4.8,
    reviews: 234,
    category: "Food",
    tags: ["organic", "raw", "unprocessed"],
    dietaryTags: ["vegan", "gluten-free"],
    recommended: true,
    featured: true,
    image: "🍯",
    description: "Raw, unprocessed honey from the pristine Himalayas",
    benefits: ["Natural energy", "Antioxidant rich", "Digestive health"],
    certifications: ["USDA Organic", "Fair Trade"],
    ecoImpact: "Supports 50+ bee colonies",
    inStock: true,
    fastDelivery: true
  },
  {
    id: "2",
    name: "24K Gold Ayurvedic Face Serum",
    brand: "Sarvagnan Originals",
    price: 1599,
    originalPrice: null,
    pointsRedeemable: 80,
    rating: 4.9,
    reviews: 156,
    category: "Body",
    tags: ["ayurvedic", "anti-aging", "premium"],
    dietaryTags: ["cruelty-free", "paraben-free"],
    recommended: true,
    featured: true,
    image: "✨",
    description: "24k gold & turmeric infused anti-aging serum",
    benefits: ["Reduces fine lines", "Brightens skin", "Hydrates deeply"],
    certifications: ["Ayush Certified", "Cruelty Free"],
    ecoImpact: "Recyclable glass packaging",
    inStock: true,
    fastDelivery: false
  },
  {
    id: "3",
    name: "Bamboo Kitchen Essentials Set",
    brand: "Earth Essentials",
    price: 2499,
    originalPrice: 3499,
    pointsRedeemable: 125,
    rating: 4.7,
    reviews: 89,
    category: "Home",
    tags: ["sustainable", "bamboo", "kitchen"],
    dietaryTags: [],
    recommended: false,
    featured: false,
    image: "🎋",
    description: "Complete sustainable kitchen utensil set",
    benefits: ["Plastic-free", "Durable", "Antimicrobial"],
    certifications: ["FSC Certified"],
    ecoImpact: "Saves 2kg plastic waste",
    inStock: true,
    fastDelivery: true
  },
  {
    id: "4",
    name: "Premium Organic Quinoa",
    brand: "Ayur Naturals",
    price: 349,
    originalPrice: 499,
    pointsRedeemable: 18,
    rating: 4.6,
    reviews: 312,
    category: "Food",
    tags: ["superfood", "protein-rich", "premium"],
    dietaryTags: ["vegan", "gluten-free", "keto-friendly"],
    recommended: false,
    featured: false,
    image: "🌾",
    description: "Premium quality quinoa for complete nutrition",
    benefits: ["Complete protein", "High fiber", "Mineral rich"],
    certifications: ["USDA Organic"],
    ecoImpact: "Water-efficient farming",
    inStock: false,
    fastDelivery: false
  },
  {
    id: "5",
    name: "Turmeric Golden Milk Powder",
    brand: "Sarvagnan Originals",
    price: 699,
    originalPrice: 899,
    pointsRedeemable: 35,
    rating: 4.8,
    reviews: 198,
    category: "Food",
    tags: ["turmeric", "immunity", "traditional"],
    dietaryTags: ["vegan", "dairy-free"],
    recommended: true,
    featured: false,
    image: "🥛",
    description: "Authentic golden milk blend with 7 Ayurvedic herbs",
    benefits: ["Boosts immunity", "Anti-inflammatory", "Better sleep"],
    certifications: ["Ayush Certified"],
    ecoImpact: "Supports organic farmers",
    inStock: true,
    fastDelivery: true
  }
];

const Marketplace = () => {
  const { products, loading } = useRealtimeProducts();
  const { addToCart, loading: cartLoading } = useCartActions();
  const { addToWishlist, removeFromWishlist, loading: wishlistLoading } = useWishlistActions();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recommended");
  const [wishlist, setWishlist] = useState<string[]>([]);

  const handleAddToCart = async (productId: string) => {
    await addToCart(productId, 1);
  };

  const handleToggleWishlist = async (productId: string, isInWishlist: boolean) => {
    if (isInWishlist) {
      await removeFromWishlist(productId);
      setWishlist(prev => prev.filter(id => id !== productId));
    } else {
      await addToWishlist(productId);
      setWishlist(prev => [...prev, productId]);
    }
  };

  const filteredProducts = products.filter(product => {
    if (selectedCategory && product.category !== selectedCategory) return false;
    if (priceFilter === "under-500" && product.price >= 500) return false;
    if (priceFilter === "500-1500" && (product.price < 500 || product.price > 1500)) return false;
    if (priceFilter === "above-1500" && product.price <= 1500) return false;
    return true;
  });

  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ComponentType<any>> = {
      Leaf, Sparkles, Award, Zap
    };
    return icons[iconName];
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header userName="Wellness Seeker" points={245} />
      
      {/* Hero Banner */}
      <div className="relative overflow-hidden">
        <div className="nature-gradient p-6 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold font-devanagari mb-2 text-white">
              आरोग्यसम्पदः
            </h1>
            <p className="text-xl text-white/90 mb-1">Curated Wellness Marketplace</p>
            <p className="text-sm text-white/80">Trusted organic products for your journey</p>
            
            {/* Seasonal Offer Banner */}
            <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-2xl p-3">
              <div className="flex items-center justify-center gap-2 text-white">
                <Gift className="h-4 w-4" />
                <span className="text-sm font-medium">Free delivery on orders above ₹999</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Remove the fixed mini cart since we now use MiniCart component */}

      <div className="p-4 space-y-6">
        {/* Search & Filters */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search organic products..." 
                className="pl-10 rounded-2xl border-primary/20 focus:border-primary"
              />
            </div>
            <Button variant="outline" size="icon" className="rounded-2xl">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Smart Filters Row */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-32 rounded-2xl">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-500">Under ₹500</SelectItem>
                <SelectItem value="500-1500">₹500 - ₹1500</SelectItem>
                <SelectItem value="above-1500">Above ₹1500</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-36 rounded-2xl">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant={selectedCategory ? "default" : "outline"} 
              size="sm" 
              className="rounded-2xl"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Button>
          </div>
        </div>

        {/* Categories */}
        <Card className="rounded-3xl border-primary/10 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
              Curated Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category) => {
                const IconComponent = getIcon(category.iconName);
                return (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? "default" : "outline"}
                    className={`h-24 flex-col gap-2 rounded-3xl transition-all duration-300 hover:scale-105 ${category.color} border-2`}
                    onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{category.emoji}</span>
                      {IconComponent && <IconComponent className="h-4 w-4" />}
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-sm">{category.name}</div>
                      <div className="text-xs opacity-70">{category.count} products</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Featured Brands */}
        <Card className="rounded-3xl border-primary/10 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Award className="h-5 w-5 text-primary" />
              Featured Brands
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {featuredBrands.map((brand) => (
                <div key={brand.name} className="flex-shrink-0">
                  <Button 
                    variant="outline" 
                    className="rounded-2xl h-16 px-4 flex items-center gap-2 hover:bg-primary/5"
                  >
                    <span className="text-lg">{brand.logo}</span>
                    <div className="text-left">
                      <div className="text-sm font-medium flex items-center gap-1">
                        {brand.name}
                        {brand.verified && <Verified className="h-3 w-3 text-primary fill-primary" />}
                      </div>
                    </div>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Personalized Recommendations */}
        {!selectedCategory && (
          <Card className="rounded-3xl border-primary/10 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-wellness-sage" />
                Recommended for You
                <Badge className="ml-auto bg-wellness-sage/20 text-wellness-sage border-0">
                  AI Curated
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {products.filter(p => p.recommended).map((product) => (
                <div key={product.id} className="premium-card p-5 border-l-4 border-l-primary/30 hover:shadow-lg transition-all duration-300">
                  <div className="flex gap-4">
                    <div className="text-4xl self-start">{product.image}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            {product.featured && (
                              <Badge className="bg-accent/20 text-accent border-0 text-xs">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            by {product.brand}
                            {featuredBrands.find(b => b.name === product.brand)?.verified && 
                              <Verified className="inline h-3 w-3 ml-1 text-primary fill-primary" />
                            }
                          </p>
                          <div className="flex gap-2 mb-2">
                            {product.dietaryTags.slice(0, 2).map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs rounded-full">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleToggleWishlist(product.id, wishlist.includes(product.id))}
                          className="rounded-full"
                        >
                          <Heart 
                            className={`h-4 w-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} 
                          />
                        </Button>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {product.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.benefits.slice(0, 3).map(benefit => (
                          <Badge key={benefit} className="bg-wellness-emerald/10 text-wellness-emerald border-0 text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-primary">
                              ₹{product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ₹{product.originalPrice}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-xs">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              {product.rating} ({product.reviews})
                            </div>
                            <div className="flex items-center gap-1 text-xs text-primary">
                              <Gift className="h-3 w-3" />
                              {product.pointsRedeemable} points
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="rounded-2xl">
                            Quick View
                          </Button>
                          <Button 
                            size="sm" 
                            className="rounded-2xl bg-primary hover:bg-primary/90"
                            disabled={!product.inStock}
                          >
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </Button>
                        </div>
                      </div>
                      
                      {product.ecoImpact && (
                        <div className="mt-3 flex items-center gap-2 text-xs text-wellness-emerald">
                          <Leaf className="h-3 w-3" />
                          {product.ecoImpact}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* All Products */}
        <Card className="rounded-3xl border-primary/10 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShoppingBag className="h-5 w-5 text-primary" />
              {selectedCategory ? `${selectedCategory} Products` : 'All Products'}
              <Badge variant="outline" className="ml-auto">
                {filteredProducts.length} items
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="premium-card p-4 hover:shadow-lg transition-all duration-300">
                <div className="flex gap-4">
                  <div className="text-3xl self-start">{product.image}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-base">{product.name}</h3>
                          {!product.inStock && (
                            <Badge variant="destructive" className="text-xs">
                              Out of Stock
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {product.brand}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary text-lg">₹{product.price}</div>
                        {product.originalPrice && (
                          <div className="text-xs text-muted-foreground line-through">
                            ₹{product.originalPrice}
                          </div>
                        )}
                        <div className="text-xs text-primary">
                          {product.pointsRedeemable} points
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-xs">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          {product.rating} ({product.reviews} reviews)
                        </div>
                        {product.fastDelivery && (
                          <Badge className="bg-accent/20 text-accent border-0 text-xs">
                            Fast Delivery
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleToggleWishlist(product.id, wishlist.includes(product.id))}
                          className="rounded-full"
                        >
                          <Heart 
                            className={`h-4 w-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} 
                          />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-2xl">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Navigation />
    </div>
  );
};

export default Marketplace;