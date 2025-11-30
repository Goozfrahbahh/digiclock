import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="h-screen w-screen flex items-center justify-center bg-slate-900 text-gray-100">
      <div class="p-10 rounded-2xl bg-slate-800 shadow-xl text-center">

        <!-- Time with ms, no shaking -->
        <div
          class="text-6xl font-bold tracking-widest flex items-end justify-center gap-2 font-mono"
        >
          <span>{{ time }}</span>
          <span
            class="text-2xl text-gray-400 leading-none w-[3ch] text-right inline-block"
          >
            {{ ms }}
          </span>
        </div>

        <!-- Date -->
        <div class="mt-2 text-xl text-gray-400 tracking-wide">
          {{ date }}
        </div>

        <!-- Timezone -->
        <div class="mt-1 text-sm text-gray-500 uppercase tracking-widest">
          {{ timeZoneLabel }}
        </div>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy {

  time: string = '';
  ms: string = '';
  date: string = '';
  timeZoneLabel: string = '';
  private intervalId: any;

  ngOnInit(): void {
    this.updateClock();
    this.intervalId = setInterval(() => this.updateClock(), 10);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private updateClock(): void {
    const now = new Date();

    // 12-hour format
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const hh = String(hours).padStart(2, '0');

    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

    this.time = `${hh}:${minutes}:${seconds} ${ampm}`;
    this.ms = milliseconds;

    this.date = now.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const formatter = new Intl.DateTimeFormat([], { timeZoneName: 'short' });
    const parts = formatter.formatToParts(now);
    const tzPart = parts.find((p) => p.type === 'timeZoneName');
    this.timeZoneLabel = tzPart?.value ?? '';
  }
}
