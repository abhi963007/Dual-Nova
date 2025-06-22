-- Function to create a team member
CREATE OR REPLACE FUNCTION create_team_member(
  p_id UUID,
  p_full_name TEXT,
  p_email TEXT,
  p_phone TEXT,
  p_location TEXT,
  p_department TEXT,
  p_is_admin BOOLEAN DEFAULT FALSE
) RETURNS VOID AS $$
BEGIN
  -- Check if the current user is authenticated and is an admin
  IF NOT EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = auth.uid() AND is_admin = TRUE
  ) THEN
    RAISE EXCEPTION 'Only admins can create team members';
  END IF;
  
  -- Insert the new team member
  INSERT INTO admin_users (
    id, 
    full_name, 
    email, 
    phone, 
    location, 
    department, 
    is_admin,
    created_at
  ) VALUES (
    p_id,
    p_full_name,
    p_email,
    p_phone,
    p_location,
    p_department,
    p_is_admin,
    NOW()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to toggle admin status
CREATE OR REPLACE FUNCTION toggle_admin_status(
  p_user_id UUID,
  p_is_admin BOOLEAN
) RETURNS VOID AS $$
DECLARE
  v_current_user_name TEXT;
  v_target_user_name TEXT;
BEGIN
  -- Get current user's name
  SELECT full_name INTO v_current_user_name 
  FROM admin_users 
  WHERE id = auth.uid();
  
  -- Get target user's name
  SELECT full_name INTO v_target_user_name 
  FROM admin_users 
  WHERE id = p_user_id;
  
  -- Check if the current user is authenticated and is an admin
  IF NOT EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = auth.uid() AND is_admin = TRUE
  ) THEN
    RAISE EXCEPTION 'Only admins can update admin status';
  END IF;
  
  -- Check if the current user is a super admin
  IF v_current_user_name NOT IN ('Abhiram', 'Rojin', 'Arjun') THEN
    RAISE EXCEPTION 'Only super admins can update admin status';
  END IF;
  
  -- Check if the target user is a super admin and we're trying to remove admin status
  IF v_target_user_name IN ('Abhiram', 'Rojin', 'Arjun') AND NOT p_is_admin THEN
    RAISE EXCEPTION 'Cannot remove admin status from super admins';
  END IF;
  
  -- Update the admin status
  UPDATE admin_users
  SET is_admin = p_is_admin
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to delete a team member
CREATE OR REPLACE FUNCTION delete_team_member(
  p_user_id UUID
) RETURNS VOID AS $$
DECLARE
  v_current_user_name TEXT;
  v_target_user_name TEXT;
BEGIN
  -- Get current user's name
  SELECT full_name INTO v_current_user_name 
  FROM admin_users 
  WHERE id = auth.uid();
  
  -- Get target user's name
  SELECT full_name INTO v_target_user_name 
  FROM admin_users 
  WHERE id = p_user_id;
  
  -- Check if the current user is authenticated and is an admin
  IF NOT EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = auth.uid() AND is_admin = TRUE
  ) THEN
    RAISE EXCEPTION 'Only admins can delete team members';
  END IF;
  
  -- Check if the current user is a super admin
  IF v_current_user_name NOT IN ('Abhiram', 'Rojin', 'Arjun') THEN
    RAISE EXCEPTION 'Only super admins can delete team members';
  END IF;
  
  -- Check if the target user is a super admin
  IF v_target_user_name IN ('Abhiram', 'Rojin', 'Arjun') THEN
    RAISE EXCEPTION 'Cannot delete super admin accounts';
  END IF;
  
  -- Check if trying to delete own account
  IF p_user_id = auth.uid() THEN
    RAISE EXCEPTION 'Cannot delete your own account';
  END IF;
  
  -- Delete the team member
  DELETE FROM admin_users
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 