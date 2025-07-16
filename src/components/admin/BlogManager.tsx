import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ref, push, remove, update } from 'firebase/database';
import { database } from '@/lib/firebase';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Eye, Calendar } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  createdAt: string;
  published: boolean;
}

interface BlogManagerProps {
  blogPosts: BlogPost[];
}

const BlogManager = ({ blogPosts }: BlogManagerProps) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    published: false
  });

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      author: '',
      published: false
    });
    setEditingPost(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingPost) {
        // Update existing post
        const postRef = ref(database, `blog-posts/${editingPost.id}`);
        await update(postRef, {
          ...formData,
          updatedAt: new Date().toISOString()
        });
        toast.success('Blog post updated successfully!');
        setEditingPost(null);
      } else {
        // Create new post
        const blogRef = ref(database, 'blog-posts');
        await push(blogRef, {
          ...formData,
          createdAt: new Date().toISOString()
        });
        toast.success('Blog post created successfully!');
        setIsCreateOpen(false);
      }
      resetForm();
    } catch (error) {
      toast.error('Error saving blog post');
      console.error('Error:', error);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      author: post.author,
      published: post.published
    });
    setEditingPost(post);
  };

  const handleDelete = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const postRef = ref(database, `blog-posts/${postId}`);
        await remove(postRef);
        toast.success('Blog post deleted successfully!');
      } catch (error) {
        toast.error('Error deleting blog post');
        console.error('Error:', error);
      }
    }
  };

  const togglePublished = async (post: BlogPost) => {
    try {
      const postRef = ref(database, `blog-posts/${post.id}`);
      await update(postRef, {
        published: !post.published,
        updatedAt: new Date().toISOString()
      });
      toast.success(`Post ${!post.published ? 'published' : 'unpublished'} successfully!`);
    } catch (error) {
      toast.error('Error updating post status');
      console.error('Error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Blog Post</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter blog post title"
                  required
                />
              </div>
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief description of the post"
                  rows={2}
                  required
                />
              </div>
              <div>
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Author name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your blog post content here..."
                  rows={10}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                />
                <Label htmlFor="published">Publish immediately</Label>
              </div>
              <Button type="submit" className="w-full">
                Create Post
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      {editingPost && (
        <Dialog open={!!editingPost} onOpenChange={() => setEditingPost(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Blog Post</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-excerpt">Excerpt</Label>
                <Textarea
                  id="edit-excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-author">Author</Label>
                <Input
                  id="edit-author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-content">Content</Label>
                <Textarea
                  id="edit-content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="edit-published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                />
                <Label htmlFor="edit-published">Published</Label>
              </div>
              <Button type="submit" className="w-full">
                Update Post
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Blog Posts List */}
      <div className="grid gap-6">
        {blogPosts.length === 0 ? (
          <Card className="glass-card border-0 p-8 text-center">
            <p className="text-muted-foreground">No blog posts yet. Create your first post!</p>
          </Card>
        ) : (
          blogPosts.map((post) => (
            <Card key={post.id} className="glass-card border-0 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{post.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      post.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>By {post.author}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => togglePublished(post)}
                    className="gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    {post.published ? 'Unpublish' : 'Publish'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(post)}
                    className="gap-1"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(post.id)}
                    className="gap-1 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogManager;