/**
 * Valida si el dominio del correo coincide con el dominio enviado
 *
 * @param {string} value Mail a validar
 * @param {string} domain Dominio para comparar ejemplo: @domain.com.co
 * @return {boolean} Indica si el mail contiene el dominio indicado
 */
export const IsInstitutionalMail = (value: string, domain: string): boolean => {
  const index = value.indexOf(domain);
  return index === -1
    ? false
    : value.length - domain.length !== index
    ? false
    : true;
};
