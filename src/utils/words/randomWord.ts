import words from './words';
import sample from "lodash/sample";

export default function randomWord() {
  return sample(words)!;
}