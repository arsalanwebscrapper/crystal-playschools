import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Star } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    childAge: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { ref, push } = await import('firebase/database');
      const { database } = await import('@/lib/firebase');
      
      const contactRef = ref(database, 'contact-messages');
      await push(contactRef, {
        ...formData,
        timestamp: new Date().toISOString()
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        childAge: "",
        message: ""
      });
      
      alert("Thank you for your interest! We'll contact you soon. 🌟");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Sorry, there was an error. Please try again later.");
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Rainbow Street, Happy Valley, Cityville - 12345",
      color: "text-fun-red",
      bgColor: "bg-fun-red/10",
      borderColor: "border-fun-red",
      emoji: "🏫"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-PLAY\n+1 (555) 123-7529",
      color: "text-fun-green",
      bgColor: "bg-fun-green/10",
      borderColor: "border-fun-green",
      emoji: "📞"
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "hello@crystalplayschool.com\nadmissions@crystalplayschool.com",
      color: "text-fun-orange",
      bgColor: "bg-fun-orange/10",
      borderColor: "border-fun-orange",
      emoji: "✉️"
    },
    {
      icon: Clock,
      title: "School Hours",
      content: "Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 9:00 AM - 2:00 PM",
      color: "text-fun-purple",
      bgColor: "bg-fun-purple/10",
      borderColor: "border-fun-purple",
      emoji: "⏰"
    }
  ];

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-fun-red/20 via-fun-blue/20 to-fun-green/20 w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold rainbow-text mb-4 sm:mb-6 bounce-animation px-2">
            Let's Connect! 📞✨🎪
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-fun-purple font-semibold max-w-3xl mx-auto px-4">
            Ready to give your child the best start? We'd love to hear from you! 
            Reach out to learn more about our programs or schedule a visit! 🌟🏫
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-16">
          {/* Contact Form */}
          <Card className="cartoon-card border-4 border-fun-yellow hover:border-fun-pink p-4 sm:p-6 lg:p-8 float-animation w-full">
            <h3 className="text-2xl font-bold mb-6 text-center rainbow-text">
              🌟 Get in Touch 🎯
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium mb-2 block">
                    Parent's Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="rounded-xl border-2 focus:ring-primary"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="rounded-xl border-2 focus:ring-primary"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium mb-2 block">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="rounded-xl border-2 focus:ring-primary"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="childAge" className="text-sm font-medium mb-2 block">
                    Child's Age
                  </Label>
                  <Input
                    id="childAge"
                    name="childAge"
                    value={formData.childAge}
                    onChange={handleInputChange}
                    className="rounded-xl border-2 focus:ring-primary"
                    placeholder="e.g., 3 years old"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-sm font-medium mb-2 block">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="rounded-xl border-2 focus:ring-primary resize-none"
                  placeholder="Tell us about your child's interests, any questions you have, or anything else you'd like us to know..."
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-rainbow text-white border-0 py-6 rounded-2xl text-lg font-bold hover:scale-110 transition-transform bounce-animation"
              >
                🚀 Send Message ✨
              </Button>
            </form>

            {/* Trust Badges */}
            <div className="mt-8 pt-8 border-t border-border/50">
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Licensed & Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>5+ Years Experience</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <div className="space-y-3 sm:space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className={`cartoon-card border-2 sm:border-4 ${info.borderColor} hover:border-fun-lime p-3 sm:p-6 hover:scale-105 sm:hover:scale-110 transition-transform bounce-animation`} style={{animationDelay: `${index * 0.2}s`}}>
                <div className="flex items-start gap-2 sm:gap-4">
                  <div className={`p-1.5 sm:p-3 rounded-lg sm:rounded-xl ${info.bgColor} ${info.color} wiggle-animation flex-shrink-0`}>
                    <div className="text-lg sm:text-2xl mb-0.5 sm:mb-1">{info.emoji}</div>
                    <info.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className={`font-bold text-sm sm:text-lg mb-1 sm:mb-2 ${info.color}`}>{info.title} 🎯</h4>
                    <div className="text-xs sm:text-base text-foreground font-medium whitespace-pre-line break-words leading-tight sm:leading-normal">
                      {info.content}
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Map Placeholder */}
            <Card className="cartoon-card border-4 border-fun-blue hover:border-fun-orange p-6 bounce-animation">
              <h4 className="font-bold text-lg mb-4 text-center text-fun-blue">🗺️ Find Us Here 🎯</h4>
              <div className="bg-gradient-rainbow rounded-2xl h-48 flex items-center justify-center">
                <div className="text-center text-white">
                  <MapPin className="w-12 h-12 mx-auto mb-2 bounce-animation" />
                  <div className="font-semibold">Interactive Map ✨</div>
                  <div className="text-sm opacity-90">Click to open in Maps 🗺️</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center px-4">
          <div className="cartoon-card p-4 sm:p-6 lg:p-8 xl:p-12 max-w-4xl mx-auto border-4 border-fun-rainbow bg-gradient-rainbow/10 float-animation w-full">
            <h3 className="text-3xl font-display font-bold mb-6 rainbow-text">
              Ready for a School Tour? 🏫✨🎪
            </h3>
            <p className="text-lg text-fun-purple font-semibold mb-8">
              The best way to experience Crystal Play School is to visit us! 
              Schedule a tour and see why parents and children love our community! 🌟👨‍👩‍👧‍👦
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-rainbow text-white border-0 px-8 py-6 rounded-2xl text-lg font-bold hover:scale-110 transition-transform bounce-animation">
                📅 Book a Tour 🎯
              </Button>
              <Button 
                variant="outline" 
                className="glass-button px-8 py-6 rounded-2xl text-lg font-bold border-4 border-fun-yellow hover:border-fun-pink"
              >
                💬 Chat with Us 🌈
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;