import NextAuth from 'next-auth'
import {OAuthConfig, OAuthUserConfig} from "next-auth/providers/oauth";

interface UserProfile extends Record<string, any> {
    name: string,
    email: string,
}

function LaravelPassport<P extends UserProfile>(options: OAuthUserConfig<P>|undefined = undefined): OAuthConfig<P> {
    return {
        id: 'passport',
        name: "LaravelPassport",
        type: 'oauth',
        version: '2.0',
        checks: ['state'],
        clientId: process.env.AUTH_PASSPORT_ID,
        clientSecret: process.env.AUTH_PASSPORT_SECRET,
        authorization: {
            url: 'http://localhost/oauth/authorize',
            params: {
                scope: '',
            }
        },
        token: {
            url: 'http://localhost/oauth/token',
        },
        userinfo: {
            url: 'http://localhost/api/user',
            async request(context) {
                const userinfo = context.provider.userinfo

                if (typeof userinfo === 'string' || !userinfo || !('url' in userinfo) || typeof userinfo.url !== 'string') {
                    throw 'Could not get the userinfo url from this configuration'
                }

                const response = await fetch(userinfo.url, {
                    headers: {
                        Authorization: `Bearer ${context.tokens.access_token}`
                    }
                })
                return await response.json()
            }
        },
        profile: (profile, tokens) => {
            return {
                id: profile.id,
                name: profile.name,
                email: profile.email,
                image: '',
            }
        },
        options,
    } as OAuthConfig<UserProfile>
}

const handler = NextAuth({
    providers: [
        LaravelPassport()
    ]
})

export { handler as GET, handler as POST }
