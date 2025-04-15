import React, { useState } from 'react';
import { View, Text, Button, useTheme } from 'tamagui';
import { useUser } from '../../../context/UserContext';
import { updateUserProfile } from '../../../api/users/index';
import CustomInput from '../../../components/inputs/CustomInput';

export default function UserProfileForm() {
  const theme = useTheme();
  const { user, setUser } = useUser();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);

  const handleSaveChanges = async () => {
    if (!user?.uid) return;
    setLoading(true);
    try {
      const updatedUser = await updateUserProfile(user.uid, { username, email });
      setUser({ ...updatedUser, uid: user.uid });
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View marginBottom={20}>
      <Text 
        fontSize={18} 
        fontWeight="bold" 
        color={theme.color.val} 
        marginBottom={10}
      >
        User Information
      </Text>

      <CustomInput 
        type="user"
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your username"
        errorMessage="Invalid username"
      />

      <CustomInput 
        type="email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        errorMessage="Invalid email"
      />

      <Button
        disabled={loading}
        onPress={handleSaveChanges}
        style={{
          backgroundColor: theme.primary.val,
          padding: 10,
          borderRadius: 6,
        }}
      >
        <Text fontWeight="bold" color="#fff">{loading ? 'Saving...' : 'Save Changes'}</Text>
      </Button>
    </View>
  );
}
