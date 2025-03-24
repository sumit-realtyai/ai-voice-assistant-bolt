import React, { createContext, useContext, useState } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (userData) => {
    try {
      // Check if user exists
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('phone', userData.phone)
        .maybeSingle();

      if (fetchError) throw fetchError;

      let currentUser;
      if (existingUser) {
        currentUser = existingUser;
      } else {
        // Create new user
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert([{
            phone: userData.phone,
            name: `User-${userData.phone.slice(-4)}`,
            forwarding_status: false
          }])
          .select()
          .single();

        if (insertError) throw insertError;
        currentUser = newUser;
      }

      setUser(currentUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error during login:', error);
      toast.error(error.message || 'Failed to login. Please try again.');
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = async (profileData) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          forwarded_to: profileData.forwardTo,
          forwarding_status: profileData.isForwardingActive,
          assistant_prompt: profileData.prompt,
          sim_provider: profileData.simProvider,
          updated_at: new Date().toISOString()
        })
        .eq('phone', user.phone)
        .select()
        .single();

      if (error) throw error;
      setUser(data);
      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};