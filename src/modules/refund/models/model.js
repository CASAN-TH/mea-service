'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RefundSchema = new Schema({

    doc_no: {
        type: String,
        unique: true,
    },
    doc_date: {
        type: Date,
        required: 'Please fill a Saleorder doc_date',
    },
    personalid: {
        type: String,
        required: 'Please fill a Saleorder personalid',
    },
    contactno: {
        type: String,
        required: 'Please fill a Saleorder contactno',
    },
    deviceno: {
        type: String,
        required: 'Please fill a Saleorder deviceno',
    },
    status: {
        type: String,
        default: 'pre',
    },
    items: {
        type: [
            {
                refno: {
                    type: String,
                    required: 'Please fill a Refund refno',
                },
                refdate: {
                    type: String,
                    required: 'Please fill a Refund refdate',
                },
                contactname: {
                    type: String,
                    required: 'Please fill a Refund contactname',
                },
                contacttype: {
                    type: String,
                    required: 'Please fill a Refund contacttype',
                },
                amount: {
                    type: String,
                    required: 'Please fill a Refund amount',
                },
            }
        ]
    },

    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});
RefundSchema.pre("save",function(next){
    let refund = this;
    if(refund.isNew){
        refund.doc_no = `rfn-yyyy-mm-xxxxxxxxxx`;
        next();
    }else{
        next();
    }
})
mongoose.model("Refund", RefundSchema);