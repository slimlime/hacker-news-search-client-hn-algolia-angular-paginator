import { URL } from "url";

/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-24 09: 02: 16
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-24 09: 56: 23
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
    // using primitives first before interfacing, mapping.
    // following the expected REST API response

    /**
     *
     *
     * @type {string}
     * @memberof SearchResultItem
     */
    readonly id: string;  // - NOTE: Search result item listing ID is diffrent to the story_ID??!?

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

    readonly author: string;

    readonly title: string;

    readonly url: string;

    readonly textDescription: string;

    readonly points: number;

    readonly parent_ID: number;

    // children? Each comment counts as an item? Number of comments? Related stories?
    /**
     * 
     * -- Warning: This looks dangerous.
     *
     * @type {SearchResultItem[]}
     * @memberof SearchResultItem
     */
    readonly children: SearchResultItem[];
}
