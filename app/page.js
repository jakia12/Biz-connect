/**
 * BizConnect Homepage
 * Clean, Professional Marketplace Design
 */

'use client';

import HeroSlider from '@/components/home/HeroSlider';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';
import { fadeInUp, scaleIn, staggerContainer } from '@/utils/animations';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  // Service Categories with Lucide-style icons
  const serviceCategories = [
    { 
      name: "Graphics & Design", 
      icon: "palette",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop"
    },
    { 
      name: "Digital Marketing", 
      icon: "megaphone",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
    },
    { 
      name: "Web Development", 
      icon: "code",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop"
    },
    { 
      name: "Content Writing", 
      icon: "pen-tool",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop"
    },
    { 
      name: "Video & Animation", 
      icon: "video",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop"
    },
    { 
      name: "Business Consulting", 
      icon: "briefcase",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop"
    },
  ];

  const productCategories = [
    { 
      name: "Wholesale Food", 
      icon: "wheat",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop"
    },
    { 
      name: "Fashion & Apparel", 
      icon: "shirt",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop"
    },
    { 
      name: "Electronics", 
      icon: "smartphone",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop"
    },
    { 
      name: "Handmade Crafts", 
      icon: "scissors",
      image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=300&fit=crop"
    },
    { 
      name: "Packaging", 
      icon: "package",
      image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?w=400&h=300&fit=crop"
    },
    { 
      name: "Office Supplies", 
      icon: "clipboard",
      image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=300&fit=crop"
    },
  ];

  // Featured Services
  const featuredServices = [
    {
      id: 101,
      title: "Professional Business Logo Design",
      price: 1500,
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop",
      rating: 4.9,
      reviews: 120,
      seller: { name: "Creative Studio BD", verified: true, level: "Top Rated" },
      badge: { text: "Service", variant: "info" }
    },
    {
      id: 102,
      title: "E-commerce Website Development",
      price: 25000,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      rating: 5.0,
      reviews: 45,
      seller: { name: "Tech Pro BD", verified: true, level: "Top Rated" },
      badge: { text: "Service", variant: "info" }
    },
    {
      id: 103,
      title: "Social Media Marketing Package",
      price: 8000,
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
      rating: 4.8,
      reviews: 89,
      seller: { name: "Digital Marketer", verified: true, level: "Level 2" },
      badge: { text: "Service", variant: "info" }
    },
    {
      id: 104,
      title: "Professional Product Photography",
      price: 3500,
      image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&h=400&fit=crop",
      rating: 4.9,
      reviews: 67,
      seller: { name: "Studio Lens", verified: true, level: "Level 2" },
      badge: { text: "Service", variant: "info" }
    }
  ];

  // Hot Wholesale Products
  const hotProducts = [
    {
      id: 201,
      title: "Premium Cotton T-Shirts (Bulk 100pcs)",
      price: 150,
      originalPrice: 200,
      discount: "-25%",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop",
      rating: 4.7,
      reviews: 56,
      sold: 5000,
      seller: { name: "Garments Direct", verified: true }
    },
    {
      id: 202,
      title: "Organic Honey 1kg (Wholesale)",
      price: 800,
      originalPrice: 1000,
      discount: "-20%",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784720?w=600&h=400&fit=crop",
      rating: 4.9,
      reviews: 112,
      sold: 450,
      seller: { name: "Sundarban Mart", verified: true }
    },
    {
      id: 203,
      title: "Eco-Friendly Packaging Boxes (100pcs)",
      price: 1200,
      image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?w=600&h=400&fit=crop",
      rating: 4.8,
      reviews: 34,
      sold: 120,
      seller: { name: "Pack It Up", verified: true }
    },
    {
      id: 204,
      title: "Handmade Jute Bags (Bulk 50pcs)",
      price: 2500,
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=400&fit=crop",
      rating: 4.6,
      reviews: 20,
      sold: 80,
      seller: { name: "Eco Crafts BD", verified: true }
    }
  ];

  // Top Sellers
  const topSellers = [
    {
      id: 1,
      name: "Rahima's Kitchen",
      category: "Food & Beverage",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=200&h=200&fit=crop",
      rating: 4.9,
      totalSales: 1200,
      verified: true
    },
    {
      id: 2,
      name: "Creative Studio BD",
      category: "Design Services",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=200&h=200&fit=crop",
      rating: 5.0,
      totalSales: 850,
      verified: true
    },
    {
      id: 3,
      name: "Garments Direct",
      category: "Fashion Wholesale",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop",
      rating: 4.8,
      totalSales: 2100,
      verified: true
    },
    {
      id: 4,
      name: "Tech Solutions BD",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=200&fit=crop",
      rating: 4.9,
      totalSales: 650,
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-body text-gray-700">
      <Navbar />

      {/* Hero Slider */}
      <HeroSlider />

      {/* Trusted By */}
      <div className="bg-white py-6 border-b border-gray-200">
        <div className="container mx-auto px-6 flex justify-center items-center gap-12 md:gap-20 opacity-40 grayscale">
          <span className="font-bold text-gray-400 text-sm uppercase tracking-widest">Trusted by:</span>
          {['Pathao', 'ShopUp', 'Daraz', 'Chaldal', 'Bkash'].map((brand) => (
            <span key={brand} className="text-xl font-bold font-heading text-gray-600">{brand}</span>
          ))}
        </div>
      </div>

      {/* Professional Services */}
      <motion.div 
        className="container mx-auto px-6 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div 
          className="flex items-center justify-between mb-10"
          variants={fadeInUp}
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-900 font-heading">Professional Services</h2>
            <p className="text-gray-600 mt-2">Find expert freelancers for your business needs</p>
          </div>
          <Link href="/services" className="text-primary font-bold hover:underline">View All →</Link>
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
                <div className="relative h-32 rounded-xl overflow-hidden mb-3 shadow-md group-hover:shadow-xl transition-all">
                  <Image 
                    src={cat.image} 
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="font-bold text-white text-sm">{cat.name}</h3>
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
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 font-heading">Wholesale Products</h2>
              <p className="text-gray-600 mt-2">Bulk deals for your business</p>
            </div>
            <Link href="/products" className="text-primary font-bold hover:underline">View All →</Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {productCategories.map((cat, idx) => (
              <Link href={`/products/${cat.name.toLowerCase().replace(/ /g, '-')}`} key={idx} className="group">
                <div className="relative h-32 rounded-xl overflow-hidden mb-3 shadow-md group-hover:shadow-xl transition-all">
                  <Image 
                    src={cat.image} 
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="font-bold text-white text-sm">{cat.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Top Sellers */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 font-heading">Top Verified Sellers</h2>
            <p className="text-gray-600 mt-2">Trusted businesses you can rely on</p>
          </div>
          <Link href="/vendors" className="text-primary font-bold hover:underline">View All →</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topSellers.map((seller) => (
            <div key={seller.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all group">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={seller.image} alt={seller.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 truncate group-hover:text-primary transition-colors">{seller.name}</h3>
                  <p className="text-sm text-gray-600">{seller.category}</p>
                </div>
                {seller.verified && (
                  <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-bold text-gray-900">{seller.rating}</span>
                </div>
                <span className="text-gray-600">{seller.totalSales} sales</span>
              </div>
              <Link href={`/seller/${seller.id}`}>
                <Button variant="outline" className="w-full mt-4">Visit Store</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 font-heading">Ready to Start Selling?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join BizConnect today and reach thousands of verified buyers across Bangladesh
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
                Start Selling
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
