import * as React from 'react';
import * as ReactDom from 'react-dom';

import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import * as strings from 'eventCountdownStrings';
import MockHttpClient from './MockHttpClient';

import EventCountdown from './components/EventCountdown';
import { IEventCountdownProps } from './components/IEventCountdownProps';
import { IEventCountdownWebPartProps } from './IEventCountdownWebPartProps';

import pnp from "sp-pnp-js";

export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
  Id: string;
}

export default class EventCountdownWebPart extends BaseClientSideWebPart<IEventCountdownWebPartProps> {

  private eventDate; 

  private splists: ISPLists;
  private spevent;

  private _getMockListData(): Promise<ISPLists> {
    return MockHttpClient.get()
      .then((data: ISPList[]) => {
        var listData: ISPLists = { value: data };
        return listData;
      }) as Promise<ISPLists>;
  }

  private _getListData(): Promise<ISPLists> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

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
    return Version.parse('1.1');
  }

  private  getPropertyPaneDropdownFromSPLists() {
    let propList = [];
    if (this.splists){
    this.splists.value.map( (item,i) => {
      propList.push( {'key': item.Id, 'text':item.Title } );
    });
  }
    return propList;
  }

  protected onPropertyPaneConfigurationStart() {

    // Local environment
    if (Environment.type === EnvironmentType.Local) {
      this._getMockListData().then(r => {
        this.splists = r;
        console.log(r);
      });
    }
    else if (Environment.type == EnvironmentType.SharePoint || 
              Environment.type == EnvironmentType.ClassicSharePoint) {
      this._getListData()
        .then(r => {
          this.splists = r;
          console.log(r);
        });
    }
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
                /*
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
                */
                PropertyPaneDropdown('List',{
                  label: 'Dropdown',
                  options: 
                    this.getPropertyPaneDropdownFromSPLists()
                   // { key: '1', text: 'One'},
                   // { key: '2', text: 'Two' },
                   // { key: '3', text: 'Three' },
                   // { key: '4', text: 'Four'}
                   // [] //,
                  //selectedKey: '4',
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
