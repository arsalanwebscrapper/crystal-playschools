import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ref, onValue, push, remove, update } from 'firebase/database';
import { database } from '@/lib/firebase';
import { toast } from 'sonner';
import { MessageSquare, FileText, Users, LogOut, Plus, Image, Calendar } from 'lucide-react';
import BlogManager from './admin/BlogManager';
import ContactMessages from './admin/ContactMessages';
import GalleryManager from './admin/GalleryManager';
import ScheduleManager from './admin/ScheduleManager';
import EnrollmentManager from './admin/EnrollmentManager';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  createdAt: string;
  published: boolean;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  childAge: string;
  message: string;
  timestamp: string;
}

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }

    // Listen to blog posts
    const blogRef = ref(database, 'blog-posts');
    const unsubscribeBlog = onValue(blogRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const posts = Object.entries(data).map(([id, post]: [string, any]) => ({
          id,
          ...post
        }));
        setBlogPosts(posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      } else {
        setBlogPosts([]);
      }
      setLoading(false);
    });

    // Listen to contact messages
    const contactRef = ref(database, 'contact-messages');
    const unsubscribeContact = onValue(contactRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messages = Object.entries(data).map(([id, message]: [string, any]) => ({
          id,
          ...message
        }));
        setContactMessages(messages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
      } else {
        setContactMessages([]);
      }
    });

    return () => {
      unsubscribeBlog();
      unsubscribeContact();
    };
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-bold gradient-text">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back, {user?.email}
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card border-0 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-primary text-white">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-2xl">{blogPosts.length}</h3>
                <p className="text-muted-foreground">Blog Posts</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card border-0 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-secondary text-white">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-2xl">{contactMessages.length}</h3>
                <p className="text-muted-foreground">Contact Messages</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card border-0 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-card text-white">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-2xl">{contactMessages.filter(m => m.childAge).length}</h3>
                <p className="text-muted-foreground">Admission Inquiries</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="enrollments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
            <TabsTrigger value="blog">Blog Management</TabsTrigger>
            <TabsTrigger value="messages">Contact Messages</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="schedule">Daily Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="enrollments">
            <EnrollmentManager />
          </TabsContent>

          <TabsContent value="blog">
            <BlogManager blogPosts={blogPosts} />
          </TabsContent>

          <TabsContent value="messages">
            <ContactMessages contactMessages={contactMessages} />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryManager />
          </TabsContent>

          <TabsContent value="schedule">
            <ScheduleManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;