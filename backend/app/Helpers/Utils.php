<?php
namespace App\Helpers;

use Carbon\Carbon;
use Firebase\JWT\ExpiredException;
use stdClass;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Utils
{
    /**
     * Generates a response template for an API endpoint.
     *
     * @param int $httpCode The HTTP status code of the response.
     * @param string $message The message to be included in the response.
     * @param mixed $data (Optional) Additional data to be included in the response.
     * @return array The generated response template.
     */
    public static function responseTemplate(int $httpCode, string $message, mixed $data = null)
    {
        return [
            "httpCode" => $httpCode,
            "message" => $message,
            "data" => [
                "items" => $data,
            ],
        ];
    }

    public static function generateJWTToken($payload)
    {
        $key = env("JWT_SECRET");
        $token = JWT::encode($payload, $key, "HS256");
        return $token;
    }

    public static function decodeToken(string $token): array|stdClass
    {
        $key = env("JWT_SECRET");
        $decoded = JWT::decode($token, new Key($key, "HS256"));
        return $decoded;
    }

    public static function verifyToken(string $token)
    {
        if ($token == null) {
            return false;
        }
        try {
            $decodedStringToken = self::decodeToken($token);

            if (
                $decodedStringToken->exp >=
                Carbon::now()
                    ->setTimezone("Asia/Jakarta")
                    ->getTimestamp()
            ) {
                return true;
            }
        } catch (ExpiredException $e) {
            return false;
        }
    }

    public static function generateSlug(string $name)
    {
        if (str_contains($name, " ")) {
            $name = str_replace(" ", "-", $name);
        }
        return strtolower($name);
    }
}
