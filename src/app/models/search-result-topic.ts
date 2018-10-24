/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-24 15: 16: 15
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-24 18: 09: 35
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
 * List of presumed disregarded attributes for story (returned null)
 *  *comment_text, story_ID, story_title, story_url, parent_ID,
 *  *story_text* sometimes null, "" blank string or has text...?
 * -- TODO: Check query
 *
 * @export
 * @interface SearchResultTopical
 */
export interface SearchResultTopical {

    /**
     * Item creation ISO 8601-formatted datetime
     * Generally story for original use case, but there are many other item
     * types such as comment, poll, ask
     *
     * @type {string}
     * @memberof SearchResultTopical
     */
    readonly created_at: string;

    /**
     * Story title.
     *
     * @type {string}
     * @memberof SearchResultTopical
     */
    readonly title: string;

    /**
     * Url to the article or null for non-story item
     * Some buggy story-tagged articles return blank string url?
     *
     * Quirky `hn algolia search` REST API http:   //hn.algolia.com/api/v1/search
     *  Returns null story_url if directly searching for stories.
     *  Exclusive either url or story_url (story-associated comment) not both?
     * @see story_url
     * @type {string}
     * @memberof SearchResultTopical
     */
    readonly url: string;

    /**
     * Author username
     *
     * @type {string}
     * @memberof SearchResultTopical
     */
    readonly author: string;

    /**
     * Article up-/down-vote points
     *
     * @type {number}
     * @memberof SearchResultTopical
     */
    readonly points: number;

    /**
     * Some search results have story text
     * NOTE: Quirk returned blank string "" and null values for some results.
     * @type {string}
     * @memberof SearchResultTopical
     */
    readonly story_text: string;

    /**
     * Comment text body (if comment)
     *
     * @type {string}
     * @memberof SearchResultTopical
     */
    readonly comment_text: string;

    /**
     * Number of comments associated with the story.
     *
     * @type {number}
     * @memberof SearchResultTopical
     */
    readonly num_comments: number;

    /**
     * A comment's parent story_ID ? (null for an article)
     *
     * @type {number}
     * @memberof SearchResultTopical
     */
    readonly story_ID: number;

    /**
     *
     *
     * @type {number}
     * @memberof SearchResultTopical
     */
    readonly story_title: string;

    /**
     * A non-story item's story_url. (Stories have exclusive url attribute)
     *
     * @type {string}
     * @memberof SearchResultTopical
     */
    readonly story_url: string;
    /**
     * A comment's parent story or parent comment ID? (null for an article)
     *
     * @type {number}
     * @memberof SearchResultTopical
     */
    readonly parent_ID: number;

    /**
     * Epoch datetimestamp creation time integer.
     *
     * @memberof SearchResultTopical
     */
    readonly created_at_i: number;

    /**
     * Tags associated with the story.
     * Strange quirk. Array of 3 string tags with the following combination
     * * "comment" or item_type, "author_<author/username>", "story_<story_ID>"
     * * * Where <> angle brackets indicate the other associated attribute value
     * @type {string[]}
     * @memberof SearchResultTopical
     */
    readonly tags: string[];

    /**
     * objectID string number seems to indicate the item ID,
     * This can be verified by using the hn.algolia item ID endpoint search.
     *
     * @type {string}
     * @memberof SearchResultTopical
     */
    readonly objectID: string;  // string id number for some reason

    /**
     *
     * Highlights based on relevancy/matching score to searched keywords.
     * Title, Url, Author search results relevancy
     * @type {SearchItemTitle} ?? -- TODO: implement interface
     * @memberof SearchResultTopical
     */
    readonly highlightResult: any;  // -- TODO: nested object interface

}
