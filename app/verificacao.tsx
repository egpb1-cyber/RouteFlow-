import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { AuthLayout } from '../components/AuthLayout';
import { Button } from '../components/Button';
import { Field } from '../components/Field';
import { FooterText, TextLink } from '../components/TextLink';
import { useToast } from '../components/Toast';
import { clearCode, isEmail, sendCode, verifyCode } from '../lib/auth';
import { Text } from 'react-native';
import { colors } from '../theme';

export default function Verificacao() {
  const router = useRouter();
  const params = useLocalSearchParams<{ email?: string }>();
  const { show, toast } = useToast();

  const [email, setEmail] = useState((params.email ?? '').trim());
  const [editing, setEditing] = useState(!isEmail(params.email ?? ''));
  const [novoEmail, setNovoEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [erro, setErro] = useState('');
  const enviado = useRef(false);

  function enviar(para: string, msg: string) {
    const c = sendCode(para);
    // Em desenvolvimento não há e-mail real: o código aparece no aviso.
    show(__DEV__ ? `${msg} (teste: ${c})` : msg, 'info', 6000);
  }

  useEffect(() => {
    if (enviado.current) return;
    enviado.current = true;
    if (isEmail(email)) enviar(email, `Código enviado para ${email}`);
    else show('Informe o e-mail correto para receber o código.', 'error');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function verificar() {
    if (codigo.length < 6) return setErro('Digite o código de 6 dígitos.');
    if (verifyCode(codigo)) {
      setErro('');
      clearCode();
      show('Conta verificada', 'success', 1400);
      setTimeout(() => router.replace({ pathname: '/nova-senha', params: { email } }), 1400);
    } else {
      show('Código incorreto, verifique novamente', 'error');
      setCodigo('');
    }
  }

  function reenviar() {
    if (!isEmail(email)) {
      setEditing(true);
      return show('Informe o e-mail correto para receber o código.', 'error');
    }
    enviar(email, `Novo código enviado para ${email}`);
  }

  function atualizarEmail() {
    if (!isEmail(novoEmail)) return show('Informe um e-mail válido.', 'error');
    setEmail(novoEmail.trim());
    setEditing(false);
    setNovoEmail('');
    enviar(novoEmail.trim(), `Código enviado para ${novoEmail.trim()}`);
  }

  const subtitle = isEmail(email)
    ? `Enviamos um código de verificação para o seu e-mail: ${email}. Por favor, digite-o abaixo para continuar.`
    : 'Informe o e-mail correto para receber o código de verificação.';

  return (
    <AuthLayout
      title="Verificação de duas etapas"
      subtitle={subtitle}
      toast={toast}
      footer={<FooterText text="Já tem conta?" link="Entrar" onPress={() => router.replace('/login')} />}
    >
      <Field
        label="Código de verificação"
        placeholder="Digite o código de 6 dígitos"
        value={codigo}
        onChangeText={(t) => setCodigo(t.replace(/\D/g, '').slice(0, 6))}
        keyboardType="number-pad"
        maxLength={6}
        error={erro}
      />
      <Button title="Verificar código" onPress={verificar} />
      <TextLink title="Reenviar código" onPress={reenviar} />
      <Text style={{ textAlign: 'center', marginTop: 10, color: colors.muted, fontSize: 15 }}>ou</Text>
      <TextLink title="Não recebi o código?" onPress={() => setEditing(true)} />

      {editing && (
        <>
          <Field label="E-mail correto" placeholder="voce@email.com" value={novoEmail} onChangeText={setNovoEmail} autoCapitalize="none" keyboardType="email-address" />
          <Button title="Enviar código para este e-mail" variant="outline" onPress={atualizarEmail} />
        </>
      )}
    </AuthLayout>
  );
}
