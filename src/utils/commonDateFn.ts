
// Utc Time format in better reprentation not in TZ format;
export const getUtcTimestampOnBetterFormat = (withMilliseconds = false): string => {
  const now = new Date();

  const pad = (n: number) => n.toString().padStart(2, '0');
  const padMs = (n: number) => n.toString().padStart(3, '0');

  const year = now.getUTCFullYear();
  const month = pad(now.getUTCMonth() + 1);
  const day = pad(now.getUTCDate());

  const hours = pad(now.getUTCHours());
  const minutes = pad(now.getUTCMinutes());
  const seconds = pad(now.getUTCSeconds());
  const milliseconds = padMs(now.getUTCMilliseconds());

  return withMilliseconds
    ? `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`
    : `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};


export const getUtcAndLocalTimestamp = (
  isEnableMs: boolean = false,
  is24HourFormat: boolean = false
): string => {
  const now = new Date();

  const pad = (n: number) => n.toString().padStart(2, '0');
  const padMs = (n: number) => n.toString().padStart(3, '0');

  const formatTime = (hours24: number) => {
    if (is24HourFormat) {
      return { hoursFormatted: pad(hours24), ampm: '' };
    } else {
      const ampm = hours24 >= 12 ? 'PM' : 'AM';
      const hours12 = hours24 % 12 || 12; // convert 0 to 12
      return { hoursFormatted: pad(hours12), ampm };
    }
  };

  const format = (date: Date, useUTC: boolean) => {
    const year = useUTC ? date.getUTCFullYear() : date.getFullYear();
    const month = pad(useUTC ? date.getUTCMonth() + 1 : date.getMonth() + 1);
    const day = pad(useUTC ? date.getUTCDate() : date.getDate());

    const hours24 = useUTC ? date.getUTCHours() : date.getHours();
    const { hoursFormatted, ampm } = formatTime(hours24);

    const minutes = pad(useUTC ? date.getUTCMinutes() : date.getMinutes());
    const seconds = pad(useUTC ? date.getUTCSeconds() : date.getSeconds());
    const milliseconds = padMs(useUTC ? date.getUTCMilliseconds() : date.getMilliseconds());

    const msPart = isEnableMs ? `.${milliseconds}` : '';

    if (useUTC) {
      // UTC time without GMT label
      return `${day}-${month}-${year} ${hoursFormatted}:${minutes}:${seconds}${msPart}${is24HourFormat ? '' : ` ${ampm}`}`;
    }

    // Local time with GMT offset label, with GMT colored green
    const offsetMin = -date.getTimezoneOffset();
    const sign = offsetMin >= 0 ? '+' : '-';
    const offsetHours = pad(Math.floor(Math.abs(offsetMin) / 60));
    const offsetMinutes = pad(Math.abs(offsetMin) % 60);

    const gmtString = `|| GMT${sign}${offsetHours}:${offsetMinutes}`;

    return `${day}-${month}-${year} ${hoursFormatted}:${minutes}:${seconds}${msPart}${is24HourFormat ? '' : ` ${ampm}`} ${gmtString}`;
  };

  const utc = format(now, true);
  const local = format(now, false);

  return `UTC : ${utc} | Local : ${local}`;
};



//----------------- Using on middleware ---------------------
export const formatCurrentUTCDateTime = () => {
  const now = new Date();
  const dd = String(now.getUTCDate()).padStart(2, '0');
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
  const yyyy = now.getUTCFullYear();
  const hh = String(now.getUTCHours()).padStart(2, '0');
  const min = String(now.getUTCMinutes()).padStart(2, '0');
  const ss = String(now.getUTCSeconds()).padStart(2, '0');
  const ms = String(now.getUTCMilliseconds()).padStart(3, '0'); // milliseconds

  // return `${dd}-${mm}-${yyyy} x ${hh}:${min}`;
  return `${yyyy}-${mm}-${dd} x ${hh}:${min}:${ss}.${ms} UTC`;
}



// Client side convert
function convertUTCToLocal(utcString: any, format = '24') {
  const [datePart, timePart] = utcString.split('x').map((s: any) => s.trim());
  const [dd, mm, yyyy] = datePart.split('-').map(Number);
  const [hh, min] = timePart.split(':').map(Number);

  const utcDate = new Date(Date.UTC(yyyy, mm - 1, dd, hh, min));
  const localDate = new Date(utcDate.toLocaleString()); // convert to local

  const localDD = String(localDate.getDate()).padStart(2, '0');
  const localMM = String(localDate.getMonth() + 1).padStart(2, '0');
  const localYYYY = localDate.getFullYear();
  let hours = localDate.getHours();
  const minutes = String(localDate.getMinutes()).padStart(2, '0');

  if (format === '12') {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;
    const formattedHH = String(hours).padStart(2, '0');
    return `${localDD}-${localMM}-${localYYYY} x ${formattedHH}:${minutes} ${ampm}`;
  } else {
    const formattedHH = String(hours).padStart(2, '0');
    return `${localDD}-${localMM}-${localYYYY} x ${formattedHH}:${minutes}`;
  }
}
