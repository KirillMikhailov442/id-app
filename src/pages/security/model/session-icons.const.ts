import android from "../assets/android.svg";
import apple from "../assets/apple.svg";
import firefox from "../assets/firefoxbrowser.svg";
import chrome from "../assets/googlechrome.svg";
import linux from "../assets/linux.svg";
import safari from "../assets/safari.svg";
import windows from "../assets/windows.svg";

export const SESSION_BROWSER_ICONS = [
  { pattern: /firefox|fxios|floorp|librewolf|waterfox|zen/i, src: firefox, color: "firefox" },
  {
    pattern: /chrome|chromium|crios|edge|edg\/|opera|opr\/|brave|vivaldi|yandex|yabrowser|samsung|silk|arc|whale/i,
    src: chrome,
    color: "chrome",
  },
  { pattern: /safari/i, src: safari, color: "safari" },
];

export const SESSION_OS_ICONS = [
  { pattern: /mac|ios|ipad|iphone/i, src: apple, color: "apple" },
  { pattern: /windows/i, src: windows, color: "windows" },
  { pattern: /android/i, src: android, color: "android" },
  { pattern: /linux|ubuntu|debian|fedora/i, src: linux, color: "linux" },
];
