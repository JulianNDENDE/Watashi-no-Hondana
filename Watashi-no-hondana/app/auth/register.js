import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { View, Text, useTheme } from 'tamagui';
import CustomInput from '../../components/inputs/CustomInput';
import CustomButton from '../../components/buttons/CustomButton';
import { registerUser } from '../../api/auth/register';

export default function RegisterScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError("");

    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    const response = await registerUser(username, email, password);
    setLoading(false);

    if (response.success) {
      router.replace('/home');
    } else {
      setError(response.message || "Registration failed. Please try again.");
    }
  };

  return (
    <View flex={1} backgroundColor={theme.background} padding="$4" justifyContent="center">
      <Text color={theme.color} fontSize="$6" fontWeight="bold">Register</Text>

      <CustomInput value={username} onChangeText={setUsername} type="user" placeholder="Choose a username" />
      <CustomInput value={email} onChangeText={setEmail} type="email" placeholder="Enter your email" errorMessage="Invalid email format" />
      <CustomInput value={password} onChangeText={setPassword} type="password" placeholder="Enter your password" errorMessage="Password must be at least 8 characters" />
      <CustomInput value={confirmPassword} onChangeText={setConfirmPassword} type="password" placeholder="Confirm your password" />

      {error ? <Text color="red">{error}</Text> : null}

      <CustomButton title={loading ? "Registering..." : "Register"} onPress={handleRegister} disabled={loading} />

      <TouchableOpacity onPress={() => router.push('/auth/login')} style={{ marginTop: 20 }}>
        <Text color={theme.colorMuted}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}
