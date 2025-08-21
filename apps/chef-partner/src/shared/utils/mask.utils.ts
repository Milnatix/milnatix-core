export function getDynamicFederalDocumentMask(value?: string | null): string {
  const numbers = value?.replace(/\D/g, '') || '';
  return numbers.length > 11 ? '00.000.000/0000-00' : '000.000.000-000';
}
