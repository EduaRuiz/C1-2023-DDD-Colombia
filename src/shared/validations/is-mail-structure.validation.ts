/**
 * Valida si el valor suministrado cumple con la estructura de un mail (RFC2822)
 *
 * @param {string} value Mail a evaluar
 * @return {boolean} Indica si el Mail cumple con la estructura
 */
export const IsMailStructure = (value: string): boolean => {
  const regex = new RegExp(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  );
  return regex.test(value);
};
