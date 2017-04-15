'use strict';

const MatchPhraseQueryBase = require('./match-phrase-query-base');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase-prefix.html';

/**
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase-prefix.html)
 *
 * @extends MatchPhraseQueryBase
 */
class MatchPhrasePrefixQuery extends MatchPhraseQueryBase {
    /**
     * Creates an instance of `MatchPhrasePrefixQuery`
     *
     * @param {string=} field The document field to query against
     * @param {string=} queryString The query string
     */
    constructor(field, queryString) {
        super('match_phrase_prefix', ES_REF_URL, field, queryString);
    }

    /**
     * Control to how many prefixes the last term will be expanded.
     *
     * @param {number} limit Defaults to 50.
     * @returns {MatchPhrasePrefixQuery} returns `this` so that calls can be chained.
     */
    maxExpansions(limit) {
        this._queryOpts.max_expansions = limit;
        return this;
    }
}

module.exports = MatchPhrasePrefixQuery;
