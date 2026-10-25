import { useCallback, useRef, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';

type Kind = 'success' | 'error' | 'info';

export function useToast() {
  const insets = useSafeAreaInsets();
  const [state, setState] = useState<{ message: string; kind: Kind } | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const show = useCallback((message: string, kind: Kind = 'info', duration = 2500) => {
    if (timer.current) clearTimeout(timer.current);
    setState({ message, kind });
    Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: true }).start();
    timer.current = setTimeout(() => {
      Animated.timing(opacity, { toValue: 0, duration: 220, useNativeDriver: true }).start(() => setState(null));
    }, duration);
  }, [opacity]);

  const toast = state ? (
    <Animated.View
      pointerEvents="none"
      style={[s.box, { top: insets.top + 12, opacity, backgroundColor: state.kind === 'error' ? colors.error : state.kind === 'success' ? colors.success : colors.primaryDark }]}
    >
      <Text style={s.text}>{state.message}</Text>
    </Animated.View>
  ) : null;

  return { show, toast };
}

const s = StyleSheet.create({
  box: { position: 'absolute', left: 20, right: 20, paddingVertical: 14, paddingHorizontal: 16, borderRadius: 12, elevation: 6 },
  text: { color: '#fff', fontSize: 15, fontWeight: '700', textAlign: 'center' },
});
