import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from 'tamagui';
import ConfirmActionModal from '../modals/ConfirmActionModal';
import { useUser } from '../../context/UserContext';
import { logoutUser } from '../../api/auth/logout';
import { useRouter } from 'expo-router';

export default function LogoutButton() {
  const theme = useTheme();
  const router = useRouter();
  const { setUser } = useUser();
  const [showModal, setShowModal] = useState(false);

  const handleConfirmLogout = async () => {
    try {
      const result = await logoutUser(() => setUser(null));
      if (result.success) {
        alert('Logged out successfully!');
        router.replace('/auth/login');
      } else {
        alert('Logout failed: ' + result.message);
      }
    } catch (error) {
      alert('Logout error: ' + error.message);
    } finally {
      setShowModal(false);
      setUser(null);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={{
          borderColor: theme.error.val,
          borderWidth: 1,
          borderRadius: 25,
          paddingVertical: 10,
          alignItems: 'center',
          marginVertical: 10,
        }}
      >
        <Text style={{ color: theme.error.val, fontSize: 16 }}>
          Log Out
        </Text>
      </TouchableOpacity>

      <ConfirmActionModal
        visible={showModal}
        title="Log Out"
        message="Are you sure you want to log out?"
        onConfirm={() => {
          handleConfirmLogout();
          setShowModal(false);
        }}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
}
