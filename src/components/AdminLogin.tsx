import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Invalid credentials. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-primary p-6">
      <Card className="glass-card border-0 p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold gradient-text">
            Admin Login
          </h1>
          <p className="text-muted-foreground mt-2">
            Sign in to access the admin dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-sm font-medium mb-2 block">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border-2 focus:ring-primary"
              placeholder="admin@crystalplayschool.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-sm font-medium mb-2 block">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border-2 focus:ring-primary"
              placeholder="Enter your password"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-primary text-white border-0 py-6 rounded-2xl text-lg font-semibold hover:scale-105 transition-transform"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;