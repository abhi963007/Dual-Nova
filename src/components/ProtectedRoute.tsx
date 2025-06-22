import React from 'react';
import { Navigate } from 'react-router-dom';
import { supabase, adminFunctions } from '../lib/supabaseClient';

interface Props {
  children: JSX.Element;
  requireAdmin?: boolean;
  requireSuperAdmin?: boolean;
}

/*
 * Route guard. Usage:
 * <ProtectedRoute> <SomeComponent/> </ProtectedRoute>
 * By default it only checks that the user is signed-in. If `requireAdmin`
 * is true it also checks admin_users.is_admin.
 * If `requireSuperAdmin` is true, it checks if the user is a super admin.
 */
export const ProtectedRoute: React.FC<Props> = ({ 
  children, 
  requireAdmin = true,
  requireSuperAdmin = false 
}) => {
  const [session, setSession] = React.useState<import('@supabase/supabase-js').Session | null>(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const checkAuth = async () => {
      // initial fetch
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      
      if (data.session) {
        // Check admin status if needed
        if (requireAdmin || requireSuperAdmin) {
          const adminStatus = await adminFunctions.isAdmin(data.session.user.id);
          setIsAdmin(adminStatus);
          
          // Check super admin status if needed
          if (requireSuperAdmin) {
            const superAdminStatus = await adminFunctions.isSuperAdmin(data.session.user.id);
            setIsSuperAdmin(superAdminStatus);
          }
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();

    // listen for auth changes
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (_event, sess) => {
      setSession(sess);
      
      if (sess) {
        // Check admin status if needed
        if (requireAdmin || requireSuperAdmin) {
          const adminStatus = await adminFunctions.isAdmin(sess.user.id);
          setIsAdmin(adminStatus);
          
          // Check super admin status if needed
          if (requireSuperAdmin) {
            const superAdminStatus = await adminFunctions.isSuperAdmin(sess.user.id);
            setIsSuperAdmin(superAdminStatus);
          }
        }
      } else {
        setIsAdmin(false);
        setIsSuperAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [requireAdmin, requireSuperAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1e1e1e]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!session) return <Navigate to="/" replace />;

  // If no admin requirement => render
  if (!requireAdmin) return children;

  // Check admin status
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // Check super admin status
  if (requireSuperAdmin && !isSuperAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
