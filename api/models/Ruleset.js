'use strict';

var _ = require('lodash');
require("lodash-query")(_);
var async = require('async');
var extend = require("extend");

/**
 * Ruleset.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = _.merge(_.cloneDeep(require('../base/Model')), {
	attributes: {
		name:{
			type:"string",
			unique:true
		},
		extendedValue:{
			type:"array"
		}
	},
	extendJob: function(data, cb) {
		sails.models.ruleset
			.find({})
			.exec(function (err, rules) {
				if(err) cb({ value:false, comment:"fetchRuleSet error" });
				async.each(rules,function(rule,callback){
					var collection = rule.value;
					var length = collection.length;
					var query = _.query.build( [data] );
					for ( var i=0; i<length;i++) {
						var propList = collection[i];
						if(collection){
							for ( var property in propList ){
								if(propList[property].whitelist){
									var list = propList[property].whitelist;
									query.and(property,{$in:list});
								}
								if(propList[property].blacklist){
									var list = propList[property].blacklist;
									query.and(property,{$nin:list});
								}
							}
						}
					}
					var result = query.run();
					if(result && result[0]){
						extend(data,rule.extendedValue);
					}
					callback();
				},function(err){
					if( err ) {
						cb({
							value:false,
							comment:"createJob error",
							error:err
						})
					} else {
						cb({
							value: true,
							data: data
						});
					}
				});
			});
	}	
});
