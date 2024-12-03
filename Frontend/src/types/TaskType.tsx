export type Task = {
  _id: string;
  title: string;
  description: string;
  eventDate: string;
  status: string;
  createdAt: number;
};

export type EventTask = {
  _id: string;
  title: string;
  description: string;
  eventDate: string;
  eventTime: string;
  status: string;
};
