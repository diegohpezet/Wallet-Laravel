<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Transfer;

class CashController extends Controller
{
  public function deposit()
  {
    return Inertia::render('Deposit/Deposit');
  }

  public function depositCash(Request $request)
  {
    $validated = $request->validate([
      'amount' => 'required|numeric|min:0.01',
      'card_number' => [
        'required',
        'digits_between:13,19', // Verifica que el número de tarjeta tenga entre 13 y 19 dígitos
        'regex:/^\d+$/', // Asegura que solo contenga números
      ],
      'card_expiry' => [
        'required',
        'date_format:m/y',
        'after_or_equal:' . now()->format('m/y'),
      ],
      'card_holder_name' => [
        'required',
        'string',
        'regex:/^[a-zA-Z\s]+$/',
        'min:3',
      ],
      'card_cvc' => [
        'required',
        'digits_between:3,4',
      ],
    ]);

    $user = $request->user();
    $user->balance += $validated['amount'];
    $user->save();
    
    return redirect()->back()->with('success', 'Deposit completed successfully.');
  }

  public function transfer(Request $request)
  {
    $user = $request->user();
    $transfers = Transfer::with(['sender', 'receiver'])
      ->where(function ($query) use ($user) {
        $query->where('sender', $user->id)
          ->orWhere('receiver', $user->id);
      });

    return Inertia::render('Transfer/Transfer', [
      'transfers' => $transfers->get(),
    ]);
  }

  public function sendCash(Request $request)
  {
    $validated = $request->validate([
      'alias' => 'required|string|exists:users,alias', // Ensure alias exists in users table
      'amount' => 'required|numeric|min:0.01', // Ensure a valid amount is provided
    ]);

    // Find the user by alias
    $recipient = User::where('alias', $validated['alias'])->firstOrFail();
    $sender = $request->user();

    // Check if the recipient is the same as the authenticated user
    if ($recipient->id === $sender->id) {
      return response()->json(['message' => 'You can not transfer cash to yourself'], 400);
    }

    if ($sender->balance < $request->amount) {
      return response()->json(['message' => 'You don\'t have enough money to transfer!'], 400);
    }

    // Add the amount to the recipient's balance
    $recipient->balance += $request->amount;
    $recipient->save();

    // Extract that same amount from the sender's account
    $sender->balance -= $request->amount;
    $sender->save();

    // Create a new transfer record
    $transfer = new Transfer();
    $transfer->sender = $sender->id;
    $transfer->receiver = $recipient->id;
    $transfer->amount = $request->amount;
    $transfer->save();

    return response()->json(['message' => 'Transfer completed successfully'], 200);
  }
}
