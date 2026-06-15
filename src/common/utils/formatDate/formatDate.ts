export const formatDate = (
  date: string | Date,
  locale = "pt-BR",
) => {
  return new Date(date).toLocaleDateString(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};