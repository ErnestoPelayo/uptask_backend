import {CorsOptions} from 'cors'

export const corsConfig: CorsOptions ={
    origin: function(origin, callback){
        const whitelist = ['http://localhost:5173/']

        if(whitelist.includes(origin)){
            callback(null,true)
        }else{
            callback(new Error('Error de CORS'))
        }
    }

}