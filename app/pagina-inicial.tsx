import { useRouter } from 'expo-router';
import { AuthLayout } from '../components/AuthLayout';
import { Button } from '../components/Button';

export default function PaginaInicial() {
  const router = useRouter();
  return (
    <AuthLayout title="Página inicial" subtitle="Você entrou no RouteFlow.">
      <Button title="Sair" variant="outline" onPress={() => router.replace('/login')} />
    </AuthLayout>
  );
}
