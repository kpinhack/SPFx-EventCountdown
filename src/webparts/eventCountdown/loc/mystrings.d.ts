declare interface IEventCountdownStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'eventCountdownStrings' {
  const strings: IEventCountdownStrings;
  export = strings;
}
