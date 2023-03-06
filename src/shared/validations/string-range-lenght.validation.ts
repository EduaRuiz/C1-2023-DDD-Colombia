/**
 * Valida la longitud del string recibido dado un rango tambien envidado dentro del rango min >= value.lenght <= max
 *
 * @param {string} value
 * @param {number} min
 * @param {number} max
 * @return {*}  {boolean}
 */
export const StringRangeLength = (
  value: string,
  min: number,
  max: number,
): boolean => {
  return value.trim().length > max ? false : value.length < min ? false : true;
};
