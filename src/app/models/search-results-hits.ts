import { SearchResultByTopic } from './search-result-topic';
/*
 * @Author            : Samuel Lim
 * @Date              : 2018-10-24 17: 58: 53
 * @Last Modified by  : slimlime
 * @Last Modified time: 2018-10-24 18: 14: 10
 */

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
     * An array of the search result items that represent the stories/comments
     * and other possible hn article item types with their associated metadata.
     *
     * @type {SearchResultByTopic[]}
     * @memberof SearchHits
     */
    readonly searchResultItems: SearchResultByTopic[];
}
