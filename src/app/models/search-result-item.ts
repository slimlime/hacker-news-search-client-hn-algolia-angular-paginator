
/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-24 09: 02: 16
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-24 10: 30: 17
 */

/**
 * Schema for hacker news search
 * Data-first design. Clarity for data definitions before implementing code.
 * Schema allows different types of result items "story", "comment" string value
 *
 * @export
 * @interface SearchResultItem
 */
export interface SearchResultItem {
    // readonly immutable functional
    // using primitives first before interfacing, mapping.
    // following the expected REST API response

    /**
     * Unique number identifying an item.
     *
     * @example 1
     * @type {string}
     * @memberof SearchResultItem
     */
    readonly id: number;  // - NOTE: Search result item IDs vs parent/story_IDs.

    /**
     * Article/comment/item's creation date.
     *
     * DateTimeStamp represented in ISO 8601 standard datetime format.
     * E.g. "Z" indicates UTC/Greenwich time + 0: 00.
     * @example "2009-02-19T12:21:23.000Z"
     * @type {string}
     * @memberof SearchResultItem
     */
    readonly created_at: string;  // See if auto-compatible with Date format

    /**
     * Article/comment/item's creation date.
     * DateTimeStamp epoch integer value of the article/comment/item's creation.
     *
     * @example 1235046083
     * @type {number}
     * @memberof SearchResultItem
     */
    readonly created_at_i: number;  // Epoch time.

    /**
     * The type of item returned by the search.
     * Generally, all top-level search result items for articles
     *
     * Articles have comment children, Comments have comment children.
     * *Logically*, but not necessarily enforced -- should double check.
     *
     * @example "story", "comment"
     * @type {string}
     * @memberof SearchResultItem
     */
    readonly type: string;
    /**
     * Author / username of the individual who posted/commented the item.
     * @example "slimlime"
     * @type {string}
     * @memberof SearchResultItem
     */
    readonly author: string;

    /**
     * Title of the article
     * @returns {null} null value if no title (i.e. comment item)
     *
     * @type {string}
     * @memberof SearchResultItem
     */
    readonly title: string;

    /**
     * URL link to the search item.
     *
     * @example "http:\/\/ycombinator.com", null - appears to null for comments.
     * @type {string}
     * @memberof SearchResultItem
     */
    readonly url: string;

    /**
     *
     *
     * @type {string}
     * @memberof SearchResultItem
     */
    readonly textDescription: string;

    /**
     * Upvotes/Downvotes value 
     *
     * Appears to return null for comments
     *
     * @type {number}
     * @memberof SearchResultItem
     */
    readonly points: number;

    /**
     * Parent item ID that the specified search result item is a child of.
     *
     * @example item 234567 is a child of/has parent_ID of 234551
     * @type {number}
     * @memberof SearchResultItem
     */
    readonly parent_ID: number;

    readonly story_ID: number;

    // children? Each comment counts as an item? Number of comments? Related stories?
    /**
     * Leave children implementation for another time
     * -- Warning: This looks dangerous. Have to sanitise, don't trust REST API
     * Schema allows different types of result items "story", "comment"
     * @type {SearchResultItem[]}
     * @memberof SearchResultItem
     */
    readonly children: SearchResultItem[];
}
