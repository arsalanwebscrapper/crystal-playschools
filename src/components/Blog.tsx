import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ref, onValue } from 'firebase/database';
import { database } from '@/lib/firebase';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  createdAt: string;
  published: boolean;
}

const Blog = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const blogRef = ref(database, 'blog-posts');
    const unsubscribe = onValue(blogRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const posts = Object.entries(data)
          .map(([id, post]: [string, any]) => ({
            id,
            ...post
          }))
          .filter((post: BlogPost) => post.published)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setBlogPosts(posts);
      } else {
        setBlogPosts([]);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading blog posts...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <Header />
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold gradient-text mb-6">
              Our Blog 📚
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with the latest news, tips, and insights from Crystal Play School!
            </p>
          </div>

        {/* Blog Posts */}
        {blogPosts.length === 0 ? (
          <Card className="glass-card border-0 p-12 text-center">
            <h3 className="text-2xl font-bold mb-4">Coming Soon! 📝</h3>
            <p className="text-muted-foreground">
              We're working on exciting blog content for you. Check back soon!
            </p>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="glass-card border-0 overflow-hidden hover:scale-105 transition-transform">
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <Button 
                    variant="outline" 
                    className="glass-button group"
                    onClick={() => navigate(`/blog/${post.id}`)}
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Call to Action */}
        {blogPosts.length > 0 && (
          <div className="text-center mt-16">
            <Card className="glass-card border-0 p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                Want to stay updated? 📧
              </h3>
              <p className="text-muted-foreground mb-6">
                Subscribe to our newsletter to get the latest updates and parenting tips!
              </p>
              <Button className="bg-gradient-primary text-white border-0">
                Subscribe Now
              </Button>
            </Card>
          </div>
        )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Blog;