'use client';

import { fadeInUp, staggerContainer } from '@/utils/animations';
import { motion } from 'framer-motion';
import { MapPin, Package, Star, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Count-up animation component
function CountUp({ end, suffix = '', duration = 2000, shouldStart }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!shouldStart) return;
    
    let startTime;
    let animationFrame;
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;
      
      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, shouldStart]);
  
  return <>{count.toLocaleString()}{suffix}</>;
}

export default function StatsSection() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  const stats = [
    { icon: <Users className="w-8 h-8" />, number: 10000, suffix: '+', label: 'Active Sellers' },
    { icon: <Package className="w-8 h-8" />, number: 50000, suffix: '+', label: 'Products & Services' },
    { icon: <Star className="w-8 h-8" />, number: 100000, suffix: '+', label: 'Happy Customers' },
    { icon: <MapPin className="w-8 h-8" />, number: 64, suffix: '', label: 'Districts Covered' }
  ];

  return (
    <motion.section
      ref={sectionRef}
      className="py-20 bg-primary text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 font-heading"
          variants={fadeInUp}
        >
          Growing Together
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center"
              variants={fadeInUp}
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <h3 className="text-5xl font-bold mb-3">
                <CountUp 
                  end={stat.number} 
                  suffix={stat.suffix} 
                  duration={2500}
                  shouldStart={hasAnimated}
                />
              </h3>
              <p className="text-white/80 text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
