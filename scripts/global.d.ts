declare let alphabet: string;
declare let fxhash: string;
declare function b58dec(str: string): number;
declare let fxhashTrunc: string;
declare let regex: RegExp;
declare let hashes: string;
declare function sfc32(a: number, b: number, c: number, d: number): () => number;
declare function fxrand(): number;
declare function fxpreview(): void;

interface Window {
  $fxhashFeatures: { [key: string]: any }
}
