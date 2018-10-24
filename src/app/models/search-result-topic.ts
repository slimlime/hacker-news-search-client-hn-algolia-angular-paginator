/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-24 15: 16: 15
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-24 15: 43: 33
 */

/**
 * Encapsulates expected Hacker News Angolia REST API Query data for clarity.
 *
 *
 * #General usability information
 * * Search items seem to mainly categorise as Stories or Comments (check tags)
 * * Tags can be combined AND && OR ||.
 * * Can default search by popularity or by date endpoints
 * * Can use page number!?!?!
 * * IMPORTANT: May be able to use REST API virtual page param for pagination
 * instead of manual handling the implementation, buffering, loading etc.
 * * Can filter by condition on `created_at_i`, `points`, `num_comments`
 *
 * @export
 * @interface SearchResultByTopic
 */
export interface SearchResultByTopic {

    /**
     * Item creation ISO 8601-formatted datetime
     * Generally story for original use case, but there are many other item
     * types such as comment, poll, ask
     *
     * @type {string}
     * @memberof SearchResultByTopic
     */
    readonly created_at: string;

    readonly title: string;

    readonly url: string;

    readonly author: string;
    // Strange `hn algolia search` REST API http://hn.algolia.com/api/v1/search
    // Returns null story_url if directly searching for stories.
    // Exclusive either url or story_url (story-associated comment) not both?
    readonly points: number;

    readonly story_text: string;

    readonly comment_text: string;

    readonly num_comments: number;

    readonly story_ID: number;

    readonly story_title: number;

    readonly parent_ID: number;

    /**
     * Epoch datetimestamp creation time integer.
     *
     * @memberof SearchResultByTopic
     */
    readonly created_at_i: number;

    readonly tags: string[];

    readonly objectID: string;  // string id number for some reason

    /**
     *
     * Highlights based on relevancy/matching score to searched keywords.
     * Title, Url, Author search results relevancy
     * @type {SearchItemTitle} ?? -- TODO: implement interface
     * @memberof SearchResultByTopic
     */
    readonly highlightResult: any;  // -- TODO: nested object interface

}
