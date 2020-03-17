export interface Activity {
  id: string;
  name: string;
  position: number;
}

export interface Activities {
  [id: string]: Activity;
}
