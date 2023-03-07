/**
 * Valida si el numero enviado a partir del value se encuentra dentro del rango min >= value <= max
 *
 * @param {string} value Valor a evaluar
 * @param {number} min Mínimo que se usara en la comparación
 * @param {number} max Máximo que se usara en la comparación
 * @return {*}  {boolean}
 */
export const NumberRange = (
  value: number,
  min: number,
  max: number,
): boolean => {
  return value > max ? false : value < min ? false : true;
};
