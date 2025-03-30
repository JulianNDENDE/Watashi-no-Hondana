import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Animated, TouchableOpacity } from 'react-native';
import { useTheme } from 'tamagui';
import { Eye, EyeOff, Mail, Lock, Phone, User, Search as SearchIcon } from '@tamagui/lucide-icons';

export default function CustomInput({
  label,
  value,
  onChangeText,
  type = 'text',
  placeholder,
  errorMessage,
  disableValidation = false,
  ...props
}) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [animatedIsFocused] = useState(new Animated.Value(value ? 1 : 0));
  const [isLocalValid, setIsLocalValid] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  // Render the appropriate icon based on input type or case
  const renderIcon = () => {
    switch (type) {
      case 'email':
        return <Mail size={20} color={theme.colorMuted.val} />;
      case 'password':
        return <Lock size={20} color={theme.colorMuted.val} />;
      case 'phone':
        return <Phone size={20} color={theme.colorMuted.val} />;
      case 'search':
        return <SearchIcon size={20} color={theme.colorMuted.val} />;
      case 'user':
        return <User size={20} color={theme.colorMuted.val} />;
      case 'text':
      default:
        return null; // No icon for regular text input
    }
  };

  const handleValidation = (text) => {
    if (disableValidation) return;

    let valid = true;
    if (type === 'email') {
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
    } else if (type === 'password') {
      valid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(text);
    } else if (type === 'phone') {
      valid = /^((\+)33|0|0033)[1-9](\d{2}){4}$/.test(text);
    }
    setIsLocalValid(valid);
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.inputBackground.val,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: !isLocalValid && value.length > 0 && !disableValidation ? 'red' : theme.border.val,
          paddingHorizontal: 10,
        }}
      >
        {/* Leading Icon */}
        <View style={{ padding: 10 }}>{renderIcon()}</View>

        {/* Animated Floating Label & Input */}
        <View style={{ flex: 1, position: 'relative' }}>
          <Animated.Text
            style={{
              position: 'absolute',
              color: theme.colorMuted.val,
              top: animatedIsFocused.interpolate({ inputRange: [0, 1], outputRange: [10, -10] }),
              fontSize: animatedIsFocused.interpolate({ inputRange: [0, 1], outputRange: [16, 12] }),
              left: 10,
            }}
          >
            {label}
          </Animated.Text>
          <TextInput
            value={value}
            onChangeText={(text) => {
              onChangeText(text);
              handleValidation(text);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={isFocused ? '' : placeholder}
            placeholderTextColor={theme.colorMuted.val}
            style={{
              height: 40,
              flex: 1,
              borderBottomWidth: 0,
              paddingLeft: 10,
              backgroundColor: theme.inputBackground.val,
              color: theme.inputText.val || '#9C9C9C',
              borderRadius: 10,
            }}
            secureTextEntry={type === 'password' && !isPasswordVisible}
            keyboardType={type === 'email' ? 'email-address' : type === 'phone' ? 'phone-pad' : 'default'}
            {...props}
          />
        </View>

        {/* Password Visibility Toggle */}
        {type === 'password' && (
          <TouchableOpacity style={{ padding: 10 }} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            {isPasswordVisible ? <Eye size={20} color={theme.colorMuted.val} /> : <EyeOff size={20} color={theme.colorMuted.val} />}
          </TouchableOpacity>
        )}
      </View>

      {/* Validation Error Message */}
      {!isLocalValid && value.length > 0 && !disableValidation && (
        <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>{errorMessage}</Text>
      )}
    </View>
  );
}
