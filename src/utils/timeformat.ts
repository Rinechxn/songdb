// utilities/formatDuration.ts or wherever you prefer to store utility functions

/**
 * Formats a duration from seconds into HH:MM:SS format.
 * @param seconds The duration in seconds.
 * @returns A string formatted as "HH:MM:SS".
 */
function formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');
    const paddedSeconds = remainingSeconds.toString().padStart(2, '0');
  
    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  }
  
  export default formatDuration;
  