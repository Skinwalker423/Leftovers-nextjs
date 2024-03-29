import mongoose from 'mongoose';

const PrepperSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	kitchenTitle: {
		type: String,
		required: true
	},
	mealsServed: {
		type: Number,
		default: 0
	},
	meals: [
		{
			id: {
				type: String,
				required: true
			},
			title: {
				type: String,
				required: true
			},
			price: {
				type: Number,
				required: true
			},
			description: {
				type: String,
				required: true
			},
			qty: {
				type: Number,
				required: true
			},
			image: String,
			createdAt: {
				type: Date,
				default: Date.now()
			},
			last_modified: {
				type: Date,
				default: Date.now()
			}
		}
	],
	location: {
		type: {
			address: String,
			city: String,
			state: String,
			zipcode: String
		},
		required: true
	},
	kitchenImgUrl: String,
	profileImgUrl: String,
	savedKitchenImages: [],
	savedProfileImages: [],
	savedMealImages: [],

	isKitchenClosed: {
		type: Boolean,
		default: false
	},

	createdAt: {
		type: Date,
		default: Date.now()
	},
	last_modified: {
		type: Date,
		default: Date.now()
	}
});

const Prepper =
	mongoose.models.Prepper || mongoose.model('Prepper', PrepperSchema);

export default Prepper;
