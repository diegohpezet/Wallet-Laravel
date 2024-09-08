<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CashController;
use App\Models\Transfer;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register')
    ]);
});

Route::get('/dashboard', function (Request $request) {
    $user = $request->user();
    $transfers = Transfer::with(['sender', 'receiver'])
        ->where(function ($query) use ($user) {
            $query->where('sender', $user->id)
                ->orWhere('receiver', $user->id);
        });
    return Inertia::render('Dashboard/Dashboard', [
        'transfers' => $transfers->get(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/settings', function () {
    return Inertia::render('Dashboard/Dashboard');
})->middleware(['auth', 'verified'])->name('settings');

Route::middleware('auth')->group(function () {
    Route::get('/profile/{alias}', [ProfileController::class, 'getByAlias'])->name('profile.getByAlias');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/transfer', [CashController::class, 'transfer'])->name('transfer');
    Route::post('/transfer', [CashController::class, 'sendCash'])->name('transfer.sendCash');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/deposit', [CashController::class, 'deposit'])->name('deposit');
    Route::post('/deposit', [CashController::class, 'depositCash'])->name('deposit.depositCash');
});

require __DIR__ . '/auth.php';
