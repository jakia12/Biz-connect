/**
 * BizConnect Homepage - Premium Design with Lucide Icons
 * Professional B2B Marketplace
 */

'use client';

import HeroSlider from '@/components/home/HeroSlider';
import StatsSection from '@/components/home/StatsSection';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';
import { fadeInUp, scaleIn, staggerContainer } from '@/utils/animations';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Award,
    Briefcase,
    CheckCircle2,
    Package,
    ShieldCheck,
    ShoppingBag,
    Sparkles,
    Star,
    TrendingUp,
    Zap
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [sellers, setSellers] = useState([]);
  const [sellersLoading, setSellersLoading] = useState(true);

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      setSellersLoading(true);
      const response = await fetch('/api/sellers?limit=4');
      const data = await response.json();
      
      if (data.success) {
        setSellers(data.sellers);
      }
    } catch (error) {
      console.error('Error fetching sellers:', error);
    } finally {
      setSellersLoading(false);
    }
  };
  const serviceCategories = [
    { 
      name: "Graphics & Design", 
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
      count: "450+"
    },
    { 
      name: "Digital Marketing", 
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300&fit=crop",
      count: "280+"
    },
    { 
      name: "Web Development", 
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
      count: "320+"
    },
    { 
      name: "Content Writing", 
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop",
      count: "200+"
    },
    { 
      name: "Video & Animation", 
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop",
      count: "150+"
    },
    { 
      name: "Business Consulting", 
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
      count: "180+"
    },
  ];

  const productCategories = [
    { 
      name: "Fashion & Apparel", 
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
      count: "850+"
    },
    { 
      name: "Food & Beverage", 
      image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&h=300&fit=crop",
      count: "620+"
    },
    { 
      name: "Handmade Crafts", 
      image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=300&fit=crop",
      count: "450+"
    },
    { 
      name: "Electronics", 
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
      count: "380+"
    },
  ];

  const featuredServices = [
    {
      id: 1,
      title: "Professional Business Logo Design",
      price: 1500,
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop",
      rating: 4.9,
      reviews: 120,
      seller: { name: "Creative Studio BD", verified: true }
    },
    {
      id: 2,
      title: "E-commerce Website Development",
      price: 25000,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      rating: 5.0,
      reviews: 45,
      seller: { name: "Tech Pro BD", verified: true }
    },
    {
      id: 3,
      title: "Digital Marketing Package",
      price: 8000,
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop",
      rating: 4.8,
      reviews: 89,
      seller: { name: "Marketing Experts", verified: true }
    },
    {
      id: 4,
      title: "Content Writing Services",
      price: 500,
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop",
      rating: 4.7,
      reviews: 156,
      seller: { name: "Writers Hub", verified: true }
    },
  ];

  const featuredProducts = [
    {
      id: 5,
      title: "Premium Cotton T-Shirts (Bulk)",
      price: 15000,
      originalPrice: 20000,
      discount: "-25%",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop",
      rating: 4.7,
      reviews: 56,
      seller: { name: "Garments Direct", verified: true }
    },
    {
      id: 6,
      title: "Organic Honey 1kg (Wholesale)",
      price: 800,
      originalPrice: 1000,
      discount: "-20%",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784720?w=600&h=400&fit=crop",
      rating: 4.9,
      reviews: 112,
      seller: { name: "Sundarban Mart", verified: true }
    },
    {
      id: 7,
      title: "Handmade Jute Bags (Pack of 50)",
      price: 2500,
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=400&fit=crop",
      rating: 4.8,
      reviews: 78,
      seller: { name: "Eco Crafts BD", verified: true }
    },
    {
      id: 8,
      title: "Fresh Vegetables Box (5kg)",
      price: 350,
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop",
      rating: 4.6,
      reviews: 234,
      seller: { name: "Farm Fresh BD", verified: true }
    },
  ];

  const verifiedSellers = [
    {
      id: 1,
      name: 'Creative Studio BD',
      category: 'Graphics & Design',
      rating: 4.9,
      reviews: 245,
      orders: 1200,
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&h=300&fit=crop',
      verified: true
    },
    {
      id: 2,
      name: 'Tech Pro BD',
      category: 'Web Development',
      rating: 5.0,
      reviews: 189,
      orders: 850,
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300&h=300&fit=crop',
      verified: true
    },
    {
      id: 3,
      name: 'Garments Direct',
      category: 'Fashion & Apparel',
      rating: 4.8,
      reviews: 567,
      orders: 2100,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop',
      verified: true
    },
    {
      id: 4,
      name: 'Eco Crafts BD',
      category: 'Handmade Crafts',
      rating: 4.9,
      reviews: 423,
      orders: 1500,
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=300&h=300&fit=crop',
      verified: true
    },
  ];

  return (
    <div className="min-h-screen bg-white font-body">
      <Navbar />

      {/* Hero Slider */}
      <HeroSlider />

      {/* Value Proposition */}
      <motion.section 
        className="py-20 bg-gradient-to-b from-gray-50 to-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-5xl font-bold text-gray-900 mb-6 font-heading">
              Bangladesh's Leading <span className="text-primary">B2B Marketplace</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with verified sellers, discover quality products, and hire expert freelancers - all in one platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Briefcase className="w-12 h-12" />,
                title: "Professional Services",
                description: "Hire expert freelancers for graphics, development, marketing, and more",
                link: "/services"
              },
              {
                icon: <ShoppingBag className="w-12 h-12" />,
                title: "Wholesale Products",
                description: "Source quality products at wholesale prices from verified suppliers",
                link: "/products"
              },
              {
                icon: <ShieldCheck className="w-12 h-12" />,
                title: "Verified Sellers",
                description: "Shop with confidence from our network of trusted and verified businesses",
                link: "/verified-sellers"
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-2xl p-8 shadow-lg transition-shadow group border border-gray-100"
                variants={fadeInUp}
              >
                <div className="text-primary mb-6">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
                <Link href={item.link}>
                  <span className="text-primary font-bold inline-flex items-center gap-2">
                    Explore Now
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Trusted By */}
      <motion.section 
        className="py-12 bg-white border-y border-gray-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-500 mb-8 font-medium flex items-center justify-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Trusted by 10,000+ businesses across Bangladesh
          </p>
        </div>
      </motion.section>

      {/* Professional Services */}
      <motion.div 
        className="container mx-auto px-6 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div 
          className="flex items-center justify-between mb-12"
          variants={fadeInUp}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Briefcase className="w-8 h-8 text-primary" />
              <h2 className="text-4xl font-bold text-gray-900 font-heading">Professional Services</h2>
            </div>
            <p className="text-gray-600 text-lg">Find expert freelancers for your business needs</p>
          </div>
          <Link href="/services">
            <Button variant="outline" className="flex items-center gap-2">
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12"
          variants={staggerContainer}
        >
          {serviceCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              variants={scaleIn}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Link href={`/services/${cat.name.toLowerCase().replace(/ /g, '-')}`} className="group block">
                <div className="relative h-40 rounded-2xl overflow-hidden mb-4 shadow-lg group-hover:shadow-2xl transition-all">
                  <Image 
                    src={cat.image} 
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-bold text-white text-sm mb-1">{cat.name}</h3>
                    <p className="text-xs text-white/80 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {cat.count} services
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
        >
          {featuredServices.map((service) => (
            <motion.div key={service.id} variants={fadeInUp}>
              <ProductCard product={service} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Wholesale Products */}
      <motion.div 
        className="bg-gradient-to-b from-gray-50 to-white py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <motion.div 
            className="flex items-center justify-between mb-12"
            variants={fadeInUp}
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Package className="w-8 h-8 text-primary" />
                <h2 className="text-4xl font-bold text-gray-900 font-heading">Wholesale Products</h2>
              </div>
              <p className="text-gray-600 text-lg">Quality products at unbeatable wholesale prices</p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="flex items-center gap-2">
                View All Products
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            variants={staggerContainer}
          >
            {productCategories.map((cat, idx) => (
              <motion.div
                key={idx}
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Link href={`/products/${cat.name.toLowerCase().replace(/ /g, '-')}`} className="group block">
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-4 shadow-lg group-hover:shadow-2xl transition-all">
                    <Image 
                      src={cat.image} 
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-bold text-white mb-1">{cat.name}</h3>
                      <p className="text-sm text-white/80 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {cat.count} products
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={fadeInUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Top Verified Sellers */}
      <motion.section 
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <motion.div 
            className="flex items-center justify-between mb-12"
            variants={fadeInUp}
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-8 h-8 text-primary" />
                <h2 className="text-4xl font-bold text-gray-900 font-heading">Top Verified Sellers</h2>
              </div>
              <p className="text-gray-600 text-lg">Shop with confidence from trusted businesses</p>
            </div>
            <Link href="/verified-sellers">
              <Button variant="outline" className="flex items-center gap-2">
                View All Sellers
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {sellersLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="flex gap-2 mb-3">
                      <div className="h-4 bg-gray-200 rounded w-8"></div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : sellers.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
            >
              {sellers.map((seller) => (
                <motion.div 
                  key={seller._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all border border-gray-100"
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                >
                  <Link href={`/seller/${seller._id}`}>
                    <div className="relative h-48">
                      <Image 
                        src={seller.profileImage || 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300&h=300&fit=crop'}
                        alt={seller.businessName || seller.name}
                        fill
                        className="object-cover"
                      />
                      {seller.isVerified && (
                        <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{seller.businessName || seller.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{seller.businessCategory || 'General Seller'}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="font-bold text-gray-900">{seller.rating?.toFixed(1) || '0.0'}</span>
                        </div>
                        <span className="text-gray-500 text-sm">({seller.reviewCount || 0} reviews)</span>
                      </div>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Zap className="w-4 h-4 text-primary" />
                        {seller.totalOrders || 0} orders completed
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No verified sellers found at the moment.</p>
            </div>
          )}
        </div>
      </motion.section>

      {/* Stats */}
      <StatsSection />

      {/* How It Works */}
      <motion.section 
        className="py-20 bg-gradient-to-b from-gray-50 to-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-heading">How BizConnect Works</h2>
            <p className="text-xl text-gray-600">Simple, secure, and efficient</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                step: "1", 
                title: "Browse & Discover", 
                desc: "Explore thousands of products and services from verified sellers"
              },
              { 
                step: "2", 
                title: "Connect & Order", 
                desc: "Message sellers, place orders, and make secure payments"
              },
              { 
                step: "3", 
                title: "Receive & Review", 
                desc: "Get your order delivered and share your experience"
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                className="text-center relative"
                variants={fadeInUp}
              >
                <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6 font-heading">Ready to Grow Your Business?</h2>
          <p className="text-2xl opacity-90 mb-10 max-w-3xl mx-auto">
            Join thousands of successful businesses on Bangladesh's most trusted B2B marketplace
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/register">
              <Button variant="outline" className="bg-white text-primary border-white hover:bg-gray-100 px-8 py-4 text-lg flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Start Buying
              </Button>
            </Link>
            <Link href="/sell">
              <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 px-8 py-4 text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Start Selling
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
