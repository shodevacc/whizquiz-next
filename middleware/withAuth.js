import { NextResponse } from "next/server";
import { verify } from 'jsonwebtoken'

const withAuth = (handler) =>{
    return async(req,res) =>{
        const { cookies } = req;
        const jwt = cookies.token;
    }
}

export default withAuth