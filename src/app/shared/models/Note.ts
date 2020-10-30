export class Note {
  title: string;
  description: string;
  category: string;
  date: string;

  constructor(title: string, description: string, category: string, date: string) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.date = date;
  }
}
