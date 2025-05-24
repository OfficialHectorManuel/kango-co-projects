import React, { useState, useEffect, Suspense, lazy } from 'react';
    import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
    import { Toaster } from '@/components/ui/toaster';
    import { ThemeProvider } from '@/contexts/ThemeContext';
    import { AuthProvider, useAuth } from '@/contexts/AuthContext';
    import LoadingScreen from '@/components/LoadingScreen';
    import Layout from '@/components/Layout';
    import { supabase } from '@/lib/supabaseClient';

    const HomePage = lazy(() => import('@/pages/HomePage'));
    const LoginPage = lazy(() => import('@/pages/LoginPage'));
    const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
    const ContactPage = lazy(() => import('@/pages/ContactPage'));
    const AdminDashboardPage = lazy(() => import('@/pages/AdminDashboardPage'));
    const ProjectDetailsPage = lazy(() => import('@/pages/ProjectDetailsPage'));
    const SupportMePage = lazy(() => import('@/pages/SupportMePage'));


    function AppContent() {
      const [isLoading, setIsLoading] = useState(true);
      const { user, loading: authLoading } = useAuth();
    
      useEffect(() => {
        const appLoadTimer = setTimeout(() => {
          setIsLoading(false);
        }, 4000);
    
        const recordVisit = async () => {
          const lastVisit = localStorage.getItem('lastKangoVisit');
          const now = new Date().getTime();
          const oneDay = 24 * 60 * 60 * 1000; 

          if (!lastVisit || (now - parseInt(lastVisit)) > oneDay) {
            try {
              const { data, error } = await supabase.functions.invoke('track-visit', {
                body: {} 
              });
              if (error) {
                console.error('Error tracking visit (invoke):', error.message);
                 if (error.context && error.context.details) {
                    console.error('Edge function details:', error.context.details);
                 }
              } else {
                console.log('Visit tracked:', data);
                localStorage.setItem('lastKangoVisit', now.toString());
              }
            } catch (e) {
              console.error('Failed to invoke track-visit function (catch):', e);
            }
          }
        };
    
        if (!authLoading) { 
          recordVisit();
        }
    
        return () => clearTimeout(appLoadTimer);
      }, [authLoading]);
    
      if (isLoading || authLoading) {
        return <LoadingScreen />;
      }

      return (
        <Router>
          <Layout>
            <Suspense fallback={<div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div></div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/support-me" element={<SupportMePage />} />
                <Route path="/project/:id" element={<ProjectDetailsPage />} />
                <Route 
                  path="/admin" 
                  element={
                    <PrivateRoute>
                      <AdminDashboardPage />
                    </PrivateRoute>
                  } 
                />
                 <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Suspense>
          </Layout>
          <Toaster />
        </Router>
      );
    }
    
    function App() {
      return (
        <ThemeProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </ThemeProvider>
      );
    }

    const PrivateRoute = ({ children }) => {
      const { user, loading } = useAuth();
    
      if (loading) {
        return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div></div>;
      }
    
      return user ? children : <Navigate to="/login" />;
    };

    export default App;