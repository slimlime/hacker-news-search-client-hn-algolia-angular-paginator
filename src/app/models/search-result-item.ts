/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-24 09: 02: 16
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-24 09: 09: 47
 */

/**
 * Schema for hacker news search
 * Data-first design. Clarity for data definitions before implementing code.
 *
 * @export
 * @interface SearchResultItem
 */
export interface SearchResultItem {
    // readonly immutable functional

    /**
     *
     *
     * @type {string}
     * @memberof SearchResultItem
     */
    readonly id: string;

    /**
     *
     *
     * @type {string}
     * @memberof SearchResultItem
     */
    readonly created_at: string;  // See if auto-compatible with Date format

    /**
     *
     *
     * @type {number}
     * @memberof SearchResultItem
     */
    readonly created_at_i: number;  // Epoch time.


}