import mongoose, { ConnectOptions } from 'mongoose';
import Order from './models/orderModel';
import Prepper from './models/prepperModel';

let isConnected = false;

export const connectToMongoDb = async () => {
	mongoose.set('strictQuery', true);

	if (!process.env.MONGODB_URL) return;
	if (isConnected) return console.log('already connected');

	try {
		await mongoose.connect(process.env.MONGODB_URL, {
			dbName: 'leftovers',
			useNewUrlParser: true,
			useUnifiedTopology: true
		} as ConnectOptions);
		isConnected = true;
		console.log('connected to mongodb');
	} catch (error) {
		console.error(error);
	}
};

export const updateOrderStatusById = async (id: string, status: string) => {
	try {
		await connectToMongoDb();
		const order = await Order.findOneAndUpdate(
			{
				id: id
			},
			{
				$set: {
					mealStatus: status,
					updated_at: new Date()
				}
			},
			{
				new: true
			}
		);

		return order;
	} catch (error: any) {
		throw new Error(`problem updating meal status: ${error.message}`);
	}
};
export const incrementMealsServedDB = async (prepperEmail: string) => {
	try {
		await connectToMongoDb();
		const updateServed = await Prepper.findOneAndUpdate(
			{
				email: prepperEmail
			},
			{
				$inc: {
					mealsServed: 1
				}
			}
		);

		return updateServed;
	} catch (error: any) {
		throw new Error(`problem updating meal status: ${error.message}`);
	}
};

export const fetchOrderById = async (orderId: string) => {
	try {
		await connectToMongoDb();
		const order = await Order.findOne({
			_id: orderId
		});

		return {
			id: order._id.toString(),
			userEmail: order.userEmail,
			created_at: order.created_at.toString(),
			updated_at: order?.updated_at.toString(),
			items: order.items,
			total: order.total,
			prepperEmail: order.prepperEmail,
			mealStatus: order?.mealStatus || 'N/A'
		};
	} catch (error: any) {
		throw new Error(`problem finding order: ${error.message}`);
	}
};
