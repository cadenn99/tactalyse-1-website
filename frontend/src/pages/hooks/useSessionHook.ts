import { useRouter } from 'next/router'
import { useSession as useNextAuthSession } from 'next-auth/react'

export function useSessionHook(redirectTo = '/auth/login') {
    const router = useRouter()
    const { status, data: session } = useNextAuthSession()

    if (status === 'loading') return [null, true]

    if (!session && redirectTo) {
        router.replace(redirectTo)
        return [null, false]
    }

    return [session, false]
}