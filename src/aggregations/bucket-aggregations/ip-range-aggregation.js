'use strict';

const RangeAggregationBase = require('./range-aggregation-base');

const ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-iprange-aggregation.html';

/**
 * Dedicated range aggregation for IP typed fields
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/5current/search-aggregations-bucket-iprange-aggregation.html)
 *
 * @extends RangeAggregationBase
 */
class IpRangeAggregation extends RangeAggregationBase {

    /**
     * Creates an instance of IpRangeAggregation
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     * @returns {IpRangeAggregation} returns `this` so that calls can be chained
     */
    constructor(name, field) {
        super(name, 'ip_range', field);
        // Variable name is misleading. Only one of these needs to be present.
        this._rangeRequiredKeys = ['from', 'to', 'mask'];

        return this;
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on IpRangeAggregation
     */
    format() {
        console.log(`Please refer ${ES_REF_URL}`);
        throw new Error('format is not supported in IpRangeAggregation');
    }
}

module.exports = IpRangeAggregation;