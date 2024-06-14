<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConversationRequest;
use App\Models\Conversation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ConversationController extends Controller
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
     * Create a new conversation after clicking one of the users
     * from the sidebar or retrieve the conversation if exists.
     */
    public function store(ConversationRequest $request)
    {
        // return $request;
        $conversation = Conversation::firstOrCreate([
            'user_one_id' => $request->user_one_id,
            'user_two_id' => $request->user_two_id,
        ]);

        return response()->json($conversation, 201);
    }

    /**
     * Fetch the conversation with its messages and participants
     */
    public function show(Conversation $conversation, Request $request): JsonResponse
    {
        $conversations = Conversation::where('user_one_id', $request->id)
                                 ->orWhere('user_two_id', $request->id)
                                 ->with(['userOne', 'userTwo'])
                                 ->get();

        return response()->json($conversations);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Conversation $conversation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Conversation $conversation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Conversation $conversation)
    {
        //
    }
}
