import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme';

type Props = { title: string; onPress: () => void; variant?: 'primary' | 'outline' | 'link' };

export function Button({ title, onPress, variant = 'primary' }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [s.base, s[variant], pressed && { opacity: 0.85 }]}
    >
      <Text style={[s.text, variant !== 'primary' && s.textGreen]}>{title}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  base: { height: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 16 },
  primary: { backgroundColor: colors.primary },
  outline: { borderWidth: 1.5, borderColor: colors.primary, marginTop: 12 },
  link: { height: 40, marginTop: 8 },
  text: { fontSize: 16, fontWeight: '800', color: '#fff' },
  textGreen: { color: colors.primary },
});
