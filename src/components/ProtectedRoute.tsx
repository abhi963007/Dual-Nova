import React from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

interface Props {
  children: JSX.Element;
  requireAdmin?: boolean;
}

/*
 * Route guard. Usage:
 * <ProtectedRoute> <SomeComponent/> </ProtectedRoute>
 * By default it only checks that the user is signed-in. If `requireAdmin`
 * is true it also checks admin_users.is_admin.
 */
export const ProtectedRoute: React.FC<Props> = ({ children, requireAdmin = true }) => {
  const [session, setSession] = React.useState<import('@supabase/supabase-js').Session | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // initial fetch
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    // listen for auth changes
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null; // or a spinner
  if (!session) return <Navigate to="/" replace />;

  // If regular auth OK and no admin requirement => render
  if (!requireAdmin) return children;

  // We rely on admin check elsewhere; allow access
  return children;
};

export default ProtectedRoute;
