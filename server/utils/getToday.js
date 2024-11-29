const getToday = () => {
  const today = new Date();
  const dd = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
  const mm =
    today.getMonth() + 1 < 10
      ? `0${today.getMonth() + 1}`
      : today.getMonth() + 1;
  const yyyy = today.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

module.exports = getToday;
