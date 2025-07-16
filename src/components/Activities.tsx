import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Paintbrush, 
  Music, 
  Book, 
  TreePine, 
  Users, 
  Gamepad2,
  Cookie,
  Puzzle
} from "lucide-react";

const Activities = () => {
  const activities = [
    {
      icon: Paintbrush,
      title: "Arts & Crafts",
      description: "Colorful creative sessions with painting, drawing, and crafting",
      emoji: "🎨",
      color: "bg-fun-pink",
      textColor: "text-fun-pink",
      borderColor: "border-fun-pink"
    },
    {
      icon: Music,
      title: "Music & Dance",
      description: "Rhythm, songs, and movement to develop coordination",
      emoji: "🎵",
      color: "bg-fun-orange",
      textColor: "text-fun-orange",
      borderColor: "border-fun-orange"
    },
    {
      icon: Book,
      title: "Story Time",
      description: "Engaging stories that spark imagination and language skills",
      emoji: "📚",
      color: "bg-fun-blue",
      textColor: "text-fun-blue",
      borderColor: "border-fun-blue"
    },
    {
      icon: TreePine,
      title: "Nature Exploration",
      description: "Garden walks and outdoor discovery adventures",
      emoji: "🌿",
      color: "bg-fun-green",
      textColor: "text-fun-green",
      borderColor: "border-fun-green"
    },
    {
      icon: Users,
      title: "Social Play",
      description: "Group activities to build friendships and teamwork",
      emoji: "👫",
      color: "bg-fun-purple",
      textColor: "text-fun-purple",
      borderColor: "border-fun-purple"
    },
    {
      icon: Gamepad2,
      title: "Educational Games",
      description: "Fun learning games for numbers, letters, and shapes",
      emoji: "🎮",
      color: "bg-fun-yellow",
      textColor: "text-fun-yellow",
      borderColor: "border-fun-yellow"
    },
    {
      icon: Cookie,
      title: "Cooking Fun",
      description: "Simple cooking activities to learn measurements and following instructions",
      emoji: "👩‍🍳",
      color: "bg-fun-red",
      textColor: "text-fun-red",
      borderColor: "border-fun-red"
    },
    {
      icon: Puzzle,
      title: "Problem Solving",
      description: "Puzzles and brain games to develop critical thinking",
      emoji: "🧩",
      color: "bg-fun-lime",
      textColor: "text-fun-lime",
      borderColor: "border-fun-lime"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-br from-fun-lime/20 via-fun-pink/20 to-fun-blue/20">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16 space-y-4 lg:space-y-6">
          <h2 className="responsive-heading font-display font-bold rainbow-text gentle-bounce">
            Fun Learning Activities 🎪✨
          </h2>
          <p className="responsive-text text-fun-purple font-semibold max-w-4xl mx-auto leading-relaxed">
            Every day brings new adventures! Our carefully designed activities 
            help children develop skills while having the time of their lives! 🎉🌟
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 lg:mb-16">
          {activities.map((activity, index) => (
            <Card 
              key={index}
              className={`cartoon-card border-4 ${activity.borderColor} overflow-hidden smooth-hover group cursor-pointer`}
              style={{animationDelay: `${index * 0.05}s`}}
            >
              {/* Colorful Header */}
              <div className={`${activity.color} p-4 sm:p-6 text-center text-white relative overflow-hidden`}>
                <div className="text-3xl sm:text-4xl lg:text-5xl mb-2 transform group-hover:scale-110 smooth-hover relative z-10">
                  {activity.emoji}
                </div>
                <activity.icon className="w-6 h-6 sm:w-7 lg:w-8 sm:h-7 lg:h-8 mx-auto opacity-80 relative z-10" />
                
                {/* Decorative circles */}
                <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-8 h-8 sm:w-12 lg:w-16 sm:h-12 lg:h-16 bg-white/30 rounded-full float-animation"></div>
                <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-6 h-6 sm:w-8 lg:w-12 sm:h-8 lg:h-12 bg-white/20 rounded-full float-animation-delayed"></div>
              </div>
              
              {/* Content */}
              <div className="p-4 sm:p-6 bg-gradient-card">
                <h3 className={`text-base sm:text-lg font-bold mb-2 sm:mb-3 text-center ${activity.textColor}`}>{activity.title}</h3>
                <p className="text-foreground font-medium text-xs sm:text-sm text-center leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Schedule Section */}
        <div className="glass-card rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-display font-bold mb-4">Daily Schedule 📅</h3>
            <p className="text-muted-foreground">
              A perfect blend of learning, play, and rest throughout the day
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { time: "9:00 AM", activity: "Morning Circle", icon: "☀️" },
              { time: "10:00 AM", activity: "Learning Time", icon: "📖" },
              { time: "11:00 AM", activity: "Outdoor Play", icon: "🏃‍♀️" },
              { time: "12:00 PM", activity: "Lunch & Rest", icon: "🍎" },
              { time: "1:00 PM", activity: "Creative Arts", icon: "🎨" },
              { time: "2:00 PM", activity: "Music & Dance", icon: "🎵" },
              { time: "3:00 PM", activity: "Story Time", icon: "📚" },
              { time: "4:00 PM", activity: "Home Time", icon: "👋" }
            ].map((slot, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-gradient-card">
                <div className="text-2xl mb-2">{slot.icon}</div>
                <div className="font-semibold text-primary mb-1">{slot.time}</div>
                <div className="text-sm text-muted-foreground">{slot.activity}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button className="bg-gradient-primary text-white border-0 px-4 sm:px-8 py-4 sm:py-6 rounded-2xl text-sm sm:text-lg font-semibold hover:scale-105 transition-transform">
              📋 View Full Curriculum
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Activities;