<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PortofolioController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix("auth")->group(function () {
    Route::post("login", [AuthController::class, "Login"]);
    Route::post("register", [AuthController::class, "Register"]);
    Route::post("checkStatus", [AuthController::class, "CheckStatus"]);
    Route::post("getData", [AuthController::class, "GetData"]);
});
Route::prefix("portofolio")->group(function () {
    Route::post("addNewData", [PortofolioController::class, "AddNewData"]);
    Route::get("getData", [PortofolioController::class, "GetData"]);
    Route::get("getDataBySlug", [PortofolioController::class, "GetDataBySlug"]);
});
Route::middleware("auth:sanctum")->get("/user", function (Request $request) {
    return $request->user();
});
