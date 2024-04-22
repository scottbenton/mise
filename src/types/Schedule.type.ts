export interface Schedule {
  date: string;
  uid: string;

  label: string;
  time: {
    hours: number;
    minutes: number;
  };
}
