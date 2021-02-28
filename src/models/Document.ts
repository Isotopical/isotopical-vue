import FrontMatter from "./FrontMatter";

export default interface Document {
  attributes: FrontMatter;
  body: string;
}
