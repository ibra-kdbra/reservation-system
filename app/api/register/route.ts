import bcrypt from "bcrypt";


export async function POST(
    request :Request
){
    const body = await request.json();
    const{
        email,
        password,
        name,
    } = body;
    const hashedPassword = await bcrypt.hash(password, 12);
}