export type SuppInfo = {
  SuppId: String;
  annotation?: {
    documentation: string[];
  }
  // can have anything else in here
  // TODO: need to add ability to have anything else in here
} | any;
