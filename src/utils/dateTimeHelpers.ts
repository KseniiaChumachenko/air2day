import moment from "moment";

export const dateFormat = (date: string) => moment(date).format("DD/MM/YYYY");
export const dayFormat = (date: string) => moment(date).format("DD");
export const timeFormat = (date: string) => moment(date).format("HH:mm");
