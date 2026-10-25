import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors } from '../theme';

type Props = TextInputProps & {
  label: string;
  password?: boolean; // esconde o texto
  toggle?: boolean; // mostra o ícone de olho
  error?: string;
};

export function Field({ label, password, toggle, error, ...rest }: Props) {
  const [hidden, setHidden] = useState(!!password);
  return (
    <View style={s.wrap}>
      <Text style={s.label}>{label}</Text>
      <View style={[s.box, !!error && s.boxError]}>
        <TextInput
          {...rest}
          secureTextEntry={hidden}
          placeholderTextColor={colors.placeholder}
          style={s.input}
        />
        {toggle && (
          <Pressable onPress={() => setHidden((h) => !h)} hitSlop={10} accessibilityLabel={hidden ? 'Mostrar senha' : 'Ocultar senha'}>
            <Ionicons name={hidden ? 'eye-off-outline' : 'eye-outline'} size={22} color={colors.muted} />
          </Pressable>
        )}
      </View>
      {!!error && <Text style={s.error}>{error}</Text>}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { marginTop: 18 },
  label: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 8 },
  box: {
    flexDirection: 'row', alignItems: 'center', height: 54, paddingHorizontal: 16,
    borderWidth: 1.5, borderColor: colors.border, borderRadius: 14, backgroundColor: colors.surface,
  },
  boxError: { borderColor: colors.error },
  input: { flex: 1, fontSize: 16, color: colors.text, height: '100%' },
  error: { marginTop: 6, fontSize: 13, color: colors.error },
});
