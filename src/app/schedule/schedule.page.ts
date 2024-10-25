import { Component, ViewChild } from '@angular/core';
import { CommonService } from '../common.service';
import { StorageService } from '../storage.service';
import { NavigationService } from '../navigation.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonPopover } from '@ionic/angular';
import * as moment from 'moment';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage {

  @ViewChild('popoverDate') popoverDate!: IonPopover;
  @ViewChild('popoverFromTime') popoverFromTime!: IonPopover;
  @ViewChild('popoverToTime') popoverToTime!: IonPopover;

  scheduleForm: FormGroup;
  selectedValue: string = '';
  currentPopover: 'date' | 'fromTime' | 'toTime' | null = null;
  currentDate: string = '';
  minDate: string = '';
  maxDate: string = '';

  constructor(
    private CommonService: CommonService,
    private StorageService: StorageService,
    private Navigation: NavigationService,
  ) {
    this.scheduleForm = new FormGroup({
      selectDate: new FormControl('', Validators.required),
      fromTime: new FormControl('', Validators.required),
      toTime: new FormControl('', Validators.required),
      note: new FormControl('', [Validators.required, Validators.maxLength(30)])
    });

    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];

    const minDate = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() + 10, today.getMonth(), today.getDate());
    this.minDate = minDate.toISOString().split('T')[0];
    this.maxDate = maxDate.toISOString().split('T')[0];
  }

  openPopover(e: Event, type: 'date' | 'fromTime' | 'toTime') {
    this.currentPopover = type;
    const popover = this.getPopoverInstance(type);
    if (popover) {
      popover.event = e;
      popover.present(); // Show the popover
    }
    else{
      console.log('Popove not opened.');
    }
  }

  getPopoverInstance(type: 'date' | 'fromTime' | 'toTime') {
    switch (type) {
      case 'date':
        return this.popoverDate;
      case 'fromTime':
        return this.popoverFromTime;
      case 'toTime':
        return this.popoverToTime;
      default:
        return null;
    }
  }

  onValueChange(event: any) {
    const value = event.detail.value;
    this.selectedValue = value;
  }

   closePopover() {
    const popover = this.getPopoverInstance(this.currentPopover!);
    if (popover) {
      popover.dismiss();
    }
    else{
      console.log('Popover not closed.');
    }
    this.currentPopover = null;
  }

  cancelSelection() {
    this.selectedValue = '';
    this.closePopover();
  }

  async confirmSelection() {
    if (this.currentPopover == 'date') {
      if (!this.selectedValue) {
        // If no date was selected, set current date
        const formatDate = moment().format("YYYY-MM-DD");
        this.scheduleForm.get('selectDate')?.setValue(formatDate);
      } else {
        const formatDate = moment(this.selectedValue).format("YYYY-MM-DD");
        this.scheduleForm.get('selectDate')?.setValue(formatDate);
      }

    } else if (this.currentPopover == 'fromTime') {
      const formattedFromTime = this.selectedValue ? moment(this.selectedValue).format('LT') : moment().format('LT');
      this.scheduleForm.get('fromTime')?.setValue(formattedFromTime);
      await this.validateTime(); // Validate time on fromTime selection

    } else if (this.currentPopover == 'toTime') {
      const formattedToTime = this.selectedValue ? moment(this.selectedValue).format('LT') : moment().format('LT');
      this.scheduleForm.get('toTime')?.setValue(formattedToTime);
      await this.validateTime(); // Validate time on toTime selection
    }

    this.closePopover();
  }

  async validateTime() {
    const fromTime = this.scheduleForm.get('fromTime')?.value;
    const toTime = this.scheduleForm.get('toTime')?.value;

    if (fromTime && toTime) {
      const fromMoment = moment(fromTime, 'LT');
      const toMoment = moment(toTime, 'LT');

      if (toMoment.isSameOrBefore(fromMoment)) {
        await this.CommonService.presentAlert('Invalid Time Selection', 'To Time must be greater than From Time.');
        this.scheduleForm.get('toTime')?.setValue('');
      }
      else if (fromMoment.isSameOrAfter(toMoment)) {
        await this.CommonService.presentAlert('Invalid Time Selection', 'From Time must be greater than To Time.');
        this.scheduleForm.get('fromTime')?.setValue('');
      }
    }

    else {
      console.log('From Time & To Time not found.');
    }

  }


  async setSchedule() {
    if (this.scheduleForm.valid) {
      let schedule = await this.StorageService.get('schedule') || [];

      var existingmeetingId: number[] = [];
      if (schedule.length > 0) {
        schedule.forEach((id: any) => {
          existingmeetingId.push(id.meetingId);
        });
      }
      else {
        console.log('No Id is present for match.');
      }
      let newMeetId = Math.floor(Math.random() * 100) + 1;
      if (newMeetId) {
        this.scheduleForm.value.metingId = newMeetId;
        this.CommonService.presentToast('MeetingId Generated');
        console.log('Generated Id:', newMeetId);
      }
      else {
        this.CommonService.presentToast('MeetingId not Generated');
        console.log(' Problem occurred in generating MeetingId.');
      }

      if (schedule) {
        schedule.push(this.scheduleForm.value);
        await this.StorageService.set('schedule', schedule);
        console.log('Scheduled Data:', schedule);
        this.scheduleForm.reset();
        this.CommonService.presentToast('Schedule saved successfully.');
      } else {
        this.CommonService.presentToast('Error in getting data.');
        console.log('Problem occurred in getting data.');
      }

    }
    else {
      this.CommonService.presentToast('Form Invalid.');
      console.log('Invalid Form Data.');
    }

  }

  gotodateTime() {
    this.Navigation.navigateWithRoute('/datetime');
  }

}
