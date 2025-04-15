import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from 'tamagui';

export default function ConfirmActionModal({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  const theme = useTheme();

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: theme.backgroundLight.val }]}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.color.val, marginBottom: 10 }}>
            {title}
          </Text>
          <Text style={{ color: theme.color.val, marginBottom: 20 }}>
            {message}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button title="Cancel" onPress={onCancel} borderRadius={25} />
            <Button title="Confirm" onPress={onConfirm} borderRadius={25} color={theme.error.val} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    padding: 20,
    borderRadius: 20,
  },
});
