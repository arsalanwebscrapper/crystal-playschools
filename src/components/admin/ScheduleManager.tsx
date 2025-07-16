import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ref, onValue, push, update, remove } from 'firebase/database';
import { database } from '@/lib/firebase';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Save, X, Clock } from 'lucide-react';

interface ScheduleItem {
  id: string;
  day: string;
  time: string;
  activity: string;
  description: string;
  ageGroup: string;
}

const days = [
  'Monday',
  'Tuesday', 
  'Wednesday',
  'Thursday',
  'Friday'
];

const ageGroups = [
  'All Ages',
  '2-3 Years',
  '3-4 Years', 
  '4-5 Years',
  '5-6 Years'
];

const ScheduleManager = () => {
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    day: '',
    time: '',
    activity: '',
    description: '',
    ageGroup: ''
  });

  useEffect(() => {
    const scheduleRef = ref(database, 'daily-schedule');
    const unsubscribe = onValue(scheduleRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const items = Object.entries(data).map(([id, item]: [string, any]) => ({
          id,
          ...item
        }));
        setScheduleItems(items);
      } else {
        setScheduleItems([]);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleSave = async (itemId?: string) => {
    try {
      const scheduleRef = ref(database, itemId ? `daily-schedule/${itemId}` : 'daily-schedule');

      if (itemId) {
        await update(scheduleRef, formData);
        toast.success('Schedule item updated successfully');
        setEditingItem(null);
      } else {
        await push(scheduleRef, formData);
        toast.success('Schedule item added successfully');
        setShowAddForm(false);
      }

      setFormData({ day: '', time: '', activity: '', description: '', ageGroup: '' });
    } catch (error) {
      toast.error('Error saving schedule item');
    }
  };

  const handleEdit = (item: ScheduleItem) => {
    setFormData({
      day: item.day,
      time: item.time,
      activity: item.activity,
      description: item.description,
      ageGroup: item.ageGroup
    });
    setEditingItem(item.id);
  };

  const handleDelete = async (itemId: string) => {
    if (confirm('Are you sure you want to delete this schedule item?')) {
      try {
        const itemRef = ref(database, `daily-schedule/${itemId}`);
        await remove(itemRef);
        toast.success('Schedule item deleted successfully');
      } catch (error) {
        toast.error('Error deleting schedule item');
      }
    }
  };

  const groupedSchedule = scheduleItems.reduce((acc, item) => {
    if (!acc[item.day]) {
      acc[item.day] = [];
    }
    acc[item.day].push(item);
    return acc;
  }, {} as Record<string, ScheduleItem[]>);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-muted-foreground">Loading schedule...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Daily Schedule Management</h3>
        <Button
          onClick={() => setShowAddForm(true)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Schedule Item
        </Button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold">Add New Schedule Item</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowAddForm(false);
                setFormData({ day: '', time: '', activity: '', description: '', ageGroup: '' });
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="add-day">Day</Label>
              <Select value={formData.day} onValueChange={(value) => setFormData(prev => ({ ...prev, day: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {days.map(day => (
                    <SelectItem key={day} value={day}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="add-time">Time</Label>
              <Input
                id="add-time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                placeholder="e.g., 9:00 AM - 10:00 AM"
              />
            </div>
            <div>
              <Label htmlFor="add-activity">Activity</Label>
              <Input
                id="add-activity"
                value={formData.activity}
                onChange={(e) => setFormData(prev => ({ ...prev, activity: e.target.value }))}
                placeholder="Activity name"
              />
            </div>
            <div>
              <Label htmlFor="add-age-group">Age Group</Label>
              <Select value={formData.ageGroup} onValueChange={(value) => setFormData(prev => ({ ...prev, ageGroup: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select age group" />
                </SelectTrigger>
                <SelectContent>
                  {ageGroups.map(group => (
                    <SelectItem key={group} value={group}>{group}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="add-description">Description</Label>
              <Textarea
                id="add-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Activity description"
                rows={3}
              />
            </div>
            <div className="md:col-span-2">
              <Button onClick={() => handleSave()} className="gap-2">
                <Save className="w-4 h-4" />
                Add Schedule Item
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Schedule by Day */}
      {days.map(day => (
        <Card key={day} className="p-6">
          <h4 className="font-semibold mb-4 text-primary">{day}</h4>
          <div className="space-y-4">
            {(groupedSchedule[day] || []).map((item) => (
              <div key={item.id} className="border-l-4 border-primary pl-4">
                {editingItem === item.id ? (
                  <div className="grid gap-4">
                    <div className="flex justify-between items-center">
                      <h5 className="font-medium">Edit Schedule Item</h5>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingItem(null);
                          setFormData({ day: '', time: '', activity: '', description: '', ageGroup: '' });
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <Label>Time</Label>
                        <Input
                          value={formData.time}
                          onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>Activity</Label>
                        <Input
                          value={formData.activity}
                          onChange={(e) => setFormData(prev => ({ ...prev, activity: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>Age Group</Label>
                        <Select value={formData.ageGroup} onValueChange={(value) => setFormData(prev => ({ ...prev, ageGroup: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ageGroups.map(group => (
                              <SelectItem key={group} value={group}>{group}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        rows={2}
                      />
                    </div>
                    <Button onClick={() => handleSave(item.id)} className="gap-2 w-fit">
                      <Save className="w-4 h-4" />
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="font-medium">{item.time}</span>
                        <span className="text-sm text-muted-foreground">({item.ageGroup})</span>
                      </div>
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
                    <h5 className="font-semibold mb-1">{item.activity}</h5>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                )}
              </div>
            ))}
            
            {(!groupedSchedule[day] || groupedSchedule[day].length === 0) && (
              <p className="text-muted-foreground italic">No activities scheduled for {day}</p>
            )}
          </div>
        </Card>
      ))}

      {scheduleItems.length === 0 && (
        <Card className="p-8 text-center">
          <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h4 className="font-semibold mb-2">No Schedule Items</h4>
          <p className="text-muted-foreground mb-4">Add your first schedule item to get started.</p>
          <Button onClick={() => setShowAddForm(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Schedule Item
          </Button>
        </Card>
      )}
    </div>
  );
};

export default ScheduleManager;