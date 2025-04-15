import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from 'tamagui';
import ConfirmActionModal from '../modals/ConfirmActionModal';
import { useUser } from '../../context/UserContext';
import { deleteAccount } from '../../api/users/index';
import { useRouter } from 'expo-router';

export default function DeleteAccountButton() {
  const theme = useTheme();
  const router = useRouter();
  const { user, setUser } = useUser();
  const [showModal, setShowModal] = useState(false);

  const handleConfirmDelete = async () => {
    if (!user?.uid) return;
    try {
      const result = await deleteAccount(user.uid);
      if (result.success) {
        alert('Account deleted successfully!');
        setUser(null);
        router.replace('/auth/login');
      } else {
        alert('Failed to delete account: ' + result.message);
      }
    } catch (error) {
      alert('Error deleting account: ' + error.message);
    } finally {
      setShowModal(false);
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
          Delete Account
        </Text>
      </TouchableOpacity>

      <ConfirmActionModal
        visible={showModal}
        title="Delete Account"
        message="This action cannot be undone. Are you sure you want to delete your account?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
}
