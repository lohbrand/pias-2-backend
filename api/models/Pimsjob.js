'use strict';

var _ = require('lodash');
var async = require('async');

/**
 * Pimsjob.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = _.merge(_.cloneDeep(require('../base/Model')), {
	attributes: {
		// pimsJob unique identifiyer
		prNumber: {
			type: 'string',
			required: true,
			unique:true
		}
	},
	save: function(data, cb) {
		async.waterfall([
			function(callback){
				sails.models.pimsjob
					.findOne({"prNumber":data.prNumber})
					.exec(function (err, record) {
						if(err) cb({ value:false, comment:"fetchJob error" });
						//console.log(record);
						callback (null, record);
					});
			},
			function(record, callback){
				if(record){					
					sails.models.pimsjob
						.update({"id":record.id},data)
						.exec(function (err, updatedRecord) {
							if(err) cb({ value:false, comment:"updateJob error", error:err });
							//console.log("updated: " + updatedRecord[0]);
							callback(null,updatedRecord[0]);
						});
				}else{
					//console.log("create: " + data);
					sails.models.pimsjob
						.create(data)
						.exec(function (err, newRecord) {
							if(err) cb({ value:false, comment:"createJob error", error:err });
							//console.log(newRecord);
							callback(null,newRecord);
						});
				}
			}
		],function(err,result){
			//console.log("result:" + result);
			if (err) cb({ value:false, comment:"database error" });
			cb({
				value: true,
				id: result.id
			});
		});
	}
});