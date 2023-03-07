/**
 * Valida si cualquier tipo de valor enviado dentro de los siguientes se encuentra vacío:
 * boolean | number | bigint | [] | object | string | null | undefined
 *
 * @param {(boolean | number | bigint | [] | object | string | null | undefined)} value Valor a evaluar
 * @return {boolean} Indica si la variable enviada esta vacía o no
 */
export const IsEmpty = (
  value: boolean | number | bigint | [] | object | string | null | undefined,
): boolean => {
  if (typeof value === 'string') return value.trim() === '' ? true : false;
  else if (value === null || value === undefined) return true;
  else if (typeof value === 'object')
    return Object.keys(value).length === 0 ? true : false;
  return false;
};
