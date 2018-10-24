/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-24 17: 58: 53
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-25 08: 36: 02
 */
import { SearchResultTopical } from './search-result-topic';

/**
 * Directly reflects the hn.algolia response from topical search API
 * e.g. `https://hn.algolia.com/api/v1/search?query=deep%20learning&tags=story`
 *
 * @see `https://hn.algolia.com/api`
 * @export
 * @interface SearchHits
 */
export interface SearchHits {

    /**
     * Whether search hits count is exhaustive (true) or approximate?
     *
     * @type {boolean}
     * @memberof SearchHits
     */
    readonly exhaustiveNbHits: boolean;

    /**
     * An array of the search result items that represent the stories/comments
     * and other possible hn article item types with their associated metadata.
     * 
     * @type {SearchResultTopical[]}
     * @memberof SearchHits
     */
    readonly searchResultItems: SearchResultTopical[];

    /**
     * Hacker News Algolia REST Search API recommended method for pagination.
     * @see `https://www.algolia.com/doc/guides/searching/pagination/` API docs
     * 
     * @example 20
     * Minimum 0, Maximum 1000.
     * @type {number}
     * @memberof SearchHits
     */
    readonly hitsPerPage: number;  // Default 20

    /**
     * Number of hits found for the given search query parameters.
     * 
     * @example 18701
     * @type {number}
     * @memberof SearchHits
     */
    readonly nbHits: number;  // Maybe total number of hits.

    /**
     * Number of pages.
     * Influenced by number of hits and hitsPerPage
     * 
     * Seems to hit a soft limit of 50 pages.
     *
     * @type {number}
     * @memberof SearchHits
     */
    readonly nbPages: number;  // Total number of pages // soft limit 50 pages?

    /**
     * Virtual page of the results.
     *
     * @type {number}
     * @memberof SearchHits
     */
    readonly page: number;  // Virtual page of REST API Search

    /**
     * GET Parameters verified.
     * 
     * endpoint parameters returned
     * May return different to what was queried
     * e.g. Prefixed default `advancedSyntax=true` `&` `analytics=false`
     *
     * @type {string}
     * @memberof SearchHits
     */
    readonly params: string;  // GET parameters verified.

    /**
     * HN Algolia search processing time.
     * 
     * @example 27
     * @type {number}
     * @memberof SearchHits
     */
    readonly processingTimeMS: number  // REST API Processing time.
    
    /**
     * Query string user search input.
     *
     * @example "Deep Learning"
     * @type {string}
     * @memberof SearchHits
     */
    readonly query: string;  // Query string
}
