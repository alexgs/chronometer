export type Day = Hour[];
export type Hour = Segment[];
export type HourId = number;
export type Segment = string[];
export type SegmentId = number;

export interface TimeCode {
  hour: number;
  segment: number;
}
