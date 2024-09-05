import { NextApiRequest, NextApiResponse } from 'next';

export default function ABTestingMiddleware(req,res,next){
    const experiment = {
        name:'experiment_name',
        variants:['control', 'VariantA'],
        allocationRatio: [50,50],
        cookieName: 'experiment_varient',
        duration: 1000*60*60*24*7 // 7 days.  
    };

    const variantCookie = req.cookies[experiment.cookieName];
    if(variantCookie){
        next();
        return;
    }

    const randomNum = Math.random();
    let probability = 0;
    let assignedVariant = null;
    for(let i = 0; i < experiment.variants.length; i++){
        probability += experiment.allocationRatio[i]/100;
        if(randomNum <= probability){
            assignedVariant = experiment.variants[i];
            break;
        }
    }

    res.setHeader('Set-Cookie', `${experiment.cookieName} = ${assignedVariant}; HttpOnly: SameSite=Strict: Max-Age=${experiment.duration}`);
next();
}