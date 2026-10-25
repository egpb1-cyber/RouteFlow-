import { useRouter } from 'expo-router';
import { useState } from 'react';
import { AuthLayout } from '../components/AuthLayout';
import { Button } from '../components/Button';
import { Field } from '../components/Field';
import { FooterText, TextLink } from '../components/TextLink';

export default function Login() {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [errors, setErrors] = useState<{ login?: string; senha?: string }>({});

  function entrar() {
    const e: typeof errors = {};
    if (!login.trim()) e.login = 'Informe seu usuário ou e-mail.';
    if (!senha) e.senha = 'Informe sua senha.';
    setErrors(e);
    if (Object.keys(e).length === 0) router.replace('/pagina-inicial');
  }

  return (
    <AuthLayout
      title="Bem-vindo de volta"
      subtitle="Entre para ver as previsões de fila perto de você."
      footer={<FooterText text="Ainda não tem conta?" link="Criar conta" onPress={() => router.push('/criar-conta')} />}
    >
      <Field label="Login" placeholder="Usuário ou e-mail" value={login} onChangeText={setLogin} autoCapitalize="none" error={errors.login} />
      <Field label="Senha" placeholder="Sua senha" value={senha} onChangeText={setSenha} password error={errors.senha} />
      <TextLink title="Esqueci a senha" align="right" onPress={() => router.push('/esqueci-senha')} />
      <Button title="Entrar" onPress={entrar} />
    </AuthLayout>
  );
}
