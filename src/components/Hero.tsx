
import { Button } from "@/components/ui/button";
import { Star, Heart, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import EnrollmentModal from "./EnrollmentModal";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 lg:pt-24">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Floating Elements - Responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 sm:top-20 left-4 sm:left-10 text-fun-yellow gentle-bounce">
          <Star className="w-8 h-8 sm:w-12 md:w-16 sm:h-12 md:h-16" />
        </div>
        <div className="absolute top-24 sm:top-32 right-4 sm:right-20 text-fun-pink gentle-wiggle">
          <Heart className="w-6 h-6 sm:w-8 md:w-12 sm:h-8 md:h-12" />
        </div>
        <div className="absolute bottom-32 left-4 sm:left-20 text-fun-orange float-animation hidden sm:block">
          <Sparkles className="w-6 h-6 sm:w-8 md:w-10 sm:h-8 md:h-10" />
        </div>
        <div className="absolute bottom-20 right-8 sm:right-32 text-fun-lime gentle-bounce">
          <Star className="w-8 h-8 sm:w-10 md:w-14 sm:h-10 md:h-14" />
        </div>
        <div className="absolute top-32 sm:top-40 left-1/2 text-fun-blue float-animation-delayed hidden md:block">
          <Sparkles className="w-4 h-4 sm:w-6 md:w-8 sm:h-6 md:h-8" />
        </div>
        <div className="absolute bottom-40 right-4 sm:right-10 text-fun-red gentle-wiggle hidden sm:block">
          <Heart className="w-4 h-4 sm:w-5 md:w-6 sm:h-5 md:h-6" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-white leading-tight">
              Welcome to{" "}
              <span className="rainbow-text block font-extrabold mt-2 gentle-wiggle text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Crystal Play School
              </span>
            </h1>
            <p className="responsive-text text-white/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Where learning meets fun! 🌟 A magical place where your little ones discover, 
              explore, and grow with joy every single day.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <EnrollmentModal />
              <Button 
                variant="outline" 
                size="lg" 
                className="glass-button text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-2xl font-semibold text-purple border-white/40 hover:bg-white/20 hover:text-white hover:border-white/60 smooth-hover"
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
              >
                📸 View Gallery 🎨
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 mt-8 lg:mt-12">
              <div className="cartoon-card p-3 sm:p-4 lg:p-6 text-center border-fun-yellow hover:border-fun-orange smooth-hover">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-fun-yellow mb-1 sm:mb-2">5+ 🏆</div>
                <div className="text-white/80 text-xs sm:text-sm">Years Experience</div>
              </div>
              <div className="cartoon-card p-3 sm:p-4 lg:p-6 text-center border-fun-pink hover:border-fun-red smooth-hover">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-fun-pink mb-1 sm:mb-2">200+ 😊</div>
                <div className="text-white/80 text-xs sm:text-sm">Happy Kids</div>
              </div>
              <div className="cartoon-card p-3 sm:p-4 lg:p-6 text-center border-fun-lime hover:border-fun-green smooth-hover">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-fun-lime mb-1 sm:mb-2">15+ 👨‍🏫</div>
                <div className="text-white/80 text-xs sm:text-sm">Expert Teachers</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative mt-8 lg:mt-0">
            <div className="glass-card rounded-3xl overflow-hidden premium-glow">
              <img 
                src={heroImage} 
                alt="Happy children playing at Crystal Play School"
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -top-3 sm:-top-6 -right-3 sm:-right-6 cartoon-card p-2 sm:p-4 gentle-bounce border-fun-yellow">
              <div className="text-center">
                <div className="text-lg sm:text-2xl mb-1">⭐</div>
                <div className="text-xs sm:text-sm font-semibold text-fun-yellow">Best in City! 🎉</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
