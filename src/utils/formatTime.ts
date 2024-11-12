import { formatDistanceToNowStrict } from "date-fns";
import { enUS } from "date-fns/locale";

const formatDistanceLocale = {
  lessThanXSeconds: "just now",
  xSeconds: "just now",
  halfAMinute: "just now",
  lessThanXMinutes: "{{count}}m ago",
  xMinutes: "{{count}}m ago",
  aboutXHours: "{{count}}h ago",
  xHours: "{{count}}h ago",
  xDays: "{{count}}d ago",
  aboutXWeeks: "{{count}}w ago",
  xWeeks: "{{count}}w ago",
  aboutXMonths: "{{count}}month ago",
  xMonths: "{{count}}month ago",
  aboutXYears: "{{count}}y ago",
  xYears: "{{count}}y ago",
  overXYears: "{{count}}y ago",
  almostXYears: "{{count}}y ago",
};

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {};

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace("{{count}}", count.toString());

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "in " + result;
    } else {
      if (result === "just now") return result;
      //   return result + " ago";
      return result;
    }
  }

  return result;
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...enUS,
      formatDistance,
    },
  });
}
