

export class Books {
  constructor(
      public version_id: string, 
      public name: string,
      public abbr: string,
      public ord: string,
      public book_group_id: string,
      public testament: string,
      public id: string,
      public osis_end: string,
      public parent: string,
      public next: string,
      public copyright: string
    ) { }
}