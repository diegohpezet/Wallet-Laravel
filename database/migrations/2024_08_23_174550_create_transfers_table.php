<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('transfers', function (Blueprint $table) {
      $table->id();

      // Define the columns
      $table->unsignedBigInteger('sender');
      $table->unsignedBigInteger('receiver');
      $table->decimal('amount', 10, 2)->min(0.01);

      // Foreign Key Constraints
      $table->foreign('sender')->references('id')->on('users')->onDelete('cascade');
      $table->foreign('receiver')->references('id')->on('users')->onDelete('cascade');

      // Timestamps for created_at and updated_at columns
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('transfers');
  }
};
