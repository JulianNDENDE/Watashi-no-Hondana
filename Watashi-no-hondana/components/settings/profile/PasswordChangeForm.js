import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Button, useTheme } from 'tamagui';
import { useUser } from '../../../context/UserContext';
import CustomInput from '../../../components/inputs/CustomInput';
import { changePassword, forgotPassword } from '../../../api/users/password';

export default function PasswordChangeForm() {
  const theme = useTheme();
  const { user } = useUser();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNew, setConfirmNew] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== confirmNew) {
      return alert('New passwords do not match!');
    }
    if (!oldPassword || !newPassword) {
      return alert('Please fill in all fields.');
    }
    setLoading(true);
    try {
      const result = await changePassword(oldPassword, newPassword);
      if (result.success) {
        alert('Password changed successfully!');
      } else {
        alert('Failed to change password: ' + result.message);
      }
    } catch (error) {
      alert('Failed to change password: ' + error.message);
    } finally {
      setLoading(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmNew('');
    }
  };

  const handleForgotPassword = async () => {
    if (!user?.email) {
      return alert('No email found for this user.');
    }
    try {
      const result = await forgotPassword(user.email);
      if (result.success) {
        alert('Password reset email sent!');
      } else {
        alert('Failed to send password reset email: ' + result.message);
      }
    } catch (error) {
      alert('Failed to send password reset email: ' + error.message);
    } finally {
      setOldPassword('');
      setNewPassword('');
      setConfirmNew('');
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
        Change Password
      </Text>

      <CustomInput
        type="passwordConfirm"
        value={oldPassword}
        onChangeText={setOldPassword}
        placeholder="Enter old password"
      />

      <CustomInput
        type="password"
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="Enter new password"
        errorMessage="Password must be at least 8 characters and include letters and numbers"
      />

      <CustomInput
        type="password"
        value={confirmNew}
        onChangeText={setConfirmNew}
        placeholder="Re-enter new password"
        errorMessage="Passwords do not match"
      />

      <Button
        disabled={loading}
        onPress={handleChangePassword}
        style={{
          backgroundColor: theme.primary.val,
          padding: 10,
          borderRadius: 6,
          marginBottom: 10,
        }}
      >
        <Text fontWeight="bold" color="#fff">{loading ? 'Changing...' : 'Change Password'}</Text>
      </Button>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text fontSize={14} color={theme.primary.val} fontWeight="600">
          Forgot Password?
        </Text>
      </TouchableOpacity>
    </View>
  );
}
