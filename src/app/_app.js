import { AppProps } from "next/app";
import ABTestingMiddleware from "../../middleware";
import { useRouter } from "next/router";

function MyApp({Component, pageProps}){
    return (
        <ABTestingMiddleware>
            <Component {...pageProps} />
        </ABTestingMiddleware>
    );
};

export default MyApp;

MyApp.getInitialProps = async (context) => {
    await ABTestingMiddleware(context.req, context.res, context.next);
    return Component.getInitialProps(context);
}

function MyComponent(){
    const router = useRouter();
    const variant = router.query.variant;

    if(variant === 'Control'){
        return <div>Control variant</div>;
    }
    else if(variant ==='Variant A'){
        return <div>Variant {variant}</div>;
    }
}