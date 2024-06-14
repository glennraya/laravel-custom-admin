<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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
        $messages = Message::where('conversation_id', $request->id)
            ->with('sender')
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
