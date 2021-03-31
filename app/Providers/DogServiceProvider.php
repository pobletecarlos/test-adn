<?php

namespace App\Providers;
use App\Services\DogService;
use App\Contracts\DogServiceContract;
use Illuminate\Support\ServiceProvider;

class DogServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    protected $defer = true;
    public function register()
    {
        $this->app->bind(DogServiceContract::class, function ($app){
            return new DogService();
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
