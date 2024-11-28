import { Locator } from '@playwright/test';

export class UtilityFunctions {
  /**
   * Extracts and trims the text content of all elements matching the locator.
   * @param locator - Playwright locator for the elements.
   * @returns An array of trimmed text content from the elements.
   */
  static async getTextContent(locator: Locator): Promise<string[]> {
    return locator.evaluateAll((elements) =>
      elements.map((el) => el.textContent?.trim() || '')
    );
  }

  /**
   * Retrieves numerical values (e.g., prices) from the specified elements.
   * @param locator - Locator for the elements containing numerical values.
   * @param prefixToRemove - Optional prefix to remove from the text (e.g., '$' for prices).
   * @returns Array of extracted numerical values.
   */
  static async getNumericValues(locator: Locator): Promise<number[]> {
    return locator.evaluateAll((elements) =>
      elements.map((el) =>
        parseFloat(el.textContent?.replace('$', '').trim() || '0')
      )
    );
  }

  /**
   * Sorts an array of numbers in ascending or descending order.
   * @param numbers - Array of numbers to sort.
   * @param order - Sort order: 'asc' for ascending, 'desc' for descending. Defaults to 'asc'.
   * @returns A new array with the numbers sorted.
   */
  static sortNumbers(numbers: number[], order: 'asc' | 'desc' = 'asc'): number[] {
    return [...numbers].sort((a, b) =>
      order === 'asc' ? a - b : b - a
    );
  }

  /**
   * Sorts an array of strings (e.g., product names) in ascending or descending order.
   * @param strings - Array of strings to sort.
   * @param order - Sort order: 'asc' for ascending, 'desc' for descending. Defaults to 'asc'.
   * @returns A new array with the strings sorted.
   */
  static sortStrings(strings: string[], order: 'asc' | 'desc' = 'asc'): string[] {
    return [...strings].sort((a, b) =>
      order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
    );
  }
}
