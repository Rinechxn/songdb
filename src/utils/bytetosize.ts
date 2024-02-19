// utilities/bytesToSize.ts or wherever you prefer to store utility functions

/**
 * Converts bytes to a human-readable string.
 * @param bytes The size in bytes.
 * @param decimals The number of decimal places to include.
 * @returns A formatted string with the appropriate size unit.
 */
function bytesToSize(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return '0 Bytes';
  
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
    const i = Math.floor(Math.log(bytes) / Math.log(k));
  
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  
  export default bytesToSize;
  