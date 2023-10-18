import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { comparePassword } from '../../../utils/bcrypt';
import User from '../../../db/mongodb/models/userModel';
import { connectToMongoDb } from '../../../db/mongodb/mongoose';
import Prepper from '../../../db/mongodb/models/prepperModel';

export const authOptions = {
	// Configure one or more authentication providers

	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: 'Email and Password',
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'jwick@kickass.com',
					autocomplete: 'username'
				},
				password: {
					label: 'Password',
					type: 'password',
					autocomplete: 'new-password'
				}
			},
			async authorize(credentials, req) {
				// Add logic here to look up the user from the credentials supplied
				await connectToMongoDb();
				const foundUser = await User.findOne({
					email: credentials.email
				});

				if (foundUser) {
					// Any object returned will be saved in `user` property of the JWT
					const matchedPasswords = await comparePassword(
						credentials.password,
						foundUser.password
					);

					if (matchedPasswords) {
						return {
							email: foundUser.email
						};
					} else {
						// throw new Error('Incorrect email/password');
						return null;
					}
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					// throw new Error('no user found');
					return null;

					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			}
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code'
				}
			},
			checks: 'pkce'
		})
		// ...add more providers here
	],
	secret: process.env.NEXT_AUTH_SECRET,
	callbacks: {
		async jwt({ token, account }) {
			// Persist the OAuth access_token to the token right after signin
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},
		async session({ session, token, user }) {
			// Send properties to the client, like an access_token from a provider.

			// const client = await connectMongoDb();
			// const foundUser = await findExistingUserEmail(client, session.user.email);
			await connectToMongoDb();
			const foundUser = await User.findOne({
				email: session.user.email
			});

			const userDetails = {
				...session.user,
				favorites: [],
				defaultZipcode: null
			};

			if (!foundUser) {
				const newUser = new User(userDetails);
				//populate favorite preppers when Object Ids are replaced
				await newUser.save();

				session.user.id = newUser?._id.toString();
				session.user.favorites = [];
			} else {
				const isPrepper = await Prepper.findOne({ email: foundUser.email });
				console.log('foundPrepper', isPrepper);
				session.user.id = foundUser._id.toString();
				session.user.defaultZipcode = foundUser.defaultZipcode;
				session.user.favorites = foundUser?.favorites || [];
				session.user.isPrepper = !!isPrepper;
			}

			session.accessToken = token.accessToken;
			return session;
		}
	}
};
export default NextAuth(authOptions);
