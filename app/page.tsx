"use client"

import Image from "next/image"
import Link from "next/link"
import { HandIcon } from "./components/hand-icon"
import { ChevronRight } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { useScrollToElement } from "./hooks/useScrollToElement"
import React, { useEffect, useState } from "react"

// Standardized style system for consistent UI
const styles = {
  // Colors
  colors: {
    primary: "#f03a37",
    primaryHover: "#d03330",
    text: {
      dark: "#1f2937", // gray-900
      medium: "#4b5563", // gray-700  
      light: "#9ca3af"  // gray-400
    },
    bg: {
      light: "#f9fafb", // gray-50
      white: "#ffffff"
    }
  },
  // Consistent spacing
  spacing: {
    section: {
      y: "py-16 sm:py-20 md:py-24 lg:py-32",
      x: "px-4 sm:px-6 md:px-8"
    },
    container: "container mx-auto px-4 sm:px-6 md:px-8",
  },
  // Typography scale
  text: {
    heading: {
      xl: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold",
      lg: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold",
      md: "text-2xl sm:text-3xl md:text-4xl font-bold",
      sm: "text-xl sm:text-2xl md:text-3xl font-bold",
      xs: "text-lg sm:text-xl md:text-2xl font-bold"
    },
    body: {
      lg: "text-lg sm:text-xl md:text-2xl",
      md: "text-base sm:text-lg md:text-xl",
      sm: "text-sm sm:text-base md:text-lg"
    }
  },
  // Transitions
  transition: {
    default: "transition-all duration-300 ease-in-out",
    fast: "transition-all duration-200 ease-in-out",
    slow: "transition-all duration-500 ease-in-out"
  }
}

// Common button styles to improve consistency
const primaryButtonClasses = `px-6 py-3 bg-[${styles.colors.primary}] text-white font-medium rounded-md hover:bg-[${styles.colors.primaryHover}] ${styles.transition.default} transform hover:scale-105 duration-300 text-base min-h-[44px] motion-safe:hover:scale-105 motion-reduce:hover:scale-100`
const secondaryButtonClasses = `px-6 py-3 border-2 border-[${styles.colors.primary}] text-[${styles.colors.primary}] font-medium rounded-md hover:bg-[${styles.colors.primary}] hover:text-white ${styles.transition.default} text-base min-h-[44px]`

// Reduced motion style for animations
// Add this to the file to provide a utility for reduced motion preferences
function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
  return prefersReducedMotion;
}

