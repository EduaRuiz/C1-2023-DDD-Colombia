/**
 * Valida la longitud del string recibido dado un rango también envidado dentro del rango min >= value.Length <= max
 *
 * @param {string} value Valor a evaluar
 * @param {number} min Mínimo que se usara en la comparación
 * @param {number} max Máximo que se usara en la comparación
 * @return {boolean} Indica si el valor no se encuentra dentro del rango enviado
 */
export const StringRangeLength = (
  value: string,
  min: number,
  max: number,
): boolean => {
  return value.trim().length > max ? false : value.length < min ? false : true;
};
