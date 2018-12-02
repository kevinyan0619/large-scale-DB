const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

// add your schemas
// use plugins (for slug)
// register your model

const User = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, unique: true, required: true},
  history_trips: [{
  		trip_id: {type: mongoose.Schema.Types.ObjectId, ref:'Trip'},
  		start_station: {type: mongoose.Schema.Types.ObjectId, ref:'Station'},
  		end_station: {type: mongoose.Schema.Types.ObjectId, ref:'Station'},
  		check_out_time: {type: Date, required:true},
  		return_time: {type: Date, required:true}
  		}]
});

const Station = new mongoose.Schema({
	name:{type:String, required:true},
	lat:{type:Number, required:true},
	lng:{type:Number, required:true},
	total_dock: {type:Number, required:true},
	available_skateboards: [{type: mongoose.Schema.Types.ObjectId, ref:'Skateboard'}]
}); 

const Skateboard = new mongoose.Schema({
	in_use: {type: Boolean, default:false}
});

const Current_Trip = new mongoose.Schema({
	user_id: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
	board_id: {type: mongoose.Schema.Types.ObjectId, ref:'Skateboard'},
	start_station: {type: mongoose.Schema.Types.ObjectId, ref:'Station'},
	check_out_time: {type: Date, required:true}
});

const Completed_Trips = new mongoose.Schema({
	_id: {type: mongoose.Schema.Types.ObjectId, ref:'Current_Trip'},
  	user_id: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  	board_id: {type: mongoose.Schema.Types.ObjectId, ref:'Skateboard'},
  	start_station: {type: mongoose.Schema.Types.ObjectId, ref:'Station'},
  	end_station: {type: mongoose.Schema.Types.ObjectId, ref:'Station'},
  	check_out_time: {type: Date, required:true},
  	return_time: {type: Date, required:true}
});



mongoose.model('User', User);
mongoose.model('Station', Station);
mongoose.model('Skateboard', Skateboard);
mongoose.model('Trip', Trip);
mongoose.connect('mongodb://localhost/eskate');
