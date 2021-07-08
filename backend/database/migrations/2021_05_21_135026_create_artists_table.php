<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArtistsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('artists', function (Blueprint $table) {
            $table->increments('id');
            //$table->index('user_id');
            $table->integer('user_id')->unsigned()->unique();
            //$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('first_name')->index();
            $table->string('last_name')->index();
            $table->string('phone')->index();
            $table->string('address')->index()->nullable();
            $table->string('country')->index()->nullable();
            $table->dateTime('birthday')->index()->nullable();
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('artists');
    }
}
