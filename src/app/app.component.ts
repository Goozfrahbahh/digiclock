import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <div
      class="min-h-screen w-screen relative overflow-hidden bg-slate-950 text-gray-100"
    >
      <!-- Background (banner) -->
      <div
        class="absolute inset-0 bg-cover bg-center opacity-25"
        [ngStyle]="{ 'background-image': 'url(' + bannerUrl + ')' }"
      ></div>

      <!-- Soft blur overlay -->
      <div
        class="absolute inset-0 backdrop-blur-[10px] bg-gradient-to-b from-slate-950/70 via-slate-950/70 to-slate-950/90"
      ></div>

      <!-- Content -->
      <div
        class="relative h-screen w-screen flex items-center justify-center p-6"
      >
        <div class="w-full max-w-xl">
          <!-- Brand row -->
          <div class="flex items-center justify-center gap-3 mb-5">
            <div
              class="h-11 w-11 rounded-2xl bg-white/10 border border-white/10 shadow-lg overflow-hidden"
            >
              <img
                [src]="logoUrl"
                alt="Lunch Money"
                class="h-full w-full object-cover"
                draggable="false"
              />
            </div>

            <div class="text-left leading-tight select-none">
              <div class="text-sm tracking-[0.35em] uppercase text-white/60">
                Lunch Money
              </div>
              <!-- <div class="text-xs tracking-wider text-white/40">
                Training Ground
              </div> -->
            </div>
          </div>

          <!-- Clock card -->
          <div
            class="relative rounded-3xl border border-white/10 bg-white/5 shadow-2xl px-8 py-10 text-center overflow-hidden"
          >
            <!-- Accent glow -->
            <div
              class="pointer-events-none absolute -inset-24 opacity-40 blur-3xl"
              style="
                background: radial-gradient(
                  circle at 50% 30%,
                  rgba(245, 158, 11, 0.35),
                  rgba(0, 0, 0, 0)
                );
              "
            ></div>

            <!-- Top chips -->
            <div class="flex items-center justify-between mb-6">
              <div
                class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1"
              >
                <span
                  class="text-[11px] tracking-wide text-white/70 whitespace-nowrap"
                >
                  Item pages up ready to refresh at 59 secs
                </span>
              </div>

              <div
                class="text-[11px] tracking-[0.25em] uppercase text-white/50"
              >
                {{ date }}
              </div>
            </div>

            <!-- Time with ms (no shaking) -->
            <div
              class="relative text-6xl md:text-7xl font-extrabold tracking-widest flex items-end justify-center font-mono select-none whitespace-nowrap"
            >
              <!-- Time -->
              <span class="drop-shadow-[0_10px_20px_rgba(0,0,0,0.45)]">
                {{ time }}
              </span>

              <!-- Milliseconds (same line) -->
              <span
                class="ml-3 text-2xl md:text-3xl text-white/45 leading-none w-[3ch] text-right tabular-nums"
              >
                {{ ms }}
              </span>
            </div>

            <!-- AM/PM + Timezone (works for whatever timezone the device is in) -->
            <div class="mt-5 text-xs tracking-[0.45em] uppercase text-white/45">
              {{ ampm }} {{ timeZoneLabel }}
            </div>

            <!-- Footer hint -->
            <div class="mt-8 text-[11px] text-white/40">
              Watch the pings. Hit the window. 🥖💰
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  // Your Supabase public URLs
  logoUrl =
    "https://oavgdbectmktxcybnswy.supabase.co/storage/v1/object/public/JSA/logo.jpg";
  bannerUrl =
    "https://oavgdbectmktxcybnswy.supabase.co/storage/v1/object/public/JSA/banner.jpg";

  time: string = "";
  ms: string = "";
  date: string = "";
  timeZoneLabel: string = "";
  ampm: string = "";
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

    // 12-hour format (based on the user's local timezone)
    let hours = now.getHours();
    this.ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    const hh = String(hours).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    // ✅ Time no longer includes AM/PM (prevents wrapping)
    this.time = `${hh}:${minutes}:${seconds}`;

    // ✅ Milliseconds kept separate and inline
    this.ms = String(now.getMilliseconds()).padStart(3, "0");

    // Date in user's locale/timezone
    this.date = now.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Timezone label for the user's current timezone (e.g., CST, PST, GMT+1, etc.)
    const formatter = new Intl.DateTimeFormat(undefined, {
      timeZoneName: "short",
    });
    const parts = formatter.formatToParts(now);
    const tzPart = parts.find((p) => p.type === "timeZoneName");
    this.timeZoneLabel = tzPart?.value ?? "";
  }
}
