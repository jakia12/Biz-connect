/**
 * BizConnect Homepage - Premium Design with Lucide Icons
 * Professional B2B Marketplace
 */

'use client';

import HeroSlider from '@/components/home/HeroSlider';
import StatsSection from '@/components/home/StatsSection';
import TopProductSellers from '@/components/home/TopProductSellers';
import TopServiceSellers from '@/components/home/TopServiceSellers';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ProductCard from '@/components/product/ProductCard';
import ServiceCard from '@/components/service/ServiceCard';
import Button from '@/components/ui/Button';
import { fadeInUp, scaleIn, staggerContainer } from '@/utils/animations';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  Briefcase,
  Package,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [featuredServices, setFeaturedServices] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [verifiedSellers, setVerifiedSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured services
        const servicesRes = await fetch('/api/services?limit=4&sort=rating');
        const servicesData = await servicesRes.json();
        if (servicesData.success) {
          setFeaturedServices(servicesData.services);
        }

        // Fetch featured products
        const productsRes = await fetch('/api/products?limit=4&sort=rating');
        const productsData = await productsRes.json();
        if (productsData.success) {
          setFeaturedProducts(productsData.products);
        }

        // Fetch verified sellers
        const sellersRes = await fetch('/api/sellers?limit=4&isVerified=true');
        const sellersData = await sellersRes.json();
        if (sellersData.success) {
          setVerifiedSellers(sellersData.sellers);
        }
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
              <Link href={`/services?category=${encodeURIComponent(cat.name)}`} className="group block">
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
          {loading ? (
            // Skeleton loading
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg h-80 animate-pulse"></div>
            ))
          ) : featuredServices.length > 0 ? (
            featuredServices.map((service) => (
              <motion.div key={service._id} variants={fadeInUp}>
                <ServiceCard service={service} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-4 text-center py-10 text-gray-500">
              No services found.
            </div>
          )}
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
                <Link href={`/products?category=${encodeURIComponent(cat.name)}`} className="group block">
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
            {loading ? (
              // Skeleton loading
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-80 animate-pulse"></div>
              ))
            ) : featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <motion.div key={product._id} variants={fadeInUp}>
                  <ProductCard product={product} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-4 text-center py-10 text-gray-500">
                No products found.
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Top Service Providers */}
      <TopServiceSellers />

      {/* Top Product Suppliers */}
      <TopProductSellers />

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
