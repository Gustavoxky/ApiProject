export function validateFields(name: string, email: string, login: string | undefined, password: string | undefined): boolean {
  if (!name || !email || !(login ?? '') || !(password ?? '')) {
    return false;
  }

  return true;
}