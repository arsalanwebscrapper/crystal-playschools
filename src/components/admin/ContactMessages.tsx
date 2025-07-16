import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ref, remove } from 'firebase/database';
import { database } from '@/lib/firebase';
import { toast } from 'sonner';
import { Trash2, Mail, Phone, Calendar, User, Baby } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  childAge: string;
  message: string;
  timestamp: string;
}

interface ContactMessagesProps {
  contactMessages: ContactMessage[];
}

const ContactMessages = ({ contactMessages }: ContactMessagesProps) => {
  const handleDelete = async (messageId: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const messageRef = ref(database, `contact-messages/${messageId}`);
        await remove(messageRef);
        toast.success('Message deleted successfully!');
      } catch (error) {
        toast.error('Error deleting message');
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Contact Messages</h2>
        <p className="text-muted-foreground">
          {contactMessages.length} total messages
        </p>
      </div>

      <div className="grid gap-6">
        {contactMessages.length === 0 ? (
          <Card className="glass-card border-0 p-8 text-center">
            <p className="text-muted-foreground">No contact messages yet.</p>
          </Card>
        ) : (
          contactMessages.map((message) => (
            <Card key={message.id} className="glass-card border-0 p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-primary text-white">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{message.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(message.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(message.id)}
                    className="gap-1 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </Button>
                </div>

                {/* Contact Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>{message.email}</span>
                  </div>
                  {message.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>{message.phone}</span>
                    </div>
                  )}
                  {message.childAge && (
                    <div className="flex items-center gap-2 text-sm">
                      <Baby className="w-4 h-4 text-primary" />
                      <span>Child's Age: {message.childAge}</span>
                    </div>
                  )}
                </div>

                {/* Message */}
                {message.message && (
                  <div className="bg-muted/50 rounded-xl p-4">
                    <h4 className="font-medium mb-2">Message:</h4>
                    <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(`mailto:${message.email}`, '_blank')}
                    className="gap-1"
                  >
                    <Mail className="w-3 h-3" />
                    Reply via Email
                  </Button>
                  {message.phone && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`tel:${message.phone}`, '_blank')}
                      className="gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      Call
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactMessages;