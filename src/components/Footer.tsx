import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-primary/10 via-fun-purple/10 to-accent/10 pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {/* School Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-3xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">C</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl gradient-text">
                  Crystal Play School
                </h3>
                <p className="text-muted-foreground">Where Learning Meets Fun</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-md">
              We're committed to providing a safe, nurturing environment where 
              children can explore, learn, and grow. Every child is special, 
              and we celebrate their unique journey of discovery.
            </p>

            {/* Newsletter Signup */}
            <div className="glass-card rounded-2xl p-6">
              <h4 className="font-bold mb-3">🌟 Stay Updated!</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest news, events, and fun activities delivered to your inbox!
              </p>
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter your email"
                  className="rounded-xl border-2"
                />
                <Button className="bg-gradient-primary text-white border-0 px-6 rounded-xl font-semibold hover:scale-105 transition-transform whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                "About Us",
                "Our Programs",
                "Activities",
                "Gallery",
                "Admissions",
                "Parent Portal",
                "Events",
                "Contact"
              ].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  123 Rainbow Street<br />
                  Happy Valley, Cityville<br />
                  12345
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-success flex-shrink-0" />
                <div className="text-sm">
                  <a href="tel:+15551234567" className="text-muted-foreground hover:text-primary transition-colors">
                    +1 (555) 123-PLAY
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-fun-orange flex-shrink-0" />
                <div className="text-sm">
                  <a href="mailto:hello@crystalplayschool.com" className="text-muted-foreground hover:text-primary transition-colors">
                    hello@crystalplayschool.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-fun-purple mt-1 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  Mon - Fri: 8:00 AM - 5:00 PM<br />
                  Sat: 9:00 AM - 2:00 PM
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="font-semibold mb-3">Follow Us</h5>
              <div className="flex gap-3">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="glass-button p-2 rounded-xl hover:scale-110 transition-transform"
                >
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="glass-button p-2 rounded-xl hover:scale-110 transition-transform"
                >
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="glass-button p-2 rounded-xl hover:scale-110 transition-transform"
                >
                  <Twitter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground text-center md:text-left">
              © 2024 Crystal Play School. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Accessibility</a>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Made with <Heart className="w-4 h-4 text-red-500" /> for amazing kids
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;