<?php

namespace App\Http\Controllers;

class BaseController extends Controller
{
    public function success($data, $message = 'Success', $code = 200)
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data,
        ], $code);
    }

    public function error($message = 'Error', $errorMessages = [], $code = 400)
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'errors' => $errorMessages,
        ], $code);
    }
}
