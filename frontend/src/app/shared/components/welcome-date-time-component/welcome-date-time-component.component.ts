import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-date-time-component',
  standalone: true,
  imports: [],
  templateUrl: './welcome-date-time-component.component.html',
  styleUrl: './welcome-date-time-component.component.scss'
})
export class WelcomeDateTimeComponentComponent implements OnInit, OnDestroy {
  @Input() username: string = ''; // Input property for username
  currentDateTime: string = ''; // Holds the current date and time
  private intervalId: any; // To store the interval reference

  ngOnInit(): void {
    this.updateDateTime(); // Initial update
    this.intervalId = setInterval(() => {
      this.updateDateTime(); // Update every second
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Clean up the interval
    }
  }

  private updateDateTime(): void {
    const now = new Date();
    this.currentDateTime = now.toLocaleString(); // Format as local date/time string
  }
}
