'use strict';

var _ = require('lodash');
var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
/**
 * PimsjobController
 *
 * @description :: Server-side logic for managing Books
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 module.exports = _.merge(_.cloneDeep(require('../base/Controller')), {
 	create: function(req,res) {
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
 	},
 });


