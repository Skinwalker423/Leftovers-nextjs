import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { comparePassword } from '../../../utils/bcrypt';
import {
	findExistingUserEmail,
	connectMongoDb,
	addDocToDb
} from '../../../db/mongodb/mongoDbUtils';

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
				const client = await connectMongoDb();
				const foundUser = await findExistingUserEmail(
					client,
					credentials.email
				);

				if (foundUser) {
					// Any object returned will be saved in `user` property of the JWT
					const matchedPasswords = await comparePassword(
						credentials.password,
						foundUser.password
					);

					if (matchedPasswords) {
						client.close();
						return {
							email: foundUser.email
						};
					} else {
						// throw new Error('Incorrect email/password');
						return null;
					}
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					client.close();
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
			console.log('user inside session callback', user);
			console.log('session inside session callback', session);

			const client = await connectMongoDb();
			const foundUser = await findExistingUserEmail(client, session.user.email);
			const userDetails = {
				...session.user,
				favorites: []
			};
			console.log('userDetails', userDetails);
			if (!foundUser) {
				const doc = await addDocToDb(client, 'users', userDetails);
				console.log('created a user', doc);
			}

			session.accessToken = token.accessToken;
			return session;
		}
	}
};
export default NextAuth(authOptions);
