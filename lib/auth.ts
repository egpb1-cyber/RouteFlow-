// Simulação de autenticação (sem backend). Troque estas funções por
// chamadas reais (ex.: Firebase) quando o projeto tiver um backend.
let currentCode: string | null = null;
let expiresAt = 0;

export const isEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v.trim());

export function sendCode(email: string): string {
  currentCode = String(Math.floor(100000 + Math.random() * 900000));
  expiresAt = Date.now() + 10 * 60 * 1000; // vale por 10 minutos
  console.log(`[RouteFlow] código para ${email}: ${currentCode}`);
  return currentCode;
}

export function verifyCode(input: string): boolean {
  return !!currentCode && Date.now() < expiresAt && input.trim() === currentCode;
}

export function clearCode() {
  currentCode = null;
}
