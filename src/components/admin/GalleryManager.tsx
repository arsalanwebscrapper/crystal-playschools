import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ref, onValue, push, update, remove } from 'firebase/database';
import { database } from '@/lib/firebase';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Save, X, Image } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  order: number;
}

const GalleryManager = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: ''
  });

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
        setGalleryItems([]);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleSave = async (itemId?: string) => {
    try {
      const galleryRef = ref(database, itemId ? `gallery-items/${itemId}` : 'gallery-items');
      const itemData = {
        ...formData,
        order: itemId ? galleryItems.find(item => item.id === itemId)?.order || 0 : galleryItems.length
      };

      if (itemId) {
        await update(galleryRef, itemData);
        toast.success('Gallery item updated successfully');
        setEditingItem(null);
      } else {
        await push(galleryRef, itemData);
        toast.success('Gallery item added successfully');
        setShowAddForm(false);
      }

      setFormData({ title: '', description: '', image: '' });
    } catch (error) {
      toast.error('Error saving gallery item');
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image
    });
    setEditingItem(item.id);
  };

  const handleDelete = async (itemId: string) => {
    if (confirm('Are you sure you want to delete this gallery item?')) {
      try {
        const itemRef = ref(database, `gallery-items/${itemId}`);
        await remove(itemRef);
        toast.success('Gallery item deleted successfully');
      } catch (error) {
        toast.error('Error deleting gallery item');
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-muted-foreground">Loading gallery items...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Gallery Management</h3>
        <Button
          onClick={() => setShowAddForm(true)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Item
        </Button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold">Add New Gallery Item</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowAddForm(false);
                setFormData({ title: '', description: '', image: '' });
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid gap-4">
            <div>
              <Label htmlFor="add-title">Title</Label>
              <Input
                id="add-title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter title..."
              />
            </div>
            <div>
              <Label htmlFor="add-description">Description</Label>
              <Textarea
                id="add-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter description..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="add-image">Image URL</Label>
              <Input
                id="add-image"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                placeholder="Enter image URL..."
              />
            </div>
            <Button onClick={() => handleSave()} className="gap-2">
              <Save className="w-4 h-4" />
              Add Item
            </Button>
          </div>
        </Card>
      )}

      {/* Gallery Items */}
      <div className="grid gap-4">
        {galleryItems.map((item) => (
          <Card key={item.id} className="p-6">
            {editingItem === item.id ? (
              <div className="grid gap-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">Edit Gallery Item</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingItem(null);
                      setFormData({ title: '', description: '', image: '' });
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div>
                  <Label htmlFor={`edit-title-${item.id}`}>Title</Label>
                  <Input
                    id={`edit-title-${item.id}`}
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor={`edit-description-${item.id}`}>Description</Label>
                  <Textarea
                    id={`edit-description-${item.id}`}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor={`edit-image-${item.id}`}>Image URL</Label>
                  <Input
                    id={`edit-image-${item.id}`}
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  />
                </div>
                <Button onClick={() => handleSave(item.id)} className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Image className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(item)}
                      className="gap-1"
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      className="gap-1 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {galleryItems.length === 0 && (
        <Card className="p-8 text-center">
          <Image className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h4 className="font-semibold mb-2">No Gallery Items</h4>
          <p className="text-muted-foreground mb-4">Add your first gallery item to get started.</p>
          <Button onClick={() => setShowAddForm(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Gallery Item
          </Button>
        </Card>
      )}
    </div>
  );
};

export default GalleryManager;