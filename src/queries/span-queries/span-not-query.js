'use strict';

const { util: { checkType } } = require('../../core');

const SpanQueryBase = require('./span-query-base');

/**
 * Removes matches which overlap with another span query. The span not query
 * maps to Lucene `SpanNotQuery`.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-span-not-query.html)
 *
 * @example
 * const spanQry = bob.spanNotQuery()
 *  .include(bob.spanTermQuery('field1', 'hoya'))
 *  .exclude(bob.spanNearQuery()
 *      .clauses([
 *          bob.spanTermQuery('field1', 'la'),
 *          bob.spanTermQuery('field1', 'hoya')
 *      ])
 *      .slop(0)
 *      .inOrder(true));
 *
 * @extends SpanQueryBase
 */
class SpanNotQuery extends SpanQueryBase {
    /**
     * Creates an instance of `SpanNotQuery`
     */
    constructor() {
        super('span_not');
    }

    /**
     * Sets the `include` clause which is the span query whose matches are filtered
     *
     * @param {SpanQueryBase} spanQry
     * @returns {SpanNotQuery} returns `this` so that calls can be chained.
     */
    include(spanQry) {
        checkType(spanQry, SpanQueryBase);

        this._queryOpts.include = spanQry;
        return this;
    }

    /**
     * Sets the `exclude` clause which is the span query whose matches must
     * not overlap those returned.
     *
     * @param {SpanQueryBase} spanQry
     * @returns {SpanNotQuery} returns `this` so that calls can be chained.
     */
    exclude(spanQry) {
        checkType(spanQry, SpanQueryBase);

        this._queryOpts.exclude = spanQry;
        return this;
    }

    /**
     * If set the amount of tokens before the include span can't have overlap with
     * the exclude span.
     *
     * @param {number} pre
     * @returns {SpanNotQuery} returns `this` so that calls can be chained.
     */
    pre(pre) {
        this._queryOpts.pre = pre;
        return this;
    }

    /**
     * If set the amount of tokens after the include span can't have overlap with the exclude span.
     *
     * @param {number} post
     * @returns {SpanNotQuery} returns `this` so that calls can be chained.
     */
    post(post) {
        this._queryOpts.post = post;
        return this;
    }

    /**
     * If set the amount of tokens from within the include span can't have overlap
     * with the exclude span. Equivalent of setting both `pre` and `post`.
     *
     * @param {number} dist
     * @returns {SpanNotQuery} returns `this` so that calls can be chained.
     */
    dist(dist) {
        this._queryOpts.dist = dist;
        return this;
    }
}

module.exports = SpanNotQuery;
