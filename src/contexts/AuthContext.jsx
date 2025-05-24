import React, { createContext, useState, useEffect, useContext } from 'react';
    import { supabase } from '@/lib/supabaseClient';
    import { useNavigate } from 'react-router-dom'; // Import useNavigate

    const AuthContext = createContext();

    const ALLOWED_ADMIN_EMAILS = ['hubsploit121@gmail.com', 'officialhectormanuel@gmail.com'];

    export const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null);
      const [session, setSession] = useState(null);
      const [loading, setLoading] = useState(true);
      
      useEffect(() => {
        const getSession = async () => {
          const { data: { session: activeSession }, error } = await supabase.auth.getSession();
          if (error) {
            console.error("Error getting session:", error.message);
          }
          if (activeSession && !ALLOWED_ADMIN_EMAILS.includes(activeSession.user.email)) {
            await supabase.auth.signOut(); // Sign out if not an allowed admin
            setSession(null);
            setUser(null);
          } else {
            setSession(activeSession);
            setUser(activeSession?.user ?? null);
          }
          setLoading(false);
        };
        getSession();

        const { data: authListener } = supabase.auth.onAuthStateChange(
          async (_event, newSession) => {
            if (newSession && !ALLOWED_ADMIN_EMAILS.includes(newSession.user.email)) {
              await supabase.auth.signOut();
              setSession(null);
              setUser(null);
               if (_event === 'SIGNED_IN') {
                 alert('Access denied. This email is not authorized for admin access.');
               }
            } else {
              setSession(newSession);
              setUser(newSession?.user ?? null);
            }
            setLoading(false);
          }
        );

        return () => {
          authListener?.subscription.unsubscribe();
        };
      }, []);

      const login = async (credentials) => {
        setLoading(true);
        if (!ALLOWED_ADMIN_EMAILS.includes(credentials.email)) {
          setLoading(false);
          return { success: false, message: 'This email is not authorized for admin access.' };
        }
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });
        setLoading(false);
        if (error) return { success: false, message: error.message };
        if (data.user && !ALLOWED_ADMIN_EMAILS.includes(data.user.email)) {
          await supabase.auth.signOut();
          return { success: false, message: 'This email is not authorized for admin access.' };
        }
        return { success: true, user: data.user };
      };
      
      const register = async (credentials) => {
        setLoading(true);
        if (!ALLOWED_ADMIN_EMAILS.includes(credentials.email)) {
          setLoading(false);
          return { success: false, message: 'This email is not authorized for admin registration.' };
        }
        
        const { data: { users }, error: listError } = await supabase.from('users').select('email').in('email', ALLOWED_ADMIN_EMAILS);

        if(listError && listError.code !== '42501') { // 42501 means RLS prohibits access, which is fine if no users yet or policy restricted
            console.error("Error checking existing users:", listError.message);
        }
        
        if (users && users.length >= ALLOWED_ADMIN_EMAILS.length) {
             const allAdminsRegistered = ALLOWED_ADMIN_EMAILS.every(email => users.find(u => u.email === email));
             if (allAdminsRegistered) {
                setLoading(false);
                return { success: false, message: 'All admin accounts are already registered.' };
             }
        }
        
        if (users && users.find(u => u.email === credentials.email)) {
            setLoading(false);
            return { success: false, message: 'This admin email is already registered.' };
        }

        const { data, error } = await supabase.auth.signUp({
          email: credentials.email,
          password: credentials.password,
        });
        setLoading(false);
        if (error) return { success: false, message: error.message };
        // Supabase sends a confirmation email by default. User will need to confirm.
        return { success: true, user: data.user, message: 'Registration successful! Please check your email to confirm your account.' };
      };

      const logout = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        setLoading(false);
        if (error) {
          console.error("Error logging out:", error.message);
          return { success: false, message: error.message };
        }
        setUser(null);
        setSession(null);
        // No navigate here, PrivateRoute will handle redirect
        return { success: true };
      };

      return (
        <AuthContext.Provider value={{ user, session, loading, login, register, logout }}>
          {children}
        </AuthContext.Provider>
      );
    };

    export const useAuth = () => useContext(AuthContext);