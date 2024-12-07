import dayjs from "dayjs";

const formatTime = (time) => {
  return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
};

export default formatTime;
