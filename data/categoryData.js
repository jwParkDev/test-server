module.exports = new Array(300).fill({}).map((_, idx) => {
  const random = Math.floor(Math.random() * 9);
  return {
    categoryId: random,
    habitId: `${idx}`,
    habitImage: "/image/running.png",
    habitTitle: `달리기 3km${random}`,
    habitBody:
      "매일 아침에 3km 달리기를 실천합니다. 상쾌한 아침을 맞이하며 건강도 챙겨보세요!",
  };
});
