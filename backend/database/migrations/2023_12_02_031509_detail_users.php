<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        Schema::create("detail_users", function (Blueprint $table) {
            $table->id();
            $table->string("email")->unique();
            $table->json("profile")->nullable(true);
            $table->json("project")->nullable(true);
            $table->json("experience")->nullable(true);

            $table
                ->foreign("email")
                ->references("email")
                ->on("users");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists("detail_users");
    }
};
