<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class StudentsController extends Controller
{
    public function fetch()
    {
        $users = Student::all();
        return response()->json($users, 200);
    }

    public function storeFormData(Request $request)
    {
        try {
            $student = new Student;
            $student->name = $request->name;
            $student->fname = $request->fname;
            $student->province = $request->province;
            $student->phone = $request->phone;
            $student->save();

            return response()->json([
                'message' => 'Student record created successfully.',
            ], 201);
        } catch (QueryException $e) {
            $errorCode = $e->errorInfo[1];
            if ($errorCode == 1048) {
                return response()->json([
                    'error' => 'The name field is required.',
                ], 400);
            } else {
                return response()->json([
                    'error' => 'An error occurred while saving the record.',
                ], 500);
            }
        }
    }

    public function getData($id)
    {
        $user = Student::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        return response()->json($user);
    }

    public function updateUser(Request $request, $id)
    {

        $user = Student::findOrFail($id);

        $name = $request->input('name');
        $fname = $request->input('fname');
        $province = $request->input('province');
        $phone = $request->input('phone');

        if (empty($name) || empty($fname) || empty($province) || empty($phone)) {
            return response()->json(['message' => 'All fields are required'], 400);
        }

        $user->name = $name;
        $user->fname = $fname;
        $user->province = $province;
        $user->phone = $phone;
        $user->save();

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user,
        ], 200);
    }

    public function deleteUser($id)
    {
        $user = Student::find($id);

        if ($user) {
            $user->delete();
            return response()->json(['message' => 'User deleted successfully'], 200);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

}
