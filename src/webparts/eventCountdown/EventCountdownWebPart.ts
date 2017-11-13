import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'eventCountdownStrings';
import EventCountdown from './components/EventCountdown';
import { IEventCountdownProps } from './components/IEventCountdownProps';
import { IEventCountdownWebPartProps } from './IEventCountdownWebPartProps';

export default class EventCountdownWebPart extends BaseClientSideWebPart<IEventCountdownWebPartProps> {

  private eventDate; 

  public render(): void {
    this.eventDate = new Date('2017-12-12 19:15'); // 2017,12,3,7,15
    // description: this.properties.description,
    const element: React.ReactElement<IEventCountdownProps > = React.createElement(
      EventCountdown,
      {
        description: 'ich bin die beschreibung',
        eventDate: this.eventDate
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
