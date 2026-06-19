export const changeMomentHandler = (isoDate: string) => {
  const result = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
  return result;
};
