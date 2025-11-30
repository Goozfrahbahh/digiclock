import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="h-screen w-screen flex items-center justify-center bg-slate-900 text-gray-100">
      <div class="p-10 rounded-2xl bg-slate-800 shadow-xl text-center">
        
        <div class="text-6xl font-bold tracking-widest">
          {{ time }}
        </div>

        <div class="mt-2 text-xl text-gray-400 tracking-wide">
          {{ date }}
        </div>

        <div class="mt-1 text-sm text-gray-500 uppercase tracking-widest">
          {{ timeZoneLabel }}
        </div>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy {

  time: string = '';
  date: string = '';
  timeZoneLabel: string = '';
  private intervalId: any;

  ngOnInit(): void {
    this.updateClock();
    this.intervalId = setInterval(() => this.updateClock(), 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private updateClock(): void {
    const now = new Date();

    // Time (24-hour or switch to 12-hour below)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    this.time = `${hours}:${minutes}:${seconds}`;

    // Date
    this.date = now.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Timezone label (ex: CST, PST, GMT+2)
    const formatter = new Intl.DateTimeFormat([], { timeZoneName: 'short' });
    const parts = formatter.formatToParts(now);
    const tzPart = parts.find((p) => p.type === 'timeZoneName');
    this.timeZoneLabel = tzPart?.value ?? '';
  }
}

