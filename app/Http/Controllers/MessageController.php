<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Send a message
     */
    public function store(MessageRequest $request): JsonResponse
    {
        $message = Message::create($request->toArray());

        // Broadcast the message here if needed
        return response()->json($message, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        // $messages = Message::where('sender_id', $request->id)
        //                ->orWhere('recipient_id', $request->id)
        //                ->with(['sender', 'recipient'])
        //                ->orderBy('created_at', 'desc')
        //                ->get();

        // return response()->json($messages);

        $auth_user_id = Auth::id();
        $user_id = $request->id;

        $messages = Message::where(function ($query) use ($auth_user_id, $user_id) {
            $query->where('sender_id', $auth_user_id)
                ->where('recipient_id', $user_id);
        })
        ->orWhere(function ($query) use ($auth_user_id, $user_id) {
            $query->where('sender_id', $user_id)
                ->where('recipient_id', $auth_user_id);
        })
        ->with(['sender', 'recipient'])
        ->orderBy('created_at', 'asc') // Or 'desc' depending on your needs
        ->get();

        return response()->json($messages);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}
