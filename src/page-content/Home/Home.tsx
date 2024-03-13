// see: https://nextjs.org/docs/app/building-your-application/rendering/client-components
'use client'

import { useCallback } from "react";

import { useDispatch, useSelector } from "@/hooks";
import { thunks } from "@/redux/authorization";
import { authorizationsStateSelector } from "@/redux/authorization/selectors";
import { useRouter } from "next/navigation";
import { routes } from "@/constants";

const Home = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { isResetPasswordSent } = useSelector(authorizationsStateSelector);

    const sentResetPasswordHandler = useCallback(() => {
        dispatch(thunks.sendForgotPassword('test@gmail.com'));
    }, [dispatch])

    const signInRedirectHandler = useCallback(() => {
        router.push(routes.signIn)
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            Home page
            <button onClick={sentResetPasswordHandler}>sent reset password</button>
            <button onClick={(signInRedirectHandler)}>Sign in</button>
        </div>
    )
}

export default Home;