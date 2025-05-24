import React, { useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { useAuth } from '@/contexts/AuthContext';
    import { useToast } from '@/components/ui/use-toast';
    import { LogIn } from 'lucide-react';

    const LoginPage = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const navigate = useNavigate();
      const { login } = useAuth();
      const { toast } = useToast();

      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        const result = await login({ email, password });

        if (result.success) {
          toast({
            title: "Login Successful",
            description: `Welcome back!`,
            variant: "default",
          });
          navigate('/admin');
        } else {
          toast({
            title: "Login Failed",
            description: result.message || "Invalid email or password.",
            variant: "destructive",
          });
        }
        setIsLoading(false);
      };

      return (
        <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12 bg-gradient-to-br from-slate-900 via-slate-800 to-primary/30 dark:from-slate-900 dark:via-black dark:to-primary/20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-full max-w-md shadow-2xl glassmorphism border-border/50">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold gradient-text-alt">Admin Login</CardTitle>
                <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-background/70 border-border/50 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-background/70 border-border/50 focus:border-primary"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-primary to-blue-700 hover:from-primary/90 hover:to-blue-700/90 text-primary-foreground shadow-lg py-3 text-base" disabled={isLoading}>
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary-foreground"></div>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-5 w-5" /> Login
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col items-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Need to register an admin account?{' '}
                  <Button variant="link" asChild className="p-0 h-auto text-primary hover:text-primary/80">
                    <Link to="/register">Register here</Link>
                  </Button>
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      );
    };

    export default LoginPage;