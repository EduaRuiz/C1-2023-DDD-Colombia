/**
 * Recibe dos valores Date para comparar si la diferencia entre ambos no supera la tolerancia en segundos
 *
 * @param {Date} value Fecha a validar
 * @param {Date} now Fecha con la que se compara
 * @param {Date} tolerance Tolerancia en segundos
 * @return {boolean} Indica si la fecha es actual
 */
export const CurrentDateTime = (
  value: Date,
  now: Date,
  tolerance: number,
): boolean => {
  return !(Math.abs(value.getTime() - now.getTime()) > tolerance * 1000);
};
