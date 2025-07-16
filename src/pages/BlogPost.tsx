import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { database } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  createdAt: string;
  published: boolean;
}

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate('/blog');
      return;
    }

    const blogRef = ref(database, `blog-posts/${id}`);
    const unsubscribe = onValue(blogRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.published) {
        setBlogPost({ id, ...data });
      } else {
        navigate('/blog');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-24 pb-20 px-6">
          <div className="container mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading blog post...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blogPost) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Button
            variant="outline"
            onClick={() => navigate('/blog')}
            className="mb-8 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Button>

          {/* Blog Post */}
          <Card className="glass-card border-0 overflow-hidden">
            <div className="p-8 lg:p-12">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl lg:text-5xl font-display font-bold gradient-text mb-6 leading-tight">
                  {blogPost.title}
                </h1>
                
                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(blogPost.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {blogPost.author}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-foreground leading-relaxed"
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {blogPost.content}
                </div>
              </div>
            </div>
          </Card>

          {/* Call to Action */}
          <Card className="glass-card border-0 p-8 mt-12 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Enjoyed this article? 💫
            </h3>
            <p className="text-muted-foreground mb-6">
              Share it with other parents or come visit us to learn more about our programs!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-gradient-primary text-white border-0"
                onClick={() => navigate('/#contact')}
              >
                Contact Us
              </Button>
              <Button 
                variant="outline" 
                className="glass-button"
                onClick={() => navigate('/blog')}
              >
                More Articles
              </Button>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;