import * as React from 'react';
import styles from './EventCountdown.module.scss';
import { IEventCountdownProps } from './IEventCountdownProps';
import { IEventCountdownState } from './IEventCountdownState';
import { escape } from '@microsoft/sp-lodash-subset';

export default class EventCountdown extends React.Component<IEventCountdownProps, IEventCountdownState> {

  private timerID;
  private totalDays: any;
  private totalHours: any;
  private totalMinutes: any;
  private totalSeconds: any;
  
  private diffHours: any;
  private diffMinutes: any;
  private diffSeconds: any;
  
  public constructor(props) {
    super(props);
    this.state = {
      debug: null,
      stateDate: new Date()
    };
  }

  private componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  private componentWillUnmount() {
    clearInterval(this.timerID);
  }

  private tick() {
    //let difMills = Math.abs( this.props.eventDate.valueOf() - this.state.stateDate.valueOf() );
    let diffMills = Math.abs( this.props.eventDate.valueOf() - (new Date()).valueOf() );
    this.totalSeconds = Math.floor(diffMills / 1000);
    this.totalMinutes = Math.floor(this.totalSeconds / 60);
    this.totalHours = Math.floor(this.totalMinutes / 60);
    this.totalDays = Math.floor(this.totalHours / 24);
    
    this.diffHours = this.totalHours - (this.totalDays*24);
    this.diffMinutes = this.totalMinutes - (this.totalDays*24*60) - (this.diffHours*60);
    this.diffSeconds = this.totalSeconds - (this.totalDays*24*60*60) - (this.diffHours*60*60)-(this.diffMinutes*60);

    this.setState({
      debug: diffMills,
      stateDate:  new Date( diffMills )
    });
  }

  public render(): React.ReactElement<IEventCountdownProps> {
    return (
      <div className={styles.eventCountdown}>
        <div className={styles.container}>
        <p>Dies ist ein SPFX Webpart</p>
        <p className="ms-font-l">{escape(this.props.description)}</p>
        <p> {this.props.eventDate.toISOString()}</p>
        <p> {this.state.debug}</p>

        <p> days: {this.totalDays}</p>
        <p> hours: {this.totalHours }</p>
        <p> minutes: {this.totalMinutes }</p>
        <p> seconds: {this.totalSeconds }</p>

        <p> Tage: {this.totalDays}</p>
        <p> Stunden: {this.diffHours}</p>
        <p> Minuten: {this.diffMinutes}</p>
        <p> Sekunden: {this.diffSeconds}</p>
        <p> {this.state.stateDate.toISOString()}</p>
        {/*
          <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span className="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p className="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p className="ms-font-l ms-fontColor-white">{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div>
          */}
        </div>
      </div>
    );
  }
}
