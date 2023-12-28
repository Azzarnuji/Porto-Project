<?php

namespace App\Http\Controllers\Api;

use App\Helpers\Utils;
use App\Models\UsersModel;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\TokenLoginModel;

class AuthController extends Controller
{
    //

    public function Login(Request $request)
    {
        $time = Carbon::now()->setTimezone("Asia/Jakarta");
        $email = $request->input("email");
        $password = $request->input("password");
        $getData = UsersModel::where("email", $email)->first();
        $getToken = TokenLoginModel::where("email", $email)->first();
        $time = Carbon::now()->setTimezone("Asia/Jakarta");

        DB::beginTransaction();
        try {
            if ($getData != null && password_verify($password, $getData["password"])) {
                $payloadJWT = [
                    "email" => $email,
                    "name" => $getData->name,
                    "iat" => $time->getTimestamp(),
                    "exp" => $time->addHours(3)->getTimestamp(),
                ];
                $queryData = [
                    "email" => $email,
                    "token" => Utils::generateJWTToken($payloadJWT),
                    "iat" => $time->getTimestamp(),
                    "exp" => $time->addHours(3)->getTimestamp(),
                ];

                $token = !empty($getToken["token"]) && Utils::verifyToken($getToken["token"]) ? $getToken["token"] : false;
                if ($token) {
                    return response()->json(
                        Utils::responseTemplate(200, "Login Success", [
                            "profile" => array_merge(json_decode(json_encode(Utils::decodeToken($token)), true), ["token" => $token]),
                        ]),
                        200
                    );
                } else {
                    TokenLoginModel::where("email", $email)->delete();
                }

                TokenLoginModel::create($queryData);
                DB::commit();
                return response()->json(
                    Utils::responseTemplate(200, "Login Success", [
                        "profile" => array_merge($payloadJWT, $queryData),
                    ]),
                    200
                );
            } else {
                return response()->json(Utils::responseTemplate(401, "Email or Password is wrong"), 401);
            }
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(Utils::responseTemplate(500, "Login Failed", ["error" => $e->getLine()]));
        }
    }

    public function Register(Request $request)
    {
        $email = $request->input("email");
        $password = $request->input("password");
        $name = $request->input("name");
        $queryData = [
            "name" => $name,
            "email" => $email,
            "password" => password_hash($password, PASSWORD_BCRYPT),
            "slug" => Utils::generateSlug($name),
        ];

        DB::beginTransaction();
        try {
            UsersModel::create($queryData);
            DB::commit();
            return response()->json(Utils::responseTemplate(201, "Register Success", "OK"), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(Utils::responseTemplate(500, "Register Failed", $e->getMessage()));
        }
    }

    public function CheckStatus(Request $request)
    {
        $token = $request->input("token");
        if (
            TokenLoginModel::where("token", $token)
                ->get()
                ->count() > 0 &&
            Utils::verifyToken($token)
        ) {
            return response()->json(Utils::responseTemplate(200, "Token Valid"), 200);
        } else {
            return response()->json(Utils::responseTemplate(401, "Token Invalid"), 401);
        }
    }

    public function getData(Request $request)
    {
        $token = $request->input("token");
        if (Utils::verifyToken($token)) {
            return response()->json(Utils::responseTemplate(200, "Get Data Success", ["profile" => Utils::decodeToken($token)]));
        } else {
            return response()->json(Utils::responseTemplate(401, "Token Invalid"), 401);
        }
    }
}
