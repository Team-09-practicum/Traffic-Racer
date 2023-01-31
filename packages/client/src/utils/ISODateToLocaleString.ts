/**
 * Конвертирует строку с датой в строку с языкозависимым представлением даты.
 * @param {string} timestamp Дата в ISO формате YYYY-MM-DDTHH:MM:SSZ
 * @param {Intl.LocalesArgument} locales Локаль
 * @param {Intl.DateTimeFormatOptions} options Опции для настройки формата вывода
 */
export const ISODateToLocaleString = (
  timestamp: string,
  locales?: Intl.LocalesArgument,
  options?: Intl.DateTimeFormatOptions
) => new Date(timestamp.replace(' ', 'T')).toLocaleString(locales, options);
