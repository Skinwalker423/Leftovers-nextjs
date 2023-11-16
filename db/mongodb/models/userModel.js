import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	favorites: {
		type: [
			{
				prepperId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Prepper'
				}
			}
		],
		default: []
	},
	password: {
		type: String,
		default: null
	},
	name: {
		type: String,
		default: null
	},
	image: {
		type: String,
		default: null
	},
	defaultZipcode: {
		type: String,
		length: 10,
		default: null
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	forgotPasswordToken: {
		type: String,
		default: null
	},
	forgotPasswordTokenExpiry: {
		type: Date,
		default: null
	},
	verifyToken: {
		type: String,
		default: null
	},
	verifyTokenExpiry: {
		type: Date,
		default: null
	},
	isVerified: {
		type: Boolean,
		default: false
	}
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
