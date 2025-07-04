import React, { useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import { Menu, X, Code, LogIn, User, Lock, Eye, EyeOff, Mail, ArrowLeft, Check, BarChart3 } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useIsMobile } from '../hooks/use-mobile';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [modalView, setModalView] = useState<'login' | 'signup' | 'forgot-password' | 'reset-success'>('login');
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const lastScrollY = React.useRef(0);

  // List of super admins who can access analytics
  const superAdmins = ['Abhiram', 'Rojin', 'Arjun'];

  // Auth session listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) fetchAdmin(data.session.user.id);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      if (sess) fetchAdmin(sess.user.id);
      else {
        setIsAdmin(false);
        setIsSuperAdmin(false);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const fetchAdmin = async (uid: string) => {
    const { data } = await supabase
      .from('admin_users')
      .select('is_admin, full_name')
      .eq('id', uid)
      .single();
    
    setIsAdmin(!!data?.is_admin);
    
    // Check if user is a super admin based on their name
    if (data?.full_name && superAdmins.includes(data.full_name)) {
      setIsSuperAdmin(true);
    } else {
      setIsSuperAdmin(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Set scrolled state - used for styling
      setScrolled(currentScrollY > 50);
      
      // Hide the navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.getElementById('login-modal');
      if (modal && !modal.contains(event.target as Node) && showLoginModal) {
        setShowLoginModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLoginModal]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showLoginModal) {
      document.body.style.overflow = 'hidden';
    } else if (!isOpen) { // Only restore scroll if mobile menu is also closed
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [showLoginModal, isOpen]);

  // Reset modal view when modal is closed
  useEffect(() => {
    if (!showLoginModal) {
      // Wait for close animation to finish before resetting view
      const timer = setTimeout(() => {
        setModalView('login');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [showLoginModal]);

  const navLinks = [
    { name: 'HOME', href: '/', ariaLabel: 'Navigate to home page' },
    { name: 'ABOUT', href: '/about', ariaLabel: 'Navigate to about page' },
    { name: 'PROJECTS', href: '/projects', ariaLabel: 'Navigate to projects page' },
    { name: 'SERVICES', href: '/services', ariaLabel: 'Navigate to services page' },
    { name: 'CONTACT', href: '/contact', ariaLabel: 'Navigate to contact page' },
  ];

  const isActive = (href: string) => location.pathname === href;

  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // fetch admin flag
      let { data: profile } = await supabase
        .from('admin_users')
        .select('is_admin')
        .eq('id', data.user.id)
        .single();

      // make sure profile exists
      if (!profile) {
        await supabase.from('admin_users').insert({ id: data.user.id, is_admin: false });
        profile = { is_admin: false } as any;
      }

      setShowLoginModal(false);
      const isAdmin = !!profile?.is_admin;
      navigate(isAdmin ? '/dashboard' : '/');
    } catch (err: any) {
      alert(err.message || 'Login failed');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));
    const fullName = String(formData.get('name'));

    try {
      // Get the current site URL for redirect
      const redirectUrl = import.meta.env.PROD ? 
        (import.meta.env.VITE_SITE_URL || window.location.origin) : 
        window.location.origin;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { 
          data: { full_name: fullName },
          emailRedirectTo: redirectUrl
        }
      });
      if (error) throw error;

      // user may need to confirm email – warn politely
      if (data.session && data.user) {
        // email auto-confirmed, we are logged in
        await supabase.from('admin_users').upsert({ id: data.user.id, full_name: fullName, is_admin: false });
        setShowLoginModal(false);
        navigate('/dashboard');
        return;
      }

      alert('Account created! Please check your email to confirm before logging in.');
      setModalView('login');
    } catch (err: any) {
      alert(err.message || 'Sign-up failed');
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = String(formData.get('email'));

    if (!email) {
      alert("Please enter your email address");
      return;
    }

    // Get the current site URL for redirect
    const redirectUrl = import.meta.env.PROD ? 
      (import.meta.env.VITE_SITE_URL || window.location.origin) : 
      window.location.origin;

    // Send password reset email
    supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    }).then(({ data, error }) => {
      if (error) {
        alert(error.message);
        return;
      }
      
      // Show success message
      setModalView('reset-success');
    });
  };

  // Modal title based on current view
  const getModalTitle = () => {
    switch (modalView) {
      case 'login': return 'Login';
      case 'signup': return 'Create Account';
      case 'forgot-password': return 'Reset Password';
      case 'reset-success': return 'Check Your Email';
      default: return 'Account';
    }
  };

  return (
    <>
      {/* Full screen overlay that appears behind the menu */}
      {isMobile && (
        <div 
          className={`fixed inset-0 bg-black/80 backdrop-blur-md z-40 transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>
      )}
      
      {/* Login Modal Overlay */}
      <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-md z-50 transition-opacity duration-300 ${
          showLoginModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!showLoginModal}
      ></div>
      
      {/* Login Modal */}
      <div 
        id="login-modal"
        className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-4 z-50 transition-all duration-300 ${
          showLoginModal 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
        aria-modal={showLoginModal}
        aria-labelledby="modal-title"
      >
        <div className={`rounded-2xl shadow-xl overflow-hidden relative ${
          modalView === 'signup'
            ? 'bg-gradient-to-br from-[#121212] via-[#151525] to-[#1a1a2e] border border-gray-800/30'
            : 'bg-[#121212] border border-gray-800'
        }`}>
          {/* Background gradient decoration */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-blue-600/20 rounded-full blur-xl"></div>
          
          <div className="p-6 relative z-10">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                {modalView !== 'login' && (
                  <button 
                    onClick={() => modalView === 'reset-success' ? setModalView('forgot-password') : setModalView('login')}
                    className="p-1.5 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                    aria-label="Go back"
                  >
                    <ArrowLeft size={18} />
                  </button>
                )}
                <h2 id="modal-title" className={`text-2xl font-bold ${
                  modalView === 'signup' 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-500' 
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'
                }`}>
                  {getModalTitle()}
                </h2>
              </div>
              <button 
                onClick={() => setShowLoginModal(false)}
                className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-full"
                aria-label="Close login modal"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="relative overflow-hidden" style={{ minHeight: '420px' }}>
              {/* Login Form */}
              <div 
                className={`transition-all duration-300 absolute inset-0 ${
                  modalView === 'login' 
                    ? 'translate-x-0 opacity-100' 
                    : modalView === 'signup' || modalView === 'forgot-password' || modalView === 'reset-success'
                      ? '-translate-x-full opacity-0' 
                      : 'translate-x-full opacity-0'
                }`}
              >
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                      Email
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User size={16} className="text-gray-500 group-focus-within:text-blue-400 transition-colors duration-200" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="block w-full pl-10 pr-3 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="your.email@example.com"
                        autoComplete="email"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={16} className="text-gray-500 group-focus-within:text-blue-400 transition-colors duration-200" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        required
                        className="block w-full pl-10 pr-10 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="••••••••"
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff size={16} className="text-gray-500 hover:text-gray-300 transition-colors duration-200" />
                        ) : (
                          <Eye size={16} className="text-gray-500 hover:text-gray-300 transition-colors duration-200" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-700 rounded bg-gray-900"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                        Remember me
                      </label>
                    </div>
                    
                    <div className="text-sm">
                      <button 
                        type="button"
                        onClick={() => setModalView('forgot-password')}
                        className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      >
                        Forgot password?
                      </button>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full opacity-10 group-hover:w-[600px] group-hover:h-[600px] group-active:bg-white"></span>
                    <span className="relative">Sign in</span>
                  </button>
                  
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400">
                      Don't have an account?{" "}
                      <button 
                        type="button"
                        onClick={() => setModalView('signup')}
                        className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      >
                        Sign up
                      </button>
                    </p>
                  </div>
                </form>
              </div>
              
              {/* Signup Form */}
              <div 
                className={`transition-all duration-300 absolute inset-0 ${
                  modalView === 'signup' 
                    ? 'translate-x-0 opacity-100' 
                    : modalView === 'login' 
                      ? 'translate-x-full opacity-0' 
                      : '-translate-x-full opacity-0'
                }`}
              >
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="signup-name" className="block text-sm font-medium text-gray-400">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User size={16} className="text-gray-500" />
                      </div>
                      <input
                        type="text"
                        id="signup-name"
                        name="name"
                        required
                        className="block w-full pl-10 pr-3 py-3.5 bg-[#f1f5f9]/10 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="Your full name"
                        autoComplete="name"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5 mt-4">
                    <label htmlFor="signup-email" className="block text-sm font-medium text-gray-400">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail size={16} className="text-gray-500" />
                      </div>
                      <input
                        type="email"
                        id="signup-email"
                        name="email"
                        required
                        className="block w-full pl-10 pr-3 py-3.5 bg-[#f1f5f9]/10 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="your.email@example.com"
                        autoComplete="email"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5 mt-4">
                    <label htmlFor="signup-password" className="block text-sm font-medium text-gray-400">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={16} className="text-gray-500" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="signup-password"
                        name="password"
                        required
                        className="block w-full pl-10 pr-10 py-3.5 bg-[#f1f5f9]/10 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="Create a password"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff size={16} className="text-gray-500 hover:text-gray-300" />
                        ) : (
                          <Eye size={16} className="text-gray-500 hover:text-gray-300" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4">
  <input
    id="terms"
    name="terms"
    type="checkbox"
    required
    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-700 rounded bg-[#f1f5f9]/10"
  />
  <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
    I agree to the <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a> and <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
  </label>
</div>

<button
  type="submit"
  className="w-full flex justify-center py-2.5 px-4 mt-8 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 relative overflow-hidden group"
>
  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full opacity-10 group-hover:w-[600px] group-hover:h-[600px] group-active:bg-white"></span>
  <span className="relative">Create Account</span>
</button>

<div className="mt-6 text-center">
  <p className="text-sm text-gray-400">
    Already have an account?{" "}
    <button
      type="button"
      onClick={() => setModalView('login')}
      className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
    >
      Sign in
    </button>
  </p>
</div>
                    
                </form>
              </div>
              
              {/* Forgot Password Form */}
              <div 
                className={`transition-all duration-300 absolute inset-0 ${
                  modalView === 'forgot-password' 
                    ? 'translate-x-0 opacity-100' 
                    : modalView === 'reset-success' 
                      ? '-translate-x-full opacity-0' 
                      : 'translate-x-full opacity-0'
                }`}
              >
                <form onSubmit={handleForgotPassword} className="space-y-5">
                  <p className="text-gray-400 mb-4">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                  
                  <div className="space-y-2">
                    <label htmlFor="reset-email" className="block text-sm font-medium text-gray-400">
                      Email
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail size={16} className="text-gray-500 group-focus-within:text-blue-400 transition-colors duration-200" />
                      </div>
                      <input
                        type="email"
                        id="reset-email"
                        name="email"
                        required
                        className="block w-full pl-10 pr-3 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="your.email@example.com"
                        autoComplete="email"
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full opacity-10 group-hover:w-[600px] group-hover:h-[600px] group-active:bg-white"></span>
                    <span className="relative">Send Reset Link</span>
                  </button>
                  
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400">
                      Remember your password?{" "}
                      <button 
                        type="button"
                        onClick={() => setModalView('login')}
                        className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      >
                        Back to login
                      </button>
                    </p>
                  </div>
                </form>
              </div>
              
              {/* Reset Success Message */}
              <div 
                className={`transition-all duration-300 absolute inset-0 ${
                  modalView === 'reset-success' 
                    ? 'translate-x-0 opacity-100' 
                    : modalView === 'forgot-password' 
                      ? 'translate-x-full opacity-0' 
                      : '-translate-x-full opacity-0'
                }`}
              >
                <div className="text-center space-y-5">
                  <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                    <Check size={32} className="text-green-500" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white">Check Your Email</h3>
                  
                  <p className="text-gray-400">
                    We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
                  </p>
                  
                  <button
                    type="button"
                    onClick={() => setModalView('login')}
                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 relative overflow-hidden group mt-4"
                  >
                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full opacity-10 group-hover:w-[600px] group-hover:h-[600px] group-active:bg-white"></span>
                    <span className="relative">Back to Login</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'backdrop-blur-sm py-3' 
            : 'py-5'
        } ${
          hidden && !isOpen ? '-translate-y-full' : 'translate-y-0'
        } ${
          isOpen && isMobile ? 'bg-[#121212]/95 backdrop-blur-lg' : ''
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo with enhanced gradient effect */}
            <Link 
              to="/"
              className="group flex items-center gap-2 transition-all duration-300"
              aria-label="DUAL NOVA LAB - Home"
            >
              <div className="relative flex items-center justify-center w-10 h-10 overflow-hidden">
                <div className="absolute inset-0 bg-accent-gradient rounded-lg opacity-70 group-hover:opacity-100 transition-all duration-500 animate-glow"></div>
                <Code size={20} className="text-white z-10 animate-pulse-slow" />
              </div>
              <span className={`${isMobile ? 'text-xl' : 'text-2xl'} font-extrabold text-transparent bg-clip-text bg-accent-gradient`}>
                DUAL NOVA
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.href}
                  aria-label={link.ariaLabel}
                  className={`relative text-sm font-semibold tracking-wider transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#121212] px-5 py-2 rounded-full ${
                    isActive(link.href)
                      ? 'text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {link.name}
                  <span className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 ${isActive(link.href) ? 'w-1/2' : 'w-0'} group-hover:w-1/2`}></span>
                </Link>
              ))}
              {/* Auth Button for Desktop */}
              {session ? (
                <>
                  {isSuperAdmin && (
                    <Link to="/analytics" className="ml-4 flex items-center gap-1 text-sm font-semibold tracking-wider text-gradient-primary hover:text-blue-400 transition-colors duration-300">
                      <BarChart3 size={16} className="text-blue-500" />
                      <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">ANALYTICS</span>
                    </Link>
                  )}
                  {isAdmin && (
                    <Link to="/dashboard" className="ml-4 text-sm font-semibold tracking-wider text-white hover:text-blue-400 transition-colors duration-300">
                      DASHBOARD
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="ml-4 flex items-center gap-2 px-5 py-2 text-sm font-semibold tracking-wider text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-full hover:from-purple-600 hover:to-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#121212] relative overflow-hidden group shadow-lg shadow-blue-500/20"
                    aria-label="Logout"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <LogIn size={16} className="relative z-10 group-hover:-translate-x-0.5 transition-transform duration-300 rotate-180" />
                    <span className="relative z-10">LOGOUT</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="ml-4 flex items-center gap-2 px-5 py-2 text-sm font-semibold tracking-wider text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#121212] relative overflow-hidden group shadow-lg shadow-blue-500/20"
                  aria-label="Login to your account"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <LogIn size={16} className="relative z-10 group-hover:translate-x-0.5 transition-transform duration-300" />
                  <span className="relative z-10">LOGIN</span>
                </button>
              )}
            </div>

            {/* Mobile menu button - positioned to avoid badge overlap */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative overflow-hidden w-10 h-10 flex items-center justify-center text-white bg-transparent rounded-lg hover:bg-white/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#121212] z-50"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
              >
                <div className="relative">
                  <Menu
                    size={20}
                    className={`transition-all duration-300 ${isOpen ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
                  />
                  <X
                    size={20}
                    className={`absolute top-0 left-0 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'}`}
                  />
                </div>
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {isMobile && isOpen && (
            <div className="md:hidden py-4">
              {/* Mobile Navigation Links */}
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    aria-label={link.ariaLabel}
                    className={`text-base font-medium px-6 py-3 rounded-lg transition-all duration-300 ${
                      isActive(link.href)
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white'
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* Admin links for mobile */}
                {session && (
                  <>
                    {isSuperAdmin && (
                      <Link
                        to="/analytics"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 px-6 py-3 rounded-lg text-blue-400 font-medium hover:bg-blue-500/10"
                      >
                        <BarChart3 size={18} />
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">ANALYTICS</span>
                      </Link>
                    )}
                    {isAdmin && (
                      <Link
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 px-6 py-3 rounded-lg text-blue-400 font-medium hover:bg-blue-500/10"
                      >
                        <User size={18} />
                        DASHBOARD
                      </Link>
                    )}
                  </>
                )}
            </div>
                
                {/* Auth Button for Mobile */}
                <div className="px-4 py-3">
                  {session ? (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold tracking-wider text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 relative overflow-hidden group shadow-lg shadow-blue-500/20"
                      aria-label="Logout"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <LogIn size={16} className="relative z-10 rotate-180" />
                      <span className="relative z-10">LOGOUT</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        setShowLoginModal(true);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold tracking-wider text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 relative overflow-hidden group shadow-lg shadow-blue-500/20"
                      aria-label="Login to your account"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <LogIn size={16} className="relative z-10" />
                      <span className="relative z-10">LOGIN</span>
                    </button>
                  )}
                </div>
              </div>
          )}
        </div>
      </nav>
    </>
  );
};
