import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text } from 'react-native';
import { AuthLayout } from '../components/AuthLayout';
import { Button } from '../components/Button';
import { Field } from '../components/Field';
import { FooterText } from '../components/TextLink';
import { useToast } from '../components/Toast';
import { colors } from '../theme';

export default function NovaSenha() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const { show, toast } = useToast();
  const [senha, setSenha] = useState('');
  const [confirma, setConfirma] = useState('');
  const [errors, setErrors] = useState<{ senha?: string; confirma?: string }>({});

  function salvar() {
    const e: typeof errors = {};
    if (senha.length < 8) e.senha = 'Use pelo menos 8 caracteres.';
    if (confirma !== senha) e.confirma = 'As senhas não são iguais.';
    setErrors(e);
    if (Object.keys(e).length) return;
    show('Senha alterada com sucesso', 'success', 1400);
    setTimeout(() => router.replace('/login'), 1400);
  }

  return (
    <AuthLayout
      title="Definir nova senha"
      subtitle="Crie uma nova senha para acessar sua conta com segurança."
      toast={toast}
      footer={<FooterText text="Já tem conta?" link="Entrar" onPress={() => router.replace('/login')} />}
    >
      <Field label="Nova senha" placeholder="Digite sua nova senha" value={senha} onChangeText={setSenha} password toggle error={errors.senha} />
      <Field label="Confirmar senha" placeholder="Repita a nova senha" value={confirma} onChangeText={setConfirma} password toggle error={errors.confirma} />
      <Text style={{ marginTop: 14, fontSize: 14, color: colors.muted }}>Use pelo menos 8 caracteres.</Text>
      <Button title="Salvar nova senha" onPress={salvar} />
      <Button title="Voltar" variant="link" onPress={() => router.replace({ pathname: '/verificacao', params: { email } })} />
    </AuthLayout>
  );
}
