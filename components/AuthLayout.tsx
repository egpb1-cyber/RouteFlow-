import { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';
import { Logo } from './Logo';

type Props = { title: string; subtitle?: string; children: ReactNode; footer?: ReactNode; toast?: ReactNode };

export function AuthLayout({ title, subtitle, children, footer, toast }: Props) {
  return (
    <SafeAreaView style={s.root}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
          <View>
            <Logo />
            <Text style={s.title}>{title}</Text>
            {!!subtitle && <Text style={s.subtitle}>{subtitle}</Text>}
            {children}
          </View>
          {!!footer && <View style={s.footer}>{footer}</View>}
        </ScrollView>
      </KeyboardAvoidingView>
      {toast}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { flexGrow: 1, justifyContent: 'space-between', paddingHorizontal: 28, paddingTop: 24, paddingBottom: 24 },
  title: { marginTop: 40, fontSize: 30, fontWeight: '800', color: colors.primaryDark },
  subtitle: { marginTop: 8, fontSize: 17, lineHeight: 24, color: colors.muted },
  footer: { paddingTop: 32 },
});
