'use strict';

const { inspect } = require('util');

const isNil = require('lodash.isnil');

const { consts: { FIELD_MODIFIER_SET } } = require('../../../core');

const ScoreFunction = require('./score-function');

const ES_REF_URL =
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html#function-field-value-factor';

/**
 * The `field_value_factor` function allows you to use a field from a document
 * to influence the score. It's similar to using the `script_score` function, however,
 * it avoids the overhead of scripting. If used on a multi-valued field, only the
 * first value of the field is used in calculations.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html#function-field-value-factor)
 *
 * @extends ScoreFunction
 */
class FieldValueFactorFunction extends ScoreFunction {
    /**
     * Creates an instance of `FieldValueFactorFunction`
     *
     * @param {string=} field the field to be extracted from the document.
     */
    constructor(field) {
        super('field_value_factor');

        if (!isNil(field)) this._opts.field = field;
    }

    /**
     * Sets the field to be extracted from the document.
     *
     * @param {string} field the field to be extracted from the document.
     * @returns {FieldValueFactorFunction} returns `this` so that calls can be chained.
     */
    field(field) {
        this._opts.field = field;
        return this;
    }

    /**
     * Optional factor to multiply the field value with, defaults to `1`.
     *
     * @param {number} factor Factor to multiply the field with.
     * @returns {FieldValueFactorFunction} returns `this` so that calls can be chained.
     */
    factor(factor) {
        this._opts.factor = factor;
        return this;
    }

    /**
     * Modifier to apply to the field value, can be one of: `none`, `log`,
     * `log1p`, `log2p`, `ln`, `ln1p`, `ln2p`, `square`, `sqrt`, or `reciprocal`.
     * Defaults to `none`.
     *
     * @param {string} mod Modified to apply on field. Can be one of: `none`, `log`,
     * `log1p`, `log2p`, `ln`, `ln1p`, `ln2p`, `square`, `sqrt`, or `reciprocal`.
     * Defaults to `none`.
     * @returns {FieldValueFactorFunction} returns `this` so that calls can be chained.
     */
    modifier(mod) {
        if (!FIELD_MODIFIER_SET.has(mod)) {
            console.log(`See ${ES_REF_URL}`);
            console.warn(`Got 'modifier' - ${mod}`);
            throw new Error(
                `The 'modifier' parameter should belong to ${inspect(FIELD_MODIFIER_SET)}`
            );
        }

        this._opts.modifier = mod;
        return this;
    }

    /**
     * Value used if the document doesn’t have that field. The modifier and factor
     * are still applied to it as though it were read from the document.
     *
     * @param {number} val To be used with documents which do not have field value.
     * @returns {FieldValueFactorFunction} returns `this` so that calls can be chained.
     */
    missing(val) {
        this._opts.missing = val;
        return this;
    }
}

module.exports = FieldValueFactorFunction;
