export interface Element {
  id: number;
  type: ElementType;
  link?: Link;
  content: string;
}

export enum ElementType {
  ExternalLink,
  InternalLink,
  Paragraph
}

export interface Link {
  href: string;
  text: string;
  title: string;
}