'use strict';

var _ = require('lodash');
var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
/**
 * RulesetController
 *
 * @description :: Server-side logic for managing rulesets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 module.exports = _.merge(_.cloneDeep(require('../base/Controller')), {
 	/*create: function(req,res) {
 		var Model = actionUtil.parseModel(req);
 		if (req.body) {
 			//console.log(req.body);
 			if (req.body.prNumber) {
 				if (req.body.prNumber !== "") {
 					save();
 				} else {
 					res.badRequest({
 						value: "false",
 						comment: "prNumber is needed and not empty"
 					});
 				}
 			} else {
 				res.badRequest({
					value: "false",
					comment: "prNumber is needed"
 				});
 			}

 			function save() {
 				var print = function(data) {
 					res.json(data);
 				}
 				Model.save(req.body,print);
 			}
 		} else {
 			res.badRequest({
 				value: "false",
 				comment: "Please provide parameters"
 			});
 		}
 	},*/
 	findByJob: function(req, res) {
 		var Model = actionUtil.parseModel(req);
 		if (req.body) {
 			var print = function(data) {
				res.json(data);
			};
			Model.extendJob(req.body, print);
		} else {
			res.json({
				value: "false",
				comment: "Please provide parameters"
			});
		}
	}
 });


