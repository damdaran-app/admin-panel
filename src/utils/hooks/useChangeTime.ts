export const changeTimeHandler = (time: string) => {
  const result = new Intl.DateTimeFormat("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(time));
  return result
};
