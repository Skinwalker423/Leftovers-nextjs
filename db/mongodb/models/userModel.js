import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	favorites: [
		{
			prepperId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Prepper'
			}
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