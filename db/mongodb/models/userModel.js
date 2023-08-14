import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	favorites: [
		{
			id: String,
			name: String,
			email: String,
			description: String,
			kitchenImgUrl: String
		}
	],
	password: {
		type: String,
		required: true
	},
	name: String,
	image: String,
	createdAt: {
		type: Date,
		default: Date.now()
	}
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
