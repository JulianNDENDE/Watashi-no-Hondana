import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { View, Text, useTheme } from 'tamagui';
import CustomInput from '../../components/inputs/CustomInput';
import CustomButton from '../../components/buttons/CustomButton';
import { loginUser } from '../../api/auth/login';
import { forgotPassword } from '../../api/users/password';

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

  const handleForgotPassword = async (email) => {
    if (!email) {
      return alert('Please enter your email address.');
    }
    try {
      const result = await forgotPassword(email);
      if (result.success) {
        alert('Password reset email sent!');
      } else {
        alert('Failed to send password reset email: ' + result.message);
      }
    } catch (error) {
      alert('Failed to send password reset email: ' + error.message);
    } finally {
      setEmail('');
      setPassword('');
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

      <View flexDirection="row" justifyContent="space-between" marginTop="$4">
        <TouchableOpacity onPress={() => router.push('/auth/register')}>
          <Text color={theme.colorMuted}>Don't have an account? Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleForgotPassword(email)}>
          <Text fontSize={14} color={theme.primary.val} fontWeight="600">Forgot Password?</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