// Social Feed Component for better loading and handling of embeds
function SocialFeed({ type }: { type: 'twitter' | 'linkedin' }) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Delay loading embeds for better performance
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (type === 'twitter') {
    // Development placeholder for Twitter
    if (isDevelopment) {
      return (
        <div className="min-h-[400px] bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="h-[400px] flex flex-col items-center justify-center p-6 text-center" aria-live="polite">
            <div className="mb-4 text-[#f03a37] font-bold text-xl">Twitter Feed Preview</div>
            <p className="text-gray-700 mb-3">This Twitter embed will appear in production.</p>
            <p className="text-gray-500 text-sm">Using official Twitter embed API</p>
            <div className="mt-6 p-4 border border-gray-200 rounded-lg w-full max-w-md">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                <div>
                  <div className="font-bold">G1 Ventures</div>
                  <div className="text-gray-500 text-sm">@G1_Ventures</div>
                </div>
              </div>
              <div className="h-px bg-gray-200 my-3"></div>
              <p className="text-gray-700">Sample tweet content from G1 Ventures will appear here in production.</p>
            </div>
          </div>
        </div>
      );
    }
    
    // Production Twitter embed using official Twitter widget
    return (
      <div className="min-h-[400px] bg-white rounded-xl shadow-sm overflow-hidden">
        {!isLoaded && (
          <div className="h-[400px] flex items-center justify-center" aria-live="polite">
            <div className="animate-pulse text-[#f03a37]" role="status">
              <span>Loading Twitter feed...</span>
              <span className="sr-only">Please wait while we load the Twitter feed</span>
            </div>
          </div>
        )}
        {isLoaded && (
          <div className="twitter-embed-container relative" style={{height: '500px'}} aria-label="Twitter Timeline">
            {/* Official Twitter Timeline embed */}
            <div
              style={{
                width: '100%',
                height: '100%',
                overflow: 'auto',
                borderRadius: '12px'
              }}
            >
              <a 
                className="twitter-timeline" 
                data-height="500"
                data-theme="light"
                href="https://twitter.com/G1_Ventures?ref_src=twsrc%5Etfw"
              >
                Tweets by G1_Ventures
              </a>
              {/* Load Twitter widget.js */}
              {typeof window !== 'undefined' && (
                <script
                  async
                  src="https://platform.twitter.com/widgets.js"
                  charSet="utf-8"
                ></script>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // LinkedIn embeds
  
  // Development placeholder for LinkedIn
  if (isDevelopment) {
    return (
      <div className="min-h-[400px] bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="h-[400px] flex flex-col items-center justify-center p-6 text-center" aria-live="polite">
          <div className="mb-4 text-[#0077b5] font-bold text-xl">LinkedIn Company Page Preview</div>
          <p className="text-gray-700 mb-3">This LinkedIn embed will appear in production.</p>
          <p className="text-gray-500 text-sm">Embed URL: https://www.linkedin.com/company/embed/g1vc/</p>
          <div className="mt-6 p-4 border border-gray-200 rounded-lg w-full max-w-md">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
              <div>
                <div className="font-bold">G1 Ventures</div>
                <div className="text-gray-500 text-sm">Investment Management • Blockchain</div>
              </div>
            </div>
            <div className="h-px bg-gray-200 my-3"></div>
            <p className="text-gray-700">G1 Ventures company updates will appear here in production.</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Production LinkedIn embed
  return (
    <div className="min-h-[400px] bg-white rounded-xl shadow-sm overflow-hidden">
      {!isLoaded && (
        <div className="h-[400px] flex items-center justify-center" aria-live="polite">
          <div className="animate-pulse text-[#f03a37]" role="status">
            <span>Loading LinkedIn content...</span>
            <span className="sr-only">Please wait while we load the LinkedIn content</span>
          </div>
        </div>
      )}
      {isLoaded && (
        <div className="linkedin-embed-container" style={{height: '500px', overflow: 'auto'}} aria-label="LinkedIn Company Page">
          <iframe 
            src="https://www.linkedin.com/company/embed/g1vc/"
            style={{
              width: '100%',
              height: '100%', 
              border: '0', 
              borderRadius: '12px'
            }}
            title="G1 Ventures LinkedIn Company Page"
            aria-label="G1 Ventures LinkedIn Company Page"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const scrollToElement = useScrollToElement()
  
  // Added state for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  
  // Check for reduced motion preference
  const prefersReducedMotion = useReducedMotion();

  // Toggle mobile menu function
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Skip to content link for keyboard users */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-[#f03a37] focus:font-medium focus:rounded-md focus:shadow-md">
        Skip to content
      </a>
      
      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50" role="banner">
        <div className={styles.spacing.container + " py-3 sm:py-4 flex justify-between items-center"}>
          <div className={styles.text.heading.md + " text-[#f03a37]"}>G1</div>
          
          {/* Mobile menu button - improved accessibility */}
          <button 
            onClick={toggleMobileMenu}
            className={`md:hidden flex items-center justify-center p-2 rounded-md bg-gray-50 hover:bg-gray-100 ${styles.transition.fast} min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-[#f03a37] focus:ring-offset-2`}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
          
          {/* Desktop Navigation - improved accessibility */}
          <nav className="hidden md:flex space-x-8 lg:space-x-12" role="navigation" aria-label="Main Navigation">
            {["Approach", "Partners", "Portfolio", "Contact"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`${styles.text.body.md} font-medium text-gray-800 hover:text-[#f03a37] ${styles.transition.default} relative group focus:outline-none focus:ring-2 focus:ring-[#f03a37] focus:ring-offset-2 rounded-sm p-2`}
              >
                {item}
                <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-[#f03a37] ${prefersReducedMotion ? "opacity-0 group-hover:opacity-100" : "transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"}`}></span>
              </Link>
            ))}
          </nav>
          
          {/* Desktop CTA Button */}
          <Link
            href="#contact"
            className={`hidden md:inline-block ${primaryButtonClasses} focus:outline-none focus:ring-2 focus:ring-[#f03a37] focus:ring-offset-2`}
          >
            Get Funded
          </Link>
        </div>
        
        {/* Mobile Navigation Menu - improved accessibility with animation preference */}
        {mobileMenuOpen && (
          <div 
            className={`md:hidden bg-white border-t border-gray-100 py-4 ${prefersReducedMotion ? "block" : "animate-fade-in-down"}`} 
            id="mobile-menu" 
            role="menu"
          >
            <div className={styles.spacing.container}>
              <nav className="flex flex-col space-y-4" role="navigation" aria-label="Mobile Navigation">
                {["Approach", "Partners", "Portfolio", "Contact"].map((item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`${styles.text.body.lg} font-medium text-gray-800 hover:text-[#f03a37] ${styles.transition.default} py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f03a37] min-h-[44px] flex items-center`}
                    onClick={() => setMobileMenuOpen(false)}
                    role="menuitem"
                  >
                    {item}
                  </Link>
                ))}
                <Link
                  href="#contact"
                  className={`${primaryButtonClasses} mt-2 inline-block focus:outline-none focus:ring-2 focus:ring-[#f03a37] focus:ring-offset-2`}
                  onClick={() => setMobileMenuOpen(false)}
                  role="menuitem"
                >
                  Get Funded
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section - Improved mobile styling with consistent breakpoints */}
      <section id="main-content" className="relative bg-gray-50 min-h-[80vh] sm:min-h-[90vh] flex items-center pt-20">
        <div className={styles.spacing.container + " py-8 sm:py-12 md:py-16"}>
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
            {/* Left side content - improved for mobile with consistent typography */}
            <div className="w-full md:w-1/2 max-w-xl mx-auto md:mx-0 text-center md:text-left">
              <div className="text-[60px] xs:text-[80px] sm:text-[100px] md:text-[140px] lg:text-[180px] font-bold text-[#f03a37] leading-[0.9] mb-2">
                G1
              </div>
              <h1 className={styles.text.heading.md + " text-[#f03a37] mb-4"}>
                is a proactive investor
              </h1>
              <p className={styles.text.body.lg + " mb-8 sm:mb-12 text-gray-800"}>
                _ redefining web3 investing
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start">
                <Link
                  href="#contact"
                  className={`${secondaryButtonClasses} font-bold px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto text-center`}
                >
                  Get Funded
                </Link>
                <Link
                  href="#portfolio"
                  className={`${secondaryButtonClasses} font-bold px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto text-center`}
                >
                  Portfolio
                </Link>
              </div>
            </div>
            
            {/* Right side visual - only visible on desktop (md) screens */}
            <div className="w-full md:w-1/2 hidden md:flex justify-center md:justify-end h-[300px] md:h-[350px] mt-10 md:mt-0">
              <div className="relative w-full h-full flex items-center justify-center md:justify-end overflow-x-visible">
                <div className="flex space-x-8 md:space-x-16 lg:space-x-20 -mx-4 md:mx-0 scale-90 md:scale-100">
                  {[
                    { image: "/capital.svg", index: 0, alt: "G1 Capital - Investment Strategy" },
                    { image: "/liquidity.svg", index: 1, alt: "Edge Liquidity Services" },
                    { image: "/growth.svg", index: 2, alt: "WTG Growth Support" },
                    { image: "/infra.png", index: 3, alt: "Allnodes Infrastructure" }
                  ].map((item) => (
                    <div
                      key={item.index}
                      className="relative"
                      style={{ 
                        transform: `translateX(${(item.index * 8) - 40}px)`
                      }}
                    >
                      {/* The red slash */}
                      <div className="relative w-[60px] sm:w-[70px] h-[180px] sm:h-[200px] bg-[#f03a37] transform skew-x-[-20deg] z-10" aria-hidden="true"></div>
                      
                      {/* Image overlay */}
                      <div className="absolute inset-0 w-[100px] sm:w-[120px] h-[180px] sm:h-[200px] flex items-center justify-center">
                        <Image 
                          src={item.image} 
                          alt={item.alt} 
                          width={100} 
                          height={180}
                          className="object-contain z-20 transform translate-x-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section - improved for consistency */}
      <section id="approach" className={`bg-gray-50 ${styles.spacing.section.y}`} role="region" aria-labelledby="approach-heading">
        <div className={styles.spacing.container}>
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
            <h2 id="approach-heading" className={`${styles.text.heading.lg} text-[#f03a37] mb-4 sm:mb-6`}>
              Our Approach
            </h2>
            <p className={styles.text.body.lg + " text-gray-800 leading-relaxed"}>
              We combine expertise, capital, and strategic partnerships to create unparalleled value for web3 founders.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              {
                number: "1",
                heading: "We bring together four leaders in the web3 space...",
                text: "to leverage our network and information asymmetry.",
              },
              {
                number: "2",
                heading: "We back exceptional founders...",
                text: "challenging the status quo with fresh take on high-impact problems.",
              },
              {
                number: "3",
                heading: "We value consumer engagement...",
                text: "Through scalable products incentivising users to re-invent and co-create",
              },
              {
                number: "4",
                heading: "Together, we deliver an unmatched offering...",
                text: "with institutional liquidity, critical infrastructure, growth support and venture capital",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`bg-white p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg ${styles.transition.default} transform hover:-translate-y-1 duration-300`}
              >
                <div className="text-4xl text-[#f03a37] mb-4 font-bold">{item.number} _</div>
                <h3 className={`${styles.text.heading.xs} mb-3 text-gray-900 leading-tight`}>
                  {item.heading}
                </h3>
                <p className={`${styles.text.body.md} text-gray-800 leading-relaxed`}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Showcase - improved for consistency */}
      <section className={`bg-gray-50 ${styles.spacing.section.y}`} role="region" aria-labelledby="partners-showcase-heading">
        <div className={styles.spacing.container}>
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12">
            <div className="w-full md:w-1/2 md:sticky md:top-32">
              <h2 id="partners-showcase-heading" className={styles.text.heading.md + " leading-tight mb-8"}>
                <span className="block text-gray-900 mb-2">G1 invests with</span>
                <span className="block text-[#f03a37] mb-2">Edge, WTG, + Allnodes</span>
                <span className="block text-gray-900">to accelerate our portfolio.</span>
              </h2>
            </div>
            <div className="w-full md:w-1/2">
              <div className="space-y-8 md:space-y-12">
                <button 
                  onClick={() => scrollToElement("capital-card")} 
                  className="block group w-full min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#f03a37] focus:ring-offset-2 rounded-sm"
                  aria-label="View G1 Capital details"
                >
                  <div className="text-[60px] sm:text-[80px] md:text-[100px] lg:text-[120px] font-bold text-[#f03a37] leading-none">G1</div>
                </button>
                {[
                  { name: "EDGE", id: "liquidity-card", label: "View Edge Liquidity details" },
                  { name: "WTG", id: "growth-card", label: "View WTG Growth details" },
                  { name: "ALLNODES", id: "infrastructure-card", label: "View Allnodes Infrastructure details" },
                ].map((partner, index) => (
                  <button
                    key={partner.name}
                    onClick={() => scrollToElement(partner.id)}
                    className="block group w-full text-left min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#f03a37] focus:ring-offset-2 rounded-sm"
                    aria-label={partner.label}
                  >
                    <div className="text-[40px] sm:text-[50px] md:text-[70px] lg:text-[100px] font-bold leading-none text-gray-900">
                      {partner.name}
                    </div>
                    <div className={`h-1 bg-[#f03a37] w-full transform origin-left ${styles.transition.default} group-hover:scale-x-110`}></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section - improved for consistency */}
      <section id="partners" className={`bg-gray-50 ${styles.spacing.section.y}`}>
        <div className={styles.spacing.container}>
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
            <h2 className={`${styles.text.heading.lg} text-[#f03a37] mb-4 sm:mb-6`}>
              Our Partners
            </h2>
            <p className={styles.text.body.lg + " text-gray-800 leading-relaxed"}>
              Discover how we're building the future of web3 with innovative partners and technologies.
            </p>
          </div>

          <PortfolioCategory
            id="capital-card"
            title="CAPITAL"
            companyName="G1 is a proactive investor"
            tagline="it deploys venture capital."
            taglineColor="text-blue-700"
            bulletPoints={[
              "cheques of $100-$500k",
              "from pre- to post-seed stages",
              "lead and follow",
              "allocating in crypto since 2018",
            ]}
          />

          <PortfolioCategory
            id="liquidity-card"
            title="LIQUIDITY"
            companyName="Edge is a leading DeFi fund"
            tagline="it offers liquidity."
            taglineColor="text-purple-700"
            bulletPoints={[
              "target positions of $10M - $30M",
              "first cheque in protocol liquidity",
              "track record in scaling TVL",
              "experts in smart contract security",
            ]}
          />

          <PortfolioCategory
            id="growth-card"
            title="GROWTH"
            companyName="WTG is a Go-to-Market Team"
            tagline="it supports growth."
            taglineColor="text-yellow-700"
            bulletPoints={[
              "track record in growing venture value",
              "advised & built 120+ projects",
              "raised $100M+ for founders",
              "10+ years in Web3",
            ]}
          />

          <PortfolioCategory
            id="infrastructure-card"
            title="INFRA"
            companyName="Allnodes is a top validator"
            tagline="it offers node infrastructure."
            taglineColor="text-green-700"
            bulletPoints={[
              "best in infrastructure deployment",
              "favoured by retail stakers",
              "50,000+ hosted nodes",
              "100+ protocols since 2019",
            ]}
          />
        </div>
      </section>

      {/* Portfolio Section - improved for consistency */}
      <section id="portfolio" className={`bg-gray-50 ${styles.spacing.section.y}`} role="region" aria-labelledby="portfolio-heading">
        <div className={styles.spacing.container}>
          <h2 id="portfolio-heading" className={`${styles.text.heading.lg} text-center text-[#f03a37] mb-4 sm:mb-6`}>
            Our Portfolio
          </h2>
          <p className={styles.text.body.lg + " text-gray-800 leading-relaxed text-center mb-10 md:mb-16"}>
            Explore our investments in groundbreaking web3 projects and technologies.
          </p>

          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className={`border-2 border-[#f03a37] p-4 sm:p-6 text-center text-[#f03a37] rounded-lg hover:bg-[#f03a37] hover:text-white ${styles.transition.default} group cursor-pointer shadow-sm hover:shadow-md bg-white focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#f03a37]`}
                  tabIndex={0}
                  role="button"
                  aria-label={`View portfolio item Saline details`}
                  onKeyDown={(e) => e.key === 'Enter' && alert('Portfolio item details would open here')}
                >
                  <div className="mb-2 sm:mb-4 text-lg sm:text-xl font-medium">_0{index + 1}</div>
                  <div className={styles.text.heading.xs + " mb-2 sm:mb-3"}>Saline</div>
                  <div className={styles.text.body.md + " mb-1 sm:mb-2 opacity-80 group-hover:opacity-100"}>2024</div>
                  <div className={styles.text.body.md + " font-medium"}>Pre-seed</div>
                </div>
              ))}
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <Link
              href="#"
              className={`${secondaryButtonClasses} font-bold px-6 sm:px-8 py-3 sm:py-4 inline-block`}
            >
              View All Investments
            </Link>
          </div>
        </div>
      </section>

      {/* Social Media Feed Section - improved for consistency */}
      <section className={`bg-white ${styles.spacing.section.y}`} role="region" aria-labelledby="social-heading">
        <div className={styles.spacing.container}>
          <h2 id="social-heading" className={`${styles.text.heading.lg} text-center text-[#f03a37] mb-4 sm:mb-6`}>
            Social Updates
          </h2>
          <p className={styles.text.body.lg + " text-gray-800 leading-relaxed text-center mb-10 md:mb-16"}>
            Follow our latest updates and insights on LinkedIn and Twitter
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* LinkedIn Posts */}
            <div>
              <h3 className={`${styles.text.heading.sm} mb-6 sm:mb-8 text-gray-900 border-b-2 border-[#f03a37] pb-2 inline-block`}>
                LinkedIn <span className="text-[#f03a37]">Updates</span>
              </h3>
              
              <SocialFeed type="linkedin" />
              
              <div className="mt-6 sm:mt-8 text-center">
                <a 
                  href="https://www.linkedin.com/company/g1-ventures" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`inline-flex items-center text-[#f03a37] font-medium hover:underline ${styles.text.body.md} p-2`}
                  aria-label="Follow us on LinkedIn"
                >
                  Follow us on LinkedIn
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
            
            {/* Twitter Posts */}
            <div>
              <h3 className={`${styles.text.heading.sm} mb-6 sm:mb-8 text-gray-900 border-b-2 border-[#f03a37] pb-2 inline-block`}>
                Twitter <span className="text-[#f03a37]">Feed</span>
              </h3>
              
              <SocialFeed type="twitter" />
              
              <div className="mt-6 sm:mt-8 text-center">
                <a 
                  href="https://twitter.com/G1_Ventures" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`inline-flex items-center text-[#f03a37] font-medium hover:underline ${styles.text.body.md} p-2`}
                  aria-label="Follow us on Twitter"
                >
                  Follow us on Twitter
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - improved for consistency */}
      <section id="contact" className={`bg-[#f03a37] text-white ${styles.spacing.section.y}`}>
        <div className={styles.spacing.container + " text-center"}>
          <h2 className={`${styles.text.heading.lg} mb-4 sm:mb-6`}>
            Ready to Build the Future of Web3?
          </h2>
          <p className={`${styles.text.body.lg} mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed`}>
            Join our portfolio of innovative founders who are redefining the web3 landscape with G1's strategic support.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link
              href="#"
              className={`px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#f03a37] ${styles.text.body.lg} font-bold rounded-md hover:bg-gray-100 ${styles.transition.default} shadow-md hover:shadow-lg transform hover:scale-105 duration-300`}
            >
              Apply for Funding
            </Link>
            <Link
              href="#"
              className={`px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white ${styles.text.body.lg} font-bold rounded-md hover:bg-white hover:text-[#f03a37] ${styles.transition.default} shadow-md hover:shadow-lg transform hover:scale-105 duration-300`}
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - improved color contrast and consistency */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16 md:py-20">
        <div className={styles.spacing.container}>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-10 md:mb-0">
              <div className={`${styles.text.heading.md} text-[#f03a37] mb-4 sm:mb-6`}>G1</div>
              <p className={`max-w-md text-gray-200 ${styles.text.body.md} leading-relaxed`}>
                G1 is a proactive web3 investor redefining the investment landscape through strategic partnerships and
                founder-focused support.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
              <div>
                <h3 className={`${styles.text.heading.xs} mb-3 sm:mb-4`}>Company</h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li>
                    <Link href="#" className={`text-gray-200 hover:text-white ${styles.transition.fast} ${styles.text.body.md}`}>
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className={`text-gray-200 hover:text-white ${styles.transition.fast} ${styles.text.body.md}`}>
                      Team
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className={`text-gray-200 hover:text-white ${styles.transition.fast} ${styles.text.body.md}`}>
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className={`text-gray-200 hover:text-white ${styles.transition.fast} ${styles.text.body.md}`}>
                      Press
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className={`${styles.text.heading.xs} mb-3 sm:mb-4`}>Resources</h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li>
                    <Link href="#" className={`text-gray-200 hover:text-white ${styles.transition.fast} ${styles.text.body.md}`}>
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className={`text-gray-200 hover:text-white ${styles.transition.fast} ${styles.text.body.md}`}>
                      Research
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className={`text-gray-200 hover:text-white ${styles.transition.fast} ${styles.text.body.md}`}>
                      Insights
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className={`text-gray-200 hover:text-white ${styles.transition.fast} ${styles.text.body.md}`}>
                      Events
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1 mt-6 md:mt-0">
                <h3 className={`${styles.text.heading.xs} mb-3 sm:mb-4`}>Connect</h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li>
                    <Link href="#" className={`text-gray-200 hover:text-white ${styles.transition.fast} ${styles.text.body.md}`}>
                      Twitter
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className={`text-gray-200 hover:text-white ${styles.transition.fast} ${styles.text.body.md}`}>
                      LinkedIn
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className={`text-gray-200 hover:text-white ${styles.transition.fast} ${styles.text.body.md}`}>
                      Discord
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className={`text-gray-200 hover:text-white ${styles.transition.fast} ${styles.text.body.md}`}>
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className={`text-gray-300 mb-4 md:mb-0 ${styles.text.body.md}`}>© 2024 G1 Investments. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
              <Link href="#" className={`text-gray-300 hover:text-white ${styles.transition.fast} ${styles.text.body.md}`}>
                Privacy Policy
              </Link>
              <Link href="#" className={`text-gray-300 hover:text-white ${styles.transition.fast} ${styles.text.body.md}`}>
                Terms of Service
              </Link>
              <Link href="#" className={`text-gray-300 hover:text-white ${styles.transition.fast} ${styles.text.body.md}`}>
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

function PortfolioCategory({
  id,
  title,
  companyName,
  tagline,
  taglineColor,
  bulletPoints,
}: {
  id: string
  title: string
  companyName: string
  tagline: string
  taglineColor: string
  bulletPoints: string[]
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  // Use the reduced motion hook
  const prefersReducedMotion = useReducedMotion();

  // Map section ids to the corresponding image files
  const sectionImages: {[key: string]: string} = {
    'capital-card': '/capital-section.svg',
    'liquidity-card': '/liquidity-section.svg',
    'growth-card': '/growth-section.svg',
    'infrastructure-card': '/infra-section.svg'
  }

  return (
    <div
      id={id}
      ref={ref}
      className={`mb-16 sm:mb-24 md:mb-32 bg-white rounded-xl shadow-md overflow-hidden ${styles.transition.default} ${
        inView ? "opacity-100 translate-y-0" : prefersReducedMotion ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      role="region"
      aria-labelledby={`${id}-title`}
    >
      <div className="p-6 sm:p-8 md:p-12 border-b border-gray-100">
        <h2 id={`${id}-title`} className={`${styles.text.heading.lg} text-[#f03a37] mb-0`}>{title}</h2>
      </div>
      <div className="p-6 sm:p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12">
        <div className="w-full md:w-1/3">
          <div className="bg-gray-100 w-full aspect-square rounded-lg overflow-hidden flex items-center justify-center shadow-inner">
            <Image
              src={sectionImages[id] || "/placeholder.svg"}
              alt={`${title} illustration for ${companyName}`}
              width={400}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <h3 className={`${styles.text.heading.md} mb-2 sm:mb-4 text-gray-900`}>{companyName}</h3>
          <h4 className={`${styles.text.heading.sm} ${taglineColor} mb-6 sm:mb-8 font-medium`}>{tagline}</h4>
          <ul className="space-y-3 sm:space-y-4" aria-label={`Benefits of ${title}`}>
            {bulletPoints.map((point, index) => (
              <li key={index} className={`pl-6 sm:pl-8 relative ${styles.text.body.md} text-gray-900 group`}>
                <span className="absolute left-0 font-bold text-[#f03a37] group-hover:text-[#d03330] transition-colors" aria-hidden="true">
                  _
                </span>
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-8 sm:mt-10">
            <Link
              href="#"
              className={`inline-flex items-center text-[#f03a37] ${styles.text.body.lg} font-medium hover:underline group p-2 focus:outline-none focus:ring-2 focus:ring-[#f03a37] rounded-sm`}
              aria-label={`Learn more about ${title}`}
            >
              Learn more{" "}
              <ChevronRight className={`ml-2 h-4 w-4 sm:h-5 sm:w-5 ${prefersReducedMotion ? "" : "transform group-hover:translate-x-1 transition-transform"}`} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

