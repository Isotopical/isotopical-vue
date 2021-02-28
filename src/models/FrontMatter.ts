export default interface FrontMatter {
  layout: string; // What layout should be used: post | tab | card list | menu
  title: string; // The title of the document
  sub_title?: string; // Further info about the document
  tag_line?: string; // Catchy one liner
  publish_date: string; // Publish date in yyyy-mm-dd format
  updated_date?: string; // Updated date in yyyy-mm-dd format
  author: string; // Name of the individual who wrote the document
  thumbnail?: string; // Relative URL for an imagine to use as a thumbnail
  tags?: string[]; // Used to group documents
  tabs?: string[]; // Use to define the tabs when using the tab layout
  close_button?: string; // Relative URL to go to when the close button is clicked
  published: boolean; // Set to true when the document is published. Set to false when in draft
  menu?: string[][];
}
