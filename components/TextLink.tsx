import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme';

export function TextLink({ title, onPress, align = 'center' }: { title: string; onPress: () => void; align?: 'center' | 'right' }) {
  return (
    <Pressable onPress={onPress} hitSlop={8} style={{ alignSelf: align === 'right' ? 'flex-end' : 'center', marginTop: 14 }}>
      <Text style={s.link}>{title}</Text>
    </Pressable>
  );
}

export function FooterText({ text, link, onPress }: { text: string; link: string; onPress: () => void }) {
  return (
    <Text style={s.footer}>
      {text} <Text style={s.link} onPress={onPress}>{link}</Text>
    </Text>
  );
}

const s = StyleSheet.create({
  link: { fontSize: 15, fontWeight: '800', color: colors.primary },
  footer: { fontSize: 15, color: colors.muted, textAlign: 'center' },
});
