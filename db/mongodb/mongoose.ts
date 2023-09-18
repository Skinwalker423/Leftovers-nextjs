import mongoose, { ConnectOptions } from 'mongoose';
import Order from './models/orderModel';
import Prepper from './models/prepperModel';

let isConnected = false;

export const connectToMongoDb = async () => {
	mongoose.set('strictQuery', true);

	if (!process.env.MONGODB_URL) return console.log('mongo url not found');
	if (isConnected) return console.log('already connected');

	try {
		await mongoose.connect(process.env.MONGODB_URL, {
			dbName: 'leftovers',
			useNewUrlParser: true,
			useUnifiedTopology: true
		} as ConnectOptions);
		isConnected = true;
	} catch (error) {
		console.log(error);
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
				prepperEmail
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
