/**
 * Hero Slider Component
 * Auto-rotating slider showcasing service categories
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '../ui/Button';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Find Expert Designers",
      subtitle: "Professional graphics & branding services",
      description: "Get your business noticed with stunning designs from verified freelancers",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1920&h=800&fit=crop",
      cta: "Browse Designers",
      link: "/services/design",
      color: "cyan-600"
    },
    {
      title: "Wholesale Products",
      subtitle: "Bulk deals for your business",
      description: "Source quality products at wholesale prices from verified suppliers",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=800&fit=crop",
      cta: "Shop Wholesale",
      link: "/products",
      color: "cyan-600"
    },
    {
      title: "Digital Marketing Experts",
      subtitle: "Grow your online presence",
      description: "Connect with marketing professionals to boost your business",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=800&fit=crop",
      cta: "Find Marketers",
      link: "/services/marketing",
      color: "cyan-600"
    },
    {
      title: "Web Development Services",
      subtitle: "Build your online store",
      description: "Professional developers ready to bring your vision to life",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=800&fit=crop",
      cta: "Hire Developers",
      link: "/services/development",
      color: "cyan-600"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[500px] lg:h-[600px] overflow-hidden bg-gray-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-80`}></div>
          </div>

          {/* Content */}
          <div className="relative h-full container mx-auto px-6 flex items-center">
            <div className="max-w-2xl text-white">
              <div className="mb-4 inline-block">
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                  {slide.subtitle}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight font-heading animate-fade-in">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
                {slide.description}
              </p>
              <div className="flex gap-4">
                <Link href={slide.link}>
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-bold shadow-xl"
                  >
                    {slide.cta}
                  </Button>
                </Link>
                <Link href="/register">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold"
                  >
                    Start Selling
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all group"
      >
        <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all group"
      >
        <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? 'w-12 h-3 bg-white'
                : 'w-3 h-3 bg-white/50 hover:bg-white/75'
            } rounded-full`}
          />
        ))}
      </div>
    </div>
  );
}
