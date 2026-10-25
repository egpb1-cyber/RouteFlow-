import { useRouter } from 'expo-router';
import { useState } from 'react';
import { AuthLayout } from '../components/AuthLayout';
import { Button } from '../components/Button';
import { Field } from '../components/Field';
import { FooterText } from '../components/TextLink';
import { isEmail } from '../lib/auth';

export default function CriarConta() {
  const router = useRouter();
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirma, setConfirma] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function criar() {
    const e: Record<string, string> = {};
    if (!usuario.trim()) e.usuario = 'Escolha um nome de usuário.';
    if (!isEmail(email)) e.email = 'Informe um e-mail válido.';
    if (senha.length < 8) e.senha = 'Use pelo menos 8 caracteres.';
    if (confirma !== senha) e.confirma = 'As senhas não são iguais.';
    setErrors(e);
    if (Object.keys(e).length === 0) router.replace('/pagina-inicial');
  }

  return (
    <AuthLayout
      title="Criar conta"
      subtitle="Cadastre-se para planejar melhor suas rotinas."
      footer={<FooterText text="Já tem conta?" link="Entrar" onPress={() => router.replace('/login')} />}
    >
      <Field label="Nome de usuário" placeholder="Escolha um nome de usuário" value={usuario} onChangeText={setUsuario} autoCapitalize="none" error={errors.usuario} />
      <Field label="E-mail" placeholder="voce@email.com" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" error={errors.email} />
      <Field label="Senha" placeholder="Crie uma senha" value={senha} onChangeText={setSenha} password error={errors.senha} />
      <Field label="Confirmação de senha" placeholder="Repita a senha" value={confirma} onChangeText={setConfirma} password error={errors.confirma} />
      <Button title="Criar conta" onPress={criar} />
    </AuthLayout>
  );
}
