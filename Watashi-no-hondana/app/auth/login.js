import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, useTheme } from 'tamagui';
import CustomInput from '../../components/inputs/CustomInput';
import CustomButton from '../../components/buttons/CustomButton';
import { loginUser } from '../../api/auth/login';

export default function LoginScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    const response = await loginUser(email, password);
    setLoading(false);

    if (response.success) {
      router.replace('/home');
    } else {
      setError(response.message || "Login failed. Please try again.");
    }
  };

  return (
    <View flex={1} backgroundColor={theme.background} padding="$4" justifyContent="center">
      <Text color={theme.color} fontSize="$6" fontWeight="bold">Login</Text>

      <CustomInput
        value={email}
        onChangeText={setEmail}
        type="email"
        placeholder="Enter your email"
      />
      <CustomInput
        value={password}
        onChangeText={setPassword}
        type="password"
        placeholder="Enter your password"
      />

      {error ? <Text color="red">{error}</Text> : null}

      <CustomButton title={loading ? "Logging in..." : "Login"} onPress={handleLogin} disabled={loading} />

      <Text color={theme.colorMuted} marginTop="$4" onPress={() => router.push('/auth/register')}>
        Don't have an account? Register
      </Text>
    </View>
  );
}
