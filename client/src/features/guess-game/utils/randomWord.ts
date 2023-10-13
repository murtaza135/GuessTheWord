import { words } from './words';
import sample from "lodash/sample";

export function randomWord() {
  return sample(words)!;
}