import { useRouter } from 'expo-router';
import { useState } from 'react';
import { AuthLayout } from '../components/AuthLayout';
import { Button } from '../components/Button';
import { Field } from '../components/Field';

export default function EsqueciSenha() {
  const router = useRouter();
  const [valor, setValor] = useState('');
  const [error, setError] = useState('');

  function avancar() {
    if (!valor.trim()) return setError('Informe seu e-mail ou usuário.');
    setError('');
    router.push({ pathname: '/verificacao', params: { email: valor.trim() } });
  }

  return (
    <AuthLayout title="Esqueceu a senha?" subtitle="Informe seu e-mail ou usuário e enviaremos as instruções para redefinir.">
      <Field label="E-mail ou usuário" placeholder="voce@email.com" value={valor} onChangeText={setValor} autoCapitalize="none" error={error} />
      <Button title="Avançar" onPress={avancar} />
      <Button title="Voltar" variant="outline" onPress={() => router.replace('/login')} />
    </AuthLayout>
  );
}
