import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	prepperId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Prepper'
	},
	userEmail: {
		type: String,
		required: true
	},
	prepperEmail: {
		type: String,
		required: true
	},
	created_at: {
		type: Date,
		default: Date.now()
	},
	updated_at: {
		type: Date,
		default: Date.now()
	},
	items: {
		type: [],
		reqired: true
	},
	total: {
		type: Number,
		required: true
	},
	mealStatus: {
		type: String,
		enum: ['pending', 'fullfilled', 'unfullilled'],
		default: 'pending'
	}
});

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

export default Order;
