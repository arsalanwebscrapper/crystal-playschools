import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ref, onValue } from 'firebase/database';
import { database } from '@/lib/firebase';
import classroomImage from "@/assets/classroom-image.jpg";
import playgroundImage from "@/assets/playground-image.jpg";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  order: number;
}

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Default gallery items as fallback
  const defaultGalleryItems = [
    {
      id: "default-1",
      image: classroomImage,
      title: "Colorful Classroom",
      description: "Our bright and engaging learning spaces",
      order: 0
    },
    {
      id: "default-2", 
      image: playgroundImage,
      title: "Safe Playground",
      description: "Fun outdoor activities and equipment",
      order: 1
    },
    {
      id: "default-3",
      image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=600&fit=crop",
      title: "Art Corner",
      description: "Creative spaces for artistic expression",
      order: 2
    },
    {
      id: "default-4",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop",
      title: "Reading Nook",
      description: "Cozy spaces for story time and quiet reading",
      order: 3
    },
    {
      id: "default-5",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      title: "Music Room",
      description: "Interactive music and movement sessions",
      order: 4
    },
    {
      id: "default-6",
      image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=600&fit=crop",
      title: "Happy Kids",
      description: "Joyful moments of learning and play",
      order: 5
    }
  ];

  useEffect(() => {
    const galleryRef = ref(database, 'gallery-items');
    const unsubscribe = onValue(galleryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const items = Object.entries(data)
          .map(([id, item]: [string, any]) => ({
            id,
            ...item
          }))
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        setGalleryItems(items);
      } else {
        // Use default items if no custom items are found
        setGalleryItems(defaultGalleryItems);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const displayItems = galleryItems.length > 0 ? galleryItems : defaultGalleryItems;

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-fun-yellow/20 via-fun-green/20 to-fun-purple/20">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold rainbow-text mb-6 wiggle-animation">
            Our Happy Moments 📸✨🎪
          </h2>
          <p className="text-xl text-fun-purple font-semibold max-w-3xl mx-auto">
            Take a peek into our vibrant world! See the joy, learning, and 
            wonderful memories we create together every day! 🌈🎉
          </p>
        </div>

        {/* Gallery Grid */}
        {loading ? (
           <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-fun-pink mx-auto bounce-animation"></div>
            <p className="mt-4 text-fun-purple font-semibold">Loading magical moments... ✨</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
             {displayItems.map((item, index) => (
            <Card 
              key={item.id}
              className="cartoon-card border-4 border-fun-pink hover:border-fun-yellow overflow-hidden group hover:scale-105 transition-all duration-500 cursor-pointer bounce-animation"
              style={{animationDelay: `${index * 0.15}s`}}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-rainbow/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-lg font-bold mb-2">{item.title} 🎯</h3>
                  <p className="text-sm opacity-90">{item.description}</p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-fun-yellow/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bounce-animation">
                  <span className="text-white text-lg">✨</span>
                </div>
                <div className="absolute top-4 left-4 w-8 h-8 bg-fun-pink/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 float-animation">
                  <span className="text-white text-sm">🌟</span>
                </div>
              </div>
            </Card>
            ))}
          </div>
        )}

        {/* Fun Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { number: "500+", label: "Happy Photos", emoji: "📷" },
            { number: "50+", label: "Fun Events", emoji: "🎉" },
            { number: "200+", label: "Smiling Faces", emoji: "😊" },
            { number: "100%", label: "Pure Joy", emoji: "💖" }
           ].map((stat, index) => (
            <div key={index} className="cartoon-card border-4 border-fun-blue hover:border-fun-orange p-6 text-center hover:scale-110 transition-transform bounce-animation" style={{animationDelay: `${index * 0.2}s`}}>
              <div className="text-4xl mb-2 wiggle-animation">{stat.emoji}</div>
              <div className="text-2xl font-bold text-fun-purple mb-1">{stat.number}</div>
              <div className="text-foreground font-semibold text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="cartoon-card p-8 lg:p-12 max-w-3xl mx-auto border-4 border-fun-rainbow bg-gradient-rainbow/10 float-animation">
            <h3 className="text-3xl font-display font-bold mb-6 rainbow-text">
              Want to See More? 🌟✨🎪
            </h3>
            <p className="text-lg text-fun-purple font-semibold mb-8">
              Follow us on social media or schedule a visit to see our amazing 
              facilities and meet our wonderful teachers in person! 🎉👨‍🏫
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-rainbow text-white border-0 px-8 py-6 rounded-2xl text-lg font-bold hover:scale-110 transition-transform bounce-animation">
                🏫 Schedule a Tour 🎯
              </Button>
              <Button 
                variant="outline" 
                className="glass-button px-8 py-6 rounded-2xl text-lg font-bold border-4 border-fun-green hover:border-fun-orange"
              >
                📱 Follow Us 🌈
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;