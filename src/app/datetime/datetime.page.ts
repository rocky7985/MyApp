import { Component, ElementRef, ViewChildren, AfterViewInit, ChangeDetectorRef, QueryList } from '@angular/core';
import { CommonService } from '../common.service';
import { StorageService } from '../storage.service';
import { NavigationService } from '../navigation.service';
import { IonDatetime } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.page.html',
  styleUrls: ['./datetime.page.scss'],
})
export class DatetimePage implements AfterViewInit {

  @ViewChildren('dateTimePicker') dateTimePickers!: QueryList<IonDatetime>;

  highlightedDates: any = [];
  scheduledData: any = [];
  selectedDateMeetings: any = [];
  currentDate: string = '';
  currentMonth: string = '';
  currentYear: string = '';
  minDate: string = '';
  maxDate: string = '';

  constructor(
    private CommonService: CommonService,
    private StorageService: StorageService,
    private Navigation: NavigationService,
    private cdr: ChangeDetectorRef
  ) {
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
    console.log('CurrentDate:', this.currentDate);
    this.currentMonth = moment(today).format('MM');
    console.log('currentMonth:', this.currentMonth);
    this.currentYear = moment(today).format('YYYY');
    console.log('currentYear:', this.currentYear);

    this.minDate = moment(today).subtract(10, 'years').format('YYYY-MM-DD');
    this.maxDate = moment(today).add(10, 'years').format('YYYY-MM-DD');

    // Add current date to the highlighted dates
    this.highlightedDates.push({
      date: this.currentDate,
      textColor: 'white',
      backgroundColor: 'blue',
    });
  }

  ngAfterViewInit() {
    this.addNavigationListeners();
  }

  addNavigationListeners() {
    const datetimeElement = this.dateTimePickers.first;
    console.log('datetime element:', datetimeElement);

    if (datetimeElement) {
        const nativeElement = (datetimeElement as any).el;
        const shadowRoot = nativeElement.shadowRoot;

        // Select the previous and next buttons using the correct structure
        const prevButton = shadowRoot?.querySelector('.calendar-next-prev ion-button[aria-label="Previous month"]');
        const nextButton = shadowRoot?.querySelector('.calendar-next-prev ion-button[aria-label="Next month"]');

        if (prevButton && nextButton) {
            console.log('Previous Button:', prevButton.textContent);
            prevButton.addEventListener('click', () => this.onMonthYearChange('prev'));

            console.log('Next Button:', nextButton.textContent);
            nextButton.addEventListener('click', () => this.onMonthYearChange('next'));
        } else {
            console.error('Navigation buttons not found in Shadow DOM');
        }
    } else {
        console.error('Shadow DOM not available for ion-datetime');
    }
}


  // Function to handle month/year change when '< >' buttons are clicked
  onMonthYearChange(direction: 'prev' | 'next') {
    const newDate = moment(this.currentDate);

    if (direction == 'prev') {
      newDate.subtract(1, 'month');
    } else if (direction == 'next') {
      newDate.add(1, 'month');
    }

    this.currentMonth = newDate.format('MM');
    this.currentYear = newDate.format('YYYY');
    this.currentDate = newDate.format('YYYY-MM-DD');

    // Reload schedule for the new month and year
    this.loadSchedule(this.currentMonth, this.currentYear);
  }

  ionViewWillEnter() {
    this.loadSchedule(this.currentMonth, this.currentYear);
  }

  async loadSchedule(month: string, year: string) {
    const schedule = await this.StorageService.get('schedule') || [];

    if (schedule.length > 0) {
      const filteredEvents = schedule.filter((item: any) => {
        const eventDate = moment(item.selectDate, "YYYY-MM-DD");
        return eventDate.format('MM') == month && eventDate.format('YYYY') == year;
      });

      this.scheduledData = filteredEvents;

      this.highlightedDates = filteredEvents.map((item: any) => ({
        date: moment(item.selectDate, "YYYY-MM-DD").format("YYYY-MM-DD"),
        textColor: 'rgb(68, 10, 184)',
        backgroundColor: 'rgb(211, 200, 229)',
      }));

      this.CommonService.presentToast('Scheduled Dates fetched successfully.');
      console.log('Scheduled Data', this.scheduledData);
      console.log('Highlighted Dates:', this.highlightedDates);
    }
    else {
      this.scheduledData = [];
      this.highlightedDates = [];
      this.CommonService.presentToast('Problem in receiving schedule dates');
      console.log('No Scheduled Dates.');
    }
    this.cdr.detectChanges();
  }

  selectedDate(event: any) {
    const selectedDate = moment(event.detail.value);
    const newMonth = selectedDate.format('MM');
    const newYear = selectedDate.format('YYYY');

    // Check if the month or year has changed
    if (newMonth !== this.currentMonth || newYear !== this.currentYear) {
      this.currentMonth = newMonth;
      this.currentYear = newYear;

      console.log('Month Changed:', this.currentMonth, this.currentYear);

      this.loadSchedule(this.currentMonth, this.currentYear);
    }

    // Select meetings of date you selected
    const formattedSelectedDate = selectedDate.format("YYYY-MM-DD");
    console.log('Selected date:', formattedSelectedDate);

    this.selectedDateMeetings = this.scheduledData.filter((data: any) => {
      return moment(data.selectDate, "YYYY-MM-DD").format("YYYY-MM-DD") == formattedSelectedDate;
    });
  }

  gotoAllPosts() {
    this.Navigation.navigateWithRoute('/allposts');
  }


  gotoSchedule() {
    this.Navigation.navigateWithRoute('/schedule');
  }

}
