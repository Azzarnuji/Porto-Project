<?php

namespace App\Http\Controllers\Api;

use App\Helpers\Utils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\DetailUsers;
use App\Models\UsersModel;

class PortofolioController extends Controller
{
    //
    public function AddNewData(Request $request)
    {
        $data = $request->input("data");

        $queryData = [
            "email" => $data["profile"]["email"],
            "profile" => json_encode($data["profile"]),
            "project" => json_encode($data["project"]),
            "experience" => json_encode($data["experience"]),
        ];
        DB::beginTransaction();
        try {
            DetailUsers::create($queryData);
            DB::commit();
            return response()->json(Utils::responseTemplate(201, "Add New Data Success"), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(Utils::responseTemplate(500, "Add New Data Failed", $e->getMessage()), 500);
        }
    }

    public function GetData(Request $request)
    {
        $email = $request->input("email");
        $getData = DetailUsers::where("email", $email)->first();
        $finalArray = [
            "profile" => json_decode($getData["profile"]),
            "project" => json_decode($getData["project"]),
            "experience" => json_decode($getData["experience"]),
        ];
        if ($getData != null) {
            return response()->json(Utils::responseTemplate(200, "Get Data Success", [$finalArray]), 200);
        } else {
            return response()->json(Utils::responseTemplate(404, "Get Data Failed"), 404);
        }
    }

    public function GetDataBySlug(Request $request)
    {
        $slug = $request->input("slug");
        $getData = UsersModel::where("slug", base64_decode($slug))
            ->with("withDetailUser")
            ->first();
        $finalArray = [
            "profile" => json_decode($getData["withDetailUser"]["profile"]),
            "project" => json_decode($getData["withDetailUser"]["project"]),
            "experience" => json_decode($getData["withDetailUser"]["experience"]),
        ];
        return response()->json(Utils::responseTemplate(200, "Get Data Success", [$finalArray]), 200);
    }
}
