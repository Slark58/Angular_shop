export interface IFiltersResponse {
  title: string;
  data: {
    id: number;
    value: string | number;
    code?: string;
  }[];
}
