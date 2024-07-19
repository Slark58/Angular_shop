export interface IImgSig {
  imgForView: {
    src: string | ArrayBuffer | null | undefined;
    name: string;
  }[];
  imgForFormValue: File[];
}
