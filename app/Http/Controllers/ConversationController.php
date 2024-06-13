<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConversationRequest;
use App\Models\Conversation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
     * Store a newly created resource in storage.
     */
    public function store(ConversationRequest $request)
    {
        // return $request;
        $conversation = Conversation::create([
            'user_id' => Auth::id(),
        ]);

        // Attach the users to the conversation
        $conversation->users()->attach($request->user_ids);

        return response()->json($conversation, 201);
    }

    /**
     * Fetch the conversation with its messages and participants
     */
    public function show(Conversation $conversation, Request $request): JsonResponse
    {
        $convo = Conversation::with(['messages.sender', 'users'])
            ->find($request->id);

        return response()->json($convo);
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
