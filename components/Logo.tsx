import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors } from '../theme';

export function Logo() {
  return (
    <View style={s.row}>
      <View style={s.icon}>
        <Svg width={24} height={24} viewBox="0 0 24 24">
          <Path d="M5 18 C5 11 12 14 14 8 L17 6" stroke="#fff" strokeWidth={2} fill="none" strokeLinecap="round" />
          <Circle cx={5} cy={18} r={2} fill={colors.accent} />
          <Circle cx={18} cy={6} r={2.2} fill="#fff" />
        </Svg>
      </View>
      <Text style={s.name}>RouteFlow</Text>
    </View>
  );
}

const s = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  icon: { width: 40, height: 40, borderRadius: 10, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 24, fontWeight: '800', color: colors.primaryDark },
});
